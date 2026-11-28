import express from 'express'
import pool from './config/db.js'
import cors from "cors";

import authRoutes from "./routes/auth.routes.js"
import hackathonRoutes from "./routes/hackathon.routes.js"

const APP = express()
APP.use(cors({
    origin: "http://localhost:5173"
}));
APP.use(express.json({ limit: "1mb" }));


APP.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            message: "HackGuard AI backend is running",
            database: "Connected to Supabase",
            time: result.rows[0].now
        });
    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});

// Authentication routes
APP.use("/api/auth", authRoutes);
APP.use("/api/hackathons", hackathonRoutes);

// 404 handler
APP.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

const PORT = 5000

APP.listen(PORT, "0.0.0.0", () => {
    console.log(`SERVER LISTING AT http://localhost:${PORT}`)
})



