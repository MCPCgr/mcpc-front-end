<template>
  <div class="bg-white dark:bg-slate-900">
    <Head>
      <Title>Бүртгүүлэх</Title>
    </Head>

    <WebHeader/>
    <NuxtPage :key="$route.fullPath"/>
    <WebFooter/>
  </div>
</template>
<script>
import WebHeader from '~/components/home/WebHeader.vue'
import WebFooter from '~/components/home/WebFooter.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    WebHeader,
    WebFooter,
  },
  computed: {
    ...mapGetters([
      'user',
      'userToken',
      // ...
    ]),
  },

}
</script>
