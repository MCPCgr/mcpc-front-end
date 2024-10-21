<template>
  <div class="task-form p-3">
    <div class="flex justify-between items-center mb-5">
      <div>
        <inline-svg
          class="svg-icon-gray mr-2"
          v-if="!task.is_milestone"
          src="/assets/icons/duotone/Communication/Clipboard-check.svg"
        />
        <inline-svg
          class="svg-icon-gray mr-2"
          v-else
          src="/assets/icons/duotone/Navigation/Route.svg"
        />
      </div>
      <div class="flex-grow mr-2">
        <a-input
          v-model:value="task.task"
          class="w-full task-title"
          @blur="saveTask"
          @pressEnter="saveTask"
          :disabled="projectPermission === 3"
          :placeholder="task.is_milestone ? 'Чухал үе шат' : 'Ажилбар нэр'"
        />

      </div>
    </div>
    <div class="flex justify-between mb-5 w-full flex-wrap" v-if="!task.is_milestone">
      <div class="cursor-pointer" @click="addMembers">
        <div class="flex items-center space-x-3">
          <div class="flex flex-none -space-x-3">
            <img
              v-for="user in users.slice(0, 7)"
              class="flex-none h-7 w-7 rounded-full ring-1 ring-white object-cover"
              :src="
                user.avatar !== null && user.avatar !== ''
                  ? 'https://mcpc.mn' + user.avatar
                  : '/amjilt-erp/images/defaultAvatar.svg'
              "
              :key="user.id"
              alt=""
            />
            <div
              v-if="users.length > 7"
              class="flex-none h-7 w-7 rounded-full ring-1 ring-white bg-black/95 flex items-center justify-center"
            >
              <div class="flex items-center space-x-0.5 text-white text-[10px]">
                <plus-outlined :style="{ fontSize: '8px' }" />
                <span>{{ users.length - 7 }}</span>
              </div>
            </div>
          </div>
          <div class="w-full font-semibold text-sm truncate">
            <span v-for="(user, index) in users.slice(0, 3)"
              ><span v-if="index >= 1">, </span>{{ user.firstname }}</span
            >
            <span v-if="users.length > 3">...</span>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <div class="button-primary">
          <a-button @click="addMembers" type="link" class="add-member-btn flex" v-if="projectPermission === 1 || projectPermission === 2">
            <template #icon>
              <span class="svg-icon-gray" style="vertical-align: top">
                <inline-svg
                  src="/assets/icons/duotone/Communication/Group.svg"
                />
              </span>
            </template>
            <span class="ml-2">Оролцогч сонгох</span>
          </a-button>
        </div>
      </div>
    </div>
    <div class="flex sm:flex-none justify-between items-center mb-5">
      <div>
        <inline-svg
          class="svg-icon-gray mr-2 c"
          src="/assets/icons/duotune/text/txt001.svg"
        />
      </div>
      <div class="flex mr-2 w-full">
        <div
          @click="startDescEdit"
          v-if="!descriptionEditing"
          class="cursor-pointer p-3 w-full bg-gray-200 rounded-lg task-description flex max-w-full"
        >
        <span v-html="task.description ? task.description : 'Тайлбар аа энд оруулна уу'"></span>
        </div>
        <div v-if="descriptionEditing">
          <CK
            :value="task.description"
            url="https://mcpc.mn"
            @on-finish="descChange"
            @onCancel="descCancel"
          ></CK>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-5 gap-4 ">
      <div class="col-span-3 flex justify-between items-center mb-5">
        <div>
          <inline-svg
            class="svg-icon-gray mr-2"
            src="/assets/icons/duotone/Interface/Calendar.svg"
          />
        </div>
        <div class="flex-grow mr-2">
          <a-range-picker
            v-if="!task.is_milestone"
            v-model:value="dateRange"
            @change="dateChanged"
            :disabled="projectPermission === 3"
            class="w-full task-date"
          />
          <a-date-picker
            v-if="task.is_milestone"
            v-model:value="dateRange[0]"
            @change="dateChanged"
            :disabled="projectPermission === 3"
            class="w-full task-date"
          />
        </div>
      </div>
      <div
        class="col-span-2 flex justify-between items-center mb-5"
        v-if="!task.is_milestone"
      >
        <div>
          <inline-svg
            class="svg-icon-gray mr-2"
            src="/assets/icons/duotone/General/Bookmark.svg"
          />
        </div>
        <div class="flex-grow task-priority">
          <a-select
            v-model:value="task.priority_id"
            class="addable-select"
            placeholder="Зэрэглэл"
            allowClear
            :disabled="projectPermission === 3"
            @change="saveTask"
          >
            <a-select-option
              :value="priority.id"
              :label="priority.priority"
              v-for="priority in priorities"
              :key="priority.index"
            >
              <span
                class="w-4 h-4 rounded-full inline-block align-center"
                :style="`background-color:${priority.color}; vertical-align: middle`"
              ></span>
              {{ priority.priority }}
            </a-select-option>
          </a-select>
          <a-button class="ml-2" @click="showAddPriorityModal = true" v-if="projectPermission !== 3">
            <template #icon>
              <span class="svg-icon-gray">
                <inline-svg src="/assets/icons/duotune/general/gen041.svg" />
              </span>
            </template>
          </a-button>
        </div>
      </div>
    </div>

    <div
      class="flex justify-between items-center mb-5"
      v-if="!task.is_milestone"
    >
      <div>
        <inline-svg
          class="svg-icon-gray mr-2"
          src="/assets/icons/duotone/Shopping/Calculator.svg"
        />
      </div>
      <div class="flex-grow mr-2 ml-3">
        Гүйцэтгэл:
        <a-radio-group
          v-model:value="task.progress_calculate_type"
          name="radioGroup"
          button-style="solid"
          size="small"
          @change="saveTask"
          :disabled="projectPermission === 3"
        >
          <a-radio-button value="by_sub_task"
            >Дэд ажиллаас тооцоолох</a-radio-button
          >
          <a-radio-button value="by_manual">Гараар оруулах</a-radio-button>
          <a-radio-button value="not_calculate">Тооцохгүй</a-radio-button>
        </a-radio-group>
      </div>
    </div>

    <div
      class="grid grid-cols-5 gap-4"
      v-if="
        !task.is_milestone && task.progress_calculate_type !== 'not_calculate'
      "
    >
      <div class="col-span-3 flex justify-between items-center">
        <div>
          <inline-svg
            class="svg-icon-gray mr-2"
            src="/assets/icons/duotone/Navigation/Double-check.svg"
          />
        </div>
        <div class="flex-grow mr-2">
          <div class="flex">
            <div
              v-if="
                task.progress_calculate_type === 'by_sub_task' &&
                subTaskGroups.length >= 1
              "
              class="flex justify-between flex-grow"
            >
              <div>{{ task.progress }}%</div>
              <div class="relative flex-grow mt-2">
                <div
                  class="w-full rounded-[999px] overflow-hidden bg-slate-100 dark:bg-slate-100 h-2 ml-2"
                >
                  <div
                    class="flex flex-col text-center whitespace-nowrap justify-center h-full bg-green-500"
                    :style="`width: ${
                      task.progress ? task.progress : 0
                    }%; transition: width 1s linear 0s;`"
                  ></div>
                </div>
              </div>
            </div>
            <a-input-number
              v-if="
                task.progress_calculate_type === 'by_manual' ||
                subTaskGroups.length <= 0
              "
              :disabled="projectPermission === 3"
              v-model:value="task.progress"
              class="task-percent"
              :max="100"
              :min="0"
              placeholder="Гүйцэтгэл"
              :formatter="
                (value) => {
                  const [integer, fractional] = `${value}`.split('.');
                  const formattedInteger = integer.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ','
                  );
                  return `${formattedInteger}${
                    fractional ? '.' + fractional.slice(0, 3) : ''
                  }`;
                }
              "
              :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
              @change="saveTask"
            />
            <a-button
              :v-if="projectPermission !== 3"
              @click="completeTask"
              v-if="
                task.progress_calculate_type === 'by_manual' ||
                subTaskGroups.length <= 0
              "
              type="link"
              class="finish-task-btn"
            >
              <template #icon>
                <span class="svg-icon-gray" style="vertical-align: top">
                  <inline-svg src="/assets/icons/duotune/general/gen043.svg" />
                </span>
              </template>
              <span class="ml-2">Дуусгах</span>
            </a-button>
          </div>
        </div>
      </div>
      <div class="col-span-2 flex justify-between items-center">
        <div>
          <inline-svg
            class="svg-icon-gray mr-2"
            src="/assets/icons/duotone/Home/Weight2.svg"
          />
        </div>
        <div class="flex-grow task-priority">
          <a-input-number
            class="task-percent"
            v-model:value="task.project_weight_progress"
            :disabled="projectPermission === 3"
            placeholder="Төсөлд эзлэх жин хувиар"
            :max="100"
            :min="0"
            :formatter="
              (value) => {
                const [integer, fractional] = `${value}`.split('.');
                const formattedInteger = integer.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ','
                );
                return `${formattedInteger}${
                  fractional ? '.' + fractional.slice(0, 3) : ''
                }`;
              }
            "
            :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
            @change="saveTask"
          />
        </div>
      </div>
    </div>

    <draggable
      v-if="!task.is_milestone"
      :list="subTaskGroups"
      :animation="200"
      ghost-class="sub-task-group-drag"
      @end="subGroupOrderEnd"
      group="subGroup"
      item-key="id"
    >
      <template #item="{ element }">
        <div class="mt-5">
          <div
            class="flex justify-between items-center mb-1 sub-task-group-item"
          >
            <div class="text-center">
              <inline-svg
                class="svg-icon-gray mr-2"
                src="/assets/icons/duotone/Communication/Clipboard-list.svg"
              />

              <div
                class="ltr:text-right rtl:text-left text-xs text-slate-600 dark:text-slate-300 mb-1 font-medium mt-3"
              >
                {{ element.progress ? element.progress : 0 }}%
              </div>
            </div>
            <div class="flex-grow mr-2">
              <div class="">
                <div class="flex justify-between items-center">
                  <a-input
                    v-model:value="element.title"
                    :disabled="projectPermission === 3"
                    class="sub-task-title"
                    @change="delayChange"
                    @blur="storeSubTasks"
                    placeholder="Бүлэг ажлын нэр"
                  />
                  <div class="sub-task-group-delete-btn" v-if="projectPermission !== 3">
                    <a-popconfirm
                      title="Устгах уу?"
                      ok-text="Тийм"
                      cancel-text="Үгүй"
                      @confirm="() => deleteSubTaskGroup(element)"
                      @click.stop
                      placement="left"
                    >
                      <DeleteOutlined
                        class="ml-2 hover:text-primary_color"
                        @click.prevent
                      />
                    </a-popconfirm>
                  </div>
                </div>

                <div class="relative mb-2 mt-3">
                  <div
                    class="w-full rounded-[999px] overflow-hidden bg-slate-100 dark:bg-slate-100 h-2 ml-2"
                  >
                    <div
                      class="flex flex-col text-center whitespace-nowrap justify-center h-full bg-green-500"
                      :style="`width: ${
                        element.progress ? element.progress : 0
                      }%; transition: width 1s linear 0s;`"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="">
            <SubTask
              :subTasks="element.subTasks"
              :employees="filteredList"
              :groupID="element.id"
              @subTaskOrderChanged="subTaskOrderChanged"
              @empAssigned="empAssigned"
              @editSubTask="editSubTask"
              @doneSubTask="doneSubTask"
              @deleteSubTask="deleteSubTask"
            />
            <a-button
              @click="showNewSubTaskGroupID = element.id"
              class="bg-gray-100 rounded-lg text-slate-600 mt-1 ml-9"
              v-if="showNewSubTaskGroupID !== element.id && projectPermission !== 3"
            >
              <span>Ажил нэмэх</span>
            </a-button>
            <div class="mt-2 ml-9" v-if="showNewSubTaskGroupID === element.id">
              <a-form
                :model="newSubTask"

                @focusout="deferStopSubTask"
                @finish="createSubTask"
              >
                <div class="flex justify-between">
                  <a-form-item class="flex-grow">
                    <a-textarea v-model:value="newSubTask.sub_task"


                                placeholder="Ажилын нэр"
                                @paste="handlePaste"
                                v-focus
                                auto-size
                                @keydown.enter.prevent="handleEnter"
                    />
                  </a-form-item>
                  <div class="w-2"></div>
                  <a-form-item>
                    <a-button type="primary" html-type="submit">Нэмэх</a-button>
                  </a-form-item>
                </div>
              </a-form>
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <div
      class="flex justify-between items-center mb-5"
      v-if="showNewSubTaskGroup"
    >
      <div>
        <inline-svg
          class="svg-icon-gray mr-2"
          src="/assets/icons/duotone/Communication/Clipboard-list.svg"
        />
      </div>
      <div class="flex-grow mr-2">
        <div class="mt-2">
          <a-form
            :model="newSubTaskGroup"
            @focusout="deferStopCreateSubTaskGroup"
            @finish="createNewSubTaskGroup"
          >
            <div class="flex justify-between">
              <a-form-item class="flex-grow">
                <a-input
                  v-model:value="newSubTaskGroup.title"
                  v-focus
                  class="mr-2"
                  placeholder="Бүлэг ажилын нэр"
                />
              </a-form-item>
              <div class="w-2"></div>
              <a-form-item>
                <a-button type="primary" html-type="submit">Нэмэх</a-button>
              </a-form-item>
            </div>
          </a-form>
        </div>
      </div>
    </div>
    <div
      class="flex justify-between items-center mb-5 mt-5"
      v-if="!task.is_milestone && projectPermission !== 3"

    >
      <div>
        <inline-svg
          class="svg-icon-gray mr-2"
          src="/assets/icons/duotone/Communication/Clipboard-list.svg"
        />
      </div>
      <div
        class="flex-grow mr-2 bg-gray-200 pb-1 rounded-lg cursor-pointer"
        @click="showNewSubTaskGroup = true"

      >
        <a-button type="link" class="add-sub-task-btn mt-1">
          Бүлэг ажил нэмэх
        </a-button>
      </div>
    </div>

    <a-button v-if="task.is_milestone" @click="deleteMilestone"
      >Устгах</a-button
    >

    <a-modal
      :min-width="200"
      :min-height="100"
      :draggable="true"
      :footer-hide="true"
      title="Зэрэглэл"
      width="400px"
      v-model:open="showAddPriorityModal"
    >
      <section class="add-modal" v-if="showAddPriorityModal && (projectPermission === 1 || projectPermission === 2)">
        <div class="add-body">
          <dataform
            ref="formAddAble"
            schemaID="1021"
            :editMode="false"
            :onSuccess="onSuccessPriority"
            :onReady="readyPriority"
            url="https://plan.mcpc.mn"
            :do_render="showAddPriorityModal"
          ></dataform>
        </div>
      </section>
      <template #footer> </template>
    </a-modal>
    <a-modal
      v-model:open="showMembersModal"
      title="Орлоцогчид"
      centered
      :footer="null"
    >
      <div class="flex flex-col">
        <div class="four_search">
          <a-select
            v-model:value="selectedEmp"
            show-search
            style="width: 100%"
            placeholder="Хамтрагч нэмэх"
            optionFilterProp="searchValue"
            optionLabelProp="label"
            :options="filteredList"
            :show-search="true"
            @change="selectMembers"
          >
            <template #option="{ value: val, label, avatar }">
              <div class="flex items-center space-x-3 font-semibold">
                <a-avatar style="width: 32px; height: 32px; flex: none">
                  <template #icon>
                    <div class="flex items-center justify-center h-full w-full">
                      <img
                        alt="avatar"
                        class="h-full w-full object-cover bg-no-repeat bg-center"
                        :src="
                          avatar !== null && avatar !== ''
                            ? 'https://mcpc.mn' + avatar
                            : '/amjilt-erp/images/defaultAvatar.svg'
                        "
                      />
                    </div>
                  </template>
                </a-avatar>
                <span>{{ label }}</span>
              </div>
            </template>
          </a-select>
        </div>
        <div class="py-8 space-y-4">
          <div
            v-for="(member, index) in selectedUsers"
            class="grid grid-cols-12 gap-6 flex items-start"
          >
            <div class="col-span-6 flex items-center space-x-3 font-semibold">
              <a-avatar style="width: 32px; height: 32px; flex: none">
                <template #icon>
                  <div class="flex items-center justify-center h-full w-full">
                    <img
                      alt="avatar"
                      class="h-full w-full object-cover bg-no-repeat bg-center"
                      :src="
                        member.avatar !== null && member.avatar !== ''
                          ? 'https://mcpc.mn' + member.avatar
                          : '/amjilt-erp/images/defaultAvatar.svg'
                      "
                    />
                  </div>
                </template>
              </a-avatar>
              <span>{{ member.firstname }}</span>
            </div>
            <div class="col-span-6 flex items-center justify-end space-x-4">
              <div class="four_select w-full">
                <a-input-number
                  :max="100"
                  :min="0"
                  v-model:value="member.task_weight_progress"
                  placeholder="Жин хувиар"
                  style="min-width: 120px"
                ></a-input-number>
              </div>
              <button @click="deleteMember(index)" class="align-top">
                <DeleteOutlined
                  class="ml-2 hover:text-primary_color"
                  @click.prevent
                />
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <div class="button-primary">
            <a-button type="primary" @click="saveMembers">
              <span class="px-4">Сонгох</span>
            </a-button>
          </div>
        </div>
      </div>
    </a-modal>
    <Comments :task_id="task.id" :emp_id="emp_id" :employees="employees" />
    <Success v-if="showSuccess" class=" absolute right-0 bottom-0 z-auto"></Success>
    <div class="align-right" v-if="task.updated_at || task.created_at">Бүртгэсэн огноо: {{task.created_at ? $dateTime(task.created_at) : $dateTime(task.updated_at)}}</div>
  </div>
</template>

<script>
import axios from "~/plugins/core/axios";
import DropDown from "~~/plan/Common/Components/DropDown.vue";
import CK from "./CK.vue";
import SubTask from "./SubTask.vue";

const dateFormat = "YYYY-MM-DD";
import dayjs from "@lambda-platform/lambda-vue/src/utils/dayjs";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { v4 as uuidv4 } from "uuid";
import draggable from "vuedraggable";
import Comments from "./Comment/Comments.vue";
import Success from "~/components/animations/Success.vue";
import {getUTCValue} from "@lambda-platform/lambda-vue/src/utils/date";
import { projectPermission } from "~/store/useSiteSettings"
export default {
  name: "TaskForm",
  components: {
    DeleteOutlined,
    PlusOutlined,
    DropDown,
    CK,
    draggable,
    SubTask,
    Comments,
    Success
  },
  props: {
    editMode: Boolean,
    url: String,
    company_id: String,
    emp_id: String,
    priorities: Array,
    employees: Array,
    companyEmployees: Array,
  },
  emits: ["onSuccess", "onReady", "subTaskUpdated", "deleteMilestone"],
  data() {
    return {
      projectPermission,
      descriptionEditing: false,
      showNewSubTaskGroup: false,
      showAddPriorityModal: false,
      showMembersModal: false,
      dateRange: [null, null],
      selectedEmp: null,
      searchName: "",
      selectedUsers: [],
      task: {
        id: null,
        parent_id: null,
        level: null,
        company_id: null,
        project_id: null,
        emp_id: null,
        task: "",
        stage_id: null,
        start_date: null,
        end_date: null,
        progress: 0,
        priority_id: null,
        description: null,
        task_order: "",
        project_weight_progress: null,
        progress_calculate_type: "by_sub_task",
        color: null,
        is_milestone: false,
        taskMembers: [],
        taskLinks: [],
        created_at: null,
        updated_at: null,
      },
      newSubTaskGroup: {
        title: "",
      },
      newSubTask: {
        sub_task: "",
      },
      editingSubTaskGroup: {
        id: "",
        title: "",
      },
      subTaskGroups: [],
      showNewSubTaskGroupID: null,
      delayTimer: null,
      showSuccess:false

    };
  },
  methods: {
    handleEnter(event) {
      if (!event.shiftKey) {
        event.preventDefault();
        this.createSubTask();
      }
    },
    handlePaste(event) {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData("text");

      const lines = pastedText.split("\n");

      // Check if there are multiple lines
      if (lines.length > 1) {
        lines.forEach((line, index) => {
          if (index >= 0) {
            this.createNewTaskFromPaste(line.replaceAll("\r", ""));
          }
        });
        setTimeout(() => {
          this.newSubTask.sub_task = "";
        }, 100);
        this.calculateTaskProgress();
        this.storeSubTasks();
      }
    },
    createNewTaskFromPaste(line) {
      const index = this.subTaskGroups.findIndex(
        (sub) => sub.id === this.showNewSubTaskGroupID
      );

      if (index >= 0) {
        if (!this.subTaskGroups[index].subTasks) {
          this.subTaskGroups[index].subTasks = [];
        }
        const subTask = {
          id: uuidv4(),
          project_id: this.task.project_id,
          sub_task: line,
          task_id: this.task.id,
          sub_task_group_id: this.showNewSubTaskGroupID,
          is_done: false,
          sub_task_order: `${this.subTaskGroups[index].group_order}-${
            this.subTaskGroups[index].subTasks.length + 1
          }`,
          assignedEmployees:[]
        };

        this.subTaskGroups[index].subTasks.push(subTask);
        this.subTaskGroups[index].progress = this.calculateProgress(
          this.subTaskGroups[index].subTasks
        );
      }
    },
    newTask(newTask) {
      this.task.id = newTask.id;
      this.task.parent_id = newTask.parent_id;
      this.task.company_id = this.company_id;
      if (!newTask.project_id) {
        this.task.project_id = this.$route.params.id;
      } else {
        this.task.project_id = newTask.project_id;
      }

      this.task.emp_id = this.emp_id;
      this.task.stage_id = newTask.stage_id;
      this.task.task_order = newTask.task_order;

      this.task.task = newTask.task;
      this.task.start_date = newTask.start_date;
      this.task.end_date = newTask.end_date;
      this.task.progress = newTask.progress > 0 ? editingTask.progress : null;
      this.task.priority_id = newTask.priority_id;
      this.task.description = newTask.description;
      this.task.project_weight_progress = newTask.project_weight_progress;
      this.task.progress_calculate_type = newTask.progress_calculate_type;
      this.task.color = newTask.color;
      if (newTask.taskMembers && newTask.taskMembers.length) {
        this.task.taskMembers = newTask.taskMembers;
      } else {
        this.task.taskMembers = [];
      }

      this.task.taskLinks = newTask.taskLinks;
      this.task.is_milestone = newTask.is_milestone;
      this.task.level = newTask.level;
      this.subTaskGroups = [];
      this.dateRange = [null, null];
    },
    editModel(editingTask) {
      this.task.id = editingTask.id;
      this.task.created_at = editingTask.created_at;
      this.task.updated_at = editingTask.updated_at;
      this.task.parent_id = editingTask.parent_id;
      this.task.company_id = this.company_id;
      if (!editingTask.project_id) {
        this.task.project_id = this.$route.params.id;
      } else {
        this.task.project_id = editingTask.project_id;
      }

      if (!editingTask.emp_id) {
        this.task.emp_id = this.emp_id;
      } else {
        this.task.emp_id = editingTask.emp_id;
      }
      this.task.level = editingTask.level;
      this.task.is_milestone = editingTask.is_milestone;

      this.task.stage_id = editingTask.stage_id;
      this.task.task_order = editingTask.task_order;

      this.task.task = editingTask.task;
      this.task.start_date = editingTask.start_date;
      this.task.end_date = editingTask.end_date;
      this.task.progress =
        editingTask.progress > 0 ? editingTask.progress : null;
      this.task.priority_id = editingTask.priority_id;
      this.task.description = editingTask.description;
      this.task.project_weight_progress = editingTask.project_weight_progress;
      this.task.progress_calculate_type = editingTask.progress_calculate_type;
      this.task.color = editingTask.color;
      if (editingTask.taskMembers && editingTask.taskMembers.length) {
        this.task.taskMembers = editingTask.taskMembers;
      } else {
        this.task.taskMembers = [];
      }

      this.task.taskLinks = editingTask.taskLinks;

      if (editingTask.start_date) {
        this.dateRange[0] = dayjs(editingTask.start_date);
      } else {
        this.dateRange[0] = null;
      }

      if (editingTask.end_date) {
        this.dateRange[1] = dayjs(editingTask.end_date);
      } else {
        this.dateRange[1] = null;
      }

      this.getSubTasks();
    },
    saveTask() {
      // if(this.projectPermission === 1 || this.projectPermission === 2) {
        axios
          .post(`https://plan.mcpc.mn/store-task`, {...this.task})
          .then((res) => {
            this.$emit("onSuccess", {...res.data});
          })
          .catch((error) => {
            console.log(error);
          });
      // }
    },
    startDescEdit() {
      if(this.projectPermission === 1 || this.projectPermission === 2){
        this.descriptionEditing = true;
      }
    },
    descCancel() {
      this.descriptionEditing = false;
    },
    descChange(desc) {
      this.task.description = desc;
      this.descriptionEditing = false;

      this.saveTask();
    },
    dateChanged(dates) {

      if (this.task.is_milestone) {
        this.task.start_date = dates.$d;
        this.task.end_date = dates.$d;
      } else {
        this.task.start_date = dates[0].$d;
        this.task.end_date = dates[1].$d;
      }
      this.saveTask();
    },
    onSuccessPriority(val) {
      console.log(val);

      priorities.push(val);
      this.showAddPriorityModal = false;
    },
    readyPriority() {
      this.$nextTick(() => {
        this.$refs.formAddAble.setModel("project_id", this.$route.params.id);
      });
    },
    completeTask() {
      this.task.progress = 100;
      this.saveTask();
    },
    addMembers() {
      this.selectedUsers = [];
      this.task.taskMembers.forEach((member) => {
        const empIndex = this.companyEmployees.findIndex(
          (emp) => emp.id === member.emp_id
        );
        this.selectedUsers.push({
          ...member,
          project_id: this.$route.params.id,
          avatar: this.companyEmployees[empIndex].avatar,
          lastname: this.companyEmployees[empIndex].lastname,
          firstname: this.companyEmployees[empIndex].firstname,
          login: this.companyEmployees[empIndex].login,
        });
      });

      this.showMembersModal = true;
    },
    saveMembers() {
      if (!this.task.taskMembers) {
        this.task.taskMembers = [];
      }
      this.showMembersModal = false;
      this.selectedEmp = null;
      this.task.taskMembers = [...this.selectedUsers];

      this.selectedUsers = [];

      this.saveTask();
    },
    empAssigned(assignedEmployees) {
      if (!this.task.taskMembers) {
        this.task.taskMembers = [];
      }
      this.showMembersModal = false;
      this.selectedEmp = null;

      let selectedUsers = [];

      assignedEmployees.forEach((assignedEmployee) => {
        const foundIndex = this.filteredList.findIndex(
          (item) => item.emp_id === assignedEmployee
        );
        const existingIndex = this.users.findIndex(
          (item) => item.emp_id === assignedEmployee
        );
        const existingSelectedIndex = selectedUsers.findIndex(
          (item) => item.emp_id === assignedEmployee
        );
        if (
          foundIndex >= 0 &&
          existingIndex <= -1 &&
          existingSelectedIndex <= -1
        ) {
          selectedUsers.push({
            emp_id: this.filteredList[foundIndex].emp_id,
            project_id: this.$route.params.id,
            avatar: this.filteredList[foundIndex].avatar,
            lastname: this.filteredList[foundIndex].lastname,
            firstname: this.filteredList[foundIndex].firstname,
            login: this.filteredList[foundIndex].login,
            task_weight_progress:
              this.filteredList[foundIndex].task_weight_progress,
            task_id: this.filteredList[foundIndex].task_id,
          });
        }
      });

      this.task.taskMembers = [...this.task.taskMembers, ...selectedUsers];

      this.saveTask();

      this.storeSubTasks();
    },
    deleteMember(index) {
      this.selectedUsers.splice(index, 1);
    },
    selectMembers(id) {
      const foundIndex = this.filteredList.findIndex(
        (item) => item.emp_id === id
      );
      const existingIndex = this.users.findIndex((item) => item.emp_id === id);
      const existingSelectedIndex = this.selectedUsers.findIndex(
        (item) => item.emp_id === id
      );
      if (
        foundIndex >= 0 &&
        existingIndex <= -1 &&
        existingSelectedIndex <= -1
      ) {
        this.selectedUsers.push({
          emp_id: this.filteredList[foundIndex].emp_id,
          project_id: this.$route.params.id,
          avatar: this.filteredList[foundIndex].avatar,
          lastname: this.filteredList[foundIndex].lastname,
          firstname: this.filteredList[foundIndex].firstname,
          login: this.filteredList[foundIndex].login,
          task_weight_progress:
            this.filteredList[foundIndex].task_weight_progress,
          task_id: this.filteredList[foundIndex].task_id,
        });
      }
    },
    createNewSubTaskGroup() {
      if (this.newSubTaskGroup.title !== "") {
        const id = uuidv4();
        this.subTaskGroups.push({
          id: id,
          project_id: this.$route.params.id,
          task_id: this.task.id,
          title: this.newSubTaskGroup.title,
          progress: 0,
          subTasks: [],
          group_order: this.subTaskGroups.length + 1,
        });
        this.showNewSubTaskGroupID = id;
        this.stopCreateSubTaskGroup();
        this.calculateTaskProgress();

        this.storeSubTasks();
      }
    },
    deferStopCreateSubTaskGroup(event) {
      // Check if the relatedTarget (the new element being focused) is the submit button
      if (event.relatedTarget && event.relatedTarget.type === "submit") {
        return; // If it is, do nothing
      }

      // Otherwise, defer the execution of stopCreateStage
      setTimeout(() => {
        this.stopCreateSubTaskGroup();
      }, 0);
    },
    stopCreateSubTaskGroup() {
      this.showNewSubTaskGroup = false;
      this.newSubTaskGroup = {
        title: "",
      };
    },
    editSubTaskGroup() {
      if (
        this.editingSubTaskGroup.title !== "" &&
        this.editingSubTaskGroup.id !== ""
      ) {
        const editData = { ...this.editingSubTaskGroup };
        const index = this.subTaskGroups.findIndex(
          (sub) => sub.id === editData.id
        );
        this.subTaskGroups[index].title = editData.title;
        this.editingSubTaskGroup = {
          id: "",
          title: "",
        };
      }
    },
    startEditeSubTaskGroup(subTaskGroup) {
      this.editingSubTaskGroup = subTaskGroup;
    },
    deferStopSubTask(event) {
      // Check if the relatedTarget (the new element being focused) is the submit button
      if (event.relatedTarget && event.relatedTarget.type === "submit") {
        return; // If it is, do nothing
      }

      // Otherwise, defer the execution of stopCreateStage
      setTimeout(() => {
        this.stopCreateSubTask();
      }, 0);
    },
    stopCreateSubTask() {
      this.showNewSubTaskGroupID = null;
      this.newSubTask = {
        sub_task: "",
      };
    },
    createSubTask() {
      if (this.newSubTask.sub_task !== "") {
        const index = this.subTaskGroups.findIndex(
          (sub) => sub.id === this.showNewSubTaskGroupID
        );

        if (index >= 0) {
          if (!this.subTaskGroups[index].subTasks) {
            this.subTaskGroups[index].subTasks = [];
          }
          const subTask = {
            id: uuidv4(),
            project_id: this.task.project_id,
            sub_task: this.newSubTask.sub_task,
            task_id: this.task.id,
            sub_task_group_id: this.showNewSubTaskGroupID,
            is_done: false,
            assignedEmployees: [],
            sub_task_order: `${this.subTaskGroups[index].group_order}-${
              this.subTaskGroups[index].subTasks.length + 1
            }`,
          };

          this.subTaskGroups[index].subTasks.push(subTask);
          this.newSubTask.sub_task = "";

          this.subTaskGroups[index].progress = this.calculateProgress(
            this.subTaskGroups[index].subTasks
          );
          this.calculateTaskProgress();
          this.storeSubTasks();
        }
      }
    },
    subGroupOrderEnd(e) {
      if(this.projectPermission !== 3) {
        if (e.newIndex !== e.oldIndex) {
          for (let i = 0; i < this.subTaskGroups.length; i++) {
            this.subTaskGroups[i].group_order = i + 1;
            this.saveSubTaskOrder(i);
          }
          this.updateSubTasksOrder();
        }
      }

    },
    subTaskOrderChanged(e) {
      if(this.projectPermission !== 3) {
        let groupFromIndex = this.subTaskGroups.findIndex(
          (group) => group.id === e.from.id
        );
        let groupIndex = this.subTaskGroups.findIndex(
          (group) => group.id === e.to.id
        );
        if (groupIndex >= 0 && groupFromIndex >= 0) {
          if (groupIndex !== groupFromIndex) {
            this.saveSubTaskOrder(groupFromIndex);
            this.saveSubTaskOrder(groupIndex);
          } else {
            this.saveSubTaskOrder(groupIndex);
          }
          this.updateSubTasksOrder();
        }
      }
    },
    saveSubTaskOrder(groupIndex) {
      if(this.projectPermission !== 3) {
        if (groupIndex >= 0) {
          for (
            let i = 0;
            i < this.subTaskGroups[groupIndex].subTasks.length;
            i++
          ) {
            const taskOrder = i + 1;
            const groupOrder = this.subTaskGroups[groupIndex].group_order;

            this.subTaskGroups[groupIndex].subTasks[i].sub_task_group_id =
              this.subTaskGroups[groupIndex].id;
            this.subTaskGroups[groupIndex].subTasks[i].sub_task_order = `${
              groupOrder <= 9 ? "0" + groupOrder.toString() : groupOrder
            }-${taskOrder <= 9 ? "0" + taskOrder.toString() : taskOrder}`;
          }
        }
      }
    },
    calculateProgress(subTasks) {
      if (!subTasks || subTasks.length === 0) {
        return 0; // If no subTasks or empty subTasks array, progress is 0
      }

      const completedCount = subTasks.filter((task) => task.is_done).length;
      const totalTasks = subTasks.length;
      const progressPercent = (completedCount / totalTasks) * 100;

      return Math.ceil(progressPercent);
    },
    findMinMaxDates(taskGroup) {
      let dates = taskGroup.flatMap(group => group.subTasks.map(task => task.due_date));
      dates = dates.filter(date => date !== null); // Remove null values

      if (dates.length === 0) {
        return { minDate: null, maxDate: null };
      }

      const minDate = new Date(Math.min(...dates.map(date => new Date(date))));
      const maxDate = new Date(Math.max(...dates.map(date => new Date(date))));

      return {
        minDate: minDate,
        maxDate: maxDate
      };
    },
    editSubTask(subTask) {

      let groupIndex = this.subTaskGroups.findIndex(
        (group) => group.id === subTask.sub_task_group_id
      );
      if (groupIndex >= 0) {
        this.subTaskGroups[groupIndex].progress = this.calculateProgress(
          this.subTaskGroups[groupIndex].subTasks
        );
      }


      const minMax = this.findMinMaxDates(this.subTaskGroups);

      if(minMax.minDate && minMax.maxDate){
        this.task.start_date = dayjs(minMax.minDate);
        this.task.end_date = dayjs(minMax.maxDate);


        if (this.task.start_date) {
          this.dateRange[0] = this.task.start_date;
        } else {
          this.dateRange[0] = null;
        }

        if (this.task.end_date) {
          this.dateRange[1] = this.task.end_date;
        } else {
          this.dateRange[1] = null;
        }

        this.saveTask();
      }
      this.storeSubTasks();
    },
    deleteSubTask(subTask) {
      let groupIndex = this.subTaskGroups.findIndex(
        (group) => group.id === subTask.sub_task_group_id
      );
      if (groupIndex >= 0) {
        this.subTaskGroups[groupIndex].subTasks = this.subTaskGroups[
          groupIndex
        ].subTasks.filter((t) => t.id !== subTask.id);
        this.subTaskGroups[groupIndex].progress = this.calculateProgress(
          this.subTaskGroups[groupIndex].subTasks
        );
        this.calculateTaskProgress();
        this.storeSubTasks();
      }
    },
    deleteSubTaskGroup(subTaskGroup) {
      this.subTaskGroups = this.subTaskGroups.filter(
        (t) => t.id !== subTaskGroup.id
      );
      this.calculateTaskProgress();
      this.storeSubTasks();
    },
    calculateTaskProgress() {
      for (let i = 0; i < this.subTaskGroups.length; i++) {
        this.subTaskGroups[i].progress = this.calculateProgress(
          this.subTaskGroups[i].subTasks
        );
      }
      if (this.task.progress_calculate_type === "by_sub_task") {
        if (!this.subTaskGroups || this.subTaskGroups.length === 0) {
          if (this.task.progress !== 0) {
            this.task.progress = 0;
            this.saveTask();
          }
        } else {
          let completedCount = 0;
          let totalSubTasks = 0;
          if (this.subTaskGroups && this.subTaskGroups.length) {
            for (let i = 0; i < this.subTaskGroups.length; i++) {
              if (
                this.subTaskGroups[i].subTasks &&
                this.subTaskGroups[i].subTasks.length
              ) {
                totalSubTasks =
                  totalSubTasks + this.subTaskGroups[i].subTasks.length;
                completedCount =
                  completedCount +
                  this.subTaskGroups[i].subTasks.filter((task) => task.is_done)
                    .length;
              }
            }
          }

          let progressPercent = 0;

          if (totalSubTasks >= 1) {
            progressPercent = (completedCount / totalSubTasks) * 100;
            progressPercent = Math.ceil(progressPercent);
          }

          if (this.task.progress !== progressPercent) {
            this.task.progress = progressPercent;
            this.saveTask();
          }
        }
      }
    },
    doneSubTask() {
      this.calculateTaskProgress();
      this.storeSubTasks();
    },
    storeSubTasks() {
      clearTimeout(this.delayTimer);

      const changedData = {
        task_id: this.task.id,
        project_id: this.task.project_id,
        task_sub_task_groups: this.subTaskGroups,
      };
      axios
        .post(`https://plan.mcpc.mn/store-sub-task`, changedData)
        .then((r) => {
          this.$emit("subTaskUpdated", changedData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateSubTasksOrder() {
      axios
        .post(`https://plan.mcpc.mn/update-sub-task-order`, {
          task_id: this.task.id,
          project_id: this.task.project_id,
          task_sub_task_groups: this.subTaskGroups,
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getSubTasks() {
      this.subTaskGroups = [];
      axios
        .get(`https://plan.mcpc.mn/sub-tasks/${this.task.id}`)
        .then((res) => {
          if (res.data) {
            if (res.data.length >= 1) {
              this.subTaskGroups = res.data

              // res.data.map(g=>{
              //   return {...g, subTasks:g.subTasks.map(st=>{
              //
              //     return {...st, due_date:getUTCValue(st.due_date)}
              //     })}
              // });

            } else {
              this.subTaskGroups = [];
            }
          } else {
            this.subTaskGroups = [];
          }
        });
    },
    delayChange() {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
      }

      this.delayTimer = setTimeout(() => {
        this.storeSubTasks();
      }, 500);
    },
    deleteMilestone() {
      this.$emit("deleteMilestone", { ...this.task });
    },
    taskEditClosed() {
      this.descriptionEditing = false;
    },
    showAnimation(){
      this.showSuccess = true;

      setTimeout(()=>{
        this.showSuccess = false
      }, 4000)
    }
  },
  computed: {
    filteredList() {
      return this.employees.map((user) => {
        return {
          value: user.id,
          emp_id: user.id,
          avatar: user.avatar,
          label: user.firstname,
          searchValue: user.firstname + " " + user.lastname + " " + user.login,
          firstname: user.firstname,
          lastname: user.lastname,
          login: user.login,
          task_id: this.task.id,
        };
      });
    },
    users() {
      if (this.task.taskMembers) {
        if (this.employees.length >= 1 && this.task.taskMembers.length >= 1) {
          return this.task.taskMembers.map((member) => {
            const empIndex = this.companyEmployees.findIndex(
              (emp) => emp.id === member.emp_id
            );
            if(empIndex >= 0){
              return {
                ...member,
                avatar: this.companyEmployees[empIndex].avatar,
                lastname: this.companyEmployees[empIndex].lastname,
                firstname: this.companyEmployees[empIndex].firstname,
                login: this.companyEmployees[empIndex].login,
              };
            }

          }).filter(Boolean);
        } else {
          return [];
        }
      } else {
        return [];
      }
    },
    taskProgress(){
      return this.task.progress
    }
  },
  watch:{
    taskProgress(v, vOld){
      if(vOld < 100 && v >= 100 ){
        this.showAnimation();
      }
    }
  }
};
</script>

<style scoped></style>
