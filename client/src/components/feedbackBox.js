// feedbackBox.js
import React, { useState } from 'react';

const FeedbackBox = ({ resumeText, jobDescription }) => {
  const [loading, setLoading] = useState(false);

  const handleDownloadPDF = async () => {
    if (!resumeText || !jobDescription) {
      alert('❗ Missing resume text or job description.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/generate-feedback/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      if (!res.ok) throw new Error('Failed to generate PDF');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'AI_Feedback.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('❌ PDF Download Error:', err);
      alert('❌ Failed to download feedback PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h4>📄 AI Feedback PDF</h4>
      <button onClick={handleDownloadPDF} disabled={loading}>
        {loading ? 'Generating PDF...' : 'Download AI Feedback PDF'}
      </button>
    </div>
  );
};

export default FeedbackBox;
////feedbackBox.js