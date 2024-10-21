<template>
  <Head>
    <Title>MCPCgr</Title>
  </Head>
  <div class="amjilt-home">
    <Banner class="bg-slate-100" />
    <introduction-banner/>
    <featured-solutions/>
    <div class="area absolute">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <partners/>
  </div>
</template>

<script>

import Banner from "~/components/home/banner.vue"
import IntroductionBanner from "~/components/home/introduction-banner.vue"
import Partners from "~/components/home/partners.vue"

import FeaturedSolutions from "~/components/home/featured-solutions.vue"
export default {
  components: {
    Banner,
    IntroductionBanner,
    Partners,
    FeaturedSolutions,
  },
  data() {
    return {

    };
  },
  beforeCreate() {
    definePageMeta({
      layout: 'home',
    })
  },
};
</script>
<style scoped>
</style>
