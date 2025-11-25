import MainLayout from '../components/MainLayout';
import { useNavigate } from 'react-router-dom';

const ROLE_STORAGE_KEY = 'eduflow-role';

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ROLE_STORAGE_KEY);
      window.dispatchEvent(new Event('roleChange'));
    }
    navigate('/');
  };

  return (
    <MainLayout
      title="Settings & Preferences"
      subtitle="Fine-tune your experience and manage your account"
      user={{ name: 'Jordan Steele', role: 'EduFlow member since 2024' }}
    >
      <section className="panel-group settings">
        <div className="panel">
          <div className="panel-header">
            <h2>Account</h2>
            <button className="panel-action">Update avatar</button>
          </div>
          <div className="settings-grid">
            <article>
              <h3>Profile details</h3>
              <p>Control how your name and role appear to other learners.</p>
              <div className="settings-field">
                <label>Display name</label>
                <input defaultValue="Jordan Steele" />
              </div>
              <div className="settings-field">
                <label>Headline</label>
                <input defaultValue="Curious developer exploring automation & UI" />
              </div>
              <button className="primary-btn">Save changes</button>
            </article>
            <article>
              <h3>Security</h3>
              <p>Keep your account secure with two-step verification.</p>
              <div className="settings-field">
                <label>Password</label>
                <button className="ghost-btn">Change password</button>
              </div>
              <div className="settings-field inline">
                <label>Two-factor auth</label>
                <span className="toggle on">enabled</span>
              </div>
              <button className="ghost-btn">Manage trusted devices</button>
            </article>
          </div>
        </div>
      </section>

      <section className="panel-group settings">
        <div className="panel compact">
          <div className="panel-header">
            <h2>Notifications</h2>
            <button className="panel-action">Pause for 24 hours</button>
          </div>
          <ul className="settings-list">
            <li>
              <div>
                <p>Course reminders</p>
                <p className="settings-meta">Due dates, upcoming sessions, streak guidance</p>
              </div>
              <span className="toggle on">on</span>
            </li>
            <li>
              <div>
                <p>Peer feedback</p>
                <p className="settings-meta">Alerts when someone requests review support</p>
              </div>
              <span className="toggle on">on</span>
            </li>
            <li>
              <div>
                <p>Product updates</p>
                <p className="settings-meta">New features, release notes, webinars</p>
              </div>
              <span className="toggle off">off</span>
            </li>
          </ul>
        </div>

        <div className="panel compact">
          <div className="panel-header">
            <h2>App preferences</h2>
          </div>
          <div className="preferences-grid">
            <article>
              <h3>Theme</h3>
              <p>Match your preferred working environment.</p>
              <div className="preference-buttons">
                <button className="chip active">Auto</button>
                <button className="chip">Light</button>
                <button className="chip">Dark</button>
              </div>
            </article>
            <article>
              <h3>Code font</h3>
              <p>Pick the font family you love reading code in.</p>
              <div className="preference-buttons">
                <button className="chip">Fira Code</button>
                <button className="chip active">JetBrains Mono</button>
                <button className="chip">IBM Plex Mono</button>
              </div>
            </article>
            <article>
              <h3>Weekly summary</h3>
              <p>Recap your progress every Monday morning.</p>
              <div className="preference-buttons">
                <button className="chip active">Email</button>
                <button className="chip">Push</button>
                <button className="chip">Off</button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="panel danger">
        <div className="panel-header">
          <h2>Manage access</h2>
          <p className="danger-note">Need to take a break? You can always return when you're ready.</p>
        </div>
        <div className="danger-actions">
          <button className="ghost-btn">Deactivate account</button>
          <button className="danger-btn" onClick={handleLogout}>Log out of EduFlow</button>
        </div>
      </section>
    </MainLayout>
  );
}

export default Settings;
