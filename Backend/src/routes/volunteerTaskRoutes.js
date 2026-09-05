import express from "express";

import {
  getVolunteerTasks,
  updateVolunteerTaskStatus,
} from "../controllers/volunteerTaskController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getVolunteerTasks);

router.patch(
  "/:id/status",
  authMiddleware,
  updateVolunteerTaskStatus
);

export default router;