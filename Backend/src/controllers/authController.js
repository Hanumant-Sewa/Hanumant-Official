import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// =====================================================
// REGISTER
// =====================================================

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "Name, email, phone and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // =================================================
    // CHECK EXISTING USER
    // =================================================

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    // =================================================
    // HASH PASSWORD
    // =================================================

    const hashedPassword = await bcrypt.hash(password, 12);

    // =================================================
    // CREATE USER
    // IMPORTANT:
    // Public registration can NEVER create ADMIN
    // or VOLUNTEER accounts.
    // =================================================

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        password: hashedPassword,

        // Always USER for public registration
        role: "USER",

        // Explicitly active
        status: "ACTIVE",
      },
    });

    // =================================================
    // RESPONSE
    // Never return password
    // =================================================

    return res.status(201).json({
      message: "Registration successful",

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
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
    const { email, password, loginType = "user", adminKey = "" } = req.body;

    // =================================================
    // VALIDATION
    // =================================================

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // =================================================
    // NORMALIZE EMAIL
    // =================================================

    const normalizedEmail = email.trim().toLowerCase();

    // =================================================
    // FIND USER
    // =================================================

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // =================================================
    // CHECK ACCOUNT STATUS
    // =================================================

    if (user.status === "SUSPENDED") {
      return res.status(403).json({
        message:
          "Your account has been suspended. Please contact the administrator.",
      });
    }

    if (user.status === "INACTIVE") {
      return res.status(403).json({
        message: "Your account is inactive. Please contact the administrator.",
      });
    }

    // =================================================
    // CHECK PASSWORD
    // =================================================

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // =================================================
    // ADMIN LOGIN SECURITY
    // =================================================
    //
    // Admin login requires THREE things:
    //
    // 1. Correct email
    // 2. Correct password
    // 3. Correct ADMIN_SECURITY_KEY
    //
    // AND the database account itself must have
    // role = ADMIN.
    //
    // The frontend loginType is NOT trusted by itself.
    // =================================================

    if (loginType === "admin") {
      // -------------------------------------------------
      // CHECK DATABASE ROLE
      // -------------------------------------------------

      if (user.role !== "ADMIN") {
        return res.status(403).json({
          message: "This account does not have administrator privileges.",
        });
      }

      // -------------------------------------------------
      // CHECK ADMIN SECURITY KEY
      // -------------------------------------------------

      if (!process.env.ADMIN_SECURITY_KEY) {
        console.error(
          "ADMIN_SECURITY_KEY is not configured in the backend .env file.",
        );

        return res.status(500).json({
          message: "Admin login is not configured correctly on the server.",
        });
      }

      if (!adminKey || adminKey !== process.env.ADMIN_SECURITY_KEY) {
        return res.status(401).json({
          message: "Invalid admin security key.",
        });
      }
    }

    // =================================================
    // PREVENT ADMIN FROM USING NORMAL USER LOGIN
    // =================================================
    //
    // This prevents an ADMIN account from accidentally
    // entering the normal user flow.
    //
    // If you want admins to also be able to use the
    // normal user dashboard later, this block can be
    // removed.
    // =================================================

    if (loginType === "user" && user.role === "ADMIN") {
      return res.status(403).json({
        message: "Administrator accounts must use the admin login.",
      });
    }

    // =================================================
    // CREATE JWT
    // =================================================

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured in the backend .env file.");

      return res.status(500).json({
        message: "Authentication is not configured correctly.",
      });
    }

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

      // HTTPS required in production
      secure: process.env.NODE_ENV === "production",

      // Works with your current frontend/backend setup
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",

      maxAge: 7 * 24 * 60 * 60 * 1000,

      path: "/",
    });

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      message:
        loginType === "admin" ? "Admin login successful" : "Login successful",

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        avatar: user.avatar,
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
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
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
    // =================================================
    // CHECK AUTHENTICATED USER
    // =================================================

    if (!req.user?.userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // =================================================
    // GET USER
    // =================================================

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

    // =================================================
    // USER NOT FOUND
    // =================================================

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // =================================================
    // CHECK ACCOUNT STATUS AGAIN
    // =================================================
    //
    // This is important because an admin could suspend
    // a user while that user's JWT is still technically
    // valid.
    // =================================================

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        message: "Your account is not active.",
      });
    }

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Profile Error:", error);

    return res.status(500).json({
      message: "Server error while loading profile",
    });
  }
};

// =====================================================
// DASHBOARD
// =====================================================

export const getDashboard = async (req, res) => {
  try {
    // =================================================
    // AUTHENTICATED USER ID
    // =================================================

    if (!req.user?.userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

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
    // ACCOUNT STATUS
    // =================================================

    if (user.status !== "ACTIVE") {
      return res.status(403).json({
        message: "Your account is not active.",
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
