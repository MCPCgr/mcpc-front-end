<template>
  <g>
    <line v-if="current > minTime" :x1="cur" :x2="cur" :y1="offsetY" :y2="height" :style="styles.cline"/>
    <g v-for="(v, i) in data" :key="i" class="gantt-bar" :style="{ cursor: 'pointer' }">
      <template v-if="!v.end || !v.start"/>
      <template v-else-if="v.type === 'milestone'">
        <polygon :points="getPoints(v, i)" :style="styles.milestone" @dblclick="onClick(v)"  :data-tooltip="`Чухал үе шат: ${v.text}`" />
        <circle class="gantt-ctrl-start" :data-id="v.id" :cx="getX(v) + 12" :cy="getCy(i)" r="6" :style="styles.ctrl"/>
      </template>
      <template v-else>
        <text :x="getX(v) - 4" :y="getCy(i)" :style="styles.text1">{{ formatDay(getStart(v)) }}</text>
        <text :x="getX(v) + getW1(v) + 4" :y="getCy(i)"
              :style="styles.text2">{{
            formatDay(getEnd(v))
          }}
        </text>
        <rect :x="getX(v)" :y="getY(i)" :width="getW1(v)"
              :height="barHeight" rx="1.8" ry="1.8" :style="getBarBack(v)"

              @mousedown="e=>StartTaskDrag(e, v)"
              @dblclick="onClick(v)" :data-tooltip="`Гүйцэтгэл: ${Math.ceil(v.percent*100)}%`" />
        <rect
          @mousedown="e=>StartTaskDrag(e, v)"
          @dblclick="onClick(v)" v-if="getW2(v) > 0.000001" :x="getX(v)" :y="getY(i)" :width="getW2(v)"
          :height="barHeight" rx="1.8"

          ry="1.8" :style="getBarFront(v)" :data-tooltip="`Гүйцэтгэл: ${Math.ceil(v.percent*100)}%`" />

        <text v-if="getW2(v) >= 30"  :style="styles.text4"  :x="(getX(v)+getW2(v))-2" :y="getY(i)+8">{{Math.ceil(v.percent*100)}}%</text>
        <g v-if="v.type !== 'group' && canCreateLink">
          <circle class="gantt-ctrl-start" :data-id="v.id" :cx="getX(v) - 12" :cy="getCy(i)" r="6"
                  :style="styles.ctrl"/>
          <circle class="gantt-ctrl-finish" :data-id="v.id" :cx="getX(v) + getW1(v) + 12" :cy="getCy(i)" r="6"
                  :style="styles.ctrl"/>
        </g>

        <g class="handle-group" style="display: none;">
          <rect :x="getX(v)" :y="getCy(i)-8" width="8" height="16" rx="1.8" ry="1.8" class="handle left"  @mousedown="e=>StartStartDrag(e, v)"></rect>
          <rect :x="((getX(v) + getW1(v)) - 8)"
                :y="getCy(i)-8" width="8" height="16" rx="1.8" ry="1.8" class="handle right"
                @mousedown="e=>StartEndDrag(e, v)"></rect>
          <polygon points="1674.6,88,1684.6,88,1679.6,79.34" class="handle progress"></polygon>
        </g>
      </template>
    </g>

  </g>
</template>

<script>
import {formatDay} from '../utils/utils';

