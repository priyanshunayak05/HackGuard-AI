import express from 'express'
import pool from './config/db.js'

import authRoutes from "./routes/auth.routes.js"
import hackathonRoutes from "./routes/hackathon.routes.js"

const APP = express()
APP.use(express.json({ limit: "1mb" }));

APP.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.status(200).json({
            message: "SERVER HIT!!",
            dbTime : result.rows[0].now
        })
    }catch(err) {
        console.error(`ERROR: ${err}`)
        res.status(500).json({
            message: "SERVER UNHEALTHY!!"
        })
    }
    
})

// Authentication routes
APP.use("/api/auth", authRoutes);
APP.use("/api/hackathons", hackathonRoutes);

// 404 handler
APP.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

const PORT = 3000

APP.listen(PORT, "0.0.0.0", () => {
    console.log(`SERVER LISTING AT http://localhost:${PORT}`)
})