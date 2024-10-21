<template>
<div>
  <portal to="header-left">
    <div class="page-title float-left">
      <div class="float-left pt-3">
        <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">Ирц</h1>
        <h2 class="text-gray-400 text-xs m-0"><span>Цаг бүртгэл</span></h2>
      </div>
    </div>
  </portal>
  <div class="lg:flex lg:h-full lg:flex-col relative z-0 flex flex-col min-w-0 p-3 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
    <div class="flex justify-center">
      <h1 class="text-xl">Хулан салон Хүннү салбарын тайлан</h1>
    </div>
    <header class="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
      <div class="flex items-center">
        <div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button type="button" class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </button>
          <button class="hidden border-y border-gray-300  text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block ">
            <time datetime="2024-03">{{ dateThisMonth(new Date()) }}</time>
          </button>
          <button type="button" class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">
            <span class="sr-only">Next month</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex items-center">
        <div class="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch">
          <button type="button" class="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50">
            <span class="sr-only">Previous month</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
            </svg>
          </button>
          <button type="button" class="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block">Today</button>
          <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
          <button type="button" class="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50">
            <span class="sr-only">Next month</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="hidden md:ml-4 md:flex md:items-center">
          <div class="relative">
            <button type="button" class="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="false" aria-haspopup="true">
              <select>
                <option disabled value=""></option>
                <option href="#1" class="text-gray-700 block px-4 py-2 text-sm border-0" role="menuitem" tabindex="-1" id="menu-item-0">Day view</option>
                <option href="#week view">Week view</option>
                <option href="#month view">Month view</option>
                <option href="#year view">Year view</option>
              </select>
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
      <div class="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
        <div class="flex justify-center bg-white py-2">
          <span>S</span>
          <span class="sr-only sm:not-sr-only">un</span>
        </div>
        <div class="flex flex-row justify-center bg-white py-2">
          <span>M</span>
          <span class="sr-only sm:not-sr-only">on</span>
        </div>
        <div class="flex justify-center bg-white py-2">
          <span>T</span>
          <span class="sr-only sm:not-sr-only">ue</span>
        </div>
        <div class="flex justify-center bg-white py-2">
          <span>W</span>
          <span class="sr-only sm:not-sr-only">ed</span>
        </div>
        <div class="flex justify-center bg-white py-2">
          <span>T</span>
          <span class="sr-only sm:not-sr-only">hu</span>
        </div>
        <div class="flex justify-center bg-white py-2">
          <span>F</span>
          <span class="sr-only sm:not-sr-only">ri</span>
        </div>
        <div class="flex justify-center bg-white py-2">
          <span>S</span>
          <span class="sr-only sm:not-sr-only">at</span>
        </div>

      </div>
      <div class="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
        <div class="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">

          <div class="relative bg-gray-50 px-3 py-2 text-gray-500" v-for="(report, index) in monthlyReports" :key="index">
            <nuxt-link to="/booking-report/daily" class=" bg-gray-50 flex-auto truncate font-medium text-gray-500 group-hover:text-green-900 " datetime="2024-02-29">
              <div class="relative px-3 py-2 text-gray-500 group hover:text-xl">
                <button>
                  {{ getDayFormat(report.Date) }}
                </button>
              </div>
              <ol class="mt-2">
                <li>
                  <a href="#" class="group flex">Нийт ажилсан хүн
                    <time datetime="2024-03-03T10:00" class="ml-3 hidden flex-none text-fuchsia-500 group-hover:text-indigo-600 xl:block">
                      {{ report.ArtistCount }}
                    </time>
                  </a>
                </li>
                <li>
                  <a href="#" class="group flex">Нийт үйлчилгээ
                    <time datetime="2024-03-03T14:00" class="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block">
                      {{ report.ServiceCount }}</time>
                  </a>
                </li>
              </ol>

            </nuxt-link>
          </div>

        </div>


        <div class="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden group">
          <button type="button" v-for="(report, index) in monthlyReports" class="flex h-14 flex-col bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100 focus:z-10" :key="index">
            <nuxt-link to="/booking-report/daily" v-if="isToday(report.Date)" class="flex-auto truncate font-medium text-gray-500 group-hover:text-green-900 text-xl" datetime="2024-02-28">
              <time datetime="2021-12-28" class="ml-auto">{{ getDayFormat(report.Date) }}</time>
            </nuxt-link>
            <nuxt-link to="/booking-report/daily" v-else>
              <time datetime="2021-12-28" class="ml-auto">{{ getDayFormat(report.Date) }}</time>
            </nuxt-link>
          </button>

        </div>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import {userInfo} from "~/store/useSiteSettings";

export default {
    data() {
      return {
        today: moment(new Date()).format("YYYY-MM-DD"),
        monthlyReports: [],
        userInfo
      }
    },
    methods: {
      getMonthlyReports() {
        axios.get(`https://booking.mcpc.mn/monthly-report?company_id=${this.userInfo.company_id}&start_date=2024-04-01&end_date=2024-04-30`).then((response) => {
          this.monthlyReports = response.data;
        })
      },
      getDayFormat(date) {
        return moment(date).format("DD")
      },
      isToday(date) {
        return moment(date).format("YYYY-MM-DD") === moment(new Date()).format("YYYY-MM-DD");
      },
      dateThisMonth(date) {
        return moment(date).locale('mn').format("YYYY [оны] M [сар]");;
      },
      formatDate(date) {
        return moment(date).locale('mn').format("YYYY [оны] M [сар]");;
      }
    },
    mounted() {
      this.getMonthlyReports();
    }
  }
</script>


<style scoped>

</style>
