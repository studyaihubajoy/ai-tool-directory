import React from 'react';
import mongoose from "mongoose";
import dbConnect from "../lib/mongodb";
import ClientHome from "./ClientHome";

// এই লাইনটি ভেরসেলের "Failed to collect page data" এরর দূর করবে
export const dynamic = 'force-dynamic';

export default async function Home() {
  let tools = [];
  
  try {
    const conn = await dbConnect();
    
    if (conn) {
      // Schema definition
      const ToolSchema = new mongoose.Schema({}, { strict: false });
      const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);
      
      const data = await Tool.find({}).lean();
      tools = JSON.parse(JSON.stringify(data));
    }
  } catch (error) {
    console.error("Database error on home page:", error);
  }

  return (
    <main>
      <ClientHome initialTools={tools} />
    </main>
  );
}