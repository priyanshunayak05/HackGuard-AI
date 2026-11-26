import express from 'express'

const router = express.Router();

import * as authController from "../controllers/auth.controller.js"

import requireAuth from "../middleware/requireAuth.js"

// Candidate registration
router.post("/signup", authController.signupCandidate);

// Admin registration (invitation code required)
router.post("/admin-signup", authController.signupAdmin);

// Login for both roles
router.post("/login", authController.login);

// Get logged-in user
router.get("/me", requireAuth, authController.getMe);

export default router;