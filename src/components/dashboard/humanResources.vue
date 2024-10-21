<template>
  <div>
    <div class="flex items-center space-x-3 mb-6">
      <div class="dashboard_datepicker">
        <a-space direction="vertical" :size="12">
          <a-range-picker v-model:value="value4" :format="dateFormat" />
        </a-space>
      </div>
      <div>
        <a-select
          v-model:value="value"
          show-search
          placeholder="Select a person"
          style="width: 200px"
          :options="options"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
        ></a-select>
      </div>
      <div class="">
        <a-button class="" type="primary" style="border-radius: 96px; padding: 8px;">
          <img class="w-3.5 h-3.5" src="/amjilt-erp/icon/search.svg"/>
        </a-button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pb-8">
      <!-- Хүний нөөц -->
      <div class="bg-white rounded-lg p-3 dashboard_shadow" style="background-color: #F9FAFF;">
        <div class="flex items-center justify-between pb-2">
          <div class="text-xs font-semibold text-second_color">Хүний нөөц</div>
          <div class="bg-rose-500 p-2 rounded-full">
            <img class="w-3 h-3" src="/amjilt-erp/icon/user.svg"/>
          </div>
        </div>
        <div class="2xl:flex space-y-2 2xl:space-y-0 2xl:space-x-2 w-full">
          <div class="rounded-lg py-2 w-full" style="background: #B2C5F3;">
            <div class="text-[10px] font-semibold text-white text-center leading-3 pb-1">Нийт ажилтан</div>
            <div class="text-xl font-bold text-second_color text-center">32</div>
          </div>
          <div class="flex space-x-2">
            <div class="rounded-lg p-2 w-full bg-white">
              <div class="text-[10px] font-semibold text-second_color text-center pb-3">Эрэгтэй</div>
              <div class="text-xs text-blue-500 bg-slate-100 font-semibold p-1 rounded text-center">10</div>
            </div>
            <div class="rounded-lg p-2 w-full bg-white">
              <div class="text-[10px] font-semibold text-second_color text-center pb-3">Эмэгтэй</div>
              <div class="text-xs text-blue-500 bg-slate-100 font-semibold p-1 rounded text-center">22</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Олгосон цалин -->
      <div class="bg-white rounded-lg p-3 dashboard_shadow">
        <div class="flex items-center justify-between pb-4">
          <div class="text-xs font-semibold text-second_color">Олгосон цалин</div>
          <div>
            <div class="bg-amber-500 p-2 rounded-full" >
              <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
            </div>
          </div>
        </div>
        <div class="text-2xl font-bold text-second_color text-center pb-2">59,500,000 </div>
      </div>
      <!-- Дундаж цалин -->
      <div class="bg-white rounded-lg p-3 dashboard_shadow">
        <div class="flex items-center justify-between pb-4">
          <div class="text-xs font-semibold text-second_color">Дундаж цалин</div>
          <div>
            <div class="bg-blue-600 p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
            </div>
          </div>
        </div>
        <div class="text-2xl font-bold text-second_color text-center pb-2">1,500,000</div>
      </div>
      <!-- Нийт НДШ -->
      <div class="bg-white rounded-lg p-3 dashboard_shadow">
        <div class="flex items-center justify-between pb-4">
          <div class="text-xs font-semibold text-second_color">Нийт НДШ</div>
          <div>
            <div class="bg-amber-400 p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
            </div>
          </div>
        </div>
        <div class="text-2xl font-bold text-second_color text-center pb-2">11,532,450</div>
      </div>
      <!-- Нийт ХХОАТ -->
      <div class="bg-white rounded-lg p-3 dashboard_shadow">
        <div class="flex items-center justify-between pb-4">
          <div class="text-xs font-semibold text-second_color">Нийт ХХОАТ</div>
          <div>
            <div class="bg-blue-500 p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
            </div>
          </div>
        </div>
        <div class="text-2xl font-bold text-second_color text-center pb-2">1,532,450 </div>
      </div>
    </div>

    <!-- Цалин салбар нэгж -->
    <div class="bg-white rounded-xl p-4 dashboard_shadow h-96 mb-8">
      <div class="text-base font-semibold text-second_color">Цалин салбар нэгж</div>
    </div>

    <!--  -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <!-- Ажилтан салбар нэгжээр -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow ">
        <div class="text-sm font-semibold text-second_color ">
          Ажилтан салбар нэгжээр
          <Chart src="https://erp.mcpc.mn/lambda/puzzle/schema-public/chart/994" projectDomain="https://erp.mcpc.mn" :hideTitle="true" :filters="companyFilter"></Chart>
        </div>
      </div>
      <!-- Даатгуулагчийн төрлөөр -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow ">
        <div class="text-sm font-semibold text-second_color ">Даатгуулагчийн төрлөөр
          <Chart src="https://erp.mcpc.mn/lambda/puzzle/schema-public/chart/988" projectDomain="https://erp.mcpc.mn" :hideTitle="true" :filters="companyFilter" :labels="insured_types"></Chart>
        </div>
      </div>
      <!-- Ажилласан хугацаагаар -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow ">
        <div class="text-sm font-semibold text-second_color ">Ажилласан хугацаагаар

          <Chart src="https://erp.mcpc.mn/lambda/puzzle/schema-public/chart/990" projectDomain="https://erp.mcpc.mn" :hideTitle="true" :filters="companyFilter" ></Chart>

        </div>
      </div>
      <!-- Ажилтны төрлөөр -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow h-full">
        <div class="text-sm font-semibold text-second_color ">Ажилтны төрлөөр
          <Chart src="https://erp.mcpc.mn/lambda/puzzle/schema-public/chart/991" projectDomain="https://erp.mcpc.mn" :hideTitle="true" :filters="companyFilter" ></Chart>

        </div>
      </div>
      <!-- Ажилтан боловсролоор -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow h-full">
        <div class="text-sm font-semibold text-second_color ">Ажилтан боловсролоор
          <Chart src="https://erp.mcpc.mn/lambda/puzzle/schema-public/chart/992" projectDomain="https://erp.mcpc.mn" :hideTitle="true" :filters="companyFilter" ></Chart>

        </div>
      </div>
      <!--  -->
      <div class="space-y-4">
        <!-- Ажилтан боловсролоор -->
        <div class="rounded-lg p-3 dashboard_shadow" style="background-color: #F9FAFF;">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Ажилтан боловсролоор</div>
            <div class="bg-primary_color p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/user.svg"/>
            </div>
          </div>
          <div class="flex space-x-2 w-full">
            <div class="rounded-lg py-3 w-full" style="background: #B2C5F3;">
              <div class="text-[11px] font-semibold text-white text-center leading-3 pb-2">Ажиллаж байгаа</div>
              <div class="text-xl font-bold text-second_color text-center">32</div>
            </div>
            <div class="flex flex-col rounded-lg p-2 w-full bg-white">
              <div class="text-[11px] font-semibold text-second_color text-center pb-2">Ажлаас чөлөөлсөн</div>
              <div class="flex items-end h-full">
                <div class="text-xs text-blue-500 bg-slate-100 font-semibold p-1 rounded text-center w-full">10</div>
              </div>
            </div>
            <div class="flex flex-col rounded-lg p-2 w-full bg-white">
              <div class="text-[11px] font-semibold text-second_color text-center pb-2">Урт хугацааны чөлөөтэй</div>
              <div class="flex items-end h-full">
                <div class="text-xs text-blue-500 bg-slate-100 font-semibold p-1 rounded text-center w-full">10</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Гэрлэлт, хүүхдийн тоо -->
        <div class="rounded-lg p-3 dashboard_shadow" style="background-color: #F9FAFF;">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Гэрлэлт, хүүхдийн тоо</div>
            <div class="bg-primary_color p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/user.svg"/>
            </div>
          </div>
          <div class="flex space-x-2 w-full">
            <div class="rounded-lg py-3 w-full" style="background: #B2C5F3;">
              <div class="text-[11px] font-semibold text-white text-center leading-3 pb-2">Гэрлэсэн</div>
              <div class="text-xl font-bold text-second_color text-center">32</div>
            </div>
            <div class="flex flex-col rounded-lg p-2 w-full bg-white">
              <div class="text-[11px] font-semibold text-second_color text-center pb-2">Хүүхэдтэй</div>
              <div class="flex items-end h-full">
                <div class="text-xs text-blue-500 bg-slate-100 font-semibold p-1 rounded text-center w-full">10</div>
              </div>
            </div>
            <div class="flex flex-col rounded-lg p-2 w-full bg-white">
              <div class="text-[11px] font-semibold text-second_color text-center pb-2">Нийт хүүхэд</div>
              <div class="flex items-end h-full">
                <div class="text-xs text-blue-500 bg-slate-100 font-semibold p-1 rounded text-center w-full">10</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Бусад -->
        <div class="rounded-lg p-3 dashboard_shadow" style="background-color: #F9FAFF;">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Бусад</div>
            <div class="bg-primary_color p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/user.svg"/>
            </div>
          </div>
          <div class="flex space-x-2 w-full">
            <div class="flex flex-col rounded-lg p-2 w-full bg-white">
              <div class="text-[11px] font-semibold text-second_color text-center pb-2">Зөрчилтэй</div>
              <div class="flex items-end h-full">
                <div class="text-xs text-blue-500 bg-slate-100 font-semibold p-1 rounded text-center w-full">1</div>
              </div>
            </div>
            <div class="flex flex-col rounded-lg p-2 w-full bg-white">
              <div class="text-[11px] font-semibold text-second_color text-center pb-2">Цэргийн алба хаасан</div>
              <div class="flex items-end h-full">
                <div class="text-xs text-blue-500 bg-slate-100 font-semibold p-1 rounded text-center w-full">10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchOutlined from "@ant-design/icons-vue";
