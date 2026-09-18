import express from "express";

import {
  applyVolunteer,
  getVolunteerApplicationStatus,
} from "../controllers/volunteerApplicationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =========================================
// SUBMIT VOLUNTEER APPLICATION
// =========================================

router.post(
  "/apply",
  authMiddleware,
  applyVolunteer
);

// =========================================
// GET VOLUNTEER APPLICATION STATUS
// =========================================

router.get(
  "/status",
  authMiddleware,
  getVolunteerApplicationStatus
);

export default router;