import prisma from "../config/prisma.js";

// GET Volunteer Profile
export const getVolunteerProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const volunteerProfile = await prisma.volunteerProfile.findUnique({
      where: {
        userId: userId,
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
    });

    if (!volunteerProfile) {
      return res.status(404).json({
        success: false,
        message: "Volunteer profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      profile: {
        id: volunteerProfile.id,
        userId: volunteerProfile.userId,

        fullName: volunteerProfile.user.name,
        email: volunteerProfile.user.email,
        phone: volunteerProfile.user.phone,

        city: volunteerProfile.city,
        ageGroup: volunteerProfile.ageGroup,
        skills: volunteerProfile.skills,
        availability: volunteerProfile.availability,

        totalHours: volunteerProfile.totalHours,
        totalEvents: volunteerProfile.totalEvents,
        totalMealsServed: volunteerProfile.totalMealsServed,
        totalPeopleHelped: volunteerProfile.totalPeopleHelped,

        isVerified: volunteerProfile.isVerified,

        createdAt: volunteerProfile.createdAt,
        updatedAt: volunteerProfile.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get Volunteer Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get volunteer profile",
      error: error.message,
    });
  }
};


// UPDATE Volunteer Profile
export const updateVolunteerProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      fullName,
      phone,
      city,
      ageGroup,
      skills,
      availability,
    } = req.body || {};

    if (
      !fullName ||
      !phone ||
      !city ||
      !ageGroup ||
      !skills ||
      !availability
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
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
        message: "User not found",
      });
    }

    const volunteerProfile = await prisma.volunteerProfile.update({
      where: {
        userId: userId,
      },
      data: {
        city,
        ageGroup,
        skills,
        availability,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: fullName,
        phone,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Volunteer profile updated successfully",
      profile: {
        id: volunteerProfile.id,
        fullName,
        email: user.email,
        phone,
        city,
        ageGroup,
        skills,
        availability,
      },
    });
  } catch (error) {
    console.error("Update Volunteer Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update volunteer profile",
      error: error.message,
    });
  }
};