import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getAdminDashboard,
  getAllUsers,
  updateUserStatus,
  getVolunteerApplications,
  approveVolunteerApplication,
  rejectVolunteerApplication,
  getAllDonations,
  getAllCampaigns,
  getAllEvents,
  getAllCommunities,
  getAuditLogs,
} from "../controllers/adminController.js";

const router = express.Router();

/*
=====================================================
ALL ADMIN ROUTES REQUIRE:
1. Valid JWT
2. ADMIN role
=====================================================
*/

router.use(authMiddleware);
router.use(adminMiddleware);

/* Dashboard */
router.get("/dashboard", getAdminDashboard);

/* Users */
router.get("/users", getAllUsers);
router.patch("/users/:id/status", updateUserStatus);

/* Volunteer Applications */
router.get("/volunteer-applications", getVolunteerApplications);

router.patch(
  "/volunteer-applications/:id/approve",
  approveVolunteerApplication,
);

router.patch("/volunteer-applications/:id/reject", rejectVolunteerApplication);

/* Donations */
router.get("/donations", getAllDonations);

/* Campaigns */
router.get("/campaigns", getAllCampaigns);

/* Events */
router.get("/events", getAllEvents);

/* Communities */
router.get("/communities", getAllCommunities);

/* Audit Logs */
router.get("/audit-logs", getAuditLogs);

export default router;
