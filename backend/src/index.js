
import express from "express";
import authRoutes from "../src/routes/auth.route.js";
import messageRoutes from "../src/routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";
import { app ,server } from "./lib/socket.js";
dotenv.config();


// middleware 
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// routes

app.use("/api/auth" ,authRoutes);
app.use("/api/messages" ,messageRoutes);

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


server.listen(5001, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});