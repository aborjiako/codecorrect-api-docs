import { useState, useRef, useMemo } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import '../styles.css';
import { apiClient, setAuthToken } from '../lib/apiClient.js';

const ROLE_STORAGE_KEY = 'eduflow-role';
const PROFILE_STORAGE_KEY = 'eduflow-profile';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modeParam = searchParams.get('mode');
  const isLoginMode = useMemo(() => modeParam === 'login', [modeParam]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: 'John',
    lastName: 'Doe',
    role: 'student',
    emailConfirmation: true,
  });
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const redirectToDashboard = (role, profile) => {
    const normalizedRole = role === 'instructor' ? 'instructor' : 'student';

    if (typeof window !== 'undefined') {
      localStorage.setItem(ROLE_STORAGE_KEY, normalizedRole);
      localStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify({
          username: profile.username ?? profile.email,
          firstName: profile.firstName ?? null,
          lastName: profile.lastName ?? null,
          email: profile.email,
          role: normalizedRole,
        }),
      );
      window.dispatchEvent(new Event('roleChange'));
      window.dispatchEvent(new Event('userProfileChange'));
    }

    const path = normalizedRole === 'instructor' ? '/dashboard/instructor' : '/dashboard/student';
    navigate(path);
    setTimeout(() => {
      if (window.location.pathname !== path) {
        window.location.href = path;
      }
    }, 100);
  };

  const parseErrorMessage = (error) => {
    if (!error?.message) return 'Something went wrong';
    try {
      const parsed = JSON.parse(error.message);
      if (typeof parsed === 'object' && parsed !== null && parsed.message) {
        return parsed.message;
      }
    } catch {
      // ignore
    }
    return error.message;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizeRole = (roleValue) => (roleValue?.toLowerCase() === 'instructor' ? 'instructor' : 'student');

    try {
      if (isLoginMode) {
        const response = await apiClient.post('/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        setAuthToken(response.token);
        const normalizedRole = normalizeRole(response.user.role);
        redirectToDashboard(normalizedRole, {
          username: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.email,
        });
        return;
      }

      const payload = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
      };

      const response = await apiClient.post('/auth/register', payload);
      setAuthToken(response.token);

      const normalizedRole = normalizeRole(response.user.role);
      redirectToDashboard(normalizedRole, {
        username: formData.username || response.user.email,
        firstName: response.user.firstName,
        lastName: response.user.lastName,
        email: response.user.email,
      });
    } catch (error) {
      const friendlyMessage = parseErrorMessage(error);

      if (isLoginMode) {
        if (friendlyMessage.toLowerCase().includes('invalid email or password')) {
          alert('We could not find that account. Switching you to sign up so you can create it!');
          navigate('/login?mode=signup');
          return;
        }

        if (/network|fetch|connect/i.test(friendlyMessage)) {
          alert('Backend is unavailable, but we will take you to the dashboard in demo mode.');
          redirectToDashboard(formData.role, {
            username: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
          });
          return;
        }
      }

      alert(friendlyMessage || 'Could not submit form. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div>
            <h1>{isLoginMode ? 'Welcome back!' : 'Welcome!'}</h1>
            <h2>{isLoginMode ? 'Log in to continue' : 'User details'}</h2>
          </div>
          <Link to="/" className="close-btn">
            ×
          </Link>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="username">
                Username <span className="required">*</span>
              </label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@address.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div className="hint">{isLoginMode ? 'Enter your password' : 'Enter a password (min 6 chars)'}</div>
          </div>

          {!isLoginMode && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group full-width">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="emailConfirmation"
                    name="emailConfirmation"
                    checked={formData.emailConfirmation}
                    onChange={handleChange}
                  />
                  <label htmlFor="emailConfirmation">Send email confirmation</label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="role">Role (Student/Instructor)</label>
                  <select id="role" name="role" value={formData.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </div>

                <div className="form-group profile-picture-section">
                  <label>Profile picture</label>
                  <div className="profile-picture-placeholder" onClick={handleImageClick} style={{ cursor: 'pointer', position: 'relative' }}>
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '12px',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          color: 'var(--gray)',
                          fontSize: '0.9rem',
                        }}
                      >
                        <div style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>📷</div>
                        <div>Click to upload</div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <button type="button" className="select-image-btn" onClick={handleImageClick}>
                    {profileImage ? 'Change image' : 'Select image'}
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-signup">
              {isLoginMode ? 'Log In' : 'Sign Up'}
            </button>
            <button type="button" onClick={() => navigate('/')} className="btn-cancel">
              Cancel
            </button>
          </div>
          <div className="login-quick-links">
            {isLoginMode ? (
              <p>
                Need an account? <Link to="/login?mode=signup">Create one</Link>.
              </p>
            ) : (
              <p>
                Already have an account? <Link to="/login?mode=login">Log in</Link>.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

