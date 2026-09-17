import express from "express";

import { getTransparency } from "../controllers/transparencyController.js";

const router = express.Router();

// ==========================================
// PUBLIC TRANSPARENCY
// ==========================================

router.get("/", getTransparency);

export default router;
