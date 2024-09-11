import gql from 'graphql-tag';

export const IMAGE_URL = 'https://api.amjilt.com/main'


export const GET_STRUCTS= gql`
query getStructs($company_id: String!){
view_struct(filters:[
    {
      column:"company_id",
      condition:equals,
      value:$company_id
    }
  ],sorts:[{column:"created_at", order:asc}]){
    id
    parent_id
    company_id
    struct_name
    struct_type
    aimagname
    sumname
    phone
    child_company_id
  }
}`;

export const GET_STRUCTS_NOT_CHILD_COMPANY= gql`
query getStructs($company_id: String!){
view_struct(filters:[
    {
      column:"company_id",
      condition:equals,
      value:$company_id
    }, {
      column:"struct_type",
      condition:notEqual,
      value:"company"
    }
  ],sorts:[{column:"created_at", order:asc}]){
    id
    parent_id
    company_id
    struct_name
    struct_type
    aimagname
    sumname
    phone
    child_company_id
  }
}`;
export const GET_STRUCTS_NOT_CHILD_COMPANIES= gql`
query getStructs($companyIDs: String!){
view_struct(filters:[
    {
      column:"company_id",
      condition:whereIn,
      value:$companyIDs
    }, {
      column:"struct_type",
      condition:notEqual,
      value:"company"
    }
  ],sorts:[{column:"created_at", order:asc}]){
    id
    parent_id
    company_id
    struct_name
    struct_type
    aimagname
    sumname
    phone
    child_company_id
  }
}`;
export const GET_PARTNER= gql`
query getPartner($company_id: String!){
partner(filters:[
    {
      column:"company_id",
    condition:whereIn,
      value:$company_id
    }
  ],sorts:[{column:"created_at", order:asc}]){
    id
    partner_company_name
  }
}`;
export const GET_PARTNER_BY_COMPANIES= gql`
query getPartner($companyIDs: String!){
partner(filters:[
    {
      column:"company_id",
   condition:whereIn,
      value:$companyIDs
    }
  ],sorts:[{column:"created_at", order:asc}]){
    id
    partner_company_name
  }
}`;
export const GET_EMPLOYEE= gql`
query getEmployee($company_id: String!){
employee(filters:[
    {
      column:"company_id",
      condition:equals,
      value:$company_id
    }
  ],sorts:[{column:"created_at", order:asc}]){
    id
    firstname
    lastname
    struct_id
  }
}`;
export const GET_EMPLOYEE_BY_COMPANIES= gql`
query getEmployee($companyIDs: String!){
employee(filters:[
    {
      column:"company_id",
      condition:whereIn,
      value:$companyIDs
    }
  ],sorts:[{column:"created_at", order:asc}]){
    id
    firstname
    lastname
  }
}`;
export const GET_EMPLOYEE_WITH_USER= gql`
query getEmployee($company_id: String!){
emp_with_user(filters:[
    {
      column:"company_id",
      condition:equals,
      value:$company_id
    }
  ],sorts:[{column:"firstname", order:asc}]){
    id
    firstname
    lastname
    avatar
    login
    employee_status_id
  }
}`;
export const GET_EMPLOYEE_BY_STRUCT= gql`
query getEmployee($company_id: String!, $struct_id: String!){
employee(filters:[
    {
      column:"company_id",
      condition:equals,
      value:$company_id
    },
    {
      column:"struct_id",
      condition:equals,
      value:$struct_id
    }
  ],sorts:[{column:"created_at", order:asc}]){
    id
    firstname
    lastname
  }
}`;
export const GET_EMPLOYEE_BY_STRUCT_WiIH_SHIFT= gql`
query getEmployee($company_id: String!, $struct_id: String!){
view_emp(filters:[
    {
      column:"company_id",
      condition:equals,
      value:$company_id
    },
    {
      column:"struct_id",
      condition:equals,
      value:$struct_id
    }
  ],sorts:[{column:"created_at", order:asc}]){
    id
    firstname
    lastname
    ajliin_tsag_id
  }
}`;
export const GET_STRUCTS_ONLY_NAME_ID= gql`
query getStructs($company_id: String!){
view_struct(filters:[
    {
      column:"company_id",
      condition:equals,
      value:$company_id
    }, {
      column:"struct_type",
      condition:notEqual,
      value:"company"
    }
  ],sorts:[{column:"created_at", order:asc}]){
    id

    struct_name

  }
}`;
export const GET_INVENTORY_PRICE= gql`
query InventoryPrice($company_id: String!, $subCategoryID: String!){
  view_inventory(
  filters:[{column:"company_id",condition:equals, value:$company_id },{column:"category_sub_id",condition:equals, value:$subCategoryID },],)
  {
    id
    company_id
    inventory_name
    measure_unit
    price
    whole_sale_qty
    whole_sale_price
    code
  }
}
`;
export const GET_INVENTORY_PRICE_BY_COMPANY= gql`
query InventoryPrice($company_id: String!){
  view_inventory(
  filters:[{column:"company_id",condition:equals, value:$company_id }],)
  {
    id
    company_id
    inventory_name
    measure_unit
    price
    whole_sale_qty
    whole_sale_price
    code
  }
}
`;

