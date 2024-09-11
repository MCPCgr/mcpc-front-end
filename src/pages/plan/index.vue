<template>
  <div>
    <Head>
      <Title>Ажил төлөвлөлт</Title>
    </Head>
    <portal to="sub-top-menu" >
      <PMTopMenu :current="['projects']"/>
    </portal>
    <portal to="header-left">
      <div class="flex">
        <div class="page-title ">
          <div class="float-left pt-3">
            <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">Төслүүд</h1>
            <h2 class="text-gray-400 text-xs m-0"><span>Ажил төлөвлөлт</span></h2>
          </div>
        </div>
        <div class="flex items-center">
          <a-input  v-model:value="searchValue"
                    class="mx-3 "
                    placeholder="Хайх"
                    style="width: 200px">
            <template #prefix>
         <span class="svg-icon">
                      <inline-svg
                        src="/assets/icons/duotune/general/gen021.svg"
                      />
        </span>
            </template>
          </a-input>

          <a-button type="primary" @click="createProject" shape="round">
            <template #icon>
                        <span class="anticon align-top ant-btn-svg-icon" style="vertical-align: top">
                            <inline-svg
                              src="/assets/icons/duotune/general/gen041.svg"
                            />
                        </span>
            </template>
            Төсөл нэмэх
          </a-button>
        </div>

      </div>
    </portal>
    <div class="">
      <div class=" flex justify-end">
        <div>

        </div>
      </div>
      <div class="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5" data-v-3d87b15f="">
        <projectSkeleton v-if="loading"/>
        <projectSkeleton v-if="loading" />
        <project v-for="project in projectsFiltered" v-if="!loading && projects.length >= 1" :key="project.index" :project="project"
                 @editProject="editProject"
                 @deleteProject="deleteProject"
        />

      </div>
      <div v-if="!loading && projects.length === 0">
        <a-result title="Төсөл бүртгээгүй байна" >
          <template #extra>
            <a-button type="primary" @click="createProject" shape="round">
              <template #icon>
                        <span class="anticon align-top ant-btn-svg-icon" style="vertical-align: top">
                            <inline-svg
                              src="/assets/icons/duotune/general/gen041.svg"
                            />
                        </span>
              </template>
              Төсөл нэмэх
            </a-button>
          </template>
        </a-result>
      </div>
    </div>

    <a-modal
      v-model:open="showNewProjectModal"
      class="create"

      title="Төсөл нэмэх"
      :forceRender="true"
      :width="450"
      :footer="null"
      placement="right"
    >
      <dataform
        ref="form"
        :hideTitle="true"
        :schemaID="1011"
        :title="``"
        url="https://api.amjilt.com/plan"
        :onSuccess="projectOnSuccess"
        :do_render="showNewProjectModal"

      >
      </dataform>

    </a-modal>

    <a-modal
      v-model:open="showEditProjectModal"
      class="create"

      title="Төсөл засах"
      :forceRender="true"
      :width="450"
      :footer="null"
      placement="right"
    >
      <dataform
        ref="editForm"
        :hideTitle="true"
        :schemaID="1023"
        :editMode="editMode"
        :title="``"
        v-if="showEditProjectModal"
        url="https://api.amjilt.com/plan"
        :onSuccess="projectOnSuccess"
        :onReady="editFormReady"
        :do_render="showEditProjectModal"

      >
      </dataform>

    </a-modal>
  </div>
</template>

<script>
import PMTopMenu from "~~/plan/Common/Components/PMTopMenu.vue";

import pageMixin from "~/mixins/page";
import project from "../../../plan/Project/project.vue";
import projectSkeleton from "../../../plan/Project/projectSkeleton.vue";

import {clearDuplicates} from "~~/plan/utils/utils";
import axios from "~/plugins/core/axios";


export default {
  name: "index",
  mixins: [pageMixin],
  components: { PMTopMenu, project, projectSkeleton},
  data() {
    return {
      showNewProjectModal:false,
      showEditProjectModal:false,
      editProjectID:null,
      projects:[],
      loading:true,
      editMode:false,
      searchValue:""
    };
  },
  computed: {
    projectsFiltered(){
      const lowercaseSearchValue = this.searchValue.toLowerCase();
      if (lowercaseSearchValue !== "") {
        return this.projects.filter(project => project.title.toLowerCase().includes(lowercaseSearchValue));
      } else {
        return this.projects;
      }
    }
  },
  methods: {

    createProject(){
      this.showNewProjectModal = true;
    },
    editFormReady(){
      this.$nextTick(() => {
        this.editMode = true;
        this.$refs.editForm.editModel(this.editProjectID);
      });
    },
    editProject(id){

      this.editProjectID = id;
      this.showEditProjectModal = true;
    },
    deleteProject(id){

      axios.get(`https://api.amjilt.com/plan/delete-project/${id}`).then(() => {
        this.getProjects();
      }).catch(error => {
        console.log(error);

      });

    },
    projectOnSuccess(){
      this.showEditProjectModal = false;
      this.showNewProjectModal = false;
      this.getProjects();
    },
    getProjects(){
      axios.get("https://api.amjilt.com/plan/projects").then(res=>{
        this.loading = false;
        this.projects = clearDuplicates(res.data);
      }).catch(e=>{
        console.log(e);
        this.loading = false;
        this.projects = [];
      })
    },


  },
  mounted() {
    this.getProjects();
  }
}
</script>

<style scoped lang="scss">

</style>
