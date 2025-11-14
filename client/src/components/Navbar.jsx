import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{
      padding: '1rem 2rem',
      background: '#ffffff',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={linkStyle}>🏠 Home</Link>
        <Link to="/create" style={linkStyle}>✍️ Create Post</Link>
        {user && <Link to="/dashboard" style={linkStyle}>📋 Dashboard</Link>}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ fontWeight: '500', color: '#333' }}>Hi, {user.name}</span>
            <button onClick={logout} style={buttonStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>🔐 Login</Link>
            <Link to="/register" style={linkStyle}>📝 Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontWeight: '500',
  padding: '0.25rem 0.5rem',
  transition: 'color 0.2s',
};

const buttonStyle = {
  background: '#ff4d4f',
  color: '#fff',
  border: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '500',
};

export default Navbar;