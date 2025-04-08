// src/pages/TravelTips.js
import React from 'react';
import { TipsContainer, TipCard } from './TravelTips.styles';

const TravelTips = () => {
  const tips = [
    {
      title: 'Packing Smart',
      content: 'Roll your clothes to save space and prevent wrinkles. Use packing cubes for organization.',
      icon: '🧳'
    },
    {
      title: 'Flight Booking',
      content: 'Book flights on Tuesday afternoon for the best deals. Avoid weekends when prices are higher.',
      icon: '✈️'
    },
    {
      title: 'Local Transportation',
      content: 'Research public transport options before arrival. Many cities offer tourist passes for unlimited travel.',
      icon: '🚇'
    }
  ];

  return (
    <TipsContainer>
      <h1>✈️ Travel Tips & Hacks</h1>
      <div className="tips-grid">
        {tips.map((tip, index) => (
          <TipCard key={index}>
            <div className="tip-icon">{tip.icon}</div>
            <h3>{tip.title}</h3>
            <p>{tip.content}</p>
          </TipCard>
        ))}
      </div>
    </TipsContainer>
  );
};

export default TravelTips;