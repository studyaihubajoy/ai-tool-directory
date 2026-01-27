import React from 'react';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#0f172a', 
      color: '#94a3b8', 
      padding: '40px 20px', 
      marginTop: '50px',
      borderTop: '1px solid #334155',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{ color: 'white', marginBottom: '10px' }}>Study AI Hub</h3>
        <p style={{ fontSize: '0.9rem' }}>২০২৬ সালের সেরা এআই টুল ডিরেক্টরি। আপনার কাজকে সহজ করতে আমরা সেরা টুলগুলো বাছাই করি।</p>
        
        <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="#" style={{ color: '#38bdf8', textDecoration: 'none' }}>Twitter</a>
          <a href="#" style={{ color: '#38bdf8', textDecoration: 'none' }}>Facebook</a>
          <a href="mailto:contact@shopgb.online" style={{ color: '#38bdf8', textDecoration: 'none' }}>Email</a>
        </div>

        <hr style={{ borderColor: '#1e293b', margin: '20px 0' }} />
        <p style={{ fontSize: '0.8rem' }}>
          © 2026 Study AI Hub | Developed by Ajoy | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}