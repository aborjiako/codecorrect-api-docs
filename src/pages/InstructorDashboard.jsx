import MainLayout from '../components/MainLayout';

const courses = [
  {
    title: 'Intro to Python Automation',
    code: 'PY-201',
    learners: 42,
    completion: 68,
    status: 'In progress',
  },
  {
    title: 'Creative HTML & CSS',
    code: 'WEB-110',
    learners: 37,
    completion: 82,
    status: 'Healthy',
  },
  {
    title: 'JavaScript Problem Solving',
    code: 'JS-305',
    learners: 51,
    completion: 47,
    status: 'Needs support',
  },
];

const learnerProgress = [
  { name: 'Amelia Chen', progress: 92, delta: '+6%', status: 'On track', avatar: 'AC' },
  { name: 'Santiago Cruz', progress: 78, delta: '+4%', status: 'Momentum building', avatar: 'SC' },
  { name: 'Lina Yusuf', progress: 64, delta: '-3%', status: 'Check-in needed', avatar: 'LY' },
  { name: 'Noah Patel', progress: 51, delta: '+1%', status: 'Steady', avatar: 'NP' },
];

const insights = [
  {
    title: 'Launch recorded walkthroughs',
    description: 'Learners revisit tricky modules 2.3× more when recordings are available.',
    action: 'Create recording',
  },
  {
    title: 'Plan peer feedback session',
    description: 'Weekly peer reviews boost completion by 19%. Invite mentors to facilitate.',
    action: 'Schedule review',
  },
];

function InstructorDashboard() {
  return (
    <MainLayout
      title="Instructor Command Center"
      subtitle="Monitor cohorts, unblock learners, celebrate wins"
      user={{ name: 'Maya Hollis', role: 'Lead Instructor · EduFlow' }}
    >
      <section className="panel-group">
        <div className="panel">
          <div className="panel-header">
            <h2>Your active courses</h2>
            <button className="panel-action">Create new course</button>
          </div>
          <table className="course-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Learners</th>
                <th>Completion</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.code}>
                  <td>
                    <p className="course-name">{course.title}</p>
                    <p className="course-code">{course.code}</p>
                  </td>
                  <td>{course.learners}</td>
                  <td>
                    <div className="table-progress">
                      <span style={{ width: `${course.completion}%` }} />
                    </div>
                    <p>{course.completion}%</p>
                  </td>
                  <td>
                    <span className={`status-chip ${course.status.replace(/\s+/g, '-').toLowerCase()}`}>
                      {course.status}
                    </span>
                  </td>
                  <td><button className="inline-link">Open dashboard</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel compact">
          <div className="panel-header">
            <h2>Learner momentum</h2>
            <button className="panel-action">View all learners</button>
          </div>
          <ul className="learner-list">
            {learnerProgress.map((learner) => (
              <li key={learner.name}>
                <div className="learner-avatar">{learner.avatar}</div>
                <div className="learner-details">
                  <p className="learner-name">{learner.name}</p>
                  <p className="learner-status">{learner.status}</p>
                </div>
                <div className="learner-progress">
                  <div className="learner-progress-meter">
                    <span style={{ width: `${learner.progress}%` }} />
                  </div>
                  <p>{learner.progress}% · {learner.delta}</p>
                </div>
                <button className="inline-link">Send nudge</button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="panel-group">
        <div className="panel compact">
          <div className="panel-header">
            <h2>Weekly tasks</h2>
            <button className="panel-action">View planner</button>
          </div>
          <ul className="task-list">
            <li>
              <input type="checkbox" defaultChecked />
              <div>
                <p>Review capstone submissions for HTML & CSS</p>
                <p className="task-meta">Due today · 6 learners waiting</p>
              </div>
              <button className="inline-link">Open review queue</button>
            </li>
            <li>
              <input type="checkbox" />
              <div>
                <p>Record JavaScript sprint retro recap</p>
                <p className="task-meta">Due tomorrow · learners requested highlights</p>
              </div>
              <button className="inline-link">Start recording</button>
            </li>
            <li>
              <input type="checkbox" />
              <div>
                <p>Invite guest mentor for automation clinic</p>
                <p className="task-meta">This Friday · Maya from Ops can help</p>
              </div>
              <button className="inline-link">Send invite</button>
            </li>
          </ul>
        </div>

        <div className="panel compact">
          <div className="panel-header">
            <h2>Program insights</h2>
            <button className="panel-action">View analytics</button>
          </div>
          <div className="insight-grid">
            {insights.map((insight) => (
              <article key={insight.title}>
                <h3>{insight.title}</h3>
                <p>{insight.description}</p>
                <button className="inline-link">{insight.action}</button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}

export default InstructorDashboard;
