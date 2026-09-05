import express from "express";

import {
  getVolunteerEvents,
  getVolunteerEventById,
  joinVolunteerEvent,
} from "../controllers/volunteerEventController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all upcoming events
router.get(
  "/",
  authMiddleware,
  getVolunteerEvents
);

// Get one event
router.get(
  "/:id",
  authMiddleware,
  getVolunteerEventById
);

// Join event
router.post(
  "/:id/join",
  authMiddleware,
  joinVolunteerEvent
);

export default router;