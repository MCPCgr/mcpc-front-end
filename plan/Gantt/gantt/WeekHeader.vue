<template>
  <g>
    <YearMonth
      :styles="styles"
      :unit="unit"
      :dates="dates"
      :offsetY="offsetY"
      :minTime="minTime"
      :maxTime="maxTime"
      :maxTextWidth="maxTextWidth"
      :progressWidth="progressWidth"
    />
    <g v-for="(week, i) in weeks.slice(0, -1)" :key="i">
      <rect
        :x="x0 + (week - minTime) / unit - d"
        :y="y0"
        :width="d * 2"
        :height="RH"
        :style="styles.week"
      />
      <line
        :x1="x0 + (week - minTime) / unit"
        :x2="x0 + (week - minTime) / unit"
        :y1="offsetY / 2"
        :y2="offsetY"
        :style="styles.line"
      />
      <text
        :x="x0 + (week - minTime) / unit + 3"
        :y="offsetY * 0.75"
        :style="styles.text2"
      >
        {{ new Date(week).getDate() }}
      </text>
      <text
        v-if="x0 + (week - minTime) / unit - x0 > 28"
        :x="x0 + (week - minTime) / unit - 3"
        :y="offsetY * 0.75"
        :style="styles.text1"
      >
        {{ new Date(addDays(week, -1)).getDate() }}
      </text>
    </g>
  </g>
</template>

<script>
import { getDates, addDays, DAY } from '../utils/utils';
import YearMonth from './YearMonth';

export default {
  components: { YearMonth },
  props: ['styles', 'unit', 'minTime', 'maxTime', 'height', 'offsetY', 'maxTextWidth', 'progressWidth'],
  computed: {
    x0() {
      return this.maxTextWidth+this.progressWidth;
    },
    y0() {
      return this.offsetY;
    },
    RH() {
      return this.height - this.y0;
    },
    d() {
      return DAY / this.unit;
    },
    dates() {
      return getDates(this.minTime, this.maxTime);
    },
    weeks() {
      let weeks = this.dates.filter((v) => (new Date(v)).getDay() === 1);
      weeks.push(this.maxTime);
      return weeks;
    },
  },
  methods: {
    addDays(date, days) {
      return addDays(date, days);
    },
  },
};
</script>
