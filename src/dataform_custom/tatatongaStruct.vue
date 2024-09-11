<template>
  <lambda-form-item :label=label :name="model.component" :meta="meta">
    <a-tree-select v-model:value="model.form[model.component]"
                   show-search

                   :disabled="disabled"

                   allow-clear
                   tree-default-expand-all
                   :tree-data="structs"
    >
    </a-tree-select>
  </lambda-form-item>
</template>

<script>
import mixin from '@lambda-platform/lambda-vue/src/modules/dataform/elements/_mixin';
import {COMPANY} from '~/store/mutation-types-tatatonga';
import {GET_STRUCTS_NOT_CHILD_COMPANY} from "~/graphql/queries"
import ls from "~/utils/Storage";
import {structCreator} from "~/utils/struct";

export default {
  mixins: [mixin],
  data() {
    const company = ls.get(COMPANY);
    return {
      company,
      structs: []
    }
  },
  mounted() {
    if(this.do_render){
      this.getStructData();
    }
  },
  methods: {
    getStructData() {
      this.$apollo
        .query({
          query: GET_STRUCTS_NOT_CHILD_COMPANY,
          fetchPolicy: "no-cache",
          variables: {company_id: this.company.company_id},
        })
        .then((res) => {

          this.structs = structCreator((res.data["view_struct"]))
        });
    },

  },
  watch: {
    do_render(value) {
      if (value) {
        this.getStructData()
      }
    }
  }
}
</script>

<style scoped>

</style>
