import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; 
import ClientHome from "./ClientHome"; 

export const dynamic = 'force-dynamic';

// MongoDB Schema definition
const ToolSchema = new mongoose.Schema({}, { strict: false });
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function Home() {
  let tools = [];
  
  try {
    await dbConnect();
    // ডাটাবেস থেকে ডাটা আনা
    const data = await Tool.find({}).lean();
    
    // ডাটা সিরিয়ালাইজেশন এবং সঠিক ফিল্ড ম্যাপিং
    tools = JSON.parse(JSON.stringify(data)).map((item: any) => ({
      ...item,
      // ClientHome.tsx অনুযায়ী ফিল্ড সেট করা হচ্ছে
      name: item.name || "Untitled",
      desc: item.desc || item.description || "No description available", 
      icon: item.icon || item.image || "🤖",
      link: item.link || item.url || "#",
      category: item.category || "General"
    }));

  } catch (error) {
    console.error("Database error:", error);
  }

  return (
    <main>
      <ClientHome initialTools={tools} />
    </main>
  );
}