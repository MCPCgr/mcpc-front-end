<template>

  <div>
    <lambda-form-item :label=label :name="model.component" :meta="meta">
      <a-input v-model:value="model.form[model.component]"

               @change="fetchData"
      >
        <template #suffix>
          <a-tooltip title="И-Баримт. ААН-н ТТД">
            <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
          </a-tooltip>
        </template>
      </a-input>

      <a-alert :message="orgName" v-if="orgName" type="success" />

      <a-alert message="Олдсонгүй" v-if="orgNotFound" type="error" />
    </lambda-form-item>
    <lambda-form-item label="Хаяръя татварын алба" name="district_id" :meta="meta">

    <a-select
      v-model:value="model.form['district_id']"
      placeholder="Хаяръя татварын алба"
      style="width: 100%"
      :options="branches"
      optionFilterProp="label"
      optionLabelProp="label"
      showSearch
    >

    </a-select>
    </lambda-form-item>
  </div>

</template>

<script setup>
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';

import {defineProps, ref, computed, onMounted, watch} from "vue";
import axios from "~/plugins/core/axios";

const TIN = computed(() => {
  return props.model.form["ebarimt_merchant_tin"];
});

const branches = ref([]);
const orgNotFound = ref(false);
const orgName = ref(null);
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
  validateDataForm: Function,
  validateWithSubForm: Function,
  isBuilder: Boolean,
});

function isValidTIN(tin) {
  const tinPattern = /^\d{11}$/;
  return tinPattern.test(tin);
}
const fetchData = async () => {

  if(isValidTIN(props.model.form[props.model.component])){
    try {
      const response = await axios.get('https://pos.amjilt.com/api/ebarimt/customer-by-tin/'+props.model.form[props.model.component], {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.data.status === 200) {
       if(response.data.data && response.data.data.found) {
         orgNotFound.value = false;
         orgName.value = response.data.data.name;
         props.model.form["vat_payer"] = response.data.data.vatPayer;
         props.model.form["city_payer"] = response.data.data.cityPayer;
       } else {
         orgNotFound.value = true;
         orgName.value = null;
       }
      } else {
        console.error('API error:', response.data.msg);
        orgNotFound.value = true;
        orgName.value = null;
      }
    } catch (error) {
      console.error('Network error:', error);
      orgNotFound.value = true;
      orgName.value = null;
    }
  } else {
    orgNotFound.value = true;
    orgName.value = null;
  }

};

async function getBranchInfo() {

    try {
      const response = await axios.get('https://pos.amjilt.com/api/ebarimt/get-branch-info', {
        headers: {
          'Accept': 'application/javascript, application/xml, application/json'
        }
      });
      if (response.data.status === 200) {


        const sortedBranches = response.data.data.sort((a, b) => {
          if (a.branchCode < b.branchCode) return -1;
          if (a.branchCode > b.branchCode) return 1;
          if (a.subBranchCode < b.subBranchCode) return -1;
          if (a.subBranchCode > b.subBranchCode) return 1;
          return 0;
        });

        branches.value = sortedBranches.map(r=>{
          return {value:`${r.branchCode}${r.subBranchCode}`, label:`${r.branchName}, ${r.subBranchName}`}
        });
      } else {
        message.error('Failed to fetch branches');

      }
    } catch (error) {
      console.log(error)

    }
}

watch(
  () => props.do_render,
  () => {
    if (props.do_render) {
      if (!props.editMode) {
       // getBranchInfo();
      }
    }
  }
);
watch(TIN, () => {
  if (props.editMode && TIN !== null) {
    fetchData();
  }
});

onMounted(() => {
  getBranchInfo();
});
</script>
