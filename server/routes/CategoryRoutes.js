import express from 'express';
import {
  getCategories,
  createCategory,
} from '../controllers/categoryController.js';
import { validateCategory } from '../middleware/validators.js';

const router = express.Router();

// GET /api/categories → fetch all categories
router.get('/', getCategories);

// POST /api/categories → create a new category with validation
router.post('/', validateCategory, createCategory);

export default router;