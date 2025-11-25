import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles.css';

const ROLE_STORAGE_KEY = 'eduflow-role';
const PROFILE_STORAGE_KEY = 'eduflow-profile';

const getSavedRole = () => {
  if (typeof window === 'undefined') return 'guest';
  return localStorage.getItem(ROLE_STORAGE_KEY) || 'guest';
};

const getSavedProfile = () => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const buildDisplayName = (profile, fallback) => {
  if (!profile) return fallback;
  const first = profile.firstName?.trim();
  const last = profile.lastName?.trim();
  const merged = [first, last].filter(Boolean).join(' ').trim();
  if (merged) return merged;
  if (profile.username) return profile.username;
  if (profile.email) return profile.email;
  return fallback;
};

const buildRoleLabel = (profile, fallback) => {
  if (!profile) return fallback;
  if (profile.role === 'instructor') return 'Instructor · EduFlow';
  if (profile.role === 'student') return 'Student · EduFlow';
  return fallback;
};

const buildInitials = (profile, fallbackName) => {
  if (!profile) return fallbackName.slice(0, 1).toUpperCase();
  const first = profile.firstName?.trim()?.charAt(0);
  const last = profile.lastName?.trim()?.charAt(0);
  const initials = [first, last].filter(Boolean).join('');
  if (initials) return initials.slice(0, 2).toUpperCase();
  if (profile.username) return profile.username.slice(0, 1).toUpperCase();
  return fallbackName.slice(0, 1).toUpperCase();
};

function MainLayout({ title, subtitle, children, user = { name: 'Jordan Steele', role: 'Product Designer' } }) {
  const [role, setRole] = useState(getSavedRole);
  const [profile, setProfile] = useState(getSavedProfile);

  useEffect(() => {
    const handleUserContextChange = () => {
      setRole(getSavedRole());
      setProfile(getSavedProfile());
    };
    window.addEventListener('storage', handleUserContextChange);
    window.addEventListener('roleChange', handleUserContextChange);
    window.addEventListener('userProfileChange', handleUserContextChange);
    return () => {
      window.removeEventListener('storage', handleUserContextChange);
      window.removeEventListener('roleChange', handleUserContextChange);
      window.removeEventListener('userProfileChange', handleUserContextChange);
    };
  }, []);

  const fallbackUser = user || { name: 'Jordan Steele', role: 'Product Designer' };
  const displayName = buildDisplayName(profile, fallbackUser.name);
  const displayRole = buildRoleLabel(profile, fallbackUser.role);
  const initials = buildInitials(profile, displayName);

  const isInstructor = role === 'instructor';
  const instructorClassName = ({ isActive }) => {
    let classes = 'app-nav-link';
    if (isActive) classes += ' is-active';
    if (!isInstructor) classes += ' is-disabled';
    return classes;
  };
  const handleInstructorClick = (event) => {
    if (!isInstructor) {
      event.preventDefault();
      alert('This area is reserved for instructors. Choose the instructor role on login to access it.');
    }
  };

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-brand">
          <span className="app-logo">EduFlow</span>
          <span className="app-tag">Learn code correctly</span>
        </div>
        <nav className="app-nav">
          <NavLink
            to="/dashboard/student"
            className={({ isActive }) => `app-nav-link ${isActive ? 'is-active' : ''}`}
          >
            <span className="app-nav-icon">👩‍🎓</span>
            Student Dashboard
          </NavLink>
          <NavLink
            to="/dashboard/instructor"
            className={instructorClassName}
            aria-disabled={!isInstructor}
            onClick={handleInstructorClick}
          >
            <span className="app-nav-icon">🧑‍🏫</span>
            Instructor Dashboard
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `app-nav-link ${isActive ? 'is-active' : ''}`}
          >
            <span className="app-nav-icon">⚙️</span>
            Settings
          </NavLink>
        </nav>
        <div className="app-help-card">
          <h4>Need help?</h4>
          <p>Explore quick tips, templates, and best practices to keep your courses thriving.</p>
          <a href="#support" className="app-help-link">Visit support →</a>
        </div>
      </aside>

      <div className="app-main">
        <header className="app-header">
          <div>
            <p className="app-section-label">{subtitle}</p>
            <h1 className="app-page-title">{title}</h1>
          </div>
          <div className="app-user-card">
            <div className="app-user-initials">{initials}</div>
            <div>
              <p className="app-user-name">{displayName}</p>
              <p className="app-user-role">{displayRole}</p>
            </div>
          </div>
        </header>

        <div className="app-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
