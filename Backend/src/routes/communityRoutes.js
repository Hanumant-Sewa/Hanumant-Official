import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getCommunityReferrers,
  joinCommunity,
  getCommunityTree,
  getMyCommunity,
} from "../controllers/communityController.js";

const router = express.Router();

router.use(authMiddleware);

/* Get my community */
router.get("/my", getMyCommunity);

/* Get active members who can be selected as referrer */
router.get("/:communityId/referrers", getCommunityReferrers);

/* Join community */
router.post("/:communityId/join", joinCommunity);

/* Get referral tree */
router.get("/:communityId/tree", getCommunityTree);

export default router;
