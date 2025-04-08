import streamlit as st

st.title("💬 Travel Chatbot")

if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

prompt = st.chat_input("Ask me about flights, destinations, weather...")

if prompt:
    st.session_state.chat_history.append(("user", prompt))
    if "flight" in prompt.lower():
        response = "You can check predictions in the 'Prediction' tab."
    elif "hotel" in prompt.lower():
        response = "Try the 'Hotels' tab to see top accommodations."
    elif "weather" in prompt.lower():
        response = "Weather is forecasted on the prediction page."
    else:
        response = "I'm still learning! Try asking about flights or hotels."

    st.session_state.chat_history.append(("bot", response))

for role, text in st.session_state.chat_history:
    st.chat_message(role).write(text)
