export declare function loginUser(email: string, password: string): Promise<{
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
    };
}>;
export declare function registerUser(name: string, email: string, password: string): Promise<{
    id: string;
    name: string;
    email: string;
    role: import("@prisma/client").$Enums.Role;
}>;
//# sourceMappingURL=auth.service.d.ts.map