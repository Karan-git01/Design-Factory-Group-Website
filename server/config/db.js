import mongoose from "mongoose";

export async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.error("❌ MONGO_URI is missing from your .env file");
      process.exit(1);
    }

    mongoose.set("sanitizeFilter", true);  // NoSQL injection protection at the query layer

    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}