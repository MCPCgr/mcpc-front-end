<template>
  <div class="sub-top-menu  flex justify-between bg-white ">
    <div class="flex-grow">
      <a-menu :selectedKeys="current" mode="horizontal">


        <a-menu-item key="document" class="doc-sub-menu">
          <template #icon>
            <inline-svg class="svg-icon ml-2" src="/assets/icons/duotone/Files/Selected-file.svg"/>
          </template>
          <nuxt-link :to="`/document/document`" class="pl-1.5">
            Албан бичиг, Гэрээ
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="documents" class="doc-sub-menu">
          <template #icon>
            <inline-svg class="svg-icon" src="/assets/icons/duotone/Communication/Archive.svg"/>
          </template>
          <nuxt-link :to="`/document/documents`">
            Албан бичиг архив
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="contracts" class="doc-sub-menu">
          <template #icon>
            <inline-svg class="svg-icon" src="/assets/icons/duotone/Communication/Archive.svg"/>
          </template>
          <nuxt-link :to="`/document/contracts`">
            Гэрээ архив
          </nuxt-link>
        </a-menu-item>


      </a-menu>
    </div>
    <div>
      <a-tooltip>
        <template #title>Мэдэгдэл тохиргоо</template>
        <inline-svg
          src="/assets/icons/duotune/general/gen007.svg" class="svg-icon mt-2.5 mr-2 inline-block cursor-pointer"
          @click="openNotifcation = true;"
        />
      </a-tooltip>

      <a-drawer
        v-model:open="openNotifcation"
        width="350"
        placement="right"
        title="Мэдэгдэл тохиргоо"


      >
        <div class="project-notification p-1">


          <div class="mb-4">
            <label>Албан бичиг мэдэгдэл</label>


            <ul>
              <li>
                <a-switch v-model:checked="notificationSettings.project_on_member_add"/>
                Албан бичиг хувиарлагдах үед
              </li>
              <li>
                <a-switch v-model:checked="notificationSettings.project_on_task_add"/>
                Албан бичиг төлөв солигдох үед
              </li>
              <li>
                <a-switch v-model:checked="notificationSettings.project_on_project_finish"/>
                Албан бичиг албажих үед
              </li>

            </ul>


          </div>


          <div class="mb-4">
            <label>Мэдэгдэл хүээн авах суваг</label>

            <ul>
              <li>
                <a-switch v-model:checked="notificationSettings.provider_sms"/>
                Мессэж | SMS
              </li>
              <li>
                <a-switch v-model:checked="notificationSettings.provider_email"/>
                Цахим шуудаг | E-mail
              </li>
              <li>
                <a-switch v-model:checked="notificationSettings.provider_browser"/>
                Хөтөч | Browser
              </li>
            </ul>

          </div>


          <div class="flex">

            <a-button type="primary" class="flex-grow ml-1" @click="saveNotificationSettings">Хадгалах</a-button>
          </div>
        </div>
      </a-drawer>

    </div>
  </div>
</template>

<script>
import dayjs from "@lambda-platform/lambda-vue/src/utils/dayjs";

export default {
  name: "TopMenu",
  props: {
    current: Array,
    filterData: Object,
    notificationSettings: Object,
  },
  emits: [ "saveNotificationSettings"],
  data() {
    return {

      openFilter: false,
      openNotifcation: false,
      currentRange: null,
      searchRange: [null, null],
      dateRanges: [
        {
          label: "Өчигдөр",
          value: "yesterday"
        },
        {
          label: "Өнөөдөр",
          value: 'today'
        },
        {
          label: "Энэ 7",
          value: "this_week"
        },
        {
          label: "Өмнөх 7",
          value: "last_week"
        },
        {
          label: "Энэ сар",
          value: "this_month"
        },
        {
          label: "Өмнөх сар",
          value: "last_month"
        },
      ],
      progressRanges: {
        0: "0%",
        25: "25%",
        50: "50%",
        100: "100%"
      },
      searchData: {
        start_date: null,
        end_date: null,
        selectedEmps: [],
        progress: [0, 100],
        progress_calculate_type: [],
        progress_type: [],
      },

    }
  },
  beforeMount() {
    this.searchData = {...this.filterData}
  },
  methods: {
    changeDates() {
      if (this.searchRange === null) {
        this.searchData.start_date = null;
        this.searchData.end_date = null;
      } else {
        this.searchData.start_date = this.searchRange[0];
        this.searchData.end_date = this.searchRange[1];
      }

    },
    resetFilter() {

      this.searchRange = [null, null];
      this.searchData = {
        start_date: null,
        end_date: null,
        selectedEmps: [],
        progress: [0, 100],
        progress_calculate_type: [],
        progress_type: [],
      }
      this.$emit("filter", this.searchData);
    },
    filter() {
      this.$emit("filter", this.searchData);
      this.openFilter = false;
    },

    handlerRangeFilter() {
      if (this.currentRange === "yesterday") {
        this.filterYesterday();
      } else if (this.currentRange === "today") {
        this.filterToday();
      } else if (this.currentRange === "this_week") {
        this.filterThisWeek();
      } else if (this.currentRange === "last_week") {
        this.filterLastWeek();
      } else if (this.currentRange === "this_month") {
        this.filterThisMonth();
      } else if (this.currentRange === "last_month") {
        this.filterLastMonth();
      }
    },
    setFilterDate(start, end) {
      this.searchRange = [start, end];
      this.searchData.start_date = start;
      this.searchData.end_date = end;
    },
    filterYesterday() {
      const yesterday = dayjs().subtract(1, 'day');
      this.setFilterDate(yesterday, yesterday);

    },
    filterToday() {
      const today = dayjs();
      this.setFilterDate(today, today);

    },
    filterThisWeek() {

      const startOfWeek = dayjs().startOf('isoWeek');
      const endOfWeek = dayjs().endOf('isoWeek');
      this.setFilterDate(startOfWeek, endOfWeek);

    },
    filterLastWeek() {
      const startOfLastWeek = dayjs().subtract(1, 'week').startOf('isoWeek');
      const endOfLastWeek = dayjs().subtract(1, 'week').endOf('isoWeek');
      this.setFilterDate(startOfLastWeek, endOfLastWeek);

    },
    filterThisMonth() {
      const startOfMonth = dayjs().startOf('month');
      const endOfMonth = dayjs().endOf('month');
      this.setFilterDate(startOfMonth, endOfMonth);
    },
    filterLastMonth() {
      const startOfLastMonth = dayjs().subtract(1, 'month').startOf('month');
      const endOfLastMonth = dayjs().subtract(1, 'month').endOf('month');
      this.setFilterDate(startOfLastMonth, endOfLastMonth);
    },
    saveNotificationSettings() {
      this.$emit("saveNotificationSettings")
    }
  },
  computed: {
    filteredList() {

      return this.users.map(user => {
        return {
          value: user.id,
          emp_id: user.id,
          avatar: user.avatar,
          label: user.firstname,
          searchValue: user.firstname + " " + user.lastname + " " + user.login,
          firstname: user.firstname,
          lastname: user.lastname,
          login: user.login
        }
      });
    },
    users() {
      if (this.employees.length >= 1 && this.members.length >= 1) {
        return this.members.map(member => {
          const empIndex = this.employees.findIndex(emp => emp.id === member.emp_id)
          return {
            ...member,
            id: member.emp_id,
            avatar: this.employees[empIndex].avatar,
            lastname: this.employees[empIndex].lastname,
            firstname: this.employees[empIndex].firstname,
            login: this.employees[empIndex].login,
          }
        })
      } else {
        return []
      }
    }
  }

}
</script>

<style scoped>

</style>
