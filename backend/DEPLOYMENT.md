# Backend Deployment Guide for Vercel

This guide walks you through deploying the EduFlow backend to Vercel.

## Prerequisites

- A Vercel account (sign up at https://vercel.com)
- Your Neon database connection string
- A JWT secret (any secure random string)

## Step-by-Step Deployment

### 1. Install Vercel CLI (if not already installed)

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
cd backend
vercel login
```

### 3. Deploy to Vercel

From the `backend/` directory:

```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Choose your account
- **Link to existing project?** → No (first time) or Yes (if updating)
- **Project name?** → `eduflow-backend` (or your preferred name)
- **Directory?** → `./` (current directory)
- **Override settings?** → No (we'll set env vars in the dashboard)

### 4. Set Environment Variables

After the first deployment, you need to add environment variables in the Vercel dashboard:

1. Go to https://vercel.com/dashboard
2. Click on your project (`eduflow-backend`)
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `DATABASE_URL` | `postgresql://neondb_owner:npg_ZqE9iB7pkJFV@ep-shiny-fire-aezhq7fl-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require` | Production, Preview, Development |
   | `JWT_SECRET` | `your-secret-key-here` (use the same one from your local `.env`) | Production, Preview, Development |

5. Click **Save** for each variable

### 5. Redeploy

After adding environment variables, trigger a new deployment:

```bash
vercel --prod
```

Or redeploy from the Vercel dashboard:
- Go to **Deployments** tab
- Click the **⋯** menu on the latest deployment
- Click **Redeploy**

### 6. Test Your Deployment

Once deployed, Vercel will give you a URL like:
```
https://eduflow-backend-xxxxx.vercel.app
```

Test the API:
```bash
# Health check
curl https://your-project.vercel.app/health

# Version endpoint
curl https://your-project.vercel.app/api/version
```

You should see:
```json
{"service": "EduFlow API", "version": "0.1.0"}
```

### 7. Get Your API Base URL

Your API base URL will be:
```
https://your-project.vercel.app/api
```

**Save this URL** - you'll need it for the frontend `.env` file.

## Troubleshooting

### Build fails with "Prisma Client not generated"

Make sure `prisma generate` runs during build. The `vercel:build` script should include it:
```json
"vercel:build": "prisma generate && npm run build"
```

### "DATABASE_URL is not configured" error

- Verify environment variables are set in Vercel dashboard
- Make sure you selected **Production, Preview, Development** for each variable
- Redeploy after adding variables

### API returns 404

- Check that your routes in `vercel.json` match your API paths
- Ensure `api/index.ts` is correctly exporting the handler

### Connection timeout to database

- Verify your Neon connection string is correct
- Check if your Neon database allows connections from Vercel's IPs
- Try using the connection pooler URL (ends with `-pooler`)

## Next Steps

After successful deployment:
1. Update your frontend `.env` file with the Vercel API URL
2. Redeploy the frontend (Netlify) to use the new backend URL
3. Test login/signup flows end-to-end

