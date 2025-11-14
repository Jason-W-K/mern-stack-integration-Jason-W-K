import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import { validatePost } from '../middleware/validators.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// ✅ Public routes
// Supports pagination and search via query params: ?page=1&limit=5&search=keyword
router.get('/', getPosts);
router.get('/:id', getPostById);

// ✅ Protected routes
router.post('/', verifyToken, validatePost, createPost);
router.put('/:id', verifyToken, validatePost, updatePost);
router.delete('/:id', verifyToken, deletePost);

export default router;