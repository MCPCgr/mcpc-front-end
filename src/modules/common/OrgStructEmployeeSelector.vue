<template>
  <div :class="isHorizontal ? `flex justify-between w-full` : ''">

    <div :class="!isHorizontal ? `mb-2 mr-2 w-full` : 'mb-2 mr-2'">
      <label>
        Байгууллага<br>
        <a-select
          v-model:value="company_id_v"
          show-search
          style="width: 100%"
          placeholder="Байгууллага"
          optionFilterProp="searchValue"
          optionLabelProp="label"
          :options="orgs"
          :show-search="true"
          @change="selectOrg"
          allow-clear
          :disabled="disabled"
        >



        </a-select>
      </label>
    </div>

    <div :class="!isHorizontal ? `mb-2 mr-2 w-full` : 'mb-2 mr-2'">
      <label>
        Алба хэлтэс <br>
        <a-tree-select
          v-model:value="struct_id_v"
          placeholder="Алба хэлтэс сонгох"
          style="width: 100%"
          :tree-data="structs"
          @change="selectStruct"
          tree-node-filter-prop="label"
          :dropdownMatchSelectWidth="false"
          tree-line
          tree-default-expand-all
          allow-clear
          show-search
          :disabled="disabled"
        ></a-tree-select>
      </label>
    </div>
    <div :class="!isHorizontal ? `mb-2 mr-2 w-full` : 'mb-2 mr-2'" v-if="mode === 'TO_ORG_JOB' || mode === 'TO_ORG_EMPLOYEE'">
      <label>
        Албан тушаал<br>
        <a-select
          v-model:value="job_id_v"
          show-search
          style="width: 100%"
          placeholder="Байгууллага"
          optionFilterProp="searchValue"
          optionLabelProp="label"
          :options="jobs"
          :show-search="true"
          @change="selectJob"
          allow-clear
          :disabled="disabled"
        >
        </a-select>
      </label>
    </div>
    <div :class="!isHorizontal ? `mb-2  w-full` : 'mb-2 mr-2'" v-if="mode === 'TO_ORG_EMPLOYEE'">
      <label>
        Ажилтан <br>
        <a-select
          v-model:value="emp_id_v"
          show-search
          style="width: 100%"
          placeholder="Ажилтан сонгох"
          optionFilterProp="searchValue"
          optionLabelProp="label"
          :options="filteredEmployees"
          :show-search="true"
          allow-clear
          :disabled="disabled"
        >
          <template #option="{ value: val, label, avatar}">
            <div class="flex items-center space-x-3 font-semibold">
              <a-avatar style="width: 32px; height: 32px; flex: none;">
                <template #icon>
                  <div class="flex items-center justify-center h-full w-full">
                    <img alt="avatar" class="h-full w-full object-cover bg-no-repeat bg-center"
                         :src="avatar !== null && avatar !== '' ? 'https://erp.mcpc.mn'+avatar : '/amjilt-erp/images/defaultAvatar.svg'">
                  </div>
                </template>
              </a-avatar>
              <span>{{ label }}</span>
            </div>
          </template>


        </a-select>
      </label>
    </div>
  </div>
</template>
<script setup>

import {ref, onMounted, defineEmits, defineProps} from 'vue';
const emit = defineEmits(['update:struct_id', 'update:emp_id', 'change']);



const props = defineProps({

  company_id: Number,
  struct_id: String,
  job_id: String,
  emp_id: String,
  mode: String,
  isHorizontal: Boolean,
  disabled: Boolean,
});

import {getStructs, getStructJobs, getJobEmployees} from "~/graphql/fetch.js"


const company_id_v = ref(null);
const struct_id_v = ref(null);
const job_id_v = ref(null);
const emp_id_v = ref(null);
const orgs = ref([]);
const structs = ref([]);
const jobs = ref([]);
const employees = ref([]);

import {  company,  } from '~/store/useSiteSettings';

