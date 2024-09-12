<template>

  <div class="grid grow grid-nogutter module-page container pb-16 px-4 mx-auto">
    <Head>
      <Title>{{title}}</Title>
    </Head>
    <portal to="header-left">
      <div class="flex-grow"></div>
    </portal>

    <div v-if="permissions && permissions.permissions">

      <img :src="`${logoDark}`" v-if="darkMode" class="logo-light" :alt="title">
      <img :src="`${logo}`"   v-if="!darkMode" class="logo-dark" :alt="title">
      <nav class="module-navigation">



        <a-alert message="Таныг ямар нэгэн байгууллага ажилтнаар бүртгээгүй байна" type="warning" v-if="userInfo.role !== 5 && (userInfo.company_id === null || userInfo.company_id === '')" />
        <div :class="isMobile ? 'grid grid-cols-1  gap-4' : 'grid grid-cols-3  gap-4'" v-else>
          <HomeMenuRender v-for="m in menu" :key="m.index"  :item="m" :cruds="kruds" :permissions="permissions.permissions"   />
        </div>
      </nav>
    </div>
    <div v-else class="pt-20">
      <a-alert message="Хандах эрх байхгүй байна" type="warning"  />
    </div>
  </div>
</template>

<script lang="ts">
import ls from "../../utils/Storage";

import {LAMBDA_CONFIG, USER_INFO} from '~/store/mutation-types'
import { KRUDS, MENU, PERMISSIONS } from '~/store/mutation-types'
import HomeMenuRender from '~/components/Menu/HomeMenuRender.vue'
import { darkMode } from '~/store/useSiteSettings'
import {base_url} from "~/consts/const";
import { isMobile } from '~/utils/device'
import {useRouter} from "vue-router";

export default {
  name: 'index',
  components:{
    HomeMenuRender
  },
  setup (props, { emit }) {

    const router = useRouter();

    definePageMeta({
      layout: 'module',

    })
    const userInfo = ls.get(USER_INFO);
    const kruds = ls.get(KRUDS)
    const permissions = ls.get(PERMISSIONS)
    const LambdaConfig = ls.get(LAMBDA_CONFIG)
    const menu = ls.get(MENU);

    // const dashboardIndex = menu.findIndex(m=>m.id === "2d8e57d2-42db-92ca-12fc-0282fb4f777c")
    //
    // if(dashboardIndex >= 0){
    //
    //   if(menu[dashboardIndex].children){
    //     const financeIndex = menu[dashboardIndex].children.findIndex(m=>m.id === "a872f868-d600-99da-26a5-85b6bd4410ee");
    //     if(financeIndex >= 0 && permissions.permissions){
    //      if(permissions.permissions[menu[dashboardIndex].children[financeIndex].id] && permissions.permissions[menu[dashboardIndex].children[financeIndex].id].show){
    //        router.push("/dashboard/finance");
    //      }
    //     }
    //   }
    // }

    let showCompanyWarning = false;

    const subscriptionMenuIDS = [
      "2d8e57d2-42db-92ca-12fc-0282fb4f777c",
      "28ac034c-1edf-6ba5-a4e5-a0e10c59d4b8",
      "cb0e30ba-9bcf-26d2-c330-5cb2fcb93954",
    ]



    return {
      isMobile,
      menu,
      permissions,
      kruds,
      userInfo,
      title: LambdaConfig.title,
      logo: "/amjilt-erp/images/mcpc-gr.svg",
      logoDark: "/amjilt-erp/images/mcpc-gr-white.svg",
      // logo: LambdaConfig.logo,
      // logoDark: LambdaConfig.logo_dark,
      base_url:base_url,
      darkMode,
      subscriptionMenuIDS,

    }
  }
}
</script>

<style scoped>

</style>
