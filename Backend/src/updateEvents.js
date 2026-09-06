import prisma from "./src/config/prisma.js";

const updateEvents = async () => {
  try {
    await prisma.volunteerEvent.update({
      where: { id: 1 },
      data: {
        startDate: new Date("2026-09-15T09:00:00"),
        endDate: new Date("2026-09-15T13:00:00"),
        status: "UPCOMING",
      },
    });

    await prisma.volunteerEvent.update({
      where: { id: 2 },
      data: {
        startDate: new Date("2026-09-20T10:00:00"),
        endDate: new Date("2026-09-20T14:00:00"),
        status: "UPCOMING",
      },
    });

    console.log("Events updated successfully!");
  } catch (error) {
    console.error("Error updating events:", error);
  } finally {
    await prisma.$disconnect();
  }
};

updateEvents();