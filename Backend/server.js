import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/authRoutes.js";
import donationRoutes from "./src/routes/donationRoutes.js";
import volunteerApplicationRoutes from "./src/routes/volunteerApplicationRoutes.js";
import volunteerProfileRoutes from "./src/routes/volunteerProfileRoutes.js";
import volunteerDashboardRoutes from "./src/routes/volunteerDashboardRoutes.js";
import volunteerEventRoutes from "./src/routes/volunteerEventRoutes.js";
import volunteerImpactRoutes from "./src/routes/volunteerImpactRoutes.js";
import volunteerTaskRoutes from "./src/routes/volunteerTaskRoutes.js";
import volunteerCertificateRoutes from "./src/routes/volunteerCertificateRoutes.js";

import adminRoutes from "./src/routes/adminRoutes.js";

const app = express();

// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

// ===============================
// TEST ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "Hanumant Seva Backend is running",
  });
});

// ===============================
// ROUTES
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/donations", donationRoutes);

app.use("/api/volunteer-applications", volunteerApplicationRoutes);
app.use("/api/volunteer-profile", volunteerProfileRoutes);
app.use("/api/volunteer-dashboard", volunteerDashboardRoutes);
app.use("/api/volunteer-events", volunteerEventRoutes);
app.use("/api/volunteer-impact", volunteerImpactRoutes);
app.use("/api/volunteer-tasks", volunteerTaskRoutes);
app.use("/api/volunteer-certificates", volunteerCertificateRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
