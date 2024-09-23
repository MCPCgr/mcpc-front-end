<template>
  <div class="flex space-x-2 items-center rtl:space-x-reverse">
    <div class="flex-none">
      <div v-if="!project.logo"
           class="h-8 w-8 rounded-md text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
        {{ project.title.substring(0, 2).toUpperCase() }}
      </div>
      <div
        v-if="project.logo"
        class="h-8 w-8 rounded-full overflow-hidden text-lg bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-200 flex flex-col items-center justify-center font-normal capitalize">
        <img :src="`https://api.amjilt.com/plan${project.logo}`" alt="">
      </div>
    </div>
    <div class=" text-sm leading-6 ml-2 dark:text-slate-200 text-slate-700">
      {{ project.title }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  project: Object,
});

</script>
<style scoped>

</style>
