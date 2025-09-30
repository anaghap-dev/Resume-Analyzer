# Resume Analyzer

A full-stack application that analyzes resumes against job descriptions using AI to provide match scores and feedback.

## Features

- **PDF Resume Parsing**: Extract text content from PDF resumes
- **Job Matching Analysis**: Compare resume content with job descriptions
- **AI-Powered Feedback**: Get detailed suggestions for resume improvement
- **Match Score Calculation**: Receive percentage-based compatibility scores

## Project Structure

```
├── RESUME-ANALYZER-CLIENT/     # React frontend application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── feedbackBox.js
│   │   │   ├── MatchInfo.js
│   │   │   └── ResumeUpload.js
│   │   ├── api.js             # API service functions
│   │   ├── App.js             # Main App component
│   │   ├── index.js           # React entry point
│   │   └── index.css          # Global styles
│   └── package.json
├── resume-analyzer-server/     # Node.js backend server
│   ├── models/
│   │   └── resume.js          # Data models
│   ├── routes/
│   │   └── feedback.js        # API routes
│   ├── uploads/               # File upload directory
│   ├── server.js              # Express server
│   └── package.json
├── package.json               # Root package configuration
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- OpenAI API key (for AI feedback features)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-analyzer
   ```

2. **Install dependencies for both client and server**
   ```bash
   npm run install-all
   ```

3. **Environment Configuration**
   Create a `.env` file in the `resume-analyzer-server` directory:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   PORT=5000
   ```

4. **Start the development servers**

   Terminal 1 (Backend):
   ```bash
   npm run dev-server
   ```

   Terminal 2 (Frontend):
   ```bash
   npm run start-client
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Available Scripts

- `npm run install-all` - Install dependencies for both client and server
- `npm run start-server` - Start the backend server in production mode
- `npm run dev-server` - Start the backend server in development mode with nodemon
- `npm run start-client` - Start the React development server
- `npm run build-client` - Build the React app for production

## API Endpoints

- `POST /parse` - Extract text from uploaded PDF resume
- `POST /analyze` - Analyze resume against job description
- `POST /generate-feedback` - Get AI-powered feedback and suggestions

## Usage

1. **Upload Resume**: Select a PDF resume file to upload and parse
2. **Enter Job Description**: Paste the job description you want to match against
3. **Analyze**: Click analyze to get a match score and matched keywords
4. **Get AI Feedback**: Generate detailed feedback with improvement suggestions

## Technologies Used

### Frontend
- React 18
- Create React App
- CSS3
- Fetch API

### Backend
- Node.js
- Express.js
- Multer (file uploads)
- PDF-Parse (PDF text extraction)
- OpenAI API (AI feedback generation)
- CORS
- dotenv

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.