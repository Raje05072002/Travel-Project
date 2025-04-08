import React from 'react';

const IframePage = ({ page }) => {
  if (!page) {
    return <div>Error: Page prop is missing.</div>;
  }

  return (
    <iframe
      title={page}
      src={`http://localhost:8501/${page}`}
      width="100%"
      height="1000px"
      frameBorder="0"
      style={{ border: 'none' }}
    />
  );
};

[browser]
serverAddress = "localhost"
serverPort = 8501
gatherUsageStats = false

[server]
enableCORS = false
enableXsrfProtection = false
headless = true
enableWebsocketCompression = false

export default IframePage;
