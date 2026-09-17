import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createCommunityInvitation,
  getCommunityInvitation,
  acceptCommunityInvitation,
} from "../controllers/communityInvitationController.js";

const router = express.Router();

/*
  Create invitation
  User must be logged in.
*/

router.post("/create", authMiddleware, createCommunityInvitation);

/*
  View invitation details.

  This is public because someone may open
  the invitation before logging in.
*/

router.get("/:token", getCommunityInvitation);

router.post("/:token/accept", authMiddleware, acceptCommunityInvitation);

export default router;
