import prisma from "../config/prisma.js";

/*
=====================================================
GET MY CERTIFICATES
GET /api/certificates
=====================================================
*/

export const getMyCertificates = async (req, res) => {
  try {
    const userId = req.user.userId;

    const certificates = await prisma.certificate.findMany({
      where: {
        userId: userId,
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
      orderBy: {
        issueDate: "desc",
      },
    });

    const formattedCertificates = certificates.map((certificate) => {
      let certificateType = "Volunteer Appreciation";

      if (certificate.type === "EVENT") {
        certificateType = "Community Service Recognition";
      }

      if (certificate.type === "SPECIAL_RECOGNITION") {
        certificateType = "Special Recognition";
      }

      return {
        id: certificate.id,
        certificateNumber: certificate.certificateNumber,
        certificateType: certificateType,
        issueDate: certificate.issueDate,
        volunteerName: certificate.user.name,
        title: certificate.title,
        description: certificate.description,
        type: certificate.type,
        fileUrl: certificate.fileUrl,
        eventId: certificate.eventId,
      };
    });

    return res.status(200).json({
      success: true,
      count: formattedCertificates.length,
      certificates: formattedCertificates,
    });
  } catch (error) {
    console.error("Get My Certificates Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificates",
    });
  }
};


/*
=====================================================
GET SINGLE CERTIFICATE
GET /api/certificates/:id
=====================================================
*/

export const getCertificateById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const certificateId = Number(req.params.id);

    if (!Number.isInteger(certificateId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid certificate ID",
      });
    }

    const certificate = await prisma.certificate.findFirst({
      where: {
        id: certificateId,
        userId: userId,
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

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    let certificateType = "Volunteer Appreciation";

    if (certificate.type === "EVENT") {
      certificateType = "Community Service Recognition";
    }

    if (certificate.type === "SPECIAL_RECOGNITION") {
      certificateType = "Special Recognition";
    }

    return res.status(200).json({
      success: true,
      certificate: {
        id: certificate.id,
        certificateNumber: certificate.certificateNumber,
        certificateType: certificateType,
        issueDate: certificate.issueDate,
        volunteerName: certificate.user.name,
        title: certificate.title,
        description: certificate.description,
        type: certificate.type,
        fileUrl: certificate.fileUrl,
        eventId: certificate.eventId,
      },
    });
  } catch (error) {
    console.error("Get Certificate Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificate",
    });
  }
};


/*
=====================================================
CREATE CERTIFICATE
POST /api/certificates
=====================================================
*/

export const createCertificate = async (req, res) => {
  try {
    const {
      userId,
      volunteerProfileId,
      title,
      description,
      type,
      eventId,
    } = req.body;

    /*
    -----------------------------------------------
    VALIDATION
    -----------------------------------------------
    */

    if (!userId || !title || !type) {
      return res.status(400).json({
        success: false,
        message: "userId, title and type are required",
      });
    }

    const numericUserId = Number(userId);

    if (!Number.isInteger(numericUserId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    /*
    -----------------------------------------------
    CHECK USER
    -----------------------------------------------
    */

    const user = await prisma.user.findUnique({
      where: {
        id: numericUserId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /*
    -----------------------------------------------
    CHECK VOLUNTEER PROFILE
    -----------------------------------------------
    */

    let profileId = null;

    if (volunteerProfileId) {
      profileId = Number(volunteerProfileId);

      if (!Number.isInteger(profileId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid volunteerProfileId",
        });
      }

      const volunteerProfile =
        await prisma.volunteerProfile.findUnique({
          where: {
            id: profileId,
          },
        });

      if (!volunteerProfile) {
        return res.status(404).json({
          success: false,
          message: "Volunteer profile not found",
        });
      }
    }

    /*
    -----------------------------------------------
    CHECK CERTIFICATE TYPE
    -----------------------------------------------
    */

    const validTypes = [
      "VOLUNTEER",
      "EVENT",
      "SPECIAL_RECOGNITION",
    ];

    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid certificate type. Use VOLUNTEER, EVENT or SPECIAL_RECOGNITION",
      });
    }

    /*
    -----------------------------------------------
    CHECK EXISTING VOLUNTEER CERTIFICATE
    -----------------------------------------------
    */

    if (type === "VOLUNTEER") {
      const existingCertificate =
        await prisma.certificate.findFirst({
          where: {
            userId: numericUserId,
            type: "VOLUNTEER",
          },
        });

      if (existingCertificate) {
        return res.status(409).json({
          success: false,
          message: "Volunteer certificate already exists",
          certificate: existingCertificate,
        });
      }
    }

    /*
    -----------------------------------------------
    GENERATE CERTIFICATE NUMBER
    -----------------------------------------------
    */

    const certificateCount =
      await prisma.certificate.count({
        where: {
          type: type,
        },
      });

    let prefix = "HSF-VA";

    if (type === "EVENT") {
      prefix = "HSF-CS";
    }

    if (type === "SPECIAL_RECOGNITION") {
      prefix = "HSF-SR";
    }

    const year = new Date().getFullYear();

    const certificateNumber =
      `${prefix}-${year}-${String(
        certificateCount + 1
      ).padStart(3, "0")}`;

    /*
    -----------------------------------------------
    CREATE CERTIFICATE
    -----------------------------------------------
    */

    const certificate =
      await prisma.certificate.create({
        data: {
          userId: numericUserId,
          volunteerProfileId: profileId,
          title: title.trim(),
          description: description
            ? description.trim()
            : null,
          type: type,
          certificateNumber: certificateNumber,
          eventId: eventId
            ? Number(eventId)
            : null,
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

    /*
    -----------------------------------------------
    RESPONSE
    -----------------------------------------------
    */

    return res.status(201).json({
      success: true,
      message: "Certificate created successfully",
      certificate: {
        id: certificate.id,
        certificateNumber:
          certificate.certificateNumber,
        certificateType:
          certificate.type === "VOLUNTEER"
            ? "Volunteer Appreciation"
            : certificate.type === "EVENT"
              ? "Community Service Recognition"
              : "Special Recognition",
        issueDate: certificate.issueDate,
        volunteerName: certificate.user.name,
        title: certificate.title,
        description: certificate.description,
        type: certificate.type,
        fileUrl: certificate.fileUrl,
        eventId: certificate.eventId,
      },
    });
  } catch (error) {
    console.error("Create Certificate Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create certificate",
    });
  }
};