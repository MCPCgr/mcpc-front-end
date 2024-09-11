<template>
  <div>
    <label>
      Он сар
      <a-date-picker v-model:value="currentDate" picker="month" format="YYYY-MM" class="w-full" @change="doFilter" :locale="customLocale"/>
    </label>
  </div>
</template>
<script setup>
import { ref, defineProps } from 'vue';
import dayjs from '@lambda-platform/lambda-vue/src/utils/dayjs'



const props = defineProps({
  model: Object,
  filterData: Function,
});

const customLocale = {
    "lang": {
      "locale": "mn_MN",
      "placeholder": "Огноо сонгоно уу",
      "rangePlaceholder": ["Эхлэх огноо", "Дуусах огноо"],
      "today": "Өнөөдөр",
      "now": "Одоо",
      "backToToday": "Өнөөдөр рүү буцах",
      "ok": "Батлах",
      "clear": "Арилгах",
      "month": "Сар",
      "year": "Жил",
      "timeSelect": "Цаг сонгох",
      "dateSelect": "Огноо сонгох",
      "monthSelect": "Сар сонгох",
      "yearSelect": "Жил сонгох",
      "decadeSelect": "Арван жилийн хугацаа сонгох",
      "yearFormat": "YYYY",
      "dateFormat": "YYYY-MM-DD",
      "dayFormat": "DD",
      "dateTimeFormat": "YYYY-MM-DD HH:mm:ss",
      "monthFormat": "MM",
      "monthBeforeYear": true,
      "previousMonth": "Өмнөх сар (PageUp)",
      "nextMonth": "Дараа сар (PageDown)",
      "previousYear": "Өмнөх жил (Control + зүүн)",
      "nextYear": "Дараа жил (Control + баруун)",
      "previousDecade": "Өмнөх арван жил",
      "nextDecade": "Дараа арван жил",
      "previousCentury": "Өмнөх зуун",
      "nextCentury": "Дараа зуун",
      "months": ['1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар', '7-р сар', '8-р сар', '9-р сар', '10-р сар', '11-р сар', '12-р сар'],
    },
    "timePickerLocale": {
      "placeholder": "Цаг сонгох"
    },
    "dateFormat": "YYYY-MM-DD",
    "dateTimeFormat": "YYYY-MM-DD HH:mm:ss",
    "weekFormat": "YYYY-wo",
    "monthFormat": "YYYY-MM"
  }



const loading = ref(true);
const options = ref([]);
const selected = ref(null);
const currentDate = ref(dayjs());

// Method
function doFilter() {
  if(currentDate.value !== null){
    const yearMonth = formatMonth(currentDate.value);
    const yearMonthData = yearMonth.split("-");
  if(yearMonthData.length >= 2){
    props.model.form["current_year"] = parseInt(yearMonthData[0], 10);
    props.model.form["current_month"] = parseInt(yearMonthData[1], 10);
  }

  } else {
    props.model.form["current_year"] = 2024;
    props.model.form["current_month"] = 1;
  }
  props.filterData(1)

}
function formatMonth(v){
  return dayjs(v).format('YYYY-MM');
}

onMounted(()=>{
  doFilter();
})
</script>
