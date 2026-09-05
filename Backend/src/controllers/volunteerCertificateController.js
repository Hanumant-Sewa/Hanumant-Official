import prisma from "../config/prisma.js";

// Get certificates of the logged-in volunteer
export const getVolunteerCertificates = async (req, res) => {
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

    // Get certificates
    const certificates = await prisma.certificate.findMany({
      where: {
        OR: [
          {
            userId: userId,
          },
          {
            volunteerProfileId: volunteerProfile.id,
          },
        ],
      },
      orderBy: {
        issueDate: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      certificates,
    });
  } catch (error) {
    console.error("Get Volunteer Certificates Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch volunteer certificates",
      error: error.message,
    });
  }
};