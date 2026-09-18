import prisma from "../config/prisma.js";

/* =====================================================
   HELPERS
===================================================== */

const getEventLifecycleStatus = (event, now = new Date()) => {
  if (event.status === "CANCELLED") {
    return "CANCELLED";
  }

  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;

  if (Number.isNaN(startDate.getTime())) {
    return "UPCOMING";
  }

  if (!endDate || Number.isNaN(endDate.getTime())) {
    return now < startDate ? "UPCOMING" : "ONGOING";
  }

  if (now < startDate) {
    return "UPCOMING";
  }

  if (now >= endDate) {
    return "COMPLETED";
  }

  return "ONGOING";
};

/*
  Audit logs should never break the main admin operation.
*/
const createAuditLog = async ({
  userId,
  action,
  entity,
  entityId,
  details,
  ipAddress,
}) => {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId: entityId ? String(entityId) : null,
        details,
        ipAddress,
      },
    });
  } catch (error) {
    console.error("Audit log error:", error);
  }
};

/*
  Convert a value into a valid Date.
*/
const parseDate = (value) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
};

/*
  Event response helper.
*/
const formatEvent = (event) => {
  return {
    ...event,
    lifecycleStatus: getEventLifecycleStatus(event),
  };
};

/* =====================================================
   ADMIN DASHBOARD
===================================================== */

export const getAdminDashboard = async (req, res) => {
  try {
    const now = new Date();

    const [
      totalUsers,
      totalVolunteers,
      pendingVolunteerApplications,
      totalDonations,
      successfulDonations,
      totalCampaigns,
      activeCampaigns,
      totalEvents,
      allEvents,
      totalCommunities,
      recentApplications,
      recentDonations,
      recentUsers,
    ] = await Promise.all([
      /* Total users */
      prisma.user.count(),

      /* Total volunteers */
      prisma.user.count({
        where: {
          role: "VOLUNTEER",
        },
      }),

      /* Pending volunteer applications */
      prisma.volunteerApplication.count({
        where: {
          status: "PENDING",
        },
      }),

      /* Total donations */
      prisma.donation.count(),

      /* Successful donations */
      prisma.donation.count({
        where: {
          status: "SUCCESS",
        },
      }),

      /* Total campaigns */
      prisma.campaign.count(),

      /* Active campaigns */
      prisma.campaign.count({
        where: {
          status: "ACTIVE",
        },
      }),

      /* Total events */
      prisma.volunteerEvent.count(),

      /* Events */
      prisma.volunteerEvent.findMany({
        select: {
          id: true,
          startDate: true,
          endDate: true,
          status: true,
        },
      }),

      /* Communities */
      prisma.community.count(),

      /* Recent volunteer applications */
      prisma.volunteerApplication.findMany({
        take: 5,

        orderBy: {
          createdAt: "desc",
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      }),

      /* Recent donations */
      prisma.donation.findMany({
        take: 5,

        orderBy: {
          donatedAt: "desc",
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },

          campaign: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      }),

      /* Recent users */
      prisma.user.findMany({
        take: 5,

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    const upcomingEvents = allEvents.filter((event) => {
      return getEventLifecycleStatus(event, now) === "UPCOMING";
    }).length;

    const donationTotals = await prisma.donation.aggregate({
      where: {
        status: "SUCCESS",
      },

      _sum: {
        amount: true,
      },
    });

    return res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalVolunteers,
        pendingVolunteerApplications,
        totalDonations,
        successfulDonations,
        totalCampaigns,
        activeCampaigns,
        totalEvents,
        upcomingEvents,
        totalCommunities,

        totalDonationAmount: donationTotals._sum.amount?.toString() || "0",
      },

      recentApplications,
      recentDonations,
      recentUsers,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard.",
    });
  }
};

/* =====================================================
   USERS
===================================================== */

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        createdAt: true,

        volunteerProfile: {
          select: {
            id: true,
            isVerified: true,
            totalHours: true,
            totalEvents: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load users.",
    });
  }
};

/* =====================================================
   CHANGE USER STATUS
===================================================== */

export const updateUserStatus = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isInteger(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID.",
      });
    }

    const allowedStatuses = ["ACTIVE", "INACTIVE", "SUSPENDED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user status.",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.id === req.user.userId && status !== "ACTIVE") {
      return res.status(400).json({
        success: false,
        message: "You cannot deactivate or suspend yourself.",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        status,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    await createAuditLog({
      userId: req.user.userId,
      action: "UPDATE_USER_STATUS",
      entity: "User",
      entityId: userId,
      details: `User status changed from ${user.status} to ${status}`,
      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "User status updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update user status.",
    });
  }
};

/* =====================================================
   VOLUNTEER APPLICATIONS
===================================================== */

export const getVolunteerApplications = async (req, res) => {
  try {
    const { status } = req.query;

    const where = {};

    if (
      status &&
      ["PENDING", "APPROVED", "REJECTED", "WITHDRAWN"].includes(status)
    ) {
      where.status = status;
    }

    const applications = await prisma.volunteerApplication.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            status: true,
          },
        },

        volunteerProfile: {
          select: {
            id: true,
            userId: true,
            age: true,
            skills: true,
            city: true,
            availability: true,
            totalHours: true,
            totalEvents: true,
            isVerified: true,
            joinedAt: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Get volunteer applications error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load volunteer applications.",
    });
  }
};

