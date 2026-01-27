'use client';
import React, { useState, useMemo } from 'react';

export default function ClientHome({ initialTools = [] }: { initialTools: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // নিরাপদ ক্যাটাগরি লিস্ট
  const categories = useMemo(() => {
    const cats = (initialTools || []).map((tool) => tool.category || 'Other');
    return ['All', ...Array.from(new Set(cats))];
  }, [initialTools]);

  // নিরাপদ ফিল্টারিং লজিক
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
        <h1 style={{ color: '#38bdf8' }}>Study AI Hub</h1>
        <p>Discover {initialTools.length}+ AI Tools</p>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '20px', marginTop: '20px' }}
        />
      </header>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelectedCategory(cat)} 
            style={{ padding: '5px 15px', borderRadius: '15px', cursor: 'pointer', backgroundColor: selectedCategory === cat ? '#38bdf8' : '#1e293b', color: 'white' }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {filteredTools.length > 0 ? (
          filteredTools.map((tool, index) => (
            <div key={index} style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '15px', border: '1px solid #334155' }}>
              <div style={{ fontSize: '2rem' }}>{tool.icon}</div>
              <h3 style={{ color: '#38bdf8' }}>{tool.name}</h3>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{tool.desc}</p>
              <a href={tool.link} target="_blank" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Visit Site →</a>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No tools found.</p>
        )}
      </div>
    </div>
  );
}