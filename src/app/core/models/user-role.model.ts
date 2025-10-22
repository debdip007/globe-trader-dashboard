export interface UserRole {
    success: number;
    message: string;
    details: Detail[];
}

export interface Detail {
    id:          number;
    name:        string;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    Permissions: Permission[];
}

export interface Permission {
    id:          number;
    name:        string;
    description: string;
    sort:        number;
}