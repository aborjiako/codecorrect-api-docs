# Frontend Deployment Guide (Netlify Workaround)

Since Netlify's environment variables require a paid plan, we're using a config file approach.

## Step 1: Get Your Vercel Backend URL

After deploying your backend to Vercel, you'll have a URL like:
```
https://eduflow-backend-abc123.vercel.app
```

Your API base URL will be:
```
https://eduflow-backend-abc123.vercel.app/api
```

## Step 2: Update the Config File

Before deploying, update `src/config/api.js`:

```javascript
export const API_BASE_URL = 'https://your-actual-backend.vercel.app/api';
```

Replace `your-actual-backend.vercel.app` with your actual Vercel project URL.

## Step 3: Build and Deploy

### Option A: Netlify Drop (Drag & Drop)

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder onto the page
4. Your site will be live!

### Option B: Netlify CLI

1. Install Netlify CLI (if not already):
   ```bash
   npm install -g netlify-cli
   ```

2. Login:
   ```bash
   netlify login
   ```

3. Deploy:
   ```bash
   npm run build
   netlify deploy --prod --dir=dist
   ```

### Option C: Git-based Deployment

1. Push your code to GitHub
2. Connect your repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

## Alternative: Use Vercel for Frontend (Free, Supports Env Vars)

If you prefer using environment variables:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. From the project root:
   ```bash
   vercel
   ```

3. Set environment variable in Vercel dashboard:
   - Go to your project → Settings → Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://your-backend.vercel.app/api`
   - Redeploy

Vercel's free tier fully supports environment variables!

