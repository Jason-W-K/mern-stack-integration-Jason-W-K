import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './context/AuthContext'; // ✅ default import
import PostProvider from './context/PostContext'; // ✅ default import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);