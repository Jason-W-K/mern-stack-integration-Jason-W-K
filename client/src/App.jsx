import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostView from './pages/PostView';
import PostForm from './pages/PostForm';
import Navbar from './components/NavBar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts/:id" element={<PostView />} />
        <Route path="/create" element={<PostForm />} />
        <Route path="/edit/:id" element={<PostForm />} />
      </Routes>
    </div>
  );
}

export default App;