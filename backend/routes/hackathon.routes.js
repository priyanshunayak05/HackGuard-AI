
import express from 'express'

const router = express.Router();

import * as  hackathonController from "../controllers/hackathon.controller.js";
import * as registrationController from "../controllers/registration.controller.js"
import * as submissionController  from "../controllers/submission.controller.js"

import requireAuth from "../middleware/requireAuth.js"
import requireRole from "../middleware/requireRole.js"

// Create hackathon (Admin only)
router.post(
    "/",
    requireAuth,
    requireRole("admin"),
    hackathonController.createHackathon
);

router.get(
    "/created-by-me",
    requireAuth,
    requireRole("admin"),
    hackathonController.getMyHackathons
);


// Fetch hackathons joined by logged-in candidate
router.get(
    "/my-registrations",
    requireAuth,
    requireRole("candidate"),
    registrationController.getMyRegistrations
);

// Register individually
router.post(
    "/:hackathonId/register",
    requireAuth,
    requireRole("candidate"),
    registrationController.registerIndividual
);

// Create a team
router.post(
    "/:hackathonId/teams",
    requireAuth,
    requireRole("candidate"),
    registrationController.createTeam
);

// View teams
router.get(
    "/:hackathonId/teams",
    requireAuth,
    requireRole("candidate"),
    registrationController.getTeams
);

// Join an existing team
router.post(
    "/:hackathonId/teams/:entryId/join",
    requireAuth,
    requireRole("candidate"),
    registrationController.joinTeam
);


// Fetch all hackathons (Public)
router.get(
    "/",
    hackathonController.getAllHackathons
);

router.get(
    "/:hackathonId/leaderboard",
    submissionController.getLeaderboard
);

router.get(
    "/:hackathonId/submissions",
    requireAuth,
    requireRole("admin"),
    submissionController.getHackathonSubmissions
);

router.patch(
    "/:hackathonId/submissions/:submissionId/grade",
    requireAuth,
    requireRole("admin"),
    submissionController.gradeSubmission
);

// Level 1 screening submission
router.post(
    "/:hackathonId/entries/:entryId/submissions/screening",
    requireAuth,
    requireRole("candidate"),
    submissionController.submitScreening
);

// Level 2 final submission
router.post(
    "/:hackathonId/entries/:entryId/submissions/final",
    requireAuth,
    requireRole("candidate"),
    submissionController.submitFinal
);


export default router;
