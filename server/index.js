import "dotenv/config";  // <-- must be the first import, runs immediately

import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import { publicLimiter } from "./middleware/publicLimiter.js";

import projectRoutes from "./routes/projects.js";
import branchRoutes from "./routes/branches.js";
import careerRoutes from "./routes/careers.js";
import contactRoutes from "./routes/contact.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", publicLimiter);

app.get("/api/health", async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    await mongoose.connection.db.admin().ping();
    res.json({
      status: "ok",
      server: "running",
      database: dbState === 1 ? "connected" : "disconnected",
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Database ping failed" });
  }
});

app.use("/api/projects", projectRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ error: "Something went wrong on our end." });
});

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();