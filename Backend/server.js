import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/authRoutes.js";
import donationRoutes from "./src/routes/donationRoutes.js";

const app = express();

// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(express.json());
app.use(cookieParser());

// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "Hanumant Seva Backend is running",
  });
});

// =====================================================
// AUTH ROUTES
// =====================================================

app.use("/api/auth", authRoutes);

//Donation Routes
app.use("/api/donations", donationRoutes);

// =====================================================
// SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
