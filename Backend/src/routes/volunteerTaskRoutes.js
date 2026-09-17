import express from "express";

import {
  getMyTasks,
  startTask,
  completeTask,
} from "../controllers/volunteerTaskController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get logged-in volunteer's tasks
router.get("/", authMiddleware, getMyTasks);

// Start a task
router.put("/:id/start", authMiddleware, startTask);

// Complete a task
router.put("/:id/complete", authMiddleware, completeTask);

export default router;