import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb";
import ClientHome from "./ClientHome";

// বিল্ড টাইমে ডাটাবেস এরর এড়াতে এই লাইনটি অত্যন্ত জরুরি
export const dynamic = 'force-dynamic';

// MongoDB Schema (এটি টুলের ডাটা স্ট্রাকচার নিশ্চিত করে)
const ToolSchema = new mongoose.Schema({}, { strict: false });
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function Home() {
  let tools = [];
  
  try {
    // ১. ডাটাবেস কানেক্ট করা
    await dbConnect();
    
    // ২. ডাটাবেস থেকে সব ডাটা আনা এবং Plain Object এ রূপান্তর
    const data = await Tool.find({}).lean();
    
    // ৩. Next.js যেন ডাটা রিড করতে পারে তাই JSON স্ট্রিং এ কনভার্ট
    tools = JSON.parse(JSON.stringify(data));
  } catch (error) {
    // যদি ডাটাবেস কানেক্ট না হয় তবে কনসোলে এরর দেখাবে কিন্তু সাইট ক্রাশ করবে না
    console.error("Database connection error in page.tsx:", error);
  }

  return (
    <main>
      {/* ৪. সংগৃহীত ডাটা ClientHome এ পাঠিয়ে দেওয়া হচ্ছে */}
      <ClientHome initialTools={tools} />
    </main>
  );
}