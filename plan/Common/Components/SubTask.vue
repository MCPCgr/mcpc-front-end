<template>
  <draggable

      :list="subTasks"
      :animation="200"
      ghost-class="sub-task-drag"
      @end="e=>subTaskOrderChanged(e)"
      group="subTasks"
      :id="groupID"
      item-key="id"
  >
    <template #item="{element}">
      <div class="flex justify-between sub-task-checklist-item ">
        <div class="sub-task-checkbox">
          <a-checkbox v-model:checked="element.is_done" @change="()=>doneSubTask(element)"></a-checkbox>
        </div>
        <div class="flex-grow flex justify-between">
          <div class="flex-grow relative flex group items-center">
            <span class="pr-1">{{ getOrderNumber(element)}}</span>
<!--            <a-input v-model:value="element.sub_task"-->
<!--                     class="sub-sub-task-title flex-grow"-->
<!--                     placeholder="Дэд ажлын нэр"-->
<!--                     @blur="()=>editSubTask(element)"-->
<!--                     @change="()=>delayChange(element)"-->
<!--            />-->

            <span class="sub-sub-task-title flex-grow ml-2 w-full" @click="startEditSubTask(element)"  v-if="element.id !== editingsubtask.id">{{ element.sub_task }}</span>
<!--            <a-form class="mb-0 w-full" :model="editingSubTask" @focusout="delayChange" @finish="editSubTask" v-if="element.id === editingsubtask.id">-->
<!--              <a-form-item class="mb-0 flex items-center">-->
<!--                <a-textarea-->
<!--                  class="sub-sub-task-title flex-grow w-full"-->
<!--                  :bordered="false" auto-size=""-->
<!--                  v-model:value="element.sub_task"-->
<!--                  v-focus placeholder="Дэд ажлын нэр"-->
<!--                />-->
<!--              </a-form-item>-->
<!--            </a-form>-->


           <a-textarea v-model:value="element.sub_task"
                       v-if="element.id === editingsubtask.id"
                       @focusout="delayChange"
                       placeholder="Дэд ажлын нэр"
                       @blur="()=>editSubTask(element)"
                       @change="()=>delayChange(element)"
                       @keydown.enter.prevent="editSubTask(element)"
                       auto-size
                       v-focus
                       class="mr-0.5"
                       />


            <div :class="`relative user-assign ${element.assignedEmployees.length >= 1 ? 'user-assigned' : ''}`">


              <a-select
                v-model:value="element.assignedEmployees"
                show-search
                mode="multiple"
                popupClassName="user-assigner"
                ref="userAssigner"
                optionFilterProp="searchValue"
                optionLabelProp="label"
                :options="employees"
                :show-search="true"
                :max-tag-count="3"
                :maxTagPlaceholder="maxTagPlaceholder"
                @change="()=>empAssigned(element)"
                :dropdownMatchSelectWidth="false"
              >
                <template #placeholder>
                  <div class="flex items-center justify-center h-full w-full cursor-pointer">
                    <img alt="avatar" class="h-full w-full object-cover bg-no-repeat bg-center"
                      :src="'/amjilt-erp/images/defaultAvatar.svg'">
                    <span class="user-add">+</span>
                  </div>
                </template>
                <template #tagRender="{ value: val, label, closable, onClose, option }">
                  <a-tag :closable="closable" style="margin-right: 3px" @close="onClose" v-if="option">
                    <a-avatar style="width: 28px; height: 28px; flex: none; cursor: pointer">
                      <template #icon>
                        <div class="flex items-center justify-center h-full w-full">
                          <img alt="avatar" class="h-full w-full object-cover bg-no-repeat bg-center"
                               :src="option.avatar !== null && option.avatar !== '' ? 'https://api.amjilt.com/main'+option.avatar : '/amjilt-erp/images/defaultAvatar.svg'">
                        </div>
                      </template>
                    </a-avatar>
                  </a-tag>
                </template>
                <template #option="{ value: val, label, avatar}">
                  <div class="flex items-center space-x-3 font-semibold">
                    <a-avatar style="width: 28px; height: 28px; flex: none;">
                      <template #icon>
                        <div class="flex items-center justify-center h-full w-full">
                          <img alt="avatar" class="h-full w-full object-cover bg-no-repeat bg-center"
                               :src="avatar !== null && avatar !== '' ? 'https://api.amjilt.com/main'+avatar : '/amjilt-erp/images/defaultAvatar.svg'">
                        </div>
                      </template>
                    </a-avatar>
                    <span>{{ label }}</span>
                  </div>
                </template>
              </a-select>
            </div>

            <div :class="`sub-task-due-date ${element.due_date === null || element.due_date === undefined  ? 'due-date-not-set' : 'due-date-seted'}` ">
              <a-date-picker
                v-model:value="element.due_date"
                placeholder="" :bordered="false"
                :locale="locale"
                value-format="YYYY-MM-DDTHH:mm:ss[Z]"

                @blur="()=>editSubTask(element)"
                @change="()=>delayChange(element)"
              />
            </div>
          </div>
          <div class="sub-task-delete-btn">
            <a-popconfirm
                title="Устгах уу?"
                ok-text="Тийм"
                cancel-text="Үгүй"
                @confirm="()=>deleteTask(element)"
                @click.stop
                placement="left"
            >
              <DeleteOutlined class="ml-2 hover:text-primary_color" @click.prevent/>
            </a-popconfirm>
          </div>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import {DeleteOutlined} from "@ant-design/icons-vue";
import mn_MN from "@lambda-platform/lambda-vue/src/antlocale/date_mn_MN";

export default {
  name: "SubTask",
  components: {draggable, DeleteOutlined},
  emits: ["editSubTask", "deleteSubTask", "subTaskOrderChanged", "doneSubTask", "empAssigned"],
  props: {
    subTasks: Array,
    employees: Array,
    groupID: String
  },
  data() {
    return {
      delayTimer: null,
      showMembersModal: false,
      selectedUsers: [],
      selectedEmps: [],
      editingsubtask: {
        id: "",
        sub_task: ""
      }
    }
  },
  computed: {
    locale(){
      return mn_MN
    }
  },
  methods: {

    getOrderNumber(subTask){
      const index = this.subTasks.findIndex(st => st.id === subTask.id);
      return index + 1;
    },
    maxTagPlaceholder(extraUsers) {
      return "+" + extraUsers.length
    },
    subTaskOrderChanged(e) {
      this.$emit('subTaskOrderChanged', e);
    },
    delayChange(task) {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
      }
      this.delayTimer = setTimeout(() => {
        this.$emit('editSubTask', task);
      }, 500);
    },
    empAssigned(task){
      this.editSubTask(task);
      this.$emit("empAssigned", task.assignedEmployees)
    },
    // editSubTask(task) {
    //   clearTimeout(this.delayTimer);

    //   this.$emit('editSubTask', task);
    // },
    startEditSubTask(task){
      this.editingsubtask = task;
    },
    deleteTask(task) {
      this.$emit("deleteSubTask", task)
    },
    doneSubTask(task) {
      this.$emit("doneSubTask", task)
    },
    editSubTask() {
      if(this.editingsubtask.sub_task !== "" && this.editingsubtask.id !== "") {
        const editData = {...this.editingsubtask}
        this.editingsubtask = {
          id:"",
          sub_task: "",
        }
        this.$emit("editSubTask", editData);
      }
    }

  },

}
</script>


