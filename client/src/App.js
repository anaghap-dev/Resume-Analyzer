import React, { useState } from 'react';
import {
  parseResume,
  analyzeResume,
  getAIFeedback,
} from './api';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [parsedText, setParsedText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [matchScore, setMatchScore] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResumeFile(file);
    setParsedText('');
    setMatchScore(null);
    setFeedback('');
  };

  const handleAnalyze = async () => {
    if (!resumeFile || !jobDescription) {
      alert('Please upload a resume and paste a job description');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);

    setLoading(true);
    try {
      const parsed = await parseResume(formData);
      setParsedText(parsed.text || '');

      const analysis = await analyzeResume({
        parsedText: parsed.text,
        jobDescription,
      });

      setMatchScore(analysis.matchScore || 0);
    } catch (err) {
      console.error(err);
      alert('Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async () => {
    if (!parsedText || !jobDescription) return;

    setLoading(true);
    try {
      const res = await getAIFeedback({
        resumeText: parsedText,
        jobDescription,
      });

      const formattedFeedback = `✅ Match Score: ${res.score}\n\n💪 Strengths:\n- ${res.strengths.join(
        '\n- '
      )}\n\n🛠 Suggestions:\n- ${res.suggestions.join('\n- ')}`;

      setFeedback(formattedFeedback);
    } catch (err) {
      console.error(err?.response?.data || err?.message || err);
      alert('Feedback generation failed');
    } finally {
      setLoading(false);
    }
  };

  const getScoreClass = (score) => {
    if (score >= 70) return 'score-good';
    if (score >= 50) return 'score-average';
    return 'score-poor';
  };

  const getScoreText = (score) => {
    if (score >= 70) return 'Excellent Match!';
    if (score >= 50) return 'Good Match';
    return 'Needs Improvement';
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Resume Analyzer</h1>
        <p>Analyze your resume against job descriptions with AI-powered insights</p>
      </header>

      <div className="main-container">
        <div className="upload-section">
          <h3>Upload Your Resume</h3>
          <div className="file-input-wrapper">
            <input
              type="file"
              accept=".pdf"
              onChange={handleResumeChange}
              className="file-input"
            />
            <div className="file-input-button">
              <span>📄</span>
              <span>{resumeFile ? resumeFile.name : 'Choose PDF file or drag & drop'}</span>
            </div>
          </div>
        </div>

        {parsedText && (
          <div className="parsed-text">
            <h4>📋 Parsed Resume Content</h4>
            <pre>{parsedText}</pre>
          </div>
        )}

        <div className="job-description-section">
          <h3>Job Description</h3>
          <textarea
            className="textarea"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows="6"
          />
        </div>

        <button
          className="button"
          onClick={handleAnalyze}
          disabled={loading || !resumeFile || !jobDescription}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Analyzing...
            </>
          ) : (
            '🔍 Analyze Resume'
          )}
        </button>

        {matchScore !== null && (
          <div className="results-section">
            <div className="match-score">
              <h3>Match Score</h3>
              <div className={`score-badge ${getScoreClass(matchScore)}`}>
                {matchScore}% - {getScoreText(matchScore)}
              </div>
            </div>

            <button
              className="button button-secondary"
              onClick={handleFeedback}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Generating...
                </>
              ) : (
                '🤖 Get AI Feedback'
              )}
            </button>

            {feedback && (
              <div className="feedback-section">
                <h4>💡 AI-Powered Insights</h4>
                <div className="feedback-content">{feedback}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
///App.js