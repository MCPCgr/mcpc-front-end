<template>
  <portal to="header-left">
    <div className="page-title float-left">
      <div className="float-left pt-3">
        <h1 className="text-gray-700 dark:text-gray-200 text-base m-0 ">Төлбөр тооцоо</h1>
        <h2 className="text-gray-400 text-xs m-0"><span>Нэхэмжлэхийн түүх</span></h2>
      </div>
    </div>
  </portal>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12">
      <div class="dark:border-gray-700 dark:bg-gray-600 relative w-full  bg-white transition-all duration-300 rounded-xl overflow-hidden">
        <div class="grid grid-flow-row-dense grid-cols-3 items-center ">
          <div class="flex  items-center gap-4 text-center p-5">
            <div class="relative inline-flex shrink-0 items-center justify-center outline-none h-20 w-20 rounded-full">
              <div class="flex h-full w-full items-center justify-center overflow-hidden text-center transition-all duration-300 rounded-full">
                <img
                    :src="company.company_logo ? `${$base_url}${company.company_logo}` : logo"
                    class="max-h-full max-w-full object-cover shadow-sm dark:border-transparent h-20 w-20"><!---->
                <!----></div>
              <div
                  class="absolute z-10 block overflow-hidden rounded-full bg-white h-8 w-8 bottom-0 right-0">
                <img
                    :src="userInfo.avatar ? `${$base_url}${userInfo.avatar}` : `/assets/icons/duotune/communication/com006.svg`"
                    class="relative h-full w-full scale-90 rounded-full object-cover" alt=""></div><!----></div>
            <div class="text-center md:text-left">
              <h2 class="font-heading text-xl font-light leading-tight text-muted-800 dark:text-white mb-1">{{
                  company.company_name
                }}</h2>
              <span class="text-muted-400 text-sm"> РД: {{ company.company_register }} </span>
            </div>
          </div>
          <div class="text-right pr-4">
            <h3 class="font-heading text-2xl text-gray-700 dark:text-gray-200 mb-0">
              <span> {{ company.amount }} <small class="text-base font-medium">₮ / сар</small></span>
            </h3>
            <p class="font-alt text-base font-normal leading-normal leading-normal">
              <span class="text-muted-400 text-sm"><b>{{company.subscription}}</b> багцын төлбөр </span>
            </p>
          </div>
          <CurrentSubscription @goToSubscription="showSubscription = true" />
        </div>
      </div>
    </div>
  </div>
  <a-modal v-model:open="showSubscription" title="Багц" :footer="null" width="90%">
    <SystemPackages @packageSelected="packageSelected" />
  </a-modal>
  <div class="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-8 mb-6 mt-6">
    <!-- Нийт хөрөнгө, төрөл дүнгээр -->
    <div class="bg-white rounded-xl p-6 dashboard_shadow dark:bg-gray-600">
      <h2 class="font-heading text-xl font-light leading-tight text-muted-800 dark:text-white mb-1">Нэхэмжлэхийн
        түүх</h2>
      <div class="text-sm font-semibold text-second_color h-96">


        <datagrid ref="grid"
                  url="https://api.amjilt.com/main"
                  :schemaID="1060"
                  :paginate="50"


                  :permissions="{c:false, r:true, u:false, d: false}"

                  :filter="gridFilter"


        >
        </datagrid>
      </div>

    </div>


  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from 'vue';
import CurrentSubscription from '~/components/Biling/CurrentSubscription.vue';
import SystemPackages from '~/components/Biling/systemPackages.vue';
import { company, userInfo } from '~/store/useSiteSettings';
import axios from "~/plugins/core/axios";
import { Modal, message } from 'ant-design-vue';

const route = useRoute();

const logo = '/amjilt-erp/images/logo.svg';
const logoDark = '/amjilt-erp/images/logo.svg';

const showSubscription = ref(false);

const gridFilter = { company_id: company.company_id };

// Methods
const packageSelected = (packageData) => {
  // Show confirmation modal
  Modal.confirm({
    title: 'Баталгаажуулах',
    content: 'Та үнэхээр энэ багцыг сонгохыг хүсэж байна уу?',
    okText: 'Тийм',
    cancelText: 'Үгүй',
    onOk() {
      // Update company subscription
      updateSubscription(packageData.id);
    },
    onCancel() {
      console.log('Cancel');
    }
  });
};

const updateSubscription = async (subscription_id) => {
  try {
    const response = await axios.post('/api/update-subscription', {
      company_id: company.value.company_id,
      subscription_id: subscription_id
    });

    if (response.status === 200) {
      message.success('Багц амжилттай шинэчлэгдлээ!');
      window.location.replace("https://amjilt.com/company/billing");
    } else {
      message.error('Багц шинэчлэхэд алдаа гарлаа.');
    }
  } catch (error) {
    message.error('Багц шинэчлэхэд алдаа гарлаа.');
    console.error(error);
  }
};

// Lifecycle hook
onBeforeMount(() => {
  if (route.query.showSubscription) {
    showSubscription.value = true;
  }
});
</script>
