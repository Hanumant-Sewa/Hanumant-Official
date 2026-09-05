import express from "express";

import { createDonation } from "../controllers/donationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected donation route
router.post("/", authMiddleware, createDonation);

export default router;