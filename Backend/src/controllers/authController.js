import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =====================================================
// REGISTER
// =====================================================

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "Name, email, phone and password are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Registration successful",

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      message: "Server error during registration",
    });
  }
};

// =====================================================
// LOGIN
// =====================================================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // =================================================
    // CREATE JWT
    // =================================================

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    // =================================================
    // HTTP-ONLY COOKIE
    // =================================================

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      message: "Login successful",

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Server error during login",
    });
  }
};

// =====================================================
// LOGOUT
// =====================================================

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      message: "Server error during logout",
    });
  }
};

// =====================================================
// GET PROFILE
// =====================================================

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Profile Error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// =====================================================
// DASHBOARD
// =====================================================

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    // =================================================
    // GET USER + RELATION COUNTS
    // =================================================

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,

        _count: {
          select: {
            donations: true,
            volunteerApplications: true,
            communityMemberships: true,
            eventRegistrations: true,
            assignedTasks: true,
            certificates: true,
            notifications: true,
          },
        },
      },
    });

    // =================================================
    // USER NOT FOUND
    // =================================================

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // =================================================
    // DASHBOARD RESPONSE
    // =================================================

    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },

      stats: {
        donations: user._count.donations,
        volunteerApplications: user._count.volunteerApplications,
        communities: user._count.communityMemberships,
        events: user._count.eventRegistrations,
        tasks: user._count.assignedTasks,
        certificates: user._count.certificates,
        notifications: user._count.notifications,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      message: "Unable to load dashboard",
    });
  }
};
