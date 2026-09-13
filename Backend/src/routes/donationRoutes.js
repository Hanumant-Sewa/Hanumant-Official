import express from "express";

import {
  createDonationOrder,
  verifyDonationPayment,
} from "../controllers/donationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

router.post(
  "/create-order",
  authMiddleware,
  createDonationOrder
);

// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

router.post(
  "/verify-payment",
  authMiddleware,
  verifyDonationPayment
);

export default router;