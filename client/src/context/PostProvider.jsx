import { useState, useEffect } from 'react';
import { PostContext } from './PostContext';
import useApi from '../hooks/useApi';

const PostProvider = ({ children }) => {
  const { get } = useApi();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, categoryData] = await Promise.all([
          get('/posts'),
          get('/categories'),
        ]);
        setPosts(postData);
        setCategories(categoryData);
      } catch (_err) {
        setError('Failed to load posts or categories');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [get]); // ✅ added 'get' to dependency array

  return (
    <PostContext.Provider value={{ posts, setPosts, categories, loading, error }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;