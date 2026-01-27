import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; 
import ClientHome from "./ClientHome"; // <--- এটি নিশ্চিত করুন

// ভেরসেলের বিল্ড এবং ডাটা রিফ্রেশ এরর এড়াতে এটি অত্যন্ত জরুরি
export const dynamic = 'force-dynamic';

// MongoDB Schema
const ToolSchema = new mongoose.Schema({}, { strict: false });
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function Home() {
  let tools = [];
  
  try {
    // ১. ডাটাবেস কানেক্ট করা
    await dbConnect();
    
    // ২. ডাটাবেস থেকে সব ডাটা আনা
    const data = await Tool.find({}).lean();
    
    // ৩. নেক্সট জেএস এর জন্য ডাটা সিরিয়ালাইজ করা
    tools = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Database connection error:", error);
  }

  return (
    <main>
      {/* ৪. ClientHome এ ডাটাবেস থেকে পাওয়া ডাটা পাঠিয়ে দেওয়া হচ্ছে */}
      <ClientHome initialTools={tools} />
    </main>
  );
}