/* =====================================================
   APPROVE VOLUNTEER
===================================================== */
export const approveVolunteerApplication = async (req, res) => {
  try {
    const applicationId = Number(req.params.id);
    const { adminRemarks = "" } = req.body || {};

    if (!Number.isInteger(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    const application = await prisma.volunteerApplication.findUnique({
      where: { id: applicationId },
      include: {
        user: true,
        volunteerProfile: true,
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Volunteer application not found.",
      });
    }

    if (application.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: `Application is already ${application.status}.`,
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      /* =========================================
         1. MAKE USER A VOLUNTEER
      ========================================= */

      const user = await tx.user.update({
        where: { id: application.userId },
        data: {
          role: "VOLUNTEER",
        },
      });

      /* =========================================
         2. CREATE / UPDATE VOLUNTEER PROFILE
      ========================================= */

      let volunteerProfile;

      if (application.volunteerProfileId) {
        volunteerProfile = await tx.volunteerProfile.update({
          where: {
            id: application.volunteerProfileId,
          },
          data: {
            isVerified: true,

            skills:
              application.skills ||
              application.volunteerProfile?.skills ||
              null,

            availability:
              application.availability ||
              application.volunteerProfile?.availability ||
              null,
          },
        });
      } else {
        const existingProfile = await tx.volunteerProfile.findUnique({
          where: {
            userId: application.userId,
          },
        });

        if (existingProfile) {
          volunteerProfile = await tx.volunteerProfile.update({
            where: {
              id: existingProfile.id,
            },
            data: {
              isVerified: true,

              skills: application.skills || existingProfile.skills || null,

              availability:
                application.availability ||
                existingProfile.availability ||
                null,

              city: existingProfile.city || null,
            },
          });
        } else {
          volunteerProfile = await tx.volunteerProfile.create({
            data: {
              userId: application.userId,
              skills: application.skills || null,
              availability: application.availability || null,
              city: null,
              isVerified: true,
            },
          });
        }
      }

      /* =========================================
         3. APPROVE APPLICATION
      ========================================= */

      const updatedApplication = await tx.volunteerApplication.update({
        where: {
          id: applicationId,
        },
        data: {
          status: "APPROVED",

          adminRemarks: adminRemarks.trim() || null,

          reviewedAt: new Date(),

          reviewedBy: req.user.userId,

          volunteerProfileId: volunteerProfile.id,
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              role: true,
            },
          },
        },
      });

      /* =========================================
         4. CREATE VOLUNTEER CERTIFICATE
         ========================================= */

      // Check whether this volunteer already has
      // a volunteer certificate.
      const existingCertificate = await tx.certificate.findFirst({
        where: {
          userId: application.userId,
          type: "VOLUNTEER",
        },
      });

      let certificate = existingCertificate;

      if (!existingCertificate) {
        const certificateCount = await tx.certificate.count({
          where: {
            type: "VOLUNTEER",
          },
        });

        const year = new Date().getFullYear();

        const certificateNumber = `HSF-VA-${year}-${String(
          certificateCount + 1,
        ).padStart(3, "0")}`;

        certificate = await tx.certificate.create({
          data: {
            userId: application.userId,

            volunteerProfileId: volunteerProfile.id,

            title: "Volunteer Appreciation",

            description:
              "In appreciation of your dedication and service as a volunteer with Hanumant Seva.",

            type: "VOLUNTEER",

            certificateNumber,

            issueDate: new Date(),
          },
        });
      }

      /* =========================================
         5. NOTIFICATION
      ========================================= */

      await tx.notification.create({
        data: {
          userId: application.userId,

          title: "Volunteer Application Approved",

          message:
            "Congratulations! Your volunteer application has been approved. Your volunteer certificate has been generated.",

          type: "VOLUNTEER_APPLICATION",
        },
      });

      /* =========================================
         RETURN EVERYTHING
      ========================================= */

      return {
        user,
        volunteerProfile,
        application: updatedApplication,
        certificate,
      };
    });

    /* =========================================
       6. AUDIT LOG
    ========================================= */

    await createAuditLog({
      userId: req.user.userId,

      action: "APPROVE_VOLUNTEER_APPLICATION",

      entity: "VolunteerApplication",

      entityId: applicationId,

      details: `Approved volunteer application and generated certificate for ${application.user.email}`,

      ipAddress: req.ip,
    });

    /* =========================================
       7. RESPONSE
    ========================================= */

    return res.status(200).json({
      success: true,

      message:
        "Volunteer application approved and certificate generated successfully.",

      ...result,
    });
  } catch (error) {
    console.error("Approve volunteer error:", error);

    return res.status(500).json({
      success: false,

      message: "Failed to approve volunteer application.",
    });
  }
};

/* =====================================================
   REJECT VOLUNTEER
===================================================== */

