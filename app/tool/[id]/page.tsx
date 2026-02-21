import React from 'react';
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Link from 'next/link';

// ১. ডাইনামিক মেটাডেটা ফাংশন (এটি ব্রাউজার ট্যাবে টুলের নাম দেখাবে)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let toolName = "Tool Details";
  
  try {
    await dbConnect();
    const Tool = mongoose.models.Tool || mongoose.model("Tool", new mongoose.Schema({}, { strict: false, collection: 'tools' }));
    if (mongoose.Types.ObjectId.isValid(id)) {
      const tool: any = await Tool.findById(id).select('name').lean();
      if (tool) toolName = tool.name;
    }
  } catch (e) {
    console.error("Metadata error:", e);
  }

  return {
    title: `${toolName} - Study AI Hub`,
    description: `Learn more about ${toolName} on Study AI Hub.`,
  };
}

const ToolSchema = new mongoose.Schema({}, { strict: false, collection: 'tools' });
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function ToolDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let tool: any = null;

  try {
    await dbConnect();
    if (mongoose.Types.ObjectId.isValid(id)) {
      tool = await Tool.findById(id).lean();
    }
  } catch (error) {
    console.error("Error fetching tool:", error);
  }

  if (!tool) {
    return (
      <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Tool not found!</h1>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'underline' }}>Back Home</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', backgroundColor: '#1e293b', padding: '40px', borderRadius: '24px', border: '1px solid #334155', boxShadow: '0 20px 50px rgba(0,0,0,0.6)' }}>
        
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', marginBottom: '30px', display: 'inline-flex', alignItems: 'center', fontWeight: '500', fontSize: '1.1rem' }}>
          <span style={{ marginRight: '8px' }}>←</span> Back to Directory
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '50px', flexWrap: 'wrap' }}>
          {/* আইকন সেকশন */}
          <div style={{ fontSize: '5rem', background: '#0f172a', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', border: '1px solid #334155' }}>
            {tool.icon || "🤖"}
          </div>
          
          <div>
            <h1 style={{ color: '#ffffff', fontSize: '3.5rem', margin: '0 0 10px 0', fontWeight: '800' }}>{tool.name}</h1>
            <span style={{ backgroundColor: '#0ea5e9', padding: '8px 20px', borderRadius: '30px', fontSize: '1rem', color: '#020617', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {tool.category}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '50px' }}>
          <h2 style={{ color: '#94a3b8', fontSize: '1.6rem', borderBottom: '2px solid #334155', paddingBottom: '12px', marginBottom: '20px', fontWeight: '600' }}>About this Tool</h2>
          <p style={{ lineHeight: '1.8', fontSize: '1.25rem', color: '#cbd5e1', whiteSpace: 'pre-wrap' }}>
            {tool.desc}
          </p>
        </div>

        <a 
          href={tool.link} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            backgroundColor: '#38bdf8', 
            color: '#020617', 
            padding: '20px 50px', 
            borderRadius: '15px', 
            textDecoration: 'none', 
            fontWeight: '800', 
            display: 'inline-block',
            fontSize: '1.2rem',
            boxShadow: '0 10px 20px rgba(56, 189, 248, 0.3)',
            transition: 'all 0.3s ease'
          }}
        >
          Visit Official Website →
        </a>
      </div>
    </div>
  );
}