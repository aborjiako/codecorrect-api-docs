# 🚀 EduFlow - Deployed URLs

## Production URLs

### Backend API (Vercel)
**Base URL:** `https://backend-fkmh370ou-bryant-orjiakois-projects.vercel.app`

**API Endpoints:**
- Version: `https://backend-fkmh370ou-bryant-orjiakois-projects.vercel.app/api/version`
- Health Check: `https://backend-fkmh370ou-bryant-orjiakois-projects.vercel.app/health`
- Authentication: `https://backend-fkmh370ou-bryant-orjiakois-projects.vercel.app/api/auth/*`
- Courses: `https://backend-fkmh370ou-bryant-orjiakois-projects.vercel.app/api/courses`

### Frontend (Netlify)
**Website URL:** https://eduflow-codecorrect.netlify.app/

**Direct Links:**
- Landing Page: https://eduflow-codecorrect.netlify.app/
- Login Page: https://eduflow-codecorrect.netlify.app/login
- Student Dashboard: https://eduflow-codecorrect.netlify.app/dashboard/student
- Instructor Dashboard: https://eduflow-codecorrect.netlify.app/dashboard/instructor
- Settings: https://eduflow-codecorrect.netlify.app/settings

---

## Quick Access

### Test Backend
```bash
curl https://backend-fkmh370ou-bryant-orjiakois-projects.vercel.app/api/version
```

### Test Frontend
Visit your Netlify URL in a browser and try logging in with:
- Email: `student@eduflow.dev`
- Password: `ChangeMe123!`

---

## Deployment Status

✅ **Backend:** Deployed and working on Vercel  
✅ **Frontend:** Deployed on Netlify  
✅ **Database:** Connected to Neon PostgreSQL  
✅ **API:** Publicly accessible (protection disabled)

---

## Configuration

- **Frontend API Config:** `src/config/api.js`
- **Backend Vercel Config:** `backend/vercel.json`
- **Environment Variables:** Set in Vercel dashboard

