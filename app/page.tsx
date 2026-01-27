import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; 
import ClientHome from "./ClientHome"; 

// ডাটা যেন প্রতিবার ফ্রেশ আসে এবং বিল্ড এরর না হয়
export const dynamic = 'force-dynamic';

// MongoDB Schema definition
const ToolSchema = new mongoose.Schema({}, { strict: false });
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function Home() {
  let tools = [];
  
  try {
    // ১. ডাটাবেস কানেক্ট করা
    await dbConnect();
    
    // ২. ডাটাবেস থেকে সব ডাটা আনা
    const data = await Tool.find({}).lean();
    
    // ৩. আপনার ডাটাবেসের 'desc' এবং 'icon' কে কোডের ফরম্যাটে রূপান্তর করা
    tools = data.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
      // যদি ডাটাবেসে 'description' না থাকে তবে 'desc' থেকে নিবে
      description: item.description || item.desc || "", 
      // যদি ডাটাবেসে 'image' না থাকে তবে 'icon' থেকে নিবে
      image: item.image || item.icon || "" 
    }));

  } catch (error) {
    console.error("Database connection error in page.tsx:", error);
  }

  return (
    <main>
      {/* ৪. রূপান্তরিত ডাটা ClientHome এ পাঠানো হচ্ছে */}
      <ClientHome initialTools={tools} />
    </main>
  );
}