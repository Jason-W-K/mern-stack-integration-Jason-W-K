import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';

dotenv.config();

const categories = [
  { name: 'Mental Health' },
  { name: 'Nutrition' },
  { name: 'Fitness' },
  { name: 'Wellness' },
  { name: 'Sleep' },
  { name: 'Chronic Illness' },
  { name: 'First Aid' },
  { name: 'Reproductive Health' },
  { name: 'Child Health' },
  { name: 'Elderly Care' }
];

const seedCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Category.insertMany(categories);
    console.log('✅ Categories seeded successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Error seeding categories:', err.message);
    process.exit(1);
  }
};

seedCategories();