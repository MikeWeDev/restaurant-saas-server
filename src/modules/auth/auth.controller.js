import { registerUser, loginUser } from "./auth.service.js";
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        const { token, user } = result;
        res
            .cookie("token", token, {
            httpOnly: true,
            secure: false, // Change to true in production (HTTPS)
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .status(200)
            .json({
            message: "Login successful",
            user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error
                ? error.message
                : "Something went wrong",
        });
    }
}
export async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser(name, email, password);
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error instanceof Error
                ? error.message
                : "Something went wrong",
        });
    }
}
export async function getMe(req, res) {
    res.status(200).json({
        message: "Authenticated user",
        user: req.user,
    });
}
//# sourceMappingURL=auth.controller.js.map