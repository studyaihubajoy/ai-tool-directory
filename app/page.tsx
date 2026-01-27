import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; 
import ClientHome from "./ClientHome"; 

export const dynamic = 'force-dynamic';

// ১. ডেটার গঠন বা টাইপ ডিফাইন করা
interface ToolType {
  _id: string;
  name: string;
  category: string;
  desc: string;
  link: string;
  icon: string;
}

// ২. মঙ্গুজ স্কিমা এবং মডেল
const ToolSchema = new mongoose.Schema({
  name: String,
  category: String,
  desc: String,
  link: String,
  icon: String,
}, { strict: false });

// 'tools' আপনার MongoDB কালেকশনের নাম কি না তা নিশ্চিত করুন
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema, "tools");

export default async function Home() {
  // ৩. এখানে টাইপ বলে দিলে এরর আসবে না
  let tools: ToolType[] = [];
  
  try {
    await dbConnect(); 
    const data = await Tool.find({}).lean();
    
    // ৪. ডেটাকে স্ট্রিং-এ রূপান্তর করে টুলস অ্যারেতে রাখা
    tools = (data as any[]).map((item) => ({
      _id: item._id.toString(), 
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