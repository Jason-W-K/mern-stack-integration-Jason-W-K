import { body } from 'express-validator';

export const validatePost = [
  body('title').notEmpty().withMessage('Title is required'),
  body('body').notEmpty().withMessage('Body is required'),
  body('category').isMongoId().withMessage('Valid category ID is required'),
];

export const validateCategory = [
  body('name').notEmpty().withMessage('Category name is required'),
];