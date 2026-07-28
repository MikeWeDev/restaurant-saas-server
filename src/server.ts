import app from "./app.js";
import prisma from "./config/database.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

async function startServer() {
  try {
    await prisma.$connect();

    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Database connection failed", error);
  }
}

startServer();