<template>
  <div>
    <Head>
      <Title>Ажил төлөвлөлт</Title>
    </Head>
    <portal to="sub-top-menu" >
      <PMTopMenu :current="['my-tasks']"


      />
    </portal>
    <portal to="header-left">
      <div class="flex">
        <div class="page-title ">
          <div class="float-left pt-3">
            <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">Миний төслүүд</h1>
            <h2 class="text-gray-400 text-xs m-0"><span>Ажил төлөвлөлт</span></h2>
          </div>
        </div>


      </div>
    </portal>
    <div class="">
      <div class="flex justify-between">
        <div>
          Танд нийт: {{tasks.length}} ажил байна
        </div>
        <div>
          Эрэмлэлт: <a-select
            v-model:value="taskSort"
            show-search
            class="mr-2"

            placeholder="Эрэмлэлт"
            optionFilterProp="searchValue"
            optionLabelProp="label"
            :options="taskOrderOptions"
            :show-search="true"


          >



          </a-select>
          <a-select
            v-model:value="selectedProjectID"
            show-search
            style="width: 300px"
            placeholder="Төслөөр хайх"
            optionFilterProp="searchValue"
            optionLabelProp="label"
            :options="projects"
            :show-search="true"
            :allow-clear="true"

          >
            <template #option="{ value: val, label, logo}">
              <div class="flex items-center space-x-3 font-semibold">
                <a-avatar style="width: 32px; height: 32px; flex: none;">
                  <template #icon>

                    <div class="flex-none">
                      <div v-if="!logo"
                           class="h-8 w-8 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
                        {{ label.substring(0, 2).toUpperCase() }}
                      </div>
                      <div
                        v-if="logo"
                        class="h-8 w-8 rounded-full overflow-hidden text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
                        <img :src="`https://plan.mcpc.mn${logo}`" alt="">
                      </div>
                    </div>
                  </template>
                </a-avatar>
                <span>{{ label }}</span>
              </div>
            </template>


          </a-select>
        </div>
      </div>

      <myTaskSkeleton v-if="loading"></myTaskSkeleton>


      <div v-if="!loading">

        <task-card
          v-for="task in filteredTasks"
          :disableDelete="true"
          :hideEditIcon="true"
          :key="task.index"
          @edit="()=>editTask(task, true)"
          @deleteTask="()=>deleteTask(task)"
          :task="task"
          :priorities="priorities"
          :employees="companyEmployees"
          :subTaskCounts="subTaskCounts"
          class="mt-3 cursor-pointer"
          :projectData="getProjectData(task.project_id)"
        />
      </div>
    </div>

    <a-modal
      v-if="!loading"
      ref="taskRef"
      v-model:open="showTaskModal"

      :width="form_width"
      style="top: 65px"
      :force-render="false"
      :footer="null"
      wrap-class-name="task-form-modal"

    >
      <div class="flex items-center min-h-fit">

        <TaskForm
          ref="taskForm"
          :priorities="[]"
          :company_id="company.company_id"
          :emp_id="user.emp_id"
          :employees="companyEmployees"
          :companyEmployees="companyEmployees"
          :editMode="true"
          url="https://plan.mcpc.mn"
          @onSuccess="taskOnSuccessList"
          @subTaskUpdated="subTaskUpdated"
          @onReady="readyTaskEdit"
        />
      </div>
    </a-modal>
  </div>
</template>

<script>
import PMTopMenu from "~~/plan/Common/Components/PMTopMenu.vue";
import myTaskSkeleton from "~~/plan/Common/Components/myTaskSkeleton.vue";
import pageMixin from "~/mixins/page";
import axios from "~/plugins/core/axios";
import TaskCard from "~~/plan/Kanban/components/TaskCard.vue";
import projectMixin from "~~/plan/Mixins/project";

import {clearDuplicates} from "~~/plan/utils/utils";
import TaskForm from "~~/plan/Common/Components/TaskForm.vue";


export default {
  name: "index",
  mixins: [pageMixin, projectMixin],
  components: {TaskForm, PMTopMenu, myTaskSkeleton, TaskCard},
  data() {
    return {
      projects:[],
      tasks:[],
      loading:true,
      selectedProjectID:null,
      taskSort:"byStartDateAsc",
      taskOrderOptions:[
        {
          value:"byStartDateAsc",
          label:"Эхлэх огноо багаас их"
        },
        {
          value:"byStartDateDesc",
          label:"Эхлэх огноо ихээс бага"
        },
        {
          value:"byEndDateAsc",
          label:"Дуусах огноо багаас их"
        },
        {
          value:"byEndDateDesc",
          label:"Дуусах огноо ихээс бага"
        },
        {
          value:"byProgressAdc",
          label:"Гүйцэтгэл багаас их"
        },
        {
          value:"byProgressDesc",
          label:"Гүйцэтгэл ихээс баг"
        },
      ]

    };
  },
  computed: {
    filteredTasks(){
      if(this.selectedProjectID){
        return this.sortedTasks.filter(t=>t.project_id === this.selectedProjectID)
      } else {
        return this.sortedTasks
      }
    },
    sortedTasks() {
      return this.tasks.sort((a, b) => {
        switch (this.taskSort) {
          case 'byStartDateAsc':
            return new Date(a.start_date) - new Date(b.start_date);
          case 'byStartDateDesc':
            return new Date(b.start_date) - new Date(a.start_date);
          case 'byEndDateAsc':
            return new Date(a.end_date) - new Date(b.end_date);
          case 'byEndDateDesc':
            return new Date(b.end_date) - new Date(a.end_date);
          case 'byProgressAdc': // Notice the typo, it should probably be "byProgressAsc"
            return a.progress - b.progress;
          case 'byProgressDesc':
            return b.progress - a.progress;
          default:
            return 0;
        }
      }).filter(task => task !== undefined); // Filter out undefined values if any
    },
  },
  methods: {
    getTasks(){
      this.loading = true;
      axios.post("https://plan.mcpc.mn/get-my-tasks", {}).then(res=>{

        this.projects = clearDuplicates(res.data.projects).map(p=>{
          return {
            ...p, value:p.id, label:p.title
          }
        });
        this.tasks = res.data.tasks.map(task => {
            const taskMembers = res.data.taskMembers.filter(member => member.task_id === task.id);
            return {...task, taskMembers: taskMembers}
        });


        this.subTaskCounts = res.data.subTaskCounts;
        this.taskMembers = res.data.taskMembers;


          this.getProjectEmployees();

      }).catch(e=>{
        console.log(e);

        this.projects = [];
        this.tasks = [];
        this.subTaskCounts = [];

        this.loading = false;
      })
    },
    getProjectData(project_id){
      const i = this.projects.findIndex(p=>p.id === project_id)
      if(i >= 0) {
        return this.projects[i];
      } else {
        return undefined
      }
    },
    taskOnSuccessList(savedData){

      const taskIndex = this.tasks.findIndex(t=>t.id === savedData.id);
      if(taskIndex >= 0){
        this.tasks[taskIndex] = {
        ...this.tasks[taskIndex], ...savedData,
          taskMembers: savedData.taskMembers
        }
      }

    }

  },
  mounted() {
    this.getTasks();
  }
}
</script>

<style scoped lang="scss">

</style>
