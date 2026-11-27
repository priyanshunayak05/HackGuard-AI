
import express from "express";

const router = express.Router();

import * as authController from "../controllers/auth.controller.js";

import requireAuth from "../middleware/requireAuth.js";
import requireRole from "../middleware/requireRole.js";

// Public candidate registration
router.post(
    "/signup",
    authController.signupCandidate
);

// Admin-only creation of admin/judge accounts
router.post(
    "/staff",
    requireAuth,
    requireRole("admin"),
    authController.createStaffAccount
);

// Login for admin, candidate and judge
router.post(
    "/login",
    authController.login
);

// Get logged-in user
router.get(
    "/me",
    requireAuth,
    authController.getMe
);

export default router;
