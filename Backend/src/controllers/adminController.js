import prisma from "../config/prisma.js";

/* =====================================================
   HELPER
===================================================== */

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

/* =====================================================
   ADMIN DASHBOARD
===================================================== */

export const getAdminDashboard = async (req, res) => {
  try {
    const [
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
      recentApplications,
      recentDonations,
      recentUsers,
    ] = await Promise.all([
      prisma.user.count(),

      prisma.user.count({
        where: {
          role: "VOLUNTEER",
        },
      }),

      prisma.volunteerApplication.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.donation.count(),

      prisma.donation.count({
        where: {
          status: "SUCCESS",
        },
      }),

      prisma.campaign.count(),

      prisma.campaign.count({
        where: {
          status: "ACTIVE",
        },
      }),

      prisma.volunteerEvent.count(),

      prisma.volunteerEvent.count({
        where: {
          status: "UPCOMING",
        },
      }),

      prisma.community.count(),

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
        totalDonationAmount: donationTotals._sum.amount || 0,
      },

      recentApplications,
      recentDonations,
      recentUsers,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return res.status(500).json({
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

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
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

    const allowedStatuses = ["ACTIVE", "INACTIVE", "SUSPENDED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
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
        message: "User not found.",
      });
    }

    if (user.id === req.user.userId && status !== "ACTIVE") {
      return res.status(400).json({
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

    res.json({
      success: true,
      message: "User status updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update user status error:", error);

    res.status(500).json({
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
            bio: true,
            skills: true,
            interests: true,
            city: true,
            state: true,
            country: true,
            availability: true,
            totalHours: true,
            totalEvents: true,
            isVerified: true,
          },
        },
      },
    });

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Get volunteer applications error:", error);

    res.status(500).json({
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
    const { adminRemarks = "" } = req.body;

    const application = await prisma.volunteerApplication.findUnique({
      where: {
        id: applicationId,
      },

      include: {
        user: true,
        volunteerProfile: true,
      },
    });

    if (!application) {
      return res.status(404).json({
        message: "Volunteer application not found.",
      });
    }

    if (application.status !== "PENDING") {
      return res.status(400).json({
        message: `Application is already ${application.status}.`,
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: {
          id: application.userId,
        },

        data: {
          role: "VOLUNTEER",
        },
      });

      let volunteerProfile;

      if (application.volunteerProfileId) {
        volunteerProfile = await tx.volunteerProfile.update({
          where: {
            id: application.volunteerProfileId,
          },

          data: {
            isVerified: true,
            skills: application.skills || application.volunteerProfile?.skills,

            availability:
              application.availability ||
              application.volunteerProfile?.availability,
          },
        });
      } else {
        volunteerProfile = await tx.volunteerProfile.create({
          data: {
            userId: application.userId,

            skills: application.skills || null,

            availability: application.availability || null,

            bio: application.experience || null,

            city: null,
            state: null,
            country: null,

            isVerified: true,
          },
        });
      }

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

      await tx.notification.create({
        data: {
          userId: application.userId,
          title: "Volunteer Application Approved",
          message:
            "Congratulations! Your volunteer application has been approved.",
          type: "VOLUNTEER_APPLICATION",
        },
      });

      return {
        user,
        volunteerProfile,
        application: updatedApplication,
      };
    });

    await createAuditLog({
      userId: req.user.userId,
      action: "APPROVE_VOLUNTEER_APPLICATION",
      entity: "VolunteerApplication",
      entityId: applicationId,
      details: `Approved volunteer application for ${application.user.email}`,
      ipAddress: req.ip,
    });

    res.json({
      success: true,
      message: "Volunteer application approved successfully.",
      ...result,
    });
  } catch (error) {
    console.error("Approve volunteer error:", error);

    res.status(500).json({
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

    const { adminRemarks } = req.body;

    if (!adminRemarks || !adminRemarks.trim()) {
      return res.status(400).json({
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
        message: "Volunteer application not found.",
      });
    }

    if (application.status !== "PENDING") {
      return res.status(400).json({
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

    res.json({
      success: true,
      message: "Volunteer application rejected.",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Reject volunteer error:", error);

    res.status(500).json({
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

    res.json({
      success: true,
      donations,
    });
  } catch (error) {
    console.error("Get donations error:", error);

    res.status(500).json({
      message: "Failed to load donations.",
    });
  }
};

/* =====================================================
   CAMPAIGNS
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

    res.json({
      success: true,
      campaigns,
    });
  } catch (error) {
    console.error("Get campaigns error:", error);

    res.status(500).json({
      message: "Failed to load campaigns.",
    });
  }
};

/* =====================================================
   EVENTS
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

    res.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Get events error:", error);

    res.status(500).json({
      message: "Failed to load events.",
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

    res.json({
      success: true,
      communities,
    });
  } catch (error) {
    console.error("Get communities error:", error);

    res.status(500).json({
      message: "Failed to load communities.",
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

    res.json({
      success: true,
      logs,
    });
  } catch (error) {
    console.error("Get audit logs error:", error);

    res.status(500).json({
      message: "Failed to load audit logs.",
    });
  }
};
