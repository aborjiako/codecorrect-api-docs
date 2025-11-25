import { useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout';
import { apiClient } from '../lib/apiClient.js';

const metricCards = [
  { label: 'Total Courses', value: '5', change: '+2 this week', tone: 'primary', icon: '📚' },
  { label: 'Active Streak', value: '8 days', change: 'Keep it going!', tone: 'neutral', icon: '🔥' },
  { label: 'Practice Time', value: '24 hrs', change: '+6 hrs vs last week', tone: 'neutral', icon: '⏱' },
  { label: 'Assignments', value: '12', change: '3 due this week', tone: 'neutral', icon: '📝' },
];

const languageTracks = [
  {
    name: 'Python',
    description: 'Build automation scripts and data pipelines.',
    progress: 76,
    className: 'python',
    accent: 'Learn by building practical mini-projects.',
  },
  {
    name: 'HTML & CSS',
    description: 'Design modern, responsive interfaces.',
    progress: 62,
    className: 'html',
    accent: 'Craft pixel-perfect layouts with confidence.',
  },
  {
    name: 'JavaScript',
    description: 'Bring your ideas to life with interactivity.',
    progress: 48,
    className: 'javascript',
    accent: 'Master async patterns & DOM fundamentals.',
  },
  {
    name: 'React',
    description: 'Ship component-driven experiences.',
    progress: 54,
    className: 'react',
    accent: 'Dial in hooks, state, and routing mastery.',
  },
  {
    name: 'Java',
    description: 'Power up services, APIs, and Android.',
    progress: 41,
    className: 'java',
    accent: 'Strengthen Spring Boot + OOP patterns.',
  },
];

const achievements = [
  { title: 'Ship Your First App', description: 'Complete the onboarding sprint challenge.', status: 'Complete', icon: '🚀' },
  { title: 'Code Review Champion', description: 'Provide thoughtful feedback five times.', status: 'In progress', icon: '💬' },
  { title: 'Debugging Maestro', description: 'Solve three debugging quests in a week.', status: 'Locked', icon: '🧩' },
];

const upcomingSessions = [
  { title: 'Python Pair Programming', date: 'Tue, 10:00 AM', host: 'Natalie Rivers', type: 'Workshop' },
  { title: 'Designing Semantic Layouts', date: 'Wed, 1:00 PM', host: 'Mason Lee', type: 'Live lesson' },
  { title: 'Project Feedback Clinic', date: 'Fri, 3:30 PM', host: 'Team EduFlow', type: 'Office hours' },
];

function StudentDashboard() {
  const [apiMessage, setApiMessage] = useState('Connecting to backend…');
  const [courses, setCourses] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const [version, me, coursesResponse] = await Promise.all([
          apiClient.get('/version'),
          apiClient.get('/auth/me'),
          apiClient.get('/courses'),
        ]);
        if (!isMounted) return;
        setApiMessage(`Backend says: ${version.service} v${version.version}`);
        setProfile(me.user);
        setCourses(coursesResponse.courses);
      } catch (error) {
        if (!isMounted) return;
        setApiMessage(`Backend unreachable: ${error.message}`);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <MainLayout
      title="Student Dashboard"
      subtitle="Keep your learning streak alive"
      user={{ name: 'Jordan Steele', role: 'Student cohort · Spring 2026' }}
    >
      <section className="metric-grid">
        {metricCards.map((card) => (
          <article key={card.label} className={`metric-card-modern ${card.tone}`}>
            <div className="metric-card-icon">{card.icon}</div>
            <div>
              <p className="metric-card-label">{card.label}</p>
              <p className="metric-card-value">{card.value}</p>
              <p className="metric-card-change">{card.change}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="panel status-panel">
        <p>{apiMessage}</p>
      </section>

      <section className="panel status-panel">
        <p>{apiMessage}</p>
        {profile && (
          <p style={{ marginTop: '0.5rem', fontWeight: 500 }}>
            Logged in as <strong>{profile.email}</strong>
          </p>
        )}
      </section>

      <section className="panel-group">
        <div className="panel">
          <div className="panel-header">
            <h2>Your Courses</h2>
            <button className="panel-action">Explore all tracks</button>
          </div>
          <div className="language-grid">
            {(courses.length ? courses : languageTracks).map((track) => (
              <article key={track.id ?? track.name} className={`language-card ${track.className ?? 'python'}`}>
                <div className="language-card-meta">
                  <header>
                    <h3>{track.title ?? track.name}</h3>
                    <p>{track.description}</p>
                  </header>
                  <p className="language-card-accent">{track.instructorName ?? track.accent}</p>
                </div>
                <div className="language-card-progress">
                  <div className="language-progress-bar">
                    <span style={{ width: `${track.progress ?? 50}%` }} />
                  </div>
                  <p>{track.progress ?? 50}% complete</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="panel compact">
          <div className="panel-header">
            <h2>Upcoming Sessions</h2>
            <button className="panel-action">View calendar</button>
          </div>
          <ul className="session-list">
            {upcomingSessions.map((session) => (
              <li key={session.title}>
                <div>
                  <p className="session-title">{session.title}</p>
                  <p className="session-meta">{session.date} · {session.host}</p>
                </div>
                <span className="session-chip">{session.type}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel-group">
        <div className="panel compact">
          <div className="panel-header">
            <h2>Achievements</h2>
            <button className="panel-action">View badge library</button>
          </div>
          <ul className="achievement-list">
            {achievements.map((achievement) => (
              <li key={achievement.title}>
                <div className="achievement-icon-modern">{achievement.icon}</div>
                <div>
                  <p className="achievement-title">{achievement.title}</p>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
                <span className={`achievement-status ${achievement.status.replace(/\s+/g, '-').toLowerCase()}`}>
                  {achievement.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel compact">
          <div className="panel-header">
            <h2>Focus Areas</h2>
            <button className="panel-action">Adjust goals</button>
          </div>
          <div className="focus-grid">
            <article>
              <h3>Algorithmic thinking</h3>
              <p>Weekly algorithm sprints to strengthen problem solving skills.</p>
              <div className="focus-progress">
                <div className="focus-meter">
                  <span style={{ width: '58%' }} />
                </div>
                <span>58%</span>
              </div>
            </article>
            <article>
              <h3>UI polish</h3>
              <p>Improve the landing page challenge and tackle accessibility tasks.</p>
              <div className="focus-progress">
                <div className="focus-meter">
                  <span style={{ width: '72%' }} />
                </div>
                <span>72%</span>
              </div>
            </article>
            <article>
              <h3>Code reviews</h3>
              <p>Provide constructive feedback to two peers every week.</p>
              <div className="focus-progress">
                <div className="focus-meter">
                  <span style={{ width: '34%' }} />
                </div>
                <span>34%</span>
              </div>
            </article>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default StudentDashboard;
