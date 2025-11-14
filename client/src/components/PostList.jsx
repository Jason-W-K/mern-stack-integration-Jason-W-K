import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';

const PostList = () => {
  const { get, del } = useApi();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    get(`/posts?page=${page}&limit=5`)
      .then((data) => {
        console.log('Fetched posts:', data);
        setPosts(Array.isArray(data.posts) ? data.posts : []);
        setTotalPages(Math.ceil((data.total || 0) / 5));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load posts');
        setLoading(false);
      });
  }, [page, get]); // ✅ added 'get' to dependency array

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    const originalPosts = [...posts];
    setPosts(posts.filter((p) => p._id !== id));

    try {
      await del(`/posts/${id}`);
    } catch (err) {
      console.error('Error deleting post:', err);
      setPosts(originalPosts);
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Posts</h2>

      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}
          >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <small>Category: {post.category?.name}</small>
            <br />
            <Link to={`/posts/${post._id}`}>View Details</Link> |{' '}
            <Link to={`/edit/${post._id}`}>Edit</Link> |{' '}
            <button onClick={() => handleDelete(post._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}

      {/* Pagination Controls */}
      <div style={{ marginTop: '2rem' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              marginRight: '0.5rem',
              padding: '0.5rem 1rem',
              background: page === i + 1 ? '#333' : '#eee',
              color: page === i + 1 ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostList;