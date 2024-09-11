<template>
  <div class="bg-gray-100 dark:bg-slate-900 pb-16">
    <div class="container mx-auto px-4 pt-16  ">
      <div>
        <h1 class="text-4xl/tight font-medium mt-3 mb-4 align-center">{{$t("auth.select_your_role")}}</h1>
      </div>
      <div  v-if="lmsLoading" class="mx-auto align-center">
        <a-spin />
      </div>
      <div class="container" v-else>
        <div :class="`flex justify-center ${LMS_roles.length >= 1 && companies.length >= 1 ? 'grid md:grid-cols-2 gap-x-2' : 'grid gap-x-1'}  md:gap-x-6 `" >
          <h1 class="align-center py-3 text-2xl/tight font-medium mt-3 mb-4 align-center" v-if="LMS_roles.length >= 1">Amjilt LMS</h1>
          <h1 class="align-center py-3 text-2xl/tight font-medium mt-3 mb-4 align-center" v-if="companies.length >= 1">Amjilt ERP</h1>

          <ul v-if="LMS_roles.length >= 1"
              item-layout="horizontal"
              class="companies-list w-full grid md:grid-cols-2 gap-x-2 md:gap-x-6 "
              size="small"
          >
            <li v-for="com in LMS_roles" :key="com.index" @click="selectLMS(com)"
                class="flex flex-col items-center justify-center  px-3 py-2 cursor-pointer bg-white dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-gray-600 w-full rounded-2xl  h-48 mb-4">
              <div :class="`avatar  company-logo`">
                <img :src="com.org_logo" alt="avatar" >

              </div>
              <div class="company-name flex">
             <span class="flex-grow align-center">
               <b>{{ com.org_name }}</b> <br> {{com.role_name}}
             </span>
              </div>

            </li>

          </ul>

          <ul
            v-if="companies.length >= 1"
            item-layout="horizontal"
            class="companies-list w-full  grid md:grid-cols-2 gap-x-2 md:gap-x-6"
            size="small"
          >
            <li v-for="com in companies" :key="com.index" @click="selectCompany(com)"
                class="flex flex-col items-center justify-center  px-3 py-2 cursor-pointer bg-white dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-gray-600 w-full rounded-2xl  h-48 mb-4">
              <div :class="`avatar ${com.company_logo ? 'company-logo' : ''} `">
                <img :src="base_url+com.company_logo" alt="avatar" v-if="com.company_logo">
                <inline-svg src="/assets/icons/duotone/Home/Building.svg" v-else/>
              </div>
              <div class="company-name flex">
             <span class="flex-grow">
               {{ com.company_name }}
             </span>
              </div>

            </li>

          </ul>
        </div>
      </div>
    </div>
  </div>



</template>
<script>
import {COMPANIES, COMPANY} from '~/store/mutation-types-tatatonga'
import ls from '~/utils/Storage'
import {base_url} from '~/consts/const'

import {ACCESS_TOKEN} from "~/store/mutation-types";

export default {
  name: "companySwitch",
  data() {
    const token = ls.get(ACCESS_TOKEN);
    return {
      currentCompany: "2",
      LMS_roles:[],
      token,
      lmsLoading:true
    }
  },
  beforeCreate() {
    definePageMeta({
      layout: 'home',
    })
  },
  beforeMount() {
    if(this.$route.params.id){
      const index = this.companies.findIndex(c=>c.id === this.$route.params.id);
      if(index >= 0){
        this.selectCompany(this.companies[index]);
      } else {
        this.$router.replace("/select-role")
      }
    } else {
      this.$router.replace("/select-role")
    }
  },
  computed: {
    companies() {
      const companies =  ls.get(COMPANIES)
      return companies ? companies : []
    },
    company() {
      return ls.get(COMPANY)
    },
    base_url() {
      return base_url;
    },
    logo() {

    }
  },
  methods: {
    selectLMS(com) {
      window.location.replace(com.default_url);
    },
    selectCompany(company) {
      ls.set(COMPANY, company);
      this.$router.replace('/erp');
    },
    createCompany() {
      this.$router.push("/company/create")
    },
    getLMS(){
      this.lmsLoading = true;
      fetch('https://lms.amjilt.com/api/general/user-permissions', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer '+this.token
        }
      }).then(response => {

        return response.json();
      })
        .then(data => {
          if (Array.isArray(data)) {
            this.LMS_roles = data;

            if(this.LMS_roles.length === 1 && this.companies.length === 0){
              this.selectLMS(this.LMS_roles[0]);
            }else if(this.LMS_roles.length === 0 && this.companies.length === 1){
              this.selectCompany(this.companies[0]);
            } else {
              this.lmsLoading = false
            }


          } else {
            if(this.LMS_roles.length === 1 && this.companies.length === 0){
              this.selectLMS(this.LMS_roles[0]);
            } else if(this.LMS_roles.length === 0 && this.companies.length === 1){
              this.selectCompany(this.companies[0]);
            } else {
              this.lmsLoading = false
            }
          }




        })
        .catch(error => {
          if(this.LMS_roles.length === 0 && this.companies.length === 1){
            this.selectCompany(this.companies[0]);
          } else {
            this.lmsLoading = false
          }

        });
    }
  },
  mounted() {
    this.getLMS();
  }
}
</script>
<style scoped>

</style>
