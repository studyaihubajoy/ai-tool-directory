import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb"; 
import ClientHome from "./ClientHome"; 

export const dynamic = 'force-dynamic';

// 1. Data structure define kora
interface ToolType {
  _id: string;
  name: string;
  category: string;
  desc: string;
  link: string;
  icon: string;
}

// 2. Schema define kora (strict: false dewa hoyeche jate flexible thake)
const ToolSchema = new mongoose.Schema({}, { strict: false, collection: 'tools' });

// Model check kora
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function Home() {
  let tools: ToolType[] = [];
  let errorMessage = "";
  
  try {
    const conn = await dbConnect(); 
    
    if (!conn) {
      errorMessage = "Database connect hote pareni. .env.local check korun.";
    } else {
      // 3. Data fetch kora
      const data = await Tool.find({}).lean();
      
      if (data && data.length > 0) {
        tools = (data as any[]).map((item) => ({
          _id: item._id ? item._id.toString() : Math.random().toString(), 
          name: item.name || "Untitled",
          category: item.category || "General",
          desc: item.desc || "No description", 
          link: item.link || "#",
          icon: item.icon || "🤖" 
        }));
      } else {
        errorMessage = "Database connect hoyeche kintu 'tools' collection-e kono data paoya jayni.";
      }
    }
  } catch (error: any) {
    console.error("Error:", error);
    errorMessage = "Error hoyeche: " + error.message;
  }

  return (
    <main>
      {/* Jodi kono error thake seta screen-e dekhabe blank na dekhiye */}
      {errorMessage && (
        <div style={{ color: 'red', textAlign: 'center', padding: '20px', border: '1px solid red', margin: '10px' }}>
          {errorMessage}
        </div>
      )}
      <ClientHome initialTools={tools} />
    </main>
  );
}