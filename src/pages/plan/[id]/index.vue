<template>
  <div>
    <Head>
      <Title>Ажил төлөвлөлт</Title>
    </Head>
    <portal to="sub-top-menu">
      <TopMenu :current="['dashboard']"
               @filter="filter"
               @saveNotificationSettings="saveNotificationSettings"
               :filterData="filterData"
               :projectID="$route.params.id"
               :members="members"
               :employees="companyEmployees"
               :notificationSettings="notificationSettings"
      />
    </portal>
    <portal to="header-left">
      <ProjectHeader
        :loading="loading"
        :project="project"
        :members="members"
        :employees="companyEmployees"
        :structs="structs"
        @searchStruct="getStructData"
        @changeProjectSettings="changeProjectSettings"
        @changeProjectMembers="changeProjectMembers"
      />
    </portal>
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div class="bg-white rounded-lg p-3 dashboard_shadow">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Төсөл эхлэх, дуусах</div>
            <div>
              <div class="bg-blue-600 flex items-center  justify-center rounded-full w-8 h-8" >
                <inline-svg class="svg-icon-white w-5 w-5" src="/assets/icons/duotone/Interface/Calendar.svg"/>
              </div>
            </div>
          </div>
          <div class="text-md font-bold text-second_color text-center pb-2" v-if="!filterData.start_date || !filterData.end_date">{{ project.start_date ? $date(project.start_date): '' }} - {{ project.end_date ? $date(project.end_date) : ''}}</div>
          <div class="text-md font-bold text-second_color text-center pb-2" v-else>{{ $date(filterData.start_date.toString()) }} - {{ $date(filterData.end_date.toString()) }}</div>
        </div>
        <div class="bg-white rounded-lg p-3 dashboard_shadow">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Төслийн гүйцэтгэл</div>
            <div>
              <div class="bg-green-600 flex items-center  justify-center rounded-full w-8 h-8" >
                <inline-svg class="svg-icon-white w-5 w-5" src="/assets/icons/duotone/Communication/Clipboard-check.svg"/>
              </div>
            </div>
          </div>
          <div class="text-2xl font-bold text-second_color text-center pb-2" v-if="!filterData.start_date || !filterData.end_date">{{$number(project.progress)}}%</div>
          <div class="text-2xl font-bold text-second_color text-center pb-2" v-else>{{$number(tasksByMembersAndProgress.filteredAverageProgress)}}%</div>
        </div>
        <div class="bg-white rounded-lg p-3 dashboard_shadow">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Нийт ажилбар</div>
            <div class="bg-blue-500 flex items-center  justify-center rounded-full w-8 h-8 ">
              <inline-svg class="svg-icon-white w-5 w-5" src="/assets/icons/duotone/Communication/Clipboard-list.svg"/>
            </div>
          </div>
          <div class="text-2xl font-bold text-second_color text-center pb-2"> {{ $number(tasks.length) }}</div>
        </div>
        <div class="bg-white rounded-lg p-3 dashboard_shadow">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Нийт оролцогчид</div>
            <div>
              <div class="bg-purple-500 flex items-center  justify-center rounded-full w-8 h-8">
                <inline-svg class="svg-icon-white w-5 w-5" src="/assets/icons/duotone/Communication/Group.svg"/>
              </div>
            </div>
          </div>
          <div class="text-2xl font-bold text-second_color text-center pb-2">{{ $number(employees.length) }}</div>
        </div>
        <div class="bg-white rounded-lg p-3 dashboard_shadow">
          <div class="flex items-center justify-between pb-2">
            <div class="text-xs font-semibold text-second_color">Нийт төлөв</div>
            <div>
              <div class="bg-blue-500 flex items-center  justify-center rounded-full w-8 h-8" >
                <inline-svg class="svg-icon-white w-5 w-5" src="/assets/icons/duotone/Layout/Layout-3d.svg"/>
              </div>
            </div>
          </div>
          <div class="text-2xl font-bold text-second_color text-center pb-2">{{ stages.length }}</div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-8">
        <div class="flex flex-col col-span-2">
          <h2 class="my-4">Оролцогчийн гүйцэтгэл </h2>
          <div class="bg-white rounded-xl p-6 dashboard_shadow flex-grow relative" >
            <a class="ant-dropdown-link absolute top-3 right-1"  @click.prevent @click="downloadTasksByMembersAndProgress">
              <inline-svg
                src="/assets/icons/duotone/Files/Download.svg" class="svg-icon mr-1 inline-block"
              />
            </a>
            <table class="w-full">
              <thead>
              <tr>
                <th>#</th>
                <th class="align-left">Оролцогч</th>
                <th>Нийт</th>
                <th>Эхлээгүй</th>
                <th>Хийж байгаа</th>
                <th>Хоцрогдолтой</th>
                <th>Дууссан</th>
                <th>Гүйцэтгэл</th>
                <th>Ажиллах өдөр</th>
                <th>Ажилсан өдөр</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(member, index) in tasksByMembersAndProgress.memberTaskCounts" :key="member.index">
                <td>{{ index + 1 }}</td>
                <td>
                  <div class="flex items-center mb-1.5 align-center">
                    <div
                      class="w-10 h-10 border-2 border-white rounded-full bg-white dark:border-gray-800 overflow-hidden">
                      <img class="flex-none h-10 w-10 rounded-full ring-1 ring-white object-cover"
                           :src="member.avatar !== null && member.avatar !== '' ? 'https://erp.mcpc.mn'+member.avatar : '/amjilt-erp/images/defaultAvatar.svg'"
                           alt=""
                      />
                    </div>
                    <div class="ml-2">
                      {{ member.member }}
                    </div>
                  </div>
                </td>
                <td>
                  <div class="text-xs bg-slate-100 font-semibold p-1 rounded text-right mr-2.5">
                    {{ $number(member.total) }}
                  </div>
                </td>
                <td>
                  <div class="text-xs  bg-slate-100 font-semibold p-1 rounded text-right mr-2.5">
                    <span :class="member.notStarted > 0 ? 't-notStarted' : 'text-gray-600' ">{{ $number(member.notStarted) }}</span>
                  </div>
                </td>
                <td>
                  <div class="text-xs t-doing bg-slate-100 font-semibold p-1 rounded text-right mr-2.5">
                    {{ $number(member.doing) }}
                  </div>
                </td>

                <td>
                  <div class="text-xs  bg-slate-100 font-semibold p-1 rounded text-right">
                    <span :class="member.delayed > 0 ? 't-delayed' : 'text-gray-600' ">{{ $number(member.delayed) }}</span>
                  </div>
                </td>
                <td>
                  <div class="text-xs t-completed bg-slate-100  font-semibold p-1 rounded text-right mr-2.5">
                    <span :class="member.completed > 0  ? 'text-green-500' : 'text-red-500'">{{ $number(member.completed) }}</span>
                  </div>
                </td>
                <td>
                  <div class="text-xs  bg-slate-100 font-semibold p-1 rounded text-right mr-2.5">
                    <span :class="member.completedPercent > 0  ? 'text-green-500' : 'text-red-500'">{{ $number(member.completedPercent) }}%</span>
                  </div>
                </td>
                <td>
                  <div class="text-xs  bg-slate-100 font-semibold p-1 rounded text-right mr-2.5">
                    {{ $number(member.plannedDays) }}
                  </div>
                </td>
                <td>
                  <div class="text-xs  bg-slate-100 font-semibold p-1 rounded text-right mr-2.5">
                    <span :class="member.plannedDays >= member.workedDays ? 'text-green-500' : 'text-red-500'">{{ $number(member.workedDays) }}</span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4 mt-4">
        <div class="flex flex-col">
          <div class="bg-white rounded-xl pt-4 pr-4 pl-4 pb-2 dashboard_shadow flex-grow ">
            <div class="chart-element">
              <h2 class="align-left">Ажилбар явцаар </h2>
              <PieChart
                v-if="!loading"
                chart_title="Ажилбар явцаар"
                :hideTitle="true"
                :isRest="true"
                :chart-data="progressPieData"
                :value="[{name:'value'}]"
                :title="[{name:'label'}]"
                type="PieChart"
                :colors="['#f8785b','#4e74ee', '#e14040', '#79b65d']"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="bg-white rounded-xl  pt-4 pr-4 pl-4 pb-2 dashboard_shadow flex-grow ">
            <div class="chart-element">
              <h2 class="align-left">Ажилбар зэрэгллээр </h2>
              <PieChart
                v-if="!loading"
                chart_title="Ажилбар зэрэгллээр"
                :hideTitle="true"
                :isRest="true"
                :chart-data="tasksByPriorities"
                :value="[{name:'count'}]"
                :title="[{name:'priority'}]"
                type="PieChart"
                :colors="tasksByPriorities.map(t=>t.color)"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="bg-white rounded-xl  pt-4 pr-4 pl-4 pb-2 dashboard_shadow flex-grow">
            <div class="chart-element">
              <h2 class="align-left">Ажилбар төлвөөр </h2>
              <PieChart
                v-if="!loading"
                chart_title="Ажилбар төлвөөр"
                :hideTitle="true"
                :isRest="true"
                :chart-data="tasksByStages"
                :value="[{name:'count'}]"
                :title="[{name:'stage'}]"
                type="PieChart"
                :colors="generateLightenedColors('#1c4384', tasksByStages.length)"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="bg-white rounded-xl  pt-4 pr-4 pl-4 pb-2 dashboard_shadow flex-grow">
            <div class="chart-element">
              <h2 class="align-left">Ажилбар ажилтнаар </h2>
              <PieChart
                v-if="!loading"
                chart_title="Ажилбар ажилтнаар"
                :hideTitle="true"
                :isRest="true"
                :chart-data="tasksByMembers"
                :value="[{name:'count'}]"
                :title="[{name:'member'}]"
                type="PieChart"
                :colors="generateLightenedColors('#1c4384', tasksByMembers.length)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubTopMenu from "~/components/Menu/SubTopMenu.vue";
