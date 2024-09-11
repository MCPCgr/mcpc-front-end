<template>
  <g>
    <text


      :x="maxTextWidth+7"
      :y="getY(-1)-10"
      class="gantt-label"
      :style="styles.text2"

    >
      Гүйцэтгэл
    </text>
    <text
      v-for="(item, i) in data"
      :key="i"
      :x="maxTextWidth+15"
      :y="getY(i)"
      class="gantt-label"
      :style="styles.label"
      @click="() => onClick(item)"
    >
        {{progress(item)}}
    </text>
  </g>
</template>

<script>
export default {
  props: {
    styles: Object,
    data: Array,
    onClick: Function,
    rowHeight: Number,
    maxTextWidth: Number,
    offsetY: Number
  },
  methods: {
    getY(i) {
      return (i + 0.5) * this.rowHeight + this.offsetY;
    },
    progress(item){
      return item.percent > 0  ? `${Math.ceil(item.percent*100)}%` : ''
    }
  },
};
</script>
