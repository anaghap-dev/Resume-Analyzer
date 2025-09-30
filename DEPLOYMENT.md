# 🚀 Deploy Resume Analyzer to Render

Follow these steps to deploy your Resume Analyzer to Render:

## 📋 Prerequisites

1. **Git Repository**: Your code needs to be in a Git repository (GitHub, GitLab, etc.)
2. **Render Account**: Create a free account at [render.com](https://render.com)

## 🔧 Deployment Steps

### Step 1: Push to Git Repository

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Resume Analyzer"
   ```

2. Create a repository on GitHub and push your code:
   ```bash
   git remote add origin https://github.com/yourusername/resume-analyzer.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy on Render

1. **Login to Render**: Go to [render.com](https://render.com) and sign in
2. **New Web Service**: Click "New +" → "Web Service"
3. **Connect Repository**:
   - Connect your GitHub account
   - Select your resume-analyzer repository
4. **Configure Service**:
   - **Name**: `resume-analyzer` (or any name you prefer)
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Select "Free" (or paid plan if needed)

### Step 3: Environment Variables (Optional)

If your app needs environment variables:
1. In the Render dashboard, go to your service
2. Click "Environment" tab
3. Add any required variables (e.g., API keys)

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your app
3. Wait for the build to complete (usually 5-10 minutes)
4. Your app will be available at: `https://your-service-name.onrender.com`

## 🎯 What's Configured

✅ **Full-stack deployment**: Both React frontend and Express backend
✅ **Production build**: Optimized React build served by Express
✅ **Static file serving**: CSS, JS, and assets properly served
✅ **API routes**: All backend endpoints work correctly
✅ **Environment detection**: Automatically uses production settings

## 🔍 Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### App Not Loading
- Check if build completed successfully
- Verify the start command is correct
- Check server logs for errors

### API Calls Failing
- Ensure API endpoints are correctly configured
- Check CORS settings in server.js
- Verify environment variables

## 📱 Testing Your Deployment

Once deployed, test these features:
1. ✅ Upload a PDF resume
2. ✅ Parse resume text
3. ✅ Add job description
4. ✅ Analyze match score
5. ✅ Generate AI feedback (if configured)

## 🔄 Future Updates

To update your deployed app:
1. Make changes to your code
2. Commit and push to your repository
3. Render will automatically redeploy

---

🎉 **Congratulations!** Your Resume Analyzer is now live on the web!