import prisma from "../config/prisma.js";

export const getVolunteerDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find volunteer profile
    const volunteerProfile = await prisma.volunteerProfile.findUnique({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!volunteerProfile) {
      return res.status(404).json({
        success: false,
        message: "Volunteer profile not found",
      });
    }

    // Get upcoming events
    const upcomingEvents = await prisma.volunteerEvent.findMany({
      where: {
        startDate: {
          gte: new Date(),
        },
      },
      orderBy: {
        startDate: "asc",
      },
      take: 5,
    });

    // Get volunteer tasks
    const tasks = await prisma.volunteerTask.findMany({
      where: {
        volunteerProfileId: volunteerProfile.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    // Get recent impact
    const recentImpact = await prisma.volunteerImpact.findMany({
      where: {
        volunteerProfileId: volunteerProfile.id,
      },
      orderBy: {
        recordedAt: "desc",
      },
      take: 5,
    });

    // Calculate total meals served and people helped
    const impactSummary = await prisma.volunteerImpact.aggregate({
      where: {
        volunteerProfileId: volunteerProfile.id,
      },
      _sum: {
        mealsServed: true,
        peopleHelped: true,
      },
    });

    return res.status(200).json({
      success: true,

      dashboard: {
        profile: {
          name: volunteerProfile.user.name,
          email: volunteerProfile.user.email,
          phone: volunteerProfile.user.phone,
          city: volunteerProfile.city,
          ageGroup: volunteerProfile.ageGroup,
          skills: volunteerProfile.skills,
          availability: volunteerProfile.availability,
          isVerified: volunteerProfile.isVerified,
        },

        stats: {
          totalHours: volunteerProfile.totalHours,
          totalEvents: volunteerProfile.totalEvents,

          totalMealsServed:
            impactSummary._sum.mealsServed || 0,

          totalPeopleHelped:
            impactSummary._sum.peopleHelped || 0,
        },

        upcomingEvents: upcomingEvents,

        tasks: tasks,

        recentImpact: recentImpact,
      },
    });
  } catch (error) {
    console.error("Volunteer Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get volunteer dashboard",
      error: error.message,
    });
  }
};