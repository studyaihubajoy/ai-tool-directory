import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // যদি URI না থাকে, তবে এরর না দিয়ে রিটার্ন করবে (বিল্ড পাস করার জন্য)
  if (!MONGODB_URI) {
    console.log("Waiting for MONGODB_URI...");
    return null;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;