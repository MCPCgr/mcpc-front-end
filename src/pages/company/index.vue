<template>
  <Head>
    <Title>{{ company.company_name}}</Title>
  </Head>
  <portal to="header-left">
    <div class="page-title ">
      <div class="float-left pt-3">
        <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">{{ company.company_name }}</h1>
        <h2 class="text-gray-400 text-xs m-0"><span>Байгууллага</span></h2>
      </div>
    </div>
  </portal>
  <div class="space-y-5 profile-page">
    <Cover  :company="company" v-if="company.id" :user-company="userCompany" @edit="edit"></Cover>
    <About v-if="!showEditForm" :company="company"/>
    <EditForm v-if="showEditForm" @onSuccess="onSuccess" :company="company" />
  </div>


</template>

<script>

import CompanyMixin from "~/components/Company/companyMixin";
import About from "~/components/Company/About.vue";
import EditForm from "~/components/Company/EditForm.vue";
import Cover from "~/components/Company/Cover.vue";
export default {
  name: 'profile',
  mixins: [CompanyMixin],
  components:{
    About,
    EditForm,
    Cover
  },
  data() {

  },
  methods: {}
}
</script>
<style lang="scss">
</style>
