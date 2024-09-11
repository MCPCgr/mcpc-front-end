<template>
  <div class="space-y-3">
    <div class="flex items-center space-x-2">
      <img class="w-6 h-6" src="/amjilthome/icons/our-us.svg"/>
      <h1 class="text-sm text-primary-color dark:text-white font-bold">Хамт олон</h1>
    </div>

    <div class="overflow-x-scroll flex items-center h-auto w-full">
<!--      {{withUserList}}-->
      <div v-for="(withUserListData, Index) in withUserList" :key="Index">
        <div class="rounded-xl p-4 py-6 w-52 h-[248px] bg-gray-50 dark:bg-slate-700 cursor-pointer mr-3" v-if="Index < 10">
          <div class="text-center space-y-2">
            <div class="flex justify-center">
              <img class="w-16 h-16 object-cover rounded-full border border-white dark:border-slate-600" v-if="withUserListData.avatar !== null" :src="IMAGE_URL + withUserListData.avatar"/>
              <img class="w-16 h-16 object-cover rounded-full border border-white dark:border-slate-600" v-else src="/amjilt-erp/images/defaultAvatar.svg"/>
            </div>
            <h1 class="text-sm text-primary-color dark:text-white font-bold">
              {{ withUserListData.firstname }} <br> <span class="text-sm text-gray-500 dark:text-gray-400 font-normal">{{ withUserListData.lastname }}</span>
            </h1>
            <div class="space-y-1 pt-1 pb-3">
              <div class="flex items-center space-x-2">
                <img class="w-[18px] h-[18px]" src="/amjilthome/icons/mail.svg"/>
                <span class="text-xs text-gray-500 dark:text-gray-400 font-normal line-clamp-1">{{ withUserListData.email }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <img class="w-[18px] h-[18px]" src="/amjilthome/icons/phone.svg"/>
                <span class="text-xs text-gray-500 dark:text-gray-400 font-normal">{{ withUserListData.phone_one }}</span>
              </div>
            </div>
            <div class="text-xs text-[#5B2E8F] font-medium">{{ withUserListData.employee_status_id }}</div>
          </div>
        </div>
      </div>

      <div>
        <div class="rounded-xl p-4 py-8 h-[248px] w-52 bg-gray-50 hover:bg-gray-100 duration-500 dark:bg-slate-700 flex items-center justify-center cursor-pointer" @click="MembersAllModal">
          <div class="text-center space-y-2">
            <div class="flex justify-center">
              <div class="w-16 h-16 rounded-full bg-white dark:bg-slate-400 flex items-center justify-center">
                <img class="w-5 h-5" src="/amjilthome/icons/jump.svg"/>
              </div>
            </div>
            <h1 class="text-sm text-primary-color dark:text-white font-bold pb-4">Бусад</h1>
          </div>
        </div>
      </div>
    </div>
  </div>


  <!-- MembersAllModal -->
  <a-modal v-model:open="openMembers" @ok="MembersAllModal" style="width: 1040px !important;">
    <template #title>
      <div class="flex items-center space-x-2">
        <img class="w-6 h-6" src="/amjilthome/icons/our-us.svg"/>
        <h1 class="text-base text-primary-color dark:text-white font-bold">Бүх хамт олон</h1>
      </div>
    </template>
    <div class="overflow-y-scroll h-[480px] py-4">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div v-for="(withUserListData, Index) in withUserList" :key="Index">
          <div class="rounded-xl p-4 py-6 h-60 bg-gray-50 dark:bg-slate-700 cursor-pointer">
            <div class="text-center space-y-2">
              <div class="flex justify-center">
                <img class="w-16 h-16 object-cover rounded-full border border-white" v-if="withUserListData.avatar !== null" :src="IMAGE_URL + withUserListData.avatar"/>
                <img class="w-16 h-16 object-cover rounded-full border border-white" v-else src="/amjilt-erp/images/defaultAvatar.svg"/>
              </div>
              <h1 class="text-sm text-primary-color dark:text-white font-bold">
                {{ withUserListData.firstname }} <br> <span class="text-sm text-gray-500 dark:text-gray-400 font-normal">{{ withUserListData.lastname }}</span>
              </h1>
              <div class="space-y-1 pt-1 pb-3">
                <div class="flex items-center space-x-2">
                  <img class="w-[18px] h-[18px]" src="/amjilthome/icons/mail.svg"/>
                  <span class="text-xs text-gray-500 dark:text-gray-400 font-normal line-clamp-1">{{ withUserListData.email }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <img class="w-[18px] h-[18px]" src="/amjilthome/icons/phone.svg"/>
                  <span class="text-xs text-gray-500 dark:text-gray-400 font-normal">{{ withUserListData.phone_one }}</span>
                </div>
              </div>
              <div class="text-xs text-[#5B2E8F] font-medium">{{ withUserListData.employee_status_id }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="w-full" @click="MembersAllModal = false">
        <a-button class="w-full" type="primary" style="width: 120px; height: 40px !important; box-shadow: none;">Хаах</a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup>
import {getHomeHamtOlon, getNewsAdminList} from "~/graphql/fetch";
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
// const company_id = router.params.company_id;
const route = useRoute();
const currentPage = ref(1);
const pageSize = ref(3);
const withUserList = ref([]);
const withUserItems = ref(0);
const loader = ref(true);
const openMembers = ref(false);
import {userInfo} from "~/store/useSiteSettings";
import {IMAGE_URL} from "~/graphql/queries";

const fetchHomeHamtOlonList = async () => {
  // console.log("userInfo >>> ", userInfo.value.company_id)
  loader.value = true;
  try {
    const data = await getHomeHamtOlon(userInfo.value.company_id, pageSize.value,);
    if (data.emp_with_user && data.emp_with_user.length) {
      withUserList.value = data.emp_with_user;
      withUserItems.value = data.total;
    } else {
      withUserList.value = [];
      withUserItems.value = 0;
      currentPage.value = 1;
    }
  } catch (error) {
    console.error("Failed to fetch travel list:", error);
    withUserList.value = [];
  } finally {
    loader.value = false;
  }
  return {
    loader: true,
  }
};

const MembersAllModal = () => {
  openMembers.value = true;
};

const handleOk = () => {
  console.log(e);
  openMembers.value = false;
};

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchHomeHamtOlonList();
};


onMounted(fetchHomeHamtOlonList);
</script>


<style scoped>

</style>
