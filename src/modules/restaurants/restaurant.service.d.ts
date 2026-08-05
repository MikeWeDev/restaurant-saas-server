export declare function createRestaurant(name: string, address: string | undefined, phone: string | undefined, ownerId: string): Promise<{
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getMyRestaurant(ownerId: string): Promise<{
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare function getAllRestaurants(): Promise<{
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare function deleteMyRestaurant(ownerId: string): Promise<{
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateMyRestaurant(ownerId: string, data: {
    name?: string;
    address?: string;
    phone?: string;
}): Promise<{
    id: string;
    name: string;
    address: string | null;
    phone: string | null;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=restaurant.service.d.ts.map