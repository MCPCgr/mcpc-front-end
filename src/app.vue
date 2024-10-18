<template>
  <a-config-provider
    v-if="!loading"
    :locale="locale"
    :theme="{
          algorithm: darkMode ? algorithm : undefined,
          token: {
            colorPrimary: primaryColor,
 colorBgBase: darkMode ? '#030305' : undefined,
 colorText:!darkMode ? 'rgba(0,0,0,0.8)': undefined,
          },
    }"
  >
    <NuxtLayout >
      <NuxtPage/>
    </NuxtLayout>
  </a-config-provider>
  <div class="grid grow grid-nogutter module-page container pb-16 px-4 mx-auto pt-32" v-else>
    <LoadingAnimation class="amjilt-logo animated-logo mx-auto"/>
<!--    <h1 style="text-align: center;">-->
<!--      <img :src="`${logoDark}`" v-if="darkMode" class="logo-light amjilt-logo animated-logo" alt="amjilt.com">-->
<!--      <img :src="`${logo}`"   v-if="!darkMode" class="logo-dark amjilt-logo animated-logo" alt="amjilt.com">-->



<!--    </h1>-->
<!--    <div class="first-loading-wrp">-->
<!--      <div class="loading-wrp">-->
<!--        <svg width="91" height="74" viewBox="0 0 91 74" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--          <path d="M40.95 1.35956C40.1334 2.09762 39.1612 2.71914 38.7722 2.71914C38.3834 2.71914 37.5667 3.22414 37.0222 3.88449C36.2446 4.7391 35.6222 5.04984 34.65 5.04984C33.5612 5.04984 33.0167 5.36061 31.7722 6.79787C30.6834 8.04093 29.9446 8.5459 29.2055 8.5459C28.0389 8.5459 27.4167 9.08975 25.0445 12.2362C23.5667 14.1785 23.2945 14.8388 23.1389 16.8588C22.9445 18.9564 22.8667 19.2283 21.9722 19.4226C21.1167 19.6168 20.7667 20.2771 19.0945 25.2493C16.9167 31.6976 16.9167 32.2025 19.25 34.7275C20.1056 35.6598 20.8056 36.6699 20.8056 37.0195C20.8056 37.7962 8.01115 53.6063 7.35003 53.6063C7.07781 53.6063 5.36669 51.8583 3.5389 49.7219C1.71113 47.5464 0.194458 45.9149 0.194458 46.0702C0.194458 46.6919 3.07224 51.703 4.66669 53.8006C7.42781 57.4907 12.95 62.8126 16.3334 65.0655C22.3611 69.0277 29.5946 72.1354 35.3888 73.223C40.0555 74.1165 51.5667 73.8447 56.7779 72.7181C70.4279 69.766 83.0279 60.3653 89.4446 48.3622L90.9222 45.6431L89.6388 47.1968C85.9834 51.6639 78.75 58.1124 78.2055 57.4132C78.1279 57.3742 74.7834 52.674 70.7388 47.0415L63.3888 36.7474L63.1946 32.6687C63.0388 29.1338 63.1167 28.3569 63.7388 27.2693C64.1279 26.5701 64.4779 25.2882 64.5167 24.4336C64.5555 23.1128 64.3222 22.6467 63.3112 21.7144C62.0667 20.6268 62.0667 20.5879 62.6112 19.2672C62.9222 18.4903 63.1946 17.4803 63.1946 16.9753C63.1946 15.7323 61.6388 14.3727 60.2388 14.3727H59.1112V11.032C59.1112 8.00209 59.0334 7.65249 58.1779 6.95327C57.6722 6.5648 56.8555 6.2152 56.35 6.2152C55.65 6.2152 55.3 5.90445 54.9888 5.12754C54.4055 3.53488 51.9167 1.16533 50.8279 1.16533C50.3222 1.16533 49.4279 1.43725 48.8446 1.78686C47.7946 2.40838 47.7167 2.36953 46.0834 1.20418C43.9055 -0.349629 42.7388 -0.310782 40.95 1.35956ZM46.2 3.0299C46.9779 3.88449 46.7055 5.04984 45.6946 5.04984C44.8388 5.04984 42.9722 3.61258 42.9722 2.91336C42.9722 2.17531 44.1779 1.55379 44.9167 1.94224C45.2279 2.09762 45.8112 2.6026 46.2 3.0299ZM53.0055 3.76795C53.7446 4.77794 53.55 6.17636 52.5 8.00209C51.2555 10.0997 49.5446 11.3428 48.1446 11.1874C46.5112 10.9931 46.5112 9.67242 48.2222 7.18634C49.3112 5.63252 49.6222 4.85564 49.4279 4.11756C49.2722 3.41835 49.35 3.1076 49.8555 2.99107C50.9446 2.68029 52.4612 3.06874 53.0055 3.76795ZM42.9722 5.12754C45.15 6.60367 45.5779 7.26402 44.7612 8.07976C44.2555 8.58477 43.9446 8.50707 42 7.34172C39.7834 6.02099 38.85 4.97217 39.2779 4.27296C39.7055 3.57375 41.0279 3.88449 42.9722 5.12754ZM40.95 7.80786C45.0334 10.5659 47.25 12.3916 47.25 13.0131C47.25 13.8289 45.6946 14.7611 44.3334 14.7611C42.3112 14.7611 39.2388 13.052 38.0722 11.3039C36.9055 9.51705 36.3612 9.55589 36.3612 11.4205C36.3612 13.2073 35.6222 15.1108 34.8055 15.538C33.5612 16.1984 31.1112 16.0042 30.0222 15.1496C27.65 13.285 27.6111 14.6834 29.9446 17.7134C33.9112 22.8021 34.6112 26.2205 32.0834 28.4346C30.4112 29.9883 29.4388 29.7943 26.9111 27.5412L24.6945 25.5601V20.2771C24.7334 16.7034 24.8889 14.7611 25.2 14.3338C25.4722 14.0231 27.3389 12.547 29.3612 11.0708C31.3834 9.63359 33.7167 7.84669 34.5334 7.10864C35.35 6.3706 36.4 5.82675 36.9446 5.82675C37.4888 5.82675 39.3167 6.7202 40.95 7.80786ZM57.3612 8.62361C58.3334 9.67242 58.3722 11.4982 57.4 13.0131C56.9722 13.6346 55.4167 15.4604 53.9388 16.9753C51.7612 19.2672 50.9834 19.811 50.05 19.811C48.6112 19.811 47.8722 18.9564 48.1834 17.7134C48.3 17.2084 49.7388 15.1496 51.3722 13.1685C53.0055 11.1485 54.4834 9.12858 54.6779 8.66244C55.1055 7.53595 56.3112 7.49709 57.3612 8.62361ZM42.1946 15.8488C42.1946 17.0142 43.0888 17.8687 44.5279 18.0241C45.6946 18.1407 45.9279 18.296 46.1612 19.4614C46.4722 21.0152 48.0667 22.5302 49.3888 22.5302C50.05 22.5302 50.5167 22.8798 50.9446 23.6955C51.6446 25.0551 52.3446 25.4435 54.4834 25.7931C55.65 25.9874 56.2334 26.337 56.7388 27.2304C57.4388 28.4346 59.1888 29.5222 60.3946 29.5222C61.0167 29.5222 61.1722 29.9108 61.4055 31.5423C61.5222 32.6687 61.6388 34.2227 61.6388 34.9606C61.6388 36.5143 62.2222 37.4466 71.0888 50.0715C75.4055 56.2088 76.8446 58.5008 76.5722 58.9282C75.6779 60.3653 64.1279 66.0756 61.25 66.4639C60.3946 66.6195 59.6167 65.6872 54.25 58.3842C50.9446 53.8393 47.4055 49.2945 46.4334 48.3234C44.7612 46.6919 44.45 46.5364 41.8834 46.2258C37.6055 45.6819 34.6112 44.7883 30.9555 42.9238C28.0778 41.4866 27.0278 40.6708 23.5278 37.0195C17.8111 31.1149 17.9667 31.6976 20.1056 25.9485C22.3222 19.9275 22.9834 19.5391 22.5945 24.4336C22.3611 27.4246 22.4389 27.9685 22.9056 27.9685C24.3445 27.9685 25.55 29.0173 26.7167 31.1537C28.0778 33.7175 29.4 34.9606 30.7612 34.9606C31.7722 34.9606 33.9112 32.6687 35.6222 29.7165C37.0612 27.2304 37.0612 25.2882 35.7 21.9086L34.65 19.3449L36.8279 17.2472C38.7334 15.4215 39.2 15.1496 40.6 15.1496C41.8834 15.1496 42.1946 15.305 42.1946 15.8488ZM61.6779 16.548C62.6112 17.6745 60.3167 20.5879 56.4667 23.1128C55.0667 24.0063 53.4722 23.4236 53.4722 21.9863C53.4722 20.5879 59.0334 15.9265 60.7055 15.9265C60.9388 15.9265 61.3667 16.1984 61.6779 16.548ZM62.8055 23.3071C63.2334 23.7344 63.5834 24.3171 63.5834 24.6278C63.5834 25.5601 61.9888 27.1916 61.0946 27.1916C59.1112 27.1916 58.6055 24.7055 60.3167 23.3459C61.6 22.336 61.8334 22.336 62.8055 23.3071ZM23.6445 40.7874C23.9556 41.2148 24.85 42.2636 25.6278 43.1181C26.8722 44.4387 27.3 44.6718 28.6611 44.6718C31.9279 44.6718 35.2722 47.1968 35.8167 49.9549C36.05 51.159 35.7779 51.936 34.2222 55.0047C31.3834 60.5984 27.8834 65.8812 27.1056 65.726C24.1889 65.1433 12.3667 58.5786 10.7722 56.6362C10.3834 56.1313 10.85 55.3543 13.9611 51.4699C15.9834 48.9449 18.2389 45.8372 18.9389 44.5943C19.6389 43.3512 20.5334 41.7975 20.8834 41.1757C21.7 39.8163 22.8667 39.6608 23.6445 40.7874ZM45.9667 51.3534C46.4334 51.8582 49.3888 55.5486 52.4612 59.6274C56.1167 64.4053 57.9446 67.0856 57.6334 67.2409C55.0667 68.6006 41.3388 68.9502 35.1946 67.8623C30.45 66.9691 30.0612 66.8526 30.2946 66.2309C30.3722 65.959 32.2388 62.9679 34.4167 59.5496C38.4612 53.2954 40.2112 51.0812 41.6112 50.4598C42.8167 49.9549 44.9946 50.382 45.9667 51.3534Z" fill="#103067"/>-->
<!--        </svg>-->
<!--      </div>-->
<!--    </div>-->
  </div>
  <LockScreen />
