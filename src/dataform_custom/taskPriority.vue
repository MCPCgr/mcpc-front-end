<template>
  <div>
    <a-row>
      <a-col :span="24">
        <lambda-form-item label="Оролцогчид" :name="model.component" :meta="meta">
          <div class="flex justify-between">
            <div class="cursor-pointer" @click="addMembers">
              <div class="flex items-center space-x-3">
                <div class="flex flex-none -space-x-3">
                  <img v-for="user in users.slice(0, 7)" class="flex-none h-7 w-7 rounded-full ring-1 ring-white object-cover"
                       :src="user.avatar !== null && user.avatar !== '' ? 'https://api.amjilt.com/main'+user.avatar : '/amjilt-erp/images/defaultAvatar.svg'"
                       :key="user.id"
                       alt=""/>
                  <div v-if="users.length > 7"
                       class="flex-none h-7 w-7 rounded-full ring-1 ring-white bg-black/95 flex items-center justify-center">
                    <div class="flex items-center space-x-0.5 text-white text-[10px]">
                      <plus-outlined :style="{fontSize: '8px'}"/>
                      <span>{{ users.length - 7 }}</span>
                    </div>
                  </div>
                </div>
                <div class="w-full font-semibold text-sm truncate">
                  <span v-for="(user, index) in users.slice(0, 3)"><span v-if="index >= 1">, </span>{{ user.firstname }}</span>
                  <span v-if="users.length > 3">...</span>
                </div>
              </div>

            </div>

            <div class="flex justify-end" >
              <div class="button-primary">

                <a-button @click="addMembers" type="link" class="add-task-btn">
                  <template #icon>
                        <span class="svg-icon" style="vertical-align: top">
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


        </lambda-form-item>
      </a-col>
      <a-col :span="24">
        <lambda-form-item label="Ажлын зэрэглэл" :name="model.component" :meta="meta">
          <a-input-group compact  >
            <a-select
              v-model:value="model.form[model.component]"

              class="addable-select"

              placeholder="Сонгох"

            >
              <a-select-option :value="priority.id" :label="priority.priority" v-for="priority in priorities"
                               :key="priority.index">
              <span class="w-4 h-4 rounded-full inline-block align-center "
                    :style="`background-color:${priority.color}; vertical-align: middle`"></span>
                {{ priority.priority }}
              </a-select-option>

            </a-select>
            <a-button @click="showAddPriorityModal = true">
              <template #icon>
                    <span class="svg-icon ">
                                 <inline-svg
                                   src="/assets/icons/duotune/general/gen041.svg"
                                 />
                        </span>
              </template>
            </a-button>
          </a-input-group>
        </lambda-form-item>
      </a-col>
    </a-row>
    <a-modal
      :min-width="200"
      :min-height="100"
      :draggable="true"
      :footer-hide="true"
      :title="label"
      width="400px"

      v-model:open="showAddPriorityModal"

    >
      <section class="add-modal" v-if="showAddPriorityModal">
        <div class="add-body">
          <dataform ref="formAddAble" schemaID="1021"
                    :editMode="false"
                    :onSuccess="onSuccess"
                    :onReady="ready"
                    url="https://api.amjilt.com/plan"

                    :do_render="showAddPriorityModal"

          ></dataform>
        </div>
      </section>
      <template #footer>
      </template>
    </a-modal>
    <a-modal

      v-model:open="showMembersModal"
      title="Төслийн орлоцогчид"
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
            <template #option="{ value: val, label, avatar}">
              <div class="flex items-center space-x-3 font-semibold">
                <a-avatar style="width: 32px; height: 32px; flex: none;">
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
        <div class="py-8 space-y-4">
          <div v-for="(member, index) in selectedUsers" class="grid grid-cols-12 gap-6 flex items-start ">
            <div class="col-span-6 flex items-center space-x-3 font-semibold">
              <a-avatar style="width: 32px; height: 32px; flex: none;">
                <template #icon>
                  <div class="flex items-center justify-center h-full w-full">
                    <img alt="avatar" class="h-full w-full object-cover bg-no-repeat bg-center"
                         :src="member.avatar !== null && member.avatar !== '' ? 'https://api.amjilt.com/main'+member.avatar : '/amjilt-erp/images/defaultAvatar.svg'"/>
                  </div>
                </template>
              </a-avatar>
              <span>{{ member.firstname }}</span>
            </div>
            <div class="col-span-6 flex items-center justify-end space-x-4">

              <div class="four_select w-full">

                  <a-input-number

                    :max="100"
                    :min="0" v-model:value="member.task_weight_progress" placeholder="Жин хувиар" style="min-width: 120px"></a-input-number>

              </div>
              <button @click="deleteMember(index)" class="align-top">
                <DeleteOutlined class="ml-2 hover:text-primary_color" @click.prevent/>
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
  </div>
