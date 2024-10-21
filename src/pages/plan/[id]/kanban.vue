<template>
  <div>
    <Head>
      <Title>Ажил төлөвлөлт</Title>
    </Head>
    <portal to="sub-top-menu">
      <TopMenu
        :current="['kanban']"
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
    <div class="overflow-x-scroll w-auto">
      <Kanban
        v-if="!loading"
        :stages="stages"
        :priorities="priorities"
        :employees="employees"
        :subTaskCounts="subTaskCounts"
        @createStage="createStage"
        @createTask="createTask"
        @stageOrderChanged="stageOrderChanged"
        @taskOrderChanged="taskOrderChanged"
        @editTask="editTask"
        @editStage="editStage"
        @deleteTask="deleteTask"
        @deleteStage="deleteStage"
      />
      <kanbanSkeleton v-if="loading"/>
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
          :priorities="priorities"
          :company_id="company.company_id"
          :emp_id="user.emp_id"
          :employees="employees"
          :companyEmployees="companyEmployees"
          :editMode="true"
          url="https://plan.mcpc.mn"
          @onSuccess="taskOnSuccess"
          @subTaskUpdated="subTaskUpdated"
          @onReady="readyTaskEdit"
        />
      </div>
    </a-modal>
  </div>
</template>

<script>
import SubTopMenu from "~/components/Menu/SubTopMenu.vue";
import pageMixin from "~/mixins/page";
import Kanban from "../../../../plan/Kanban/Kanban.vue";
import projectMixin from "../../../../plan/Mixins/project";
import kanbanSkeleton from "../../../../plan/Kanban/kanbanSkeleton.vue";

export default {
  name: "index",
  mixins: [pageMixin, projectMixin],
  components: {SubTopMenu, Kanban, kanbanSkeleton},
  data() {
  },
  beforeMount() {
    this.projectMode = "kanban";
  },
}
</script>

<style scoped lang="scss">

</style>
