<template>
  <g>
    <Year
      :styles="styles"
      :unit="unit"
      :months="months"
      :offsetY="offsetY"
      :minTime="minTime"
      :maxTime="maxTime"
      :maxTextWidth="maxTextWidth"
    />
    <g v-for="(month, i) in months.slice(0, -1)" :key="i">
      <line
        :x1="x0 + (month - minTime) / unit"
        :x2="x0 + (month - minTime) / unit"
        :y1="y0"
        :y2="offsetY"
        :style="styles.line"
      />
      <text
        v-if="(months[i + 1] - month) / unit > 30"
        :x="x0 + (month - minTime) / unit + ((months[i + 1] - month) / unit) / 2"
        :y="offsetY * 0.75"
        :style="styles.text3"
      >
        {{ MONTH[(new Date(month)).getMonth()] }}
      </text>
    </g>
  </g>
</template>

<script>
import { getDates } from '../utils/utils';
import Year from './Year';



export default {
  components: { Year },
  props: ['styles', 'unit', 'minTime', 'maxTime', 'offsetY', 'maxTextWidth', 'progressWidth'],

  computed: {
    MONTH(){
      return ['1-р сар', '2-р сар', '3-р сар', '4-р сар', '5-р сар', '6-р сар', '7-р сар', '8-р сар', '9-р сар', '10-р сар', '11-р сар', '12-р сар']
    },
    x0() {
      return this.maxTextWidth+this.progressWidth;
    },
    y0() {
      return this.offsetY / 2;
    },
    dates() {
      return getDates(this.minTime, this.maxTime);
    },
    months() {
      let months = this.dates.filter((v) => (new Date(v)).getDate() === 1);
      months.unshift(this.minTime);
      months.push(this.maxTime);
      return months;
    },
  },
};
</script>
