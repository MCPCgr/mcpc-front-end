<template>

  <component :is="renderTheme()" :onSuccess="onSuccess"  :selectedLang="selectedLang"
             :lambda="lambda"
  >
  </component>

</template>
<script>
import {COMPANIES, COMPANY} from "~/store/mutation-types-tatatonga";


import axios from 'axios'
import {
  ACCESS_TOKEN,
  PERMISSIONS,
  USER_INFO,
  LAMBDA_CONFIG,
  MENU,
  KRUDS,
  MENU_LIST,
  MICROSERVICE_SETTINGS, COMPANY_MAX_PERMISSIONS, EMPLOYEE_STANDARD_PERMISSIONS
} from '~/store/mutation-types'
import ls from '~/utils/Storage'
import { createList } from '~/utils/menu'
import { setToken, ClearToken } from '~/plugins/core/axios'
import LoginComponent from "~/components/Login/Login.vue"
import {clearUserInfo} from "~/utils/util";

export default {
  props: ['selectedLang'],
  name: 'login',
  data () {
    const LambdaConfig = ls.get(LAMBDA_CONFIG)
    return {
      lambda: LambdaConfig,

    }
  },
  beforeCreate() {
    definePageMeta({
      layout: 'agent',
    })
  },
  methods: {

    onSuccess (data) {
      if (data.status) {
        this.isSuccess = true

        if (data.oauth) {
          window.location.replace('/oauth2/authorize')
        } else {
          // ls.set(USER_INFO, {
          //   ...data.data,
          //   jwt: undefined
          // })
          // window.init = {
          //   user: data.data,
          //   firebase_config: this.lambda.notify.firebaseConfig,
          //   microserviceSettings: [],
          //   companies:data.companies
          //
          // }
          // ls.set(ACCESS_TOKEN, data.token, 7 * 24 * 60 * 60 * 1000)
          //



          setToken(data.token)
          if (data.data.role === 1) {
            window.location.replace(data.path)
          } else {
            let userInfo = {
              ...data.data,
            }
            axios.get('/user-permissions').then((res) => {


              if (res.data.status) {

                ls.set(PERMISSIONS, res.data.permission.permissions)

                ls.set(COMPANY_MAX_PERMISSIONS, res.data.permission.companyMaxPermissions)
                ls.set(EMPLOYEE_STANDARD_PERMISSIONS, res.data.permission.employeeStandardPermissions)

                ls.set(MENU, res.data.permission.menu)
                ls.set(KRUDS, res.data.permission.kruds)

                if (res.data.company){

                  // console.log(res.data.company.company_id)
                  // console.log(res.data.company)
                   userInfo = {
                    ...userInfo,
                    jwt: undefined,
                    company_id: res.data.company.company_id,
                     comapny_domain: res.data.company.comapny_domain,
                     company_name: res.data.company.company_name,
                     company_register: res.data.company.company_register,
                    emp_id: res.data.permission.emp_id ? res.data.permission.emp_id : null,
                     shift_id: res.data.permission.shift_id ? res.data.permission.shift_id : null,
                     struct_id: res.data.permission.struct_id ? res.data.permission.struct_id : null
                  }
                  ls.set(COMPANIES, res.data.companies)
                  ls.set(COMPANY, res.data.company)
                  ls.set(USER_INFO, userInfo)

                  ls.set(ACCESS_TOKEN, res.data.token)
                  setToken(res.data.token)

                  window.init = {
                    user: userInfo,
                    firebase_config: this.lambda.notify.firebaseConfig,
                    microserviceSettings: [],
                    companies:res.data.companies
                  }
                }


                let menuList = createList(res.data.permission.menu, null, res.data.permission.kruds)
                ls.set(MENU_LIST, menuList)





                if (res.data.permission.microserviceSettings) {
                  window.init = {
                    user: userInfo,
                    firebase_config: this.lambda.notify.firebaseConfig,
                    microserviceSettings: [],
                    companies:[]
                  }
                  ls.set(MICROSERVICE_SETTINGS, res.data.permission.microserviceSettings)

                  window.init['microserviceSettings'] = res.data.permission.microserviceSettings


                  ls.set(USER_INFO,userInfo)

                  ls.set(ACCESS_TOKEN, res.data.token)
                  setToken(res.data.token)

                }

                let path = data.path.replaceAll('#', '')
                if (path.includes('/p/')) {
                  let paths = path.split('/')

                  let menu_id = paths[paths.length - 1]

                  // this.$router.replace('/admin/p/' + menu_id)
                  this.$router.replace('/erp')
                } else {
                  // this.$router.replace(path)
                  this.$router.replace('/erp')
                }

              }
            })

          }
        }
      }
    },
    renderTheme () {
      return LoginComponent
    }

  },
  mounted() {
    const token = ls.get(ACCESS_TOKEN);
    if (token) {
      const company = ls.get(COMPANY);
      axios.get(`/user-permissions${company ? '?company_id=' + company.company_id : ''}`).then(({data}) => {
        if (data.status) {
          if(this.$route.query.support){
            this.$router.replace('/erp/p/f77688e4-df79-6e35-035f-b6179c1cfb11')
          } else {
            this.$router.replace('/erp')
          }

        }
      }).catch(e => {

        clearUserInfo();
        ClearToken();
      })
    } else {
      clearUserInfo();
      ClearToken();
    }
  }
}
</script>
