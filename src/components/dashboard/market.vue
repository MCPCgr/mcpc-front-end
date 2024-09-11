<template>
  <div>
    <Filter @selectCompany="selectCompany" @createDashboard="createDashboard" :structs="structs"/>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pb-8">
      <!-- Посын борлуулалт -->
      <div class="bg-white rounded-lg p-3 dashboard_shadow">
        <div class="flex items-center justify-between pb-2">
          <div class="text-xs font-semibold text-second_color">Посын борлуулалт</div>
          <div class="bg-sky-400 p-2 rounded-full">
            <img class="w-3 h-3" src="/amjilt-erp/icon/cash-register.svg"/>
          </div>
        </div>
        <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $currencyMNT(POSsales) }}</div>
<!--        <div class="text-xs text-second_color text-center pb-1">Өмнөх сараас-->
<!--          <span class="pl-2" style="font-weight: bold; color: #0AEF13;">+1,450,340</span>-->
          <!--              <span class="pl-2" style="font-weight: bold; color: #EF5D28;">-450,340</span>-->
<!--        </div>-->
      </div>
      <!-- Гэрээт харилцагчийн борлуулалт -->
      <div class="bg-white rounded-lg p-3 dashboard_shadow">
        <div class="flex items-center justify-between pb-2">
          <div class="text-xs font-semibold text-second_color">Нийт борлуулалт</div>
          <div>
            <div class="bg-orange-500 p-2 rounded-full" style="width: 28px; height: 28px;">
              <img class="w-3 h-3" src="/amjilt-erp/icon/truck.svg"/>
            </div>
          </div>
        </div>
        <div class="text-2xl font-bold text-second_color text-center pb-2"> {{ $currencyMNT(sales) }}</div>
<!--        <div class="text-xs text-second_color text-center pb-1">Өмнөх сараас-->
<!--          &lt;!&ndash;              <span class="pl-2" style="font-weight: bold; color: #0AEF13;">+1,450,340</span>&ndash;&gt;-->
<!--          <span class="pl-2" style="font-weight: bold; color: #EF5D28;">-450,340</span>-->
<!--        </div>-->
      </div>
      <!-- Нийт худалдан авалт -->
      <div class="bg-white rounded-lg p-3 dashboard_shadow">
        <div class="flex items-center justify-between pb-2">
          <div class="text-xs font-semibold text-second_color">Нийт худалдан авалт</div>
          <div>
            <div class="bg-blue-600 p-2 rounded-full" style="width: 28px; height: 28px;">
              <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
            </div>
          </div>
        </div>
        <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $currencyMNT(purchase) }} </div>
<!--        <div class="text-xs text-second_color text-center pb-1">Өмнөх сараас-->
          <!--              <span class="pl-2" style="font-weight: bold; color: #0AEF13;">+1,450,340</span>-->
<!--          <span class="pl-2" style="font-weight: bold; color: #EF5D28;">-450,340</span>-->
<!--        </div>-->
      </div>
      <!-- Дотоод үйлдвэрлэл -->
      <div class="bg-white rounded-lg p-3 dashboard_shadow ">
        <div class="flex items-center justify-between pb-2">
          <div class="text-xs font-semibold text-second_color">Дотоод үйлдвэрлэл</div>
          <div>
            <div class="bg-amber-400 p-2 rounded-full" style="width: 28px; height: 28px;">
              <img class="w-3 h-3" src="/amjilt-erp/icon/store.svg"/>
            </div>
          </div>
        </div>
        <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $currencyMNT(production) }} </div>
<!--        <div class="text-xs text-second_color text-center pb-1">Өмнөх сараас-->
<!--          <span class="pl-2" style="font-weight: bold; color: #0AEF13;">+450,340</span>-->
          <!--              <span class="pl-2" style="font-weight: bold; color: #EF5D28;">-450,340</span>-->
<!--        </div>-->
      </div>
      <!-- Дотоод зарлага -->
      <div class="bg-white rounded-lg p-3 dashboard_shadow">
        <div class="flex items-center justify-between pb-2">
          <div class="text-xs font-semibold text-second_color">Дотоод хөдөлгөөн</div>
          <div>
            <div class="bg-blue-500 p-2 rounded-full" style="width: 28px; height: 28px;">
              <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
            </div>
          </div>
        </div>
        <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $currencyMNT(innerTransfer) }} </div>
