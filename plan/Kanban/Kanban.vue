<template>
  <div :style="`width: ${(stages.length*340)+340}px`" class="pb-8 kanban">
    <draggable
      class="inline-block"
      :list="stages"
      :animation="200"
      ghost-class="ghost-card"
      @end="stageOrderEnd"
      group="stages"
      item-key="id"
    >
      <template #item="{element}">
        <div class="bg-gray-200 rounded-lg px-3 py-3 stage rounded mr-4 inline-block align-top"
          style="overflow-y: auto;
          -webkit-overflow-scrolling: touch;" ref="container">
          <div>
              <div class="flex justify-between items-center">
              <span class="text-gray-700 font-semibold font-sans tracking-wide text-sm flex-col mb-0 cursor-pointer" @click="startEditeStage(element)" v-if="element.id !== editingStage.id">{{ element.stage }} </span>
              <a-form :model="editingStage" @focusout="deferStopCreateStage"  @finish="editStage" v-if="element.id === editingStage.id">
                <a-form-item class="mb-0">
                  <a-input v-model:value="editingStage.stage" v-focus   placeholder="Ажлын нэр"/>
                </a-form-item>
              </a-form>
              <DropDown @deleteEvent="()=>deleteStage(element)" @editEvent="()=>startEditeStage(element)" />
            </div>
            <Cards
              :tasks="element.tasks"
              :priorities="priorities"
              :employees="employees"
              :subTaskCounts="subTaskCounts"
              :stage_id="element.id"
              @edit="editTask"
              @deleteTask="deleteTask"
              @taskOrderChanged="taskOrderChanged"
            />
            <a-button @click="showNewTaskStageID = element.id" type="link" class="add-task-btn mt-1" v-if="showNewTaskStageID !== element.id">
              <template #icon>
                        <span class="anticon align-top ant-btn-svg-icon" style="vertical-align: top">
                            <inline-svg
                              src="/assets/icons/duotune/general/gen041.svg"
                            />
                        </span>
              </template>
              Ажилбар нэмэх
            </a-button>
            <div class="mt-2"  v-if="showNewTaskStageID === element.id">
              <a-form :model="newTask" @focusout="deferStopCreateTask"  @finish="createTask">
                <a-form-item>
                  <a-input v-model:value="newTask.task" v-focus   placeholder="Ажлын нэр"/>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit">Ажилбар нэмэх</a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <div class="bg-gray-200 rounded-lg px-3 py-3 stage rounded mr-4 inline-block align-top">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm flex-col" v-if="!showAddStage">
        <a-button @click="showAddStage = true" type="link" class="add-task-btn mt-1" >
          <template #icon>
                        <span class="anticon align-top ant-btn-svg-icon" style="vertical-align: top">
                            <inline-svg
                              src="/assets/icons/duotune/general/gen041.svg"
                            />
                        </span>
          </template>
          Төлөв нэмэх
        </a-button>

      </p>
      <div  v-if="showAddStage" class="mt-2">
        <a-form :model="newStage" @focusout="deferStopCreateStage"  @finish="createStage">
          <a-form-item>
            <a-input v-model:value="newStage.stage" v-focus   placeholder="Төлөв нэр"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">Төлөв нэмэх</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>


<script>
import draggable from "vuedraggable";

import Cards from "./Cards.vue";
import DropDown from "../Common/Components/DropDown.vue";

export default {
  name: "Kanban",
  emits:["createStage", "createTask", "stageOrderChanged", "editTask", "taskOrderChanged", "deleteTask", "deleteStage", "editStage"],
  props: {
    stages: Array,
    priorities: Array,
    employees: Array,
    subTaskCounts: Array,
  },
  components: {
    DropDown,
    Cards,
    draggable
  },
  data() {
    return {


      showAddStage: false,
      newTask: {
        task: "",
      },
      newStage: {
        stage: "",
      },
      editingStage: {
        id:"",
        stage: "",
      },
      showNewTaskStageID: null,
      editStageID: null,

    };
  },
  methods: {
    startEditeStage(stage){
      this.editingStage = stage;
    },
    stageOrderEnd(e){
      this.$emit("stageOrderChanged", e)
    },
    taskOrderChanged(e){
      this.$emit("taskOrderChanged", e)
    },
    createTask() {
      if(this.newTask.task !== ""){
        const task = {
          task:this.newTask.task,
          stage_id:this.showNewTaskStageID,
        };
        // this.stopCreate();
        this.newTask.task = "";
        this.$emit("createTask", task);

      }
    },
    deferStopCreateStage(event) {
      // Check if the relatedTarget (the new element being focused) is the submit button
      if (event.relatedTarget && event.relatedTarget.type === 'submit') {
        return;  // If it is, do nothing
      }

      // Otherwise, defer the execution of stopCreateStage
      setTimeout(() => {
        this.stopCreateStage();
      }, 0);
    },
    deferStopCreateTask(event) {
      // Check if the relatedTarget (the new element being focused) is the submit button
      if (event.relatedTarget && event.relatedTarget.type === 'submit') {
        return;  // If it is, do nothing
      }

      // Otherwise, defer the execution of stopCreateStage
      setTimeout(() => {
        this.stopCreate();
      }, 0);
    },
    createStage() {

      if(this.newStage.stage !== ""){
        const stage = this.newStage.stage;
        this.stopCreateStage();
        this.$emit("createStage", stage);

      }
    },
    stopCreate(){
      this.showNewTaskStageID = null;
      this.newTask = {
        task: "",
      }
    },
    stopCreateStage(){
      this.showAddStage = false;
      this.newStage = {
        stage: "",
      }
    },
    editTask(task) {
      this.$emit("editTask",task);
    },
    editStage() {
      if(this.editingStage.stage !== "" && this.editingStage.id !== "") {
        const editData = {...this.editingStage}
        this.editingStage = {
          id:"",
          stage: "",
        }
        this.$emit("editStage", editData);

      }
    },
    deleteTask(task) {
      this.$emit("deleteTask", task);
    },
    deleteStage(stage) {
      this.$emit("deleteStage", stage);
    },
    setupScroll() {
      const container = this.$refs.container;
      container.addEventListener('scroll', () => {
        console.log('Scrolled!');
      });
    },

  },
  mounted() {
    this.setupScroll();
  },
};
</script>
