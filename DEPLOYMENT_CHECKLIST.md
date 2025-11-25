# 🚀 Deployment Checklist

## Backend Deployment (Vercel)

### Pre-Deployment Setup
- [x] Backend code complete
- [x] Vercel configuration (`vercel.json`) ready
- [x] Prisma schema and migrations ready
- [x] Local `.env` file created with `DATABASE_URL` and `JWT_SECRET`
- [ ] Vercel CLI installed (or use `npx vercel`)

### Deploy to Production

1. **Login to Vercel:**
   ```bash
   cd /Users/ab/codecorrect-api-docs/backend
   ./deploy-production.sh
   ```
   Or manually:
   ```bash
   npx vercel login
   ```

2. **Set Environment Variables in Vercel Dashboard:**
   - Go to: https://vercel.com/dashboard
   - Find project: `codecorrect-api-docs`
   - Settings → Environment Variables
   - Add:
     - `DATABASE_URL` = `postgresql://neondb_owner:npg_ZqE9iB7pkJFV@ep-shiny-fire-aezhq7fl-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
     - `JWT_SECRET` = `dev-secret`
   - Select: Production, Preview, Development
   - Save

3. **Deploy:**
   ```bash
   npx vercel --prod
   ```

4. **Copy Production URL:**
   - The command will output: `https://codecorrect-api-docs.vercel.app` (or similar)
   - Your API base URL: `https://codecorrect-api-docs.vercel.app/api`

---

## Frontend Deployment (Netlify)

### Pre-Deployment Setup
- [x] Frontend code complete
- [x] Config file (`src/config/api.js`) created
- [x] Build process tested (`npm run build` works)
- [ ] Production backend URL obtained

### Deploy to Netlify

1. **Update Frontend Config:**
   - Edit `src/config/api.js`
   - Replace line 11 with your production Vercel URL:
     ```javascript
     : 'https://codecorrect-api-docs.vercel.app/api';
     ```

2. **Build Frontend:**
   ```bash
   cd /Users/ab/codecorrect-api-docs
   npm run build
   ```

3. **Deploy to Netlify:**
   
   **Option A: Netlify Drop (Easiest)**
   - Go to: https://app.netlify.com/drop
   - Drag the `dist` folder onto the page
   - Your site is live!

   **Option B: Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir=dist
   ```

   **Option C: Git-based**
   - Push code to GitHub
   - Connect repo to Netlify
   - Build command: `npm run build`
   - Publish directory: `dist`

---

## Testing

After deployment, test:

1. **Backend:**
   ```bash
   curl https://your-backend.vercel.app/api/version
   # Should return: {"service":"EduFlow API","version":"0.1.0"}
   ```

2. **Frontend:**
   - Visit your Netlify URL
   - Try logging in with: `student@eduflow.dev` / `ChangeMe123!`
   - Check if dashboard loads with backend data

---

## Troubleshooting

### Backend Issues

**"Authentication Required" error:**
- You're using a preview URL, not production
- Deploy with `vercel --prod` to get production URL

**"DATABASE_URL is not configured":**
- Add environment variables in Vercel dashboard
- Redeploy after adding them

**"Prisma Client not generated":**
- The build script should handle this
- Check `vercel:build` in `package.json` includes `prisma generate`

### Frontend Issues

**"Load failed" on login:**
- Check `src/config/api.js` has correct production URL
- Rebuild frontend after changing config
- Check browser console for CORS errors

**Backend not reachable:**
- Verify backend URL is accessible: `curl https://your-backend.vercel.app/api/version`
- Check if backend is production deployment (not preview)

---

## Quick Reference

**Backend Production URL Format:**
```
https://codecorrect-api-docs.vercel.app/api
```

**Frontend Config Location:**
```
src/config/api.js (line 11)
```

**Build Commands:**
```bash
# Backend
cd backend && npm run build

# Frontend  
npm run build
```

