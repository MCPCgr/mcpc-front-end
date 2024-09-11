<template>
<!--  <div class="dark:bg-slate-900 pt-40">-->
<!--    <div class="h-full bg-yellow-400">-->
<!--      <div class="absolute w-full">-->
<!--        <div class="container mx-auto max-w-6xl	px-6 lg:-mt-44 -mt-32">-->
<!--          <div class="rounded-xl p-6 bg-white dark:bg-slate-800">-->
<!--            <div class="grid md:grid-cols-12 grid-cols-1 gap-10 flex items-center relative">-->
<!--              <div class="lg:col-span-7 md:col-span-12 col-span-1 space-y-4 py-2">-->
<!--                <p class="text-base font-medium leading-5 lg:text-left text-center">{{ $t("footer.text") }}</p>-->
<!--                <div class="grid md:grid-cols-4 grid-cols-2 gap-2 m-6 relative">-->
<!--                  <div class="group">-->
<!--                    <div class="flex flex-col items-center justify-center bg-regal-purple p-5 text-sm rounded-xl text-center group-hover:bg-white border border-purple-600 h-full text-white group-hover:text-regal-purple transition-all duration-500">-->
<!--                      <img alt="" class="object-contain group-hover:hidden block" src="/amjilthome/icons/banner/udirdlaga_w.svg"/>-->
<!--                      <img alt="" class="object-contain group-hover:block hidden" src="/amjilthome/icons/banner/udirdlaga.svg"/>-->
<!--                      <span class="pt-2">{{ $t("infoBanner.manaigingTeam") }}</span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="group">-->
<!--                    <div class="flex flex-col items-center justify-center bg-regal-purple p-5 text-sm rounded-xl text-center group-hover:bg-white border border-purple-600 h-full text-white group-hover:text-regal-purple transition-all duration-500">-->
<!--                      <img alt="" class="object-contain group-hover:hidden block" src="/amjilthome/icons/banner/sanhuu_w.svg"/>-->
<!--                      <img alt="" class="object-contain group-hover:block hidden" src="/amjilthome/icons/banner/sanhuu.svg"/>-->
<!--                      <span class="pt-2">{{ $t("infoBanner.finance") }}</span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="group">-->
<!--                    <div class="flex flex-col items-center justify-center bg-regal-purple p-5 text-sm rounded-xl text-center group-hover:bg-white border border-purple-600 h-full text-white group-hover:text-regal-purple transition-all duration-500">-->
<!--                      <img alt="" class="object-contain group-hover:hidden block" src="/amjilthome/icons/banner/huniinuuts_w.svg"/>-->
<!--                      <img alt="" class="object-contain group-hover:block hidden" src="/amjilthome/icons/banner/huniinuuts.svg"/>-->
<!--                      <span class="pt-2">{{ $t("infoBanner.humanResource") }}</span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="group">-->
<!--                    <div class="flex flex-col items-center justify-center bg-regal-purple p-5 text-sm rounded-xl text-center group-hover:bg-white border border-purple-600 h-full text-white group-hover:text-regal-purple transition-all duration-500">-->
<!--                      <img alt="" class="object-contain group-hover:hidden block" src="/amjilthome/icons/banner/borluulalt_w.svg"/>-->
<!--                      <img alt="" class="object-contain group-hover:block hidden" src="/amjilthome/icons/banner/borluulalt.svg"/>-->
<!--                      <span class="pt-2">{{ $t("infoBanner.sales") }}</span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="group">-->
<!--                    <div class="flex flex-col items-center justify-center bg-regal-purple p-5 text-sm rounded-xl text-center group-hover:bg-white border border-purple-600 h-full text-white group-hover:text-regal-purple transition-all duration-500">-->
<!--                      <img alt="" class="object-contain group-hover:hidden block" src="/amjilthome/icons/banner/Ajiltan_w.svg"/>-->
<!--                      <img alt="" class="object-contain group-hover:block hidden" src="/amjilthome/icons/banner/Ajiltan.svg"/>-->
<!--                      <span class="pt-2">{{ $t("infoBanner.employee") }}</span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="group">-->
<!--                    <div class="flex flex-col items-center justify-center bg-regal-purple p-5 text-sm rounded-xl text-center group-hover:bg-white border border-purple-600 h-full text-white group-hover:text-regal-purple transition-all duration-500">-->
<!--                      <img alt="" class="object-contain group-hover:hidden block" src="/amjilthome/icons/banner/cassir_w.svg"/>-->
<!--                      <img alt="" class="object-contain group-hover:block hidden" src="/amjilthome/icons/banner/cassir.svg"/>-->
<!--                      <span class="pt-2">{{ $t("infoBanner.casser") }}</span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="group">-->
<!--                    <div class="flex flex-col items-center justify-center bg-regal-purple p-5 text-sm rounded-xl text-center group-hover:bg-white border border-purple-600 h-full text-white group-hover:text-regal-purple transition-all duration-500">-->
<!--                      <img alt="" class="object-contain group-hover:hidden block" src="/amjilthome/icons/banner/nyrav_w.svg"/>-->
<!--                      <img alt="" class="object-contain group-hover:block hidden" src="/amjilthome/icons/banner/nyrav.svg"/>-->
<!--                      <span class="pt-2">{{ $t("infoBanner.treasurer") }}</span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="group">-->
<!--                    <div class="flex flex-col items-center justify-center bg-regal-purple p-5 text-sm rounded-xl text-center group-hover:bg-white border border-purple-600 h-full text-white group-hover:text-regal-purple transition-all duration-500">-->
<!--                      <img alt="" class="object-contain group-hover:hidden block" src="/amjilthome/icons/banner/hudaldagch_w.svg"/>-->
<!--                      <img alt="" class="object-contain group-hover:block hidden" src="/amjilthome/icons/banner/hudaldagch.svg"/>-->
<!--                      <span class="pt-2">{{ $t("infoBanner.seller") }}</span>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="lg:col-span-5 lg:block hidden">-->
<!--                <img alt="" class="object-contain absolute xl:-right-48 -right-10 xl:-bottom-16 bottom-5 xl:w-7/12 w-6/12" src="/amjilthome/images/small-banner.svg"/>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="container mx-auto px-6 md:pt-56 pt-[450px] pb-20">-->
<!--        <div class="grid md:grid-cols-2 grid-cols-1 md:divide-x-[1px] md:divide-y-0 divide-y-[1px] divide-dashed divide-slate-500">-->
<!--          <div class="flex flex-col lg:pl-18 md:px-16 lg:pr-4 md:pt-0 pt-10 space-y-10">-->
<!--            <div class="space-y-2 dark:text-slate-900">-->
<!--              <span class="uppercase text-xs font-medium">{{ $t("home.allInOneSuite") }}</span>-->
<!--              <p class=" font-medium lg:text-5xl/tight text-3xl/tight">{{ $t("home.Learn") }}</p>-->
<!--              <p class="font-light">{{ $t("home.Learn_Text") }}</p>-->
<!--            </div>-->
<!--            <div class="button-login">-->
<!--              <a-button type="primary" @click="showModalLms = true">{{ $t("home.contactSales") }}</a-button>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="flex flex-col lg:pl-24 md:pl-16 md:pt-0 pt-10 space-y-10">-->
<!--            <div class="space-y-2 dark:text-slate-900">-->
<!--              <span class="uppercase text-xs font-medium">{{ $t("home.allInOneSuite") }}</span>-->
<!--              <p class=" font-medium lg:text-5xl/tight text-3xl/tight">{{ $t("home.Pos") }}</p>-->
<!--              <p class="font-light">{{ $t("home.Pos_Text") }}</p>-->
<!--            </div>-->
<!--            <div class="button-login">-->
<!--              <a-button type="primary" @click="showModalPos = true">{{ $t("home.contactSales") }}</a-button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="grid md:grid-cols-2 grid-cols-1 md:divide-x-[1px] md:divide-y-0 divide-y-[1px] divide-dashed divide-slate-500">-->

