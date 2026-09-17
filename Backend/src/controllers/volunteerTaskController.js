import prisma from "../config/prisma.js";

// ==========================================
// GET MY + AVAILABLE TASKS
// ==========================================
export const getMyTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const tasks = await prisma.volunteerTask.findMany({
      where: {
        OR: [
          // Tasks created by Admin and not assigned yet
          {
            assignedToId: null,
          },

          // Tasks assigned to logged-in volunteer
          {
            assignedToId: userId,
          },
        ],
      },

      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            city: true,
            state: true,
            startDate: true,
            endDate: true,
          },
        },

        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        volunteerProfile: {
          select: {
            id: true,
            userId: true,
            age: true,
            city: true,
            skills: true,
          },
        },
      },

      orderBy: [
        {
          dueDate: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("Get My Tasks Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
};

// ==========================================
// START / CLAIM TASK
// ==========================================
export const startTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    // Task can be:
    // 1. Unassigned
    // 2. Already assigned to this volunteer
    const task = await prisma.volunteerTask.findFirst({
      where: {
        id: taskId,
        OR: [
          {
            assignedToId: null,
          },
          {
            assignedToId: userId,
          },
        ],
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message:
          "Task not found or already assigned to another volunteer",
      });
    }

    // Find volunteer profile
    const volunteerProfile =
      await prisma.volunteerProfile.findUnique({
        where: {
          userId: userId,
        },
        select: {
          id: true,
        },
      });

    // Assign task to volunteer and start it
    const updatedTask = await prisma.volunteerTask.update({
      where: {
        id: taskId,
      },

      data: {
        assignedToId: userId,

        volunteerProfileId:
          volunteerProfile?.id || null,

        status: "IN_PROGRESS",
      },

      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            city: true,
            state: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Task started successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Start Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to start task",
    });
  }
};

// ==========================================
// COMPLETE TASK
// ==========================================
export const completeTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    // Only assigned volunteer can complete the task
    const task = await prisma.volunteerTask.findFirst({
      where: {
        id: taskId,
        assignedToId: userId,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found or not assigned to you",
      });
    }

    const updatedTask = await prisma.volunteerTask.update({
      where: {
        id: taskId,
      },

      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },

      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            city: true,
            state: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Task completed successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Complete Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to complete task",
    });
  }
};