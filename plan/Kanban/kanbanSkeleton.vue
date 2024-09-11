<template>
<div class="flex kanban">
  <div  class="bg-gray-200 rounded-lg px-3 py-3 stage rounded mr-4 inline-block align-top">
    <a-skeleton active :paragraph="{ rows: 1 }"/>
    <a-skeleton-button active block class="mt-5" />
  </div>
  <div  class="bg-gray-200 rounded-lg px-3 py-3 stage rounded mr-4 inline-block align-top">
    <a-skeleton active :paragraph="{ rows: 1 }"/>
    <a-skeleton-button active block class="mt-5" />
  </div>
  <div  class="bg-gray-200 rounded-lg px-3 py-3 stage rounded mr-4 inline-block align-top">
    <a-skeleton active :paragraph="{ rows: 1 }"/>
    <a-skeleton-button active block class="mt-5" />
  </div>
</div>
</template>

<script>
export default {
  name: "kanbanSkeleton"
}
</script>

<style scoped>

</style>
