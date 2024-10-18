<template>
  <div class="loginInput" >
    <a-form
      class="mx-auto"
      :model="userForm"
      layout="vertical"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item name="login" :rules="[{ required: true, message: $t('auth.errorName') }]">
        <a-input type="text" :placeholder="$t('auth.signInName')" v-model:value="userForm.login">
          <template #prefix>
            <div class="h-4 w-4 flex-none">
              <img alt="" class="w-full h-full" src="/amjilthome/images/artist-blue.svg"/>
            </div>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item  name="password" :rules="[{ required: true, message: $t('auth.errorPass') }]">
        <a-input-password :placeholder="$t('auth.pass')" v-model:value="userForm.password">
          <template #prefix>
            <div class="h-4 w-4 flex-none">
              <img alt="" class="w-full h-full" src="/amjilthome/images/password-blue.svg"/>
            </div>
          </template>
        </a-input-password>
      </a-form-item>
      <nuxt-link to="/forgot" class="">{{ $t('auth.forgotPass') }}</nuxt-link>
      <div class="flex justify-between items-center py-6 space-x-4">
        <div class="button-login">
          <a-button :loading="loginLoader" html-type="submit" type="primary" @click="login('login')">
            <span v-if="loginLoader" >{{ $t('auth.please_wait') }}</span>
            <span v-else >{{$t('home.signIn')}}</span>
          </a-button>
        </div>
<!--        <div class="flex items-center space-x-2 text-xs">-->
<!--          <span>{{ $t('auth.reminderCom') }}</span>-->
<!--          <a-switch v-model:checked="stillLogin" size="small" />-->
<!--        </div>-->
      </div>

      <a-alert v-if="isError" :message="msg" type="error" class="text-black text-sm" showIcon></a-alert>
      <a-alert v-if="isSuccess" :message="msg" type="success" class="text-black text-sm" showIcon></a-alert>
      <div class="flex pt-4 space-x-2">
        <span>{{ $t('auth.not_register') }}</span>  <div @click="updateAuthType"><nuxt-link to="/register"  class="font-semibold">{{$t('home.signUp')}}</nuxt-link></div>
      </div>
    </a-form>
  </div>

</template>

<script>

import { MenuOutlined, UserOutlined } from '@ant-design/icons-vue';
import {defineComponent, ref,} from 'vue';
import Loader from "~/components/common/_loading.vue";
import axios, {setToken} from "~/plugins/core/axios";
import ls from "~/utils/Storage";
import {
  ACCESS_TOKEN,
  COMPANY_MAX_PERMISSIONS,
  EMPLOYEE_STANDARD_PERMISSIONS,
  KRUDS, LAMBDA_CONFIG,
  MENU,
  MENU_LIST,
  MICROSERVICE_SETTINGS,
  PERMISSIONS,
  USER_INFO
} from "~/store/mutation-types";
import {createList} from "~/utils/menu";
import {clearUserInfo} from "~/utils/util";
import {COMPANIES, COMPANY, LMS_ROLES, USER_EXTRA_ROLES} from "~/store/mutation-types-tatatonga";
export default {
  name: "auth",
  props: ["authType"],
  emits:["onLogin", "changeAuthType"],
  components: {
    Loader,
    MenuOutlined,
    UserOutlined,
  },
  computed: {
    lang() {
      const labels = ['loginTitle', 'username', 'password', 'remember', 'login', 'forgot', 'loginSuccess', 'loginError'];
      return labels.reduce((obj, key, i) => {
        obj[key] = this.$t('user.' + labels[i]);
        return obj;
      }, {});
    }
  },
  data () {
    const LambdaConfig = ls.get(LAMBDA_CONFIG)
    return {
      lambda: LambdaConfig,
      loader: true,
      loginLoader: false,
      EmongoliaModal: false,
      products: null,
      selectedProduct: null,
      isSuccess: false,
      isError: false,
      view_save_event: [],
      msg: "",
      userForm: {
        login: '',
        password: '',
        remember: true,
      },
      activeKey: ref('1'),
      stillLogin: false
    }
  },
  methods: {
    updateAuthType() {
      this.$emit('onLogin', this.authType == false);
    },
    onFinish (values){

    },
    onFinishFailed(errorInfo){

    },
    fail(){
      clearUserInfo();
      this.isError = true
      this.isSuccess = false
      this.loginLoader = false
      this.msg = this.lang.loginError;
    },
    setCookie(token){
      const expiration = new Date();
      expiration.setTime(expiration.getTime() + (72000 * 60 * 60 * 1000)); // 72 hours from now
      const expires = `expires=${expiration.toUTCString()}`;

      document.cookie = `token=${token}; Secure; Domain=.mcpc.com; Path=/; SameSite=Strict; ${expires}`;
      document.cookie = `mcpc_token=${token}; Secure; Domain=.mcpc.mn; Path=/; SameSite=Strict; ${expires}`;

    },
    login (formRef) {
      if (formRef) {
        this.isSuccess = false;
        this.isError = false;
        this.loginLoader = true;

        axios.post('/auth/login', this.userForm).then(({ data }) => {


          if (data.status) {
            this.isError = false;
            this.isSuccess = true;

            this.msg = this.lang.loginSuccess;

            if (data.oauth) {
              window.location.replace('/oauth2/authorize')
            } else {

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
                      this.$store.commit(COMPANIES, res.data.companies)
                      this.$store.commit(USER_EXTRA_ROLES, res.data.userExtraRoles)
                      this.$store.commit(COMPANY, res.data.company)
                      this.$store.commit(USER_INFO, userInfo)

                      ls.set(ACCESS_TOKEN, res.data.token)
                      setToken(res.data.token)
                     this.setCookie(res.data.token);
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


                      this.$store.commit(USER_INFO,userInfo)

                      ls.set(ACCESS_TOKEN, res.data.token)
                      this.setCookie(res.data.token);
                      setToken(res.data.token)

                    }



                    this.$emit("onLogin", userInfo);
                  }
                })

              }
            }

          } else {
           this.fail();
          }

        }).catch(e => {
          console.log(e)
          this.fail();
        })
      }
    },
  }
}
</script>

<style scoped>

</style>
