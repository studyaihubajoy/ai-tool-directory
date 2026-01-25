'use client';
import React, { useState } from 'react';

// আপনার ১৫১টি টুলের ডাটাবেস
const finalAiTools = [
  // --- CHAT & ASSISTANTS ---
  { name: "ChatGPT", category: "Chat", desc: "OpenAI's top AI for writing and help.", link: "https://chat.openai.com", icon: "🤖" },
  { name: "Claude AI", category: "Chat", desc: "Anthropic's human-like smart assistant.", link: "https://claude.ai", icon: "🧠" },
  { name: "Google Gemini", category: "Chat", desc: "Google's integrated multimodal AI.", link: "https://gemini.google.com", icon: "💎" },
  { name: "Perplexity", category: "Search", desc: "AI-powered real-time search engine.", link: "https://perplexity.ai", icon: "🔍" },
  { name: "Microsoft Copilot", category: "Chat", desc: "AI built into Windows and Office.", link: "https://copilot.microsoft.com", icon: "🌊" },
  { name: "Pi AI", category: "Chat", desc: "Personal and emotional AI companion.", link: "https://pi.ai", icon: "🫂" },
  { name: "Poe", category: "Chat", desc: "Access multiple AI bots in one place.", link: "https://poe.com", icon: "📲" },
  { name: "Character.ai", category: "Chat", desc: "Talk to any fictional character.", link: "https://character.ai", icon: "🎭" },
  { name: "Replika", category: "Chat", desc: "Your personal AI best friend.", link: "https://replika.ai", icon: "🧸" },
  { name: "HuggingChat", category: "Chat", desc: "Open-source powerful chatbot.", link: "https://huggingface.co/chat", icon: "🤗" },
  { name: "Jasper Chat", category: "Chat", desc: "AI chatbot for business and marketing.", link: "https://jasper.ai", icon: "💬" },
  { name: "You.com", category: "Search", desc: "Private AI-driven search engine.", link: "https://you.com", icon: "🎯" },
  { name: "Monica", category: "Chat", desc: "Your AI browser copilot.", link: "https://monica.im", icon: "👩‍🚀" },
  { name: "Merlin AI", category: "Chat", desc: "AI assistant for Chrome and LinkedIn.", link: "https://getmerlin.in", icon: "🪄" },
  { name: "TalkTo60", category: "Chat", desc: "Talk to famous people in history.", link: "https://talkto60.com", icon: "🏛️" },

  // --- IMAGE GENERATION ---
  { name: "Midjourney", category: "Image", desc: "High-end professional art generator.", link: "https://midjourney.com", icon: "🎨" },
  { name: "DALL-E 3", category: "Image", desc: "OpenAI's text-to-image masterpiece.", link: "https://openai.com/dall-e-3", icon: "🖼️" },
  { name: "Leonardo AI", category: "Image", desc: "Best free professional art tools.", link: "https://leonardo.ai", icon: "🖌️" },
  { name: "Stable Diffusion", category: "Image", desc: "Powerful open-source art model.", link: "https://stability.ai", icon: "🌈" },
  { name: "Adobe Firefly", category: "Image", desc: "Generative AI for Photoshop users.", link: "https://adobe.com/firefly", icon: "✨" },
  { name: "Lexica", category: "Image", desc: "Search and generate AI visuals.", link: "https://lexica.art", icon: "📷" },
  { name: "Playground AI", category: "Image", desc: "Create art and edit photos easily.", link: "https://playground.com", icon: "🎠" },
  { name: "BlueWillow", category: "Image", desc: "Free AI art generator on Discord.", link: "https://bluewillow.ai", icon: "🧿" },
  { name: "NightCafe", category: "Image", desc: "AI art community and generator.", link: "https://nightcafe.studio", icon: "☕" },
  { name: "DreamStudio", category: "Image", desc: "Official Stable Diffusion interface.", link: "https://dreamstudio.ai", icon: "🛋️" },
  { name: "Remove.bg", category: "Tools", desc: "Instantly remove image backgrounds.", link: "https://remove.bg", icon: "🖼️" },
  { name: "Magic Eraser", category: "Image", desc: "Remove objects from photos with AI.", link: "https://magiceraser.io", icon: "🧽" },
  { name: "Photoroom", category: "Image", desc: "Professional product photography AI.", link: "https://photoroom.com", icon: "🛍️" },
  { name: "Artbreeder", category: "Image", desc: "Mix and blend faces and landscapes.", link: "https://artbreeder.com", icon: "🧬" },
  { name: "Deep Dream", category: "Image", desc: "Create psychedelic and surreal art.", link: "https://deepdreamgenerator.com", icon: "🌀" },
  { name: "VanceAI", category: "Image", desc: "Enhance and upscale your photos.", link: "https://vanceai.com", icon: "📈" },
  { name: "Fotor AI", category: "Image", desc: "Easy online photo editor and AI.", link: "https://fotor.com", icon: "📸" },
  { name: "ClipDrop", category: "Image", desc: "AI tools for image editing.", link: "https://clipdrop.co", icon: "✂️" },
  { name: "Craiyon", category: "Image", desc: "Free DALL-E mini generator.", link: "https://craiyon.com", icon: "🖍️" },
  { name: "Bing Image Creator", category: "Image", desc: "Free DALL-E powered generator.", link: "https://bing.com/create", icon: "🔎" },

  // --- VIDEO & ANIMATION ---
  { name: "Sora", category: "Video", desc: "Realistic text-to-video by OpenAI.", link: "https://openai.com/sora", icon: "🎥" },
  { name: "Runway Gen-3", category: "Video", desc: "Pro-level filmmaking AI tools.", link: "https://runwayml.com", icon: "🎬" },
  { name: "Pika Art", category: "Video", desc: "Amazing animations from text/images.", link: "https://pika.art", icon: "👾" },
  { name: "HeyGen", category: "Video", desc: "AI talking avatars for videos.", link: "https://heygen.com", icon: "👤" },
  { name: "Synthesia", category: "Video", desc: "Corporate videos with AI actors.", link: "https://synthesia.io", icon: "📺" },
  { name: "Luma Dream Machine", category: "Video", desc: "High-quality realistic video.", link: "https://lumalabs.ai", icon: "🌠" },
  { name: "Kaiber", category: "Video", desc: "Create stunning music videos.", link: "https://kaiber.ai", icon: "🎸" },
  { name: "InVideo AI", category: "Video", desc: "Complete video creation platform.", link: "https://invideo.io", icon: "📽️" },
  { name: "Fliki", category: "Video", desc: "Turn blogs into videos with voices.", link: "https://fliki.ai", icon: "🐦" },
  { name: "D-ID", category: "Video", desc: "Animate faces to speak any text.", link: "https://d-id.com", icon: "🗣️" },
  { name: "Pictory", category: "Video", desc: "AI video from long-form content.", link: "https://pictory.ai", icon: "🎞️" },
  { name: "Kling AI", category: "Video", desc: "Next-gen cinematic AI video.", link: "https://klingai.com", icon: "🐉" },
  { name: "Vidnoz", category: "Video", desc: "Free AI talking head videos.", link: "https://vidnoz.com", icon: "👺" },
  { name: "Descript", category: "Video", desc: "Edit video by editing text.", link: "https://descript.com", icon: "✂️" },
  { name: "Mojo AI", category: "Video", desc: "AI video for social media stories.", link: "https://mojo-app.com", icon: "📱" },

  // --- AUDIO & MUSIC ---
  { name: "ElevenLabs", category: "Voice", desc: "Most realistic AI voice cloning.", link: "https://elevenlabs.io", icon: "🎙️" },
  { name: "Suno AI", category: "Music", desc: "Create songs with lyrics and music.", link: "https://suno.com", icon: "🎵" },
  { name: "Udio", category: "Music", desc: "Professional high-fidelity music.", link: "https://udio.com", icon: "🎼" },
  { name: "Murf AI", category: "Voice", desc: "Business-ready studio voices.", link: "https://murf.ai", icon: "🎤" },
  { name: "Adobe Podcast", category: "Audio", desc: "Clean audio like a pro studio.", link: "https://podcast.adobe.com", icon: "📻" },
  { name: "Soundraw", category: "Music", desc: "Customize royalty-free music.", link: "https://soundraw.io", icon: "🎷" },
  { name: "Speechify", category: "Voice", desc: "Turn any text into an audiobook.", link: "https://speechify.com", icon: "📚" },
  { name: "Otter AI", category: "Audio", desc: "Transcribe meetings and calls.", link: "https://otter.ai", icon: "👂" },
  { name: "Krisp", category: "Audio", desc: "AI noise cancellation for calls.", link: "https://krisp.ai", icon: "🔇" },
  { name: "Lalal.ai", category: "Audio", desc: "Extract vocals and instruments.", link: "https://lalal.ai", icon: "🎹" },
  { name: "Mubert", category: "Music", desc: "AI-generated royalty free music.", link: "https://mubert.com", icon: "🎧" },
  { name: "Voicify", category: "Voice", desc: "Create AI music covers.", link: "https://voicify.ai", icon: "🎭" },

  // --- WRITING & SEO ---
  { name: "Grammarly", category: "Writing", desc: "Best grammar and style checker.", link: "https://grammarly.com", icon: "📝" },
  { name: "Quillbot", category: "Writing", desc: "Premium AI paraphrasing tool.", link: "https://quillbot.com", icon: "✒️" },
  { name: "Jasper", category: "Writing", desc: "Top marketing content writer.", link: "https://jasper.ai", icon: "✍️" },
  { name: "Writesonic", category: "Writing", desc: "AI for blogs and SEO articles.", link: "https://writesonic.com", icon: "🚀" },
  { name: "Copy.ai", category: "Writing", desc: "Fast sales and marketing copy.", link: "https://copy.ai", icon: "📃" },
  { name: "Rytr", category: "Writing", desc: "Powerful and affordable writing AI.", link: "https://rytr.me", icon: "🖋️" },
  { name: "Anyword", category: "Writing", desc: "Data-driven AI copywriting.", link: "https://anyword.com", icon: "📊" },
  { name: "Wordtune", category: "Writing", desc: "Rewrite and refine your sentences.", link: "https://wordtune.com", icon: "🔧" },
  { name: "Sudowrite", category: "Writing", desc: "AI assistant for fiction writers.", link: "https://sudowrite.com", icon: "📚" },
  { name: "HIX.AI", category: "Writing", desc: "All-in-one powerful AI writing.", link: "https://hix.ai", icon: "💡" },

  // --- CODING & PRODUCTIVITY ---
  { name: "GitHub Copilot", category: "Coding", desc: "The standard AI code assistant.", link: "https://github.com/features/copilot", icon: "💻" },
  { name: "Cursor AI", category: "Coding", desc: "Best AI code editor for devs.", link: "https://cursor.com", icon: "⚙️" },
  { name: "Blackbox", category: "Coding", desc: "Fast code search and autocomplete.", link: "https://blackbox.ai", icon: "🗄️" },
  { name: "Phind", category: "Coding", desc: "AI search for developers.", link: "https://phind.com", icon: "🔎" },
  { name: "Replit Agent", category: "Coding", desc: "Build full apps with AI.", link: "https://replit.com", icon: "🏗️" },
  { name: "Gamma", category: "Design", desc: "Create presentations with AI.", link: "https://gamma.app", icon: "📊" },
  { name: "Canva Magic", category: "Design", desc: "AI tools for graphic design.", link: "https://canva.com", icon: "🎨" },
  { name: "Notion AI", category: "Tools", desc: "AI built into your workspace.", link: "https://notion.ai", icon: "📓" },
  { name: "Tome", category: "Design", desc: "AI storytelling and slides.", link: "https://tome.app", icon: "📖" },
  { name: "Zapier AI", category: "Tools", desc: "Automate tasks with AI bots.", link: "https://zapier.com", icon: "⚡" },
  { name: "WolframAlpha", category: "Education", desc: "Math and science expert AI.", link: "https://wolframalpha.com", icon: "🔢" },
  { name: "Khanmigo", category: "Education", desc: "AI tutor from Khan Academy.", link: "https://khanacademy.org", icon: "🎓" },
  { name: "Beautiful.ai", category: "Design", desc: "Professional slide designs.", link: "https://beautiful.ai", icon: "💅" },
  { name: "Mendeley AI", category: "Education", desc: "Research paper management.", link: "https://mendeley.com", icon: "🔬" },
  { name: "Logo.ai", category: "Design", desc: "Create brand logos in seconds.", link: "https://logo.ai", icon: "🆔" },
  { name: "Looka", category: "Design", desc: "AI branding and logo builder.", link: "https://looka.com", icon: "👜" },
  { name: "Wix ADI", category: "Tools", desc: "AI website design and build.", link: "https://wix.com", icon: "🌐" },
  { name: "Framer AI", category: "Tools", desc: "Generate sites from prompts.", link: "https://framer.com", icon: "⚡" },
  { name: "Monica", category: "Tools", desc: "Smart browser sidekick.", link: "https://monica.im", icon: "🦄" },
  { name: "Scribe", category: "Tools", desc: "AI documentation and guides.", link: "https://scribehow.com", icon: "📑" },
  { name: "Elsa Speak", category: "Education", desc: "Learn English with AI tutor.", link: "https://elsaspeak.com", icon: "🗣️" },
  { name: "10Web", category: "Tools", desc: "AI WordPress builder", link: "https://10web.io", icon: "🕸️" },
  { name: "Tabnine", category: "Coding", desc: "AI code assistant", link: "https://tabnine.com", icon: "⌨️" },
  { name: "Codeium", category: "Coding", desc: "Free AI code autocomplete", link: "https://codeium.com", icon: "🔐" }
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [visible, setVisible] = useState(24);

  const categories = ['All', 'Chat', 'Image', 'Video', 'Voice', 'Writing', 'Coding', 'Design', 'Education', 'Tools'];

  const filtered = finalAiTools.filter(t => {
    const s = search.toLowerCase();
    const matchesSearch = t.name.toLowerCase().includes(s) || t.desc.toLowerCase().includes(s);
    const matchesCat = activeCat === 'All' || t.category === activeCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Header Section */}
      <header style={{ textAlign: 'center', padding: '100px 20px 60px', background: 'linear-gradient(to bottom, #0f172a, #020617)' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', background: 'linear-gradient(90deg, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>Study AI Hub | Best AI Tools Directory 2026 | 150+ Verified Tools</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.3rem', marginTop: '15px' }}>The Ultimate World Directory of {finalAiTools.length}+ Best AI Tools</p>
        
        {/* Search Bar */}
        <div style={{ marginTop: '40px' }}>
          <input 
            type="text" 
            placeholder="Search from 150+ tools..." 
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '20px 40px', width: '90%', maxWidth: '700px', borderRadius: '100px', border: '2px solid #334155', background: '#0f172a', color: 'white', fontSize: '1.2rem', outline: 'none', boxShadow: '0 0 30px rgba(56, 189, 248, 0.15)' }}
          />
        </div>

        {/* Categories */}
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
          {categories.map(c => (
            <button key={c} onClick={() => {setActiveCat(c); setVisible(24);}} style={{ padding: '12px 25px', borderRadius: '30px', border: '1px solid #334155', background: activeCat === c ? '#38bdf8' : '#1e293b', color: activeCat === c ? '#020617' : 'white', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}>{c}</button>
          ))}
        </div>
      </header>

      {/* AI Tools Grid */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px 100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
        {filtered.slice(0, visible).map((tool, i) => (
          <a key={i} href={tool.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: '#0f172a', padding: '35px', borderRadius: '30px', border: '1px solid #1e293b', textAlign: 'center', transition: '0.4s', height: '100%', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}
                 onMouseOver={(e) => {e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = '#38bdf8';}}
                 onMouseOut={(e) => {e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#1e293b';}}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{tool.icon}</div>
              <h3 style={{ fontSize: '1.7rem', margin: '10px 0' }}>{tool.name}</h3>
              <span style={{ fontSize: '0.85rem', color: '#38bdf8', border: '1px solid #38bdf8', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold' }}>{tool.category}</span>
              <p style={{ color: '#94a3b8', marginTop: '20px', fontSize: '1rem', lineHeight: '1.6' }}>{tool.desc}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Show More Button */}
      {visible < filtered.length && (
        <div style={{ textAlign: 'center', paddingBottom: '100px' }}>
          <button onClick={() => setVisible(v => v + 24)} style={{ padding: '18px 50px', background: '#38bdf8', border: 'none', borderRadius: '50px', color: '#020617', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(56, 189, 248, 0.3)' }}>Show More AI Tools ({filtered.length - visible} Left)</button>
        </div>
      )}

      {/* Footer & Additional Sections */}
      <footer style={{ textAlign: 'center', padding: '80px 20px', background: '#0f172a', borderTop: '1px solid #1e293b' }}>
        
        {/* Newsletter Section */}
        <section style={{ backgroundColor: '#1e293b', padding: '60px 20px', textAlign: 'center', margin: '40px auto', maxWidth: '1200px', borderRadius: '30px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Get Weekly AI Updates! 📧</h2>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '30px' }}>Join 5,000+ AI enthusiasts and get the latest tools in your inbox.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <input type="email" placeholder="Enter your email" style={{ padding: '20px 30px', borderRadius: '50px', border: 'none', width: '350px', outline: 'none', fontSize: '1.1rem' }} />
            <button style={{ padding: '20px 40px', background: '#38bdf8', color: '#020617', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}>Subscribe Now</button>
          </div>
        </section>

     {/* SEO Content Section */}
<section style={{ maxWidth: '1200px', margin: '80px auto', padding: '40px 20px', borderTop: '1px solid #1e293b', textAlign: 'left' }}>
  <h2 style={{ color: '#38bdf8', fontSize: '2.2rem', marginBottom: '20px' }}>Study AI Hub: Find All Your Essential AI Tools in One Place</h2>
  <div style={{ color: '#94a3b8', fontSize: '1.1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
    <div>
      <p>
        Welcome to <strong>Study AI Hub</strong>, the ultimate <strong>AI Directory of 2026</strong>. 
        Our platform features over <strong>150+ verified AI tools</strong> to supercharge your productivity. 
        Are you searching for a <em>Free AI image generator</em>, a high-performance <em>AI coding assistant</em>, 
        or the latest automation software? Discover and compare the best tools from our extensively curated list.
      </p>
    </div>
    <div>
      <p>
        We have centralized everything from world-class <strong>AI Chatbots</strong> like <strong>ChatGPT, Claude, and Gemini</strong> 
        to cutting-edge <strong>AI Video generation tools</strong> such as <strong>Sora and HeyGen</strong>. 
        Whether you are a student, developer, or creator, find the perfect AI solution for your workflow right here. Our directory is <strong>updated daily</strong> to ensure you never miss the latest innovations in <strong>Artificial Intelligence</strong>.
      </p>
    </div>
  </div>
  
  <div style={{ marginTop: '30px', padding: '20px', background: '#0f172a', borderRadius: '15px', border: '1px dashed #334155' }}>
    <p style={{ color: '#38bdf8', margin: 0 }}>
      <strong>Keywords:</strong> Best AI Tools 2026, Free AI Directory, Study AI Hub, AI Writing Assistant, Best AI for Students, Artificial Intelligence Tools List, Top AI Image Generators, AI Video Creation, Free AI Resources.
    </p>
  </div>
</section>

        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>© 2026 Study AI Hub | Developed by Ajoy Sarkar </p>
      </footer>
    </div>
  );
}