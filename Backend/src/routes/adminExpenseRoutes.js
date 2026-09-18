import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getAllExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

const router = express.Router();

// ==========================================
// PUBLIC - Anyone can view expenses
// ==========================================

router.get("/", getAllExpenses);

// ==========================================
// ADMIN ONLY - Create / Update / Delete
// ==========================================

router.post("/", authMiddleware, adminMiddleware, createExpense);

router.patch("/:id", authMiddleware, adminMiddleware, updateExpense);

router.delete("/:id", authMiddleware, adminMiddleware, deleteExpense);

export default router;
