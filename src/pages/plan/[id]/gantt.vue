<template>
  <div>
    <Head>
      <Title>Ажил төлөвлөлт</Title>
    </Head>
    <portal to="sub-top-menu">
      <TopMenu
        :current="['gantt']"
        @filter="filter"
        @saveNotificationSettings="saveNotificationSettings"
        :filterData="filterData"
        :projectID="$route.params.id"
        :members="members"
        :employees="companyEmployees"
        :notificationSettings="notificationSettings"
      />
    </portal>
    <portal to="header-left">
      <ProjectHeader
          :loading="loading"
          :project="project"
          :members="members"
          :employees="companyEmployees"
          @changeProjectSettings="changeProjectSettings"
          @changeProjectMembers="changeProjectMembers"
      />
    </portal>
    <div class="dashboard_tab bg-white p-3 ">
      <a-skeleton v-if="loading" active/>
      <Gantt
          :project="project"
          :tasks="ganttTasks"
          :stages="stages"
          :employees="employees"
          :priorities="priorities"
          v-if="!loading"
          @addTask="addTask"
          @addMilestone="addMilestone"
          @editTask="editTask"
          @addLink="addLink"
          @deleteLink="deleteLink"
          @changeProjectSettings="changeProjectSettings"
          @doCategory="doCategory"
          @categoryChange="categoryChange"
          @taskDateChanged="taskDateChanged"
      />
    </div>
    <a-modal
        v-if="!loading"
        ref="taskRef"
        v-model:open="showTaskModal"
        :width="form_width"
        style="top: 65px"
        :force-render="true"
        :footer="null"
    >
      <div class="flex items-center min-h-fit">
        <TaskForm
            ref="taskForm"
            :priorities="priorities"
            :employees="employees"
            :companyEmployees="companyEmployees"
            :editMode="true"
            :company_id="company.company_id"
            :emp_id="user.emp_id"
            url="https://plan.mcpc.mn"
            @onSuccess="taskOnSuccess"
            @onReady="readyTaskEdit"
            @deleteMilestone="deleteMilestone"
        />
      </div>
    </a-modal>
    <a-modal
        ref="taskRef"
        v-model:open="showDoCategoryModal"
        title="Бүлэгчлэх"
        :width="form_width"
        style="top: 65px"
        :footer="null"
    >
      <div class="">
        <DraggableTask :tasks="ganttTasks" @change="categoryChange"/>
      </div>
    </a-modal>
  </div>
</template>

<script>
import SubTopMenu from "~/components/Menu/SubTopMenu.vue";
import pageMixin from "~/mixins/page";
import Gantt from "../../../../plan/Gantt/Gantt.vue";
import {findTaskById, flattenTasks, walkLevel} from "../../../../plan/Gantt/utils/utils";
import DraggableTask from "../../../../plan/Gantt/components/DraggableTask.vue";
import projectMixin from "../../../../plan/Mixins/project";
import axios from "~/plugins/core/axios";

export default {
  name: "index",
  mixins: [pageMixin, projectMixin],
  components: {SubTopMenu, Gantt, DraggableTask},
  data() {
    return {
      showDoCategoryModal: false,
    };
  },
  beforeMount() {
    this.projectMode = "gantt";
  },
  methods: {
    taskDateChanged(task) {
      const editedTask = findTaskById(task.id)
      this.updateTaskById(this.ganttTasks, task.id, {...editedTask, start: task.start_date, end: task.end_date});
      axios.post("https://plan.mcpc.mn/update-task-date", task).catch(e => {
        console.log(e)
      })
    },
    updateNestedData(data, parentLevel = "", parentID) {
      data.forEach((item, index) => {
        if (item.name === "Ажилтан сонгохдоо, алба хэлтсээс сонгох") {
          console.log(parentID)
          console.log(parentID)
        }
        if (parentID !== null && parentID !== "" && parentID !== undefined) {
          item.parent = parentID
          item.level = `${parentLevel}.${index + 1}`
        } else {
          item.level = `${index + 1}`
          item.parent = null;
        }

        item.text = this.getGanttTaskText(item.level, item.name);
        if (item.type !== "milestone") {
          if (item.children && item.children.length > 0) {
            item.type = "group";
            this.updateNestedData(item.children, item.level, item.id);
          } else {
            item.type = "";
          }
        }
        this.updateTaskLevelByIdInStage(item)
      });
    },
    updateTaskLevelByIdInStage(ganttTask) {
      let stageIndex = this.stages.findIndex(stage => stage.id === ganttTask.stage_id);
      if (stageIndex >= 0) {
        let taskIndex = this.stages[stageIndex].tasks.findIndex(task => task.id === ganttTask.id);
        if (taskIndex >= 0) {
          this.stages[stageIndex].tasks[taskIndex] = {
            parent_id: ganttTask.parent,
            level: ganttTask
          }
        }
      }
    },
    categoryChange(categories) {
      walkLevel(categories, "")
      this.ganttTasks = categories
      this.updateNestedData(this.ganttTasks, undefined, undefined);
      setTimeout(() => {
        axios.post("https://plan.mcpc.mn/update-task-level", flattenTasks(this.ganttTasks))
            .catch(error => {
              console.log(error);
            });
      }, 210)
    },
    doCategory() {
      this.showDoCategoryModal = true;
    }
  },
}
</script>

<style scoped lang="scss">

</style>
