export interface UserResponse {
    success: number;
    message: string;
    details: Details;
}

export interface Details {
    id:              number;
    fullname:        null;
    email:           string;
    phone:           string;
    status:          number;
    user_type:       string;
    is_verified:     number;
    country:         string;
    country_code:    string;
    platform_type:   string;
    profile_image:   string;
    created_at:      Date;
    updated_at:      Date;
    accessToken:     string;
    first_name:      string;
    last_name:       string;
    user_role:       string;
    profile_details ?: ProfileDetails;
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