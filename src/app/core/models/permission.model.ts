export interface Permission {
    success: number;
    message: string;
    details: Detail[];
}

export interface Detail {
    id:          number;
    name:        string;
    description: string;
    sort:        number;
    createdAt:   Date;
    updatedAt:   Date;
}