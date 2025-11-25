import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles.css';
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import InstructorDashboard from './pages/InstructorDashboard.jsx';
import Settings from './pages/Settings.jsx';

const ROLE_STORAGE_KEY = 'eduflow-role';

const getRole = () => {
  if (typeof window === 'undefined') return 'guest';
  return localStorage.getItem(ROLE_STORAGE_KEY) || 'guest';
};

function DashboardRedirect() {
  const role = getRole();
  if (role === 'guest') {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={role === 'instructor' ? '/dashboard/instructor' : '/dashboard/student'} replace />;
}

function InstructorRoute() {
  const role = getRole();
  if (role !== 'instructor') {
    return <Navigate to={role === 'guest' ? '/login' : '/dashboard/student'} replace />;
  }
  return <InstructorDashboard />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardRedirect />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/instructor" element={<InstructorRoute />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

