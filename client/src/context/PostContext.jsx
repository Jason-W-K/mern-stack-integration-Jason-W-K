import { createContext, useContext, useState, useEffect } from 'react';
import useApi from '../hooks/useApi';

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

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
          get('/categories')
        ]);
        setPosts(postData);
        setCategories(categoryData);
      } catch (err) {
        setError('Failed to load posts or categories');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, categories, loading, error }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;