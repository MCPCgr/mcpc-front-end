<template>
  <div>
{{type_id}}
  </div>
</template>
<script setup>
import {defineProps} from "vue";
const props = defineProps({
  type_id: String,
});
</script>
<style scoped>
</style>
