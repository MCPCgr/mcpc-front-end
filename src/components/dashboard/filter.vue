<template>
  <div class="flex items-center space-x-3 mb-6 justify-between">
    <div class="flex overflow-hidden items-center">
      <div class="dashboard_datepicker mr-2">

        <a-range-picker v-model:value="searchRange" :allow-clear="false" @change="changeDates" :locale="locale">
          <template #renderExtraFooter>

              <a-segmented v-model:value="currentRange" :options="dateRangesLabels" @change="handlerFilter" />

          </template>
        </a-range-picker>
        <!--        <a-date-picker v-model:value="searchData.start_date" placeholder="Эхлэх огноо" format="YYYY-MM-DD"/>-->

        <!--        <a-date-picker v-model:value="searchData.end_date" placeholder="Дуусас огноо" format="YYYY-MM-DD"/>-->
      </div>
      <div class="mr-2" v-if="this.selectedCompanies.length === 1">

        <a-tree-select v-model:value="searchData.struct_id"
                       show-search

                       placeholder="Салбар нэгж"

                       allow-clear
                       tree-default-expand-all
                       :tree-data="structs"
                       style="width: 210px"
        >
        </a-tree-select>
      </div>
      <div class="">
        <a-button class="" type="primary" style="border-radius: 96px; padding: 8px;" @click="createDashboard">
          <img class="w-3.5 h-3.5" src="/amjilt-erp/icon/search.svg"/>
        </a-button>

      </div>
      <div class=" ml-2" >
        <a-segmented v-model:value="currentRange" :options="dateRangesLabels" @change="handlerFilter" />

      </div>
    </div>
    <a-dropdown :overlayStyle="{ minWidth: '300px' }" >
      <div class="flex -space-x-4 ">
        <div class="w-10 h-10 border-2 border-white rounded-full bg-white dark:border-gray-800 overflow-hidden"
             v-for="com in selectedCompanies.slice(0, 3)" :key="com.index">
          <img class="" :src="$base_url+com.company_logo" alt="avatar" v-if="com.company_logo">
          <div class="avatar dashboard-avatar" v-else>
            <inline-svg src="/assets/icons/duotone/Home/Building.svg"/>
          </div>
        </div>
        <a
          class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
          href="#" v-if="selectedCompanies.length >= 4">+{{ selectedCompanies.length - 1 }}</a>
        <div v-if="selectedCompanies.length === 0">
          Байгууллага сонгох
        </div>
      </div>
      <template #overlay>
        <ul
                class="companies-list w-full bg-white dark:bg-slate-800"

        >
          <li class="flex items-center w-full px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600" v-for="com in companies" :key="com.index" @click="selectCompany(com)">

              <div :class="`avatar ${com.company_logo ? 'company-logo' : ''}`">
                  <img :src="$base_url+com.company_logo" alt="avatar" v-if="com.company_logo">
                  <inline-svg src="/assets/icons/duotone/Home/Building.svg" v-else/>
              </div>
              <div class="company-name flex-grow pl-4 flex">
             <span class="flex-grow">
               {{ com.company_name }}
             </span>

                  <span >
               <span :class="`ant-checkbox ${com.selected ? 'ant-checkbox-checked' : ''}`">
              <span class="ant-checkbox-inner"></span>
             </span>
           </span>
              </div>


          </li>

        </ul>

      </template>
    </a-dropdown>
  </div>
</template>
<script>
import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";

import dayjs from '@lambda-platform/lambda-vue/src/utils/dayjs'

