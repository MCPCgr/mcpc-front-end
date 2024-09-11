<template>
  <div class="container">
    <div class="flex">
      <div>
        <h1 class="align-center py-3">Amjilt LMS</h1>
        <ul
          item-layout="horizontal"
          class="companies-list w-full grid md:grid-cols-2 gap-2"

          size="small"
        >
          <li v-for="com in companies" :key="com.index" @click="selectCompany(com)"
              class="flex flex-col items-center justify-center  px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 w-full rounded-2xl shadow-lg h-48 mb-4">
            <div :class="`avatar ${com.company_logo ? 'company-logo' : ''} `">
              <img :src="base_url+com.company_logo" alt="avatar" v-if="com.company_logo">
              <inline-svg src="/assets/icons/duotone/Home/Building.svg" v-else/>
            </div>
            <div class="company-name  pl-4 flex">
             <span class="flex-grow">
               {{ com.company_name }}
             </span>
            </div>

          </li>
          <li @click="createCompany"
              class="flex items-center w-full px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 border-t">
            <div class="avatar svg-icon">
              <inline-svg src="/assets/icons/duotone/Navigation/Plus.svg"/>
            </div>
            <div class="add-company-txt flex-grow pl-4">Шинэ компани үүсгэх</div>
          </li>
        </ul>
      </div>
      <div>
        <h1 class="align-center py-3">Amjilt ERP</h1>
        <ul
          item-layout="horizontal"
          class="companies-list w-full grid md:grid-cols-2 gap-2"

          size="small"
        >
          <li v-for="com in companies" :key="com.index" @click="selectCompany(com)"
              class="flex flex-col items-center justify-center  px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 w-full rounded-2xl shadow-lg h-48 mb-4">
            <div :class="`avatar ${com.company_logo ? 'company-logo' : ''} `">
              <img :src="base_url+com.company_logo" alt="avatar" v-if="com.company_logo">
              <inline-svg src="/assets/icons/duotone/Home/Building.svg" v-else/>
            </div>
            <div class="company-name  pl-4 flex">
             <span class="flex-grow">
               {{ com.company_name }}
             </span>
            </div>

          </li>
          <li @click="createCompany"
              class="flex items-center w-full px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 border-t">
            <div class="avatar svg-icon">
              <inline-svg src="/assets/icons/duotone/Navigation/Plus.svg"/>
            </div>
            <div class="add-company-txt flex-grow pl-4">Шинэ компани үүсгэх</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {COMPANIES, COMPANY} from '~/store/mutation-types-tatatonga'
import ls from '~/utils/Storage'
import {base_url} from '~/consts/const'

export default {
  name: "companySwitch",
  data() {
    return {
      currentCompany: "2"
    }
  },
  computed: {
    companies() {
      return ls.get(COMPANIES)
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
    selectCompany(company) {
      ls.set(COMPANY, company);
      localStorage.setItem('default_url', company.default_url)
      if (this.$route.path.startsWith("/plan/")) {
        window.location.replace('/plan');
      } else {
        window.location.reload();
      }
    },
    createCompany() {
      this.$router.push("/company/create")
    }
  }
}
</script>
<style scoped>

</style>