export const rejectVolunteerApplication = async (req, res) => {
  try {
    const applicationId = Number(req.params.id);

    const { adminRemarks } = req.body || {};

    if (!Number.isInteger(applicationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID.",
      });
    }

    if (!adminRemarks || !adminRemarks.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a reason for rejection.",
      });
    }

    const application = await prisma.volunteerApplication.findUnique({
      where: {
        id: applicationId,
      },

      include: {
        user: true,
      },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Volunteer application not found.",
      });
    }

    if (application.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: `Application is already ${application.status}.`,
      });
    }

    const updatedApplication = await prisma.$transaction(async (tx) => {
      const updated = await tx.volunteerApplication.update({
        where: {
          id: applicationId,
        },

        data: {
          status: "REJECTED",

          adminRemarks: adminRemarks.trim(),

          reviewedAt: new Date(),

          reviewedBy: req.user.userId,
        },

        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      await tx.notification.create({
        data: {
          userId: application.userId,

          title: "Volunteer Application Update",

          message: `Your volunteer application was not approved at this time. Reason: ${adminRemarks.trim()}`,

          type: "VOLUNTEER_APPLICATION",
        },
      });

      return updated;
    });

    await createAuditLog({
      userId: req.user.userId,

      action: "REJECT_VOLUNTEER_APPLICATION",

      entity: "VolunteerApplication",

      entityId: applicationId,

      details: `Rejected application for ${application.user.email}. Reason: ${adminRemarks.trim()}`,

      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,

      message: "Volunteer application rejected.",

      application: updatedApplication,
    });
  } catch (error) {
    console.error("Reject volunteer error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject volunteer application.",
    });
  }
};

/* =====================================================
   DONATIONS
===================================================== */

export const getAllDonations = async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({
      orderBy: {
        donatedAt: "desc",
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        campaign: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      donations,
    });
  } catch (error) {
    console.error("Get donations error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load donations.",
    });
  }
};

/* =====================================================
   CAMPAIGNS
===================================================== */

/* =====================================================
   GET ALL CAMPAIGNS
===================================================== */

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        _count: {
          select: {
            donations: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      campaigns,
    });
  } catch (error) {
    console.error("Get campaigns error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load campaigns.",
    });
  }
};

/* =====================================================
   CREATE CAMPAIGN
===================================================== */

export const createCampaign = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      targetAmount,
      raisedAmount,
      status = "DRAFT",
      startDate,
      endDate,
    } = req.body || {};

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Campaign title is required.",
      });
    }

    const parsedTargetAmount = Number(targetAmount);

    if (
      targetAmount === undefined ||
      targetAmount === null ||
      targetAmount === "" ||
      !Number.isFinite(parsedTargetAmount) ||
      parsedTargetAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Target amount must be greater than 0.",
      });
    }

    let parsedRaisedAmount = 0;

    if (
      raisedAmount !== undefined &&
      raisedAmount !== null &&
      raisedAmount !== ""
    ) {
      parsedRaisedAmount = Number(raisedAmount);

      if (!Number.isFinite(parsedRaisedAmount) || parsedRaisedAmount < 0) {
        return res.status(400).json({
          success: false,
          message: "Raised amount cannot be negative.",
        });
      }
    }

    const allowedStatuses = ["DRAFT", "ACTIVE", "COMPLETED", "CANCELLED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign status.",
      });
    }

    const parsedStartDate = startDate ? parseDate(startDate) : null;

    const parsedEndDate = endDate ? parseDate(endDate) : null;

    if (startDate && !parsedStartDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign start date.",
      });
    }

    if (endDate && !parsedEndDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign end date.",
      });
    }

    if (parsedStartDate && parsedEndDate && parsedEndDate <= parsedStartDate) {
      return res.status(400).json({
        success: false,
        message: "Campaign end date must be after the start date.",
      });
    }

    const campaign = await prisma.campaign.create({
      data: {
        title: title.trim(),

        description: description?.trim() || null,

        image: image?.trim() || null,

        targetAmount: parsedTargetAmount,

        raisedAmount: parsedRaisedAmount,

        status,

        startDate: parsedStartDate,

        endDate: parsedEndDate,
      },

      include: {
        _count: {
          select: {
            donations: true,
          },
        },
      },
    });

    await createAuditLog({
      userId: req.user.userId,

      action: "CREATE_CAMPAIGN",

      entity: "Campaign",

      entityId: campaign.id,

      details: `Created campaign "${campaign.title}"`,

      ipAddress: req.ip,
    });

    return res.status(201).json({
      success: true,

      message: "Campaign created successfully.",

      campaign,
    });
  } catch (error) {
    console.error("Create campaign error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create campaign.",
    });
  }
};

/* =====================================================
   UPDATE CAMPAIGN
===================================================== */

