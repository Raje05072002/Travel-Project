import streamlit as st
import pandas as pd
import plotly.express as px
import streamlit as st

st.title("Analytics Page")
st.write("This is the Analytics page.")


st.title("📊 Flight Cost Analytics")

@st.cache_data
def load_data():
    df = pd.read_csv("flight_data_large_cleaned.csv")
    df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
    df.dropna(subset=["Date"], inplace=True)
    df["Year"] = df["Date"].dt.year
    df["Month"] = df["Date"].dt.month
    return df

df = load_data()

selected_year = st.selectbox("Select Year:", sorted(df["Year"].unique(), reverse=True))
cost_trend = df[df["Year"] == selected_year].groupby("Month")["Cost"].mean().reset_index()

fig_cost = px.line(cost_trend, x="Month", y="Cost", title=f"📈 Average Monthly Cost - {selected_year}", markers=True)
st.plotly_chart(fig_cost, use_container_width=True)