</template>
<script>
import mixin from '@lambda-platform/lambda-vue/src/modules/dataform/elements/_mixin';
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";

export default {
  components: {DeleteOutlined, PlusOutlined},
  mixins: [mixin],
  data() {
    return {
      priorities: window.priorities,
      showAddPriorityModal:false,
      employees:window.employees,
      showMembersModal: false,
      selectedEmp: null,
      searchName: "",
      selectedUsers: [],
    }
  },
  methods:{
    addMembers(){
      this.selectedUsers = [];
      this.model.form["task_members"].forEach(member => {
        const empIndex = this.employees.findIndex(emp => emp.id === member.emp_id)
        this.selectedUsers.push({
          ...member,
          project_id:this.$route.params.id,
          avatar: this.employees[empIndex].avatar,
          lastname: this.employees[empIndex].lastname,
          firstname: this.employees[empIndex].firstname,
          login: this.employees[empIndex].login,
        })

      });

      this.showMembersModal = true;
    },
    saveMembers() {
      if(!this.model.form["task_members"]){
        this.model.form["task_members"] = [];
      }
      this.showMembersModal = false;
      this.selectedEmp = null;
      this.model.form["task_members"] = [...this.selectedUsers]

      this.selectedUsers = [];


    },
    deleteMember(index) {
      this.selectedUsers.splice(index, 1);
    },
    selectMembers(id) {

      const foundIndex = this.filteredList.findIndex(item => item.emp_id === id);
      const existingIndex = this.users.findIndex(item => item.emp_id === id);
      const existingSelectedIndex = this.selectedUsers.findIndex(item => item.emp_id === id);
      if (foundIndex >= 0 && existingIndex <= -1 && existingSelectedIndex <= -1) {
        this.selectedUsers.push({
          emp_id: this.filteredList[foundIndex].emp_id,
          project_id:this.$route.params.id,
          avatar: this.filteredList[foundIndex].avatar,
          lastname: this.filteredList[foundIndex].lastname,
          firstname: this.filteredList[foundIndex].firstname,
          login: this.filteredList[foundIndex].login,
          task_weight_progress: this.filteredList[foundIndex].task_weight_progress,
          task_id: this.filteredList[foundIndex].task_id,
        })
      }
    },
    showAddModal(){

    },
    closeModal () {
      this.showAddPriorityModal = false
    },
    onSuccess (val) {

      console.log(val)

      priorities.push(val)
      this.closeModal()
    },
    ready() {

      this.$nextTick(() => {

        this.$refs.formAddAble.setModel("project_id", this.$route.params.id);

      })
    },
  },
  computed:{
    filteredList() {

      return this.employees.map(user => {
        return {value: user.id, emp_id:user.id, avatar:user.avatar, label: user.firstname , searchValue: user.firstname + " " + user.lastname + " " + user.login, firstname: user.firstname, lastname: user.lastname, login: user.login, task_id: this.model.form["id"]}
      });
    },
    users() {
      if(this.model.form["task_members"]){
        if (this.employees.length >= 1 && this.model.form["task_members"].length >= 1) {
          return this.model.form["task_members"].map(member => {
            const empIndex = this.employees.findIndex(emp => emp.id === member.emp_id)
            return {
              ...member,
              avatar: this.employees[empIndex].avatar,
              lastname: this.employees[empIndex].lastname,
              firstname: this.employees[empIndex].firstname,
              login: this.employees[empIndex].login,
            }
          })
        } else {

          return [];
        }
      } else {
        return [];
      }

    }
  }


};
</script>
