import prisma from "../config/prisma.js";

export const getVolunteerDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    // =========================================
    // FIND USER
    // =========================================

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        phone: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =========================================
    // FIND VOLUNTEER PROFILE
    // =========================================

    const volunteerProfile =
      await prisma.volunteerProfile.findUnique({
        where: {
          userId: userId,
        },
      });

    if (!volunteerProfile) {
      return res.status(404).json({
        success: false,
        message: "Volunteer profile not found",
      });
    }

    // =========================================
    // FIND APPLICATION
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
        },
      });

    // =========================================
    // UPCOMING EVENTS
    // =========================================
    // Get ALL upcoming events from VolunteerEvent
    // table, not only events joined by this user.

    const upcomingEvents =
      await prisma.volunteerEvent.findMany({
        where: {
          startDate: {
            gte: new Date(),
          },
          status: {
            in: ["UPCOMING", "ONGOING"],
          },
        },
        orderBy: {
          startDate: "asc",
        },
        take: 5,
      });

    // =========================================
    // VOLUNTEER TASKS
    // =========================================

    const tasks = await prisma.volunteerTask.findMany({
      where: {
        volunteerProfileId: volunteerProfile.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    // =========================================
    // IMPACT
    // =========================================

    const impactSummary =
      await prisma.volunteerImpact.aggregate({
        where: {
          volunteerProfileId: volunteerProfile.id,
        },
        _sum: {
          mealsServed: true,
          peopleHelped: true,
        },
      });

    // =========================================
    // COMPLETED TASKS
    // =========================================

    const completedTasks =
      await prisma.volunteerTask.count({
        where: {
          volunteerProfileId: volunteerProfile.id,
          status: "COMPLETED",
        },
      });

    // =========================================
    // CERTIFICATES
    // =========================================

    const certificates =
      await prisma.certificate.count({
        where: {
          userId: userId,
        },
      });

    // =========================================
    // RESPONSE
    // =========================================

    return res.status(200).json({
      success: true,

      // =======================================
      // USER
      // =======================================

      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },

      // =======================================
      // VOLUNTEER PROFILE
      // =======================================

      volunteerProfile: {
        city: volunteerProfile.city,
        state: volunteerProfile.state,
        country: volunteerProfile.country,
        ageGroup: volunteerProfile.ageGroup,
        skills: volunteerProfile.skills,
        interests: volunteerProfile.interests,
        availability: volunteerProfile.availability,
        totalHours: volunteerProfile.totalHours,
        totalEvents: volunteerProfile.totalEvents,
        isVerified: volunteerProfile.isVerified,
        joinedAt: volunteerProfile.joinedAt,
      },

      // =======================================
      // APPLICATION
      // =======================================

      application: application || {},

      // =======================================
      // STATISTICS
      // =======================================

      statistics: {
        // Number of events the volunteer has joined
        totalEvents: volunteerProfile.totalEvents || 0,

        // Number of completed tasks
        completedTasks: completedTasks || 0,

        // Total volunteer hours
        totalHours: volunteerProfile.totalHours || 0,

        // Number of people helped
        peopleSupported:
          impactSummary._sum.peopleHelped || 0,

        // Meals served
        mealsServed:
          impactSummary._sum.mealsServed || 0,

        // Certificates
        certificates: certificates || 0,
      },

      // =======================================
      // UPCOMING EVENTS
      // =======================================

      upcomingEvents: upcomingEvents,

      // =======================================
      // TASKS
      // =======================================

      tasks: tasks,
    });
  } catch (error) {
    console.error(
      "Volunteer Dashboard Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get volunteer dashboard",
      error: error.message,
    });
  }
};