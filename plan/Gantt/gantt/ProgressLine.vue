<template>
  <path :d="createPathD(points['plannedPoints'])" fill="none" stroke="blue" stroke-width="2" />
  <circle :cx="point.x" :cy="point.y" r="3" :data-tooltip="`Төлөвлөлт: ${Math.ceil(point.percent)}%`" fill="blue" v-for="point in points.plannedPoints"/>


  <path :d="createPathD(points['predictedPoints'])" fill="none" stroke="red" stroke-width="2" stroke-dasharray="7,5"  />
  <circle :cx="point.x" :cy="point.y" r="3" :data-tooltip="`Таамаглал: ${Math.ceil(point.percent)}%`" fill="red" v-for="point in points.predictedPoints"/>

  <path :d="createPathD(points['realPoints'])" fill="none" stroke="red" stroke-width="2" />
  <circle :cx="point.x" :cy="point.y" r="3" :data-tooltip="`Гүйцэтгэл: ${Math.ceil(point.percent)}%`" fill="red" v-for="point in points.realPoints"/>

  <text

    v-for="percent in percents"
    :key="percent.key"
    :x="percent.x"
    :y="percent.y"
    class="gantt-label"
    :style="styles.text1"

  >
    {{percent.percent}}%
  </text>

</template>

<script>
import {DAY, getDates} from "../utils/utils";

export default {
  props: {
    styles: Object,
    data: Array,
    unit: Number,
    height: Number,
    width: Number,
    rowHeight: Number,
    offsetY: Number,
    maxTextWidth: Number,
    progressWidth: Number,
    minTime: Number,
    maxTime: Number,
    viewMode: String,
  },
  data() {
    return {
      ready:false
    };
  },
  mounted() {

  },
  methods: {

    createPathD(points) {
      if(!points || points.length === 0) return '';

      let path = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
      }
      return path;
    },
    generateCompletedCurvePath() {

      const endPoint = this.completedPoints[this.completedPoints.length-1];
      let pointPaths = this.completedPoints.map(point=>`${point.x},${point.y}`)

      const pathData = `M ${this.completedPoints[0].x} ${this.completedPoints[0].y}
        C ${pointPaths.join(", ")}`;

      return pathData;
    },
    getTimeGrid(gridDate, today){
      let planned = 0;
      let real = 0;

      this.data.forEach(task=> {
        if (task.type !== "group" || task.type !== "milestone" ) {

          if(task.start && task.end){
            let startDate = task.start.getTime();
            let endDate = task.end.getTime();
            if(gridDate >= startDate && gridDate <= endDate){
              planned++
              if (gridDate <= today){
                real += 1 * (task.percent || 0);
              }
            }
          }

        }
      })
      return {
        planned,
        real,
      }
    },
  },
  computed: {

    d() {
      return DAY / this.unit;
    },
    x0() {
      return this.maxTextWidth + this.progressWidth;
    },
    y0() {
      return this.offsetY;
    },
    dates() {
      return getDates(this.minTime, this.maxTime);
    },
    pointsPre() {
      let points = [];
      if (this.viewMode === "week") {
        points = this.dates.filter((v) => (new Date(v)).getDay() === 1);
        points.push(this.maxTime);
        return points;
      } else if (this.viewMode === "month") {
        points = this.dates.filter((v) => (new Date(v)).getDate() === 1);
        points.unshift(this.minTime);
        points.push(this.maxTime);
        return points;
      } else {
        return this.dates;
      }

    },
    stepHeight() {
      return (this.data.length * this.rowHeight) / this.pointsPre.length;
    },
    percents() {

      const totalHeight = this.rowHeight * this.data.length;
      let percents = [];
      this.data.forEach((task, i) => {
        let percent = Math.ceil((100 /this.data.length) * i)
        percents.push({
          percent: percent,
          x: (this.x0 + (this.pointsPre[this.pointsPre.length - 1] - this.minTime) / this.unit) + 40,
          y: this.height - (this.rowHeight*i) -10,
        })

      })
      percents.push({
        percent: 100,
        x: (this.x0 + (this.pointsPre[this.pointsPre.length - 1] - this.minTime) / this.unit) + 40,
        y: this.height - (this.rowHeight*this.data.length) -10,
      });
      return percents
    },

    points() {
      let points = [];
      let predictedPoints = [];
      let realPoints = [];

      var timegrid = {};
      let totalDuration = 0;

      let today = new Date().getTime()
      const totalHeight = this.stepHeight * this.pointsPre.length;


      var cumulativePlannedDurations = [];
      var cumulativeRealDurations = [];
      var cumulativePredictedDurations = []
      var totalPlanned = 0;
      var totalReal = 0;

      var dailyRealProgress = -1;
      var totalPredictedProgress = 0;

      this.pointsPre.forEach((point, index) => {

        if (!timegrid[point]) {
          timegrid[point] = this.getTimeGrid(point, today);
        }
        totalDuration += 1;


        let start = point;
        let end = this.pointsPre[index + 1];
        var cell = timegrid[point] || {planned: 0, real: 0};
        totalPlanned = cell.planned + totalPlanned;

        cumulativePlannedDurations.push(totalPlanned);
        if (start <= today) {
          totalReal = (cell.real || 0) + totalReal;
          cumulativeRealDurations.push(totalReal);
          cumulativePredictedDurations.push(null);
        } else {
          if (dailyRealProgress < 0) {
            dailyRealProgress = totalReal / cumulativeRealDurations.length;
            totalPredictedProgress = totalReal;
            cumulativePredictedDurations.pop();
            cumulativePredictedDurations.push(totalPredictedProgress);
          }
          totalPredictedProgress += dailyRealProgress;
          cumulativePredictedDurations.push(totalPredictedProgress);
        }


      })

      for (let i = 0; i < cumulativePlannedDurations.length; i++) {
        cumulativePlannedDurations[i] = Math.round(cumulativePlannedDurations[i] / totalPlanned * 100);
        if (cumulativeRealDurations[i] !== undefined) {
          cumulativeRealDurations[i] = Math.round(cumulativeRealDurations[i] / totalPlanned * 100);

        }

        if (cumulativePredictedDurations[i] !== null) {
          cumulativePredictedDurations[i] = Math.round(cumulativePredictedDurations[i] / totalPlanned * 100);
        }
      }



      for (let i = 0; i < cumulativePlannedDurations.length; i++) {
        points.push({
          x: this.x0 + (this.pointsPre[i] - this.minTime) / this.unit,
          y: this.height - (totalHeight / 100) * cumulativePlannedDurations[i],
          percent: cumulativePlannedDurations[i]
        })
        if (cumulativePredictedDurations[i] > 0) {
          if(cumulativePredictedDurations[i] > 100){
            cumulativePredictedDurations[i] = 100
          }
          predictedPoints.push({
            x: this.x0 + (this.pointsPre[i] - this.minTime) / this.unit,
            y: this.height - (totalHeight / 100) * cumulativePredictedDurations[i],
            percent: cumulativePredictedDurations[i]
          })
        }

        if (cumulativeRealDurations[i] >= 0) {
          realPoints.push({
            x: this.x0 + (this.pointsPre[i] - this.minTime) / this.unit,
            y: this.height - (totalHeight / 100) * cumulativeRealDurations[i],
            percent: cumulativeRealDurations[i]
          })
        }

      }
      return {
        planned: cumulativePlannedDurations,
        real: cumulativeRealDurations,
        predicted: cumulativePredictedDurations,
        plannedPoints: points,
        predictedPoints: predictedPoints,
        realPoints: realPoints
      }
    },

  }
};
</script>

<style>
/* Add your CSS styles here */
</style>
