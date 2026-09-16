import { Server } from "socket.io";
import { Server as HttpServer } from "node:http";

import prisma from "./database.js";

let io: Server;

export function initializeSocket(httpServer: HttpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on("joinOrder", async (orderId: string) => {
      try {
        const order = await prisma.order.findUnique({
          where: {
            id: orderId
          }
        });

        if (!order) {
          socket.emit("orderError", {
            message: "Order not found"
          });

          return;
        }

        socket.join(`order:${orderId}`);

        console.log(
          `Socket ${socket.id} joined order:${orderId}`
        );
      } catch (error) {
        console.error(
          "Failed to join order room:",
          error
        );

        socket.emit("orderError", {
          message: "Something went wrong"
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(
        `Socket disconnected: ${socket.id}`
      );
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized"
    );
  }

  return io;
}