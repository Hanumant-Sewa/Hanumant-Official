import prisma from "./src/config/prisma.js";

async function testDatabase() {
  try {
    const count = await prisma.user.count();

    console.log("Database connection successful!");
    console.log("Users in database:", count);
  } catch (error) {
    console.error("Database connection failed!");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
