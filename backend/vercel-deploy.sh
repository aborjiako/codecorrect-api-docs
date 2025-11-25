#!/bin/bash
# Quick deployment script for Vercel

echo "🚀 Deploying EduFlow Backend to Vercel..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

echo "📦 Building and deploying..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Go to https://vercel.com/dashboard"
echo "2. Find your project and go to Settings → Environment Variables"
echo "3. Add DATABASE_URL and JWT_SECRET"
echo "4. Redeploy from the dashboard or run: vercel --prod"
echo ""
echo "🔗 Your API URL will be: https://your-project.vercel.app/api"

