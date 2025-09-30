import React from 'react';

const MatchInfo = ({ matchScore }) => {
  const isStrongMatch = matchScore >= 75;

  return (
    <div style={{ marginTop: 20, padding: 10, border: '1px solid #ccc', borderRadius: 8 }}>
      <h3>
        Match Score: <span style={{ color: isStrongMatch ? 'green' : 'orange' }}>{matchScore}%</span>
      </h3>
      <p style={{ fontWeight: 'bold', color: isStrongMatch ? 'green' : 'orange' }}>
        {isStrongMatch ? '✅ Great match!' : '⚠ Could be improved.'}
      </p>
    </div>
  );
};

export default MatchInfo;
////matchInfo.js