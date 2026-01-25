import { MetadataRoute } from 'next';
import { aiToolsList } from './toolsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai.shopgb.online';

  // ১. প্রতিটি টুলের জন্য আলাদা সার্চ লিংক (SEO Friendly)
  const toolEntries = aiToolsList.map((tool) => ({
    url: `${baseUrl}/?tool=${encodeURIComponent(tool.name.toLowerCase().replace(/ /g, '-'))}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ২. ক্যাটাগরি পেজগুলোও ইনডেক্স করা (যেমন: /chatbot, /image)
  const categories = [...new Set(aiToolsList.map(t => t.category.toLowerCase()))];
  const categoryEntries = categories.map((cat) => ({
    url: `${baseUrl}/?category=${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1, // হোমপেজ সবসময় ১ নম্বর
    },
    ...toolEntries,
    ...categoryEntries,
  ];
}