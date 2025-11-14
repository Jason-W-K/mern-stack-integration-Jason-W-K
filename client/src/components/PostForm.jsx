import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useApi from '../hooks/useApi';
import { usePosts } from '../context/PostContext';

const PostForm = () => {
  const { id } = useParams(); // if present, we're editing
  const navigate = useNavigate();
  const { categories } = usePosts();
  const { get, post, put } = useApi();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      console.error('Upload failed', err);
      setStatus('Image upload failed.');
    }
  };

  useEffect(() => {
    if (id) {
      get(`/posts/${id}`)
        .then(post => {
          setTitle(post.title);
          setBody(post.body);
          setCategoryId(post.category?._id || '');
          setImageUrl(post.imageUrl || '');
        })
        .catch(() => setStatus('Error loading post'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      body,
      category: categoryId,
      imageUrl // ✅ include image URL
    };

    try {
      if (id) {
        await put(`/posts/${id}`, payload);
        setStatus('Post updated!');
      } else {
        await post('/posts', payload);
        setStatus('Post created!');
        setTitle('');
        setBody('');
        setCategoryId('');
        setImageUrl('');
      }

      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      console.error('Error submitting post:', err);
      setStatus('Failed to submit post.');
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>{id ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          style={{ display: 'block', marginBottom: '1rem', width: '100%' }}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'block', marginBottom: '1rem' }}
        />
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            style={{ width: '200px', marginBottom: '1rem', borderRadius: '8px' }}
          />
        )}

        <button type="submit">{id ? 'Update Post' : 'Create Post'}</button>
      </form>
      {status && <p style={{ marginTop: '1rem', color: '#555' }}>{status}</p>}
    </div>
  );
};

export default PostForm;