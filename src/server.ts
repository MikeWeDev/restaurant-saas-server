import http from "node:http";

import app from "./app.js";
import prisma from "./config/database.js";

import { initializeSocket } from "./config/socket.js";

const PORT = process.env.PORT
  ? Number(process.env.PORT)
  : 5000;

const httpServer = http.createServer(app);

const io = initializeSocket(httpServer);

async function startServer() {
  try {
    await prisma.$connect();

    console.log("Database connected");

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(
      "Database connection failed",
      error
    );
  }
}

startServer();