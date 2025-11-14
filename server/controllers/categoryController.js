import Category from '../models/Category.js';
import { validationResult } from 'express-validator';

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const category = new Category(req.body);
  await category.save();
  res.status(201).json(category);
};