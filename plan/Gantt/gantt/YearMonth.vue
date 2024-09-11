<template>
  <g>
    <g v-for="(month, i) in months" :key="i">
      <line :x1="getX(month)" :x2="getX(month)" y1="0" :y2="y2" :style="styles.line" />
      <text v-if="getT(month) > 50" :x="getX(month) + getT(month) / 2" :y="offsetY * 0.25" :style="styles.text3">{{ getStr(month) }}</text>
    </g>
  </g>
</template>

<script>
import { formatMonth } from '../utils/utils';

export default {
  props: {
    styles: Object,
    dates: Array,
    unit: Number,
    offsetY: Number,
    minTime: Number,
    maxTime: Number,
    maxTextWidth: Number,
    progressWidth: Number,
  },
  computed: {
    months() {
      const months = this.dates.filter(v => (new Date(v)).getDate() === 1);
      months.unshift(this.minTime);
      months.push(this.maxTime);
      return months;
    },
    x0() {
      return this.maxTextWidth+this.progressWidth;
    },
    y2() {
      return this.offsetY / 2;
    },
  },
  methods: {
    getX(month) {
      return this.x0 + (month - this.minTime) / this.unit;
    },
    getT(month) {
      const index = this.months.indexOf(month);
      return (this.months[index + 1] - month) / this.unit;
    },
    getStr(month) {
      return formatMonth(new Date(month));
    },
  },
};
</script>
