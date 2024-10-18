<template>
  <div class="">
    <div class="flex justify-between mb-1.5">
      <div class="flex justify-between items-center gap-4">

        <a-segmented v-model:value="viewMode" @change="(e)=>changeProjectSettings('view_mode')" :options="modes"  />

        <a-dropdown v-if="projectPermission !== 3">
          <a class="ant-dropdown-link" @click.prevent>
            <inline-svg
              src="/assets/icons/duotune/general/gen041.svg" class="svg-icon mr-1 inline-block"
            />
            Нэмэх
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="addTask">
                <div class="flex ">
                  <inline-svg src="/assets/icons/duotone/Communication/Clipboard-check.svg"
                              class="svg-icon mr-2.5 align-center"/>
                  <span>Ажилбар</span>
                </div>
              </a-menu-item>
              <a-menu-item @click="addMilestone">
                <div class="flex">
                  <inline-svg src="/assets/icons/duotone/Navigation/Route.svg"
                              class="svg-icon mr-2.5 align-center "/>
                  <span>Чухал үе шат</span>
                </div>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>


        <!--        <a-button @click="doCategory" type="link" class="add-task-btn">-->
        <!--          <template #icon>-->
        <!--                        <span class="svg-icon" style="vertical-align: top">-->
        <!--                            <inline-svg-->
        <!--                              src="/assets/icons/duotone/Text/Align-left.svg"-->
        <!--                            />-->
        <!--                        </span>-->
        <!--          </template>-->
        <!--          <span class="ml-2">Бүлэгчлэх</span>-->
        <!--        </a-button>-->
      </div>


      <div class="flex justify-between items-center gap-4">
        <a-dropdown>
          <a class="ant-dropdown-link" @click.prevent>
            <inline-svg
              src="/assets/icons/duotone/Files/Download.svg" class="svg-icon mr-1 inline-block"
            />
            Татах
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="exportSVG(project)">
                <div class="flex w-30">
                  <inline-svg src="/assets/icons/duotone/Files/Pictures1.svg"
                              class="svg-icon mr-2.5 align-center "/>
                  <span>SVG Татах</span>
                </div>
              </a-menu-item>
              <a-menu-item @click="exportPDF(project)">
                <div class="flex w-30">
                  <inline-svg src="/assets/icons/duotone/Files/File.svg"
                              class="svg-icon mr-2.5 align-center "/>
                  <span>PDF Татах</span>
                </div>
              </a-menu-item>
              <a-menu-item @click="exportExcel(project, formatedTasks, stages, employees, priorities)">
                <div class="flex w-30">
                  <inline-svg src="/assets/icons/duotone/Files/Group-folders.svg"
                              class="svg-icon mr-2.5 align-center "/>
                  <span>Excel Татах</span>
                </div>
              </a-menu-item>

            </a-menu>
          </template>
        </a-dropdown>
        <a-dropdown trigger="click">
          <a class="ant-dropdown-link" @click.prevent>
            <inline-svg
              src="/assets/icons/duotune/general/gen019.svg" class="svg-icon mr-1 inline-block"
            />
            Тохиргоо
          </a>
          <template #overlay>
            <div class="shadow-md p-2 rounded-md bg-white dark:bg-slate-800">
              <div>
                <a-switch :checked="project.show_link" @change="()=>changeProjectSettings('show_link')" class="ml-2"
                          size="small"/>
                <span class="ml-2">Холбоос</span>
              </div>
              <div>
                <a-switch :checked="project.show_delay" @change="()=>changeProjectSettings('show_delay')" class="ml-2"
                          size="small"/>
                <span class="ml-2">Хоцрогдол</span>
              </div>

              <div>
                <a-switch :checked="project.show_progress_line" @change="()=>changeProjectSettings('show_progress_line')"
                          class="ml-2" size="small"/>
                <span class="ml-2">Ажлын явц</span>
              </div>
            </div>


          </template>
        </a-dropdown>





      </div>

      <!--          <a-button type="primary" @click="autoSchedule">Auto Schedule</a-button>-->
    </div>
    <div class="gantt relative">
      <div id="gantt">
        <PlanGantt
          :data="formatedTasks"
          :start="startEnd[0]"
          :end="startEnd[1]"
          v-if="!loading"
          :onClick="ganttClick"
          :onClickLink="onClickLink"
          @taskDateChanged="taskDateChanged"
          :viewMode="project.view_mode"
          :showLinks="project.show_link"
          :showDelay="project.show_delay"
          :showProgressLine="project.show_progress_line"
          ref="gantt"
          :maxTextWidth="350"
          :progressWidth="75"
        ></PlanGantt>
      </div>


      <DraggableTask
        :tasks="tasks"
        @change="categoryChange"
        @click="ganttClick"
        @parentsClosed="parentsClosed"
        style="position: absolute; top: 59.5px; left: 1px; background-color: #fff"/>
    </div>

  </div>
