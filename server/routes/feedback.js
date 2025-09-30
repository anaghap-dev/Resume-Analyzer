const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 0.5,
    responseMimeType: "application/json",
  }
});

router.post('/generate-feedback', async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'Missing resume or job description' });
  }

  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in environment variables');
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompt = `
You are a professional resume analyst. Compare this resume to the job description and provide detailed feedback.

Respond with ONLY a JSON object in this exact format:
{
  "score": 85,
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}

Resume:
${resumeText}

Job Description:
${jobDescription}

Analyze the match and provide the JSON response.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const raw = response.text().trim();

    console.log('✅ Gemini AI Response received');
    console.log('Raw response:', raw);

    // Remove markdown code blocks if present
    let cleanedResponse = raw.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    try {
      const feedback = JSON.parse(cleanedResponse);
      res.json(feedback);
    } catch (err) {
      console.error('❌ JSON parse error:', err.message);
      console.log('Cleaned AI output:', cleanedResponse);
      res.status(500).json({ error: 'Invalid JSON from AI', rawResponse: raw });
    }
  } catch (err) {
    console.error('❌ Gemini AI Error:', err.message);
    console.error('Error details:', err);
    res.status(500).json({ error: 'Gemini AI request failed', details: err.message });
  }
});

module.exports = router;
////feedback.js