import {COMPANIES, COMPANY, LMS_ROLES, USER_EXTRA_ROLES, USER_EXTRA_ROLE} from '~/store/mutation-types-tatatonga'
import ls from "~/utils/Storage";

export const Tatatonga ={
  state: {
    companies: ls.get(COMPANIES) ?? [],
    LMS_roles: ls.get(LMS_ROLES) ?? [],
    company: ls.get(COMPANY) ?? {
      company_id:"",
      company_name:"",
      company_logo:"",
      subscription_active:true,
      subscription_color:"#A855F7",
      subscription:"Free",
      total_usage:0,
      storage:1,
    },
    userExtraRoles: ls.get(USER_EXTRA_ROLES) ?? [],
    userExtraRole: ls.get(USER_EXTRA_ROLE) ?? {
      id:""
    },
  },
  mutations: {
    [COMPANIES]: (state, companies) => {
      state.companies = companies;
      ls.set(COMPANIES, companies)
    },
    [COMPANY]: (state, company) => {
      state.company = company
      ls.set(COMPANY, company)
    },
    [LMS_ROLES]: (state, LMS_roles) => {
      state.LMS_roles = LMS_roles
      ls.set(LMS_ROLES, LMS_roles)
    },
    [USER_EXTRA_ROLES]: (state, userExtraRoles) => {
      state.userExtraRoles = userExtraRoles
      ls.set(USER_EXTRA_ROLES, userExtraRoles)
    },
    [USER_EXTRA_ROLE]: (state, userExtraRole) => {
      state.userExtraRole = userExtraRole
      ls.set(USER_EXTRA_ROLE, userExtraRole)
    },
  }
}
export default Tatatonga
