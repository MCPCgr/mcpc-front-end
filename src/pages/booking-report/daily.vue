<template>
  <portal to="header-left">
    <div className="page-title float-left">
      <div className="float-left pt-3">
        <h1 className="text-gray-700 dark:text-gray-200 text-base m-0 ">Үйлчилгээний тайлан</h1>
        <h2 className="text-gray-400 text-xs m-0"><span>Өдөр</span></h2>
      </div>
    </div>
  </portal>
  <div class="dark:bg-gray-600 relative w-full bg-white rounded-xl">
    <div class="flex flex-col w-full">
      <div class="flex items-start justify-between px-6 py-4 space-x-6">
        <div>
          <p class="text-base">Хулан салон</p>
          <p class="underline">{{route.query.service_date}} оны тайлан </p>
        </div>
        <div class="flex items-center space-x-6">
          <a-button >
            <nuxt-link to="/booking-report/montly"> Буцах </nuxt-link>
          </a-button>
        </div>
      </div>

      <loader v-if="loading" class="h-10 my-20"/>
      <div v-else class="px-6 py-4">
        <table v-if="dataList.length > 0"  class="leading-normal w-full ">
          <thead>
          <tr>
            <th class="px-2 py-2 bg-gray-100 text-left text-xs text-gray-700 tracking-wider">
              №
            </th>
            <th class="px-2 py-2 bg-gray-100 text-left text-xs text-gray-700 tracking-wider">
              Овог
            </th>
            <th class="px-2 py-2 bg-gray-100 text-left text-xs text-gray-700 tracking-wider">
              Нэр
            </th>
            <th class="px-2 py-2 bg-gray-100 text-left text-xs  text-gray-700 tracking-wider">
              Салбар,нэгж
            </th>
            <th class="px-2 py-2 bg-gray-100 text-left text-xs  text-gray-700 tracking-wider">
              Үйлчилгээ
            </th>
            <th class="px-2 py-2 bg-gray-100 text-left text-xs  text-gray-700 tracking-wider">
              Үнэ
            </th>
            <th class="px-2 py-2 bg-gray-100 text-left text-xs  text-gray-700 tracking-wider">
              Утас
            </th>
            <th class="px-2 py-2 bg-gray-100 text-left text-xs  text-gray-700 tracking-wider">
              Үйлчилгээ авах цаг
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in dataList" :key="index" @click="onSelect(item.artist_id)" class="cursor-pointer">
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-xs" >
              {{index + 1}}
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-xs">
              <div class="flex">
                <p class="text-gray-900 whitespace-no-wrap">{{ item.last_name }}</p>
              </div>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-xs">
              <div class="flex">
                <p class="text-gray-900 whitespace-no-wrap">{{ item.first_name }}</p>
              </div>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-xs">
              <p class="text-second_color whitespace-no-wrap">{{ item.branch_name }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-xs">
              <p class="text-second_color whitespace-no-wrap">{{ item.service_name }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-xs">
              <p class="text-second_color whitespace-no-wrap">{{ $currencyMNT(item.price) }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-xs">
              <p class="text-second_color whitespace-no-wrap">{{ item.phone_number }}</p>
            </td>
            <td class="px-2 py-2 border-b border-gray-200 bg-white text-xs">
              <p class="text-second_color whitespace-no-wrap">{{ item.service_date }}</p>
            </td>
          </tr>
          </tbody>
        </table>
        <no-data v-else text="Хоосон байна."/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import loader from '~/components/animations/loading.vue';
import noData from '~/components/common/noData.vue';
import {userInfo} from '~/store/useSiteSettings'
import {company} from '~/store/useSiteSettings'

import {useRoute} from "vue-router";
const route =  useRoute();
const router = useRouter();

const loading = ref(false);
const dataList = ref([]);

const dailyReportList = () => {
  loading.value = true;
  console.log(userInfo.value)
  axios.get(`https://booking.mcpc.mn/daily-report?company_id=${company.value.company_id}&service_date=${route.query.service_date}`).then((response) => {
      if (response.status === 200) {
        dataList.value = response.data;
        loading.value = false;
      } else {
        message.error("Алдаа гарлаа серверт холбогдож чадсангүй!");
        loading.value = false;
      }
    }).catch(error => {
      console.error(error);
      message.error("Серверт холбогдож алдаа гарлаа!");
      loading.value = false;
    });
};

const onSelect = (artist_id) =>{
  router.push(`/booking-report/employee?company_id=${company.value.company_id}&service_date=${route.query.service_date}&artist_id=${artist_id}`);
};


dailyReportList();


</script>

<style>

</style>
