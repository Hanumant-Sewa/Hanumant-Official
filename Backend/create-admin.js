import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "./src/config/prisma.js";

const createAdmin = async () => {
  try {
    const name = process.env.ADMIN_NAME || "System Administrator";
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD must be configured before seeding an admin.",
      );
    }

    if (password.length < 16) {
      throw new Error("ADMIN_PASSWORD must be at least 16 characters long.");
    }

    const existingAdmin = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      console.log("An account with this email already exists.");

      if (existingAdmin.role === "ADMIN") {
        console.log("This account is already an ADMIN.");
      } else {
        console.log("Changing existing account role to ADMIN...");

        await prisma.user.update({
          where: {
            id: existingAdmin.id,
          },
          data: {
            role: "ADMIN",
            status: "ACTIVE",
          },
        });

        console.log("Existing account is now ADMIN.");
      }

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
        status: "ACTIVE",
      },
    });

    console.log("=================================");
    console.log("ADMIN CREATED SUCCESSFULLY");
    console.log("=================================");
    console.log(`ID: ${admin.id}`);
    console.log(`Email: ${admin.email}`);
    console.log("Role: ADMIN");
    console.log("=================================");
  } catch (error) {
    console.error("Failed to create admin:", error);
  } finally {
    await prisma.$disconnect();
  }
};

createAdmin();
