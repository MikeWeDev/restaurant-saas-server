import bcrypt from "bcrypt";
import prisma from "../../config/database.js";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  // Check if user already exists
  const existingUser = await prisma.User.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.User.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}