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
    <g v-for="(tick, i) in ticks" :key="i">
      <template v-if="isWeekend(tick)">
        <rect :x="tick.x" :y="y0" :width="tick.width" :height="RH" :style="styles.week" />
      </template>
      <line :x1="tick.x" :x2="tick.x" :y1="y0" :y2="offsetY" :style="styles.line" />
      <text :x="tick.x + tick.width / 2" :y="offsetY * 0.75" :style="styles.text3">
        {{ tick.date.getDate() }}
      </text>
      <line v-if="i === len - 1" :x1="tick.x + tick.width" :x2="tick.x + tick.width" :y1="y0" :y2="offsetY" :style="styles.line" />
    </g>
  </g>
</template>

<script>
import YearMonth from './YearMonth';
import { getDates } from '../utils/utils';

export default {
  props: {
    styles: Object,
    unit: Number,
    minTime: Number,
    maxTime: Number,
    height: Number,
    offsetY: Number,
    maxTextWidth: Number,
    progressWidth: Number,
  },
  components: {
    YearMonth,
  },
  computed: {
    dates() {
      return getDates(this.minTime, this.maxTime);
    },
    ticks() {
      const ticks = [];
      const x0 = this.maxTextWidth+this.progressWidth;
      const y0 = this.offsetY / 2;
      const RH = this.height - y0;
      const len = this.dates.length - 1;
      for (let i = 0; i < len; i++) {
        const cur = new Date(this.dates[i]);
        const day = cur.getDay();
        const x = x0 + (this.dates[i] - this.minTime) / this.unit;
        const t = (this.dates[i + 1] - this.dates[i]) / this.unit;
        ticks.push({
          x,
          width: t,
          date: cur,
          isWeekend: day === 0 || day === 6,
        });
      }
      return ticks;
    },
    y0() {
      return this.offsetY / 2;
    },
    RH() {
      return this.height - this.y0;
    },
    len() {
      return this.dates.length - 1;
    },
  },
  methods: {
    isWeekend(tick) {
      return tick.isWeekend;
    },
  },
};
</script>
