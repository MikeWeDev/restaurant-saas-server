// 1. Imports
import http from "node:http";
import { initializeSocket } from "./config/socket.js";

import app from "./app.js";
import prisma from "./config/database.js";

// 2. Configuration
const PORT = process.env.PORT
  ? Number(process.env.PORT)
  : 5000;

// 3. Create HTTP server
const httpServer = http.createServer(app);

// 4. Attach Socket.IO
const io = initializeSocket(httpServer);

// 5. Socket connection handling
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// 6. Start application
async function startServer() {
  try {
    await prisma.$connect();

    console.log("Database connected");

    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed", error);
  }
}

startServer();