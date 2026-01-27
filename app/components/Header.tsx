import React from 'react';

export default function Header() {
  return (
    <header style={{ 
      backgroundColor: '#0f172a', 
      padding: '15px 20px', 
      borderBottom: '1px solid #334155',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '1.8rem' }}>🤖</span>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.3rem', fontWeight: 'bold' }}>Study AI Hub</h1>
      </div>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', gap: '20px', margin: 0 }}>
          <li><a href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: '500' }}>Home</a></li>
          <li><a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Submit Tool</a></li>
        </ul>
      </nav>
    </header>
  );
}