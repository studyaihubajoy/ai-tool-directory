import mongoose from 'mongoose';

// সরাসরি আপনার URI এখানে দিয়ে একবার টেস্ট করতে পারেন (নিরাপত্তার জন্য পরে সরাবেন)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://admin:Ajoy%402019@cluster0.haukpr7.mongodb.net/study_ai_hub?retryWrites=true&w=majority";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI missing in Environment Variables");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  
  try {
    cached.conn = await cached.promise;
    console.log("Connected successfully!");
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;