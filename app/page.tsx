import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; // পাথ নিশ্চিত করতে রিলেটিভ পাথ ব্যবহার করা হয়েছে
import ClientHome from "./ClientHome";   // ইমপোর্ট এরর ঠিক করতে এটি যুক্ত করা হয়েছে

// MongoDB Schema তৈরি (যদি আপনার আলাদা মডেল ফাইল না থাকে)
const ToolSchema = new mongoose.Schema({}, { strict: false });
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function Home() {
  let tools = [];
  
  try {
    // ১. ডাটাবেস কানেক্ট করা
    await dbConnect();
    
    // ২. ডাটাবেস থেকে সব ডাটা আনা
    const data = await Tool.find({}).lean();
    
    // ৩. নেক্সট জেএস-এর জন্য ডাটা সিরিয়ালাইজ করা
    tools = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Database connection error:", error);
  }

  return (
    <main>
      {/* ৪. ClientHome কম্পোনেন্টে ডাটা পাঠানো হচ্ছে */}
      <ClientHome initialTools={tools} />
    </main>
  );
}