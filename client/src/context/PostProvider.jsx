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
      } catch {
        setError('Failed to load posts or categories'); // ✅ removed unused _err
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [get]); // ✅ dependency array is correct

  return (
    <PostContext.Provider value={{ posts, setPosts, categories, loading, error }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;