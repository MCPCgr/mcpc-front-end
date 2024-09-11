<template>
  <draggable
    :list="tasks"
    :animation="200"
    ghost-class="ghost-card"
    @start="drag=true"
    @end="e=>taskOrderChanged(e)"
    :id="stage_id"
    group="tasks"
    item-key="id">
    <template #item="{element}">
      <task-card
        @edit="edit"
        @deleteTask="deleteTask"
        :task="element"
        :priorities="priorities"
        :employees="employees"
        :subTaskCounts="subTaskCounts"
        class="mt-3 cursor-pointer"
      />
    </template>
  </draggable>
</template>

<script>
import TaskCard from "~~/plan/Kanban/components/TaskCard.vue";
import draggable from "vuedraggable";

export default {
  name: "Card",
  emits:["edit", "taskOrderChanged", "deleteTask"],
  props: {
    tasks: Array,
    priorities: Array,
    employees: Array,
    subTaskCounts: Array,
    stage_id: String,
  },
  data(){
    return {
      drag: false
    }
  },
  computed:{
  },
  methods:{
    edit(task){
      this.$emit("edit", task)
    },
    deleteTask(task){
      this.$emit("deleteTask", task)
    },
    taskOrderChanged(e){
      this.$emit('taskOrderChanged', e);
    }
  },
  components: {draggable, TaskCard}
}
</script>

<style scoped>

</style>
