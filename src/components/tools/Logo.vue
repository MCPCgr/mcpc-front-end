<template>
  <div class="logo">
    <nuxt-link to="/">
      <img :src="`${logoDark}`" v-if="darkMode && showTitle" class="logo-light" :alt="title">
      <img :src="`${logo}`"   v-if="!darkMode && showTitle" class="logo-dark" :alt="title">
      <img :src="`${logoSquireDark}`" v-if="darkMode && !showTitle" class="logo-light" :alt="title">
      <img :src="`${logoSquire}`"   v-if="!darkMode && !showTitle" class="logo-dark" :alt="title">

    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LAMBDA_CONFIG } from '~/store/mutation-types'
import ls from '~/utils/Storage'
import { base_url } from '~/consts/const'
import { darkMode } from '~/store/useSiteSettings'
export default defineComponent({
  name: 'Logo',
  components: {
  },
  props: {

    showTitle: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  setup(props) {

    return {
      title: "MCPC",
      logo: "/amjilthome/logos/mcpc-gr.svg",
      logoDark: "/amjilthome/logos/mcpc-gr-white.svg",
      logoSquire: "/amjilthome/logos/mcpc-s.svg",
      logoSquireDark: "/amjilthome/logos/mcpc-s-white.svg",
      base_url:base_url,
      darkMode


    }
  }
});
</script>
