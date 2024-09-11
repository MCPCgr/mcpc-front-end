<template>
  <div>
    <Head>
      <Title>Хяналтын самбар</Title>
    </Head>
    <portal to="header-left">
      <div class="page-title float-left">
        <div class="float-left pt-3">
          <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">Хяналтын самбар</h1>
          <h2 class="text-gray-400 text-xs m-0"><span></span></h2>
        </div>
      </div>
    </portal>
    <div class="dashboard_tab space-y-6">
      <div v-if="loading" class="mx-auto align-center">
        <a-spin/>
      </div>
      <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" >
          <div class="bg-white dark:bg-slate-900 rounded-xl p-3 dashboard_shadow">
            <div class="flex items-center justify-between pb-2">
              <div class="text-xs font-semibold text-second_color">ERP Байгууллага</div>
              <div class="bg-purple-800 p-2 rounded-full">
                <inline-svg class="w-4 h-4 svg-icon-white"  src="/assets/icons/duotone/Home/Building.svg"/>
              </div>
            </div>
            <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $number(companyCount) }}</div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-xl p-3 dashboard_shadow">
            <div class="flex items-center justify-between pb-2">
              <div class="text-xs font-semibold text-second_color">LMS Сургууль</div>
              <div>
                <div class="bg-purple-800 p-2 rounded-full" >
                  <inline-svg class="w-4 h-4 svg-icon-white"  src="/assets/icons/duotone/Home/Building.svg"/>
                </div>
              </div>
            </div>
            <div class="text-2xl font-bold text-second_color text-center pb-2"> {{ $number(erpCountTotal.org_count) }}</div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-xl p-3 dashboard_shadow">
            <div class="flex items-center justify-between pb-2">
              <div class="text-xs font-semibold text-second_color">ERP Хэрэглэгч</div>
              <div>
                <div class="bg-purple-400 p-2 rounded-full" >
                  <inline-svg class="w-4 h-4 svg-icon-white"  src="/assets/icons/duotone/Communication/Group.svg"/>
                </div>
              </div>
            </div>
            <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $number(userCount) }} </div>
          </div>

          <div class="bg-white dark:bg-slate-900 rounded-xl p-3 dashboard_shadow ">
            <div class="flex items-center justify-between pb-2">
              <div class="text-xs font-semibold text-second_color">LMS Хэрэглэгч </div>
              <div>
                <div class="bg-purple-400 p-2 rounded-full">
                  <inline-svg class="w-4 h-4 svg-icon-white"  src="/assets/icons/duotone/Communication/Group.svg"/>
                </div>
              </div>
            </div>
            <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $number(erpCountTotal.user_count) }} </div>
          </div>
        </div>


      </div>






      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl h-[350px] p-6" ref="lmsCompanyChartRef"></div>
        <div class="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl h-[350px] p-6" ref="lmsUserChartRef" ></div>
      </div>


      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl h-[350px] p-6" ref="companyChartRef"></div>
        <div class="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl h-[350px] p-6" ref="userChartRef" ></div>
      </div>


      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div class="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl h-[350px] p-6" ref="companySummaryChartRef" ></div>

        <div class="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl h-[350px] p-6" ref="userSummaryChartRef"></div>

      </div>









      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8" >

        <div class="bg-white dark:bg-slate-900 rounded-lg p-3 dashboard_shadow">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Нийт ПОС</div>
            <div class="bg-purple-800 p-2 rounded-full">
              <inline-svg class="w-4 h-4 svg-icon-white"  src="/assets/icons/duotone/Home/Home2.svg"/>
            </div>
          </div>
          <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $number(posCount) }}</div>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-lg p-3 dashboard_shadow">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">ПОС Дэлгүүр</div>
            <div>
              <div class="bg-purple-800 p-2 rounded-full" >
                <inline-svg class="w-4 h-4 svg-icon-white"  src="/assets/icons/duotone/Shopping/Cart2.svg"/>
              </div>
            </div>
          </div>
          <div class="text-2xl font-bold text-second_color text-center pb-2"> {{ $number(shopCount) }}</div>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-lg p-3 dashboard_shadow">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">ПОС Ресторан, караоке</div>
            <div>
              <div class="bg-purple-800 p-2 rounded-full" >
                <inline-svg class="w-4 h-4 svg-icon-white"  src="/assets/icons/duotone/Cooking/Fork-spoon-knife.svg"/>
              </div>
            </div>
          </div>
          <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $number(restaurantCount) }} </div>
        </div>

      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl h-[350px] p-6" ref="posChartRef" style="height: 400px;"></div>
        <div class="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl h-[350px] p-6" ref="posSummaryChartRef" style="height: 400px;"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from "~/plugins/core/axios";
import * as echarts from 'echarts';
import {message} from "ant-design-vue";

const loading = ref(true);

const companyCount = ref(0);
const userCount = ref(0);
const companyStats = ref([]);
const userStats = ref([]);

const companyCountSummary = ref([]);
const userCountSummary = ref([]);


const posCount = ref(0);
const restaurantCount = ref(0);
const shopCount = ref(0);
const posStats = ref([]);
const posSummary = ref([]);

const erpCountTotal = ref({});


const lmsCompanyChartRef = ref(null);
const lmsCompanyStats = ref([]);

const lmsUserChartRef = ref(null);
const lmsUserStatus = ref([]);

const companyChartRef = ref(null);
const userChartRef = ref(null);
const companySummaryChartRef = ref(null);
const userSummaryChartRef = ref(null);

