import prisma from "../config/prisma.js";

// =====================================================
// GET VOLUNTEER PROFILE
// =====================================================

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
            avatar: true,
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

        // User information
        fullName: volunteerProfile.user.name,
        email: volunteerProfile.user.email,
        phone: volunteerProfile.user.phone,
        avatar: volunteerProfile.user.avatar,

        // Volunteer information
        age: volunteerProfile.age,
        city: volunteerProfile.city,
        skills: volunteerProfile.skills,

        // Existing volunteer information
        totalHours: volunteerProfile.totalHours,
        totalEvents: volunteerProfile.totalEvents,
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


// =====================================================
// UPDATE VOLUNTEER PROFILE
// =====================================================

export const updateVolunteerProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const {
      fullName,
      phone,
      age,
      city,
      skills,
      avatar,
    } = req.body || {};

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!fullName || !phone || !age || !city || !skills) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, age, city and skills are required",
      });
    }

    // ==========================================
    // VALIDATE AGE
    // ==========================================

    const numericAge = Number(age);

    if (
      !Number.isInteger(numericAge) ||
      numericAge < 1 ||
      numericAge > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid age",
      });
    }

    // ==========================================
    // CHECK USER
    // ==========================================

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

    // ==========================================
    // UPDATE VOLUNTEER PROFILE
    // ==========================================

    const volunteerProfile =
      await prisma.volunteerProfile.update({
        where: {
          userId: userId,
        },

        data: {
          age: numericAge,
          city: city.trim(),
          skills: skills.trim(),
        },
      });

    // ==========================================
    // UPDATE USER
    // ==========================================

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        name: fullName.trim(),
        phone: phone.trim(),

        // Update avatar only when provided
        ...(avatar
          ? {
              avatar: avatar,
            }
          : {}),
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
      },
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(200).json({
      success: true,

      message: "Volunteer profile updated successfully",

      profile: {
        id: volunteerProfile.id,
        userId: volunteerProfile.userId,

        fullName: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,

        age: volunteerProfile.age,
        city: volunteerProfile.city,
        skills: volunteerProfile.skills,

        totalHours: volunteerProfile.totalHours,
        totalEvents: volunteerProfile.totalEvents,

        isVerified: volunteerProfile.isVerified,

        createdAt: volunteerProfile.createdAt,
        updatedAt: volunteerProfile.updatedAt,
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