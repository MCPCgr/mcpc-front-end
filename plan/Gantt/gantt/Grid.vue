<template>
  <g>
    <line
      v-for="(v, i) in data"
      :key="i"
      x1="0"
      :x2="width"
      :y1="getY(i)"
      :y2="getY(i)"
      :style="styles.line"
    />
    <line :x1="maxTextWidth" :x2="maxTextWidth" y1="0" :y2="height" :style="styles.bline" />
    <line :x1="maxTextWidth+progressWidth" :x2="maxTextWidth+progressWidth" y1="0" :y2="height" :style="styles.bline" />
  </g>
</template>

<script>
export default {
  props: {
    styles: Object,
    data: Array,
    width: Number,
    height: Number,
    offsetY: Number,
    rowHeight: Number,
    maxTextWidth: Number,
    progressWidth: Number
  },
  methods: {
    getY(i) {
      return (i + 1) * this.rowHeight + this.offsetY;
    },
  }
};
</script>