<!--        <div class="text-xs text-second_color text-center pb-1">Өмнөх сараас-->
<!--          &lt;!&ndash;              <span class="pl-2" style="font-weight: bold; color: #0AEF13;">+450,340</span>&ndash;&gt;-->
<!--          <span class="pl-2" style="font-weight: bold; color: #EF5D28;">-450,340</span>-->
<!--        </div>-->
      </div>
    </div>

    <!-- Борлуулалт -->
    <div class="grid grid-cols-12 gap-6 mb-8">
      <div class="col-span-12 xl:col-span-9">
        <div class="bg-white rounded-xl p-4 dashboard_shadow h-full">
          <div class="text-base font-semibold text-second_color">Борлуулалт</div>

          <Chart
            src="https://pos.tatatonga.com/lambda/puzzle/schema-public/chart/1032"
            projectDomain="https://pos.tatatonga.com"
            :hideTitle="true"
            :filters="[...companyFilter, ...posDate]"
            v-if="!loading"
            ></Chart>
        </div>
      </div>
      <div class="col-span-12 xl:col-span-3 space-y-4">
        <!-- Нийт бараа материал өртөг -->
        <div class="bg-white rounded-lg p-3 dashboard_shadow">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Нийт бараа материал өртөг</div>
            <div class="bg-red-500 p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
            </div>
          </div>
          <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $currencyMNT(totalCost) }}</div>
<!--          <div class="text-xs text-second_color text-center pb-1">Өмнөх сараас-->
<!--            <span class="pl-2" style="font-weight: bold; color: #0AEF13;">+1,450,340</span>-->
<!--                          <span class="pl-2" style="font-weight: bold; color: #EF5D28;">-450,340</span>-->
<!--          </div>-->
        </div>
        <!-- Нийт бараа үлдэгдэл дүн -->
        <div class="bg-white rounded-lg p-3 dashboard_shadow">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Нийт бараа үлдэгдэл дүн</div>
            <div>
              <div class="bg-orange-400 p-2 rounded-full" style="width: 28px; height: 28px;">
                <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
              </div>
            </div>
          </div>
          <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $currencyMNT(totalPrice) }}</div>
<!--          <div class="text-xs text-second_color text-center pb-1">Өмнөх сараас-->
            <!--              <span class="pl-2" style="font-weight: bold; color: #0AEF13;">+1,450,340</span>-->
<!--            <span class="pl-2" style="font-weight: bold; color: #EF5D28;">-450,340</span>-->
<!--          </div>-->
        </div>
        <!-- Нийт бараа материал ширхэг -->
        <div class="bg-white rounded-lg p-3 dashboard_shadow">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Нийт бараа материал ширхэг</div>
            <div>
              <div class="bg-cyan-400 p-2 rounded-full" style="width: 28px; height: 28px;">
                <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
              </div>
            </div>
          </div>
          <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $number(count) }} </div>
<!--          <div class="text-xs text-second_color text-center pb-1">Өмнөх сараас-->
<!--                          <span class="pl-2" style="font-weight: bold; color: #0AEF13;">+1,450,340</span>-->
<!--            <span class="pl-2" style="font-weight: bold; color: #EF5D28;">-450,340</span>-->
<!--          </div>-->
        </div>
      </div>
    </div>

    <!-- 3 Chart -->
    <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <!-- Хамгийн өндөр борлуулалт хийсэн харилцагч -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow ">
        <div class="text-sm font-semibold text-second_color ">Борлуулалт харилцагчаар
          <Chart
            src="https://api.amjilt.com/inventory/lambda/puzzle/schema-public/chart/996"
            projectDomain="https://api.amjilt.com/inventory"
            :hideTitle="true"
            :filters="[...salesCompanyFilter, ...saleDate]"
            v-if="!loading"
            :labels="partners"></Chart>

        </div>
      </div>
      <!-- Худалдан авалт харилцагчаар -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow ">
        <div class="text-sm font-semibold text-second_color ">Борлуулалт ажилтнаар
          <Chart
            src="https://api.amjilt.com/inventory/lambda/puzzle/schema-public/chart/997"
            projectDomain="https://api.amjilt.com/inventory"
            :hideTitle="true"
            :filters="[...salesCompanyFilter, ...saleDate]"
            v-if="!loading"
            :labels="employees" ></Chart>
        </div>
      </div>
      <!-- Худалдан авалт харилцагчаар -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow ">
        <div class="text-sm font-semibold text-second_color ">Бараа, ажил үйлчилгээ ангиллаар
          <Chart
            src="https://api.amjilt.com/inventory/lambda/puzzle/schema-public/chart/999"
            projectDomain="https://api.amjilt.com/inventory"
            :hideTitle="true"
            v-if="!loading"
            :filters="companyFilter" ></Chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchOutlined from "@ant-design/icons-vue";
