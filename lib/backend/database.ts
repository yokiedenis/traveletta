import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://yokasdenis:oldaman@cluster012.nehxw.mongodb.net/ariella-adventures';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      })
      .then(mongoose => {
        console.log('✓ MongoDB connected successfully');
        return mongoose;
      })
      .catch(error => {
        console.error('✗ MongoDB connection error:', {
          message: error.message,
          code: error.code,
          uri: MONGODB_URI?.substring(0, 50) + '...',
        });
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
