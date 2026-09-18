import express from "express";
import {
  getVolunteerImpact,
} from "../controllers/volunteerImpactController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getVolunteerImpact);

export default router;