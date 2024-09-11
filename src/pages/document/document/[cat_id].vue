<template>
  <Head>
    <Title>Албан бичиг, Гэрээ</Title>
  </Head>
  <portal to="sub-top-menu">
    <TopMenu :current="['document']"
             @saveNotificationSettings="saveNotificationSettings"
             :notificationSettings="notificationSettings"
    />
  </portal>
  <!-- Right Content -->
  <div class="flex-1 pl-3">
    <div class="flex p-3 justify-between bg-white rounded-md">

      <a-dropdown>
        <div class=" rounded-md flex items-center cursor-pointer">
          <img src="/assets/dms/icons/document.svg" class="h-6  mx-2" alt="Document Icon"/>
          <div class="flex-grow">
            <h3 class="text-sm"> {{ category }} нэмэх</h3>
          </div>
        </div>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="doc_type in types" :key="doc_type.index"
                         @click="createNewDocument(doc_type.id, doc_type.document_name)">
              <nuxt-link :to="`/document/new/${doc_type.id}/${doc_type.workflow_id}`" class="flex">
                <img src="/assets/dms/icons/document.svg" class="h-4  mr-2" alt="Document Icon"/>
                <div class="flex-grow">
                  <h3 class="text-sm"> {{ doc_type.document_name }}</h3>
                </div>
              </nuxt-link>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <div>
          <span class="link link-icon cursor-pointer active" @click="toggleView('grid')">
        <span class="svg-icon">
          <inline-svg
            src="/assets/icons/duotone/Interface/Grid.svg"
          />
        </span>
      </span>
        <span class="link link-icon cursor-pointer" @click="toggleView('list')">
        <span class="svg-icon">
          <inline-svg
            src="/assets/icons/duotone/Text/Bullet-list.svg"
          />
        </span>
      </span>
      </div>
    </div>

    <a-segmented v-model:value="selectedType" :options="typeOptions" v-if="types.length >= 2" class="my-2"
                 @change="callDocuments"/>
    <div class="my-4 w-full" v-else></div>

    <div v-if="!loading && documents.length === 0" class="justify-center mx-auto">
      <a-result :title="`${category} бүртгээгүй байна`">
      </a-result>
    </div>

    <div :class="view === 'grid' ? 'grid grid-cols-2 gap-4 mb-3' : 'flex flex-col mb-3'">

      <div class="p-4 rounded-md flex items-center  bg-white " v-if="loading">
        <img src="/assets/dms/icons/draft.svg" class="h-12  mr-2"
             alt="Document Icon"/>
        <div class="flex-grow pb-7">
          <a-skeleton active :paragraph="{ rows: 1 }"/>

        </div>

      </div>

      <nuxt-link :to="`/document/edit/${doc.id}`" v-for="doc in documents" :key="doc.index"
                 v-if="!loading && documents.length >= 1"
                 class=" p-4 rounded-md flex items-center bg-white cursor-pointer relative">
        <a-popconfirm
          title="Устгах уу?"
          ok-text="Тийм"
          cancel-text="Үгүй"
          @confirm="()=>deleteDoc(doc.id)"
          @click.stop
          placement="left"
          v-if="doc.status_type === 'START'"
        >
          <DeleteOutlined class="ml-2 hover:text-primary_color text-red-600 absolute right-2 top-2" @click.prevent/>
        </a-popconfirm>
        <a-popover title="Албан бичгийн түүх" trigger="click"  v-if="doc.status_type !== 'START'">
          <template #content>
            <div class="w-96 max-h-96 overflow-y-auto">
              <StatusHistory class="" :id="doc.id" :small-signature="true" />
            </div>

          </template>
          <inline-svg
            class="w-5 h-5 svg-icon absolute right-2 top-2 focus:outline-none"
            src="/assets/icons/duotone/Code/Info-circle.svg"
          />
        </a-popover>
        <img :src="`/assets/dms/icons/document.svg`" class="h-12  mr-2" alt="Document Icon"/>
        <div class="flex-grow">
          <h3 class="text-gray-800 text-sm m-0">{{ doc.document_title }} <span
            class="text-[11px] text-gray-700 ml-2"> <br>{{ $dateTime(doc.created_at) }}</span></h3>
          <div class="w-full align-right">
            <span :class="`text-xs  border  rounded-full px-2 py-1  ${getStatusColor(doc.status_type)}`">{{
                doc.status
              }}</span>
          </div>
        </div>
      </nuxt-link>
    </div>
    <a-pagination v-model:current="page" v-model:pageSize="size" :total="totalPage" v-if="totalPage >= 2"
                  @change="callDocuments"/>

    <a-modal v-model:open="createNewDoc" :title="newTypeName" :footer="null" :mask-closable="false">
      <createDocumentFromType :type_id="newTypeID"/>
    </a-modal>
  </div>

</template>

<script setup>

import {defineProps, ref, onMounted} from "vue";
import CreateDocumentFromType from "~/modules/document/createDocumentFromType.vue";
import {DeleteOutlined, InfoCircleOutlined} from "@ant-design/icons-vue";
import {getDocuments} from "~/modules/document/graphql/fetch"
import axios from "~/plugins/core/axios";
import {getStatusColor} from "~/modules/workflow/flow/status";
import {notification} from "ant-design-vue";
import TopMenu from "~/modules/document/TopMenu.vue";

import StatusHistory from "~/modules/process/StatusHistory.vue";

const props = defineProps({
  types: Array,
  category: String,
  icon: String,
  cat_id: String,
});

const page = ref(1);
const size = ref(10);
const totalDocs = ref(0);
const totalPage = ref(0);
const view = ref('grid');
const selectedType = ref('all');
const createNewDoc = ref(false);
const loading = ref(true);
const newTypeID = ref("");
const newTypeName = ref("");
const documents = ref([]);
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

const sorts = ref([
  {
    "column": "created_at",
    "order": "desc"
  }
]);

const typeOptions = computed(() => {
  return [{label: "Бүгд", value: "all"}, ...props.types.map(type => ({label: type.document_name, value: type.id}))];
});
const filters = computed(() => {
  let filterData = [
    {
      "column": "DOC_CATE_ID",
      "condition": "equals",
      "value": props.cat_id
    }
  ]
  if (selectedType.value !== 'all') {
    filterData.push({
      "column": "DOC_TYPE_ID",
      "condition": "equals",
      "value": selectedType.value
    });
  }
  return filterData;

});

function toggleView(newView) {
  view.value = newView;
}

function createNewDocument(id, name) {
  newTypeID.value = id;
  newTypeName.value = name;
  createNewDoc.value = true;
}

async function callDocuments() {

  try {
    loading.value = true;
    let docTypeQuery = ""
    if (selectedType.value !== 'all') {
      docTypeQuery = `&type_id=${selectedType.value}`
    }
    // const response = await axios.get(`http://127.0.0.1:8017/document/documents/${props.cat_id}?page=${page.value}${docTypeQuery}`);
    const response = await axios.get(`https://api.amjilt.com/document/document/documents/${props.cat_id}?page=${page.value}${docTypeQuery}`);
   if(response.data.data){
     documents.value = response.data.data;
     totalPage.value = response.data.last_page;
   }
    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = false;
  }

}

function deleteDoc(ID) {
  axios.delete("/document/delete/" + ID).then(() => {
    callDocuments();
  }).catch(() => {
    notification.error({
      message: 'Алдаа!',
      description: 'Устгах үед алдаа гарлаа.',
    });
  })
}

function saveNotificationSettings() {

}

onMounted(() => {
  callDocuments();
})
</script>

<style scoped>

</style>
