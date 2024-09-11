<template>
  <Head>
    <Title>Мэдээ мэдээлэл</Title>
  </Head>
  <portal to="header-left">
    <div class="page-title float-left">
      <div class="float-left pt-3">
        <h1 class="text-gray-700 dark:text-gray-200 text-base m-0">Мэдээ дэлгэрэнгүй</h1>
        <h2 class="text-gray-400 text-xs m-0"><span>Мэдээ дэлгэрэнгүй</span></h2>
      </div>
    </div>
  </portal>

  <div v-if="loader" class="flex items-center justify-center w-full h-screen">
    <img src="/amjilthome/loading/loader.svg" class="w-14" alt="">
  </div>

  <div v-else class="grid grid-cols-12 gap-6">
    <div class="col-span-12 xl:col-span-8 bg-white dark:bg-slate-900 rounded-xl p-4 space-y-2">
      <div class="w-full h-48 md:h-64 xl:h-[360px] mb-6 border border-gray-100 dark:border-slate-700 rounded-xl">
        <img alt="" class="w-full h-full rounded-xl object-cover" :src="IMAGE_URL + newsdetail.image"/>
      </div>

      <h1 class="text-lg text-primary-color dark:text-white font-bold">{{ newsdetail.title }}</h1>

      <div class="text-sm text-gray-500 dark:text-gray-400 leading-6 font-normal">
        <span v-html="newsdetail.post_text"/>
      </div>

      <div class="space-y-4">

        <!-- Date & Like, View -->
        <div class="flex items-center justify-between py-4">
          <div class="space-y-1">
            <div class="flex items-center space-x-2 font-normal">
              <img class="w-[18px] h-[18px]" src="/amjilthome/icons/calendar.svg"/>
              <h1 class="text-sm text-gray-500 dark:text-gray-400 font-normal" v-text="formatDate(newsdetail.created_at)"/>
            </div>
            <div class="flex items-center space-x-2 font-normal">
              <img class="w-[18px] h-[18px]" src="/amjilthome/icons/clock.svg"/>
              <h1 class="text-sm text-gray-500 dark:text-gray-400 font-normal" v-text="formatTime(newsdetail.created_at)"/>
            </div>
          </div>
          <div class="flex items-center justify-end space-x-4">
            <div class="flex items-center space-x-1 font-normal">
              <!--              <img class="w-[18px] h-[18px]" src="/amjilthome/icons/like.svg"/>-->
              <img class="w-[18px] h-[18px]" src="/amjilthome/icons/like-fill.svg"/>
              <span class="text-xs text-gray-500 dark:text-gray-400">9</span>
            </div>
            <div class="flex items-center space-x-1 font-normal">
              <img class="w-[18px] h-[18px]" src="/amjilthome/icons/eye.svg"/>
              <span class="text-xs text-gray-500 dark:text-gray-400">0</span>
            </div>
          </div>
        </div>

        <!-- Нийтэлсэн: -->
        <div class="space-y-1">
          <h1 class="text-xs text-primary-color dark:text-white font-bold">Нийтэлсэн:</h1>
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8">
              <img alt="profile" class="border dark:border-slate-700 w-8 h-8 rounded-full object-cover" v-if="newsdetail.avatar !== null" :src="IMAGE_URL + newsdetail.avatar"/>
              <img alt="noProfile" class="border dark:border-slate-700 w-8 h-8 rounded-full object-cover" v-else src="/amjilt-erp/images/defaultAvatar.svg"/>
            </div>
            <h2 class="text-sm text-primary-color dark:text-white font-normal">{{ newsdetail.first_name_user }}, {{ newsdetail.last_name_user }}</h2>
          </div>
        </div>

        <!-- News Comments -->
        <div class="py-10 md:px-20 xl:px-32 space-y-4">
          <div class="flex items-start space-x-2 ">
            <div>
              <div class="w-8 h-8">
                <img alt="" class="w-8 h-8 rounded-full object-cover"
                     src="https://imageio.forbes.com/specials-images/imageserve/605e22fe6df966b3fcbd3e15/0x0.jpg?format=jpg&crop=1080,1080,x0,y0,safe&height=416&width=416&fit=bounds"/>
              </div>
            </div>
            <div class="py-3 px-4 bg-purple-50 dark:bg-slate-800 rounded-xl w-full">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center space-x-2">
                  <h1 class="text-xs text-primary-color font-semibold">Jack Ma</h1>
                  <span class="text-xs text-gray-500">10 мин</span>
                </div>
                <a-dropdown trigger="click">
                  <a class="ant-dropdown-link">
                    <div>
                      <img class="w-4 h-4" src="/amjilthome/icons/edit.svg"/>
                    </div>
                  </a>
                  <template #overlay>
                    <a-menu>
                      <a-menu-item>
                        <div class="flex items-center space-x-3 h-7">
                          <img class="w-4 h-4" src="/amjilthome/icons/edit-pen.svg"/>
                          <span class="text-xs">Засах</span>
                        </div>
                      </a-menu-item>
                      <a-menu-item>
                        <div class="flex items-center space-x-3 h-7">
                          <img class="w-4 h-4" src="/amjilthome/icons/delete.svg"/>
                          <span class="text-xs">Устгах</span>
                        </div>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
              <div>
                <span class="text-xs text-primary-color font-normal">
                  Nice харагдаж байна. Хичээгээрэй
                </span>
              </div>
            </div>

          </div>
          <div class="w-full">
            <a-textarea v-model:value="value2" show-count :maxlength="100"/>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-12 xl:col-span-4">
      <div class="bg-white dark:bg-slate-900 rounded-xl p-4">
        <div class="text-sm font-bold border-b border-gray-100 dark:border-slate-700 pb-2">Бусад мэдээ</div>
        <div class="space-y-4 p-4" v-if="newsDetailOther.length > 0">
          <div v-for="(newsDetailOthercard, Index) in newsDetailOther" :key="Index">
            <NewsDetailCard :newsDetailOthercard="newsDetailOthercard"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {defineProps, ref} from "vue";
