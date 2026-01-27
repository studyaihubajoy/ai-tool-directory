import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; // নিশ্চিত করুন path ঠিক আছে
import ClientHome from "./ClientHome"; 

// ১. MongoDB Schema definition (যদি আলাদা ফাইলে না থাকে)
const ToolSchema = new mongoose.Schema({}, { strict: false });
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

// বিল্ড এরর এড়াতে dynamic রেন্ডারিং ফোর্স করা
export const dynamic = 'force-dynamic';

export default async function Home() {
  let tools = [];
  
  try {
    // ২. ডাটাবেস কানেক্ট করা
    await dbConnect();
    
    // ৩. ডাটাবেস থেকে ডাটা আনা
    const data = await Tool.find({}).lean();
    
    // ৪. ডাটাকে সিরিয়ালাইজ করা (Client Component এ পাঠানোর জন্য জরুরি)
    const serializedData = JSON.parse(JSON.stringify(data));
    
    // ৫. ম্যাপিং (আপনার ClientHome এ 'desc' এবং 'icon' ব্যবহার করা হয়েছে)
    tools = serializedData.map((item: any) => ({
      ...item,
      desc: item.desc || item.description || "", 
      icon: item.icon || item.image || "" 
    }));

  } catch (error) {
    console.error("Database connection error in page.tsx:", error);
  }

  return (
    <main>
      <ClientHome initialTools={tools} />
    </main>
  );
}