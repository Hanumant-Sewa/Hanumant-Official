import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  getDashboard,
  forgotPassword,
  resetPassword,
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

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
