// API Configuration
// Update this file with your Vercel backend URL before deploying to Netlify

// Priority order:
// 1) Use VITE_API_BASE_URL if defined (local .env or Netlify environment variable)
// 2) If we're running Vite in development mode, hit the local backend
// 3) Fallback to the deployed backend URL

const LOCAL_API = 'http://localhost:5000/api';
const PROD_API = 'https://backend-fkmh370ou-bryant-orjiakois-projects.vercel.app/api';

const resolveApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && envUrl.length > 0) {
    return envUrl;
  }

  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    if (host === 'localhost' || host === '127.0.0.1') {
      return LOCAL_API;
    }
  }

  return PROD_API;
};

export const API_BASE_URL = resolveApiBaseUrl();

