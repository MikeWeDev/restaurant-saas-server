import prisma from "./config/database.js";

async function startServer() {
  try {
    await prisma.$connect();

    console.log("Database connected");

    // start express server here

  } catch (error) {
    console.error("Database connection failed", error);
  }
}

startServer();