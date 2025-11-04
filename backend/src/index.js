import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import googleAuthRoutes from "./routes/google.auth.route.js";
import { app, server } from "./lib/socket.js";

import passport from "./config/passport.js";

dotenv.config();

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Initialize Passport for Google OAuth
app.use(passport.initialize());

// ✅ API routes
app.use("/api/auth", authRoutes); // Traditional auth
app.use("/api/auth", googleAuthRoutes); // Google OAuth
app.use("/api/messages", messageRoutes);

// ✅ Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  // Serve React build
  const frontendPath = path.join(__dirname, "../../frontend/dist");
  app.use(express.static(frontendPath));

  // Fallback route for SPA — fixes "Cannot GET /login" etc.
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ✅ Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on PORT: ${PORT}`);
  connectDB();
});
