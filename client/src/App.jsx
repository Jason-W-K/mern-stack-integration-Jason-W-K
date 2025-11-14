import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import SinglePost from './components/SinglePost';
import PostForm from './components/PostForm';
import PostProvider from './context/PostContext'; // ✅ default import
import AuthProvider from './context/AuthContext'; // ✅ default import
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setMessage(`Backend connected. ${data.length} posts found.`))
      .catch(() => setMessage('Error connecting to backend'));
  }, []);

  return (
    <AuthProvider>
      <PostProvider>
        <div style={{ fontFamily: 'Segoe UI, sans-serif', background: '#fafafa', minHeight: '100vh' }}>
          <Navbar />

          <main style={{ padding: '2rem' }}>
            <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>MERN Blog App</h1>
            <p style={{ marginBottom: '1rem', color: '#555' }}>
              Backend says: <strong>{message}</strong>
            </p>
            <hr style={{ marginBottom: '2rem' }} />

            <Routes>
              <Route path="/" element={<PostList />} />
              <Route path="/posts/:id" element={<SinglePost />} />
              <Route path="/create" element={<PostForm />} />
              <Route path="/edit/:id" element={<PostForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </main>
        </div>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;