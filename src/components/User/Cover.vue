<template>
  <div
    class="profiel-wrap px-[35px] pb-10 md:pt-[164px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
    <div class="absolute left-0 top-0 md:h-[250px] h-[150px] overflow-hidden w-full z-[-1] rounded-t-lg flex items-center justify-center">




      <img alt="image" class="h-full w-auto md:h-auto md:w-full object-cover" v-if="userInfo.cover" :src="$base_url+userInfo.cover">
      <img alt="image" class="h-full w-auto md:h-auto md:w-full object-cover" v-else :src="`/amjilt-erp/images/cover.png`">
    </div>
    <div class="profile-box flex-none md:text-start text-center">
      <div class="md:flex items-end md:space-x-6 rtl:space-x-reverse">
        <div class="flex-none">
          <div
            class="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
            <img :src="$base_url+userInfo.avatar" v-if="userInfo.avatar" alt="" class="w-full h-full object-cover rounded-full">

            <div class="bg-gray-300 w-full h-full object-cover rounded-full" v-else>
              <span class="svg-icon-white w-full h-full" >

                      <inline-svg class="w-full h-full"
                        src="/assets/icons/duotune/communication/com006.svg"
                      />
                </span>&nbsp;
            </div>
<!--            <nuxt-link v-if="currentUser && currentUser.login === userInfo.login"-->
<!--            :to="`/user/${userInfo.login}`"-->
<!--            class="router-link-active router-link-exact-active absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"-->
<!--            aria-current="page"><span>-->
<!--              <svg xmlns="http://www.w3.org/2000/svg"-->
<!--                                           xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"-->
<!--                                           width="1em" height="1em" preserveAspectRatio="xMidYMid meet"-->
<!--                                           viewBox="0 0 24 24" class="iconify iconify&#45;&#45;heroicons">-->
<!--                <path fill="none"-->
<!--                                                                                                        stroke="currentColor"-->
<!--                                                                                                        stroke-linecap="round"-->
<!--                                                                                                        stroke-linejoin="round"-->
<!--                                                                                                        stroke-width="1.5"-->
<!--                                                                                                        d="m16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>-->
<!--              </svg>-->
<!--            </span>-->
<!--            </nuxt-link>-->
          </div>
        </div>
        <div class="flex-1">
          <div class="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]"> {{ userInfo.last_name }}
            {{ userInfo.first_name }}
          </div>
          <div class="text-sm font-light text-slate-600 dark:text-slate-400">    <nuxt-link  :to="`/user/${userInfo.login}` ">{{userInfo.login}}</nuxt-link>  {{
              userInfo.showPhoneEmail ? ' / '+ userInfo.email : ''
            }}
          </div>
        </div>
      </div>
    </div>
    <div class="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
      <div class="flex-1">
        <!--          <div class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"> {{ userInfo.email }}</div>-->
        <!--          <div class="text-sm text-slate-600 font-light dark:text-slate-300"> И-мэйл</div>-->
      </div>

      <div class="flex-1">
<!--        <div class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"> 3200</div>-->
<!--        <div class="text-sm text-slate-600 font-light dark:text-slate-300"> Дуусагсан даалгавар</div>-->
      </div>
      <div class="flex-1" v-if="userInfo.showPhoneEmail">
        <div class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1 text-right" > {{ userInfo.phone }}</div>
        <div class="text-sm text-slate-600 font-light dark:text-slate-300 text-right"> Утас</div>
      </div>
    </div>
  </div>
</template>

<script>
import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";


export default {
  name: "Cover",
  props:["userInfo"],
  data(){
    const currentUser = ls.get(USER_INFO);
    return {
      currentUser
    }
  }
}
</script>

<style scoped>

</style>