export const updateCampaign = async (req, res) => {
  try {
    const campaignId = Number(req.params.id);

    if (!Number.isInteger(campaignId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign ID.",
      });
    }

    const existingCampaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
    });

    if (!existingCampaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    const {
      title,
      description,
      image,
      targetAmount,
      raisedAmount,
      status,
      startDate,
      endDate,
    } = req.body || {};

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Campaign title is required.",
      });
    }

    const parsedTargetAmount = Number(targetAmount);

    if (
      targetAmount === undefined ||
      targetAmount === null ||
      targetAmount === "" ||
      !Number.isFinite(parsedTargetAmount) ||
      parsedTargetAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Target amount must be greater than 0.",
      });
    }

    const parsedRaisedAmount = Number(raisedAmount);

    if (
      raisedAmount === undefined ||
      raisedAmount === null ||
      raisedAmount === "" ||
      !Number.isFinite(parsedRaisedAmount) ||
      parsedRaisedAmount < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Raised amount cannot be negative.",
      });
    }

    const allowedStatuses = ["DRAFT", "ACTIVE", "COMPLETED", "CANCELLED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign status.",
      });
    }

    const parsedStartDate = startDate ? parseDate(startDate) : null;

    const parsedEndDate = endDate ? parseDate(endDate) : null;

    if (startDate && !parsedStartDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign start date.",
      });
    }

    if (endDate && !parsedEndDate) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign end date.",
      });
    }

    if (parsedStartDate && parsedEndDate && parsedEndDate <= parsedStartDate) {
      return res.status(400).json({
        success: false,
        message: "Campaign end date must be after the start date.",
      });
    }

    const updatedCampaign = await prisma.campaign.update({
      where: {
        id: campaignId,
      },

      data: {
        title: title.trim(),

        description: description?.trim() || null,

        image: image?.trim() || null,

        targetAmount: parsedTargetAmount,

        raisedAmount: parsedRaisedAmount,

        status,

        startDate: parsedStartDate,

        endDate: parsedEndDate,
      },

      include: {
        _count: {
          select: {
            donations: true,
          },
        },
      },
    });

    await createAuditLog({
      userId: req.user.userId,

      action: "UPDATE_CAMPAIGN",

      entity: "Campaign",

      entityId: campaignId,

      details: `Updated campaign "${updatedCampaign.title}"`,

      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,

      message: "Campaign updated successfully.",

      campaign: updatedCampaign,
    });
  } catch (error) {
    console.error("Update campaign error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update campaign.",
    });
  }
};

/* =====================================================
   CANCEL CAMPAIGN
===================================================== */

export const cancelCampaign = async (req, res) => {
  try {
    const campaignId = Number(req.params.id);

    if (!Number.isInteger(campaignId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign ID.",
      });
    }

    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    if (campaign.status === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Campaign is already cancelled.",
      });
    }

    if (campaign.status === "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Completed campaigns cannot be cancelled.",
      });
    }

    const updatedCampaign = await prisma.campaign.update({
      where: {
        id: campaignId,
      },

      data: {
        status: "CANCELLED",
      },

      include: {
        _count: {
          select: {
            donations: true,
          },
        },
      },
    });

    await createAuditLog({
      userId: req.user.userId,

      action: "CANCEL_CAMPAIGN",

      entity: "Campaign",

      entityId: campaignId,

      details: `Cancelled campaign "${campaign.title}"`,

      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,

      message: "Campaign cancelled successfully.",

      campaign: updatedCampaign,
    });
  } catch (error) {
    console.error("Cancel campaign error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel campaign.",
    });
  }
};

/* =====================================================
   DELETE CAMPAIGN
===================================================== */

export const deleteCampaign = async (req, res) => {
  try {
    const campaignId = Number(req.params.id);

    if (!Number.isInteger(campaignId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid campaign ID.",
      });
    }

    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },

      include: {
        _count: {
          select: {
            donations: true,
          },
        },
      },
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    if (campaign._count.donations > 0) {
      return res.status(400).json({
        success: false,
        message:
          "This campaign has donations and cannot be deleted. Mark it as CANCELLED instead.",
      });
    }

    await prisma.campaign.delete({
      where: {
        id: campaignId,
      },
    });

    await createAuditLog({
      userId: req.user.userId,

      action: "DELETE_CAMPAIGN",

      entity: "Campaign",

      entityId: campaignId,

      details: `Deleted campaign "${campaign.title}"`,

      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: "Campaign deleted successfully.",
    });
  } catch (error) {
    console.error("Delete campaign error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete campaign.",
    });
  }
};

/* =====================================================
   EVENTS
===================================================== */

/* =====================================================
   GET ALL EVENTS
===================================================== */

export const getAllEvents = async (req, res) => {
  try {
    const events = await prisma.volunteerEvent.findMany({
      orderBy: {
        startDate: "asc",
      },

      include: {
        _count: {
          select: {
            registrations: true,
            tasks: true,
            impactRecords: true,
          },
        },
      },
    });

    const formattedEvents = events.map(formatEvent);

    return res.status(200).json({
      success: true,
      events: formattedEvents,
    });
  } catch (error) {
    console.error("Get events error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load events.",
    });
  }
};