</template>

<script>
import {exportSVG, exportPDF, exportExcel} from './utils/export';
import PlanGantt from './gantt/index.vue';
import './style/gantt.scss';
import {formatData, minDate, maxDate, autoSchedule, findTaskById, flattenTasks} from './utils/utils.js';
import { projectPermission } from "~/store/useSiteSettings"
import {getData, formatXML} from './utils/dataUtils';
import DraggableTask from "~~/plan/Gantt/components/DraggableTask.vue";


// const { tasks, links } = getData();
function isStart(el) {
  return el.classList.contains('gantt-ctrl-start');
}

function isFinish(el) {
  return el.classList.contains('gantt-ctrl-finish');
}

export default {
  name: "svg",
  props: {
    project: Object,
    tasks: Array,
    stages: Array,
    employees: Array,
    priorities: Array,
  },
  emits: ["addTask", "editTask", "addLink", "changeProjectSettings", "deleteLink", "doCategory", "categoryChange", "taskDateChanged"],
  components: {
    DraggableTask,
    PlanGantt
  },
  data() {
    return {
      projectPermission,
      // viewMode: "month",
      viewMode: "week",
      // viewMode: "day",
      loading: false,
      showCategoryModal: false,
      closedParents: [],
      modes: [
        {
          value: "day",
          label: "Өдөр"
        },
        {
          value: "week",
          label: "7 хоног"
        },
        {
          value: "month",
          label: "Сар"
        }
      ]
    }
  },
  beforeMount() {
    if(this.project && this.project.view_mode){
      if(this.project.view_mode.toLowerCase() !== this.viewMode){
        this.viewMode = this.project.view_mode.toLowerCase();
      }
    }
  },
  computed: {
    startEnd() {
      let start = null;
      let end = null;
      this.formatedTasks.forEach((v) => {
        start = minDate(start, v.start);
        end = maxDate(end, v.end);
      });

      return [start, end]
    },
    formatedTasks() {
      return flattenTasks(this.tasks).filter(task => !this.closedParents.includes(task.parent));
    }
  },
  methods: {
    taskDateChanged(e) {
      if(this.projectPermission !== 3) {
        this.$emit("taskDateChanged", e)
      }
    },
    parentsClosed(closedParents) {
      this.closedParents = [...closedParents];
    },

    categoryChange(categories) {
      if(this.projectPermission !== 3) {
        this.$emit("categoryChange", categories)
      }

    },
    doCategory() {
      this.$emit("doCategory")
    },
    changeProjectSettings(settings) {
      if (settings === "show_link") {
        this.$emit("changeProjectSettings", {...this.project, show_link: !this.project.show_link})
      }
      if (settings === "view_mode") {

        this.$emit("changeProjectSettings", {...this.project, view_mode: this.viewMode})
      }
      if (settings === "show_delay") {
        this.$emit("changeProjectSettings", {...this.project, show_delay: !this.project.show_delay})
      }
      if (settings === "show_progress_line") {
        this.$emit("changeProjectSettings", {...this.project, show_progress_line: !this.project.show_progress_line})
      }
    },
    addTask() {
      this.$emit("addTask")
    },
    addMilestone() {
      this.$emit("addMilestone")
    },
    ganttClick(e) {
      this.$emit("editTask", {id: e.id, stage_id: e.stage_id});
    },
    onClickLink(l) {
      this.$emit("deleteLink", l)
    },
    changeData() {
      this.ganttData = formatData(tasks, links);
      let start = null;
      let end = null;
      this.ganttData.forEach((v) => {
        start = minDate(start, v.start);
        end = maxDate(end, v.end);
      });
      this.start = start;
      this.end = end;
    },
    autoSchedule() {
      this.loading = true;
      autoSchedule(tasks, links);
      this.changeData();
      this.loading = false;
    },
    exportSVG, exportPDF, exportExcel,
    addLink(s, e) {

      const sid = s.dataset['id'];
      const eid = e.dataset['id'];


      if (sid !== eid) {
        const snode = findTaskById(this.tasks, sid);
        const enode = findTaskById(this.tasks, eid);
        let stype = isStart(s) ? 'S' : 'F';
        let etype = isStart(e) ? 'S' : 'F';


        if (snode.type === 'milestone') {
          stype = 'F';
        }
        if (enode.type === 'milestone') {
          etype = 'S';
        }
        this.$emit("addLink", {source: sid, target: eid, type: `${stype}${etype}`});

        this.showLinks = true;
      }


    }
  },
  mounted() {


    const NS = 'http://www.w3.org/2000/svg';

    let $svg = null;
    let moving = false;
    let $start = null;
    let $line = null;
    document.onmousedown = (e) => {
      $svg = this.$refs.gantt.$el.querySelector('svg');

      if (!isStart(e.target) && !isFinish(e.target)) {
        return;
      }
      e.preventDefault();
      $start = e.target;
      document.querySelectorAll('.gantt-ctrl-start,.gantt-ctrl-finish').forEach(elem => {
        elem.style['display'] = 'block';
      });
      moving = true;
      $line = document.createElementNS(NS, 'line');
      const x = $start.getAttribute('cx');
      const y = $start.getAttribute('cy');
      $line.setAttribute('x1', x);
      $line.setAttribute('y1', y);
      $line.setAttribute('x2', x);
      $line.setAttribute('y2', y);
      $line.style['stroke'] = '#ffa011';
      $line.style['stroke-width'] = '2';
      $line.style['stroke-dasharray'] = '5';
      $svg.appendChild($line);
    };

    document.onmousemove = (e) => {
      if (!moving) return;
      e.preventDefault();
      if (isStart(e.target) || isFinish(e.target)) {
        const x = e.target.getAttribute('cx');
        const y = e.target.getAttribute('cy');
        $line.setAttribute('x2', x);
        $line.setAttribute('y2', y);
      } else {
        const x = e.clientX;
        const y = e.clientY;
        const rect = $svg.getBoundingClientRect();
        $line.setAttribute('x2', x - rect.left);
        $line.setAttribute('y2', y - rect.top);
      }
    };

    document.onmouseup = (e) => {

      if (!moving) return;
      e.preventDefault();
      const isCtrl = isStart(e.target) || isFinish(e.target);
      if ($start && isCtrl) {
        this.addLink($start, e.target);
      }

      document.querySelectorAll('.gantt-ctrl-start,.gantt-ctrl-finish').forEach(elem => {
        elem.style['display'] = 'none';
      });
      moving = false;
      if ($start) {
        $start.style['display'] = 'none';
        $start = null;
      }
      if ($line) {
        $svg.removeChild($line);
        $line = null;
      }
    };

  },
  beforeUnmount() {
    document.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
</script>
