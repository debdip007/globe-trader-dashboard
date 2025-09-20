export interface ProductResponse {
    success:  number;
    message:  string;
    products: Product[];
}

export interface Product {
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
    product_quantity:       null;
    product_capacity_unit:  string;
    createdAt:              Date;
    updatedAt:              Date;
    category_name:          string[];
    subCategory_name:       any[];
    additional_image:       any[];
    seller:                 Seller;
}

export interface Seller {
    id:              number;
    fullname:        null;
    email:           string;
    phone:           string;
    status:          number;
    user_type:       string;
    is_verified:     number;
    country:         null;
    country_code:    string;
    platform_type:   null;
    social_type:     null;
    social_token:    null;
    password:        string;
    profile_image:   string;
    first_name:      string;
    last_name:       string;
    user_role:       string;
    createdAt:       Date;
    updatedAt:       Date;
    profile_details: ProfileDetails;
}

export interface ProfileDetails {
    id:                           number;
    seller_id:                    number;
    company_name:                 string;
    website:                      string;
    business_registration_number: string;
    business_email_address:       string;
    business_contact_name:        null;
    business_contact_number:      null;
    business_address:             null;
    business_city:                null;
    business_state:               null;
    business_pincode:             null;
    company_type:                 null;
    business_description:         string;
    business_country_names:       string[];
    createdAt:                    Date;
    updatedAt:                    Date;
}