import pageMixin from "~/mixins/page";
import {
  countTasksByPriorities,
  countTasksByStages, countTasksByMembersAndProgress, generateLightenedColors, countTasksByMembers
} from '~~/plan/analytics/analytics';
import projectMixin from "../../../../plan/Mixins/project";
import PieChart from "@lambda-platform/lambda-vue/src/modules/chart/elements/Pie.vue"
import * as XLSX from 'xlsx';

export default {
  name: "index",
  mixins: [pageMixin, projectMixin],
  components: {SubTopMenu, PieChart},
  data() {
    return {
    };
  },
  beforeCreate() {
    definePageMeta({
      title: 'Ажил төлөвлөлт',
    })
  },
  computed: {
    tasksByPriorities() {
      return countTasksByPriorities(this.tasks, this.priorities);
    },
    tasksByStages() {
      return countTasksByStages(this.tasks, this.stages);
    },
    tasksByMembersAndProgress() {
      if(this.tasks && this.tasks.length >= 1 && this.employees && this.employees.length >= 1){
        return countTasksByMembersAndProgress(this.tasks, this.taskMembers && this.taskMembers.length >= 1 ? this.taskMembers : [], this.employees);
      } else {
        return {
          taskStatus:{
            taskStatus:0,
            doing:0,
            delayed:0,
            completed:0,
          },
          memberTaskCounts: [],
          filteredAverageProgress:0
        };
      }
    },
    tasksByMembers() {
      return countTasksByMembers(this.tasks, this.taskMembers, this.employees);
    },
    progressPieData(){

      return [
        {label:"Эхлүүгүй", value: this.tasksByMembersAndProgress.taskStatus.notStarted},
        {label:"Хийж байгаа", value: this.tasksByMembersAndProgress.taskStatus.doing},
        {label:"Хоцрогдолтой", value: this.tasksByMembersAndProgress.taskStatus.delayed},
        {label:"Дууссан", value: this.tasksByMembersAndProgress.taskStatus.completed},
      ]

    },
    progressPieLabel(){
      return [{}]
    }
  },
  methods: {
    generateLightenedColors,
    downloadTasksByMembersAndProgress(){
      // Create a new workbook
      const wb = XLSX.utils.book_new();
      const memberTaskCounts = this.tasksByMembersAndProgress.memberTaskCounts.map((t, index)=>{
        return {
          index:index+1,
          member:t.member,
          total:t.total,
          notStarted:t.notStarted,
          doing:t.doing,
          delayed:t.delayed,
          completed:t.completed,
          completedPercent:t.completedPercent,
          plannedDays:t.plannedDays,
          workedDays:t.workedDays,
        }
      })
      memberTaskCounts.unshift({
        index: '#',
        member: 'Оролцогч',
        total: "Нийт ажилбар",
        'notStarted': "Нийт ажилбар",
        'doing': "Хийж байгаа",
        'delayed': "Хоцрогдолтой",
        'completed': "Дууссан",
        'completedPercent': "Гүйцэтгэл",
        'plannedDays': "Ажиллах өдөр",
        'workedDays': "Ажилсан өдөр",
      })

      // Convert the formatted task array to a worksheet
      const ws = XLSX.utils.json_to_sheet(memberTaskCounts, {skipHeader: true});

      // Adjust column widths to fit content
      const wscols = [];
      for (let key in memberTaskCounts[0]) {
        // Calculate the maximum width among all rows for a given key/column
        let maxWidth = Math.max(...memberTaskCounts.map(row => (row[key] && row[key].toString().length) || 0));

        // Add a bit of padding and set the width
        wscols.push({ wch: maxWidth + 2 });
      }

      ws['!cols'] = wscols;

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, this.project.title);

      // Write the workbook to an Excel file
      XLSX.writeFile(wb, this.project.title + "-Оролцогчдийн гүйцэтгэл.xlsx");
    }
  },
}
</script>

<style scoped lang="scss">

</style>
