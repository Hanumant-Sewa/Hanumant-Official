import express from "express";
import { getUpcomingEvent } from "../controllers/eventController.js";

const router = express.Router();

// Public upcoming event
router.get("/upcoming", getUpcomingEvent);

export default router;
