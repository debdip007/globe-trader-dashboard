export interface RequestedUserResponse {
    success:  number;
    message:  string;
    products: Product[];
}

export interface Product {
    id:              number;
    buyer_id:        number;
    product_id:      number;
    seller_id:       number;
    notes:           null | string;
    status:          number;
    user_type:       string;
    accept:          number;
    createdAt:       Date;
    updatedAt:       Date;
    product_details: ProductDetails;
    user_details:    UserDetails;
}

export interface ProductDetails {
    id:                     number;
    product_name:           string;
    sku:                    string;
    main_image:             string;
    product_unit:           string;
    minimum_order_qty:      string;
    product_capacity:       string;
    country:                string[];
    product_description:    string;
    category:               number[];
    sub_category:           number[];
    status:                 number;
    include:                number;
    seller_id:              number;
    device_type:            null;
    minimum_order_qty_unit: string;
    product_quantity:       string;
    product_capacity_unit:  null;
    createdAt:              Date;
    updatedAt:              Date;
    additional_image:       AdditionalImage[];
    category_name:          string[];
    subCategory_name:       string[];
    seller:                 UserDetails;
}

export interface AdditionalImage {
    id:         number;
    image:      string;
    product_id: number;
    status:     number;
    sort_order: number;
    createdAt:  Date;
    updatedAt:  Date;
}

export interface UserDetails {
    id:               number;
    fullname:         null;
    email:            string;
    phone:            string;
    status:           number;
    user_type:        string;
    is_verified:      number;
    country:          null | string;
    country_code:     string;
    platform_type:    null | string;
    social_type:      null;
    social_token:     null;
    password:         string;
    profile_image:    null | string;
    first_name:       string;
    last_name:        string;
    user_role:        string;
    createdAt:        Date;
    updatedAt:        Date;
    profile_details?: ProfileDetails;
}

export interface ProfileDetails {
    id:                            number;
    buyer_id:                      number;
    company_name:                  string;
    website:                       string;
    company_type:                  string;
    store_count:                   number;
    operation_type:                string;
    business_registration_number:  string;
    business_email_address:        string;
    business_contact_name:         string;
    business_contact_number:       string;
    interest_category:             number[];
    interest_sub_category:         number[];
    business_address:              string;
    business_city:                 string;
    business_state:                string;
    business_pincode:              string;
    business_description:          string;
    business_country_names:        string[];
    createdAt:                     Date;
    updatedAt:                     Date;
    interest_category_details:     InterestCategoryDetail[];
    interest_sub_category_details: InterestCategoryDetail[];
}

export interface InterestCategoryDetail {
    id:        number;
    name:      string;
    parent_id: number | null;
    status:    number;
    createdAt: Date;
    updatedAt: Date;
}