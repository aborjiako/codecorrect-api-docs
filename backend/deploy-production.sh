#!/bin/bash
# Automated deployment script for EduFlow Backend to Vercel Production

set -e  # Exit on error

echo "🚀 EduFlow Backend - Production Deployment"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ Error: vercel.json not found. Please run this from the backend/ directory."
    exit 1
fi

# Check if vercel is available
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx not found. Please install Node.js."
    exit 1
fi

echo "📋 Step 1: Checking Vercel authentication..."
if npx vercel whoami &> /dev/null; then
    echo "✅ Already logged in to Vercel"
    npx vercel whoami
else
    echo "🔐 Not logged in. Starting login process..."
    echo ""
    echo "A browser window will open for authentication."
    echo "Please complete the login in your browser, then press ENTER here."
    read -p "Press ENTER after you've logged in..."
    
    # Verify login worked
    if npx vercel whoami &> /dev/null; then
        echo "✅ Login successful!"
    else
        echo "❌ Login failed. Please try again."
        exit 1
    fi
fi

echo ""
echo "📋 Step 2: Checking environment variables..."
echo ""
echo "⚠️  IMPORTANT: Make sure you've set these in Vercel dashboard:"
echo "   - DATABASE_URL (your Neon connection string)"
echo "   - JWT_SECRET (your secret key)"
echo ""
read -p "Have you set the environment variables in Vercel dashboard? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📝 Please set them now:"
    echo "   1. Go to: https://vercel.com/dashboard"
    echo "   2. Find your project: codecorrect-api-docs"
    echo "   3. Go to: Settings → Environment Variables"
    echo "   4. Add: DATABASE_URL and JWT_SECRET"
    echo "   5. Run this script again"
    exit 0
fi

echo ""
echo "📋 Step 3: Deploying to production..."
echo ""
npx vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Copy the production URL shown above"
echo "   2. Update src/config/api.js in the frontend with that URL"
echo "   3. Rebuild frontend: npm run build"
echo "   4. Deploy frontend to Netlify"
echo ""
echo "🔗 Your production API URL will be: https://your-project.vercel.app/api"

