<template>
  <section class="bg-gray-100 dark:bg-slate-900 xl:py-18 py-14 flex justify-center">
    <div class="absolute top-0 inset-x-0 hidden sm:block">
      <img src="/amjilthome/images/white-wave.svg" alt="svg" class="w-full -scale-x-100">
    </div>
    <div class="container max-w-4xl px-6 mx-auto aos-init aos-animate" data-aos="fade-up" data-aos-duration="1500">
      <div class="mb-6 bg-gray-200 p-4 rounded-lg">
        <p class="text-lg font-semibold mb-2">{{ $t("home.solveHasSolution") }}</p>
        <p>
          {{ $t("home.introductionText") }}
        </p>
      </div>

      <div class="mb-0  bg-white dark:bg-slate-600 p-4 rounded-lg relative">
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="Ажилтан">
            <dataform
              ref="form"
              :url="base_url"
              :hideTitle="true"
              schemaID="826"
              :public="true"
              :onSuccess="onSuccess"
            >
            </dataform>
          </a-tab-pane>
          <a-tab-pane key="2" tab="Байгууллага" force-render>
            <dataform
              ref="form"
              :url="base_url"
              :hideTitle="true"
              schemaID="827"
              :public="true"
              :onSuccess="onSuccess"
            >
            </dataform>
          </a-tab-pane>

        </a-tabs>
        <div class="text-right md:absolute md:bottom-10 md:right-10">
          <nuxt-link to="/login" >Нэвтрэх хуудас</nuxt-link>
        </div>

      </div>

    </div>
  </section>
</template>

<script lang="ts">
import ls from "~/utils/Storage";


import { LAMBDA_CONFIG } from '~/store/mutation-types'
import { MENU } from '~/store/mutation-types'
import HomeMenuRender from '~/components/Menu/HomeMenuRender.vue'
import { darkMode } from '~/store/useSiteSettings'
import {base_url} from "~/consts/const";
import { isMobile } from '~/utils/device'


export default {
  name: 'index',
  components:{
    HomeMenuRender
  },
  methods:{
    onSuccess () {
    },
  },
  beforeCreate() {
    definePageMeta({
      layout: 'home',
    })
  },
  data(){
    const LambdaConfig = ls.get(LAMBDA_CONFIG);
    const menu = ls.get(MENU);
    return {
      isMobile,
      menu,
      title: LambdaConfig.title,
      logo: LambdaConfig.logo,
      logoDark: LambdaConfig.logo_dark,
      base_url:base_url,
      darkMode,
      activeKey:"1"
    }
  }
}
</script>
<style lang="scss">
.company-create{
  .dataform-body .two-column-form-right {
    height: 570px !important;
    width: 100%;
  }
}
</style>
