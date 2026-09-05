import prisma from "../config/prisma.js";

export const getVolunteerImpact = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find volunteer profile
    const volunteerProfile = await prisma.volunteerProfile.findUnique({
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

    // Get all impact records
    const impactRecords = await prisma.volunteerImpact.findMany({
      where: {
        volunteerProfileId: volunteerProfile.id,
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            startDate: true,
            location: true,
          },
        },
      },
      orderBy: {
        recordedAt: "desc",
      },
    });

    // Calculate total impact
    const summary = await prisma.volunteerImpact.aggregate({
      where: {
        volunteerProfileId: volunteerProfile.id,
      },
      _sum: {
        hours: true,
        mealsServed: true,
        peopleHelped: true,
        familiesSupported: true,
      },
    });

    return res.status(200).json({
      success: true,

      summary: {
        totalHours: summary._sum.hours || 0,
        totalMealsServed: summary._sum.mealsServed || 0,
        totalPeopleHelped: summary._sum.peopleHelped || 0,
        totalFamiliesSupported:
          summary._sum.familiesSupported || 0,
      },

      activities: impactRecords,
    });
  } catch (error) {
    console.error("Get Volunteer Impact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch volunteer impact",
      error: error.message,
    });
  }
};