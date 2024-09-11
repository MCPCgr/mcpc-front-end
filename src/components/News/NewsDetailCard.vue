<template>
  <div class="group cursor-pointer space-y-3">
    <nuxt-link :to="`/news-detail/${newsDetailOthercard.id}`">
      <div class="relative w-full h-44">
        <img alt="" class="w-full h-full rounded-xl object-cover hover:scale-105 transition-all duration-500"
             :src="IMAGE_URL + newsDetailOthercard.image"/>
        <div class="absolute flex items-center justify-center inset-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-40 opacity-0 hover:opacity-100 rounded-xl transition-all duration-500">
          <span class="text-xs text-white font-medium">Дэлгэрэнгүй</span>
        </div>
      </div>
    </nuxt-link>

    <div class="space-y-1">
      <div class="flex items-center justify-between space-x-4">
        <div class="flex flex-row items-center space-x-2">
          <img alt="" class="w-8 h-8 rounded-full object-cover" :src="IMAGE_URL + newsDetailOthercard.avatar"/>
          <div class="text-sm text-primary-color font-semibold dark:text-white">{{ newsDetailOthercard.first_name_user }}, {{ newsDetailOthercard.last_name_user }}</div>
        </div>
        <div class="text-xs text-gray-500 font-normal dark:text-gray-400"><span v-text="formatDate(newsDetailOthercard.created_at)"/></div>
      </div>

      <div>
        <nuxt-link :to="`/news-detail/${newsDetailOthercard.id}`">
          <h1 class="text-sm text-primary-color dark:text-white font-bold line-clamp-1 hover:text-[#5B2E8F]">{{ newsDetailOthercard.title }}</h1>
        </nuxt-link>
        <div class="text-sm text-gray-500 dark:text-gray-400 font-normal space-x-2 line-clamp-1">
          <p v-html="newsDetailOthercard.post_text"/>
        </div>
      </div>

      <div class="flex items-center justify-end space-x-4 py-2">
        <div>
          <div class="flex items-center space-x-1 font-normal">
            <!--            <img class="w-[18px] h-[18px]" src="/amjilthome/icons/heart-fill.svg"/>-->
            <img class="w-[18px] h-[18px]" src="/amjilthome/icons/like.svg"/>
            <span class="text-sm text-gray-500 dark:text-gray-500">9</span>
          </div>
        </div>
        <div class="flex items-center space-x-1 font-normal">
          <img class="w-[18px] h-[18px]" src="/amjilthome/icons/eye.svg"/>
          <span class="text-sm text-gray-500 dark:text-gray-500">0</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from "vue";
import {formatDate} from "@lambda-platform/lambda-vue/src/utils/date";
import {IMAGE_URL} from "~/graphql/queries";

const props = defineProps({
  newsDetailOthercard: Object
});

// dateList.value = props.news.view_news
</script>

<style scoped>

</style>
