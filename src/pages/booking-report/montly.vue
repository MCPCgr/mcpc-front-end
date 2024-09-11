<template>
  <portal to="header-left">
    <div className="page-title float-left">
      <div className="float-left pt-3">
        <h1 className="text-gray-700 dark:text-gray-200 text-base m-0 ">Үйлчилгээний тайлан</h1>
        <h2 className="text-gray-400 text-xs m-0"><span>Сар</span></h2>
      </div>
    </div>
  </portal>

  <div class="calendar-over-style dark:bg-gray-600 relative w-full bg-white rounded-xl px-6 py-4">
    <a-calendar v-model:value="value" @select="onSelect">
      <template #dateCellRender="{ current }">
        <ul class="events">
          <li v-for="item in getListData(current)" :key="item.content">
            <a-badge :status="item.type" :text="item.content" />
          </li>
        </ul>
      </template>
      <template #monthCellRender="{ current }">
        <div v-if="getMonthData(current)" class="notes-month">
          <section>{{ getMonthData(current) }}</section>
          <span>Backlog number</span>
        </div>
      </template>
    </a-calendar>
  </div>
</template>

<script>
  import ls from "~/utils/Storage";
  import {USER_INFO} from "~/store/mutation-types";
  import {company} from '~/store/useSiteSettings'
  import axios from "axios";
  import moment from "moment/moment";
  export default {
    setup() {
      const UserInfo = ls.get(USER_INFO);
      const monthlyReports = ref([]);
      const value = ref();
      const currentDate = ref(new Date());
      const router = useRouter();
      const getMonthlyReports = () => {
        // const today = setDate;
        const startDate = new Date(currentDate.value);
        startDate.setDate(currentDate.value.getDate() - 30);

        const endDate = new Date(currentDate.value);
        endDate.setDate(currentDate.value.getDate() + 20);
        // dev http://127.0.0.1:8019/monthly-report
        axios.get(`https://api.amjilt.com/booking/monthly-report?company_id=${company.value.company_id}&start_date=${getDayFormat(startDate)}&end_date=${getDayFormat(endDate)}`).then((response) => {
          monthlyReports.value = response.data
        })
      };

      const onSelect = (date, { source }) => {
        console.log(source);

        if (source === 'date') {
          router.push(`/booking-report/daily?service_date=${getDateValue(date)}`);
        } else if (source === 'month') {
          const currentDate = new Date(); // Get the current date
          const currentMonth = currentDate.getMonth(); // Get the current month
          currentDate.setMonth(currentMonth + 1);

          getMonthlyReports()
        }
      };


      const convertDate = (dateString) => {
        const date = new Date(dateString); // Create a new Date object from the dateString
        const options = {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZone: 'Asia/Ulaanbaatar'
        }; // Define options for formatting the date
        const formattedDate = date.toLocaleString('en-US', options); // Convert the date to a string using the specified options
        const gmtOffset = new Date().getTimezoneOffset() / -60; // Get the GMT offset in hours
        const gmtOffsetString = (gmtOffset >= 0 ? '+' : '-') + ('0' + Math.abs(gmtOffset)).slice(-2) + '00'; // Format the GMT offset string
        return `${formattedDate} GMT${gmtOffsetString} (Ulaanbaatar Standard Time)`; // Append the GMT offset to the formatted date string
      };

      const getDayFormat = (dateString) => {
        return moment(dateString).format("YYYY-MM-DD");
      };

      const getDateValue = (date) => {
       let year = date.year();
       let month = date.month() + 1;
       let day = date.date();

        if (month < 10) {
          month = '0' + month;
        }

        if (day < 10) {
          day = '0' + day;
        }

        return year + '-' + month + '-' + day;
      };

      const getListData = (value) => {
        let listData;

        for (let i = 0; i < monthlyReports.value.length; i++) {
          switch (getDateValue(value)) {
            case getDayFormat(monthlyReports.value[i].Date):
              listData = [
                { type: 'warning', content: 'Нийт ажилсан хүн ' + monthlyReports.value[i].ArtistCount },
                { type: 'success', content: 'Нийт үйлчилгээ ' + monthlyReports.value[i].ServiceTimeCount },
              ];
              break;
            default:
          }
        }

        return listData || [];
      };

      const getMonthData = (value) => {
        if (value.month() === 8) {
          return 1394;
        }
      };

      onMounted(() => {
        getMonthlyReports()
      });

      return {value, currentDate, monthlyReports, company, onSelect, convertDate, getDayFormat, getMonthlyReports, getListData, getMonthData}
    }
  }
</script>

<style scoped>

</style>
