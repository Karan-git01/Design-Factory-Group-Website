import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

function generateToken(adminId) {
  return jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = generateToken(admin._id);

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ success: true, message: "Logged in successfully." });
  } catch (err) {
    res.status(500).json({ error: "Login failed. Please try again." });
  }
}

export async function logout(req, res) {
  res.clearCookie("adminToken");
  res.json({ success: true, message: "Logged out successfully." });
}

export async function checkAuth(req, res) {
  // If this route is reached, requireAdmin middleware already validated the token
  res.json({ authenticated: true });
}