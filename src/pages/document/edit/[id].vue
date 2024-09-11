<template>
  <div>
    <Head>
      <Title>Албан бичиг</Title>
    </Head>

    <portal to="header-left">
      <div class="page-title float-left">
        <div class="float-left pt-3">
          <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 "></h1>
          <h2 class="text-gray-400 text-xs m-0"><span>Албан бичиг, Гэрээ</span></h2>
        </div>
      </div>
    </portal>

<!--    <div class="mx-auto mt-12 align-center" v-if="loading">-->
<!--      <div class="flex items-center justify-center">-->
<!--        <img src="/assets/dms/icons/document.svg" class="h-14  mx-2" alt="Document Icon"/>-->
<!--        <span>Түр хүлээнэ үү...</span>-->
<!--      </div>-->
<!--    </div>-->
    <div >

      <dataform
        ref="documentForm"
        :url="`https://api.amjilt.com/document`"
        :hideTitle="true"
        schemaID="1218"
        :editMode="true"
        :do_render="true"
        :onReady="onReady"
        :onSuccess="onSuccess"
        :hide-footer="true"
        :hideSuccessDialog="true"
      >
      </dataform>

      <div class="w-full p-10">
        <h1 class="text-2xl">Албан бичгийн түүх </h1>
        <br>
        <StatusHistory :id="route.params.id" />
      </div>
    </div>
  </div>
</template>
<script setup>

import {onMounted, ref} from "vue";

import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
let user = ls.get(USER_INFO);
import {notification} from "ant-design-vue";
import StatusHistory from "~/modules/process/StatusHistory.vue";
const documentForm = ref(null);


const route = useRoute();
const router = useRouter();

const loading = ref(true);

function onReady() {

  if(documentForm.value){
    documentForm.value.editModel(route.params.id);

    documentForm.value.setSchemaByModel('discription', 'disabled', true)
    documentForm.value.setSchemaByModel('attachments', 'disabled', true)
  }

}

function onSuccess(data) {
  notification.success({
    message: 'Амжилттай!',
    description: 'Албан бичиг амжилттай хадгаллаа.',
  });
  router.push(`/document/document/${data.document_type_category_id}`);

}

onMounted(() => {

});
</script>
<style scoped>

</style>