export default {
  emits: ["taskDateChanged"],
  props: {
    styles: Object,
    data: Array,
    unit: Number,
    height: Number,
    offsetY: Number,
    minTime: Number,
    showDelay: Boolean,
    rowHeight: Number,
    barHeight: Number,
    maxTextWidth: Number,
    progressWidth: Number,
    current: Number,
    onClick: Function
  },
  data() {
    return {
      dragStart: {
        dragging: false,
        startX: 0,
        draggingTaskId: null,
        draggingTaskEnd: null,
        draggingTaskStart: null,
        draggingNewStart: null,
        diffWidth: 0
      },
      dragEnd: {
        dragging: false,
        startX: 0,
        draggingTaskId: null,
        draggingTaskEnd: null,
        draggingTaskStart: null,
        draggingNewEnd: null,
        diffWidth: 0
      },
      dragTask: {
        dragging: false,
        startX: 0,
        draggingTaskId: null,
        draggingTaskEnd: null,
        draggingTaskStart: null,
        draggingNewStart: null,
        draggingNewEnd: null,
        diffWidth: 0
      },
    }
  },
  computed: {
    canCreateLink(){
      let canCreate = true;

      if (this.dragEnd.dragging || this.dragStart.dragging || this.dragTask.dragging) {
        return false;
      }

      return canCreate;
    },
    x0() {
      return this.maxTextWidth + this.progressWidth;
    },
    y0() {
      return (this.rowHeight - this.barHeight) / 2 + this.offsetY;
    },
    cur() {
      return this.x0 + (this.current - this.minTime) / this.unit;
    },

  },
  methods: {

    getPoints(v, i) {
      const x = this.x0 + (v.start - this.minTime) / this.unit;
      const y = this.y0 + i * this.rowHeight;
      const cy = y + this.barHeight / 2;
      const size = this.barHeight / 2;
      return [
        [x, cy - size],
        [x + size, cy],
        [x, cy + size],
        [x - size, cy]
      ].map(p => `${p[0]},${p[1]}`).join(' ');
    },
    getStart(v){
      let start = v.start;
      if(v.id === this.dragStart.draggingTaskId){
        if(this.dragStart.draggingNewStart !== null){
          start = this.dragStart.draggingNewStart;
        }
      }
      if(v.id === this.dragTask.draggingTaskId){
        if(this.dragTask.draggingNewStart !== null){
          start = this.dragTask.draggingNewStart;
        }
      }


      return start
    },
    getEnd(v){
      let end = v.end;
      if(v.id === this.dragEnd.draggingTaskId){
        if(this.dragEnd.draggingNewEnd !== null){
          end = this.dragEnd.draggingNewEnd;
        }
      }
      if(v.id === this.dragTask.draggingTaskId){
        if(this.dragTask.draggingNewEnd !== null){
          end = this.dragTask.draggingNewEnd;
        }
      }


      return  end
    },
    getX(v) {
      let start = v.start;
      if(v.id === this.dragStart.draggingTaskId){
        if(this.dragStart.draggingNewStart !== null){
          start = this.dragStart.draggingNewStart;
        }
      }
      if(v.id === this.dragTask.draggingTaskId){
        if(this.dragTask.draggingNewStart !== null){
          start = this.dragTask.draggingNewStart;
        }
      }

      return this.x0 + (start - this.minTime) / this.unit;
    },
    getY(i) {
      return this.y0 + i * this.rowHeight;
    },
    StartEndDrag(e, task) {


      this.dragEnd = {
        dragging: true,
        diffWidth: 0,
        startX: e.clientX,
        draggingTaskId: task.id,
        draggingTaskStart: task.start,
        draggingTaskEnd: task.end,
        draggingNewEnd: null
      }

      this.dragStart.dragging = false;
      this.dragTask.dragging = false;

    },
    StartStartDrag(e, task) {


      this.dragStart = {
        dragging: true,
        diffWidth: 0,
        startX: e.clientX,
        draggingTaskId: task.id,
        draggingTaskStart: task.start,
        draggingTaskEnd: task.end,
        draggingNewStart: null
      }
      this.dragEnd.dragging = false;
      this.dragTask.dragging = false;

    },
    StartTaskDrag(e, task) {


      this.dragTask = {
        dragging: true,
        diffWidth: 0,
        startX: e.clientX,
        draggingTaskId: task.id,
        draggingTaskStart: task.start,
        draggingTaskEnd: task.end,
        draggingNewStart: null,
        draggingNewEnd: null,
      }
      this.dragStart.dragging = false;
      this.dragEnd.dragging = false;


    },
    DoDrag(event) {
      if (this.dragEnd.dragging) {
        this.dragEnd["diffWidth"] = event.clientX - this.dragEnd.startX;


        const newEnd = new Date(this.dragEnd.draggingTaskEnd.getTime() + (this.dragEnd.diffWidth * this.unit))

        if (this.dragEnd.draggingTaskStart.getTime() < newEnd.getTime()) {
          this.dragEnd["draggingNewEnd"] = newEnd;

        } else {
          this.dragEnd["diffWidth"] = 0;
          this.StopDrag();
        }
      }
      if (this.dragStart.dragging) {
        this.dragStart["diffWidth"] = event.clientX - this.dragStart.startX;


        const newStart = new Date(this.dragStart.draggingTaskStart.getTime() + (this.dragStart.diffWidth * this.unit))



        if (newStart.getDate() < this.dragStart.draggingTaskEnd.getTime()) {

          this.dragStart["draggingNewStart"] = newStart;

        } else {
          this.dragStart["diffWidth"] = 0;
          this.StopDrag();
        }
      }
      if (this.dragTask.dragging) {
        this.dragTask["diffWidth"] = event.clientX - this.dragTask.startX;


        const newStart = new Date(this.dragTask.draggingTaskStart.getTime() + (this.dragTask.diffWidth * this.unit))
        const newEnd = new Date(this.dragTask.draggingTaskEnd.getTime() + (this.dragTask.diffWidth * this.unit))


        this.dragTask["draggingNewStart"] = newStart;
        this.dragTask["draggingNewEnd"] = newEnd;
      }
    },
    StopDrag() {
      if (this.dragEnd.dragging && this.dragEnd.draggingNewEnd !== null) {

        this.$emit("taskDateChanged", {
          id: this.dragEnd.draggingTaskId,
          start_date: this.dragEnd.draggingTaskStart,
          end_date: this.dragEnd.draggingNewEnd,
        });

        this.dragEnd = {
          dragging: false,
          startX: 0,
          draggingTaskId: null,
          draggingTaskEnd: null,
          draggingTaskStart: null,
          draggingNewEnd: null,
          diffWidth: 0
        }

      } else {
        this.dragEnd = {
          dragging: false,
          startX: 0,
          draggingTaskId: null,
          draggingTaskEnd: null,
          draggingTaskStart: null,
          draggingNewEnd: null,
          diffWidth: 0
        }
      }
      if (this.dragStart.dragging && this.dragStart.draggingNewStart !== null) {
        this.$emit("taskDateChanged", {
          id: this.dragStart.draggingTaskId,
          start_date: this.dragStart.draggingNewStart,
          end_date: this.dragStart.draggingTaskEnd
        });

        this.dragStart = {
          dragging: false,
          startX: 0,
          draggingTaskId: null,
          draggingTaskEnd: null,
          draggingTaskStart: null,
          draggingNewStart: null,
          diffWidth: 0
        }
      } else {
        this.dragStart = {
          dragging: false,
          startX: 0,
          draggingTaskId: null,
          draggingTaskEnd: null,
          draggingTaskStart: null,
          draggingNewStart: null,
          diffWidth: 0
        }
      }
      if (this.dragTask.dragging && this.dragTask.draggingNewStart !== null && this.dragTask.draggingNewEnd !== null) {
        this.$emit("taskDateChanged", {
          id: this.dragTask.draggingTaskId,
          start_date: this.dragTask.draggingNewStart,
          end_date: this.dragTask.draggingNewEnd
        });

        this.dragTask = {
          dragging: false,
          startX: 0,
          draggingTaskId: null,
          draggingTaskEnd: null,
          draggingTaskStart: null,
          draggingNewStart: null,
          draggingNewEnd: null,
          diffWidth: 0
        }
      } else {
        this.dragTask = {
          dragging: false,
          startX: 0,
          draggingTaskId: null,
          draggingTaskEnd: null,
          draggingTaskStart: null,
          draggingNewStart: null,
          draggingNewEnd: null,
          diffWidth: 0
        }
      }
    },
    getCy(i) {
      return this.getY(i) + this.barHeight / 2;
    },
    getW1(v) {

      let end = v.end;
      let start = v.start;
      if(v.id === this.dragEnd.draggingTaskId){
        if(this.dragEnd.draggingNewEnd !== null){
          end = this.dragEnd.draggingNewEnd;
        }
      }
      if(v.id === this.dragStart.draggingTaskId){
        if(this.dragStart.draggingNewStart !== null){
          start = this.dragStart.draggingNewStart;
        }
      }

      return ((end - start) / this.unit);

      //(v.id === this.dragEnd.draggingTaskId ? this.dragEnd.diffWidth : 0);
    },
    getW2(v) {
      return this.getW1(v) * v.percent;
    },
    getBarBack(v) {
      let bar = v.type === 'group' ? {
        back: this.styles.groupBack,
        front: this.styles.groupFront
      } : {
        back: this.styles.taskBack,
        front: this.styles.taskFront
      };
      if (this.showDelay) {
        if ((this.getX(v) + this.getW2(v)) < this.cur && v.percent < 0.999999) {
          bar.back = this.styles.warning;
        }
        if ((this.getX(v) + this.getW1(v)) < this.cur && v.percent < 0.999999) {
          bar.back = this.styles.danger;
        }
      }
      return bar.back;
    },
    getBarFront(v) {
      let bar = v.type === 'group' ? {
        back: this.styles.groupBack,
        front: this.styles.groupFront
      } : {
        back: this.styles.taskBack,
        front: this.styles.taskFront
      };
      return bar.front;
    },
    formatDay(date) {
      return formatDay(date);
    },
  },
  mounted() {
    document.addEventListener('mousemove', this.DoDrag);
    document.addEventListener('mouseup', this.StopDrag);


  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.DoDrag);
    document.removeEventListener('mouseup', this.StopDrag);
  },
};
</script>