export const GET_INSURED_TYPE= gql`{
  lut_salary_insured_type {
    id
    insured_type
  }
}
`;

export const GET_SHIFT= gql`
query getShifts($id: String!, $company_id: String!) {
  shift(
    filters: [
    { column: "id", condition: equals, value: $id },
    { column: "company_id", condition: equals, value: $company_id }
    ]
    sorts: [{ column: "shift_title", order: asc }]
  ) {
    id
    shift_title
    company_id
  }
}
`;

export const GET_SHIFT_BY_ID= gql`query getShifts($company_id: String!) {
  shift(
    filters: [{ column: "company_id", condition: equals, value: $company_id }]
    sorts: [{ column: "shift_title", order: asc }]
  ) {
    id
    shift_title
  }
}`;

export const GET_CATEGORIES= gql`
query getCategories($company_id: String!){
lut_inventory_category(filters:[
    {
      column:"company_id",
      condition:equals,
      value:$company_id
    }
  ],sorts:[{column:"category_name", order:asc}]){
    id
    category_name
    category_code
  },
  lut_inventory_category_sub(filters:[
    {
      column:"company_id",
      condition:equals,
      value:$company_id
    }
  ],sorts:[{column:"sub_category_name", order:asc}]){
    id
    inventory_category_id
    sub_category_name
    sub_category_code
  },
  lut_inventory_category_sub_sub(filters:[
    {
      column:"company_id",
      condition:equals,
      value:$company_id
    }
  ],sorts:[{column:"sub_sub_category_name", order:asc}]){
    id
    inventory_cateogory_id
    inventory_sub_cateogory_id
    sub_sub_category_name
    sub_sub_category_code
  },
}`;

export const GET_TECHNOLOGY_CARD_INGREDIENDTS= gql`
query view_technology_card_food_ingredients($filters: [filter]) {
  view_technology_card_food_ingredients(filters: $filters) {
    id
    approximate_weight
    pure_weight
    calorie
    protein
    fat
    carbohydrate
    technology_card_id
    food_ingredient_id
    food_ingredient
  }
}
`;
export const GET_TECHNOLOGY_CARD= gql`
query view_technology_card($filters: [filter]) {
  view_technology_card(filters: $filters) {
    id
    created_at
    title
    description
    inventory_name
    category_code
    category_name

    inventory_id
    created_at
    category_id
    category_sub_id
    category_sub_sub_id
    company_id
    struct_id
    emp_id

    sub_category_name
    sub_sub_category_name

  }
}
`;


export const GET_EMPLOYEE_ID_FILTER= gql`
query getEmployee($filters: [filter]){
view_emp(filters: $filters){
    id
    firstname
    lastname
    a_tushaal_ner
  }
}
`;



export const GET_BRANCHES_BOOKING= gql`
query Branches($filters: [filter]) {
  branches(filters: $filters) {
    id
    company_id
    branch_name
    struct_id
  }
}
`;

export const GET_SERVICE_CATEGORY_BY_ARTIST= gql`
query View_artist_services_skills($filters: [filter]) {
  view_artist_services_skills(filters: $filters) {
    id
    artist_id
    service_id
    company_id
    brach_id
    service_category_id
    emp_bonus
    emp_bonus_percent
    service_name
    service_description
    duration_minute
    price
    service_category
  }
}
`;
export const GET_SERVICE_CATEGORY= gql`
query view_service_category($filters: [filter]) {
  view_service_category(filters: $filters) {
    id
    company_id
    service_category
    branch_id
    branch_name
    services {
      id
      service_category_id
      service_name
      description
      duration_minute
      price
      created_at
      branch_id
      perpayment
      company_id
      emp_bonus
      material_issue
      emp_bonus_percent
      visible_customer
      view_artist_by_service {
        id
        company_id
        branch_id
        first_name
        artist_image
        artist_nick_name
        last_name
        role
        artist_title
        service_id
      }
    }
  }
}
`;

