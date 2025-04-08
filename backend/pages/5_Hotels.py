import streamlit as st
import requests

st.title("🏨 Hotel & Trip Recommendations")

destination = st.text_input("Enter Destination City:")

if destination:
    # Hotel Recommendations (using dummy/free API or mock data)
    st.subheader(f"🛏️ Recommended Hotels in {destination}")
    hotels = [
        {"name": "Luxury Inn", "rating": 4.5, "location": f"{destination} Downtown"},
        {"name": "Budget Stay", "rating": 4.0, "location": f"{destination} City Center"},
        {"name": "Airport Hotel", "rating": 4.3, "location": f"{destination} Near Airport"},
    ]

    for hotel in hotels:
        st.markdown(f"**🏨 {hotel['name']}**")
        st.write(f"⭐ Rating: {hotel['rating']}")
        st.write(f"📍 Location: {hotel['location']}")
        st.markdown("---")

    # Trip Places
    st.subheader(f"🌍 Top Places to Visit in {destination}")
    places = [
        f"{destination} National Park",
        f"{destination} Museum of History",
        f"{destination} Riverside Walk",
        f"{destination} Art Gallery",
    ]

    for place in places:
        st.markdown(f"- 📌 {place}")
