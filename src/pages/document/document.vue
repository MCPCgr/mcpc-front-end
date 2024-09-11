<template>
  <Head>
    <Title>Албан бичиг</Title>
  </Head>

  <portal to="header-left">
    <div class="page-title float-left">
      <div class="float-left pt-3">
        <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">{{category}}</h1>
        <h2 class="text-gray-400 text-xs m-0"><span>Албан бичиг, Гэрээ</span></h2>
      </div>
    </div>
  </portal>
  <div class="flex dms-page ">

    <!-- Left Sidebar -->
    <div class="w-1/4 bg-white px-3 py-2  rounded-md">
      <ul class="space-y-2">
        <li v-for="category in categories" :key="category.index"
            class="">
         <nuxt-link class="flex items-center p-2 rounded-lg" :to="`/document/document/${category.id}`">
           <img :src="category.is_contract ? `/assets/dms/icons/contract5.svg` : `/assets/dms/icons/stamp6.svg`" class="h-8 w-8 mr-1" alt="icon"/>
           <span class="ml-2 ">{{ category.category }}</span>
         </nuxt-link>
        </li>
      </ul>
    </div>
    <NuxtPage :types="types" :category="category" :cat_id="route.params.cat_id" :icon="icon" />

  </div>
</template>
<script setup>
import {ref, onMounted} from 'vue';

import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

import {  company,  } from '~/store/useSiteSettings';
import {getDocCategory} from "~/modules/document/graphql/fetch"
const categories = ref([]);
const types = ref([]);
const category = ref("");
const icon = ref("");

function getCategory() {
  getDocCategory(company.value.company_id).then(({document_type_category}) => {
    categories.value = document_type_category;

    if(categories.value.length >= 1){

      if (route.path === '/document/document') {
        router.push(`/document/document/${categories.value[0].id}`);
      } else {

        const cat_id = route.params.cat_id;
        if(cat_id){
          const index = categories.value.findIndex(c=>c.id === cat_id);
          if(index >= 0){
            types.value = categories.value[index].document_type ?? [];
            category.value = categories.value[index].category;
            icon.value = categories.value[index].icon;

          }

        }

      }

    }
  })
}


onMounted(() => {
  getCategory();
})
</script>

<style scoped>

</style>
