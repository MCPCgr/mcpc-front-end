<template>
  <div class="grid grid-cols-12 gap-2 lg:gap-4 cursor-pointer items-start">
    <div class="col-span-12 lg:col-span-5 xl:col-span-4 2xl:col-span-3">
      <nuxt-link :to="`/news-detail/${news.id}`">
        <div class="relative w-full h-40 border border-gray-100 dark:border-slate-700 rounded-xl">
          <img alt="" class="w-full h-full rounded-xl object-cover transition-all duration-500"
               :src="IMAGE_URL + news.image"/>
          <div class="absolute flex items-center justify-center inset-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-40 opacity-0 hover:opacity-100 rounded-xl transition-all duration-500">
            <span class="text-xs text-white font-medium">Дэлгэрэнгүй</span>
          </div>
        </div>
      </nuxt-link>
    </div>
    <div class="col-span-12 lg:col-span-7 xl:col-span-8 2xl:col-span-9 space-y-2 lg:space-y-3">
      <div class="flex items-center justify-between lg:justify-start space-x-2">
        <div class="flex flex-row items-center space-x-2">
          <img alt="profile" class="w-8 h-8 border dark:border-slate-700 rounded-full object-cover" v-if="news.avatar !== null" :src="IMAGE_URL + news.avatar"/>
          <img alt="noProfile" class="w-8 h-8 border dark:border-slate-700 rounded-full object-cover" v-else src="/amjilt-erp/images/defaultAvatar.svg"/>
          <div class="text-sm text-primary-color font-semibold dark:text-white">{{ news.first_name_user }}, {{ news.last_name_user }}</div>
        </div>
        <div class="text-xs text-gray-500 font-normal dark:text-gray-400"><span v-text="formatDate(news.created_at)"/></div>
      </div>

      <div>
        <nuxt-link :to="`/news-detail/${news.id}`">
          <h1 class="text-sm text-primary-color dark:text-white font-bold line-clamp-1 hover:text-[#5B2E8F]">{{ news.title }}</h1>
        </nuxt-link>
        <div class="text-sm text-gray-500 dark:text-gray-400 font-normal space-x-2 line-clamp-2">
          <p v-html="news.post_text"/>
        </div>
      </div>

      <div class="flex items-center justify-end lg:justify-start space-x-4">
        <div>
          <div class="flex items-center space-x-1 font-normal">
<!--            <img class="w-[18px] h-[18px]" src="/amjilthome/icons/heart-fill.svg"/>-->
            <img class="w-[18px] h-[18px]" src="/amjilthome/icons/like.svg"/>
            <span class="text-xs text-gray-500 dark:text-gray-400">9</span>
          </div>
        </div>
        <div class="flex items-center space-x-1 font-normal">
          <img class="w-[18px] h-[18px]" src="/amjilthome/icons/eye.svg"/>
          <span class="text-xs text-gray-500 dark:text-gray-400">0</span>
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
  news: Object
});

// dateList.value = props.news.view_news
</script>

<style scoped>

</style>
