<template>
  <div class="sub-top-menu  flex justify-between bg-white">
    <div class="flex-grow">
      <a-menu :selectedKeys="current" mode="horizontal">
        <a-menu-item key="kanban">
          <template #icon>
            <inline-svg class="svg-icon" src="/assets/icons/duotone/Layout/Layout-3d.svg"/>
          </template>
          <nuxt-link :to="`/plan/${projectID}/kanban`">
            Самбар
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="gantt">
          <template #icon>
            <inline-svg class="svg-icon" src="/assets/icons/duotone/Interface/Calendar.svg"/>
          </template>
          <nuxt-link :to="`/plan/${projectID}/gantt`">
            Календарь
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="dashboard">
          <template #icon>
            <inline-svg class="svg-icon" src="/assets/icons/duotone/Shopping/Chart-bar2.svg"/>
          </template>
          <nuxt-link :to="`/plan/${projectID}`">
            Гүйцэтгэлийн тайлан
          </nuxt-link>
        </a-menu-item>
      </a-menu>
    </div>
    <div>
      <a-tooltip>
        <template #title>Төслийн мэдэгдлийн тохиргоо</template>
        <inline-svg
          src="/assets/icons/duotune/general/gen007.svg" class="svg-icon mt-2.5 mr-2 inline-block cursor-pointer"
          @click="openNotification = true;"
        />
      </a-tooltip>
      <a-tooltip>
        <template #title>Шүүх</template>
        <inline-svg
          src="/assets/icons/duotone/Text/Filter.svg" class="svg-icon mt-2.5 mr-2 inline-block cursor-pointer"
          @click="openFilter = true;"
        />
      </a-tooltip>
      <a-drawer
        v-model:open="openNotification"
        width="350"
        placement="right"
        title="Төслийн мэдэгдлийн тохиргоо"
      >
        <div class="project-notification p-1">
          <div class="mb-4">
            <label> Мэдэгдэл хүлээн авах эсэх</label>
            <ul>
