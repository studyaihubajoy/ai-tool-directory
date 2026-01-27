import React from 'react';
import dbConnect from "../lib/mongodb"; 
import mongoose from "mongoose";
import ClientHome from "./ClientHome"; 

export const dynamic = 'force-dynamic';

export default async function Home() {
  let tools = [];
  
  try {
    await dbConnect(); 
    
    // ১. আপনার ডাটাবেসের নাম এখানে নিশ্চিত করুন
    const db = mongoose.connection.useDb("study_ai_hub"); 
    
    // ২. আপনার কালেকশনের নাম এখানে দিন (যেমন: 'tools')
    const collection = db.collection("tools");
    
    // ৩. ডাটা ফেচ করা
    const data = await collection.find({}).toArray();
    
    // ৪. ডাটা ফরম্যাট করা
    tools = data.map((item: any) => ({
      _id: item._id.toString(),
      name: item.name || "Untitled",
      category: item.category || "General",
      desc: item.desc || "No description", 
      link: item.link || "#",
      icon: item.icon || "🤖" 
    }));

    console.log("Total Tools Found:", tools.length);

  } catch (error) {
    console.error("Database error:", error);
  }

  return (
    <main>
      <ClientHome initialTools={tools} />
    </main>
  );
}