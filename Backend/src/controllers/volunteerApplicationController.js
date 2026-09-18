import prisma from "../config/prisma.js";

// =========================================
// APPLY FOR VOLUNTEER
// =========================================

export const applyVolunteer = async (req, res) => {
  try {
    // =========================================
    // GET LOGGED-IN USER ID
    // =========================================

    const userId = req.user.userId;

    console.log("=================================");
    console.log("LOGGED IN USER ID:", userId);
    console.log("REQUEST BODY:", req.body);

    // =========================================
    // GET FORM DATA
    // =========================================

    const {
      fullName,
      email,
      phone,
      city,
      ageGroup,
      skills,
      availability,
      preferredActivity,
      reason,
    } = req.body || {};

    // =========================================
    // CHECK REQUIRED FIELDS
    // =========================================

    if (
      !fullName ||
      !email ||
      !phone ||
      !city ||
      !ageGroup ||
      !skills ||
      !availability ||
      !preferredActivity ||
      !reason
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // =========================================
    // CHECK ACTIVITY
    // =========================================

    if (
      !Array.isArray(preferredActivity) ||
      preferredActivity.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one preferred activity",
      });
    }

    // =========================================
    // CONVERT ACTIVITIES ARRAY TO STRING
    // =========================================

    const preferredArea = preferredActivity.join(", ");

    console.log(
      "SELECTED ACTIVITIES:",
      preferredActivity
    );

    console.log(
      "ACTIVITIES TO SAVE:",
      preferredArea
    );

    // =========================================
    // CHECK USER
    // =========================================

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =========================================
    // CHECK EXISTING APPLICATION
    // =========================================

    const existingApplication =
      await prisma.volunteerApplication.findFirst({
        where: {
          userId: userId,
          status: {
            in: ["PENDING", "APPROVED"],
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    console.log(
      "EXISTING APPLICATION:",
      existingApplication
    );

    // =========================================
    // ALREADY APPLIED
    // =========================================

    if (existingApplication) {
      return res.status(200).json({
        success: true,
        alreadyApplied: true,
        message: "Volunteer application already exists",

        application: {
          id: existingApplication.id,
          status: existingApplication.status,
          createdAt: existingApplication.createdAt,
        },

        nextPage: "/volunteer/application-status",
      });
    }

    // =========================================
    // CREATE OR UPDATE VOLUNTEER PROFILE
    // =========================================

    const volunteerProfile =
      await prisma.volunteerProfile.upsert({
        where: {
          userId: userId,
        },

        create: {
          userId: userId,
          city: city,
          ageGroup: ageGroup,
          skills: skills,
          availability: availability,
        },

        update: {
          city: city,
          ageGroup: ageGroup,
          skills: skills,
          availability: availability,
        },
      });

    console.log(
      "VOLUNTEER PROFILE:",
      volunteerProfile
    );

    // =========================================
    // UPDATE USER
    // =========================================

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        name: fullName,
        phone: phone,
      },
    });

    console.log(
      "UPDATED USER:",
      updatedUser
    );

    // =========================================
    // CREATE VOLUNTEER APPLICATION
    // =========================================

    const application =
      await prisma.volunteerApplication.create({
        data: {
          userId: userId,
          volunteerProfileId: volunteerProfile.id,

          motivation: reason,

          skills: skills,

          // IMPORTANT:
          // Save ALL selected activities
          preferredArea: preferredArea,

          availability: availability,

          status: "PENDING",
        },
      });

    console.log(
      "NEW APPLICATION CREATED:",
      application
    );

    // =========================================
    // SUCCESS RESPONSE
    // =========================================

    return res.status(201).json({
      success: true,
      alreadyApplied: false,

      message:
        "Volunteer application submitted successfully",

      application: {
        id: application.id,
        status: application.status,
        createdAt: application.createdAt,
      },

      nextPage: "/volunteer/application-status",
    });

  } catch (error) {
    console.error(
      "Volunteer Application Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to submit volunteer application",
      error: error.message,
    });
  }
};

// =========================================
// GET VOLUNTEER APPLICATION STATUS
// =========================================

export const getVolunteerApplicationStatus = async (
  req,
  res
) => {
  try {
    const userId = req.user.userId;

    console.log(
      "Checking volunteer application status for user:",
      userId
    );

    // =========================================
    // FIND LATEST APPLICATION
    // =========================================

    const application =
      await prisma.volunteerApplication.findFirst({
        where: {
          userId: userId,
        },

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          status: true,
          motivation: true,
          preferredArea: true,
          availability: true,
          adminRemarks: true,
          reviewedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    // =========================================
    // APPLICATION NOT FOUND
    // =========================================

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "No volunteer application found",
      });
    }

    // =========================================
    // SUCCESS
    // =========================================

    return res.status(200).json({
      success: true,
      application: application,
    });

  } catch (error) {
    console.error(
      "Get Volunteer Application Status Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch volunteer application status",
      error: error.message,
    });
  }
};