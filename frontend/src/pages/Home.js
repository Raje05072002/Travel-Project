// pages/Home.js
import React from 'react';
import styled from 'styled-components';
import IframePage from '../components/IframePage';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4f46e5 0%, #10b981 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 8px;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #4f46e5;
    margin-bottom: 1rem;
  }

  p {
    color: #6b7280;
    line-height: 1.6;
  }
`;

const Home = () => {
  return (
    <div>
      <HeroSection>
        <HeroTitle>Smart Travel Predictions Powered by AI</HeroTitle>
        <HeroSubtitle>
          Get accurate cost estimates, weather forecasts, and personalized recommendations 
          for your next trip with our advanced AI technology.
        </HeroSubtitle>
      </HeroSection>

      <FeatureGrid>
        <FeatureCard>
          <h3>Flight Cost Prediction</h3>
          <p>Get accurate predictions of flight costs based on historical data and current trends.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Weather Forecast</h3>
          <p>Plan your trip with reliable weather predictions for your destination.</p>
        </FeatureCard>
        <FeatureCard>
          <h3>Hotel Recommendations</h3>
          <p>Discover the best accommodations tailored to your preferences and budget.</p>
        </FeatureCard>
      </FeatureGrid>

      <IframePage page="Home" />
    </div>
  );
};

export default Home;