import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';

const SinglePost = () => {
  const { id } = useParams();
  const { get } = useApi();

  const [post, setPost] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await get(`/posts/${id}`);
        setPost(data);
        setStatus('loaded');
      } catch (err) {
        console.error('Error fetching post:', err);
        setStatus('error');
      }
    };

    fetchPost();
  }, [id, get]); // ✅ added 'get' to dependency array

  if (status === 'loading') return <p>Loading post...</p>;
  if (status === 'error') return <p>Failed to load post.</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <small>Category: {post.category?.name}</small>
    </div>
  );
};

export default SinglePost;