</template>

<script>
import locale from 'ant-design-vue/es/locale/mn_MN';
import axios from 'axios'
import {ACCESS_TOKEN, COMPANY_MAX_PERMISSIONS, EMPLOYEE_STANDARD_PERMISSIONS, USER_INFO} from '~/store/mutation-types';
import { LAMBDA_CONFIG, PERMISSIONS, MENU, KRUDS, MENU_LIST, MICROSERVICE_SETTINGS } from '~/store/mutation-types';
import {COMPANIES, COMPANY, LMS_ROLES, USER_EXTRA_ROLES, USER_EXTRA_ROLE} from '~/store/mutation-types-tatatonga';
import { setDeviceType } from '~/utils/device'
import LockScreen from '~/components/LockScreen/index.vue'
import ls from '~/utils/Storage';
import { getLambdaConfig } from './service/service'
import { createList } from '~/utils/menu'
import { title, subTitle } from '~/consts/const'
import { darkMode, primaryColor } from '~/store/useSiteSettings'
import {base_url} from "~/consts/const";
import { setToken } from '~/plugins/core/axios'
import {Modal, theme} from 'ant-design-vue';
const { darkAlgorithm, compactAlgorithm } = theme;
import LoadingAnimation from '~/components/animations/loading.vue';
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";
export default {
  components: { LockScreen, LoadingAnimation },
  data() {
    return {
      locale:locale,
      loading:true,
      showCompanyWarning:false,
      title,
      subTitle,
      darkMode,
      base_url,
      logo: "/amjilthome/logos/mcpc-gr-white.svg",
      logoDark: "/amjilthome/logos/mcpc-gr-white.svg",
      primaryColor,
      algorithm: [darkAlgorithm, compactAlgorithm],
    };
  },
  beforeCreate () {
    window.onresize = setDeviceType
    setDeviceType();
  },
  methods:{
    redirectToLogin(){
     clearUserInfo();
      this.loading = false;
     //
     //  const ignoredPaths = [
     //    "/auth/login",
     //    "/auth/forgot",
     //    "/auth/password-reset",
     //    "/",
     //    "/register",
     //    "/about",
     //    "/customers",
     //    "/products",
     //    "/guide",
     //    "/guide/:id",
     //    "/terms-of-service",
     //  ];
     //  if(this.$route.path !== "/login" && this.$route.path !== "/forgot" && this.$route.path !== "/auth/password-reset" && this.$route.path !== "/amjilt-sso"){
     //    window.location.replace("/");
     //  }
    }
  },
  mounted () {
    getLambdaConfig().then((res) => {

      ls.set(LAMBDA_CONFIG, res);

      if(res.microservice_dev){
        window.microservice_dev = true
      }

      const token = ls.get(ACCESS_TOKEN);

      if (token !== null && token !== "" && token !== undefined) {
        setToken(token)
        const company = ls.get(COMPANY);
        const userExtraRole = ls.get(USER_EXTRA_ROLE);
        let getPermissionPath = `/user-permissions${company ? '?company_id='+company.company_id : ''}`




        if(userExtraRole && userExtraRole.id !== ""){
          getPermissionPath = `/user-permissions?extra_role=${userExtraRole.id}`
        }

        axios.get(getPermissionPath).then(({ data }) => {

          if (data.status) {

            if (data.company) {

              const userInfo = {
                ...ls.get(USER_INFO),
                company_id: data.company ? data.company.company_id : null,
                emp_id: data.permission.emp_id ? data.permission.emp_id : null,
                shift_id: data.permission.shift_id ? data.permission.emp_id : null,
                struct_id: data.permission.struct_id ? data.permission.struct_id : null
              }

              ls.set(PERMISSIONS, data.permission.permissions)

              ls.set(COMPANY_MAX_PERMISSIONS, data.permission.companyMaxPermissions)
              ls.set(EMPLOYEE_STANDARD_PERMISSIONS, data.permission.employeeStandardPermissions)
              ls.set(MENU, data.permission.menu)
              ls.set(KRUDS, data.permission.kruds)

              this.$store.commit(COMPANIES, data.companies)

              this.$store.commit(USER_EXTRA_ROLES, data.userExtraRoles)
              this.$store.commit(COMPANY, data.company)

              if (data.permission.microserviceSettings) {
                ls.set(MICROSERVICE_SETTINGS, data.permission.microserviceSettings)
              }
              let menuList = createList(data.permission.menu, null, data.permission.kruds)

              if(menuList){
                ls.set(MENU_LIST, menuList);
              }



              this.$store.commit(USER_INFO, {
                ...userInfo
              })

              ls.set(ACCESS_TOKEN, data.token)
              setToken(data.token)



              window.init = {
                user: userInfo,
                firebase_config: res.notify.firebaseConfig,
                microserviceSettings: data.permission.microserviceSettings ? data.permission.microserviceSettings : [],
                companies: data.companies

              }

            } else {
// console.log(res.notify.firebaseConfig)
              window.init = {
                ...ls.get(USER_INFO),
                firebase_config: res.notify.firebaseConfig,
                microserviceSettings: data.permission.microserviceSettings ? data.permission.microserviceSettings : [],
                companies:[]
              }
              this.$store.commit(USER_EXTRA_ROLES, data.userExtraRoles)
              ls.set(PERMISSIONS, data.permission.permissions)

              ls.set(COMPANY_MAX_PERMISSIONS, data.permission.companyMaxPermissions)
              ls.set(EMPLOYEE_STANDARD_PERMISSIONS, data.permission.employeeStandardPermissions)
              ls.set(MENU, data.permission.menu)
              ls.set(KRUDS, data.permission.kruds)

              ls.set(MICROSERVICE_SETTINGS, data.permission.microserviceSettings)
              ls.set(ACCESS_TOKEN, data.token)

              let menuList = createList(data.permission.menu, null, data.permission.kruds)

              if(menuList){
                ls.set(MENU_LIST, menuList);
              }
              if(menuList){
                ls.set(MENU_LIST, menuList);
              }


              setToken(data.token)




            }

            fetch('https://lms.amjilt.com/api/general/user-permissions', {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer '+token
              }
            }).then(response => {

              return response.json();
            })
              .then(data => {

                if (Array.isArray(data)) {

                  this.$store.commit(LMS_ROLES, data);

                }

              }).finally(()=>{
              // if(this.$route.path === "/erp"){
              //   const menu = ls.get(MENU);
              //   const dashboardIndex = menu.findIndex(m=>m.id === "2d8e57d2-42db-92ca-12fc-0282fb4f777c")
              //
              //   if(dashboardIndex >= 0){
              //
              //     if(menu[dashboardIndex].children){
              //       const financeIndex = menu[dashboardIndex].children.findIndex(m=>m.id === "a872f868-d600-99da-26a5-85b6bd4410ee");
              //       const permissions = ls.get(PERMISSIONS)
              //       if(financeIndex >= 0 && permissions.permissions){
              //
              //         if(permissions.permissions[menu[dashboardIndex].children[financeIndex].id] && permissions.permissions[menu[dashboardIndex].children[financeIndex].id].show){
              //
              //
              //           this.loading = false;
              //
              //           this.$router.replace("/dashboard/finance");
              //         }
              //       }
              //     }
              //   }
              // }


              this.loading = false;
            })

          } else {



            this.redirectToLogin();
          }
        }).catch((e)=>{
          // console.log("ERROR 1")
          // console.log(e)
         this.redirectToLogin();
        })
      } else {

        this.redirectToLogin();
      }
    }).catch((e)=>{
      // console.log("ERROR 2")
      // console.log(e)

      this.redirectToLogin();
    });

    if (navigator.platform.indexOf("Win") !== -1) {
      var header = document.querySelector("head");
      var style = document.createElement("style");
      style.innerHTML = '::-webkit-scrollbar-track{background-color:#f1f1f1}::-webkit-scrollbar-thumb{background-color:#888}::-moz-scrollbar-track{background-color:#f1f1f1}::-moz-scrollbar-thumb{background-color:#888}::-ms-scrollbar-track{background-color:#f1f1f1}::-ms-scrollbar-thumb{background-color:#888}::-webkit-scrollbar{width:6px;height:6px}::-moz-scrollbar{width:6px;height:6px}::-ms-scrollbar{width:6px;height:6px}';
      header.appendChild(style);
    }

  }
};
</script>
