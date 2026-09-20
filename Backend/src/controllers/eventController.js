import prisma from "../config/prisma.js";

/**
 * Get the nearest upcoming event
 * GET /api/events/upcoming
 *
 * Public endpoint - no login required
 */
export const getUpcomingEvent = async (req, res) => {
  try {
    const now = new Date();

    const event = await prisma.volunteerEvent.findFirst({
      where: {
        startDate: {
          gt: now,
        },

        // Don't display cancelled events
        status: {
          not: "CANCELLED",
        },
      },

      // Nearest upcoming event first
      orderBy: {
        startDate: "asc",
      },

      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        location: true,
        city: true,
        state: true,
        startDate: true,
        endDate: true,
        capacity: true,
        status: true,
      },
    });

    if (!event) {
      return res.status(200).json({
        event: null,
        message: "No upcoming events found",
      });
    }

    return res.status(200).json({
      event,
    });
  } catch (error) {
    console.error("Get upcoming event error:", error);

    return res.status(500).json({
      message: "Failed to fetch upcoming event",
    });
  }
};
