<template>
  <nuxt-link :to="`/plan/${project.id}/kanban`"
             class="card rounded-md bg-white dark:bg-slate-800 lg:h-full  shadow-base">
    <div class="card-body flex flex-col p-6">
      <div class="card-text h-full">
        <header class="flex justify-between items-center">
          <div class="flex space-x-4 items-center rtl:space-x-reverse">
            <div class="flex-none">
              <div v-if="!project.logo"
                class="h-10 w-10 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
                {{ project.title.substring(0, 2).toUpperCase() }}
              </div>
              <div
                  v-if="project.logo"
                class="h-10 w-10 rounded-full overflow-hidden text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
                <img :src="`https://plan.mcpc.mn${project.logo}`" alt="">
              </div>
            </div>
            <div class="font-medium text-sm   ml-2">
              <div class="dark:text-slate-200 text-slate-900 ">
                {{ project.title }}
              </div>

            </div>
            <div v-if="project.favorite" :class="`ml-2 project-favorite ${project.favorite ? 'favorite-project' : ''}`" @click="favorite">
           <span class="svg-icon ">
                      <inline-svg
                        src="/assets/icons/duotone/General/Star.svg"
                      />
              </span>
            </div>
          </div>
          <DropDown @edit-event="editProject" @delete-event="deleteProject" />
        </header>

        <div class="flex space-x-6 rtl:space-x-reverse mt-3" v-if="project.start_date && project.end_date">
          <div>
            <span class="block date-label">Эхлэх</span>
            <span class="block date-text">{{ project.start_date ? $date(project.start_date) : ''}}</span>
          </div>
          <div>
            <span class="block date-label">Дуусах</span>
            <span class="block date-text">{{ project.end_date ? $date(project.end_date) : '' }}</span>
          </div>
        </div>
        <div class="ltr:text-right rtl:text-left text-xs text-slate-600 dark:text-slate-300 mb-1 font-medium mt-3">
          Гүйцэтгэл: {{ project.progress ? project.progress : 0 }}%
        </div>
        <div class="relative">
          <div class="w-full rounded-[999px] overflow-hidden bg-slate-100 dark:bg-slate-100 h-2">
            <div class="flex flex-col text-center whitespace-nowrap justify-center h-full bg-green-500"
                 :style="`width: ${project.progress ? project.progress : 0}%; transition: width 1s linear 0s;`">
              <!--              <span style="color: white;">Гүйцэтгэл: 75%</span>-->
            </div>
          </div>
        </div>

        <!--        <div class="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <div class="flex justify-start -space-x-1.5 rtl:space-x-reverse">
                      <div class="h-6 w-6 rounded-full ring-1 ring-slate-100">
                        <img src="https://mcpc.mn/uploaded/images/2023/March/2-67165784_2636185136414435_8799794304764608512_n.jpg" alt="Mahedi Amin" class="w-full h-full rounded-full">
                      </div>
                      <div class="h-6 w-6 rounded-full ring-1 ring-slate-100">
                        <img src="https://mcpc.mn/uploaded/images/2023/March/311005265_538029634992735_2080994582962977195_n.jpg" alt="Sovo Haldar" class="w-full h-full rounded-full">
                      </div>
                      <div class="h-6 w-6 rounded-full ring-1 ring-slate-100">
                        <img src="https://mcpc.mn/uploaded/images/2023/March/2-67165784_2636185136414435_8799794304764608512_n.jpg" alt="Rakibul Islam" class="w-full h-full rounded-full">
                      </div>
                      <div class="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 text-xs ring-2 ring-slate-100 dark:ring-slate-700 rounded-full h-6 w-6 flex flex-col justify-center items-center">
                        +2
                      </div>
                    </div>
                  </div>
                  <div class="ltr:text-right rtl:text-left">
                    <span class="inline-flex items-center space-x-1 bg-danger-500 bg-opacity-[0.16] text-danger-500 text-xs font-normal px-2 py-1 rounded-full rtl:space-x-reverse">
                      <span>
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="iconify iconify&#45;&#45;heroicons-outline">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z"></path>
                          </svg>
                        </span>
                      </span>
                      <span>3</span>
                      <span>өдөр үлдсэн</span>
                    </span>
                  </div>
                </div>-->
      </div>
    </div>
  </nuxt-link>
</template>

<script>
import DropDown from "../Common/Components/DropDown.vue";
export default {
  name: "project",
  emits:["editProject", "deleteProject"],
  components:{
    DropDown
  },
  props: {
    project: Object,
  },
  methods:{
    editProject(){
      this.$emit("editProject", this.project.id)
    },
    deleteProject(){
      this.$emit("deleteProject", this.project.id)
    },
  }
}
</script>

<style scoped>

</style>
