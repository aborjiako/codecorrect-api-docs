# How to Find Your Vercel Production URL

## Option 1: Find it in Vercel Dashboard (Easiest)

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Login if needed

2. **Find Your Project:**
   - Look for a project named `codecorrect-api-docs` or similar
   - Click on it

3. **Check the Production URL:**
   - At the top of the project page, you'll see the **production URL**
   - It should look like: `https://codecorrect-api-docs.vercel.app` (no hash/random string)
   - This is your production URL!

4. **Verify it's Production:**
   - Click on the **Deployments** tab
   - Look for a deployment with a green checkmark ✅
   - That's your production deployment
   - The URL shown there is your production URL

## Option 2: Deploy to Production (If you haven't already)

If you don't see a production deployment, deploy one:

1. **Install Vercel CLI (if not installed):**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   cd /Users/ab/codecorrect-api-docs/backend
   vercel login
   ```

3. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

4. **Copy the URL:**
   - The command will output a URL like: `https://codecorrect-api-docs.vercel.app`
   - That's your production URL!

## Option 3: Check Project Settings

1. Go to your project in Vercel dashboard
2. Click **Settings** → **Domains**
3. You'll see the production domain listed there

## What to Look For

✅ **Production URL (Correct):**
- `https://codecorrect-api-docs.vercel.app`
- `https://your-project-name.vercel.app`
- No random hash/string in the middle

❌ **Preview URL (Wrong - requires auth):**
- `https://codecorrect-api-docs-8n6sigfkt-bryant-orjiakois-projects.vercel.app`
- Has a random hash/string
- Requires authentication

## Once You Have the Production URL

Update `src/config/api.js` line 11:
```javascript
: 'https://YOUR-PRODUCTION-URL.vercel.app/api';
```

Then rebuild:
```bash
npm run build
```

