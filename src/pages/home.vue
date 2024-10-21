<template>
  <Head>
    <Title>Нүүр</Title>
  </Head>
  <portal to="header-left">
    <div class="page-title float-left">
      <div class="float-left pt-3">
        <h1 class="text-gray-700 dark:text-gray-200 text-base m-0">Нүүр хуудас</h1>
        <h2 class="text-gray-400 text-xs m-0"><span>Нүүр хуудас</span></h2>
      </div>
    </div>
  </portal>
    <div class="grid grid-cols-11 gap-6">
      <div class="col-span-11 md:col-span-8 space-y-6">
        <div class="grid grid-cols-12 gap-4 bg-white dark:bg-slate-900 rounded-xl p-4">
          <div class="col-span-12 xl:col-span-4 flex space-x-4">
            <div class="relative flex flex-col bg-green-200 rounded-xl p-4 space-y-3 w-full h-[296px]">
              <h1 class="text-xl text-primary-color font-bold">{{ greetingMessage }}</h1>
              <div class="flex items-center space-x-3">
                <div class="w-14 h-14">
                  <img class="w-full h-full object-cover border border-white rounded-full" v-if="userInfo.avatar !== null && userInfo.avatar" :src="IMAGE_URL + userInfo.avatar"/>
                  <img class="w-full h-full object-cover border border-white rounded-full" v-else src="/amjilt-erp/images/defaultAvatar.svg"/>
                </div>
                <h1 class="text-base text-primary-color font-bold leading-5">
                  {{ userInfo.first_name }} <br> <span class="text-sm text-gray-600 font-normal">{{ userInfo.last_name }}</span>
                </h1>
              </div>

              <div class="absolute inset-0 bottom-0 flex items-end w-full p-2">
                <div class="flex items-center space-x-2 w-full">
                  <div class="h-[120px] flex flex-col w-full bg-white rounded-lg p-2">
                    <img class="w-5 h-5" src="/amjilthome/icons/gif.svg"/>
                    <div class="flex items-end h-full">
                      <div>
                        <h1 class="text-2xl text-primary-color font-bold">{{count.project_count }}</h1>
                        <span class="text-sm text-gray-500 dark:text-gray-400 font-normal">Нийт төсөл</span>
                      </div>
                    </div>
                  </div>
                  <div class="h-[120px] flex flex-col w-full bg-white rounded-lg p-2">
                    <img class="w-5 h-5" src="/amjilthome/icons/briefcase.svg"/>
                    <div class="flex items-end h-full">
                      <div>
                        <h1 class="text-2xl text-primary-color font-bold">{{count.task_count }}</h1>
                        <span class="text-sm text-gray-500 dark:text-gray-400 font-normal">Нийт ажил</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 xl:col-span-8 rounded-xl p-4 dark:bg-slate-800" style="box-shadow: 0 1px 2px -1px #00000005; box-shadow: 0 1px 5px 0 #0000001A;">
            <div class="flex items-center justify-between">
              <h1 class="text-sm text-primary-color dark:text-white font-bold mb-2">Миний ажлууд</h1>
              <div>
                <nuxt-link to="/plan/my-tasks">
                  <div class="text-sm flex items-center h-10 rounded-lg text-primary-color dark:text-white bg-gray-100 dark:bg-slate-700 font-normal px-4">
                    Бүх ажлууд
                  </div>
                </nuxt-link>
              </div>
            </div>
            <div class="overflow-y-scroll h-[212px]">
              <home-my-tasks/>
            </div>
          </div>
        </div>

        <div v-if="loader" class="flex items-center justify-center w-full h-screen">
          <img src="/amjilthome/loading/loader.svg" class="w-14" alt="">
        </div>

        <div v-else class="bg-white dark:bg-slate-900 rounded-xl space-y-4 p-4">
          <div class="text-sm font-bold border-b border-gray-100 dark:border-slate-700 pb-2">Мэдээ мэдээлэл</div>

          <!-- NewsCard -->
          <div class="grid grid-cols-1 gap-6" v-if="newsList.length > 0">
            <div v-for="(news, Index) in newsList" :key="Index">
              <NewsCard :news="news"/>
            </div>

            <!-- Pagination -->
            <div class="flex items-center justify-center py-10">
              <a-pagination
                v-model:current="currentPage"
                v-model:page-size="pageSize"
                @change="handlePageChange($event)"
                :total="newsItems"
                show-less-items>
              </a-pagination>
            </div>
          </div>

          <!-- Empty -->
          <div class="text-center py-48" v-else>
            <h1 class="text-sm text-gray-500 dark:text-gray-400 font-normal">Одоогоор мэдээ мэдээлэл <br> байхгүй байна</h1>
          </div>
        </div>
      </div>
      <div class="col-span-11 md:col-span-3 bg-white dark:bg-slate-900 rounded-xl">
        <div class="relative mb-16">
          <div class="h-36 w-full rounded-t-xl">
            <img class="w-full h-full object-cover rounded-t-xl" v-if="company.company_cover" :src="`${$base_url}${company.company_cover}`"/>
            <img class="w-full h-full object-cover rounded-t-xl" v-else src="/amjilt-erp/images/cover.png"/>
          </div>
          <div class="absolute bottom-0 flex items-end justify-center w-full -mb-14">
            <div class="space-y-1">
              <div class="flex justify-center">
                <div class="w-[72px] h-[72px]">
                  <img class="w-full h-full object-cover border-2 dark:border-white rounded-full" v-if="company.company_logo !== null" :src="IMAGE_URL + company.company_logo"/>
                  <img class="w-full h-full object-cover border-2 dark:border-white rounded-full" v-else src="/amjilt-erp/images/defaultAvatar.svg"/>
                </div>
              </div>
              <h1 class="text-base text-primary-color dark:text-white font-bold text-center">
                {{ company.company_name }}
              </h1>
            </div>
          </div>
        </div>
