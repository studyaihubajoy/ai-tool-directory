import ClientHome from "./ClientHome";
// আগের লাইন: import dbConnect from "@/lib/mongodb";
import dbConnect from "../lib/mongodb"; // রিলেটিভ পাথ ব্যবহার করুন
import mongoose from "mongoose";

// MongoDB Schema তৈরি (যদি আপনার আলাদা মডেল ফাইল না থাকে)
const ToolSchema = new mongoose.Schema({}, { strict: false });
const Tool = mongoose.models.Tool || mongoose.model("Tool", ToolSchema);

export default async function Home() {
  let tools = [];
  
  try {
    // ডাটাবেস কানেক্ট করা
    await dbConnect();
    
    // ডাটাবেস থেকে সব ডাটা আনা (plain object এ কনভার্ট করা হয়েছে)
    const data = await Tool.find({}).lean();
    
    // মঙ্গোডিবি আইডেন্টিফায়ার গুলোকে স্ট্রিং এ কনভার্ট করা (Next.js এর জন্য প্রয়োজন)
    tools = JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.error("Database connection error:", error);
  }

  return (
    <main>
      {/* ClientHome এ ডাটাবেস থেকে পাওয়া ডাটা পাঠিয়ে দেওয়া হচ্ছে */}
      <ClientHome initialTools={tools} />
    </main>
  );
}