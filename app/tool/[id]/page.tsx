import React from 'react';
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb"; // পাথটি ঠিক আছে কি না নিশ্চিত করুন
import Link from 'next/link';

// কালেকশন নেম 'tools' ব্যবহার করা হয়েছে
const ToolSchema = new mongoose.Schema({}, { strict: false, collection: 'tools' });
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function ToolDetails({ params }: { params: Promise<{ id: string }> }) {
  // ১. params-কে await করতে হবে (Next.js 15+ এর নিয়ম)
  const { id } = await params;
  let tool: any = null;

  try {
    await dbConnect();
    // ২. আইডিটি সঠিক MongoDB ObjectId কি না চেক করে ডাটা ফেচ করা
    if (mongoose.Types.ObjectId.isValid(id)) {
      tool = await Tool.findById(id).lean();
    }
  } catch (error) {
    console.error("Error fetching tool details:", error);
  }

  // যদি ডাটা না পাওয়া যায়
  if (!tool) {
    return (
      <div style={{ color: 'white', textAlign: 'center', marginTop: '100px', backgroundColor: '#020617', minHeight: '100vh' }}>
        <h1>Tool not found!</h1>
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none' }}>Go Back Home</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#1e293b', padding: '30px', borderRadius: '20px', border: '1px solid #334155' }}>
        
        <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
          ← Back to Directory
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
          <div style={{ fontSize: '4rem' }}>{tool.icon || "🤖"}</div>
          <div>
            <h1 style={{ color: '#38bdf8', fontSize: '2.5rem', margin: 0 }}>{tool.name}</h1>
            <span style={{ backgroundColor: '#0ea5e9', padding: '4px 12px', borderRadius: '15px', fontSize: '0.8rem', color: '#020617', fontWeight: 'bold' }}>
              {tool.category}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#94a3b8', fontSize: '1.2rem', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>About this Tool</h2>
          <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#cbd5e1' }}>
            {tool.desc}
          </p>
        </div>

        <a 
          href={tool.link} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            backgroundColor: '#38bdf8', color: '#020617', 
            padding: '15px 30px', borderRadius: '10px', 
            textDecoration: 'none', fontWeight: 'bold', display: 'inline-block'
          }}
        >
          Visit Official Website →
        </a>
      </div>
    </div>
  );
}