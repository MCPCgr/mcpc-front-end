<template>
  <a-dropdown :overlayStyle="{ minWidth: '300px' }">
        <span class="action ant-dropdown-link user-dropdown-menu">
          <div :class="`avatar ${company.company_logo ? 'company-logo' : ''}`">
              <img :src="base_url+company.company_logo" alt="avatar" v-if="company.company_logo">
             <inline-svg v-else-if="userExtraRole.id !== ''" src="/amjilthome/logos/amjilt-s.svg"/>
              <inline-svg v-else src="/assets/icons/duotone/Home/Building.svg"/>

          </div>
        </span>
    <template #overlay>
     <div class="bg-white dark:bg-slate-900 rounded-md shadow-md">
       <ul
           item-layout="horizontal"
           class="companies-list w-full"
           size="small"
       >
         <li v-for="com in companies" :key="com.index" @click="selectCompany(com)" class="flex items-center w-full px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
           <div :class="`avatar ${com.company_logo ? 'company-logo' : ''}`">
             <img :src="base_url+com.company_logo" alt="avatar" v-if="com.company_logo">
             <inline-svg src="/assets/icons/duotone/Home/Building.svg" v-else/>
           </div>
           <div class="company-name flex-grow pl-4 flex">
             <span class="flex-grow">
               {{ com.company_name }}
             </span>

             <span >
               <span :class="`ant-radio ${company.company_id === com.company_id ? 'ant-radio-checked' : ''}`">
              <span class="ant-radio-inner"></span>
             </span>
           </span>
           </div>

         </li>
         <li v-for="extraRole in userExtraRoles" :key="extraRole.index" @click="selectExtraRole(extraRole)" class="flex items-center w-full px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
           <div :class="`avatar`">
             <inline-svg src="/amjilthome/logos/amjilt-s.svg"/>
           </div>
           <div class="company-name flex-grow pl-4 flex">
             <span class="flex-grow uppercase">
               {{ extraRole.name }}
             </span>

             <span >
               <span :class="`ant-radio ${userExtraRole.id === extraRole.id ? 'ant-radio-checked' : ''}`">
              <span class="ant-radio-inner"></span>
             </span>
           </span>
           </div>

         </li>
         <li v-for="com in LMS_roles" :key="com.index" @click="selectLMS(com)"
             class="flex items-center w-full px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600">
           <div :class="`avatar  company-logo`">
             <img :src="com.org_logo" alt="avatar" >

           </div>
           <div class="company-name flex-grow pl-4   text-left">
            <div class="text-left">
              <b>{{ com.org_name }}</b>
            </div>
             <div class="text-left">
               {{com.role_name}}
             </div>
           </div>

         </li>
<!--         <li @click="createCompany" class="flex items-center w-full px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 border-t">-->
<!--           <div class="avatar svg-icon-white ">-->
<!--             <inline-svg class="svg-icon-white" src="/assets/icons/duotone/Navigation/Plus.svg"/>-->
<!--           </div>-->
<!--           <div class="add-company-txt flex-grow pl-4">Шинэ компани үүсгэх</div>-->
<!--         </li>-->
       </ul>
     </div>

    </template>
  </a-dropdown>
</template>


<script setup>
import store from '~/store/index'
import { useRouter } from 'vue-router';
import { LMS_roles, companies, company, userExtraRoles, userExtraRole } from '~/store/useSiteSettings';
import { base_url } from '~/consts/const';
import {COMPANY, USER_EXTRA_ROLE} from "~/store/mutation-types-tatatonga";


// Router instance
const router = useRouter();

// Methods
const selectCompany = (selectedCompany) => {
  store.commit(COMPANY, selectedCompany); // Ensure 'COMPANY' is imported or defined
  store.commit(USER_EXTRA_ROLE, {
    id:""
  });
  localStorage.setItem('default_url', selectedCompany.default_url);
  if (router.currentRoute.value.path.startsWith("/plan/")) {
    window.location.replace('/plan');
  } else {
    window.location.reload();
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

const selectLMS = (com) => {
  localStorage.setItem('default_url', com.default_url);

  window.open(com.default_url, '_blank');

};
const createCompany = () => {
  router.push("/company/create");
};
</script>
