import prisma from "../config/prisma.js";

// GET all upcoming volunteer events
export const getVolunteerEvents = async (req, res) => {
  try {
    const events = await prisma.volunteerEvent.findMany({
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
    });

    return res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Get Volunteer Events Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get volunteer events",
      error: error.message,
    });
  }
};


// GET single event
export const getVolunteerEventById = async (req, res) => {
  try {
    const eventId = Number(req.params.id);

    if (isNaN(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    const event = await prisma.volunteerEvent.findUnique({
      where: {
        id: eventId,
      },
      include: {
        registrations: {
          select: {
            id: true,
            status: true,
            registeredAt: true,
            userId: true,
          },
        },
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.status(200).json({
      success: true,
      event,
    });
  } catch (error) {
    console.error("Get Volunteer Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get volunteer event",
      error: error.message,
    });
  }
};


// JOIN EVENT
export const joinVolunteerEvent = async (req, res) => {
  try {
    const userId = req.user.userId;
    const eventId = Number(req.params.id);

    if (isNaN(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    // Check volunteer profile
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

    // Check event
    const event = await prisma.volunteerEvent.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Check if already registered
    const existingRegistration =
      await prisma.eventRegistration.findUnique({
        where: {
          eventId_userId: {
            eventId: eventId,
            userId: userId,
          },
        },
      });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: "You have already joined this event",
      });
    }

    // Check capacity
    if (event.capacity) {
      const registrationCount =
        await prisma.eventRegistration.count({
          where: {
            eventId: eventId,
            status: "REGISTERED",
          },
        });

      if (registrationCount >= event.capacity) {
        return res.status(400).json({
          success: false,
          message: "This event is already full",
        });
      }
    }

    // Create registration
    const registration =
      await prisma.eventRegistration.create({
        data: {
          eventId: eventId,
          userId: userId,
          volunteerProfileId: volunteerProfile.id,
          status: "REGISTERED",
        },
      });

    return res.status(201).json({
      success: true,
      message: "Successfully joined the event",
      registration,
    });
  } catch (error) {
    console.error("Join Volunteer Event Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to join event",
      error: error.message,
    });
  }
};