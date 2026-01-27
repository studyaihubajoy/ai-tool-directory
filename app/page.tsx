import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; 
import ClientHome from "./ClientHome"; 

export const dynamic = 'force-dynamic';

const ToolSchema = new mongoose.Schema({}, { strict: false });
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function Home() {
  let tools = [];
  
  try {
    await dbConnect(); //
    const data = await Tool.find({}).lean();
    
    // ডাটাকে সিরিয়ালাইজ করা এবং সঠিক ফিল্ডে ম্যাপ করা
    tools = JSON.parse(JSON.stringify(data)).map((item: any) => ({
      _id: item._id,
      name: item.name || "Untitled",
      category: item.category || "General",
      // আপনার ডাটাবেসে 'desc' আছে, তাই এখানে 'desc' ই রাখা হলো
      desc: item.desc || item.description || "No description", 
      link: item.link || item.url || "#",
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