export const GET_SERVICE_CATEGORY_WHERE_IN= gql`
query view_service_category($filters: [filter]) {
  view_service_category(filters: $filters) {
    id
    company_id
    service_category
    branch_id
    branch_name
  }
}
`;

export const MUTATION_CREATE_BOOKING_ORDER= gql`
mutation CreateBookingOrders($input: BookingOrdersInput!) {
  createBookingOrders(input: $input) {
    company_id
    order_number
    qpay_invoice_id
    payment_status
    user_id
    total_price
    is_received
    phone_number
    total_prepayment
    non_cash_amount
    cash_amount
    id
  }
}
`;

export const GET_ORDER_DETAIL_TIMING= gql`
query View_order_detail_timing($groupFilters: [groupFilter]) {
  view_order_detail_timing(groupFilters: $groupFilters) {
    id
    service_id
    service_date
    duration_minute
    branch_id
    service_date_time
    service_time
  }
}
`;
export const GET_SERVICE_TIMING= gql`
query Service_timing($filters: [filter], $sorts: [sort]) {
  service_timing(filters: $filters, sorts: $sorts) {
    id
    status
    duration
    service_id
    created_at
  }
}
`;
export const GET_BRANCH_BOOKING_DATA= gql`
query View_artist($filters: [filter], $viewOrderDetailTimingFilters2: [filter], $viewServiceTimingFilters2: [filter]) {
  view_artist(filters: $filters) {
    id
    last_name
    first_name
    artist_title
    artist_nick_name
    branch_id
  }
  view_order_detail_timing(filters: $viewOrderDetailTimingFilters2) {
    artist_id
    branch_id
    duration_minute
    id
    order_id
    service_date
    service_date_time
    service_id
    service_time
  }
  view_service_timing(filters: $viewServiceTimingFilters2) {
    branch_id
    created_at
    duration
    id
    service_id
    status
  }
}
`;
export const MUTATION_CREATE_ORDER_DETAIL= gql`
mutation CreateBookingOrders($input: OrderDetailInput!) {
  createOrderDetail(input: $input) {
    order_id
    service_id
    service_category_id
    artist_id
    service_date
    service_time
    service_price
    branch_id
    service_date_time
    prepayment
    registered_emp_id
  }
}
`;

export const GET_NEWS_LIST= gql`
query ViewNews($page: Int!, $size: Int!, $filters: [filter]) {
  paginate(page: $page, size: $size, filters: $filters, sorts: {column: "created_at", order:desc} ) {
    view_news {
      id
      company_id
      title
      post_text
      image
      pictures
      created_at
      short_text
      user_id
      avatar
      cover
      first_name_user
      last_name_user
    }
    total
    last_page
  }
}
`;

export const GET_NEWS_DETAIL= gql`
query ViewNews($filters: [filter]) {
  view_news (filters: $filters){
      id
      company_id
      title
      post_text
      image
      pictures
      created_at
      short_text
      user_id
      avatar
      cover
      first_name_user
      last_name_user
    }
}
`;

export const GET_HOME_HAMT_OLON= gql`
query emp_with_user($filters: [filter]) {
  emp_with_user(filters: $filters) {
    id
    lastname
    firstname
    phone_one
    company_id
    employee_status_id
    login
    email
    avatar
    sub
  }
}`;

export const GET_FEEDBACK_LIST= gql`
query ViewFeedbackCompany ($page: Int!, $size: Int!, $filters: [filter]) {
  paginate(page: $page, size: $size, filters: $filters ) {
    view_feedback_company {
      id
      nick_name
      description_text
      company_id
      created_at
      emp_id
      avatar
      firstname
      lastname
    }
    total
    last_page
  }
}
`;


export const FEEDBACK_CREATE= gql`
mutation createFeedbackCompany($input: FeedbackCompanyInput!) {
  createFeedbackCompany(input: $input) {
    id
    nick_name
    description_text
    company_id
    emp_id
  }
}
`;
