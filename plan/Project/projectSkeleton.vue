<template>
  <div class="card rounded-md bg-white dark:bg-slate-800 lg:h-full  shadow-base">
    <div class="card-body flex flex-col p-6">
      <div class="card-text h-full">
        <header class="flex justify-between items-end">
          <a-skeleton active avatar :paragraph="{ rows: 0 }" />
        </header>
        <a-skeleton-button :active="true"  block />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "project",

}
</script>

<style scoped>

</style>