function getOrgs(){
  orgs.value =[{
    value:company.value.company_id,
    label:company.value.company_name,
  }];

  company_id_v.value = company.value.company_id

  if(company_id_v.value){
    getOrgStructs(company_id_v.value)
  }
}
function getOrgStructs(companyID){
  const name = '';
  getStructs(companyID).then(({view_struct}) => {


    if (props.struct_id) {
      struct_id_v.value = props.struct_id;
      selectStruct();
    }
    if (props.emp_id) {
      emp_id_v.value = props.emp_id;
    }
    processStructData(view_struct);
  });
}
function selectOrg(){
  struct_id_v.value = null;
  job_id_v.value = null;
  emp_id_v.value = null;

  getOrgStructs(company_id_v.value)
}
function processStructData(structureData) {
  let map = {}, node, roots = [];
  const treeData = structureData.map(struct => ({
    key: struct.id,
    value: struct.id,
    label: struct.struct_name,
    parent1: struct.parent_id,
    children: [],
  }));
  treeData.forEach((item, i) => (map[item.key] = i));
  treeData.forEach(item => {
    node = item;
    if (node.parent1 !== 0 && map[node.parent1] !== undefined) {
      treeData[map[node.parent1]].children.push(node);
    } else {
      roots.push(node);
    }
  });
  structs.value = roots;
}

function uniqueByEmpId(arr) {
  const unique = arr.reduce((acc, current) => {
    const x = acc.find(item => item.emp_id === current.emp_id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  return unique;
}

async function selectStruct() {


  if (struct_id_v.value) {
    getStructJobs(struct_id_v.value.toString()).then(({view_job}) => {
      jobs.value = view_job.map(j => ({
        value: j.id,
        label: j.a_tushaal_ner,
        searchValue: j.a_tushaal_ner,

      }));

      if (job_id_v.value) {
        selectJob()
      }
    })


  } else {
    jobs.value = [];
  }

}
async function selectJob() {

  if (job_id_v.value) {
    getJobEmployees(job_id_v.value.toString()).then(({view_emp}) => {
      employees.value = view_emp.map(emp => ({
        id: emp.id,
        emp_id: emp.id,
        lastname: emp.lastname,
        firstname: emp.firstname,
        avatar: emp.avatar,
        ...emp
      }));


    })
  } else {
    employees.value = [];
  }

}

const filteredEmployees = computed(() => {
  return uniqueByEmpId(employees.value).map(emp => ({
    value: emp.id,
    emp_id: emp.id,
    avatar: emp.avatar,
    label: emp.firstname,
    searchValue: `${emp.firstname} ${emp.lastname}`,
    firstname: emp.firstname,
    lastname: emp.lastname,
  }));
});


watch(() => props.company_id, (newVal) => {
  company_id_v.value = newVal;

  if (newVal) {
    selectStruct();
  }
});
watch(() => props.struct_id, (newVal) => {
  struct_id_v.value = newVal;
// console.log(newVal)
  if (newVal) {
    selectJob();
  }
});

watch(() => props.job_id, (newVal) => {
  job_id_v.value = newVal;


});

watch(() => props.emp_id, (newVal) => {
  emp_id_v.value = newVal;
});


watch(company_id_v, (newValue, oldValue) => {
  emit('update:company_id', newValue);
  emit('change', {company_id:newValue, struct_id: struct_id_v.value, job_id:job_id_v.value, emp_id: emp_id_v.value});
});
watch(struct_id_v, (newValue, oldValue) => {
  emit('update:struct_id', newValue);
  emit('change', {company_id: company_id_v.value, struct_id: newValue, job_id:job_id_v.value, emp_id: emp_id_v.value});
});
watch(job_id_v, (newValue, oldValue) => {
  emit('update:job_id', newValue);
  emit('change', {company_id: company_id_v.value,  struct_id: struct_id_v.value, job_id: newValue, emp_id: emp_id_v.value});
});

watch(emp_id_v, (newValue, oldValue) => {
  emit('update:emp_id', newValue);
  emit('change', {company_id: company_id_v.value, struct_id: struct_id_v.value,  job_id:job_id_v.value, emp_id: newValue});
});


onMounted(()=>{
  getOrgs();
  if (props.company_id) {
    company_id_v.value = props.company_id;
  }
  if (props.struct_id) {
    struct_id_v.value = props.struct_id;
  }
  if (props.job_id) {
    job_id_v.value = props.job_id;
  }
  if (props.emp_id) {
    emp_id_v.value = props.emp_id;
  }
})
</script>

