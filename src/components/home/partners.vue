<template>
<!--  <div class="bg-white dark:bg-slate-900">-->
<!--&lt;!&ndash;<img src="/amjilthome/ehlel.png">&ndash;&gt;-->
<!--    <div id="swiper_style" class="container mx-auto	px-6 py-16 space-y-10">-->
<!--      <div class="text-center mx-auto px-6">-->
<!--        <h1 class="text-4xl/tight font-medium mt-3 mb-4">{{ $t("home.partners") }}</h1>-->
<!--        <p class="text-slate-500">{{ $t("home.partnersTailbar") }}</p>-->
<!--      </div>-->

<!--      <div class="swiper_style_contact">-->
<!--        <swiper :modules="modules"-->
<!--                :slidesPerView="'auto'"-->
<!--                :spaceBetween="20"-->
<!--                :speed="700"-->
<!--                :autoHeight="true"-->
<!--                :autoplay="{delay: 2400, disableOnInteraction: false,}"-->
<!--                class="RentSwiper"-->
<!--                :centeredSlides="false"-->
<!--                :breakpoints="breakpoints"-->
<!--        >-->
<!--          <swiper-slide data-hash="slide1">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org1" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-2.png"/>-->
<!--              </div>-->
<!--              <template #title>Faro academy</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide2">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org2" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-3.png"/>-->
<!--              </div>-->
<!--              <template #title>Cyber school</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide3">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org3" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-4.png"/>-->
<!--              </div>-->
<!--              <template #title>Амжилт академи</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide4">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org4" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-5.png"/>-->
<!--              </div>-->
<!--              <template #title>Ажмилт кибер сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide5">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org5" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-6.png"/>-->
<!--              </div>-->
<!--              <template #title>Bojss cosmetic</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide6">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org6" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-7.png"/>-->
<!--              </div>-->
<!--              <template #title>Call pro</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide8">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org8" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-8.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Дорнод хэрлэн сумын 11-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide9">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org9" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-9.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Нийслэлийн Улсын тэргүүний 13-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide10">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org10" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-10.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Нийслэлийн 89-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide11">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org11" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-11.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Нийслэлийн 79-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide12">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org12" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-12.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Нийслэлийн 55-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide13">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org13" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-13.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Нийслэлийн 104-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide14">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org14" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-14.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Нийслэлийн 105-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide15">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org15" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-15.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Дорнод аймаг дахь ПХ</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide16">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org16" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-16.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Дорнод хэрлэн сумын 1-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide17">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org17" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-17.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Дорнод хэрлэн сумын 1-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide18">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org18" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-18.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Дорнод цагаан овоо сумын сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide19">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org19" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-19.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Дорнод хэрлэн сумын 12-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide20">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org20" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-20.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Нийслэлийн эрдэмийн өргөө</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide21">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org21" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-21.jpg"/>-->
<!--              </div>-->
<!--              <template #title>ӨВ арвайхээр 1-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide22">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org22" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-22.jpg"/>-->
<!--              </div>-->
<!--              <template #title>ӨВ арвайхээр 5-р сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide23">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org23" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-23.jpg"/>-->
<!--              </div>-->
<!--              <template #title>>ӨВ баянгол сумын ЕБС</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide24">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org24" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-24.jpg"/>-->
<!--              </div>-->
<!--              <template #title>>ӨВ сант сумын сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide25">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org25" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-25.jpg"/>-->
<!--              </div>-->
<!--              <template #title>>ӨВ зүүнбаян-улаан сумын сургууль</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide26">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org26" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-26.jpg"/>-->
<!--              </div>-->
<!--              <template #title>>ӨВ бүрд сумын ЕБС </template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide27">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org27" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-27.jpg"/>-->
<!--              </div>-->
<!--              <template #title>ӨВ төгөл сумын ЕБС</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide28">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org28" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-28.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Нийслэлийн 9-р ЕБС</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide29">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org29" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-29.jpg"/>-->
<!--              </div>-->
<!--              <template #title>ДАГ даланжаргалан сумын ЕБС</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide30">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org30" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-30.jpg"/>-->
<!--              </div>-->
<!--              <template #title>ДГА сайншанд 3-р ЕБС</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide31">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org31" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-31.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Нийслэлийн хөгжим цогцолбор ЕБС</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide32">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org32" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-32.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Орхон 4-р ЕБС</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide33">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org33" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-33.jpg"/>-->
<!--              </div>-->
<!--              <template #title>БӨ өлгий сумын 10-р ЕБС</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--          <swiper-slide data-hash="slide34">-->
<!--            <a-tooltip placement="top" color="#103067">-->
<!--              <div class="h-20 rounded-lg px-5">-->
<!--                <img alt="org34" class="w-full h-full object-contain" src="/amjilthome/images/contact-company-34.jpg"/>-->
<!--              </div>-->
<!--              <template #title>Нийслэлийн 21-р ЕБС</template>-->
<!--            </a-tooltip>-->
<!--          </swiper-slide>-->
<!--        </swiper>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
// import { Autoplay, Navigation, Pagination } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/vue'
// export default {
//   name: "partners",
//   components: {
//     Swiper,
//     SwiperSlide,
//   },
//   data() {
//     return {
//       activeKey: '1',
//       modules: [Autoplay, Navigation, Pagination],
//       breakpoints:{
//         '375': {
//           slidesPerView: 2,
//           spaceBetween: 20,
//         },
//         '414': {
//           slidesPerView: 2,
//           spaceBetween: 20,
//         },
//         '640': {
//           slidesPerView: 3,
//           spaceBetween: 20,
//         },
//         '768': {
//           slidesPerView: 4,
//           spaceBetween: 20,
//         },
//         '1024': {
//           slidesPerView: 5,
//           spaceBetween: 20,
//         },
//         '1366': {
//           slidesPerView: 6,
//           spaceBetween: 20,
//         },
//       }
//     }
//   },
// }
</script>

<style scoped>

</style>
