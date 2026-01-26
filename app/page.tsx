import React from 'react';
import clientPromise from '@/lib/mongodb';
import ClientHome from './ClientHome';

async function getTools() {
  try {
    const client = await clientPromise;
    const db = client.db("study_ai_hub");
    // Database theke sob tools niye asa
    const tools = await db.collection("tools").find({}).toArray();
    
    // MongoDB _id ke string-e convert kora (Next.js er proyojone)
    return tools.map(tool => ({
      ...tool,
      _id: tool._id.toString(),
    }));
  } catch (e) {
    console.error("Database Error:", e);
    return [];
  }
}

export default async function Home() {
  const aiToolsList = await getTools();

  // Ekhon data database theke ClientHome component-e jabe
  return <ClientHome initialTools={aiToolsList} />;
}