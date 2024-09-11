<template>
  <g>
    <rect
      :x="x0"
      :y="x0"
      :width="W"
      :height="H"
      :style="styles.box"
    />
    <line
      x1="0"
      :x2="width"
      :y1="getY1"
      :y2="getY1"
      :style="styles.bline"
    />
    <line
      :x1="maxTextWidth+progressWidth"
      :x2="width"
      :y1="getY2"
      :y2="getY2"
      :style="styles.line"
    />
  </g>
</template>

<script>
export default {
  props: {
    styles: Object,
    width: Number,
    height: Number,
    offsetY: Number,
    thickWidth: Number,
    maxTextWidth: Number,
    progressWidth: Number,
  },
  computed: {
    x0() {
      return this.thickWidth / 2;
    },
    W() {
      return this.width - this.thickWidth;
    },
    H() {
      return this.height - this.thickWidth;
    },
    getY1() {
      return this.offsetY - this.x0;
    },
    getY2() {
      return this.offsetY / 2;
    }
  }
};
</script>
