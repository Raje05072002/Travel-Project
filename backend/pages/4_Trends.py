import streamlit as st
import pandas as pd
import plotly.express as px

st.title("📈 Monthly Seat Availability Trends")

@st.cache_data
def load_data():
    df = pd.read_csv("flight_data_large_cleaned.csv")
    df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
    df.dropna(subset=["Date"], inplace=True)
    df["Month"] = df["Date"].dt.month
    return df

df = load_data()

seat_availability = df.groupby("Month")["AvailableSeats"].mean().reset_index()

fig_seat = px.bar(
    seat_availability,
    x="Month",
    y="AvailableSeats",
    title="💺 Average Monthly Seat Availability",
    color="AvailableSeats",
    template="plotly_dark"
)

st.plotly_chart(fig_seat, use_container_width=True)