import {COMPANIES} from "~/store/mutation-types-tatatonga";
import mn_MN from "@lambda-platform/lambda-vue/src/antlocale/date_mn_MN";
export default {
  props:["structs"],
  emits: ["createDashboard", "selectCompany"],
  components:{

  },
  data() {

    let user = ls.get(USER_INFO);
    const currentDate = dayjs();
    let companies = ls.get(COMPANIES).map(com => {
      return {...com, selected: true}
    });
    const startOfMonth = dayjs().startOf('month');
    const endOfMonth = dayjs().endOf('month');


    return {
      companies,
      user,
      loading: true,
      searchRange: [startOfMonth, endOfMonth],
      searchData: {
        companyIDs: [user.company_id],
        start_date: startOfMonth,
        end_date: endOfMonth,
      },
      currentRange:"Энэ сар",
      locale:mn_MN

    }
  },
  computed: {
    selectedCompanies() {
      return this.companies.filter(com => com.selected);
    },
      dateRanges(){
        return [
            {
                label:"Өчигдөр",
                handler:this.filterYesterday
            },
            {
                label:"Өнөөдөр",
                handler:this.filterToday
            },
            {
                label:"Энэ 7",
                handler:this.filterThisWeek
            },
            {
                label:"Өмнөх 7",
                handler:this.filterLastWeek
            },
            {
                label:"Энэ сар",
                handler:this.filterThisMonth
            },
            {
                label:"Өмнөх сар",
                handler:this.filterLastMonth
            },
        ]
      },
      dateRangesLabels(){
        return this.dateRanges.map(l=>l.label)
      }
  },
  methods: {
      handlerFilter(label){
         const index = this.dateRanges.findIndex(r=>r.label === label);

         if(index >= 0){
             this.dateRanges[index].handler();
         }
      },
    filterYesterday(){
      const yesterday = dayjs().subtract(1, 'day');
      this.searchRange = [yesterday, yesterday];
      this.searchData.start_date = yesterday;
      this.searchData.end_date = yesterday;
     this.createDashboard();
    },
    filterToday(){
      const today = dayjs();
      this.searchRange = [today, today];
      this.searchData.start_date = today;
      this.searchData.end_date = today;
     this.createDashboard();
    },
    filterThisWeek(){
      console.log("test test ")
      const startOfWeek = dayjs().startOf('isoWeek');
      const endOfWeek = dayjs().endOf('isoWeek');
      this.searchRange = [startOfWeek, endOfWeek];
      this.searchData.start_date = startOfWeek;
      this.searchData.end_date = endOfWeek;
     this.createDashboard();
    },
    filterLastWeek(){
      const startOfLastWeek = dayjs().subtract(1, 'week').startOf('isoWeek');
      const endOfLastWeek = dayjs().subtract(1, 'week').endOf('isoWeek');
      this.searchRange = [startOfLastWeek, endOfLastWeek];
      this.searchData.start_date = startOfLastWeek;
      this.searchData.end_date = endOfLastWeek;
      this.createDashboard();
    },
    filterThisMonth(){
      const startOfMonth = dayjs().startOf('month');
      const endOfMonth = dayjs().endOf('month');
      this.searchRange = [startOfMonth, endOfMonth];
      this.searchData.start_date = startOfMonth;
      this.searchData.end_date = endOfMonth;
      this.createDashboard();
    },
    filterLastMonth(){
      const startOfLastMonth = dayjs().subtract(1, 'month').startOf('month');
      const endOfLastMonth = dayjs().subtract(1, 'month').endOf('month');
      this.searchRange = [startOfLastMonth, endOfLastMonth];
      this.searchData.start_date = startOfLastMonth;
      this.searchData.end_date = endOfLastMonth;
      this.createDashboard();
    },
    changeDates() {
      this.searchData.start_date = this.searchRange[0];
      this.searchData.end_date = this.searchRange[1];
    },
    selectCompany(com) {
      com.selected = !com.selected;
      this.$emit("selectCompany", this.selectedCompanies);
      this.createDashboard();
    },
    createDashboard() {
      let companyIDs = this.selectedCompanies.map(com => com.company_id);
      this.searchData.companyIDs = companyIDs;
      this.$emit("createDashboard", this.searchData)
    }
  },
  mounted() {
    this.$emit("selectCompany", this.selectedCompanies)
    this.createDashboard();
  }

}

</script>
<style scoped>

</style>