<!--        <CurrentSubscription @goToSubscription="goToSubscription"/>-->
        <div class="space-y-6 p-4">
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <img class="w-6 h-6" src="/amjilthome/icons/star-icon.svg"/>
              <h1 class="text-sm text-primary-color dark:text-white font-bold">Уриа үг</h1>
            </div>
            <h2 class="text-sm text-gray-500 dark:text-gray-400 font-normal">{{ company.company_word }}</h2>
          </div>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <img class="w-6 h-6" src="/amjilthome/icons/rocket-icon.svg"/>
              <h1 class="text-sm text-primary-color dark:text-white font-bold">Алсын хараа</h1>
            </div>
            <h2 class="text-sm text-gray-500 dark:text-gray-400 font-normal">{{ company.company_vision }}</h2>
          </div>
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <img class="w-6 h-6" src="/amjilthome/icons/magicpen-icon.svg"/>
              <h1 class="text-sm text-primary-color dark:text-white font-bold">Эрхэм зорилго</h1>
            </div>
            <h2 class="text-sm text-gray-500 dark:text-gray-400 font-normal">{{ company.company_purpose }}</h2>
          </div>

          <div class="primary_button w-full">
            <nuxt-link to="/company/struct">
              <a-button class="w-full flex items-center justify-center" type="primary" style="height: 40px !important; box-shadow: none;">
                <img class="w-4 h-4 mr-2" src="/assets/icons/organization/structure-white.svg"/>
                Байгууллагын бүтэц
              </a-button>
            </nuxt-link>
          </div>

          <!-- Хамт олон -->
          <HomeOur/>
        </div>



      </div>
    </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();
import axios from "axios";
import HomeOur from "~/components/common/HomeOur.vue";
import NewsCard from "~/components/News/NewsCard.vue";
import CurrentSubscription from "~/components/Biling/CurrentSubscription.vue";
import {getNewsAdminList} from "~/graphql/fetch";
import {userInfo, company} from "~/store/useSiteSettings";
import {ref, onMounted} from 'vue';
import {IMAGE_URL} from "~/graphql/queries";
import HomeMyTasks from "~/pages/plan/home-my-tasks.vue";

const currentPage = ref(1);
const pageSize = ref(3);
const newsList = ref([]);
const count = ref([]);
const newsItems = ref(0);
const loader = ref(true);


const fetchNewsList = async () => {
  loader.value = true;
  try {
    const data = await getNewsAdminList(company.value.id, currentPage.value, pageSize.value,);
    if (data.view_news && data.view_news.length) {
      newsList.value = data.view_news;
      newsItems.value = data.total;
    } else {
      newsList.value = [];
      newsItems.value = 0;
      currentPage.value = 1;
    }
  } catch (error) {
    console.error("Failed to fetch travel list:", error);
    newsList.value = [];
  } finally {
    loader.value = false;
  }
  return {
    loader: true,
  }
};

const MyTaskCount = async () => {
  axios.post("https://plan.mcpc.mn/get-my-task-count", {}).then((response) => {
    count.value = response.data;
  })
}

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchNewsList();
};
const greetingMessage = computed(() => {
  const hours = new Date().getHours();
  if (hours < 12) {
    return "Өглөөний мэнд";
  } else if (hours < 18) {
    return "Өдрийн мэнд";
  } else {
    return "Оройн мэнд";
  }
});

onMounted(()=>{
  fetchNewsList();
  MyTaskCount();
});

function goToSubscription(){
  router.push("/company/billing?showSubscription=true")
}
</script>

<style scoped>

</style>
