require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const path = require('path');
const feedbackRoute = require('./routes/feedback');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', feedbackRoute);

app.post('/parse', upload.single('resume'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    try {
        const data = await pdfParse(req.file.buffer);
        const text = data.text?.trim();
        res.json({ text });
    } catch (err) {
        console.error('❌ Error parsing PDF:', err.message);
        res.status(500).json({ error: 'Failed to extract text' });
    }
});

app.post('/analyze', (req, res) => {
    const { text, jobDescription } = req.body;
    if (!text || !jobDescription) {
        return res.status(400).json({ error: 'Missing data' });
    }

    const resumeWords = text.toLowerCase().split(/\W+/);
    const jobWords = jobDescription.toLowerCase().split(/\W+/);
    const matched = jobWords.filter(
        word => resumeWords.includes(word) && word.length > 3
    );
    const score = Math.round((matched.length / jobWords.length) * 100);

    res.json({
        matchScore: score,
        matchedKeywords: [...new Set(matched)],
    });
});

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
////server.js