import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPost } from '../services/api';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  fetchPost(id)
    .then((data) => {
      setPost(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching post:', err);
      setLoading(false);
    });
}, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!post) return <div className="p-4">Post not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-2">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">Category: {post.category?.name || 'Uncategorized'}</p>
    </div>
  );
}