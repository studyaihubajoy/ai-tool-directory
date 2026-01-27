'use client';
import React, { useState, useMemo } from 'react';

export default function ClientHome({ initialTools = [] }: { initialTools: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ক্যাটাগরি লিস্ট তৈরি
  const categories = useMemo(() => {
    const cats = (initialTools || []).map((tool) => tool.category || 'General');
    return ['All', ...Array.from(new Set(cats))];
  }, [initialTools]);

  // ফিল্টারিং লজিক
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
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#38bdf8', fontSize: '2.5rem' }}>Study AI Hub</h1>
        <p style={{ color: '#94a3b8' }}>Discover {initialTools.length} AI Tools</p>
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ 
            padding: '12px 20px', 
            width: '100%', 
            maxWidth: '400px', 
            borderRadius: '25px', 
            marginTop: '20px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: 'white'
          }}
        />
      </header>

      {/* ক্যাটাগরি বাটন */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setSelectedCategory(cat)} 
            style={{ 
              padding: '8px 20px', 
              borderRadius: '20px', 
              cursor: 'pointer', 
              border: 'none',
              backgroundColor: selectedCategory === cat ? '#38bdf8' : '#1e293b', 
              color: selectedCategory === cat ? '#020617' : 'white',
              fontWeight: '600',
              transition: '0.3s'
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* টুলস গ্রিড */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', maxWidth: '1200px', margin: '0 auto' }}>
        {filteredTools.length > 0 ? (
          filteredTools.map((tool) => (
            <div key={tool._id} style={{ 
              backgroundColor: '#1e293b', 
              padding: '25px', 
              borderRadius: '20px', 
              border: '1px solid #334155',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{tool.icon}</div>
              <h3 style={{ color: '#38bdf8', margin: '0' }}>{tool.name}</h3>
              <span style={{ fontSize: '0.75rem', backgroundColor: '#0f172a', padding: '4px 10px', borderRadius: '10px', width: 'fit-content', color: '#38bdf8' }}>{tool.category}</span>
              <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.5', flexGrow: 1 }}>{tool.desc}</p>
              <a 
                href={tool.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  marginTop: '15px',
                  color: '#38bdf8', 
                  textDecoration: 'none', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                Visit Site ↗
              </a>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '50px' }}>
            <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>No tools found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}