import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; 
import ClientHome from "./ClientHome"; 

export const dynamic = 'force-dynamic';

// ১. টাইপ ডিফাইন করা
interface ToolType {
  _id: string;
  name: string;
  category: string;
  desc: string;
  link: string;
  icon: string;
}

// ২. মঙ্গুজ স্কিমা এবং মডেল (এখানে collection name টি নিশ্চিত করা হয়েছে)
const ToolSchema = new mongoose.Schema({
  name: String,
  category: String,
  desc: String,
  link: String,
  icon: String,
}, { 
  strict: false,
  collection: 'tools' // আপনার MongoDB কালেকশনের নাম 'tools' হতে হবে
});

// মডেলটি ক্যাশড আছে কি না চেক করা, না থাকলে নতুন তৈরি করা
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function Home() {
  let tools: ToolType[] = [];
  let connectionStatus = "Disconnected";
  
  try {
    const conn = await dbConnect(); 
    if (conn) {
      connectionStatus = "Connected";
      // ৩. ডাটাবেস থেকে ডাটা নিয়ে আসা
      const data = await Tool.find({}).lean();
      
      // ৪. ডাটা ফরম্যাট করা
      tools = (data as any[]).map((item) => ({
        _id: item._id ? item._id.toString() : Math.random().toString(), 
        name: item.name || "Untitled",
        category: item.category || "General",
        desc: item.desc || "No description", 
        link: item.link || "#",
        icon: item.icon || "🤖" 
      }));
      
      console.log(`Database Status: ${connectionStatus}, Tools Found: ${tools.length}`);
    }
  } catch (error) {
    console.error("Critical Database Error:", error);
  }

  return (
    <main>
      {/* যদি ডাটা না আসে তবে কনসোলে চেক করার জন্য মেসেজ */}
      {tools.length === 0 && (
        <div style={{ color: 'gray', textAlign: 'center', padding: '10px', fontSize: '12px' }}>
          Notice: No data found in 'tools' collection.
        </div>
      )}
      <ClientHome initialTools={tools} />
    </main>
  );
}