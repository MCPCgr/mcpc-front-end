<template>
  <div>
    <Head>
      <Title>Амжилт байгууллагын нэгдсэн систем</Title>
      <Meta name="url" content="https://amjilt.com" />
      <Meta name="type" content="news" />
      <Meta name="title" content="Амжилт байгууллагын нэгдсэн систем" />
      <Meta name="description" content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн." />
      <Meta name="image" content="https://amjilt.com/images/home-banner.png" />
      <Meta property="og:url" content="https://amjilt.com" />
      <Meta property="og:type" content="news" />
      <Meta property="og:title" content="Амжилт байгууллагын нэгдсэн систем" />
      <Meta property="og:description" content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн." />
      <Meta property="og:image" content="https://amjilt.com/images/home-banner.png" />
    </Head>

    <section class="bg-gray-100 dark:bg-slate-900 xl:py-20 py-14 flex justify-center">
      <div class="absolute top-0 inset-x-0 hidden sm:block">
        <img src="/amjilthome/images/white-wave.svg" alt="svg" class="w-full -scale-x-100">
      </div>
      <div class="container max-w-6xl px-6 space-y-16 mx-auto aos-init aos-animate" data-aos="fade-up" data-aos-duration="1500">
        <div class="flex flex-col items-center text-center">
          <h1 class="text-4xl/tight font-medium mt-3 mb-4"> {{ $t("common.supportTitle") }}</h1>
          <p class="text-slate-500 w-9/12">{{ $t("common.supportText") }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 not-prose">
          <nuxt-link to="/guide" class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">
            <span class="absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-gray-50 group-hover:bg-opacity-30"></span>
            <div class="flex items-center justify-between w-full mb-4 ">
              <img alt="" class="relative object-contain dark:block hidden h-16 w-16 flex-none" src="/amjilthome/icons/help/manual_w.svg"/>
              <img alt="" class="relative object-contain dark:hidden block h-16 w-16 flex-none" src="/amjilthome/icons/help/manual.svg"/>
              <span class="opacity-0 -translate-x-2 flex-shrink-0 group-hover:translate-x-0 py-1 px-3 text-xs group-hover:opacity-100 transition-all ease-out duration-200 rounded-full bg-blue-50 dark:bg-blue-500 dark:text-white text-blue-500 flex items-center justify-center">
                {{ $t("home.detail") }}
                <font-awesome-icon class="ml-2" icon="fa-solid fa-angle-right" />
              </span>
            </div>
            <span class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("common.docVideoTutorials") }}</span>
            <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400 pt-2 text-justify">{{ $t("common.docVideoTutorials_text") }}</span>
          </nuxt-link>
          <nuxt-link to="/faq" class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">
            <span class="absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-gray-50 group-hover:bg-opacity-30"></span>
            <div class="flex items-center justify-between w-full mb-4 ">
              <img alt="" class="relative object-contain dark:block hidden h-16 w-16 flex-none" src="/amjilthome/icons/help/faq_w.svg"/>
              <img alt="" class="relative object-contain dark:hidden block h-16 w-16 flex-none" src="/amjilthome/icons/help/faq.svg"/>
              <span class="opacity-0 -translate-x-2 flex-shrink-0 group-hover:translate-x-0 py-1 px-3 text-xs group-hover:opacity-100 transition-all ease-out duration-200 rounded-full bg-blue-50 dark:bg-blue-500 dark:text-white text-blue-500 flex items-center justify-center">
                {{ $t("home.detail") }}
                <font-awesome-icon class="ml-2" icon="fa-solid fa-angle-right" />
              </span>
            </div>
            <span class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("common.FAQ") }}</span>
            <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400 pt-2 text-justify">{{ $t("common.FAQ_text") }}</span>
          </nuxt-link>
          <div class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">
            <span class="absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-gray-50 group-hover:bg-opacity-30"></span>
            <div class="flex items-center justify-between w-full mb-4 ">
              <img alt="" class="relative object-contain dark:block hidden h-16 w-16 flex-none" src="/amjilthome/icons/help/feedback_w.svg"/>
              <img alt="" class="relative object-contain dark:hidden block h-16 w-16 flex-none" src="/amjilthome/icons/help/feedback.svg"/>
              <span @click="showLogin()" class="opacity-0 -translate-x-2 flex-shrink-0 group-hover:translate-x-0 py-1 px-3 text-xs group-hover:opacity-100 transition-all ease-out duration-200 rounded-full bg-blue-50 dark:bg-blue-500 dark:text-white text-blue-500 flex items-center justify-center">
                {{ $t("home.access") }}
                <font-awesome-icon class="ml-2" icon="fa-solid fa-angle-right" />
              </span>
            </div>
            <span class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("common.userassistance") }}</span>
            <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400 pt-2 text-justify">{{ $t("common.userassistance_text") }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>
<script>
import { createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

import { Modal } from 'ant-design-vue';
export default {
  beforeCreate() {
    definePageMeta({
      layout: 'home',
    })
  },
  methods:{
    showLogin(){
      Modal.confirm({
        title: 'Хэрэглэгчийн дэмжлэг',
        icon: createVNode(ExclamationCircleOutlined),
        okText:"Нэвтрэх",
        cancelText:"Болих",
        content: createVNode('div', { style: '' }, 'Хэрэглэгчийн дэмжлэг авхын тулд систем нэврэнэ үү'),
        onOk() {
          var url = `/auth/login?support=true`;
          window.open(url, "_blank");
        },
        onCancel() {
          console.log('Cancel');
        },
        class: 'test',
      });
    }
  }
}
</script>



<style scoped>

</style>
