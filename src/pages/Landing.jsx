import { Link } from 'react-router-dom';
import '../styles.css';

function Landing() {
  return (
    <div className="landing-container">
      <div className="landing-overlay">
        <header className="landing-header">
          <p className="landing-kicker">A place to learn code correctly</p>
          <h1>EduFlow</h1>
          <p className="landing-subheading">
            Build confidence, ship projects, and stay inspired with guided paths and thoughtful mentorship.
          </p>
          <p className="landing-tagline">
            From your first &quot;Hello World&quot; to production-ready code &mdash; we grow with you at every milestone.
          </p>
        </header>
        <div className="landing-cta">
          <Link to="/login?mode=signup" className="btn btn-primary">
            Sign up
          </Link>
          <Link to="/login?mode=login" className="btn btn-secondary">
            Login
          </Link>
        </div>
        <div className="landing-highlights">
          <article>
            <span>🎯</span>
            <h3>Guided skill paths</h3>
            <p>Curated tracks keep you focused on what matters most right now.</p>
          </article>
          <article>
            <span>🤝</span>
            <h3>Mentor feedback</h3>
            <p>Meaningful review cycles that boost confidence and clarity.</p>
          </article>
          <article>
            <span>🚀</span>
            <h3>Career momentum</h3>
            <p>Celebrate wins, ship projects, and build a portfolio that shines.</p>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Landing;

