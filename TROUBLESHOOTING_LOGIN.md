# Troubleshooting "Load Failed" on Login

## Issue
Login shows "load failed" error when trying to authenticate.

## Possible Causes & Solutions

### 1. **Netlify is serving an old build**
**Solution:** Redeploy the frontend with the latest build
- The `dist` folder has been rebuilt with the correct API URL
- Go to Netlify dashboard and redeploy, or drag the new `dist` folder to Netlify Drop

### 2. **Browser cache**
**Solution:** Hard refresh the page
- **Chrome/Edge:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- **Firefox:** `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)
- **Safari:** `Cmd+Option+R`

### 3. **CORS issue**
**Check:** Open browser console (F12) and look for CORS errors
- The backend has CORS enabled with `app.use(cors())`
- Should allow all origins (`access-control-allow-origin: *`)

### 4. **API URL mismatch**
**Verify:** Check browser console Network tab
- Should be calling: `https://backend-fkmh370ou-bryant-orjiakois-projects.vercel.app/api/auth/login`
- If it's calling a different URL, the build is outdated

### 5. **Network/Connectivity**
**Test:** Try accessing the API directly
```bash
curl https://backend-fkmh370ou-bryant-orjiakois-projects.vercel.app/api/version
```
Should return: `{"service":"EduFlow API","version":"0.1.0"}`

## Quick Fix Steps

1. **Rebuild frontend:**
   ```bash
   cd /Users/ab/codecorrect-api-docs
   npm run build
   ```

2. **Redeploy to Netlify:**
   - Go to https://app.netlify.com/drop
   - Drag the new `dist` folder

3. **Clear browser cache:**
   - Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

4. **Check browser console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Go to Network tab
   - Try logging in again
   - Check the failed request and see the error details

## Current Configuration

- **Frontend URL:** https://eduflow-codecorrect.netlify.app/
- **Backend API URL:** https://backend-fkmh370ou-bryant-orjiakois-projects.vercel.app/api
- **Config File:** `src/config/api.js`

## Test API Directly

Test the login endpoint:
```bash
curl -X POST https://backend-fkmh370ou-bryant-orjiakois-projects.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@eduflow.dev","password":"ChangeMe123!"}'
```

Should return user data and a token.

