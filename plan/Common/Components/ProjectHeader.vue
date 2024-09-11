<template>
  <div class="page-title flex-grow">
    <div class="flex justify-between items-center h-full">
      <div class="flex space-x-2 items-center rtl:space-x-reverse">
        <nuxt-link to="/plan" class="btn btn-icon">
              <span class="svg-icon">
                   <inline-svg src="/assets/icons/duotone/Home/Home2.svg" />
              </span>
        </nuxt-link>
        <div style="height: 40px" class="flex items-center mt-0">
          <a-skeleton-avatar :active="true" v-if="loading" style="height: 30px"/>
          <a-skeleton-input class=" ml-2" style="width: 250px; height: 24px" :active="true" size="small" v-if="loading"/>
        </div>
        <div class="flex-none" v-if="!loading">

          <div v-if="!project.logo"
               class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
            {{ project.title ? project.title.substring(0, 2).toUpperCase() : '' }}
          </div>
          <div
              v-if="project.logo"
              class="h-10 w-10 rounded-full overflow-hidden text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
            <img :src="`https://api.amjilt.com/plan${project.logo}`" alt="">
          </div>
        </div>
        <div class="font-medium text-base leading-6">
          <div class="dark:text-slate-200 text-slate-900 max-w-[300px] truncate" v-if="!loading">
            {{ project.title }}
          </div>
        </div>
        <div v-if="!loading" :class="`project-favorite ${project.favorite ? 'favorite-project' : ''}`"
             @click="favorite">
           <span class="svg-icon ">
                      <inline-svg
                        src="/assets/icons/duotone/General/Star.svg"
                      />
              </span>
        </div>
      </div>
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

            <span>Оролцогчид</span>
<!--            <span v-for="(user, index) in users.slice(0, 3)"><span v-if="index >= 1">, </span>{{ user.firstname }}</span>-->
<!--            <span v-if="users.length > 3">...</span>-->
          </div>
        </div>
      </div>
    </div>
    <a-modal

      v-model:open="showMembersModal"
      title="Төслийн оролцогчид"
      centered
      :footer="null"
    >
      <div class="flex flex-col">
        <div class="four_search">
          <a-select
            v-model:value="selectedEmp"
            show-search
            style="width: 100%"
            placeholder="Оролцогч нэмэх"
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
                <a-select
                  style="width: 100%"
                  placeholder="Оролцоо"
                  v-model:value="member.access_id"

                >
                  <a-select-option :value="1">Эзэмших</a-select-option>
                  <a-select-option :value="2">Засах</a-select-option>
                  <a-select-option :value="3">Харах</a-select-option>

                </a-select>

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
              <span class="px-4">Хадгалах</span>
            </a-button>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import axios from "~/plugins/core/axios";
import {GET_EMPLOYEE_WITH_USER} from "~/graphql/queries"
import ls from "~/utils/Storage";
import {COMPANY} from "~/store/mutation-types-tatatonga";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons-vue";

export default {
  name: "ProjectHeader",
  components: {DeleteOutlined, PlusOutlined,},
  emits: ["changeProjectSettings", "changeProjectMembers"],
  props: {
    project: Object,
    members: Array,
    employees: Array,
    loading: Boolean,
  },
  data() {
    const company = ls.get(COMPANY);
    return {
      company,
      showMembersModal: false,
      selectedEmp: null,
      searchName: "",
      selectedUsers: [],
    }
  },
  methods: {
    addMembers(){
      this.selectedUsers = [];
      this.members.forEach(member => {
        const empIndex = this.employees.findIndex(emp => emp.id === member.emp_id)
          if(empIndex >= 0) {
            this.selectedUsers.push({
              ...member,
              project_id: this.project.id,
              avatar: this.employees[empIndex].avatar,
              lastname: this.employees[empIndex].lastname,
              firstname: this.employees[empIndex].firstname,
              login: this.employees[empIndex].login,
            })
          }

      });

      this.showMembersModal = true;
    },
    saveMembers() {
      this.showMembersModal = false;
      this.selectedEmp = null;
      this.$emit("changeProjectMembers", [...this.selectedUsers])
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
          project_id:this.project.id,
          access_id: 2,
          avatar: this.filteredList[foundIndex].avatar,
          lastname: this.filteredList[foundIndex].lastname,
          firstname: this.filteredList[foundIndex].firstname,
          login: this.filteredList[foundIndex].login,
        })
      }
    },
    favorite() {
      this.$emit("changeProjectSettings", {...this.project, favorite: !this.project.favorite})
    },

  },

  computed: {
    searchByName(val) {
      this.searchName = val
    },
    filteredList() {

      return this.employees.map(user => {
        return {value: user.id, emp_id:user.id, avatar:user.avatar, label: user.firstname , searchValue: user.firstname + " " + user.lastname + " " + user.login, firstname: user.firstname, lastname: user.lastname, login: user.login, employee_status_id: user.employee_status_id}
      }).filter(u=>u.employee_status_id === "Ажиллаж байгаа");
    },
    users() {
      if (this.employees.length >= 1 && this.members.length >= 1) {
        return this.members.map(member => {
          const empIndex = this.employees.findIndex(emp => emp.id === member.emp_id);
          if(empIndex >= 0){
            return {
              ...member,
              avatar: this.employees[empIndex].avatar,
              lastname: this.employees[empIndex].lastname,
              firstname: this.employees[empIndex].firstname,
              login: this.employees[empIndex].login,
              employee_status_id: this.employees[empIndex].employee_status_id,
            }
          }

        }).filter(Boolean);
      } else {
        return []
      }
    }
  }

}
</script>

<style scoped>

</style>
