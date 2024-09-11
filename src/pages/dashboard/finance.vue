<template>
  <div>
    <Head>
      <Title>Санхүү</Title>
    </Head>
    <portal to="sub-top-menu" v-if="subTopMenus.length">
      <SubTopMenu :menu="subTopMenus" :collapsed="false" mode="horizontal"/>
    </portal>
    <portal to="header-left">
      <div class="page-title float-left">
        <div class="float-left pt-3">
          <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">Санхүү</h1>
          <h2 class="text-gray-400 text-xs m-0"><span>Хяналтын самбар</span></h2>
        </div>
      </div>
    </portal>
    <div class="dashboard_tab">
      <Finance />
    </div>
  </div>
</template>

<script>
import pageMixin from "~/mixins/page";

import SearchOutlined from '@ant-design/icons-vue';
import Market from "~/components/dashboard/market.vue";
import HumanResources from "~/components/dashboard/humanResources.vue";
import Attendance from "~/components/dashboard/attendance.vue";
import Finance from "~/components/dashboard/finance.vue";

import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
import SubTopMenu from "~/components/Menu/SubTopMenu.vue";

export default {
  name: "dashboard",
  mixins:[pageMixin],
  components: {
    SubTopMenu,
    Finance,
    Attendance,
    HumanResources,
    Market,
    SearchOutlined,
  },

  data() {
    let user = ls.get(USER_INFO);
    return {

      user,

    };
  },
  methods:{

  }
}
</script>

<style scoped>

</style>
