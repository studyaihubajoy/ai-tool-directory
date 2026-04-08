import { MetadataRoute } from 'next';
import { aiToolsList } from './toolsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai.shopgb.online';

  const toolEntries = aiToolsList.map((tool) => ({
    // ইনডেক্সিং স্ক্রিপ্টের সাথে মিল রেখে /details/slug ফরম্যাট
    url: `${baseUrl}/details/${tool.name.toLowerCase().replace(/ /g, '-')}`, 
    lastModified: new Date(), // প্রতিদিনের বর্তমান তারিখ আপডেট হবে
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...toolEntries,
  ];
}