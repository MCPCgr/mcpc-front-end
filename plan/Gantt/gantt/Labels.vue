<template>
  <g>
    <text


      :x="10"
      :y="getY(-1)-10"
      class="gantt-label"
      :style="styles.label"

    >
      Ажилбар
    </text>
    <text
      v-for="(item, i) in data"
      :key="i"
      :x="10"
      :y="wrappedText(item.text).length >= 2 ? getY(i) - 9 : getY(i)"
      class="gantt-label"
      :style="styles.label"
      :width="maxTextWidth"
      height="auto"
      @click="() => onClick(item)"
    >
      <tspan
        v-for="(line, index) in wrappedText(item.text)"
        :key="index"
        :x="10"
        :dy="index === 0 ? '0em' : '1.2em'"
      >
        {{ line }}
      </tspan>
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
    wrappedText(text) {
      const lines = [];
      let line = '';
     if(text){
       const words = text.split(' ');


       words.forEach((word, i) => {
         if ((line + word).length * 8 > this.maxTextWidth) {
           lines.push(line);
           line = '';
         }
         line += ` ${word}`;

         if (i === words.length - 1) {
           lines.push(line);
         }
       });
     }


      return lines;
    },
    getY(i) {
      return (i + 0.5) * this.rowHeight + this.offsetY;
    },
  }
};
</script>
