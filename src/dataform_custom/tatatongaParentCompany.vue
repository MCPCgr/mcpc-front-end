<template>
  <lambda-form-item :label=label :name="model.component" :meta="meta">
    <a-select v-model:value="model.form[model.component]"
              show-search
              :disabled="disabled"
              allow-clear
    >
      <a-select-option :value="com.id" v-for="com in companies" :key="com.index">{{
          com.company_name
        }}
      </a-select-option>
    </a-select>
  </lambda-form-item>
</template>

<script>
import mixin from '@lambda-platform/lambda-vue/src/modules/dataform/elements/_mixin';
import {COMPANIES, COMPANY} from '~/store/mutation-types-tatatonga';
import ls from "~/utils/Storage";
export default {
  mixins: [mixin],
  data() {
    const company = ls.get(COMPANY);
    return {
      company,
      structs: []
    }
  },
  computed: {
    companies() {
      return ls.get(COMPANIES)
    },
  },
  mounted() {

  },

}
</script>

<style scoped>

</style>
