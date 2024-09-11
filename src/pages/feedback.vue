<template>
  <Head>
    <Title>Санал хүсэлт</Title>
  </Head>
  <portal to="header-left">
    <div class="page-title float-left">
      <div class="float-left pt-3">
        <h1 class="text-gray-700 dark:text-gray-200 text-base m-0">Санал хүсэлт</h1>
        <h2 class="text-gray-400 text-xs m-0"><span>Санал хүсэлт</span></h2>
      </div>
    </div>
  </portal>

  <div v-if="loader" class="flex items-center justify-center w-full h-screen">
    <img src="/amjilthome/loading/loader.svg" class="w-14" alt="">
  </div>

  <div v-else class="bg-white dark:bg-slate-900 rounded-xl p-4">
    <div class="border-b border-gray-100 dark:border-slate-700 font-bold text-sm pb-2">Бүх cанал хүсэлт</div>

    <div v-if="FeedbackList.length > 0">
      <div class="border-b border-gray-100 dark:border-slate-700 py-3 space-y-1" v-for="(feedbackData, Index) in FeedbackList" :key="Index">
        <div class="flex items-center justify-between lg:justify-start space-x-3">
          <div class="flex flex-row items-center space-x-2">
            <img class="w-8 h-8 border dark:border-slate-700 rounded-full object-cover" v-if="feedbackData.avatar !== null" :src="IMAGE_URL + feedbackData.avatar"/>
            <img class="w-8 h-8 border dark:border-slate-700 rounded-full object-cover" v-else src="/amjilt-erp/images/defaultAvatar.svg"/>
            <div class="text-sm text-primary-color font-semibold dark:text-white">{{ feedbackData.firstname }}, {{ feedbackData.lastname }}</div>
          </div>
          <div class="text-xs text-gray-500 font-normal dark:text-gray-400"><span v-text="formatDate(feedbackData.created_at)"/></div>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400 font-normal space-x-2"><p>{{ feedbackData.description_text }}</p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center py-10">
        <a-pagination
          v-model:current="currentPage"
          v-model:page-size="pageSize"
          @change="handlePageChange($event)"
          :total="FeedbackItems"
          show-less-items>
        </a-pagination>
      </div>
    </div>

    <!-- Empty -->
    <div class="text-center py-48" v-else>
      <h1 class="text-sm text-gray-500 dark:text-gray-400 font-normal">Одоогоор cанал хүсэлт <br> байхгүй байна</h1>
    </div>
  </div>

  <!-- Plus Button -->
  <div class="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center bg-[#5B2E8F] hover:bg-opacity-90 duration-300 rounded-full cursor-pointer animate-bounce z-50" @click="FeedbackModal">
    <img alt="plus" class="w-6 h-6" src="/amjilthome/icons/plus.svg">
  </div>

  <!-- FeedbackModal -->
  <a-modal v-model:open="openFeedback" @ok="FeedbackModal">
    <template #title>
      <h1 class="text-base text-primary-color dark:text-white font-bold">Санал хүсэлт илгээх</h1>
    </template>
    <div class="space-y-6 py-8">
      <div class="flex items-center space-x-3">
        <div class="w-14 h-14">
          <img class="w-full h-full object-cover border dark:border-slate-700 rounded-full" v-if="userInfo.avatar !== null" :src="IMAGE_URL + userInfo.avatar"/>
          <img class="w-full h-full object-cover border dark:border-slate-700 rounded-full" v-else src="/amjilt-erp/images/defaultAvatar.svg"/>
        </div>
        <h1 class="text-base text-primary-color dark:text-white font-bold leading-5">
          {{ userInfo.first_name }} <br> <span class="text-sm text-gray-500 font-normal dark:text-gray-400">{{ userInfo.last_name }}</span>
        </h1>
      </div>
      <div class="w-full">
        <a-textarea v-model:value="feedback_text" show-count :maxlength="400" :auto-size="{ minRows: 5, maxRows: 8 }" placeholder="Та санал хүсэлтээ бичнэ үү"/>
      </div>
    </div>
    <template #footer>
      <div class="primary_button w-full" @click="feedBackCreate">
        <a-button class="w-full" type="primary" style="height: 40px !important; box-shadow: none;">Илгээх</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getFeedbackList, mutationCreateBookingOrder, mutationFeedBackCreate,} from "~/graphql/fetch";
import {useRoute} from 'vue-router';
import {userInfo, company} from "~/store/useSiteSettings";
import {IMAGE_URL} from "~/graphql/queries";
import {formatDate} from "@lambda-platform/lambda-vue/src/utils/date";


const openFeedback = ref(false);
const loader = ref(false);
const route = useRoute();
const currentPage = ref(1);
const pageSize = ref(10);
const FeedbackList = ref([]);
const FeedbackItems = ref(0);
const feedback_text = ref(null);


const fetchFeedbackList = async () => {
  loader.value = true;
  try {
    const data = await getFeedbackList(userInfo.value.company_id, currentPage.value, pageSize.value);
    if (data.view_feedback_company && data.view_feedback_company.length) {
      FeedbackList.value = data.view_feedback_company;
      FeedbackItems.value = data.total;
    } else {
      FeedbackList.value = [];
      FeedbackItems.value = 0;
      currentPage.value = 1;
    }
  } catch (error) {
    console.error("Failed to fetch travel list:", error);
    FeedbackList.value = [];
  } finally {
    loader.value = false;
  }
  return {
    loader: true,
  }
};

function feedBackCreate(){
  let feedback_text_create = {
    nick_name: userInfo.value.first_name + ' ' + userInfo.value.last_name,
    description_text: feedback_text.value,
    company_id: userInfo.value.company_id,
    emp_id: userInfo.value.emp_id,
  }

  console.log("feedback_text_create >>> ", feedback_text_create)
  console.log("feedback_text_create >>> ", feedback_text_create)
  console.log("feedback_text_create >>> ", feedback_text_create)
  console.log("feedback_text_create >>> ", feedback_text_create)
  console.log("feedback_text_create >>> ", feedback_text_create)
  // console.log("userInfo.value.firstname >>> ", userInfo.value.emp_id)
  // console.log("feedback_text_create >>> ", feedback_text_create)

  mutationFeedBackCreate(feedback_text_create).then(data=>{
    // console.log("DATA >>> ", data)
    if(data.createFeedbackCompany){
      console.log("createFeedbackCompany >>> ", data.createFeedbackCompany)
    }
  })
}

const FeedbackModal = () => openFeedback.value = true;
const handleOk = () => openFeedback.value = false;
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchFeedbackList();
};

onMounted(fetchFeedbackList);
onMounted(feedBackCreate);

</script>
<style scoped></style>
