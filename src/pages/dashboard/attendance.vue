<template>
  <div>
    <Head>
      <Title>Ирц</Title>
    </Head>
    <portal to="sub-top-menu" v-if="subTopMenus.length">
      <SubTopMenu :menu="subTopMenus" :collapsed="false" mode="horizontal"/>
    </portal>
    <portal to="header-left">
      <div className="page-title float-left">
        <div className="float-left pt-3">
          <h1 className="text-gray-700 dark:text-gray-200 text-base m-0 ">Ирц</h1>
          <h2 className="text-gray-400 text-xs m-0"><span>Хяналтын самбар</span></h2>
        </div>
      </div>
    </portal>
    <div className="dashboard_tab">
      <h1>Тун удахгүй</h1>
<!--      <Attendance :structs="rawStructs"/>-->
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
import {GET_STRUCTS_NOT_CHILD_COMPANY} from "~/graphql/queries";
import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
import SubTopMenu from "~/components/Menu/SubTopMenu.vue";
import {structCreator} from "~/utils/struct";

export default {
  name: "dashboard",
  mixins: [pageMixin],
  components: {
    SubTopMenu,
    Finance,
    Attendance,
    HumanResources,
    Market,
    SearchOutlined,
  },
  mounted() {
    this.getStructData();
  },
  data() {
    let user = ls.get(USER_INFO);
    return {

      structs: [],
      user,
      rawStructs: [],
    };
  },
  methods: {
    getStructData() {
      this.$apollo
        .query({
          query: GET_STRUCTS_NOT_CHILD_COMPANY,
          fetchPolicy: "no-cache",
          variables: {company_id: this.user.company_id},
        })
        .then((res) => {


          this.rawStructs = res.data["view_struct"].map(struct => {
            return {
              value: struct.id,
              label: struct.struct_name
            }
          })
          this.structs = structCreator((res.data["view_struct"]))
        });
    },
  }
}
</script>

<style scoped>

</style>
