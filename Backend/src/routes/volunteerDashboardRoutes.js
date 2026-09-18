import express from "express";

import {
  getVolunteerDashboard,
} from "../controllers/volunteerDashboardController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getVolunteerDashboard
);

export default router;