<!--          <div class="flex flex-col lg:pl-18 md:pl-16 lg:pr-4 md:pt-0 pt-10 space-y-10">-->
<!--            <div class="space-y-2 dark:text-slate-900">-->
<!--              <span class="uppercase text-xs font-medium">{{ $t("home.allInOneSuite") }}</span>-->
<!--              <p class=" font-medium lg:text-5xl/tight text-3xl/tight">{{ $t("home.Booking") }}</p>-->
<!--              <p class="font-light">{{ $t("home.Booking_Text") }}</p>-->
<!--            </div>-->
<!--            <div class="button-login">-->
<!--              <a-button type="primary" @click="showModalBooking = true">{{ $t("home.contactSales") }}</a-button>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="flex flex-col lg:pl-24 md:pl-16 md:pt-0 pt-10 space-y-10">-->
<!--            <div class="space-y-2 dark:text-slate-900">-->
<!--              <span class="uppercase text-xs font-medium">{{ $t("home.allInOneSuite") }}</span>-->
<!--              <p class=" font-medium lg:text-5xl/tight text-3xl/tight">{{ $t("home.WORk") }}</p>-->
<!--              <p class="font-light">{{ $t("home.WORk_Text") }}</p>-->
<!--            </div>-->
<!--            <div class="button-login">-->
<!--              <a-button type="primary" @click="showModalWORk = true">{{ $t("home.contactSales") }}</a-button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->


