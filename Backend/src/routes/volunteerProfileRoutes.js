import express from "express";

import {
  getVolunteerProfile,
  updateVolunteerProfile,
} from "../controllers/volunteerProfileController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get volunteer profile
router.get(
  "/",
  authMiddleware,
  getVolunteerProfile
);

// Update volunteer profile
router.put(
  "/",
  authMiddleware,
  updateVolunteerProfile
);

export default router;