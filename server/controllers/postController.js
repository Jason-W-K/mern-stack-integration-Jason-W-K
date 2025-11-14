import Post from '../models/Post.js';
import { validationResult } from 'express-validator';

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    const regex = new RegExp(search, 'i'); // case-insensitive search
    const query = search ? { title: regex } : {};

    const posts = await Post.find(query)
      .populate('category')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Post.countDocuments(query);

    res.json({ posts, total });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
};

export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update post' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
};