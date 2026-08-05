import bcrypt from "bcrypt";
import prisma from "../../config/database.js";
import { generateToken } from "../../utils/jwt.js";
export async function loginUser(email, password) {
    // Find user
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    // Generate JWT
    const token = generateToken({
        userId: user.id,
        role: user.role,
    });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}
export async function registerUser(name, email, password) {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
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
    const user = await prisma.user.create({
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
//# sourceMappingURL=auth.service.js.map