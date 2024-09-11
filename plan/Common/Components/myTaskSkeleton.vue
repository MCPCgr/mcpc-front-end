<template>
<div class="flex flex-col">
  <div  class="bg-gray-200 rounded-lg px-3 py-3 stage rounded mr-4 inline-block align-top mb-3">
    <a-skeleton active :paragraph="{ rows: 1 }"/>

  </div>
  <div  class="bg-gray-200 rounded-lg px-3 py-3 stage rounded mr-4 inline-block align-top mb-3">
    <a-skeleton active :paragraph="{ rows: 1 }"/>

  </div>
  <div  class="bg-gray-200 rounded-lg px-3 py-3 stage rounded mr-4 inline-block align-top mb-3">
    <a-skeleton active :paragraph="{ rows: 1 }"/>

  </div>
</div>
</template>

<script>
export default {
  name: "myTaskSkeleton"
}
</script>

<style scoped>

</style>
