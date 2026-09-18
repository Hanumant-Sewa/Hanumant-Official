import express from "express";

import {
  getMyCertificates,
  getCertificateById,
  createCertificate,
} from "../controllers/certificateController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/*
=====================================================
GET ALL CERTIFICATES OF LOGGED-IN USER
GET /api/certificates
=====================================================
*/

router.get(
  "/",
  authMiddleware,
  getMyCertificates
);


/*
=====================================================
GET ONE CERTIFICATE
GET /api/certificates/:id
=====================================================
*/

router.get(
  "/:id",
  authMiddleware,
  getCertificateById
);


/*
=====================================================
CREATE CERTIFICATE
POST /api/certificates
=====================================================
*/

router.post(
  "/",
  authMiddleware,
  createCertificate
);

export default router;