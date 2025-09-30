const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/generate-feedback', async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'Missing resume or job description' });
  }

  const prompt = `
Compare this resume to the job description. Respond in valid JSON format:
{
  "score": (match score out of 100),
  "strengths": [list key strengths],
  "suggestions": [list resume improvement tips]
}

Resume:
"""${resumeText}"""

Job Description:
"""${jobDescription}"""
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    const raw = response.choices[0].message.content.trim();

    try {
      const feedback = JSON.parse(raw);
      res.json(feedback);
    } catch (err) {
      console.error('❌ JSON parse error:', err.message);
      console.log('Raw AI output:', raw);
      res.status(500).json({ error: 'Invalid JSON from AI', rawResponse: raw });
    }
  } catch (err) {
    console.error('❌ OpenAI Error:', err.message);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

module.exports = router;
////feedback.js