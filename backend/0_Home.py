import streamlit as st

st.set_page_config(
    page_title="Flight & Travel Assistant",
    page_icon="🛫",
    layout="wide",
    initial_sidebar_state="expanded",
)

st.title("🛫 Welcome to Flight Cost & Weather Forecasting Assistant")

st.markdown("""
Welcome to your **Travel Assistant Project**! ✈️🌍  
Here you can explore features like:
- 🔮 **Flight Cost Prediction**
- 🌦️ **Weather Forecast**
- 📊 **Trend Analytics**
- 🏨 **Hotel Recommendations**
- 💬 **AI Chat Support**
- 📚 **Project Info in About Page**

Use the sidebar to navigate through the different features.
""")

with st.sidebar:
    st.info("👈 Select a page to get started!", icon="ℹ️")
    
