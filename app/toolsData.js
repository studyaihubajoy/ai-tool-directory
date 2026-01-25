// app/toolsData.js
export const aiToolsList = [
  // --- CHATBOTS & WRITING ---
  { name: "ChatGPT", category: "Writing", desc: "Best for writing, ideas, and general help.", link: "https://chat.openai.com", icon: "🤖" },
  { name: "Claude AI", category: "Writing", desc: "Advanced AI for long text and coding.", link: "https://claude.ai", icon: "🧠" },
  { name: "Google Gemini", category: "Chatbot", desc: "Google's smart multimodal AI assistant.", link: "https://gemini.google.com", icon: "💎" },
  { name: "Perplexity", category: "Search", desc: "Real-time AI search with sources.", link: "https://perplexity.ai", icon: "🔍" },
  { name: "Microsoft Copilot", category: "Chatbot", desc: "AI assistant inside Windows & Office", link: "https://copilot.microsoft.com", icon: "🌊" },
  { name: "Jasper", category: "Writing", desc: "Professional AI for marketing copy.", link: "https://jasper.ai", icon: "✍️" },
  { name: "Quillbot", category: "Writing", desc: "Best for paraphrasing and grammar.", link: "https://quillbot.com", icon: "✒️" },
  { name: "Grammarly", category: "Writing", desc: "Fix spelling and writing style.", link: "https://grammarly.com", icon: "📝" },
  { name: "Writesonic", category: "Writing", desc: "Generate SEO blogs and articles.", link: "https://writesonic.com", icon: "🚀" },
  { name: "Copy.ai", category: "Writing", desc: "Automate sales and marketing copy.", link: "https://copy.ai", icon: "📝" },
  { name: "Rytr", category: "Writing", desc: "Best free AI writing tool", link: "https://rytr.me", icon: "🖍️" },

  // --- IMAGE & DESIGN ---
  { name: "Midjourney", category: "Image", desc: "High-end professional AI art generator.", link: "https://midjourney.com", icon: "🎨" },
  { name: "DALL-E 3", category: "Image", desc: "High quality image from text by OpenAI.", link: "https://openai.com/dall-e-3", icon: "🖼️" },
  { name: "Leonardo AI", category: "Image", desc: "Create stunning visuals with ease.", link: "https://leonardo.ai", icon: "🖌️" },
  { name: "Stable Diffusion", category: "Image", desc: "Open-source image generation model.", link: "https://stability.ai", icon: "🌈" },
  { name: "Canva Magic", category: "Design", desc: "Design anything with AI tools.", link: "https://canva.com", icon: "🎨" },
  { name: "Adobe Firefly", category: "Image", desc: "Generative AI for creative apps.", link: "https://adobe.com/firefly", icon: "✨" },
  { name: "Lexica", category: "Image", desc: "Search and generate AI art", link: "https://lexica.art", icon: "📷" },
  { name: "Playground AI", category: "Image", desc: "Easy to use online image generator", link: "https://playground.com", icon: "🎠" },
  { name: "Remove.bg", category: "Tools", desc: "Remove image backgrounds instantly.", link: "https://remove.bg", icon: "🖼️" },
  { name: "Looka", category: "Design", desc: "Generate professional brand logos.", link: "https://looka.com", icon: "👜" },
  { name: "Figma AI", category: "Design", desc: "UI design with AI", link: "https://figma.com", icon: "✒️" },

  // --- VIDEO & AUDIO ---
  { name: "Sora", category: "Video", desc: "Realistic 60s text-to-video AI.", link: "https://openai.com/sora", icon: "🎥" },
  { name: "Runway Gen-3", category: "Video", desc: "Advanced AI tools for movie creators.", link: "https://runwayml.com", icon: "🎬" },
  { name: "HeyGen", category: "Video", desc: "AI avatars for speaking videos.", link: "https://heygen.com", icon: "👤" },
  { name: "ElevenLabs", category: "Voice", desc: "Top tier AI voice and speech cloning.", link: "https://elevenlabs.io", icon: "🎙️" },
  { name: "Suno AI", category: "Music", desc: "Generate high-quality songs & music.", link: "https://suno.com", icon: "🎵" },
  { name: "Udio", category: "Music", desc: "High fidelity AI music generation", link: "https://udio.com", icon: "🎼" },
  { name: "Pika Labs", category: "Video", desc: "Animate images and text to video.", link: "https://pika.art", icon: "👾" },
  { name: "InVideo AI", category: "Video", desc: "Create videos for social media fast.", link: "https://invideo.io", icon: "📽️" },
  { name: "Murf AI", category: "Voice", desc: "Studio-quality AI voiceovers.", link: "https://murf.ai", icon: "🎤" },
  { name: "Speechify", category: "Voice", desc: "Turn any text into audio", link: "https://speechify.com", icon: "📚" },
  { name: "Synthesia", category: "Video", desc: "Corporate AI videos", link: "https://synthesia.io", icon: "🏢" },

  // --- CODING & TECH ---
  { name: "GitHub Copilot", category: "Coding", desc: "The world's most used AI for coding.", link: "https://github.com/features/copilot", icon: "💻" },
  { name: "Cursor AI", category: "Coding", desc: "The AI-powered code editor for devs.", link: "https://cursor.com", icon: "⚙️" },
  { name: "Blackbox AI", category: "Coding", desc: "Fast code search and autocomplete.", link: "https://blackbox.ai", icon: "🗄️" },
  { name: "Phind", category: "Coding", desc: "Specialized AI search for developers.", link: "https://phind.com", icon: "🔎" },
  { name: "Replit Agent", category: "Coding", desc: "Build apps just by talking to AI.", link: "https://replit.com", icon: "🏗️" },
  { name: "Tabnine", category: "Coding", desc: "AI code assistant", link: "https://tabnine.com", icon: "⌨️" },
  { name: "Codeium", category: "Coding", desc: "Free AI code autocomplete", link: "https://codeium.com", icon: "🔐" },

  // --- OTHERS & PRODUCTIVITY ---
  { name: "Notion AI", category: "Tools", desc: "AI built into your notes & workspace.", link: "https://notion.ai", icon: "📓" },
  { name: "Character.ai", category: "Chatbot", desc: "Talk to any character or celebrity.", link: "https://character.ai", icon: "🎭" },
  { name: "Otter.ai", category: "Tools", desc: "Transcribe meetings and interviews.", link: "https://otter.ai", icon: "👂" },
  { name: "Tome", category: "Design", desc: "Generate storytelling slides with AI.", link: "https://tome.app", icon: "📖" },
  { name: "WolframAlpha", category: "Tools", desc: "Expert knowledge for math & science.", link: "https://wolframalpha.com", icon: "🔢" },
  { name: "Krisp", category: "Tools", desc: "Remove noise from online calls.", link: "https://krisp.ai", icon: "🔇" },
  { name: "Gamma", category: "Design", desc: "Create presentations and slides fast.", link: "https://gamma.app", icon: "📊" },
  { name: "Wix ADI", category: "Tools", desc: "AI website builder", link: "https://wix.com", icon: "🌐" },
  { name: "Zapier Central", category: "Tools", desc: "Automate tasks with AI", link: "https://zapier.com", icon: "⚡" },
  { name: "Scribe", category: "Tools", desc: "Auto-generate step-by-step guides", link: "https://scribehow.com", icon: "📑" }
];