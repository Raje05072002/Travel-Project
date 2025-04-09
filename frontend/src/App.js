
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import Analytics from './pages/Analytics';
import Trends from './pages/Trends';
import Hotels from './pages/Hotels';
import Chatbot from './pages/Chatbot';
import About from './pages/About';
import BackendEmbed from './pages/BackendEmbed'; 

function App() {
  return (
    <Router>
      <Navbar /> 
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/about" element={<About />} />
          <Route path="/backend" element={<BackendEmbed />} /> {/* Optional */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
export default App;