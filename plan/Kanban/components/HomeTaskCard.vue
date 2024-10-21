<template>
  <div class="bg-white dark:bg-slate-800 border-b dark:border-slate-700 p-2 hover:bg-gray-100 task" @click="edit">
    <div v-if="priority" class="w-full flex-grow">
      <div class="w-16 h-2 rounded-lg block mb-1"  :style="`background-color:${priority.color};`"></div>
    </div>
    <div class="flex justify-between items-start">

      <div class="flex space-x-6 justify-between items-center w-full">
        <div class="w-full text-gray-700 dark:text-white font-sans tracking-wide text-sm line-clamp-2">{{task.task}}</div>
        <ProjectTitle class="w-full" v-if="projectData && projectData.id" :project="projectData"></ProjectTitle>
      </div>

      <div class="flex task-edit">
        <EditOutlined v-if="!hideEditIcon"  />
        <a-popconfirm
          v-if="!disableDelete"
          title="Устгах уу?"
          ok-text="Тийм"
          cancel-text="Үгүй"
          @confirm="deleteTask"
          @click.stop
          placement="bottom"
        >
          <DeleteOutlined class="ml-2 hover:text-primary_color" @click.prevent  />
        </a-popconfirm>

      </div>
    </div>
    <div class="flex mt-4 justify-between items-center" v-if="task.start_date">
      <span class="text-xs text-gray-600 dark:text-white">{{$date(task.start_date) }}<span> - {{$date(task.end_date) }}</span></span>

      <badge v-if="task.type" :color="badgeColor">{{task.type}}</badge>
    </div>

    <div class="ltr:text-right rtl:text-left text-xs text-slate-600 dark:text-white mb-1 font-medium mt-3" v-if="task.progress > 0 && task.progress_calculate_type !== 'not_calculate'">
     {{ task.progress ? task.progress : 0 }}%
    </div>
    <div class="relative mb-2" v-if="task.progress > 0 && task.progress_calculate_type !== 'not_calculate'">
      <div class="w-full rounded-[999px] overflow-hidden bg-slate-100 dark:bg-slate-100 h-2">
        <div class="flex flex-col text-center whitespace-nowrap justify-center h-full bg-green-500"
             :style="`width: ${ task.progress ? task.progress : 0}%; transition: width 1s linear 0s;`">
          <!--              <span style="color: white;">Гүйцэтгэл: 75%</span>-->
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center">
      <div class="">
        <span class="text-gray-700 font-sans tracking-wide text-xs" v-if="subTaskCount"><i class="ti-check-box align-middle text-sm"></i>{{subTaskCount}}</span>
      </div>
      <div class="flex flex-grow justify-end mb-2 mt-2.5" v-if="users">
        <div class="flex flex-none -space-x-3">
          <img v-for="user in users.slice(0, 10)" class="flex-none h-7 w-7 rounded-full ring-1 ring-white object-cover"
               :src="user.avatar !== null && user.avatar !== '' ? 'https://mcpc.mn'+user.avatar : '/amjilt-erp/images/defaultAvatar.svg'"
               :key="user.id"
               alt=""/>
          <div v-if="users.length > 10"
               class="flex-none h-7 w-7 rounded-full ring-1 ring-white bg-black/95 flex items-center justify-center">
            <div class="flex items-center space-x-0.5 text-white text-[10px]">
              <plus-outlined :style="{fontSize: '8px'}"/>
              <span>{{ users.length - 10 }}</span>
            </div>
          </div>
        </div>
      </div>

    </div>




  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import Badge from "./Badge.vue";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { getDate } from "~/utils/date";
import ProjectTitle from "~~/plan/Project/ProjectTitle.vue";

// Props are defined with the defineProps function
const props = defineProps({
  priorities: Array,
  employees: Array,
  subTaskCounts: Array,
  task: Object,
  projectData: Object,
  disableDelete: Boolean,
  hideEditIcon: Boolean,
});

// Emits are defined with the defineEmits function
const emit = defineEmits(["edit", "deleteTask"]);

// Methods can be defined directly in the setup script
function edit() {
  emit("edit", props.task);
}

function deleteTask() {
  emit("deleteTask", props.task);
}

// Computed properties are defined using the computed function
const subTaskCount = computed(() => {
  const index = props.subTaskCounts ? props.subTaskCounts.findIndex(subTaskCount => subTaskCount.TaskID === props.task.id) : -1;
  if (index >= 0) {
    return `${props.subTaskCounts[index].DoneCount}/${props.subTaskCounts[index].SubTaskCount}`;
  } else {
    return "";
  }
});

const priority = computed(() => {
  if (props.task.priority_id != null) {
    const index = props.priorities.findIndex(p => p.id === props.task.priority_id);
    if (index >= 0) {
      return props.priorities[index];
    } else {
      return null;
    }
  } else {
    return null;
  }
});

const badgeColor = computed(() => {
  const mappings = {
    Design: "purple",
    "Feature Request": "teal",
    Backend: "blue",
    QA: "green",
    default: "teal",
  };
  return mappings[props.task.type] || mappings.default;
});

const users = computed(() => {
  if (props.task.taskMembers && props.employees) {
    if (props.employees.length >= 1 && props.task.taskMembers.length >= 1) {
      return props.task.taskMembers.map(member => {
        const empIndex = props.employees.findIndex(emp => emp.id === member.emp_id);
        if (empIndex >= 0) {
          return {
            ...member,
            avatar: props.employees[empIndex].avatar,
            lastname: props.employees[empIndex].lastname,
            firstname: props.employees[empIndex].firstname,
            login: props.employees[empIndex].login,
          }
        } else {
          return undefined;
        }
      }).filter(m => m !== undefined);
    } else {
      return [];
    }
  } else {
    return [];
  }
});


</script>
