<template>
  <div class="bg-gray-100 dark:bg-slate-900 pb-16">
    <div class="container mx-auto px-4 pt-16  ">
      <div>
        <h1 class="text-4xl/tight font-medium mt-3 mb-4 align-center">{{ $t("auth.select_your_role") }}</h1>
      </div>
      <div v-if="lmsLoading" class="mx-auto align-center">
        <a-spin/>
      </div>
      <div class="container" v-else>
        <div :class="`flex justify-center ${LMS_roles.length >= 1 && companies.length >= 1 ? 'grid sm:grid-cols-2 gap-x-2' : 'grid gap-x-1'}  md:gap-x-6 `">
          <h1 class="align-center py-3 text-2xl/tight font-medium mt-3 mb-4 align-center" v-if="LMS_roles.length >= 1">
            Amjilt Learn
          </h1>
          <h1 class="align-center py-3 text-2xl/tight font-medium mt-3 mb-4 align-center" v-if="companies.length >= 1">
            Amjilt WORk, Booking, POS
          </h1>

          <ul v-if="LMS_roles.length >= 1"
              item-layout="horizontal"
              class="companies-list w-full grid md:grid-cols-2 gap-x-2 md:gap-x-6 "
              size="small"
          >
            <li v-for="com in LMS_roles" :key="com.index" @click="selectLMS(com)"
                class="flex flex-col items-center justify-center px-6 py-2 cursor-pointer bg-white hover:bg-gray-100 dark:hover:bg-gray-600 w-full rounded-2xl h-40 mb-4
                dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group p-5 transition-all duration-500 transform">
              <div :class="`avatar  company-logo`">
                <img :src="com.org_logo" alt="avatar">
              </div>
              <div class="company-name flex">
              <span class="flex-grow align-center py-2">
                <b>{{ com.org_name }}</b> <br> {{ com.role_name }}
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
                class="flex flex-col items-center justify-center px-6 py-2 cursor-pointer bg-white hover:bg-gray-100 dark:hover:bg-gray-600 w-full rounded-2xl h-40 mb-4
                dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group p-5 transition-all duration-500 transform">
              <div :class="`avatar ${com.company_logo ? 'company-logo' : ''} `">
                <img :src="base_url+com.company_logo" alt="avatar" v-if="com.company_logo">
                <inline-svg src="/assets/icons/duotone/Home/Building.svg" v-else/>
              </div>
              <div class="company-name flex">
              <span class="flex-grow py-2">
                {{ com.company_name }}
              </span>
              </div>
            </li>
            <li v-for="extraRole in userExtraRoles" :key="extraRole.index" @click="selectExtraRole(extraRole)"
                class="flex flex-col items-center justify-center px-6 py-2 cursor-pointer bg-white hover:bg-gray-100 dark:hover:bg-gray-600 w-full rounded-2xl h-40 mb-4
                dark:bg-gray-700 relative shadow-xl overflow-hidden hover:shadow-2xl group p-5 transition-all duration-500 transform">
              <div :class="`avatar`">

                <inline-svg src="/amjilthome/logos/amjilt-s.svg"/>
              </div>
              <div class="company-name flex">
              <span class="flex-grow py-2 uppercase">
                {{ extraRole.name }}
              </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useRouter} from 'vue-router';
import store from '~/store/index'

const router = useRouter();
import {ref, onBeforeMount, onMounted} from 'vue';
import {LMS_roles, companies, userExtraRoles} from '~/store/useSiteSettings';
import ls from '~/utils/Storage';
import {base_url} from '~/consts/const';
import {COMPANY, USER_EXTRA_ROLE} from "~/store/mutation-types-tatatonga";

definePageMeta({
  layout: 'home',
});
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
const lmsLoading = ref(true);


// Methods
const selectLMS = (com) => {
  localStorage.setItem('default_url', com.default_url);
  window.location.replace(com.default_url);
};

const selectCompany = (company) => {
  localStorage.setItem('default_url', company.default_url);
  store.commit(COMPANY, company); // Ensure 'COMPANY' is imported or defined
  store.commit(USER_EXTRA_ROLE, {
    id:""
  });
  if(company.subscription_active){
    window.location.replace('/home');
  } else {

    Modal.confirm({
      title: `${company.company_name}. Танай байгууллагын систем ашиглах эрх хаагдсан байна борлуулалтын албатай холбогдоно уу?`,
      icon: h(ExclamationCircleOutlined),
      content: `Борлуулалтын албаны утас: 7711-6060`,
      okText: 'За',
      okType: 'danger',
      cancelText: 'Хаах',
      onOk() {
        window.location.replace('/work#contact-info');
      },
      onCancel() {
        window.location.replace('/');
      },
    });
  }

};

const selectExtraRole = (extraRole) => {
  localStorage.setItem('default_url', null);
  store.commit(COMPANY, {
    company_id:"",
    company_name:"",
    company_logo:"",
    subscription_active:true,
  });
  store.commit(USER_EXTRA_ROLE, extraRole);
  window.location.replace('/erp');
};

const createCompany = () => {
  router.push("/company/create");
};

const redirectToLast = () => {
  // var default_url = localStorage.getItem('default_url');
  // if(default_url){
  //   const lmsIndex = LMS_roles.value.findIndex(r => r.default_url === default_url);
  //   if(lmsIndex >= 0){
  //     window.location.replace(default_url);
  //   } else {
  //     const erpIndex = companies.value.findIndex(r => r.default_url === default_url);
  //     if(erpIndex >= 0){
  //       ls.set(COMPANY, companies.value[erpIndex]);
  //       router.replace('/erp');
  //     } else {
  //       localStorage.removeItem('default_url');
  //       lmsLoading.value = false;
  //     }
  //   }
  // } else {
  //   lmsLoading.value = false;
  // }

  lmsLoading.value = false;
};
const getLMS = () => {

  if (LMS_roles.value.length === 1 && companies.value.length === 0) {
    selectLMS(LMS_roles.value[0]);
  } else if (LMS_roles.value.length === 0 && companies.value.length === 1) {
    selectCompany(companies.value[0]);
  } else {
    redirectToLast();
  }
};


onMounted(() => {
  getLMS();
});
</script>

<style scoped>

</style>
