import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  getDashboard,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// =====================================================
// PUBLIC AUTH ROUTES
// =====================================================

router.post("/register", registerUser);

router.post("/login", loginUser);

// =====================================================
// PROTECTED AUTH ROUTES
// =====================================================

router.post("/logout", authMiddleware, logoutUser);

router.get("/profile", authMiddleware, getProfile);

router.get("/dashboard", authMiddleware, getDashboard);

export default router;
