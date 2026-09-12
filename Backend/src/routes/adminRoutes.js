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
  createCommunity,
  getCommunityById,
  updateCommunity,
  updateCommunityStatus,
  deleteCommunity,
  updateCommunityMember,
  removeCommunityMember,
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
router.post("/communities", createCommunity);
router.get("/communities/:id", getCommunityById);
router.patch("/communities/:id", updateCommunity);
router.patch("/communities/:id/status", updateCommunityStatus);
router.delete("/communities/:id", deleteCommunity);
router.patch("/communities/:id/members/:memberId", updateCommunityMember);
router.delete("/communities/:id/members/:memberId", removeCommunityMember);

/* Audit Logs */
router.get("/audit-logs", getAuditLogs);

export default router;
