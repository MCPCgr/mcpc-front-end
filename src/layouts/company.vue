<template>
  <div class="bg-white dark:bg-slate-900">
    <Head>
      <Title>Amjilt Company Page</Title>
    </Head>
    <NuxtPage :key="$route.fullPath"/>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import WebFooter from "~/components/home/WebFooter.vue";
  import WebHeader from "~/components/home/WebHeader.vue";

  export default {
    components: {WebHeader, WebFooter},
    computed: {
      ...mapGetters([
        'user',
        'userToken',
        // ...
      ]),
    },
  }
</script>

<style scoped>

</style>