/* =====================================================
   CREATE EVENT
===================================================== */

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      location,
      city,
      state,
      startDate,
      endDate,
      capacity,
      status = "UPCOMING",
    } = req.body || {};

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Event title is required.",
      });
    }

    const parsedStartDate = parseDate(startDate);

    if (!parsedStartDate) {
      return res.status(400).json({
        success: false,
        message: "A valid event start date is required.",
      });
    }

    const parsedEndDate = parseDate(endDate);

    if (!parsedEndDate) {
      return res.status(400).json({
        success: false,
        message:
          "A valid event end date is required so the event lifecycle can be determined.",
      });
    }

    if (parsedEndDate <= parsedStartDate) {
      return res.status(400).json({
        success: false,
        message: "Event end date must be after the start date.",
      });
    }

    if (!["UPCOMING", "CANCELLED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "Event lifecycle status is determined automatically from its dates.",
      });
    }

    const lifecycleStatus =
      status === "CANCELLED"
        ? "CANCELLED"
        : getEventLifecycleStatus({
            startDate: parsedStartDate,
            endDate: parsedEndDate,
            status: "UPCOMING",
          });

    if (lifecycleStatus === "COMPLETED" && status !== "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Cannot create an event whose end date has already passed.",
      });
    }

    let parsedCapacity = null;

    if (capacity !== undefined && capacity !== null && capacity !== "") {
      parsedCapacity = Number(capacity);

      if (!Number.isInteger(parsedCapacity) || parsedCapacity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Capacity must be a positive whole number.",
        });
      }
    }

    const event = await prisma.volunteerEvent.create({
      data: {
        title: title.trim(),

        description: description?.trim() || null,

        image: image?.trim() || null,

        location: location?.trim() || null,

        city: city?.trim() || null,

        state: state?.trim() || null,

        startDate: parsedStartDate,

        endDate: parsedEndDate,

        capacity: parsedCapacity,

        status: lifecycleStatus,

        organizerId: req.user.userId,
      },

      include: {
        _count: {
          select: {
            registrations: true,
            tasks: true,
            impactRecords: true,
          },
        },
      },
    });

    await createAuditLog({
      userId: req.user.userId,

      action: "CREATE_EVENT",

      entity: "VolunteerEvent",

      entityId: event.id,

      details: `Created event "${event.title}" with lifecycle status ${lifecycleStatus}`,

      ipAddress: req.ip,
    });

    return res.status(201).json({
      success: true,

      message: "Event created successfully.",

      event: formatEvent(event),
    });
  } catch (error) {
    console.error("Create event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create event.",
    });
  }
};

/* =====================================================
   UPDATE EVENT
===================================================== */

export const updateEvent = async (req, res) => {
  try {
    const eventId = Number(req.params.id);

    if (!Number.isInteger(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const existingEvent = await prisma.volunteerEvent.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const {
      title,
      description,
      image,
      location,
      city,
      state,
      startDate,
      endDate,
      capacity,
      status,
    } = req.body || {};

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Event title is required.",
      });
    }

    const parsedStartDate = parseDate(startDate);

    if (!parsedStartDate) {
      return res.status(400).json({
        success: false,
        message: "A valid event start date is required.",
      });
    }

    const parsedEndDate = parseDate(endDate);

    if (!parsedEndDate) {
      return res.status(400).json({
        success: false,
        message:
          "A valid event end date is required so the event lifecycle can be determined.",
      });
    }

    if (parsedEndDate <= parsedStartDate) {
      return res.status(400).json({
        success: false,
        message: "Event end date must be after the start date.",
      });
    }

    if (status && !["UPCOMING", "CANCELLED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          "ONGOING and COMPLETED are automatically determined from event dates.",
      });
    }

    let newStatus;

    if (status === "CANCELLED") {
      newStatus = "CANCELLED";
    } else if (existingEvent.status === "CANCELLED") {
      newStatus = "CANCELLED";
    } else {
      newStatus = getEventLifecycleStatus({
        startDate: parsedStartDate,
        endDate: parsedEndDate,
        status: "UPCOMING",
      });
    }

    let parsedCapacity = null;

    if (capacity !== undefined && capacity !== null && capacity !== "") {
      parsedCapacity = Number(capacity);

      if (!Number.isInteger(parsedCapacity) || parsedCapacity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Capacity must be a positive whole number.",
        });
      }
    }

    const updatedEvent = await prisma.volunteerEvent.update({
      where: {
        id: eventId,
      },

      data: {
        title: title.trim(),

        description: description?.trim() || null,

        image: image?.trim() || null,

        location: location?.trim() || null,

        city: city?.trim() || null,

        state: state?.trim() || null,

        startDate: parsedStartDate,

        endDate: parsedEndDate,

        capacity: parsedCapacity,

        status: newStatus,
      },

      include: {
        _count: {
          select: {
            registrations: true,
            tasks: true,
            impactRecords: true,
          },
        },
      },
    });

    await createAuditLog({
      userId: req.user.userId,

      action: "UPDATE_EVENT",

      entity: "VolunteerEvent",

      entityId: eventId,

      details: `Updated event "${updatedEvent.title}". Lifecycle status: ${newStatus}`,

      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,

      message: "Event updated successfully.",

      event: formatEvent(updatedEvent),
    });
  } catch (error) {
    console.error("Update event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update event.",
    });
  }
};

/* =====================================================
   CANCEL EVENT
===================================================== */

export const cancelEvent = async (req, res) => {
  try {
    const eventId = Number(req.params.id);

    if (!Number.isInteger(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const event = await prisma.volunteerEvent.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const currentStatus = getEventLifecycleStatus(event);

    if (currentStatus === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Event is already cancelled.",
      });
    }

    if (currentStatus === "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Completed events cannot be cancelled.",
      });
    }

    const updatedEvent = await prisma.volunteerEvent.update({
      where: {
        id: eventId,
      },

      data: {
        status: "CANCELLED",
      },

      include: {
        _count: {
          select: {
            registrations: true,
            tasks: true,
            impactRecords: true,
          },
        },
      },
    });

    await createAuditLog({
      userId: req.user.userId,

      action: "CANCEL_EVENT",

      entity: "VolunteerEvent",

      entityId: eventId,

      details: `Cancelled event "${event.title}"`,

      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,

      message: "Event cancelled successfully.",

      event: formatEvent(updatedEvent),
    });
  } catch (error) {
    console.error("Cancel event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to cancel event.",
    });
  }
};