<!--  <a-modal v-model:open="showModalLms" :title="$t('home.Learn')" :footer="false">-->
<!--    <div class="space-y-8 uppercase py-2">-->
<!--      <div class="flex flex-col lg:text-xs text-[11px] opacity-80 space-y-5">-->
<!--        <div class="group flex flex-row space-x-3">-->
<!--          <nuxt-link><span class="group-hover:text-regal-purple">{{ $t("footer.salesteam") }} :</span></nuxt-link>-->
<!--          <p>+976 8080- 3910</p>-->
<!--        </div>-->
<!--        <div class="group flex flex-row space-x-3">-->
<!--          <nuxt-link><span class="group-hover:text-regal-purple">{{ $t("footer.salesteam") }} :</span></nuxt-link>-->
<!--          <p>+976 8953- 6060</p>-->
<!--        </div>-->
<!--        <div class="group flex flex-row space-x-3">-->
<!--          <nuxt-link><span class="group-hover:text-regal-purple">{{ $t("footer.lauchTeam") }}:</span></nuxt-link>-->
<!--          <p>+976 8518-2142</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--  </a-modal>-->
<!--  <a-modal v-model:open="showModalPos" :title="$t('home.Pos')" :footer="false">-->
<!--    <div class="space-y-8 uppercase py-2">-->
<!--      <div class="flex flex-col lg:text-xs text-[11px] opacity-80 space-y-5">-->
<!--        <div class="group flex flex-row space-x-3">-->
<!--          <nuxt-link><span class="group-hover:text-regal-purple">{{ $t("footer.salesteam") }} :</span></nuxt-link>-->
<!--          <p>+976 8064-6060</p>-->
<!--        </div>-->
<!--        <div class="group flex flex-row space-x-3">-->
<!--          <nuxt-link><span class="group-hover:text-regal-purple">{{ $t("footer.lauchTeam") }}:</span></nuxt-link>-->
<!--          <p>+976 8602-6061</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </a-modal>-->
<!--  <a-modal v-model:open="showModalBooking" :title="$t('home.Booking')" :footer="false">-->
<!--    <div class="space-y-8 uppercase py-2">-->
<!--      <div class="flex flex-col lg:text-xs text-[11px] opacity-80 space-y-5">-->
<!--        <div class="group flex flex-row space-x-3">-->
<!--          <nuxt-link><span class="group-hover:text-regal-purple">{{ $t("footer.salesteam") }} :</span></nuxt-link>-->
<!--          <p>+976 7711-6060</p>-->
<!--        </div>-->
<!--        <div class="group flex flex-row space-x-3">-->
<!--          <nuxt-link><span class="group-hover:text-regal-purple">{{ $t("footer.lauchTeam") }}:</span></nuxt-link>-->
<!--          <p>+976 8602-6061</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </a-modal>-->
<!--  <a-modal v-model:open="showModalWORk" :title="$t('home.WORk')" :footer="false">-->
<!--    <div class="space-y-8 uppercase py-2">-->
<!--      <div class="flex flex-col lg:text-xs text-[11px] opacity-80 space-y-5">-->
<!--        <div class="group flex flex-row space-x-3">-->
<!--          <nuxt-link><span class="group-hover:text-regal-purple">{{ $t("footer.salesteam") }} :</span></nuxt-link>-->
<!--          <p>+976 8648-6060</p>-->
<!--        </div>-->
<!--        <div class="group flex flex-row space-x-3">-->
<!--          <nuxt-link><span class="group-hover:text-regal-purple">{{ $t("footer.lauchTeam") }}:</span></nuxt-link>-->
<!--          <p>+976 8602-6061</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </a-modal>-->

</template>

<script>
// export default {
//   name: "introduction-banner",
//   data(){
//     return{
//       showModalPos: false,
//       showModalLms: false,
//       showModalWORk: false,
//       showModalBooking: false,
//     }
//   }
// }
</script>

<style scoped>

</style>
