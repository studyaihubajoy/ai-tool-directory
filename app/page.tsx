import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; 
import ClientHome from "./ClientHome"; 

export const dynamic = 'force-dynamic';

// Schema definition (যদি আলাদা ফাইলে না থাকে)
const ToolSchema = new mongoose.Schema({
  name: String,
  category: String,
  desc: String,
  link: String,
  icon: String,
}, { strict: false });

// 'tools' হচ্ছে আপনার MongoDB কালেকশনের নাম। এটি নিশ্চিত করুন।
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema, "tools");

export default async function Home() {
  let tools = [];
  
  try {
    await dbConnect(); 
    // lean() ব্যবহার করলে পারফরম্যান্স ভালো হয়
    const data = await Tool.find({}).lean();
    
    // ডাটাকে সিরিয়ালাইজ করা (Client Component-এ পাঠানোর জন্য)
    tools = data.map((item: any) => ({
      _id: item._id.toString(), // অবজেক্ট আইডি-কে স্ট্রিং করা হয়েছে
      name: item.name || "Untitled",
      category: item.category || "General",
      desc: item.desc || "No description", 
      link: item.link || "#",
      icon: item.icon || "🤖" 
    }));

  } catch (error) {
    console.error("Database connection error:", error);
  }

  return (
    <main>
      <ClientHome initialTools={tools} />
    </main>
  );
}