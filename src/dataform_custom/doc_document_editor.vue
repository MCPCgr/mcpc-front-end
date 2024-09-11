<template>
  <div>
    <div class="mx-auto mt-12 align-center" v-if="!model.form[model.component]">
      <div class="flex items-center justify-center">
        <img src="/assets/dms/icons/document.svg" class="h-14  mx-2" alt="Document Icon"/>
        <span>Түр хүлээнэ үү...</span>
      </div>
    </div>
    <div v-if="model.form[model.component]">

      <Editor
        v-if="iCanEdit"
        :docData="model.form[model.component]"
        :document-name="model.form['contract_title']"
        @change="editorChanged"
        @rename="rename"/>

      <Print
        v-if="iReadOnly"
        :docData="model.form[model.component]"
        :document-name="model.form['contract_title']"
        :current-step="currentStep"
      />


      <End
        v-if="currentStep && currentStep.attrs.subject.object_type === 'END'"
        :docData="model.form[model.component]"
        :document-name="model.form['contract_title']"
        :id="model.form['id']"
        :date="model.form['end_date']"
        :name="model.form['contract_title']"
        :description="model.form['contract_title']"
        :vote_additional_comments="null"
        :current-step="currentStep"
      />
    </div>

  </div>
</template>
<script setup>
import {ref, onMounted, defineProps, computed, watch} from 'vue';
import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
let user = ls.get(USER_INFO);
const currentStep = ref(null);
import Editor from "~/modules/document/Editor.vue";
import Print from "~/modules/document/Print.vue";
import End from "~/modules/document/End.vue";
import {Flow} from "~/modules/workflow/flow/flow";

import {userInfo} from "~/store/useSiteSettings";

const props = defineProps({
  model: Object,
  label: String,
  meta: Object,
  do_render: Boolean,
  editMode: Boolean,
  is_show: Boolean,
  relation_data: Function,
  showInformationModal: Boolean,
  url: String,
  setSchemaByModel: Function,
  getSchemaByModel: Function,
  isBuilder: Boolean
});

function editorChanged(data) {
  props.model.form[props.model.component] = data;
}

const workflowCategoryID = computed(() => {
  return props.model.form["workflow_category_id"]
});
const workflowID = computed(() => {
  return props.model.form["workflow_id"]
});
const workflow_data = computed(() => {
  return props.model.form["workflow_data"]
});


async function initStatus() {
  console.log("init");




  if (workflow_data.value !== null && workflow_data.value !== "" && workflow_data.value !== undefined) {
    const flow = new Flow(JSON.parse(workflow_data.value));
    if (flow.withVote) {
      // props.setSchemaByModel('VOTE_ADDITIONAL_COMMENTS', 'hidden', false)
    }

    if (!props.editMode || props.model.form['status_id'] === null || props.model.form['status_id'] === undefined) {

      if (flow.starts.length >= 1) {

        const steps = flow.getNextSteps(flow.starts[0]);

        const startStep = flow.starts[0];


        if (steps && steps.length >= 1) {


          currentStep.value = startStep;
        }
      }
    } else {

      currentStep.value = flow.getCellById(props.model.form['status_id']);


    }

  }
}

const iCanEdit = computed(() => {

  if(currentStep.value){
    if (currentStep.value.attrs.subject.object_type !== 'END' && currentStep.value.attrs.subject.object_type !== 'VOTE' && !currentStep.value.attrs.subject.is_read_only) {

      if (props.model.form['emp_id'] === userInfo.value.emp_id) {
        if (currentStep.value.attrs.subject.object_type === 'START' || currentStep.value.attrs.subject.object_type === 'RE_CREATE') {
          return true
        } else {
          if(currentStep.value.attrs.subject){
            if(currentStep.value.attrs.subject.emp_id === userInfo.value.emp_id){
              return true
            }
          }
          return false
        }
      } else {
        return true
      }

    } else {
      if (currentStep.value.attrs.subject.object_type === 'VOTE') {
        const index = props.model.form['process_voting_people'].findIndex(p => p.emp_id === userInfo.value.emp_id);

        if (index >= 0) {
          return true
        } else {
          return false
        }

      } else {
        if (currentStep.value.attrs.subject.subject_type === 'CREATOR') {
          if (props.model.form['emp_id'] === userInfo.value.emp_id) {
            return true;
          } else {
            return false
          }
        } else {
          if (currentStep.value.attrs.subject.emp_id === userInfo.value.emp_id) {
            return true
          } else {
            return false
          }
        }
        return false
      }

    }
  }


});
const iReadOnly = computed(() => {


  if(currentStep.value){
    if((currentStep.value.attrs.subject.object_type !== 'END' && currentStep.value.attrs.subject.is_read_only) || currentStep.value.attrs.subject.object_type === 'VOTE') {

      return true

    } else {
      if(props.model.form['emp_id'] === user.emp_id && currentStep.value.attrs.subject.object_type !== 'END'){
        if(currentStep.value.attrs.subject.object_type !== 'START' && currentStep.value.attrs.subject.object_type !== 'RE_CREATE'){
          if(currentStep.value.attrs.subject){
            if(currentStep.value.attrs.subject.emp_id === userInfo.value.emp_id){
              return false
            }
          }

          return true
        } else {
          return false
        }
      } else {
        return false
      }

    }
  }


});

onMounted(()=>{
  initStatus();
})
watch(workflow_data, () => {
  initStatus();
});

</script>


<style scoped>

</style>
