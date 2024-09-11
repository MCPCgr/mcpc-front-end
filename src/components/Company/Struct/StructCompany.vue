<template>
  <div>
    <div :class="`avatar struct-logo ${company.company_logo ? 'company-logo' : ''}`" >
      <img :src="$base_url+company.company_logo" alt="avatar" v-if="company.company_logo">
      <inline-svg v-else src="/assets/icons/duotone/Home/Building.svg"/>
    </div>
    <h2 class="text-center">{{company.company_name}}</h2>
  </div>
</template>

<script>
import ls from "~/utils/Storage";
import {COMPANIES} from "~/store/mutation-types-tatatonga";

export default {
  name: "StructCompany",
  props:["struct"],
  computed: {
    companies() {
      return ls.get(COMPANIES)
    },
    company(){
      let company_id = this.struct.id;
      if(this.struct.child_company_id){
        company_id = this.struct.child_company_id;
      }

      let index = this.companies.findIndex(com=>com.id === company_id);

      if(index >= 0){
        return this.companies[index];
      }
      return this.struct
    }
  },
}
</script>

<style scoped>

</style>
