import React, { useState } from 'react';
import { parseResume } from '../api'; // ensure this points to your api.js

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [parsedText, setParsedText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please choose a PDF file');
    setLoading(true);

    const formData = new FormData();
    formData.append('resume', file); // ✅ Fixed key to match backend

    try {
      const res = await parseResume(formData);
      setParsedText(res.text);
    } catch (err) {
      console.error('❌ Error parsing resume:', err);
      alert('Failed to extract text from PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Resume PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Parsing...' : 'Extract Resume Text'}
      </button>

      {parsedText && (
        <>
          <h3>Parsed Resume Text:</h3>
          <pre style={{ background: '#f8f8f8', padding: 10 }}>{parsedText}</pre>
        </>
      )}
    </div>
  );
};

export default ResumeUpload;
////ResumeUpload.js