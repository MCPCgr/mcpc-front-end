<script setup>
import {clearUserInfo} from "~/utils/util";

definePageMeta({
  layout: 'home',
})

import { onBeforeMount } from 'vue';

onBeforeMount(() => {
  clearUserInfo();
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.amjilt.com";
  document.cookie = "amjilt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.amjilt.com";

  window.location.replace("/")
});
</script>

<template>
  <div class="bg-gray-100 dark:bg-slate-900 pb-16">
    <div class="container mx-auto px-4 pt-16  ">
      <div>
        <h1 class="text-4xl/tight font-medium mt-3 mb-4 align-center"></h1>
      </div>
      <div   class="mx-auto align-center">
        <a-spin />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
