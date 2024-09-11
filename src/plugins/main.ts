import { reactive } from "vue";
import { customElementList } from '~/dataform_custom/index.js'
import { gridCustomElementList } from '~/datagrid_custom/index.js'
/*
* Plugins
* */

import VueGtag from 'vue-gtag-next'
import PortalVue from 'portal-vue'
// import {i18n} from '~@lambda-platform/lambda-vue/src/locale';

import {installDataGrid} from '@lambda-platform/lambda-vue/src/modules/datagrid';
import {installDataForm} from '@lambda-platform/lambda-vue/src/modules/dataform';
import {installChart} from '@lambda-platform/lambda-vue/src/modules/chart';
import {installNotification} from '@lambda-platform/lambda-vue/src/modules/notify';
import {installKrud} from '~/components/krud';



 // Replace 'Asia/Shanghai' with your desired timezone

/*
* Local plugins
* */

import apolloProvider from  "./core/apollo"
import store from '../store/index';

import { defineNuxtPlugin } from "#app";
import { initInlineSvg } from "./core/inline-svg";
import { initFilters } from "./core/filters";
import { initAxios } from "./core/axios";
import VueBlocksTree from 'vue3-blocks-tree';
let defaultoptions = {treeName:'blocks-tree'}

declare interface AppState {
  theme?: string;
  darkTheme?: boolean;
}
import setupDefaultSetting from '~/utils/setupDefaultSetting'
import {i18n} from '~/locale'
import Antd from 'ant-design-vue';

import '~/assets/styles/theme/ant_light.less';
import '~/assets/styles/theme/ant_dark.less';
import '~/assets/styles/app.scss';
// import '~/assets/styles/components/loading.css';
// import   '@/assets/styles/tailwind.css'
//   // '~/assets/styles/theme/ant.less',
//   // '~/assets/styles/theme/ant_light.less',
//   // '~/assets/styles/theme/ant_dark.less',
// import   '@lambda-platform/lambda-vue/src/modules/datagrid/scss/style.scss';
// import   '@lambda-platform/lambda-vue/src/modules/datagrid/scss/theme/_material.scss';
// import   '@lambda-platform/lambda-vue/src/modules/datagrid/scss/theme/_light.scss';
// import   '@lambda-platform/lambda-vue/src/modules/datagrid/scss/theme/_dark.scss';
// import  '~/assets/styles/app.scss';
//
import { base_url } from '~/consts/const'
import { initFontawesome } from "./core/fontawesome";
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {IMAGE_URL} from "~/graphql/home";

import { EventBusService } from '~/modules/workflow/workflow/services/event-bus.service';
import batchDirective from '~/modules/workflow/workflow/directives/batch.directive';

const focusDirective = {
  mounted(el) {
    el.focus();
  },
};
export default defineNuxtPlugin(async ({ vueApp: app }) => {
  app.use(apolloProvider);
  app.directive('focus', focusDirective);

  app.use(Antd);
  app.use(VueAwesomeSwiper);
  app.use(i18n);
  app.config.globalProperties.$customElementList = customElementList
  app.config.globalProperties.$customDataGridElementList = gridCustomElementList
  app.config.globalProperties.$base_url = base_url
  app.config.globalProperties.$eventBusService = new EventBusService();

  app.config.globalProperties.$IMAGE_URL = IMAGE_URL
  //
  initAxios();
  initInlineSvg(app);
  initFilters(app);
  initFontawesome(app);

  /* LAMBDA */
  installKrud(app)
  app.provide('customElementList', customElementList)
  installDataForm(app)
  installDataGrid(app)
  installChart(app)
  installNotification(app)
  //
  //
  app.directive('batch', batchDirective);


  app.use(store);



  app.use(PortalVue);
  app.use(VueBlocksTree,defaultoptions);


  setupDefaultSetting();
  app.use(VueGtag, {
    property: {
      id: 'G-0DTSSXVQQT'
    }
  });

  return {
    provide: {
      appState: reactive({
        theme: "lara-light-indigo",
        darkTheme: false,
      }) as AppState,
    },
  };
});

declare module "#app" {
  interface NuxtApp {
    $appState: AppState;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $appState: AppState;
  }
}

export {};




