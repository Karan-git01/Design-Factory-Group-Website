import dotenv from "dotenv";
import readline from "readline";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function createAdmin() {
  await connectDB();

  const username = await ask("Choose an admin username: ");
  const password = await ask("Choose an admin password (min 8 characters): ");

  if (password.length < 8) {
    console.log("❌ Password must be at least 8 characters.");
    process.exit(1);
  }

  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log("❌ That username already exists.");
    process.exit(1);
  }

  const admin = await Admin.create({ username, password });
  console.log(`✅ Admin account created: ${admin.username}`);

  rl.close();
  mongoose.connection.close();
}

createAdmin();