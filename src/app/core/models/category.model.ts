export interface CategoryResponse {
    success:  number;
    message:  string;
    category: CategoryElement[];
}

export interface CategoryElement {
    id:        number;
    name:      string;
    parent_id: null;
    status:    number;
    createdAt: Date;
    updatedAt: Date;
}