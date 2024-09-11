<template>
<!--  <div class="bg-white dark:bg-slate-900">-->
<!--    <div class="relative lg:pb-80">-->
<!--      <a-image class="hidden lg:block" src="/amjilthome/bigImage/people-banner.jpg"/>-->
<!--      <div class="lg:absolute w-full">-->
<!--        <div class="relative max-w-6xl mx-auto lg:-mt-36 px-6">-->
<!--          <div class="p-5 pt-8 ignore not-prose bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg">-->
<!--            <div class="text-center">-->
<!--              <h1 class="text-4xl/tight font-medium mt-3 mb-4">{{ $t("home.features") }}</h1>-->
<!--            </div>-->
<!--            <div class="p-6">-->
<!--              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 not-prose">-->
<!--                <div class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">-->
<!--                  <span class="absolute w-full h-full bg-white dark:bg-slate-900 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-gray-50 group-hover:bg-opacity-30"></span>-->
<!--                  <div class="flex items-center justify-between w-full mb-4 ">-->
<!--                    <img alt="" class="relative object-contain dark:block hidden h-16 w-16 flex-none" src="/amjilthome/icons/highlight-1_w.svg"/>-->
<!--                    <img alt="" class="relative object-contain dark:hidden block h-16 w-16 flex-none" src="/amjilthome/icons/highlight-1.svg"/>-->
<!--&lt;!&ndash;                    <span class="opacity-0 -translate-x-2 flex-shrink-0 group-hover:translate-x-0 py-1 px-3 text-xs group-hover:opacity-100 transition-all ease-out duration-200 rounded-full bg-blue-50 dark:bg-blue-500 dark:text-white text-blue-500 flex items-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;                      <span>Хандах</span>&ndash;&gt;-->
<!--&lt;!&ndash;                      <font-awesome-icon class="ml-2" icon="fa-solid fa-angle-right" />&ndash;&gt;-->
<!--&lt;!&ndash;                    </span>&ndash;&gt;-->
<!--                  </div>-->
<!--                  <span class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("home.features_1") }}</span>-->
<!--                  <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400 pt-2 text-justify">{{ $t("home.features_text_1") }}</span>-->
<!--                </div>-->
<!--                <div class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">-->
<!--                  <span class="absolute w-full h-full bg-white dark:bg-slate-900 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-gray-50 group-hover:bg-opacity-30"></span>-->
<!--                  <div class="flex items-center justify-between w-full mb-4 ">-->
<!--                    <img alt="" class="relative object-contain dark:block hidden h-16 w-16 flex-none" src="/amjilthome/icons/highlight-2_w.svg"/>-->
<!--                    <img alt="" class="relative object-contain dark:hidden block h-16 w-16 flex-none" src="/amjilthome/icons/highlight-2.svg"/>-->
<!--&lt;!&ndash;                    <span class="opacity-0 -translate-x-2 flex-shrink-0 group-hover:translate-x-0 py-1 px-3 text-xs group-hover:opacity-100 transition-all ease-out duration-200 rounded-full bg-blue-50 dark:bg-blue-500 dark:text-white text-blue-500 flex items-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;                      <span>Хандах</span>&ndash;&gt;-->
<!--&lt;!&ndash;                      <font-awesome-icon class="ml-2" icon="fa-solid fa-angle-right" />&ndash;&gt;-->
<!--&lt;!&ndash;                    </span>&ndash;&gt;-->
<!--                  </div>-->
<!--                  <span class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("home.features_2") }}</span>-->
<!--                  <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400 pt-2 text-justify">{{ $t("home.features_text_2") }}</span>-->
<!--                </div>-->
<!--                <div class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">-->
<!--                  <span class="absolute w-full h-full bg-white dark:bg-slate-900 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-gray-50 group-hover:bg-opacity-30"></span>-->
<!--                  <div class="flex items-center justify-between w-full mb-4 ">-->
<!--                    <img alt="" class="relative object-contain dark:block hidden h-16 w-16 flex-none" src="/amjilthome/icons/highlight-3_w.svg"/>-->
<!--                    <img alt="" class="relative object-contain dark:hidden block h-16 w-16 flex-none" src="/amjilthome/icons/highlight-3.svg"/>-->
<!--&lt;!&ndash;                    <span class="opacity-0 -translate-x-2 flex-shrink-0 group-hover:translate-x-0 py-1 px-3 text-xs group-hover:opacity-100 transition-all ease-out duration-200 rounded-full bg-blue-50 dark:bg-blue-500 dark:text-white text-blue-500 flex items-center justify-center">&ndash;&gt;-->
<!--&lt;!&ndash;                      <span>Хандах</span>&ndash;&gt;-->
<!--&lt;!&ndash;                      <font-awesome-icon class="ml-2" icon="fa-solid fa-angle-right" />&ndash;&gt;-->
<!--&lt;!&ndash;                    </span>&ndash;&gt;-->
<!--                  </div>-->
<!--                  <span class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("home.features_3") }}</span>-->
<!--                  <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400 pt-2 text-justify">{{ $t("home.features_text_3") }}</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
// export default {
//   name: "featured-solutions"
// }
</script>

<style scoped>

</style>
