import { createIngredientService, getIngredientsService, updateIngredientService, deleteIngredientService } from "./ingredient.service.js";
export async function createIngredient(req, res) {
    try {
        const { name } = req.body;
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.userId;
        const ingredient = await createIngredientService(name, userId);
        res.status(201).json({
            message: "Ingredient created successfully",
            ingredient
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Something went wrong"
        });
    }
}
export async function getIngredients(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.userId;
        const ingredients = await getIngredientsService(userId);
        res.status(200).json({
            message: "Ingredients fetched successfully",
            ingredients
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Something went wrong"
        });
    }
}
export async function updateIngredient(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.userId;
        let idStr = id;
        if (Array.isArray(idStr))
            idStr = idStr[0];
        const ingredient = await updateIngredientService(idStr, name, userId);
        res.status(200).json({
            message: "Ingredient updated successfully",
            ingredient
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Something went wrong"
        });
    }
}
export async function deleteIngredient(req, res) {
    try {
        const { id } = req.params;
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const userId = req.user.userId;
        let idStr = id;
        if (Array.isArray(idStr))
            idStr = idStr[0];
        const ingredient = await deleteIngredientService(idStr, userId);
        res.status(200).json({
            message: "Ingredient deleted successfully",
            ingredient
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error instanceof Error
                ? error.message
                : "Something went wrong"
        });
    }
}
//# sourceMappingURL=ingredient.controller.js.map