import React from 'react';
import dbConnect from "../lib/mongodb"; 
import mongoose from "mongoose";
import ClientHome from "./ClientHome"; 

export const dynamic = 'force-dynamic';

// ১. মডেলটি একবারই ডিফাইন করা নিশ্চিত করুন
const ToolSchema = new mongoose.Schema({
  name: String,
  category: String,
  desc: String,
  link: String,
  icon: String,
}, { strict: false });

// 'tools' কালেকশনের নাম এখানে সরাসরি দিয়ে দিন
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema, "tools");

export default async function Home() {
  let tools = [];
  
  try {
    // ২. কানেকশন চেক
    await dbConnect(); 
    
    // ৩. ডাটা ফেচ করা এবং Plain Object-এ রূপান্তর করা
    const data = await Tool.find({}).lean();
    
    // ৪. সিরিয়ালাইজেশন (Next.js এর জন্য প্রয়োজনীয়)
    tools = JSON.parse(JSON.stringify(data)).map((item: any) => ({
      _id: item._id?.toString() || Math.random().toString(),
      name: item.name || "Untitled",
      category: item.category || "General",
      desc: item.desc || "No description", 
      link: item.link || "#",
      icon: item.icon || "🤖" 
    }));

  } catch (error: any) {
    console.error("Error details:", error.message);
  }

  return (
    <main>
      <ClientHome initialTools={tools} />
    </main>
  );
}