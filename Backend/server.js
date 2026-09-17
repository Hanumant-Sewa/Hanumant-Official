import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

// ===============================
// ROUTES
// ===============================

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

import contactRoutes from "./src/routes/contactRoutes.js";

import adminExpenseRoutes from "./src/routes/adminExpenseRoutes.js";

import communityRoutes from "./src/routes/communityRoutes.js";

import communityInvitationRoutes from "./src/routes/communityInvitationRoutes.js";

import transparencyRoute from "./src/routes/transparencyRoute.js";

const app = express();

// Log which database is in use (password masked) — catches wrong-DATABASE_URL issues at boot
try {
  const u = new URL(process.env.DATABASE_URL || "");
  console.log(
    `Database: ${u.pathname.replace("/", "")} @ ${u.hostname}:${u.port || 5432} (user ${u.username})`,
  );
} catch {
  console.log("Database: DATABASE_URL missing or invalid");
}

// ===============================
// MIDDLEWARE
// ===============================

const allowedOrigins = [
  // Local development frontend
  "http://localhost:5173",

  // Firebase production frontend
  "https://hanumant-seva.web.app",
  "https://hanumant-seva.firebaseapp.com",
];

app.use(
  cors({
    origin: allowedOrigins,
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

app.use("/api/community-invitations", communityInvitationRoutes);

app.use("/api/transparency", transparencyRoute);

// ===============================
// ADMIN ROUTES
// ===============================
//
// adminRoutes already contains:
//
// authMiddleware
//       ↓
// adminMiddleware
//       ↓
// admin controller
//
// Therefore every /api/admin/*
// endpoint requires ADMIN role.
//

app.use("/api/admin", adminRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/admin/expenses", adminExpenseRoutes);

app.use("/api/communities", communityRoutes);

// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
