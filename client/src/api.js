const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const parseResume = async (formData) => {
  const res = await fetch(`${BASE_URL}/parse`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
};

export const analyzeResume = async ({ parsedText, jobDescription }) => {
  const res = await fetch(`${BASE_URL}/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: parsedText, jobDescription }),
  });
  return res.json();
};

export const getAIFeedback = async ({ resumeText, jobDescription }) => {
  const res = await fetch(`${BASE_URL}/api/generate-feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText, jobDescription }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to get feedback');
  }

  return data;
};
////api.js