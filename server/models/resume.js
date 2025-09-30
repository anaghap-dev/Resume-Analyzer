// server/models/Resume.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  experience: String,
  parsedText: String,
  matchScore: Number,
});

module.exports = mongoose.model('Resume', resumeSchema);
////resume.js