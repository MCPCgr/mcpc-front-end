<template>
  <div class="relative" ref="ganttWrapper">
    <div v-if="showTooltip" :style="{top: tooltipY + 'px', left: tooltipX + 'px'}" class="tooltip">
      {{ tooltipContent }}
    </div>
    <svg :width="width+40" :height="height" @mouseover="onMouseOver" @mouseout="onMouseOut" :viewBox="box" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
      <Layout
        :styles="styles"
        :width="width"
        :height="height"
        :offsetY="offsetY"
        :thickWidth="thickWidth"
        :maxTextWidth="maxTextWidth"
        :progressWidth="progressWidth"
      />

      <DayHeader
        v-if="viewMode === 'day'"
        :styles="styles"
        :unit="unit"
        :height="height"
        :offsetY="offsetY"
        :minTime="minTime"
        :maxTime="maxTime"
        :maxTextWidth="maxTextWidth"
        :progressWidth="progressWidth"
      />

      <WeekHeader
        v-if="viewMode === 'week'"
        :styles="styles"
        :unit="unit"
        :height="height"
        :offsetY="offsetY"
        :minTime="minTime"
        :maxTime="maxTime"
        :maxTextWidth="maxTextWidth"
        :progressWidth="progressWidth"
      />

      <MonthHeader
        v-if="viewMode === 'month'"
        :styles="styles"
        :unit="unit"
        :offsetY="offsetY"
        :minTime="minTime"
        :maxTime="maxTime"
        :maxTextWidth="maxTextWidth"
        :progressWidth="progressWidth"
      />

      <Grid
        :styles="styles"
        :data="data"
        :width="width"
        :height="height"
        :offsetY="offsetY"
        :rowHeight="rowHeight"
        :maxTextWidth="maxTextWidth"
        :progressWidth="progressWidth"
      />

      <Labels
        v-if="maxTextWidth > 0"
        :styles="styles"
        :data="data"
        @click="onClick"
        :offsetY="offsetY"
        :maxTextWidth="maxTextWidth"
        :rowHeight="rowHeight"
      />
      <Progress
        v-if="progressWidth > 0"
        :styles="styles"
        :data="data"
        @click="onClick"
        :offsetY="offsetY"
        :maxTextWidth="maxTextWidth"
        :rowHeight="rowHeight"
      />

      <LinkLine
        v-if="showLinks"
        :styles="styles"
        :data="data"
        :unit="unit"
        :height="height"
        :current="current"
        :offsetY="offsetY"
        :minTime="minTime"
        :rowHeight="rowHeight"
        :barHeight="barHeight"
        :maxTextWidth="maxTextWidth"
        :progressWidth="progressWidth"
        :onClickLink="onClickLink"
      />

      <Bar
        :styles="styles"
        :data="data"
        :unit="unit"
        :height="height"
        :current="current"
        :offsetY="offsetY"
        :minTime="minTime"
        @click="onClick"
        @taskDateChanged="taskDateChanged"
        :showDelay="showDelay"
        :rowHeight="rowHeight"
        :barHeight="barHeight"
        :maxTextWidth="maxTextWidth"
        :progressWidth="progressWidth"
      />
      <ProgressLine
        v-if="showProgressLine"
        :styles="styles"
        :data="data"
        :viewMode="viewMode"
        :width="width"
        :height="height"
        :unit="unit"
        :maxTextWidth="maxTextWidth"
        :progressWidth="progressWidth"
        :rowHeight="rowHeight"
        :offsetY="offsetY"
        :minTime="minTime"
        :maxTime="maxTime"
      />

    </svg>

  </div>
</template>

<script>

import { DAY } from "../utils/utils";
import Layout from "./Layout";
import DayHeader from "./DayHeader";
import WeekHeader from "./WeekHeader";
import MonthHeader from "./MonthHeader";
import Grid from "./Grid";
import Labels from "./Labels";
import Progress from "./Progress.vue";
import LinkLine from "./LinkLine";
import Bar from "./Bar";
import ProgressLine from "./ProgressLine.vue";
import getStyles from "./styles";

const UNIT = {
  day: DAY / 28,
  week: 7 * DAY / 56,
  month: 30 * DAY / 56,
};

export default {
  components: {
    Layout,
    DayHeader,
    WeekHeader,
    MonthHeader,
    Grid,
    Labels,
    Progress,
    LinkLine,
    Bar,
    ProgressLine,
  },
  emits:["taskDateChanged"],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    onClickLink: {
      type: Function,
      default: () => {},
    },
    viewMode: {
      type: String,
      default: 'week',
    },
    maxTextWidth: {
      type: Number,
      default: 210,
    },
    progressWidth: {
      type: Number,
      default: 60,
    },
    offsetY: {
      type: Number,
      default: 60,
    },
    rowHeight: {
      type: Number,
      default: 40,
    },
    barHeight: {
      type: Number,
      default: 16,
    },
    thickWidth: {
      type: Number,
      default: 1.4,
    },
    styleOptions: {
      type: Object,
      default: () => {},
    },
    showLinks: {
      type: Boolean,
      default: true,
    },
    showProgressLine: {
      type: Boolean,
      default: true,
    },
    showDelay: {
      type: Boolean,
      default: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      showTooltip: false,
      tooltipContent: "",
      tooltipX: 0,
      tooltipY: 0
    };
  },
  methods:{
    taskDateChanged(e){
      this.$emit("taskDateChanged", e)
    },
    onMouseOver(event) {
      if (event.target && event.target.getAttribute("data-tooltip")) {
        this.tooltipContent = event.target.getAttribute("data-tooltip");

        // Get the parent div's bounding rectangle
        const rect = this.$refs.ganttWrapper.getBoundingClientRect();

        // Calculate tooltip position relative to parent div
        const xOffset = -30; // distance from the right of the cursor
        const yOffset = 40; // distance from the top of the cursor

        this.tooltipX = event.clientX - rect.left + xOffset;
        this.tooltipY = event.clientY - rect.top - yOffset;
        this.showTooltip = true;
      } else {
        this.showTooltip = false; // Hide tooltip if not on a target with a tooltip attribute
      }
    },
    onMouseOut() {
      this.showTooltip = false;
    }
  },
  computed: {
    unit() {
      return UNIT[this.viewMode];
    },
    minTime() {


      return this.start ? this.start.getTime() - this.unit * 48 : Date.now() - this.unit * 48;
    },
    maxTime() {
      return this.end ? this.end.getTime() + this.unit * 48 : Date.now() + this.unit * 48;
    },
    width() {
      return ((this.maxTime - this.minTime) / this.unit) + this.maxTextWidth + this.progressWidth;
    },
    height() {
      return this.data.length * this.rowHeight + this.offsetY;
    },
    box() {
      return `0 0 ${this.width+40} ${this.height}`;
    },
    current() {
      return Date.now();
    },
    styles() {
      return getStyles(this.styleOptions);
    },
  },



};
</script>


<style scoped>
.tooltip {
  position: absolute;
  background-color: rgba(0,0,0,0.5);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  pointer-events: none;
  z-index: 1000;
}
</style>
