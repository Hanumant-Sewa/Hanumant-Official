import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

import {
  getAdminDashboard,

  // Users
  getAllUsers,
  updateUserStatus,

  // Volunteer Applications
  getVolunteerApplications,
  approveVolunteerApplication,
  rejectVolunteerApplication,

  // Donations
  getAllDonations,

  // Campaigns
  getAllCampaigns,
  createCampaign,
  updateCampaign,
  cancelCampaign,
  deleteCampaign,

  // Events
  getAllEvents,
  createEvent,
  updateEvent,
  cancelEvent,
  deleteEvent,

  // Tasks
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,

  // Communities
  getAllCommunities,
  createCommunity,
  getCommunityById,
  updateCommunity,
  updateCommunityStatus,
  deleteCommunity,
  updateCommunityMember,
  removeCommunityMember,

  // Audit Logs
  getAuditLogs,
} from "../controllers/adminController.js";

const router = express.Router();

/*
=====================================================
ADMIN ROUTE PROTECTION
=====================================================

Every route in this router requires:

1. Valid JWT
2. User must have ADMIN role

Order:
authMiddleware -> identifies the user
adminMiddleware -> checks ADMIN role
*/

router.use(authMiddleware);
router.use(adminMiddleware);

/* =====================================================
   DASHBOARD
===================================================== */

router.get("/dashboard", getAdminDashboard);

/* =====================================================
   USERS
===================================================== */

router.get("/users", getAllUsers);

router.patch("/users/:id/status", updateUserStatus);

/* =====================================================
   VOLUNTEER APPLICATIONS
===================================================== */

router.get(
  "/volunteer-applications",
  getVolunteerApplications
);

router.patch(
  "/volunteer-applications/:id/approve",
  approveVolunteerApplication
);

router.patch(
  "/volunteer-applications/:id/reject",
  rejectVolunteerApplication
);

/* =====================================================
   DONATIONS
===================================================== */

router.get("/donations", getAllDonations);

/* =====================================================
   CAMPAIGNS
===================================================== */

router.get("/campaigns", getAllCampaigns);

router.post("/campaigns", createCampaign);

router.patch("/campaigns/:id", updateCampaign);

router.patch(
  "/campaigns/:id/cancel",
  cancelCampaign
);

router.delete(
  "/campaigns/:id",
  deleteCampaign
);

/* =====================================================
   EVENTS
===================================================== */

router.get("/events", getAllEvents);

router.post("/events", createEvent);

router.patch("/events/:id", updateEvent);

router.patch(
  "/events/:id/cancel",
  cancelEvent
);

router.delete(
  "/events/:id",
  deleteEvent
);

/* =====================================================
   TASKS
===================================================== */

router.get("/tasks", getAllTasks);

router.post("/tasks", createTask);

router.patch("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

/* =====================================================
   COMMUNITIES
===================================================== */

router.get("/communities", getAllCommunities);
router.post("/communities", createCommunity);
router.get("/communities/:id", getCommunityById);
router.patch("/communities/:id", updateCommunity);
router.patch("/communities/:id/status", updateCommunityStatus);
router.delete("/communities/:id", deleteCommunity);
router.patch("/communities/:id/members/:memberId", updateCommunityMember);
router.delete("/communities/:id/members/:memberId", removeCommunityMember);

/* =====================================================
   AUDIT LOGS
===================================================== */

router.get("/audit-logs", getAuditLogs);

export default router;
