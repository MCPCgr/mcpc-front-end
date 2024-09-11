<template>
  <div>
    <Head>
      <Title>Албан бичиг</Title>
    </Head>

    <portal to="header-left">
      <div class="page-title float-left">
        <div class="float-left pt-3">
          <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">{{ docType.document_name }}</h1>
          <h2 class="text-gray-400 text-xs m-0"><span>Албан бичиг, Гэрээ</span></h2>
        </div>
      </div>
    </portal>

    <div class="mx-auto mt-12 align-center" v-if="loading">
      <div class="flex items-center justify-center">
        <img src="/assets/dms/icons/document.svg" class="h-14  mx-2" alt="Document Icon"/>
        <span>Түр хүлээнэ үү...</span>
      </div>
    </div>
    <div v-else class="">

      <dataform
        ref="documentForm"
        :url="`https://api.amjilt.com/document`"
        :hideTitle="true"
        schemaID="1218"
        :editMode="false"
        :do_render="true"
        :onReady="onReady"
        :onSuccess="onSuccess"
        :hide-footer="true"
        :hideSuccessDialog="true"
      >
      </dataform>
    </div>
  </div>
</template>
<script setup>
import {base_url} from '~/consts/const'
import {onMounted, ref} from "vue";
import {getTypeWithFlow} from "~/modules/document/graphql/fetch";
import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
import {  company,  } from '~/store/useSiteSettings';
import {notification} from "ant-design-vue";
const documentForm = ref(null);
const docType = ref({
  id:null,
  document_name:null,
  workflow_id:null,
  document_template:null,
  document_type_category_id:null,
  is_contract:false,
});

const route = useRoute();
const router = useRouter();
let user = ls.get(USER_INFO);

const document = ref({
  id: null,
  company_id: null,
  document_type_id: null,
  document_type_category_id: null,
  workflow_id: null,
  struct_id: user.struct_id ? user.struct_id : null,
  emp_id: user.emp_id,
  start_date: new Date(), // handle date input appropriately
  document_title: "",
  document_number: null,
  description: null,
  attachments: null,
  doc_data: null,
  document_data: null,
  status: "",
  status_type: "START",
  status_id: null,
  status_history: []
});

const loading = ref(true);

function onReady(data) {

  if(documentForm.value){


    documentForm.value.setModel("workflow_id", route.params.workflow_id, "Text");


    documentForm.value.setModel("document_data", docType.value.document_template, "Text");
    documentForm.value.setModel("document_title", docType.value.document_name, "Text");

    documentForm.value.setModel("document_type_id", docType.value.id, "Text");
    documentForm.value.setModel("document_type_category_id", docType.value.document_type_category_id, "Text");

    documentForm.value.setModel("is_contract", docType.value.is_contract, "Text");
    if(docType.value.is_contract){
      documentForm.value.setSchemaByModel("start_date", "hidden", false);
      documentForm.value.setSchemaByModel("end_date", "hidden", false);
    } else {
      documentForm.value.setSchemaByModel("start_date", "hidden", true);
      documentForm.value.setSchemaByModel("end_date", "hidden", true);
    }


    documentForm.value.setModel("company_id", user.company_id, "Text");
    documentForm.value.setModel("struct_id", user.struct_id, "Number");

    documentForm.value.setModel("emp_id", user.emp_id, "Text");



  }

}

function onSuccess() {
  notification.success({
    message: 'Амжилттай!',
    description: 'Албан бичиг амжилттай үүсгэгдлээ.', // "Document successfully created" in Mongolian
  });
  router.push(`/document/document/${docType.value.document_type_category_id}`);
}
// function setDocumentData(flow_data){
//   document.value.document_title = `${docType.value.document_name} төсөл`;
//   document.value.workflow_category_id = docType.value.document_type_category_id
//   document.value.doc_flow_id = docType.value.DOC_FLOW_ID
//   document.value.doc_type_id = route.params.type_id
//   document.value.flow_data = flow_data
// }


onMounted(() => {
  getTypeWithFlow(route.params.type_id).then(async ({view_document_type}) => {
    if (view_document_type && view_document_type.length === 1) {



      docType.value = view_document_type[0];



      loading.value = false;

    } else {
      router.push(`/document/document`);
    }
  }).finally(() => {

  });
});
</script>
<style scoped>

</style>
