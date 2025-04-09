import streamlit as st
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.statespace.sarimax import SARIMAX
import requests



st.set_page_config(page_title="Flight Cost & Weather Prediction", layout="wide")
st.title("🔍 Flight Cost & Weather Prediction")

# Load and encode data
@st.cache_data
def load_data():
    df = pd.read_csv("flight_data_large_cleaned.csv")
    df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
    df.dropna(subset=["Date"], inplace=True)
    df["Year"] = df["Date"].dt.year
    df["Month"] = df["Date"].dt.month
    return df

df = load_data()

# Label encoding
encoders = {}
for col in ["StartCountry", "DestinationCountry", "Weather", "FlightName", "Airline", "SeatClass"]:
    encoders[col] = LabelEncoder()
    df[col] = encoders[col].fit_transform(df[col].astype(str))

# Sidebar Inputs
st.sidebar.header("✈️ User Input")
start_country_input = st.sidebar.text_input("🌍 Starting Country:")
destination_country_input = st.sidebar.text_input("📍 Destination Country:")
airline_input = st.sidebar.text_input("🛩 Airline Name:")
seat_class_input = st.sidebar.selectbox("💺 Seat Class:", ["Economy", "Business", "First Class"])
passengers = st.sidebar.number_input("👥 Passengers:", min_value=1, max_value=500, value=1)
travel_date = st.sidebar.date_input("📆 Travel Date:")

# OpenWeatherMap API
@st.cache_data
def get_destination_info(destination):
    api_key = "9059a78073e501e5ef7397f9159668bf"  # Replace with your real key
    url = f"https://api.openweathermap.org/data/2.5/weather?q={destination}&appid={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    return None

# Prediction Logic
if st.sidebar.button("🚀 Predict"):
    try:
        predicted_cost = df["Cost"].mean()
        predicted_weather = "Clear"  # Default

        sampled_df = df.sample(n=1000, random_state=42) if len(df) > 1000 else df

        # Predict Cost
        cost_series = sampled_df["Cost"].astype(float)
        if len(cost_series) > 5:
            model_cost = ARIMA(cost_series, order=(1, 1, 1)).fit()
            predicted_cost = model_cost.forecast(steps=1).iloc[0]

        # Predict Weather
        weather_series = sampled_df["Weather"].astype(float)
        if len(weather_series) > 5:
            model_weather = SARIMAX(weather_series, order=(1, 1, 1), seasonal_order=(1, 1, 1, 12)).fit()
            predicted_weather_index = int(round(model_weather.forecast(steps=1).iloc[0]))
            weather_classes = encoders["Weather"].classes_
            if 0 <= predicted_weather_index < len(weather_classes):
                predicted_weather = weather_classes[predicted_weather_index]

        # Show Predictions
        st.subheader("📊 Prediction Results")
        st.write(f"### 💰 Predicted Flight Cost: **${predicted_cost:.2f}**")
        st.write(f"### 🌦️ Predicted Weather: **{predicted_weather}**")

        # Good/Bad weather suggestion
        bad_weather = ["Stormy", "Rainy", "Snowy", "Foggy"]
        if predicted_weather in bad_weather:
            st.warning("⚠️ Bad weather predicted. Suggesting alternative date...")
            alt_date = travel_date + pd.DateOffset(days=3)
            st.write(f"### Suggested Travel Date: **{alt_date.date()}**")
        else:
            st.success("✅ Good weather predicted! You’re good to go!")
            st.write(f"### Planned Travel Date: **{travel_date}**")

        # Live destination weather
        destination_info = get_destination_info(destination_country_input)
        if destination_info:
            st.subheader("🌍 Live Weather at Destination")
            st.write(f"**Weather:** {destination_info['weather'][0]['description'].title()}")
            st.write(f"**Temperature:** {destination_info['main']['temp']} K")
            st.write(f"**Humidity:** {destination_info['main']['humidity']}%")
            st.write(f"**Wind Speed:** {destination_info['wind']['speed']} m/s")

    except Exception as e:
        st.error(f"🚫 Error during prediction: {e}")