/* =====================================================
   DELETE EVENT
===================================================== */

export const deleteEvent = async (req, res) => {
  try {
    const eventId = Number(req.params.id);

    if (!Number.isInteger(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID.",
      });
    }

    const event = await prisma.volunteerEvent.findUnique({
      where: {
        id: eventId,
      },

      include: {
        _count: {
          select: {
            registrations: true,
            tasks: true,
            impactRecords: true,
          },
        },
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    if (
      event._count.registrations > 0 ||
      event._count.tasks > 0 ||
      event._count.impactRecords > 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "This event has registrations or related records and cannot be deleted. Mark it as CANCELLED instead.",
      });
    }

    await prisma.volunteerEvent.delete({
      where: {
        id: eventId,
      },
    });

    await createAuditLog({
      userId: req.user.userId,

      action: "DELETE_EVENT",

      entity: "VolunteerEvent",

      entityId: eventId,

      details: `Deleted event "${event.title}"`,

      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,

      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Delete event error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete event.",
    });
  }
};

/* =====================================================
   COMMUNITIES
===================================================== */

export const getAllCommunities = async (req, res) => {
  try {
    const communities = await prisma.community.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      communities,
    });
  } catch (error) {
    console.error("Get communities error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load communities.",
    });
  }
};

/* =====================================================
   CREATE COMMUNITY
===================================================== */

export const createCommunity = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      city,
      state,
      country,
      isPublic = true,
      isActive = true,
    } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Community name is required.",
      });
    }

    const community = await prisma.community.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        image: image?.trim() || null,
        city: city?.trim() || null,
        state: state?.trim() || null,
        country: country?.trim() || null,
        isPublic: isPublic !== false,
        isActive: isActive !== false,
        createdById: req.user.userId,
      },

      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    await createAuditLog({
      userId: req.user.userId,
      action: "CREATE_COMMUNITY",
      entity: "Community",
      entityId: community.id,
      details: `Created community "${community.name}"`,
      ipAddress: req.ip,
    });

    res.status(201).json({
      success: true,
      message: "Community created successfully.",
      community,
    });
  } catch (error) {
    console.error("Create community error:", error);

    res.status(500).json({
      message: "Failed to create community.",
    });
  }
};

/* =====================================================
   COMMUNITY DETAILS (WITH MEMBERS)
===================================================== */

export const getCommunityById = async (req, res) => {
  try {
    const communityId = Number(req.params.id);

    const community = await prisma.community.findUnique({
      where: {
        id: communityId,
      },

      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        members: {
          orderBy: {
            joinedAt: "asc",
          },

          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                status: true,
              },
            },
          },
        },

        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    if (!community) {
      return res.status(404).json({
        message: "Community not found.",
      });
    }

    res.json({
      success: true,
      community,
    });
  } catch (error) {
    console.error("Get community error:", error);

    res.status(500).json({
      message: "Failed to load community.",
    });
  }
};

/* =====================================================
   UPDATE COMMUNITY
===================================================== */

export const updateCommunity = async (req, res) => {
  try {
    const communityId = Number(req.params.id);

    const existing = await prisma.community.findUnique({
      where: {
        id: communityId,
      },
    });

    if (!existing) {
      return res.status(404).json({
        message: "Community not found.",
      });
    }

    const { name, description, image, city, state, country, isPublic } =
      req.body;

    if (name !== undefined && !String(name).trim()) {
      return res.status(400).json({
        message: "Community name cannot be empty.",
      });
    }

    const data = {};

    if (name !== undefined) data.name = String(name).trim();
    if (description !== undefined)
      data.description = description?.trim() || null;
    if (image !== undefined) data.image = image?.trim() || null;
    if (city !== undefined) data.city = city?.trim() || null;
    if (state !== undefined) data.state = state?.trim() || null;
    if (country !== undefined) data.country = country?.trim() || null;
    if (isPublic !== undefined) data.isPublic = isPublic !== false;

    const community = await prisma.community.update({
      where: {
        id: communityId,
      },

      data,

      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        _count: {
          select: {
            members: true,
          },
        },
      },
    });

    await createAuditLog({
      userId: req.user.userId,
      action: "UPDATE_COMMUNITY",
      entity: "Community",
      entityId: communityId,
      details: `Updated community "${community.name}"`,
      ipAddress: req.ip,
    });

    res.json({
      success: true,
      message: "Community updated successfully.",
      community,
    });
  } catch (error) {
    console.error("Update community error:", error);

    res.status(500).json({
      message: "Failed to update community.",
    });
  }
};

/* =====================================================
   ACTIVATE / DEACTIVATE COMMUNITY
===================================================== */

