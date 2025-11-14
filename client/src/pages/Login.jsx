import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', form);
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Log In</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;