const posChartRef = ref(null);
const posSummaryChartRef = ref(null);

const initChart = (chartRef, chartData, title, color) => {
  const chartInstance = echarts.init(chartRef.value);
  const option = {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item.YearMonth)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: chartData.map(item => item.Count),
      itemStyle: {
        color: color
      },
      type: 'bar'
    }],
    toolbox: {
      feature: {

        saveAsImage: { title: "Татах" },
        // brush: {},
        magicType: {
          type: ["line", "bar"],
          title: { line: "Шугман", bar: "Багнан" }
        }
      }
    },

  };

  chartInstance.setOption(option);
};

const initTotalChart = (chartRef, chartData, title, color) => {
  const chartInstance = echarts.init(chartRef.value);
  const option = {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item.YearMonth)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: chartData.map(item => item.Total),
      type: "line",
      smooth: true,
      itemStyle: {
        color: color // Set your desired color here
      },
      areaStyle: {},
    }],
    toolbox: {
      feature: {

        saveAsImage: { title: "Татах" },
        // brush: {},
        magicType: {
          type: ["line", "bar"],
          title: { line: "Шугман", bar: "Багнан" }
        }
      }
    },
  };

  chartInstance.setOption(option);
};


const initChartLMS = (chartRef, chartData, title, color) => {
  const chartInstance = echarts.init(chartRef.value);
  const option = {
    title: {
      text: title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item.new_date)
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: chartData.map(item => item.count),
      itemStyle: {
        color: color
      },
      type: 'bar'
    }],
    toolbox: {
      feature: {

        saveAsImage: { title: "Татах" },
        // brush: {},
        magicType: {
          type: ["line", "bar"],
          title: { line: "Шугман", bar: "Багнан" }
        }
      }
    },

  };

  chartInstance.setOption(option);
};



const fetchDashboardData = async () => {
  try {
    loading.value = true;
    const response = await axios.post('/api/system-dashboard');
    companyCount.value = response.data.companyCount;
    userCount.value = response.data.userCount;
    companyStats.value = response.data.companyStats;
    userStats.value = response.data.userStats;
    companyCountSummary.value = response.data.companyCountSummary;
    userCountSummary.value = response.data.userCountSummary;

    initChart(companyChartRef, companyStats.value, 'ERP Байгууллага бүртгэл сараар', "#103067");
    initChart(userChartRef, userStats.value, 'ERP Хэрэглэгч бүртгэл сараар', "#A874DE");

    initTotalChart(companySummaryChartRef, companyCountSummary.value, 'ERP Нийт байгууллага сараар', "#103067");
    initTotalChart(userSummaryChartRef, userCountSummary.value, 'ERP Нийт хэрэглэгч сараар', "#A874DE");


    loading.value = false
  } catch (error) {
    loading.value = false
    console.error('Error fetching system dashboard data:', error);
  }
};
const fetchPosDashboardData = async () => {
  try {

    const response = await axios.post('https://pos.tatatonga.com/api/system-dashboard');
    const data = response.data;
    posCount.value = data.posCount;
    restaurantCount.value = data.restaurantCount;
    shopCount.value = data.shopCount;
    posStats.value = data.posStats;
    posSummary.value = data.posSummary;



    initChart(posChartRef, posStats.value, 'ПОС-н бүртгэл сараар', "#007EDA");
    initTotalChart(posSummaryChartRef, posSummary.value, 'Нийт ПОС-н бүртгэл сараар', "#FFBE54");

    console.log(posStats.value, 'posStats.value')
    console.log(posSummary.value, 'posSummary.value')


    loading.value = false
  } catch (error) {
    loading.value = false
    console.error('Error fetching system dashboard data:', error);
  }
};

const CountTotal = () => {
  axios.get('https://lms.amjilt.com/api/erp/count/total', { headers: {'Authorization': 'Basic YW1qaWx0OjdhUzhlVzdlR3N2cUJkWHVaRGVmVWhkWWJkNjY='}, withCredentials: false}).then((response) => {
    if (response.status === 200) {
      erpCountTotal.value = response.data;
    } else {
      message.error("Алдаа гарлаа серверт холбогдож чадсангүй!");
    }
  }).catch(error => {
    console.log(error);
    message.error("Серверт холбогдож алдаа гарлаа!");
  });
};

const LMSchart = () => {
  axios.get('https://lms.amjilt.com/api/erp/count/monthly', { headers: {'Authorization': 'Basic YW1qaWx0OjdhUzhlVzdlR3N2cUJkWHVaRGVmVWhkWWJkNjY='}, withCredentials: false}).then((response) => {
    if (response.status === 200) {
      lmsCompanyStats.value = response.data.org_month_count;
      lmsUserStatus.value = response.data.user_month_count;

      initChartLMS(lmsCompanyChartRef, lmsCompanyStats.value, 'LMS Сургууль бүртгэл сараар', "#ea7ccc");
      initChartLMS(lmsUserChartRef, lmsUserStatus.value, 'LMS Хэрэглэгч бүртгэл сараар', "#9a60b4");
    } else {
      message.error("Алдаа гарлаа серверт холбогдож чадсангүй!");
    }
  }).catch(error => {
    console.log(error);
    message.error("Серверт холбогдож алдаа гарлаа!");
  });
};

onMounted(()=>{
  fetchDashboardData();
  fetchPosDashboardData();
  CountTotal();
  LMSchart();
});
</script>