export const updateCommunityStatus = async (req, res) => {
  try {
    const communityId = Number(req.params.id);
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        message: "isActive must be true or false.",
      });
    }

    const existing = await prisma.community.findUnique({
      where: {
        id: communityId,
      },
    });

    if (!existing) {
      return res.status(404).json({
        message: "Community not found.",
      });
    }

    const community = await prisma.community.update({
      where: {
        id: communityId,
      },

      data: {
        isActive,
      },

      select: {
        id: true,
        name: true,
        isActive: true,
      },
    });

    await createAuditLog({
      userId: req.user.userId,
      action: isActive ? "ACTIVATE_COMMUNITY" : "DEACTIVATE_COMMUNITY",
      entity: "Community",
      entityId: communityId,
      details: `Community "${existing.name}" ${
        isActive ? "activated" : "deactivated"
      }`,
      ipAddress: req.ip,
    });

    res.json({
      success: true,
      message: `Community ${
        isActive ? "activated" : "deactivated"
      } successfully.`,
      community,
    });
  } catch (error) {
    console.error("Update community status error:", error);

    res.status(500).json({
      message: "Failed to update community status.",
    });
  }
};

/* =====================================================
   DELETE COMMUNITY
===================================================== */

export const deleteCommunity = async (req, res) => {
  try {
    const communityId = Number(req.params.id);

    const existing = await prisma.community.findUnique({
      where: {
        id: communityId,
      },
    });

    if (!existing) {
      return res.status(404).json({
        message: "Community not found.",
      });
    }

    await prisma.community.delete({
      where: {
        id: communityId,
      },
    });

    await createAuditLog({
      userId: req.user.userId,
      action: "DELETE_COMMUNITY",
      entity: "Community",
      entityId: communityId,
      details: `Deleted community "${existing.name}"`,
      ipAddress: req.ip,
    });

    res.json({
      success: true,
      message: "Community deleted successfully.",
    });
  } catch (error) {
    console.error("Delete community error:", error);

    res.status(500).json({
      message: "Failed to delete community.",
    });
  }
};

/* =====================================================
   UPDATE COMMUNITY MEMBER (ROLE / STATUS)
===================================================== */

export const updateCommunityMember = async (req, res) => {
  try {
    const communityId = Number(req.params.id);
    const memberId = Number(req.params.memberId);
    const { role, status } = req.body;

    const allowedRoles = ["MEMBER", "MODERATOR", "ADMIN"];
    const allowedStatuses = ["ACTIVE", "INACTIVE", "BANNED"];

    if (role !== undefined && !allowedRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid member role.",
      });
    }

    if (status !== undefined && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid member status.",
      });
    }

    if (role === undefined && status === undefined) {
      return res.status(400).json({
        message: "Provide role and/or status to update.",
      });
    }

    const member = await prisma.communityMember.findFirst({
      where: {
        id: memberId,
        communityId,
      },

      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found in this community.",
      });
    }

    const data = {};

    if (role !== undefined) data.role = role;
    if (status !== undefined) data.status = status;

    const updated = await prisma.communityMember.update({
      where: {
        id: memberId,
      },

      data,

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    await createAuditLog({
      userId: req.user.userId,
      action: "UPDATE_COMMUNITY_MEMBER",
      entity: "CommunityMember",
      entityId: memberId,
      details: `Updated member ${member.user.email} in community #${communityId}`,
      ipAddress: req.ip,
    });

    res.json({
      success: true,
      message: "Community member updated successfully.",
      member: updated,
    });
  } catch (error) {
    console.error("Update community member error:", error);

    res.status(500).json({
      message: "Failed to update community member.",
    });
  }
};

/* =====================================================
   REMOVE COMMUNITY MEMBER
===================================================== */

export const removeCommunityMember = async (req, res) => {
  try {
    const communityId = Number(req.params.id);
    const memberId = Number(req.params.memberId);

    const member = await prisma.communityMember.findFirst({
      where: {
        id: memberId,
        communityId,
      },

      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found in this community.",
      });
    }

    await prisma.communityMember.delete({
      where: {
        id: memberId,
      },
    });

    await createAuditLog({
      userId: req.user.userId,
      action: "REMOVE_COMMUNITY_MEMBER",
      entity: "CommunityMember",
      entityId: memberId,
      details: `Removed member ${member.user.email} from community #${communityId}`,
      ipAddress: req.ip,
    });

    res.json({
      success: true,
      message: "Member removed from community.",
    });
  } catch (error) {
    console.error("Remove community member error:", error);

    res.status(500).json({
      message: "Failed to remove community member.",
    });
  }
};

/* =====================================================
   AUDIT LOGS
===================================================== */

export const getAuditLogs = async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      take: 100,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error("Get audit logs error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load audit logs.",
    });
  }
};

/* =====================================================
   VOLUNTEER TASKS
===================================================== */

/* =====================================================
   GET ALL TASKS
===================================================== */

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await prisma.volunteerTask.findMany({
      orderBy: [
        {
          dueDate: "asc",
        },
        {
          createdAt: "desc",
        },
      ],

      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },

        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        volunteerProfile: {
          select: {
            id: true,
            userId: true,
            age: true,
            city: true,
            skills: true,
            totalHours: true,
            totalEvents: true,
          },
        },

        event: {
          select: {
            id: true,
            title: true,
            location: true,
            city: true,
            state: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get all tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load tasks.",
    });
  }
};

/* =====================================================
   CREATE TASK
   No volunteer selection required
===================================================== */