import {formatDate} from "@lambda-platform/lambda-vue/src/utils/date";
import {IMAGE_URL} from "~/graphql/queries";
import {getNewsAdminList, getNewsDetailById} from "~/graphql/fetch";
import {useRoute} from 'vue-router';
import Moment from "moment";
const loader = ref(true);
const newsdetail = ref({});
const router = useRoute();
const id = router.params.id;
const newsDetailOther = ref([]);
const newsItems = ref(0);
const pageSize = ref(4);
const currentPage = ref(1);
const newsList = ref([]);
const props = defineProps({news: Object
});

const getNewsAdminDetail = () => {
  loader.value = true;
  getNewsDetailById(id).then(data => {
    if (data.view_news && data.view_news.length) {
      if (data.view_news.length > 0) {
        newsdetail.value = data.view_news[0];
        loader.value = false;
        console.log("newsdetail.value >>> ", newsdetail.value)
      }
    }
  });
};

const getNewsAdminListData = async () => {
  loader.value = true;
  try {
    const data = await getNewsAdminList(currentPage.value, pageSize.value,);
    if (data.view_news && data.view_news.length) {
      newsDetailOther.value = data.view_news;
      newsItems.value = data.total;
    } else {
      newsDetailOther.value = [];
      newsItems.value = 0;
      currentPage.value = 1;
    }
  } catch (error) {
    console.error("Failed to fetch travel list:", error);
    newsDetailOther.value = [];
  } finally {
    loader.value = false;
  }
  return {
    loader: true,
  }
};

const formatTime = (time) => {
  if (time !== null) {
    return Moment(time).utc().format('HH:mm');
  } else {
    return '00:00'
  }
}

onMounted(() => {
  getNewsAdminDetail();
  getNewsAdminListData();
});

</script>

<style scoped>

</style>
