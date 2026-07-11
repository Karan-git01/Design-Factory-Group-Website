import rateLimit from "express-rate-limit";

// Generous limit for normal browsing — protects against scraping/abuse
// without affecting real visitors
export const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { error: "Too many requests. Please try again shortly." },
});