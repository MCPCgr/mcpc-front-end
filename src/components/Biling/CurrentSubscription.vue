<template>

  <div class="flex current-subscription">

    <div class=" relative w-full  transition-all duration-300  flex flex-1 p-5 shadow-xl cursor-pointer current-subscription"
         @click="goToSubscription"

         :style="`background-color: ${company.subscription_color}`"
    >
      <div class="relative z-20 flex flex-col gap-1"><span aria-current="page"
                                                           class="router-link-active router-link-exact-active font-sans text-sm text-white ">
                <span class="font-bold">{{ company.subscription }} </span> багц </span>
        <div
          class="font-alt text-sm font-normal leading-normal leading-normal mb-0">
        <div class="text-white/80">
          <p class="text-center mb-[10px]">Хэрэглээ <span class="font-semibold">{{used}} MB</span><span class=""> / {{company.storage}}GB</span></p>

          <a-progress :percent="used_data_percent"  stroke-color="#fff" />


        </div>
          <span
                class=" font-sans text-sm  text-white underline-offset-4 change-subscription mt-1">
                    Багцын мэдээлэл</span>


        </div>
      </div>
      <div class="absolute top-0 right-2 z-10 flex h-14 w-14 items-center justify-center">
        <svg data-v-cd102a71="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             aria-hidden="true" role="img" class="icon text-primary-900/50 h-10 w-10" width="1em" height="1em"
             viewBox="0 0 256 256">
          <g fill="#fff">
            <path
              d="m239.78 86.62l-37 113.38S176 184 128 184s-74.78 16-74.78 16l-37-113.37a4.1 4.1 0 0 1 5.72-5l53.41 26.62a4.11 4.11 0 0 0 5.36-1.56L124.48 34a4.11 4.11 0 0 1 7 0l43.77 72.74a4.12 4.12 0 0 0 5.35 1.56l53.43-26.64a4.1 4.1 0 0 1 5.75 4.96Z"
              opacity=".2"></path>
            <path
              d="M243.84 76.19a12.08 12.08 0 0 0-13.34-1.7l-50.21 25l-41.92-69.63a12.11 12.11 0 0 0-20.74 0L75.71 99.52l-50.19-25a12.11 12.11 0 0 0-16.9 14.6l37 113.36a8 8 0 0 0 11.68 4.4c.25-.15 25.82-14.88 70.7-14.88s70.45 14.73 70.68 14.87a8 8 0 0 0 11.71-4.39l37-113.33a12.06 12.06 0 0 0-3.55-12.96ZM198 188.83c-12-5.09-35.92-12.83-70-12.83s-58 7.74-70 12.83L26.71 93l45.07 22.47a12.17 12.17 0 0 0 15.78-4.59L128 43.66l40.44 67.2a12.18 12.18 0 0 0 15.77 4.59L229.29 93Zm-22.13-32a8 8 0 0 1-7.87 6.61a8.36 8.36 0 0 1-1.4-.12a228.2 228.2 0 0 0-77.22 0a8 8 0 0 1-2.78-15.76a244.42 244.42 0 0 1 82.78 0a8 8 0 0 1 6.5 9.24Z"></path>
          </g>
        </svg>
      </div>

    </div>
  </div>
</template>
<script setup>
import {company} from "~/store/useSiteSettings";
const packSize = (company.value.storage * 1024) / 100;
const used = Math.floor(company.value.total_usage <= 100 ? company.value.total_usage + 100 : company.value.total_usage);
const used_data_percent = Math.floor(used/packSize);
import { defineEmits } from 'vue';
const emits = defineEmits(['goToSubscription']);
const goToSubscription = (packageOption) => {
  emits('goToSubscription', packageOption);
};

</script>
<style scoped lang="scss">

</style>
