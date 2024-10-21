<template>
  <div>
    <Filter @selectCompany="selectCompany" @createDashboard="createDashboard" :structs="structs" />
    <div class="grid grid-cols-12 gap-6 mb-8">
      <!-- Орлого зарлага -->
      <div class="col-span-12 lg:col-span-9">
        <div class="bg-white rounded-xl pt-4 dashboard_shadow h-full">
          <div class="text-center pt-40" v-if="loading">
            <a-spin/>
          </div>
          <AreaChart type="ColumnChart" :chartData="barchartData.data.data" v-if="!loading"
                     :chartColor="barchartData.colors" :xData="barchartData.data.xdata" :hideZoom="true" :isRest="true"
                     :hideTitle="true"></AreaChart>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-3 space-y-4">
        <!-- Орлого -->
        <div class="rounded-lg p-4 dashboard_shadow bg-white">
          <div class="flex items-center justify-between pb-2">
            <div class="text-[13px] font-semibold text-second_color">Орлого</div>
            <div class="bg-amber-400 p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
            </div>
          </div>
          <div class="flex items-center justify-center pt-2 pb-6">
            <div class="text-xl font-bold text-second_color text-center">{{ $currencyMNT(income) }}</div>
          </div>
        </div>
        <!-- Зарлага -->
        <div class="rounded-lg p-4 dashboard_shadow bg-white">
          <div class="flex items-center justify-between pb-2">
            <div class="text-[13px] font-semibold text-second_color">Зарлага</div>
            <div class="bg-primary_color p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
            </div>
          </div>
          <div class="flex items-center justify-center pt-2 pb-6">
            <div class="text-xl font-bold text-second_color text-center">{{ $currencyMNT(expenditure) }}</div>
          </div>
        </div>
        <!-- Цэвэр орлого -->
        <div class="rounded-lg p-4 dashboard_shadow bg-white">
          <div class="flex items-center justify-between pb-2">
            <div class="text-[13px] font-semibold text-second_color">Цэвэр орлого</div>
            <div class="bg-green-500 p-2 rounded-full">
              <img class="w-3 h-3" src="/amjilt-erp/icon/coins.svg"/>
            </div>
          </div>
          <div class="flex items-center justify-center pt-2 pb-6">
            <div class="text-xl font-bold text-second_color text-center">{{ $currencyMNT(income - expenditure) }}</div>
          </div>
        </div>
      </div>
    </div>

    <h2 class="my-4">Орлого зарлага </h2>
    <div class="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-8 mb-6">

      <div class="bg-white rounded-xl p-6 dashboard_shadow">
        <div class="grid grid-cols-1 xl:grid-cols-2">
          <table>
            <thead>
            <tr>
              <th>#</th>
              <th>Компани</th>
              <th>Орлого</th>
              <th>Зарлага</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(summary, index) in summaryByCompany" :key="summary.index">
              <td>{{ index + 1 }}</td>
              <td>
                <div class="flex items-center mb-1.5 align-center">
                  <div
                    class="w-10 h-10 border-2 border-white rounded-full bg-white dark:border-gray-800 overflow-hidden">
                    <img class="" :src="$base_url+summary.company_logo" alt="avatar" v-if="summary.company_logo">
                    <div class="avatar dashboard-avatar" v-else>
                      <inline-svg src="/assets/icons/duotone/Home/Building.svg"/>
                    </div>
                  </div>
                  <div class="ml-2">
                    {{ summary.company_name }}
                  </div>
                </div>
              </td>
              <td>
                <div class="text-xs text-green-500 bg-slate-100 font-semibold p-1 rounded text-right mr-2.5">
                  {{ $currencyMNT(summary.incomeSummary) }}
                </div>
              </td>
              <td>
                <div class="text-xs text-red-500 bg-slate-100 font-semibold p-1 rounded text-right">
                  {{ $currencyMNT(summary.expenditureSummary) }}
                </div>
              </td>
            </tr>
            </tbody>
          </table>

        </div>


      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-6">
      <!-- Нийт хөрөнгө, төрөл дүнгээр -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow">
        <div class="text-sm font-semibold text-second_color h-96">
          Орлого

          <datagrid ref="grid"
                    url="https://finance.mcpc.mn"
                    :schemaID="1010"
                    :paginate="50"
                    v-if="!loading"

                    :permissions="{c:false, r:true, u:false, d: false}"

                    :filter="gridFilter"


          >
          </datagrid>
        </div>

      </div>
      <!-- Нийт хөрөнгө, төрөл тоо ширхэгээр -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow ">
        <div class="text-sm font-semibold text-second_color h-96">
          Зарлага
          <datagrid ref="grid"
                    v-if="!loading"
                    url="https://finance.mcpc.mn"
                    :schemaID="1009"
                    :paginate="50"
                    :filter="gridFilter"

                    :permissions="{c:false, r:true, u:false, d: false}"


          >
          </datagrid>
        </div>
      </div>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
      <!-- Нийт хөрөнгө, төрөл дүнгээр -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow">
        <div class="text-sm font-semibold text-second_color ">
          Орлого төрлөөр
          <Chart src="https://finance.mcpc.mn/lambda/puzzle/schema-public/chart/1006" :hideTitle="true"
                 :filters="[...companyFilter, ...financeDate]" projectDomain="https://finance.mcpc.mn"></Chart>

        </div>

      </div>
      <!-- Нийт хөрөнгө, төрөл тоо ширхэгээр -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow ">
        <div class="text-sm font-semibold text-second_color ">
          Зарлага төрлөөр
          <Chart src="https://finance.mcpc.mn/lambda/puzzle/schema-public/chart/1007" :hideTitle="true"
                 :filters="[...companyFilter, ...financeDate]" projectDomain="https://finance.mcpc.mn"></Chart>
        </div>
      </div>

    </div>
    <h2 class="my-4">Хөрөнгийн мэдээлэл</h2>
    <!--  -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      <!-- Нийт хөрөнгө, төрөл дүнгээр -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow">
        <div class="text-sm font-semibold text-second_color ">
          Нийт хөрөнгө, төрөл дүнгээр
          <Chart src="https://treasurer.mcpc.mn/lambda/puzzle/schema-public/chart/980" :hideTitle="true"
                 :filters="treasurerFilter" projectDomain="https://treasurer.mcpc.mn"></Chart>

        </div>

      </div>
      <!-- Нийт хөрөнгө, төрөл тоо ширхэгээр -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow ">
        <div class="text-sm font-semibold text-second_color ">
          Нийт хөрөнгө, төрөл тоо ширхэгээр

          <Chart src="https://treasurer.mcpc.mn/lambda/puzzle/schema-public/chart/981" :hideTitle="true"
                 :filters="treasurerFilter" projectDomain="https://treasurer.mcpc.mn"></Chart>
        </div>
      </div>
      <!-- Хөрөнгө салбар нэгжээр -->
      <div class="bg-white rounded-xl p-6 dashboard_shadow ">
        <div class="text-sm font-semibold text-second_color">
          Хөрөнгийн дүн салбар нэгжээр
          <Chart src="https://treasurer.mcpc.mn/lambda/puzzle/schema-public/chart/982"
                 v-if="rawStructs.length >= 1" :hideTitle="true"
                 :filters="treasurerFilter" :labels="rawStructs"
                 projectDomain="https://treasurer.mcpc.mn"></Chart>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchOutlined from "@ant-design/icons-vue";
