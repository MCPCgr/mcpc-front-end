<template>
  <g>
    <g v-for="(year, i) in years.slice(0, -1)" :key="i">
      <line
        :x1="x0 + (year - minTime) / unit"
        :x2="x0 + (year - minTime) / unit"
        :y1="0"
        :y2="y2"
        :style="styles.line"
      />
      <text
        v-if="(years[i + 1] - year) / unit > 35"
        :x="x0 + (year - minTime) / unit + (years[i + 1] - year) / unit / 2"
        :y="offsetY * 0.25"
        :style="styles.text3"
      >
        {{ new Date(year).getFullYear() }}
      </text>
    </g>
  </g>
</template>

<script>
export default {
  props: ['styles', 'months', 'unit', 'offsetY', 'minTime', 'maxTime', 'maxTextWidth'],
  computed: {
    x0() {
      return this.maxTextWidth+70;
    },
    y2() {
      return this.offsetY / 2;
    },
    years() {
      let years = this.months.filter((v) => (new Date(v)).getMonth() === 0);
      years.unshift(this.minTime);
      years.push(this.maxTime);
      return years;
    },
  },
};
</script>
