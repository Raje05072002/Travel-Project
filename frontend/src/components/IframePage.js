
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiLoader } from 'react-icons/fi';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
  120% { transform: rotate(250deg); }
  
`;

const IframeContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 180px);
  position: relative;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
`;

const Spinner = styled(FiLoader)`
  animation: ${spin} 1s linear infinite;
  font-size: 2rem;
  color: #4f46e5;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  color: #374151;
  font-size: 1rem;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 180px);
  border: none;
  display: ${({ $loading }) => ($loading ? 'none' : 'block')};
`;

const IframePage = ({ page }) => {
  const [loading, setLoading] = useState(true);
  const iframeUrl = process.env.REACT_APP_IFRAME_BASE_URL || 'http://localhost:8501';

  // Map frontend routes to backend endpoints
  const pageMap = {
    'Home': '',
    'Prediction': 'prediction',
    'Analytics': 'analytics',
    'Trends': 'trends',
    'Hotels': 'hotels',
    'Chatbot': 'chatbot',
    'About': 'about'
  };

  return (
    <IframeContainer>
      {loading && (
        <LoadingOverlay>
          <Spinner />
          <LoadingText>Loading travel insights...</LoadingText>
        </LoadingOverlay>
      )}
      <StyledIframe
        src={`${iframeUrl}/${pageMap[page]}`}
        title={page}
        onLoad={() => setLoading(false)}
        $loading={loading}
        allow="geolocation *; microphone *"
      />
    </IframeContainer>
  );
};

export default IframePage;