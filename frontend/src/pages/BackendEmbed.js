import React from 'react';

const BackendEmbed = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src="http://localhost:8501"
        title="Embedded Backend"
        style={{ width: '100%', height: '100%', border: 'none' }}
      ></iframe>
    </div>
  );
};

export default BackendEmbed;