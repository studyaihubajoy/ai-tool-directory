import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; 
import ClientHome from "./ClientHome"; 

// ডাটা যেন প্রতিবার ফ্রেশ আসে তার জন্য
export const dynamic = 'force-dynamic';

// আপনার ডাটাবেসের ফিল্ড অনুযায়ী Schema আপডেট করা হয়েছে
const ToolSchema = new mongoose.Schema({
  name: String,
  category: String,
  desc: String, // আপনার ডাটাবেসে 'desc' আছে
  link: String,
  icon: String  // আপনার ডাটাবেসে 'icon' আছে
}, { strict: false });

const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function Home() {
  let tools = [];
  
  try {
    await dbConnect();
    
    // ডাটাবেস থেকে ডাটা আনা
    const data = await Tool.find({}).lean();
    
    // ডাটাবেসের 'desc' এবং 'icon' কে কোডের 'description' এবং 'image' এ রূপান্তর
    tools = data.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
      description: item.desc || "", // 'desc' থেকে 'description' তৈরি
      image: item.icon || ""        // 'icon' থেকে 'image' তৈরি
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