import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
import {GET_PARTNER_BY_COMPANIES, GET_EMPLOYEE_BY_COMPANIES} from "~/graphql/queries";
import axios from "~/plugins/core/axios";

import Filter from "./filter.vue"
import dashboardMixin from "./dashboard-mixin"
export default {
  name: "market",
  mixins:[dashboardMixin],
  components: {
    SearchOutlined,
    Filter
  },
  data(){
    let user = ls.get(USER_INFO);
    return {
      user:user,
      insured_types:[],
      employees:[],
      partners:[],
      sales:0,
      POSsales:0,
      purchase:0,
      production:0,
      innerTransfer:0,
      totalCost:0,
      totalPrice:0,
      count:0,
    }
  },
  methods:{
    getPartnerData(searchData) {

      let companyIDsJoined = searchData.companyIDs.map(element => `${element}`).join(",");
      this.$apollo
        .query({
          query: GET_PARTNER_BY_COMPANIES,
          fetchPolicy: "no-cache",
          variables: {companyIDs: companyIDsJoined},
        })
        .then((res) => {


          this.partners = res.data["partner"].map(row=>{
            return {
              value:row.id,
              label:row.partner_company_name
            }
          })

          this.getEmployeeData(companyIDsJoined, searchData)

        });
    },
    getEmployeeData(companyIDsJoined, searchData) {
      this.$apollo
        .query({
          query: GET_EMPLOYEE_BY_COMPANIES,
          fetchPolicy: "no-cache",
          variables: {companyIDs: companyIDsJoined},
        })
        .then((res) => {


          this.employees = res.data["employee"].map(row=>{
            return {
              value:row.id,
              label:`${row.lastname.length ? row.lastname[0] : ''}. ${row.firstname}`
            }
          })

          this.prepareFilterData(searchData);

          this.getData(searchData);

        });
    },
    createDashboard(searchData) {
      this.loading = true;
      this.getPartnerData(searchData);


    },
    getData(searchData) {

      // axios.post("http://127.0.0.1:8005/api/inventory-dashboard", {

      axios.post("https://pos.tatatonga.com/api/pos-dashboard", {
        companyIDs: searchData.companyIDs,
        struct_id: searchData.struct_id,
        start_date: searchData.start_date ? searchData.start_date.format('YYYY-MM-DD') : null,
        end_date: searchData.end_date ? searchData.end_date.format('YYYY-MM-DD') : null,
      }).then(r => {
        this.POSsales = r.data.sales;
        axios.post("https://api.amjilt.com/inventory/api/inventory-dashboard", {
          companyIDs: searchData.companyIDs,
          struct_id: searchData.struct_id,
          start_date: searchData.start_date ? searchData.start_date.format('YYYY-MM-DD') : null,
          end_date: searchData.end_date ? searchData.end_date.format('YYYY-MM-DD') : null,
        }).then(res => {


          if (res.status === 200) {
            this.sales = res.data.sales;
            this.purchase = res.data.purchase;
            this.production = res.data.production;
            this.innerTransfer = res.data.innerTransfer;
            this.totalCost = res.data.totalCost;
            this.totalPrice = res.data.totalPrice;
            this.count = res.data.count;


            this.loading = false;
          }
        })

      })



    }
  },
  computed:{


  },

}
</script>

<style scoped>

</style>
