<template>

  <div class="max-w-screen-xl mx-auto mt-10 space-y-5 profile-page">
    <div
      class="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
      <div
        class="bg-slate-900 dark:bg-slate-700 absolute overflow-hidden left-0 top-0 md:h-1/1 h-[150px] w-full z-[-1] rounded-t-lg">


        <img src="https://beta.tatatonga.com/amjilt-erp/images/cover.png" class="h-auto w-full object-cover"
             id="profile-banner" alt="">
      </div>
      <div class="profile-box flex-none md:text-start text-center">
        <div class="md:flex items-end md:space-x-6 rtl:space-x-reverse">
          <div class="flex-none">
            <div
              class="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
              <img :src="base_url+userInfo.avatar" alt="" class="w-full h-full object-cover rounded-full"><a
              href="/app/profile-setting"
              class="router-link-active router-link-exact-active absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
              aria-current="page"><span><svg xmlns="http://www.w3.org/2000/svg"
                                             xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                                             width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
                                             viewBox="0 0 24 24" class="iconify iconify--heroicons"><path fill="none"
                                                                                                          stroke="currentColor"
                                                                                                          stroke-linecap="round"
                                                                                                          stroke-linejoin="round"
                                                                                                          stroke-width="1.5"
                                                                                                          d="m16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path></svg></span></a>
            </div>
          </div>
          <div class="flex-1">
            <div class="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]"> {{ userInfo.last_name }} {{ userInfo.first_name }}</div>
            <div class="text-sm font-light text-slate-600 dark:text-slate-400"> {{ userInfo.email }}</div>
          </div>
        </div>
      </div>
      <div class="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
        <div class="flex-1">
          <div class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"> $32,400</div>
          <div class="text-sm text-slate-600 font-light dark:text-slate-300"> Total Balance</div>
        </div>
        <div class="flex-1">
          <div class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"> 200</div>
          <div class="text-sm text-slate-600 font-light dark:text-slate-300"> Board Card</div>
        </div>
        <div class="flex-1">
          <div class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"> 3200</div>
          <div class="text-sm text-slate-600 font-light dark:text-slate-300"> Calender Events</div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6">
      <div class="lg:col-span-3 col-span-12">
        <div class="card rounded-md bg-white dark:bg-slate-800 lg:h-full  shadow-base" data-v-cda99232="">
          <div class="card-body flex flex-col p-6" data-v-cda99232="">

            <div class=" border-gray-100 dark:border-gray-700">
              <ul class="list-none sidebar-nav mb-0 mt-3" id="navmenu-nav">

                <NavItem v-for="menu in menus"
                         :key="menu.index"
                         :title="menu.title"
                         :to="menu.to"
                         :icon="menu.icon"
                ></NavItem>


              </ul>
            </div>
          </div>
        </div><!----></div>
      <div class="lg:col-span-9 col-span-12">
        <div class="card rounded-md bg-white dark:bg-slate-800 lg:h-full  shadow-base" data-v-cda99232="">
          <div class="card-body flex flex-col p-6" data-v-cda99232="">
            <header class="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5  -mx-6 px-6"
                    data-v-cda99232="">
              <div class="flex-1" data-v-cda99232="">
                <div class="card-title text-slate-900 dark:text-white flex ">
                  <span class="svg-icon mr-2.5">
                            <inline-svg
                              src="/assets/icons/duotune/communication/com006.svg"
                            />
                        </span> <span>Хувийн мэдээлэл</span>
                </div><!---->
              </div><!----></header><!---->
            <div class="card-text h-full" data-v-cda99232="">
              <div class="vue-apexcharts" style="min-height: 265px;">
                <div id="apexchartsxu1sfagb" class="apexcharts-canvas apexchartsxu1sfagb apexcharts-theme-light"
                     style="width: 899px; height: 250px;">

                  <div class="apexcharts-legend" style="max-height: 125px;"></div>
                  <div class="apexcharts-tooltip apexcharts-theme-dark">
                    <div class="apexcharts-tooltip-title"
                         style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"></div>
                    <div class="apexcharts-tooltip-series-group" style="order: 1;"><span
                      class="apexcharts-tooltip-marker" style="background-color: rgb(70, 105, 250);"></span>
                      <div class="apexcharts-tooltip-text"
                           style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
                        <div class="apexcharts-tooltip-y-group"><span
                          class="apexcharts-tooltip-text-y-label"></span><span
                          class="apexcharts-tooltip-text-y-value"></span></div>
                        <div class="apexcharts-tooltip-goals-group"><span
                          class="apexcharts-tooltip-text-goals-label"></span><span
                          class="apexcharts-tooltip-text-goals-value"></span></div>
                        <div class="apexcharts-tooltip-z-group"><span
                          class="apexcharts-tooltip-text-z-label"></span><span
                          class="apexcharts-tooltip-text-z-value"></span></div>
                      </div>
                    </div>
                  </div>
                  <div class="apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom apexcharts-theme-dark">
                    <div class="apexcharts-xaxistooltip-text"
                         style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;"></div>
                  </div>
                  <div
                    class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-dark">
                    <div class="apexcharts-yaxistooltip-text"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div><!----></div>
    </div>
  </div>
  <section class="relative lg:pb-24 pb-16">
    <div class="container-fluid">
      <div class="profile-banner relative text-transparent">
        <input id="pro-banner" name="profile-banner" type="file" class="hidden" onchange="loadFile(event)">
        <div class="relative shrink-0">
          <img src="https://beta.tatatonga.com/amjilt-erp/images/cover.png" class="h-80 w-full object-cover"
               id="profile-banner" alt="">
          <div class="absolute inset-0 "></div>
          <label class="absolute inset-0 cursor-pointer" for="pro-banner"></label>
        </div>
      </div>
    </div><!--end container-->

    <div class="container max-w-screen-xl mx-auto mt-10">
      <div class="md:flex">
        <div class="lg:w-1/4 md:w-1/3 md:px-3">
          <div class="relative md:-mt-36 -mt-32">
            <div class="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
              <div class="profile-pic text-center mb-5">
                <input id="pro-img" name="profile-image" type="file" class="hidden" onchange="loadFile(event)">
                <div>
                  <div class="relative h-28 w-28 mx-auto">
                    <img :src="base_url+userInfo.avatar"
                         class="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                         id="profile-image" alt="">
                    <label class="absolute inset-0 cursor-pointer" for="pro-img"></label>
                  </div>

                  <div class="mt-4">
                    <h5 class="text-lg font-semibold">{{ userInfo.last_name }} {{ userInfo.first_name }}</h5>
                    <p class="text-slate-400">{{ userInfo.email }}</p>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-100 dark:border-gray-700">
                <ul class="list-none sidebar-nav mb-0 mt-3" id="navmenu-nav">

                  <NavItem v-for="menu in menus"
                           :key="menu.index"
                           :title="menu.title"
                           :to="menu.to"
                           :icon="menu.icon"
                  ></NavItem>


                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:w-3/4 md:w-2/3 md:px-3 md:mt-0">
          <div class="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
            <h6 class="text-slate-400 mb-0">The following addresses will be used on the checkout page by default.</h6>
            <div class="md:flex mt-6">
              <div class="md:w-1/2 md:px-3">
                <div class="flex items-center mb-4 justify-between">
                  <h5 class="text-xl font-semibold">Billing Address:</h5>
                  <a href="#" class="text-indigo-600 text-lg"><i class="uil uil-edit align-middle"></i></a>
                </div>
                <div class="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p class="text-lg font-semibold mb-2">Jenny Jimenez</p>

                  <ul class="list-none">
                    <li class="flex">
                      <i class="uil uil-map-marker text-lg ltr:mr-2 rtl:ml-2"></i>
                      <p class="text-slate-400">C/54 Northwest Freeway, Suite 558, <br> Houston, USA 485</p>
                    </li>

                    <li class="flex mt-1">
                      <i class="uil uil-phone text-lg ltr:mr-2 rtl:ml-2"></i>
                      <p class="text-slate-400">+123 897 5468</p>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="md:w-1/2 md:px-3 mt-[30] md:mt-0">
                <div class="flex items-center mb-4 justify-between">
                  <h5 class="text-xl font-semibold">Shipping Address:</h5>
                  <a href="#" class="text-indigo-600 text-lg"><i class="uil uil-edit align-middle"></i></a>
                </div>
                <div class="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <p class="text-lg font-semibold mb-2">Jenny Jimenez</p>

                  <ul class="list-none">
                    <li class="flex">
                      <i class="uil uil-map-marker text-lg ltr:mr-2 rtl:ml-2"></i>
                      <p class="text-slate-400">C/54 Northwest Freeway, Suite 558, <br> Houston, USA 485</p>
                    </li>

                    <li class="flex mt-1">
                      <i class="uil uil-phone text-lg ltr:mr-2 rtl:ml-2"></i>
                      <p class="text-slate-400">+123 897 5468</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div><!--end grid-->
    </div><!--end container-->
  </section>

