import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/postRoutes.js';
import categoryRoutes from './routes/CategoryRoutes.js';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express(); // ✅ Declare app before using it
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes); // ✅ Moved below app declaration
app.use('/uploads', express.static('uploads')); // ✅ Serve uploaded images

// ✅ Error handling
app.use(errorHandler);

// ✅ MongoDB connection
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

startServer();