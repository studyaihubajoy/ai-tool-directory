'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link'; // লিঙ্ক ইমপোর্ট করা হয়েছে

interface ToolType {
  _id: string;
  name: string;
  category: string;
  desc: string;
  link: string;
  icon: string;
}

export default function ClientHome({ initialTools = [] }: { initialTools: ToolType[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ক্যাটাগরি ফিল্টার লিস্ট
  const categories = useMemo(() => {
    const cats = (initialTools || []).map((tool) => tool.category || 'General');
    return ['All', ...Array.from(new Set(cats))];
  }, [initialTools]);

  // সার্চ এবং ক্যাটাগরি ফিল্টারিং
  const filteredTools = useMemo(() => {
    return (initialTools || []).filter((tool) => {
      const name = String(tool?.name || "").toLowerCase();
      const desc = String(tool?.desc || "").toLowerCase();
      const search = searchQuery.toLowerCase();

      const matchesSearch = name.includes(search) || desc.includes(search);
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, initialTools]);

  return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#38bdf8', fontSize: '2.5rem' }}>Study AI Hub</h1>
        <p style={{ color: '#94a3b8' }}>Discover {initialTools.length}+ AI Tools</p>
        <input
          type="text"
          placeholder="Search AI Tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            padding: '12px 25px', width: '100%', maxWidth: '400px', 
            borderRadius: '25px', marginTop: '20px', border: '1px solid #334155',
            backgroundColor: '#1e293b', color: 'white', outline: 'none'
          }}
        />
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setSelectedCategory(cat)} 
            style={{ 
              padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', border: 'none',
              backgroundColor: selectedCategory === cat ? '#38bdf8' : '#1e293b', 
              color: selectedCategory === cat ? '#020617' : 'white', fontWeight: 'bold'
            }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
        {filteredTools.map((tool) => (
          <div key={tool._id} style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '20px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{tool.icon}</div>
            <h3 style={{ color: '#38bdf8' }}>{tool.name}</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', minHeight: '50px' }}>{tool.desc}</p>
            
            <div style={{ marginTop: '15px' }}>
              <Link 
                href={`/tool/${tool._id}`} 
                style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: 'bold', marginRight: '15px', fontSize: '0.9rem' }}
              >
                View Details
              </Link>
              <a 
                href={tool.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' }}
              >
                Visit Site →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}