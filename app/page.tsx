// page.tsx
export default async function Home() {
  let tools = [];
  
  try {
    await dbConnect();
    const data = await Tool.find({}).lean();
    
    // ১. ডেটাকে সিরিয়ালাইজ (Serialize) করুন যাতে Client Component বুঝতে পারে
    const serializedData = JSON.parse(JSON.stringify(data));
    
    // ২. এবার ম্যাপিং করুন
    tools = serializedData.map((item: any) => ({
      ...item,
      description: item.description || item.desc || "", 
      image: item.image || item.icon || "" 
    }));

  } catch (error) {
    console.error("Database connection error:", error);
  }

  return (
    <main>
      <ClientHome initialTools={tools} />
    </main>
  );
}