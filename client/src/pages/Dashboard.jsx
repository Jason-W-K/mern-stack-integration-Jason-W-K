import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.name || 'User'} 👋</h2>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default Dashboard;