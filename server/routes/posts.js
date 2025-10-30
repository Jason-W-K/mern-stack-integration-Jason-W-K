const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { body } = require('express-validator');

// GET all posts
router.get('/', postController.getPosts);

// GET single post by ID
router.get('/:id', postController.getPostById);

// POST create new post with validation
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
  ],
  postController.createPost
);

// PUT update post
router.put('/:id', postController.updatePost);

// DELETE post
router.delete('/:id', postController.deletePost);

module.exports = router;