<!--              <li>-->
<!--                <a-switch v-model:checked="notificationSettings.provider_sms" /> Мессэж | SMS-->
<!--              </li>-->
<!--              <li>-->
<!--                <a-switch v-model:checked="notificationSettings.provider_email" /> Цахим шуудаг | E-mail-->
<!--              </li>-->
              <li>
                <a-switch v-model:checked="notificationSettings.provider_browser"/>
              </li>
            </ul>
          </div>
          <div class="mb-4">
            <label>Төслийн мэдэгдэл:</label>
            <ul>
              <li>
                <a-switch v-model:checked="notificationSettings.project_on_member_add"/>
                Төсөлд оролцогч нэмэгдэх үед
              </li>
              <li>
                <a-switch v-model:checked="notificationSettings.project_on_task_add"/>
                Төсөлд ажилбар нэмэгдэх үед
              </li>
              <li>
                <a-switch v-model:checked="notificationSettings.project_on_project_finish"/>
                Төсөл дуусах үед
              </li>
              <li>
                <a-switch v-model:checked="notificationSettings.project_on_member_delete"/>
                Төсөлд оролцогчоос хасагдах үед
              </li>
              <li>
                <a-switch v-model:checked="notificationSettings.task_on_complete"/>
                Нэгж ажилбар дуусах үед
              </li>
              <li>
                <a-switch v-model:checked="notificationSettings.task_on_progress_update"/>
                Нэгж ажилбарын гүйцэтгэлд шинэчлэгдэх үед
              </li>
            </ul>
          </div>
          <div class="mb-4">
            <label>Ажилбар мэдэгдэл:</label>
            <ul>
              <li>
                <a-switch v-model:checked="notificationSettings.task_on_assign"/>
                Оролцогчоор хуваарилагдах үед
              </li>
              <li>
                <a-switch v-model:checked="notificationSettings.task_on_delay"/>
                Хоцрогдол үүсэх үед
              </li>
              <li>
                <a-switch v-model:checked="notificationSettings.task_on_un_assign"/>
                Оролцогчоос хасагдах үед
              </li>
            </ul>
          </div>
          <div class="flex">
            <a-button type="primary" class="flex-grow ml-1" @click="saveNotificationSettings">Хадгалах</a-button>
          </div>
        </div>
      </a-drawer>
      <a-drawer
        v-model:open="openFilter"
        width="335"
        placement="right"
        title="Шүүлтүүр"
      >
        <div class="project-filter p-1">
          <div class="mb-4">
            <label>Оролцогч</label>
            <a-select
              v-model:value="searchData.selectedEmps"
              show-search
              class="w-full  mt-1"
              placeholder="Оролцогч сонгох"
              optionFilterProp="searchValue"
              optionLabelProp="label"
              :options="filteredList"
              :show-search="true"
              mode="multiple"
            >
              <template #option="{ value: val, label, avatar}">
                <div class="flex items-center space-x-3 font-semibold">
                  <a-avatar style="width: 32px; height: 32px; flex: none;">
                    <template #icon>
                      <div class="flex items-center justify-center h-full w-full">
                        <img alt="avatar" class="h-full w-full object-cover bg-no-repeat bg-center"
                             :src="avatar !== null && avatar !== '' ? 'https://mcpc.mn'+avatar : '/amjilt-erp/images/defaultAvatar.svg'">
                      </div>
                    </template>
                  </a-avatar>
                  <span>{{ label }}</span>
                </div>
              </template>
            </a-select>
          </div>
          <div class="mb-4">
            <label>Огноо</label>
            <a-range-picker v-model:value="searchRange" @change="changeDates" class="w-full  mt-1 " :locale="locale">
              <template #renderExtraFooter>
                <a-segmented class="mx-3 my-2" v-model:value="currentRange" :options="dateRanges"
                             @change="handlerRangeFilter"/>
              </template>
            </a-range-picker>
          </div>
          <div class="mb-4">
            <label>Гүйцэтгэл бодох төрөл</label>
            <a-checkbox-group v-model:value="searchData.progress_calculate_type" class="w-full  mt-1">
              <a-checkbox value="by_sub_task" class="w-full pl-1">Дэд ажилбараас тооцоолох</a-checkbox>
              <a-checkbox value="by_manual" class="w-full pl-1">Гараар тооцоолох</a-checkbox>
              <a-checkbox value="not_calculate" class="w-full pl-1">Тооцохгүй</a-checkbox>
            </a-checkbox-group>
          </div>
          <div class="mb-4">
            <label>Явц</label>
            <a-checkbox-group v-model:value="searchData.progress_type" class="w-full  mt-1">
              <a-checkbox value="completed" class="w-full pl-1">Дууссан</a-checkbox>
              <a-checkbox value="delayed" class="w-full pl-1">Хоцродолтой</a-checkbox>
              <a-checkbox value="normal" class="w-full pl-1">Хэвийн</a-checkbox>
            </a-checkbox-group>
          </div>
          <div class="mb-4">
            <label>Гүйцэтгэл</label>
            <a-slider v-model:value="searchData.progress" range :marks="progressRanges" class="w-full  mt-1">
              <template #mark="{ label, point }">
                <template v-if="point === 100">
                  <strong>{{ label }}</strong>
                </template>
                <template v-else>{{ label }}</template>
              </template>
            </a-slider>
          </div>
          <div class="flex">
            <a-button @click="resetFilter">Дахин тохируулах</a-button>
            <a-button type="primary" class="flex-grow ml-1" @click="filter">Шүүх</a-button>
          </div>
        </div>
      </a-drawer>
    </div>
  </div>
</template>

<script>
import dayjs from "@lambda-platform/lambda-vue/src/utils/dayjs";
import mn_MN from "@lambda-platform/lambda-vue/src/antlocale/date_mn_MN";

export default {
  name: "TopMenu",
  props: {
    members: Array,
    employees: Array,
    current: Array,
    filterData: Object,
    notificationSettings: Object,
    projectID: String,
  },
  emits: ["filter", "saveNotificationSettings"],
  data() {
    return {
      locale: mn_MN,
      openFilter: false,
      openNotification: false,
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
          const empIndex = this.employees.findIndex(emp => emp.id === member.emp_id);
          if (empIndex >= 0) {
            return {
              ...member,
              id: member.emp_id,
              avatar: this.employees[empIndex].avatar,
              lastname: this.employees[empIndex].lastname,
              firstname: this.employees[empIndex].firstname,
              login: this.employees[empIndex].login,
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
