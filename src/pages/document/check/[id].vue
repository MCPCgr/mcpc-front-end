<template>
  <div class="bg-slate-50 p-10">
    <div class="dms-check ">

      <div v-if="!loading">
        <End
          v-if="currentStep.attrs.subject.object_type === 'END' && !loading"
          :docData="document.document_data"
          :hideTitle="true"
          :id="route.params.id"
          :document-name="document.doc_name"
          :status_history="document.status_history"
          :current-step="currentStep"
        />
      </div>
      <div class="space-y-6" v-if="!loading">

        <div class="page ">
          <StatusHistory :id="route.params.id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import "~/modules/document/styles/dms-check.scss"

const loading = ref(true);

const statusHistory = ref([]);
const currentStep = ref({});
const docType = ref({});
const document = ref({
  id: null,
  doc_cate_id: null,
  doc_type_id: null,
  doc_flow_id: null,
  struct_id: null,
  emp_id:null,
  doc_date: new Date(), // handle date input appropriately
  doc_name: "",
  doc_number: null,
  description: null,
  attachments: null,
  document_data: null,
  status: "",
  status_type: "START",
  status_id: null,
  status_history: []
});
import StatusHistory from "~/modules/process/StatusHistory.vue";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import End from "~/modules/document/End.vue";
import axios from "~/plugins/core/axios";
import {Flow} from "~/modules/workflow/flow/flow";
import {createStatusHistory} from "~/modules/workflow/flow/status";
const route = useRoute();
definePageMeta({
  layout: 'dms_check',
})

function editDocument(id) {
  axios.get("https://document.mcpc.mn/document/doc-edit/" + id).then(async ({data}) => {
    if (data && data.flow && data.document) {


      document.value = {...data.document}

      let flow = new Flow(JSON.parse(data.flow.flow_data));

      if(data.document.flow_data){
        flow = new Flow(JSON.parse(data.document.flow_data));
      }

      currentStep.value = flow.getCellById(document.value.status_id);


      if (currentStep.value) {
        const steps = flow.getNextSteps(currentStep.value);


        if (steps && steps.length >= 1) {
          for (const step of steps) {
            const index = document.value.status_history.findIndex(h=>h.status_id === step.id);
            const stepStatusHistory = await createStatusHistory(step, undefined, document.value.status_history);

            if(index >= 0){
              document.value.status_history[index].step_data = stepStatusHistory.step_data;
            } else {

              document.value.status_history.push({
                ...stepStatusHistory,
                signature:null,
                open:false
              })
            }



          }


        }
      }
      loading.value = false;

    } else {
      router.push(`/dms/document`);
    }
  })

}

onMounted(() => {
  editDocument(route.params.id)
});
</script>

