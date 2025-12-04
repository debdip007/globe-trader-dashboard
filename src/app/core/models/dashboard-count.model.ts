export interface DashboardCount {
    success: number;
    message: string;
    details: Details;
}

export interface Details {
    user_count:         UserCount[];
    product_count:      number;
    monthly_user_count: MonthlyUserCount;
    monthly_request:    MonthlyRequest;
    total_request:      number;
    approved_request:   number;
    pending_request:    number;
    seller_request:     number;
    buyer_request:      number;
}

export interface MonthlyRequest {
    BUYER:  Buyer[];
    SELLER: Buyer[];
}

export interface Buyer {
    month: string;
    count: number;
}

export interface MonthlyUserCount {
    BUYER:       Buyer[];
    SELLER:      Buyer[];
    Seller:      Buyer[];
    SUPER_ADMIN: Buyer[];
}

export interface UserCount {
    user_type: string;
    count:     number;
}