import axios from "~/plugins/core/axios";
import AreaChart from "@lambda-platform/lambda-vue/src/modules/chart/elements/AreaLine.vue"
import Filter from "./filter.vue"
import dashboardMixin from "./dashboard-mixin"
export default {
  props: [],
  emits: [],
  name: "finance",
  mixins:[dashboardMixin],
  components: {
    SearchOutlined,
    AreaChart,
    Filter
  },
  data() {
    return {
      income: 0,
      expenditure: 0,
    }
  },

  methods: {

    createDashboard(searchData) {
      this.loading = true;
      this.prepareFilterData(searchData);
      this.getFinanceData(searchData);

    },
    getFinanceData(searchData) {
      // axios.post("http://127.0.0.1:8007/finance-dashboard", {
      axios.post("https://finance.mcpc.mn/finance-dashboard", {
        companyIDs: searchData.companyIDs,
        struct_id: searchData.struct_id,
        start_date: searchData.start_date ? searchData.start_date.format('YYYY-MM-DD') : null,
        end_date: searchData.end_date ? searchData.end_date.format('YYYY-MM-DD') : null,
      }).then(res => {


        if (res.status === 200) {
          this.income = res.data.income;
          this.expenditure = res.data.expenditure;
          this.expenditure = res.data.expenditure;
          this.barchartData = res.data.chart;

          let preSummaryByCompany = [];


          this.companies.forEach(company => {

            const incomeIndex = res.data.incomeByCompany.findIndex(c => c.company_id === company.company_id)
            const expenditureIndex = res.data.expenditureByCompany.findIndex(c => c.company_id === company.company_id)

            preSummaryByCompany.push({
              ...company,
              incomeSummary: incomeIndex >= 0 ? res.data.incomeByCompany[incomeIndex].summary : 0,
              expenditureSummary: expenditureIndex >= 0 ? res.data.expenditureByCompany[expenditureIndex].summary : 0
            })
          });


          this.summaryByCompany = preSummaryByCompany.sort((a, b) => b.incomeSummary - a.incomeSummary);

          this.loading = false;
        }
      })
    }
  },

}
</script>

<style scoped>

</style>
