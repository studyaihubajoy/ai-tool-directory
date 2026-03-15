import { MetadataRoute } from 'next';
import { aiToolsList } from './toolsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ai.shopgb.online';

  // টুলগুলোর জন্য ক্লিন ইউআরএল (যদি আপনার রাউটিং সাপোর্ট করে)
  const toolEntries = aiToolsList.map((tool) => ({
    // পরামর্শ: কুয়েরি প্যারামিটার (?) এর বদলে স্লাশ (/) ব্যবহার করা ভালো
    url: `${baseUrl}/tool/${tool.name.toLowerCase().replace(/ /g, '-')}`, 
    lastModified: new Date('2026-02-28'), // ফিক্সড ডেট বা টুলের আপডেটেড ডেট দিন
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categories = [...new Set(aiToolsList.map(t => t.category.toLowerCase()))];
  const categoryEntries = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date('2026-02-28'),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...toolEntries,
    ...categoryEntries,
  ];
}