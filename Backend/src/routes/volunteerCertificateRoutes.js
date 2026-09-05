import express from "express";

import {
  getVolunteerCertificates,
} from "../controllers/volunteerCertificateController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  getVolunteerCertificates
);

export default router;