export declare function createIngredientService(name: string, userId: string): Promise<{
    id: string;
    name: string;
    restaurantId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getIngredientsService(userId: string): Promise<{
    id: string;
    name: string;
    restaurantId: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function updateIngredientService(id: string, name: string, userId: string): Promise<{
    id: string;
    name: string;
    restaurantId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function deleteIngredientService(id: string, userId: string): Promise<{
    id: string;
    name: string;
    restaurantId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=ingredient.service.d.ts.map