import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";

import {GET_INSURED_TYPE} from '~/graphql/queries'

var tempTypes = [
  {
    "id": 36,
    "insured_type": "69"
  },
  {
    "id": 35,
    "insured_type": "68"
  },
  {
    "id": 34,
    "insured_type": "67"
  },
  {
    "id": 33,
    "insured_type": "66"
  },
  {
    "id": 32,
    "insured_type": "63"
  },
  {
    "id": 31,
    "insured_type": "62"
  },
  {
    "id": 30,
    "insured_type": "61"
  },
  {
    "id": 29,
    "insured_type": "26"
  },
  {
    "id": 28,
    "insured_type": "51"
  },
  {
    "id": 27,
    "insured_type": "42"
  },
  {
    "id": 26,
    "insured_type": "41"
  },
  {
    "id": 25,
    "insured_type": "53"
  },
  {
    "id": 24,
    "insured_type": "8"
  },
  {
    "id": 23,
    "insured_type": "11"
  },
  {
    "id": 22,
    "insured_type": "43"
  },
  {
    "id": 21,
    "insured_type": "39"
  },
  {
    "id": 20,
    "insured_type": "38"
  },
  {
    "id": 17,
    "insured_type": "32"
  },
  {
    "id": 16,
    "insured_type": "31"
  },
  {
    "id": 15,
    "insured_type": "30"
  },
  {
    "id": 14,
    "insured_type": "29"
  },
  {
    "id": 13,
    "insured_type": "28"
  },
  {
    "id": 12,
    "insured_type": "50"
  },
  {
    "id": 11,
    "insured_type": "14"
  },
  {
    "id": 10,
    "insured_type": "25"
  },
  {
    "id": 9,
    "insured_type": "24"
  },
  {
    "id": 8,
    "insured_type": "23"
  },
  {
    "id": 7,
    "insured_type": "21"
  },
  {
    "id": 6,
    "insured_type": "17"
  },
  {
    "id": 5,
    "insured_type": "6"
  },
  {
    "id": 4,
    "insured_type": "20"
  },
  {
    "id": 1,
    "insured_type": "1"
  },
  {
    "id": 38,
    "insured_type": "71"
  },
  {
    "id": 19,
    "insured_type": "37"
  },
  {
    "id": 18,
    "insured_type": "34"
  },
  {
    "id": 3,
    "insured_type": "22"
  },
  {
    "id": 2,
    "insured_type": "40"
  },
  {
    "id": 37,
    "insured_type": "70"
  }
];
export default {
  name: "humanResources",
  components: {
    SearchOutlined,
  },
  data(){
    let user = ls.get(USER_INFO);
    return {
      user:user,
      insured_types:[]
    }
  },
  computed:{
    companyFilter() {
      return [{"column": "company_id", "condition": "equals", "value": `${this.user.company_id}` }]
    },
  },
  mounted() {
  //  this.getInsuredTypes();
    this.insured_types = tempTypes.map(insured_type=>{
      return {
        value:insured_type.id,
        label:insured_type.insured_type
      }
    })
  },
  methods:{
    getInsuredTypes(){

      this.$apollo.query(GET_INSURED_TYPE, {
        client: "financeClient",
        fetchPolicy: "no-cache",

      }).then((res) => {
        this.insured_types = res.data["lut_salary_insured_type"].map(insured_type=>{
          return {
            value:insured_type.id,
            label:insured_type.insured_type
          }
        })
      });
    }
  }
}
</script>

<style scoped>

</style>
