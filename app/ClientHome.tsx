'use client';
import React, { useState, useMemo } from 'react';

export default function ClientHome({ initialTools }: { initialTools: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Database theke asa data theke category list toiri
  const categories = useMemo(() => {
    return ['All', ...new Set(initialTools.map((tool) => tool.category))];
  }, [initialTools]);

  // Search ebong category filtering logic
  const filteredTools = useMemo(() => {
    return initialTools.filter((tool) => {
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, initialTools]);

  return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Header Section */}
      <header style={{ textAlign: 'center', padding: '60px 20px', background: 'linear-gradient(to bottom, #1e293b, #020617)' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '10px', color: '#38bdf8' }}>Study AI Hub</h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>Discover {initialTools.length}+ Best AI Tools for Students, Creators & Developers</p>
        
        {/* Search Bar */}
        <div style={{ marginTop: '30px', maxWidth: '600px', margin: '30px auto 0' }}>
          <input
            type="text"
            placeholder="Search tools by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%', padding: '15px 25px', borderRadius: '30px', border: '2px solid #334155',
              backgroundColor: '#1e293b', color: 'white', fontSize: '1rem', outline: 'none'
            }}
          />
        </div>
      </header>

      {/* Category Filter */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', padding: '20px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '10px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer',
              backgroundColor: selectedCategory === cat ? '#38bdf8' : '#1e293b',
              color: selectedCategory === cat ? '#020617' : 'white', fontWeight: 'bold', transition: '0.3s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' }}>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <div key={index} style={{ 
                backgroundColor: '#1e293b', padding: '25px', borderRadius: '20px', 
                border: '1px solid #334155'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{tool.icon}</div>
                <h3 style={{ fontSize: '1.4rem', color: '#38bdf8', marginBottom: '10px' }}>{tool.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', height: '60px', overflow: 'hidden' }}>{tool.desc}</p>
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#7dd3fc', background: '#0c4a6e', padding: '4px 10px', borderRadius: '10px' }}>
                    {tool.category}
                  </span>
                  <a href={tool.link} target="_blank" rel="noopener noreferrer" style={{
                    color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold'
                  }}>Visit Site →</a>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#94a3b8' }}>No tools found.</p>
          )}
        </div>
      </main>

      {/* Footer Section (Apnar page.tsx er SEO part-tuku eikhane thakbe) */}
      <footer style={{ backgroundColor: '#0f172a', padding: '60px 20px', textAlign: 'center', marginTop: '50px', borderTop: '1px solid #334155' }}>
        <p style={{ color: '#64748b' }}>© 2026 Study AI Hub | Developed by Ajoy Sarkar</p>
      </footer>
    </div>
  );
}