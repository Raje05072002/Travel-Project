# itinerary_planner.py
import streamlit as st
from datetime import datetime, timedelta
import requests
import pandas as pd
import plotly.express as px

st.set_page_config(
    page_title="Travel Itinerary Planner",
    page_icon="🗓️",
    layout="wide"
)

def get_pois(city, days):
    """Get points of interest for a city (mock function)"""
    pois = {
        "New York": [
            {"name": "Statue of Liberty", "type": "Landmark", "duration": 3},
            {"name": "Central Park", "type": "Park", "duration": 4},
            {"name": "Metropolitan Museum", "type": "Museum", "duration": 5},
            {"name": "Times Square", "type": "Landmark", "duration": 2},
            {"name": "Broadway Show", "type": "Entertainment", "duration": 3}
        ],
        "Paris": [
            {"name": "Eiffel Tower", "type": "Landmark", "duration": 3},
            {"name": "Louvre Museum", "type": "Museum", "duration": 6},
            {"name": "Notre-Dame", "type": "Landmark", "duration": 2},
            {"name": "Montmartre", "type": "Neighborhood", "duration": 4},
            {"name": "Seine River Cruise", "type": "Activity", "duration": 2}
        ]
    }
    return pois.get(city, [])

def main():
    st.title("🗓️ AI-Powered Itinerary Planner")
    
    col1, col2 = st.columns(2)
    with col1:
        destination = st.text_input("Destination City", "New York")
        start_date = st.date_input("Start Date", datetime.today() + timedelta(days=7))
        end_date = st.date_input("End Date", datetime.today() + timedelta(days=10))
        travel_style = st.selectbox("Travel Style", ["Relaxed", "Moderate", "Fast-paced"])
        interests = st.multiselect(
            "Your Interests",
            ["Museums", "Landmarks", "Food", "Shopping", "Nature", "Nightlife"],
            ["Museums", "Landmarks"]
        )
    
    days = (end_date - start_date).days + 1
    if days <= 0:
        st.error("End date must be after start date")
        return
    
    if st.button("Generate Itinerary", type="primary"):
        with st.spinner("Creating your personalized itinerary..."):
            # Get points of interest
            pois = get_pois(destination, days)
            
            # Filter by interests
            interest_types = {
                "Museums": "Museum",
                "Landmarks": "Landmark",
                "Nature": ["Park", "Garden"],
                "Food": "Restaurant",
                "Nightlife": ["Bar", "Club"]
            }
            
            filtered_pois = []
            for interest in interests:
                types = interest_types.get(interest, [])
                if isinstance(types, str):
                    types = [types]
                filtered_pois.extend([poi for poi in pois if poi["type"] in types])
            
            # Remove duplicates
            unique_pois = []
            seen = set()
            for poi in filtered_pois:
                if poi["name"] not in seen:
                    seen.add(poi["name"])
                    unique_pois.append(poi)
            
            # Sort by duration (longest first)
            unique_pois.sort(key=lambda x: x["duration"], reverse=True)
            
            # Create itinerary
            itinerary = {}
            current_day = start_date
            hours_per_day = 8 if travel_style == "Moderate" else 6 if travel_style == "Relaxed" else 10
            
            for day_num in range(days):
                day_pois = []
                remaining_hours = hours_per_day
                
                for poi in unique_pois[:]:
                    if poi["duration"] <= remaining_hours and poi not in [p for p_list in itinerary.values() for p in p_list]:
                        day_pois.append(poi)
                        remaining_hours -= poi["duration"]
                        unique_pois.remove(poi)
                
                itinerary[current_day.strftime("%A, %b %d")] = day_pois
                current_day += timedelta(days=1)
            
            # Display itinerary
            st.success("Here's your personalized itinerary!")
            
            for day, activities in itinerary.items():
                with st.expander(f"**{day}**"):
                    if not activities:
                        st.write("Free day to explore at your leisure!")
                        continue
                        
                    total_hours = sum(a["duration"] for a in activities)
                    st.progress(total_hours / hours_per_day)
                    
                    for i, activity in enumerate(activities, 1):
                        cols = st.columns([1, 4, 1])
                        cols[0].write(f"**{i}.**")
                        cols[1].write(f"**{activity['name']}** ({activity['type']})")
                        cols[2].write(f"⏱️ {activity['duration']}h")
                        
                        # Add small gap between activities
                        st.write("")
            
            # Visualization
            st.subheader("Itinerary Overview")
            itinerary_df = pd.DataFrame([
                {
                    "Day": day,
                    "Activities": len(activities),
                    "Hours": sum(a["duration"] for a in activities),
                    "Date": datetime.strptime(day.split(",")[1].strip(), "%b %d").strftime("%b %d")
                }
                for day, activities in itinerary.items()
            ])
            
            fig = px.bar(
                itinerary_df,
                x="Date",
                y="Hours",
                color="Activities",
                title="Daily Activity Hours",
                labels={"Hours": "Total Hours", "Activities": "Number of Activities"},
                color_continuous_scale="Blues"
            )
            st.plotly_chart(fig, use_container_width=True)

if __name__ == "__main__":
    main()