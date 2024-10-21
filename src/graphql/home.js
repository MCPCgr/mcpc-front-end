import gql from 'graphql-tag';
export const IMAGE_URL = 'https://mcpc.mn'

import { base_url } from '~/consts/const'

export const GET_PROVINCE= gql`
query view_aiamag{
  view_aiamag(
    sorts: [{ column: "id", order: desc }]
  ) {
     id
     aimagname
  }
}
`;

export const GET_USER_GUIDE_CATEGORY= gql`
query UserGuideCategory{
 user_guide_category(
  sorts: [{ column: "category_order", order: asc }],
  subSorts:[{table:"user_guide", column: "user_guide_order", order: asc }]
) {
    id
    category
    category_order
    user_guide{
      id
      title
      user_guide_order
      description
      file
    }
  }
}
`;

export const GET_USER_GUIDE_DATA= gql`
query UserGuideCategoryData($id:String!){
 user_guide(
  filters:[{column:"id", condition:equals, value:$id}]

) {
     id
      category_id
      title
      description
      youtube_link
      user_guide_order
      file
  }
}
`;
export const GET_FAQ= gql`
query Faq{
 faq(
  sorts: [{ column: "id", order: asc }],
) {
    id
    question
    answer
    locale
  }
}
`;
export const GET_SYSTEM_MODULES= gql`
query SystemModules{
 system_modules(
  sorts: [{ column: "id", order: asc }],
) {
    id
    module_name
    module_description
    module_icon
    module_ss
    module_order
    locales
  }
}
`;
export const GET_SYSTEM_PAYMENT_CONFIG= gql`
query SystemPaymentConfig{
 system_payment_config(
  sorts: [{ column: "id", order: asc }],
) {
    id
    amount
    duration_by_days
    is_active
    subscription
    locale
    view_system_payment_config_modules{
      system_payment_config_id
      system_module_id
      module_name
    }
  }
}
`;

export const CREATE_FEEDBACK= gql`
mutation FeedbackPublic($name: String!, $email: String!, $feedback: String!){
createFeedbackPublic(input:{name: $name,  email:$email, feedback:$feedback}){
    name
    email
    feedback
  }
}
`;





export const GET_ADVICE_INFORMATION_TYPE = gql`
  query LutZovolgooAngilal {
    lut_zovolgoo_angilal
    (sorts: [{column: "id", order: asc}])
    {
      id
      z_angilal_en
      z_angilal_mn
    }
  }
`;

export const GET_ADVICE_INFORMATION_PAGINATE = gql`
  query paginate($page: Int!, $size: Int!) {
    paginate(sorts: [{column: "id", order: desc}], page: $page, size: $size) {
      page
      total
      last_page
      ds_zov_medeelel_view {
        id
        z_angilal_mn
        zovolgoo_en
        zovolgoo_mn
        zovolgoo_angilal_id
        zurag
      }
    }
  }
`;

export const GET_ADVICE_INFORMATION_TYPE_SEARCH = gql`
  query paginate($page: Int!, $size: Int!) {
    paginate(sorts: [{column: "id", order: desc}], page: $page, size: $size) {
      page
      total
      last_page
      ds_zov_medeelel_view {
        id
        z_angilal_mn
        zovolgoo_en
        zovolgoo_mn
        zovolgoo_angilal_id
        zurag
      }
    }
  }
`;
