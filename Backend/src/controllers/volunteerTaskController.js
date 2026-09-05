import prisma from "../config/prisma.js";

// Get tasks assigned to the logged-in volunteer
export const getVolunteerTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

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

    const tasks = await prisma.volunteerTask.findMany({
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
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Get Volunteer Tasks Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch volunteer tasks",
      error: error.message,
    });
  }
};


// Update task status
export const updateVolunteerTaskStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = Number(req.params.id);

    // Get status from request body
    let { status } = req.body;

    // Debug information
    console.log("REQUEST BODY:", req.body);
    console.log("STATUS RECEIVED:", status);

    // Check task ID
    if (isNaN(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    // Check whether status was provided
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    // Convert status to uppercase
    status = status.toString().trim().toUpperCase();

    // Allow only these statuses
    const allowedStatuses = [
      "TODO",
      "IN_PROGRESS",
      "COMPLETED",
      "CANCELLED",
    ];

    // Check status
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task status",
        allowedStatuses: allowedStatuses,
      });
    }

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

    // Check whether task belongs to this volunteer
    const task = await prisma.volunteerTask.findFirst({
      where: {
        id: taskId,
        volunteerProfileId: volunteerProfile.id,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Update task
    const updatedTask = await prisma.volunteerTask.update({
      where: {
        id: taskId,
      },
      data: {
        status: status,
        completedAt:
          status === "COMPLETED" ? new Date() : null,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    console.error("Update Volunteer Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update task status",
      error: error.message,
    });
  }
};