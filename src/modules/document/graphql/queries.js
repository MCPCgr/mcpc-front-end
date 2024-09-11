import gql from 'graphql-tag';


export const GET_EMPLOYERS_BY_STRUCT = gql`
query EmploySearch($struct_id: String!){
  view_emp(filters:[{column:"struct_id", condition:equals, value:$struct_id}]){
    id
    first_name
    last_name

  }
}
  `
export const GET_JOBS_BY_STRUCT = gql`
query JobSearch($struct_id: String!){
  view_job(filters:[{column:"structs_id", condition:equals, value:$struct_id}]){
    id
    a_tushaal_ner
  }
}
  `
export const GET_EMPLOYERS_BY_JOB = gql`
query EmploySearch($job_id: String!){
  view_emp(filters:[{column:"job_id", condition:equals, value:$job_id}]){
    id
    firstname
    lastname
     avatar
  }
}
  `
export const GET_EMPLOYEE = gql`
query Vw_userstruct($filters: [filter]) {
  vw_userstruct(filters: $filters) {
    LNAME
    JOB_LEVEL
    JOB_NAME
    STRUCT_NAME
    FNAME
    EMP_ID
    PHONE_MOBILE
    MIAT_EMAIL
    EMP_EMAIL
  }
}`
export const EO_STRUCTURE = gql`
query EmploySearch($struct_id: String!){
  view_emp(filters:[{column:"struct_id", condition:equals, value:$struct_id}]){
    id
    first_name
    last_name
  }
}
`
export const GET_DOCUMENT_CATEGORY = gql`
query document_type_category($sorts: [sort], $company_id: String!) {
  document_type_category(sorts: $sorts, filters:[{column:"company_id", condition:equals, value:$company_id}]) {
    company_id
    category
    category_order
    icon
    is_contract
    id
    document_type {
      document_name
      workflow_id
      id
    }
  }
}`

export const GET_document_TYPE = gql`
query view_document_type($filters: [filter]) {
  view_document_type(filters: $filters) {
    id
    document_name
    workflow_id
    document_type_category_id
    document_template
    is_contract
    created_at
  }
}`


export const GET_DOCUMENT = gql`
query Paginate($page: Int!, $size: Int!, $filters: [filter], $sorts: [sort]) {
  paginate(page: $page, size: $size, filters: $filters, sorts: $sorts) {
    view_document {
      ID
      EMP_ID
      STRUCT_ID
      CREATED_AT
      UPDATED_AT
      DOC_NAME
      DESCRIPTION
      DOC_CATE_ID
      DOC_FLOW_ID
      STATUS_ID
      STATUS
      STATUS_TYPE
      ICON
    }
    total
    last_page
  }
}`


export const GET_EMPLOYERS_BY_IDS = gql`
query EmploySearch($ids: String!){
  view_emp(filters:[{column:"id", condition:whereIn, value:$ids}]){
    id
    firstname
    lastname
    avatar
    company_name
    struct_name
    a_tushaal_ner
  }
}
`;
