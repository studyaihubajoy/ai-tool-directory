import React from 'react';
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Link from 'next/link';

// ১. মেটাডেটা ফাংশন (এটি ব্রাউজার ট্যাব ঠিক করবে)
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return {
    title: `AI Tool Details - ${id}`, 
    description: "Learn more about this amazing AI tool on Study AI Hub."
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
    console.error("Error:", error);
  }

  if (!tool) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>
        <h1>Tool not found!</h1>
        <Link href="/">Back Home</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#1e293b', padding: '30px', borderRadius: '20px', border: '1px solid #334155', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', marginBottom: '20px', display: 'inline-block', fontWeight: '500' }}>
          ← Back to Directory
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '40px' }}>
          {/* ২. আইকন যদি ইমোজি না হয়ে ইমেজ হয় তবে <img> ব্যবহার করুন */}
          <div style={{ fontSize: '5rem', background: '#0f172a', padding: '20px', borderRadius: '15px' }}>
            {tool.icon || "🤖"}
          </div>
          <div>
            <h1 style={{ color: '#38bdf8', fontSize: '3rem', margin: '0 0 10px 0' }}>{tool.name}</h1>
            <span style={{ backgroundColor: '#0ea5e9', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', color: '#020617', fontWeight: 'bold', textTransform: 'uppercase' }}>
              {tool.category}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#94a3b8', fontSize: '1.4rem', borderBottom: '2px solid #334155', paddingBottom: '10px', marginBottom: '15px' }}>About this Tool</h2>
          <p style={{ lineHeight: '1.8', fontSize: '1.2rem', color: '#cbd5e1', whiteSpace: 'pre-wrap' }}>
            {tool.desc}
          </p>
        </div>

        <a 
          href={tool.link} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            backgroundColor: '#38bdf8', color: '#020617', 
            padding: '18px 40px', borderRadius: '12px', 
            textDecoration: 'none', fontWeight: '800', display: 'inline-block',
            fontSize: '1.1rem', transition: 'transform 0.2s'
          }}
        >
          Visit Official Website →
        </a>
      </div>
    </div>
  );
}