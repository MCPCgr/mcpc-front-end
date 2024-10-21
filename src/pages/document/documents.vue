<template>
  <portal to="header-left">
    <div class="page-title float-left">
      <div class="float-left pt-3">
        <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">Албан бичиг архив</h1>
        <h2 class="text-gray-400 text-xs m-0"><span>Албан бичиг, Гэрээ</span></h2>
      </div>
    </div>
  </portal>
  <portal to="sub-top-menu">

    <TopMenu :current="['documents']"

             @saveNotificationSettings="saveNotificationSettings"

             :notificationSettings="notificationSettings"
    />
  </portal>
  <div class="card drawer-wrappper window-crud active-grid">
    <section class="offcanvas-template">
      <div class="crud-page">
        <div class="crud-page-body">
          <div class="dg-flex">
            <datagrid  ref="grid"
                       :url="`https://document.mcpc.mn`"
                       schemaID="1219"
                       :paginate="50"
                       :fnView="view"

                       :dblClick="dbClickAction"
                       :permissions="{r:true}"

                       :custom_condition="null"
                       :user_condition="[]">
            </datagrid>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>
<script setup>
import TopMenu from "~/modules/document/TopMenu.vue";
import {ref} from "vue";


const notificationSettings = ref({
  id: "",
  emp_id: 0,
  task_on_complete: false,
  project_on_member_add: false,
  project_on_task_add: false,
  project_on_project_finish: false,
  project_on_member_delete: false,
  task_on_assign: false,
  task_on_delay: false,
  task_on_progress_update: false,
  task_on_un_assign: false,
  provider_sms: false,
  provider_email: false,
  provider_browser: false
});



function saveNotificationSettings() {

}

function view(id){
  window.open("/dms/check/"+id, "_blank")
}
function dbClickAction(){

}
</script>
<style scoped>
.active-grid .offcanvas-template .crud-page {
  height: calc(100vh - 170px) !important;
}
</style>