export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      eventId,
      dueDate,
      status = "TODO",
    } = req.body || {};

    /* -----------------------------------------------
       Validate title
    ------------------------------------------------ */

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required.",
      });
    }

    /* -----------------------------------------------
       Event
    ------------------------------------------------ */

    let parsedEventId = null;

    if (eventId !== undefined && eventId !== null && eventId !== "") {
      parsedEventId = Number(eventId);

      if (!Number.isInteger(parsedEventId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid event ID.",
        });
      }

      const event = await prisma.volunteerEvent.findUnique({
        where: {
          id: parsedEventId,
        },
      });

      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found.",
        });
      }
    }

    /* -----------------------------------------------
       Status
    ------------------------------------------------ */

    const allowedStatuses = ["TODO", "IN_PROGRESS", "COMPLETED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status.",
      });
    }

    /* -----------------------------------------------
       Due Date
    ------------------------------------------------ */

    let parsedDueDate = null;

    if (dueDate) {
      parsedDueDate = new Date(dueDate);

      if (Number.isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid task due date.",
        });
      }
    }

    /* -----------------------------------------------
       Create Global / Unassigned Task
    ------------------------------------------------ */

    const task = await prisma.volunteerTask.create({
      data: {
        title: title.trim(),

        description: description?.trim() || null,

        /*
          No volunteer is selected while creating
          the task.
        */
        assignedToId: null,

        createdById: req.user.userId,

        volunteerProfileId: null,

        eventId: parsedEventId,

        dueDate: parsedDueDate,

        status,

        completedAt: status === "COMPLETED" ? new Date() : null,
      },

      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },

        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        event: {
          select: {
            id: true,
            title: true,
            location: true,
            city: true,
            state: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    /* -----------------------------------------------
       Audit Log
    ------------------------------------------------ */

    await createAuditLog({
      userId: req.user.userId,

      action: "CREATE_VOLUNTEER_TASK",

      entity: "VolunteerTask",

      entityId: task.id,

      details: `Created general task "${task.title}"`,

      ipAddress: req.ip,
    });

    return res.status(201).json({
      success: true,

      message: "Task created successfully.",

      task,
    });
  } catch (error) {
    console.error("Create task error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create task.",
    });
  }
};

/* =====================================================
   UPDATE TASK
===================================================== */

export const updateTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID.",
      });
    }

    const existingTask = await prisma.volunteerTask.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    const { title, description, eventId, dueDate, status } = req.body || {};

    /* -----------------------------------------------
       Validate title
    ------------------------------------------------ */

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required.",
      });
    }

    /* -----------------------------------------------
       Event
    ------------------------------------------------ */

    let parsedEventId = null;

    if (eventId !== undefined && eventId !== null && eventId !== "") {
      parsedEventId = Number(eventId);

      if (!Number.isInteger(parsedEventId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid event ID.",
        });
      }

      const event = await prisma.volunteerEvent.findUnique({
        where: {
          id: parsedEventId,
        },
      });

      if (!event) {
        return res.status(404).json({
          success: false,
          message: "Event not found.",
        });
      }
    }

    /* -----------------------------------------------
       Status
    ------------------------------------------------ */

    const allowedStatuses = ["TODO", "IN_PROGRESS", "COMPLETED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status.",
      });
    }

    /* -----------------------------------------------
       Due Date
    ------------------------------------------------ */

    let parsedDueDate = null;

    if (dueDate) {
      parsedDueDate = new Date(dueDate);

      if (Number.isNaN(parsedDueDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: "Invalid task due date.",
        });
      }
    }

    /* -----------------------------------------------
       Update Task
    ------------------------------------------------ */

    const updatedTask = await prisma.volunteerTask.update({
      where: {
        id: taskId,
      },

      data: {
        title: title.trim(),

        description: description?.trim() || null,

        /*
            Keep the current assignment.
            New tasks are unassigned.
          */
        assignedToId: existingTask.assignedToId,

        volunteerProfileId: existingTask.volunteerProfileId,

        eventId: parsedEventId,

        dueDate: parsedDueDate,

        status,

        completedAt:
          status === "COMPLETED"
            ? existingTask.completedAt || new Date()
            : null,
      },

      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },

        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        event: {
          select: {
            id: true,
            title: true,
            location: true,
            city: true,
            state: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    /* -----------------------------------------------
       Audit Log
    ------------------------------------------------ */

    await createAuditLog({
      userId: req.user.userId,

      action: "UPDATE_VOLUNTEER_TASK",

      entity: "VolunteerTask",

      entityId: taskId,

      details: `Updated task "${updatedTask.title}"`,

      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,

      message: "Task updated successfully.",

      task: updatedTask,
    });
  } catch (error) {
    console.error("Update task error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update task.",
    });
  }
};

/* =====================================================
   DELETE TASK
===================================================== */

export const deleteTask = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID.",
      });
    }

    const task = await prisma.volunteerTask.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    await prisma.volunteerTask.delete({
      where: {
        id: taskId,
      },
    });

    await createAuditLog({
      userId: req.user.userId,

      action: "DELETE_VOLUNTEER_TASK",

      entity: "VolunteerTask",

      entityId: taskId,

      details: `Deleted task "${task.title}"`,

      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,

      message: "Task deleted successfully.",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete task.",
    });
  }
};
