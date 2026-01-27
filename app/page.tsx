import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; 
import ClientHome from "./ClientHome"; 

export const dynamic = 'force-dynamic';

// ১. MongoDB Schema definition
const ToolSchema = new mongoose.Schema({}, { strict: false });
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function Home() {
  let tools = [];
  
  try {
    await dbConnect(); //
    
    // ২. ডাটাবেস থেকে ডাটা আনা
    const data = await Tool.find({}).lean();
    
    // ৩. অত্যন্ত গুরুত্বপূর্ণ: ডাটাকে সিরিয়ালাইজ করা
    // MongoDB-র ObjectId এবং অন্যান্য জটিল ডাটাকে স্ট্রিং-এ রূপান্তর করে
    const plainData = JSON.parse(JSON.stringify(data));
    
    // ৪. আপনার ডাটাবেস ফিল্ডের সাথে ClientHome-এর মিল করা
    tools = plainData.map((item: any) => ({
      _id: item._id,
      name: item.name || "Untitled",
      category: item.category || "General",
      desc: item.desc || "No description", // 'desc' ব্যবহার করা হয়েছে ClientHome-এ
      link: item.link || "#",             // 'link' ব্যবহার করা হয়েছে ClientHome-এ
      icon: item.icon || "🤖"             // 'icon' ব্যবহার করা হয়েছে ClientHome-এ
    }));

  } catch (error) {
    console.error("Database connection error:", error);
  }

  return (
    <main>
      {/* ৫. প্রসেস করা ডাটা ক্লায়েন্টে পাঠানো */}
      <ClientHome initialTools={tools} />
    </main>
  );
}