</template>

<script>
import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
import {base_url} from "~/consts/const";
import NavItem from "~/components/User/NavItem.vue";

definePageMeta({
  layout: 'app',
})
export default {
  name: "profile",
  components: {
    NavItem
  },
  data() {
    const userInfo = ls.get(USER_INFO);
    return {
      userInfo,
      base_url,
      menus: [
        {
          title: "Хувийн мэдээлэл",
          icon: "/assets/icons/duotune/communication/com006.svg",
          to: "/user/profile",
        },
        {
          title: "Гэр бүлийн байдал",
          icon: "/assets/icons/duotone/Communication/Group.svg",
          to: "/user/profile2",
        },
        {
          title: "Боловсрол",
          icon: "/assets/icons/duotone/Home/Book-open.svg",
          to: "/user/profile2",
        },
        {
          title: "Ур чадвар",
          icon: "/assets/icons/duotune/general/gen002.svg",
          to: "/user/profile2",
        },
        {
          title: "Сургалт, дамжаа, курс",
          icon: "/assets/icons/duotone/Design/Verified.svg",
          to: "/user/profile2",
        },
        {
          title: "Туршлага",
          icon: "/assets/icons/duotune/finance/fin006.svg",
          to: "/user/profile2",
        },
        {
          title: "Тохиргоо",
          icon: "/assets/icons/duotune/general/gen019.svg",
          to: "/user/profile2",
        },
        {
          title: "Гарах",
          icon: "/assets/icons/duotone/Interface/Sign-Out.svg",
          to: "/user/profile2",
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
