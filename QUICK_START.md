# 🚀 Quick Start - Deploy Everything

## Step 1: Deploy Backend to Vercel (5 minutes)

```bash
cd /Users/ab/codecorrect-api-docs/backend
./deploy-production.sh
```

**OR manually:**

```bash
cd /Users/ab/codecorrect-api-docs/backend
npx vercel login
npx vercel --prod
```

**Then in Vercel Dashboard:**
1. Go to: https://vercel.com/dashboard
2. Find project: `codecorrect-api-docs`
3. Settings → Environment Variables
4. Add:
   - `DATABASE_URL` = `postgresql://neondb_owner:npg_ZqE9iB7pkJFV@ep-shiny-fire-aezhq7fl-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - `JWT_SECRET` = `dev-secret`
5. Redeploy: `npx vercel --prod`

**Copy the production URL** (e.g., `https://codecorrect-api-docs.vercel.app`)

---

## Step 2: Update Frontend Config (1 minute)

Edit `src/config/api.js` line 11:

```javascript
: 'https://YOUR-PRODUCTION-URL.vercel.app/api';
```

Replace `YOUR-PRODUCTION-URL` with the URL from Step 1.

---

## Step 3: Build Frontend (1 minute)

```bash
cd /Users/ab/codecorrect-api-docs
npm run build
```

---

## Step 4: Deploy Frontend to Netlify (2 minutes)

**Option A: Drag & Drop (Easiest)**
1. Go to: https://app.netlify.com/drop
2. Drag the `dist` folder onto the page
3. Done! 🎉

**Option B: CLI**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

---

## Step 5: Test Everything

1. Visit your Netlify URL
2. Try logging in: `student@eduflow.dev` / `ChangeMe123!`
3. Check if dashboard loads with backend data

---

## Need Help?

See `DEPLOYMENT_CHECKLIST.md` for detailed troubleshooting.

