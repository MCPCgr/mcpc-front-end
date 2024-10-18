import axios from "~/plugins/core/axios";
import {v4 as uuidv4} from "uuid";
import TopMenu from "../Common/Components/TopMenu.vue";
import ProjectHeader from "../Common/Components/ProjectHeader.vue";
import TaskForm from "../Common/Components/TaskForm.vue";
import {findTaskById, flattenTasks, walkLevel} from "~~/plan/Gantt/utils/utils";
import {GET_EMPLOYEE_WITH_USER, GET_STRUCTS_NOT_CHILD_COMPANIES} from "~/graphql/queries";
import ls from "~/utils/Storage";
import {COMPANY, USER_EXTRA_ROLES} from "~/store/mutation-types-tatatonga";
import {USER_INFO} from "~/store/mutation-types";
import Modal from "ant-design-vue/lib/modal"
import {ExclamationCircleOutlined} from '@ant-design/icons-vue';
import {createVNode, defineComponent} from 'vue';
import {notification} from 'ant-design-vue';
import {PROJECT_PERMISSION} from "~~/plan/store/mutation-types";




export default {
  components: {TopMenu, ProjectHeader, TaskForm},
  data() {
    let form_width = 700
    if ((window.innerWidth - 100) >= form_width) {
      form_width = 700
    } else {
      form_width = window.innerWidth;
    }
    const company = ls.get(COMPANY);
    const user = ls.get(USER_INFO);

    return {

      company,
      user,
      tasks: [],
      members: [],
      stages: [],
      ganttTasks: [],
      taskLinks: [],
      taskMembers: [],
      priorities: [],
      employees: [],
      companyEmployees: [],
      structs: [],
      subTaskCounts: [],
      loading: true,
      showTaskModal: false,
      editingTask: {},
      project: {},
      form_width,
      projectMode: "kanban",
      showDeleteLinkModal: false,
      filterData: {
        start_date: null,
        end_date: null,
        selectedEmps: [],
        progress: [0, 100],
        progress_calculate_type: [],
        progress_type: [],
      },
      notificationSettings: {
        id: "",
        project_id: "",
        emp_id: "",
        task_on_complete: false,
        project_on_member_add: false,
        project_on_task_add: false,
        project_on_project_finish: false,
        project_on_member_delete: false,
        task_on_assign: false,
        task_on_delay: false,
        task_on_progress_update: false,
        task_on_un_assign: false,
        // provider_sms: false,
        // provider_email: false,
        provider_browser: false
      }
    };
  },
  methods: {
    changeProjectSettings(project) {
      this.project = project
      axios.post("https://api.amjilt.com/plan/update-project", project).catch(e => {
        alert("error")
      })
    },
    addLink(linkPre) {
      const link = {...linkPre, project_id: this.$route.params.id,}
      let sourceTarget = findTaskById(this.ganttTasks, link.source);

      if (sourceTarget.links) {
        sourceTarget.links.push(link)
      } else {
        sourceTarget.links = [link]
      }

      this.updateTaskById(this.ganttTasks, link.source, {...sourceTarget});
      axios.post("https://api.amjilt.com/plan/create-task-link", link).catch(e => {
        alert("error")
      })
    },
    deleteLinkReal(link) {
      axios.get("https://api.amjilt.com/plan/delete-task-link/" + link.id).then(() => {
        let sourceTarget = findTaskById(this.ganttTasks, link.source);
        sourceTarget.links = sourceTarget.links.filter(l => l.id !== link.id)
        this.updateTaskById(this.ganttTasks, link.source, {...sourceTarget});
      }).catch(e => {
        console.log(e)
      })
    },
    deleteLink(link) {
      const deleteLinkReal = this.deleteLinkReal
      Modal.confirm({
        title: 'Холбоосыг устгах уу?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', {style: 'color:red;'}, 'Та усгахдаа итгэлтэй байна уу'),
        okText: "Устгах",
        cancelText: "Болих",
        onOk() {
          deleteLinkReal(link)
        },
        onCancel() {
        },
        class: 'test',
      });
    },
    addTask() {
      this.editingTask = {};
      this.setTaskFormData();
      this.showTaskModal = true;
    },
    addMilestone() {
      this.editingTask = {};
      this.setTaskFormData(true);
      this.showTaskModal = true;
    },
    convertToGanttTasks(tasks) {
      const ganttTasks = [];
      tasks.forEach((taskData, index) => {
        const ganttTask = {};
        ganttTask.id = taskData.id;
        ganttTask.stage_id = taskData.stage_id;
        ganttTask.parent = null;

        if (taskData.parent_id) {
          ganttTask.parent = taskData.parent_id;
        }

        ganttTask.name = taskData.task;
        ganttTask.start = taskData.start_date ? new Date(taskData.start_date) : null;
        ganttTask.duration = Math.floor(
          (new Date(taskData.end_date) - new Date(taskData.start_date)) /
          (1000 * 60 * 60 * 24)
        );
        ganttTask.percent = taskData.progress / 100;
        ganttTask.children = [];
        ganttTask.links = this.taskLinks.filter(taskLink => taskLink.source === taskData.id);

        // if (!taskData.level || taskData.level === "") {
        //   ganttTask.level = `${index + 1}`;
        // } else {
        //   ganttTask.level = taskData.level
        // }

        // ganttTask.text = this.getGanttTaskText(ganttTask.level, taskData.task);

        if (taskData.is_milestone) {
          ganttTask.type = "milestone";
        } else {
          ganttTask.type = "";
        }

        ganttTask.end = taskData.end_date ? new Date(taskData.end_date) : null;
        ganttTasks.push(ganttTask);
      });
      return ganttTasks;
    },
    getGanttTaskText(level, name) {
      const levels = level ? `${level}`.split(".") : [];
      let spaces = ""
      levels.forEach((l, li) => {
        if (li >= 1) {
          spaces = spaces + "   "
        }
      })
      return spaces + " " + name;
    },
    updateTaskById(tasks, id, updatedTask) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
          tasks[i] = {...tasks[i], ...updatedTask};
          return true;
        }

        if (tasks[i].children.length > 0) {
          const found = this.updateTaskById(tasks[i].children, id, updatedTask);
          if (found) {
            return true;
          }
        }
      }
      return false;
    },
    subTaskUpdated(changedData) {
      if (changedData.task_sub_task_groups && changedData.task_sub_task_groups.length) {
        const index = this.subTaskCounts.findIndex(subTaskCount => subTaskCount.TaskID === changedData.task_id);

        let DoneCount = 0;
        let SubTaskCount = 0;

        for (let i = 0; i < changedData.task_sub_task_groups.length; i++) {
          let currentSubTaskCount = 0;
          if (changedData.task_sub_task_groups[i].subTasks) {
            if (changedData.task_sub_task_groups[i].subTasks !== null) {
              currentSubTaskCount = changedData.task_sub_task_groups[i].subTasks.length
            }
          }
          SubTaskCount = SubTaskCount + currentSubTaskCount;
          if (currentSubTaskCount >= 1) {
            DoneCount = DoneCount + changedData.task_sub_task_groups[i].subTasks.filter(task => task.is_done).length;
          }
        }
        if (index >= 0) {
          this.subTaskCounts[index] = {
            DoneCount: DoneCount,
            SubTaskCount: SubTaskCount,
            TaskID: changedData.task_id
          }
        } else {
          this.subTaskCounts.push({
            DoneCount: DoneCount,
            SubTaskCount: SubTaskCount,
            TaskID: changedData.task_id
          })
        }
      }
    },
    deleteMilestone(task) {
      this.showTaskModal = false;
      this.ganttTasks = this.ganttTasks.filter(t => t.id !== task.id);
      axios.get(`https://api.amjilt.com/plan/delete-task/${task.id}`)
        .catch(error => {
          console.log(error);
        });
    },
    taskOnSuccess(savedData) {
      let stageIndex = this.stages.findIndex(stage => stage.id === savedData.stage_id);
      if (stageIndex >= 0) {
        let taskIndex = this.stages[stageIndex].tasks.findIndex(task => task.id === savedData.id);
        if (taskIndex >= 0) {
          this.stages[stageIndex].tasks[taskIndex] = {
            ...this.stages[stageIndex].tasks[taskIndex], ...savedData,
            taskMembers: savedData.taskMembers
          }
        }
      }
      if (this.projectMode === "gantt") {
        const editedTask = this.convertToGanttTasks([savedData])[0];

        if (this.editingTask.id) {
          this.updateTaskById(this.ganttTasks, savedData.id, {...editedTask})
        } else {
          const savedIndex = flattenTasks(this.ganttTasks).findIndex(ft => ft.id === editedTask.id);
          if (savedIndex >= 0) {
            this.updateTaskById(this.ganttTasks, savedData.id, {...editedTask})
          } else {
            this.ganttTasks = [...this.ganttTasks, {...editedTask}];
          }
        }
      }
    },
    setTaskFormData(isMilestone) {
      const taskOrder = this.stages[0].tasks.length + 1
      const stageOrder = this.stages[0].stage_order;
      const newTask = {
        id: uuidv4(),
        project_id: this.$route.params.id,
        company_id: this.company.company_id,
        emp_id: this.user.emp_id,
        stage_id: this.stages[0].id,
        task_order: `${stageOrder <= 9 ? "0" + stageOrder.toString() : stageOrder}-${taskOrder <= 9 ? "0" + taskOrder.toString() : taskOrder}`,
        progress_calculate_type: "by_sub_task",
        parent_id: null,
        level: `${this.ganttTasks.length + 1}`,
        is_milestone: isMilestone ? true : false,
        task: "",
        start_date: null,
        end_date: null,
        progress: 0,
        priority_id: null,
        description: null,
        project_weight_progress: null,
        color: null,
        taskMembers: [],
        taskLinks: [],
      }

      if (!newTask.is_milestone) {
        this.stages[0].tasks.push(newTask);
      }

      this.$refs.taskForm.newTask(newTask);
    },
    readyTaskEdit() {
      // if(!this.nowOwner){
      //   this.$refs.form.viewMode = true;
      // }
      if (this.projectMode === "gantt") {
        this.setTaskFormData();
      }
      // this.$nextTick(() => {
      //
      //   this.$refs.taskForm.editModel(this.editingTask.id);
      // })
    },
    editTask(task, isFromTaskList) {
      this.editingTask = task;
      this.showTaskModal = true;
      this.$nextTick(() => {
        if (!isFromTaskList) {
          let stageIndex = this.stages.findIndex(stage => stage.id === task.stage_id);
          if (stageIndex >= 0) {
            const taskIndex = this.stages[stageIndex].tasks.findIndex(t => t.id === task.id);

            if (taskIndex >= 0) {
              this.stages[stageIndex].tasks[taskIndex]["company_id"] = this.company.company_id;
              this.stages[stageIndex].tasks[taskIndex]["project_id"] = this.$route.params.id;
              this.$refs.taskForm.editModel(this.stages[stageIndex].tasks[taskIndex]);
            } else {
              axios.get(`https://api.amjilt.com/plan/task/${task.id}`).then(res => {
                this.$refs.taskForm.editModel(res.data);
              }).catch(error => {
                console.log(error);
              });
            }
          }
        } else {
          this.$refs.taskForm.editModel(task);
        }
      })
    },
    deleteTask(task) {
      let stageIndex = this.stages.findIndex(stage => stage.id === task.stage_id);
      if (stageIndex >= 0) {
        this.stages[stageIndex].tasks = this.stages[stageIndex].tasks.filter(t => t.id !== task.id);
        axios.get(`https://api.amjilt.com/plan/delete-task/${task.id}`)
          .catch(error => {
            console.log(error);
          });
      }
    },
    editStage(stage) {
      axios.post(`https://api.amjilt.com/plan/update-stage`, stage)
        .catch(error => {
          console.log(error);
        });
    },
    deleteStage(stage) {
      this.stages = this.stages.filter(s => s.id !== stage.id);

      axios.get(`https://api.amjilt.com/plan/delete-stage/${stage.id}`)
        .catch(error => {
          console.log(error);
        });
    },
    stageOrderChanged(e) {
      if (e.newIndex !== e.oldIndex) {
        const changedStages = this.stages.map((stage, index) => {
          return {
            id: stage.id,
            stage_order: index + 1
          }
        })
        axios.post("https://api.amjilt.com/plan/update-stage-order", changedStages)
          .catch(error => {
            console.log(error);
          });
      }
    },
    taskOrderChanged(e) {
      let stageFromIndex = this.stages.findIndex(stage => stage.id === e.from.id);
      let stageIndex = this.stages.findIndex(stage => stage.id === e.to.id);
      if (stageIndex >= 0 && stageFromIndex >= 0) {
        if (stageIndex !== stageFromIndex) {
          this.saveStageOrder(stageFromIndex)
          this.saveStageOrder(stageIndex)
        } else {
          this.saveStageOrder(stageIndex)
        }
      }
    },
    saveStageOrder(stageIndex) {
      if (stageIndex >= 0) {
        const changedTasks = this.stages[stageIndex].tasks.map((task, index) => {
          const taskOrder = index + 1
          const stageOrder = this.stages[stageIndex].stage_order;
          return {
            id: task.id,
            stage_id: this.stages[stageIndex].id,
            task_order: `${stageOrder <= 9 ? "0" + stageOrder.toString() : stageOrder}-${taskOrder <= 9 ? "0" + taskOrder.toString() : taskOrder}`
          }
        });
        axios.post("https://api.amjilt.com/plan/update-task-order", changedTasks)
          .catch(error => {
            console.log(error);
          });
      }
    },
    createTask(task) {
      let stageIndex = this.stages.findIndex(stage => stage.id === task.stage_id);
      if (stageIndex >= 0) {
        if (this.stages[stageIndex].tasks && this.stages[stageIndex].tasks.length) {
        } else {
          this.stages[stageIndex].tasks = [];
        }
        const taskOrder = this.stages[stageIndex].tasks.length + 1
        const stageOrder = this.stages[stageIndex].stage_order
        const newTask = {
          id: uuidv4(),
          project_id: this.$route.params.id,
          task: task.task,
          stage_id: task.stage_id,
          progress_calculate_type: "by_sub_task",
          task_order: `${stageOrder <= 9 ? "0" + stageOrder.toString() : stageOrder}-${taskOrder <= 9 ? "0" + taskOrder.toString() : taskOrder}`,
        };
        this.stages[stageIndex].tasks.push(newTask);
        axios.post("https://api.amjilt.com/plan/create-task", newTask).catch(e => {
          alert("error")
        })
      }
    },
    changeProjectMembers(members) {
      axios.post("https://api.amjilt.com/plan/save-project-members/" + this.$route.params.id, members).then((res) => {
        this.members = res.data;
        this.getProjectEmployees();
      }).catch(e => {
        console.log(e)
      })
    },
    createStage(stage) {
      const newStage = {
        project_id: this.$route.params.id,
        stage: stage,
        stage_order: this.stages.length + 1,
        id: uuidv4(),
        tasks: []
      };
      this.stages.push(newStage);
      axios.post("https://api.amjilt.com/plan/create-stage", newStage).catch(e => {
        alert("error")
      })
    },
    filter(searchData) {
      this.filterData = {...searchData};
      this.loading = true;
      this.getProject();
    },
    getProject() {
      axios.post("https://api.amjilt.com/plan/project/" + this.$route.params.id, this.filterData).then(res => {

        this.stages = res.data.stages.map(stage => {
          const tasks = res.data.tasks.filter(task => task.stage_id === stage.id && !task.is_milestone && !task.is_group).map(task => {
            const taskMembers = res.data.taskMembers.filter(member => member.task_id === task.id);
            return {...task, taskMembers: taskMembers}
          });
          return {
            ...stage,
            tasks: tasks
          }
        });

        if (this.projectMode === "gantt") {
          this.taskLinks = res.data.taskLinks;
          let tree = this.buildTree(this.convertToGanttTasks(this.sortByLevel(res.data.tasks.filter(t => t.progress_calculate_type !== 'not_calculate'))));
          walkLevel(tree, "");
          this.ganttTasks = tree
        }
        this.tasks = res.data.tasks;
        this.project = res.data.project;
        this.priorities = res.data.priorities;
        this.taskMembers = res.data.taskMembers;
        this.subTaskCounts = res.data.subTaskCounts;
        window.priorities = this.priorities;
        this.members = res.data.members;
        this.notificationSettings = res.data.notificationSettings;

        if(this.members && this.members.length > 0){
          const index = this.members.findIndex(m=>m.emp_id === this.user.emp_id);
          if(index >= 0){

            this.$store.commit(PROJECT_PERMISSION, this.members[index].access_id)
          }
        }

        this.getProjectEmployees();
      }).catch(e => {
        console.log(e);
        this.loading = false;
        this.stages = [];
        this.project = {};
      })
    },
    buildTree(flattenedArray, parent = null) {
      const tree = [];
      for (const item of flattenedArray) {
        if (item.parent === parent) {
          item.children = this.buildTree(flattenedArray, item.id);
          if (item.children.length >= 1) {
            item.type = "group"
          }
          tree.push(item);
        }
      }
      return tree;
    },
    getProjectEmployees() {
      if (this.$apollo) {
      }
      this.$apollo.query({
        query: GET_EMPLOYEE_WITH_USER,
        fetchPolicy: "no-cache",
        variables: {company_id: this.company.company_id},
      })
        .then((res) => {
          this.employees = [];
          this.companyEmployees = res.data["emp_with_user"];
          res.data["emp_with_user"].forEach(emp => {
            const index = this.members.findIndex(m => m.emp_id === emp.id);
            if (index >= 0) {
              this.employees.push(emp)
            }
          })
          window.employees = this.employees;
          this.loading = false;
        });
    },
    sortByLevel(array) {
      return array.sort((a, b) => {
        const levelA = parseFloat(a.level);
        const levelB = parseFloat(b.level);

        if (levelA < levelB) {
          return -1;
        } else if (levelA > levelB) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    taskEditClose() {
      this.$refs.taskForm.taskEditClosed();
    },
    getStructData() {
      let companyIDs = this.selectedCompanies.map(com => com.company_id);
      let companyIDsJoined = companyIDs.map(element => `${element}`).join(",");
      this.$apollo
        .query({
          query: GET_STRUCTS_NOT_CHILD_COMPANIES,
          fetchPolicy: "no-cache",
          variables: {companyIDs: companyIDsJoined},
        })
        .then((res) => {
          this.rawStructs = res.data["view_struct"].map(struct => {
            return {
              value: struct.id,
              label: struct.struct_name
            }
          })
          if (this.selectedCompanies.length === 1) {
            this.structs = this.structCreator((res.data["view_struct"]));
          }
        });
    },
    saveNotificationSettings() {
      axios.post("https://api.amjilt.com/plan/update-notification-settings/", this.notificationSettings).then(res => {
        notification["success"]({
          message: 'Тохиргоо хадгалагдлаа',
          description: 'Мэдэгдэлийн тохиргоог амжилттай хадгаллаа.',
        });
      })
    }
  },
  watch: {
    showTaskModal(v) {
      if (!v) {
        this.taskEditClose();
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getProject();
    }
  },
}
