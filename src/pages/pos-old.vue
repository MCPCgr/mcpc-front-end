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
    <section class="flex flex-col bg-gray-100 dark:bg-slate-900 xl:pt-20 pt-14 flex justify-center">
      <div class="absolute top-0 inset-x-0 hidden sm:block">
        <img src="/amjilthome/images/white-wave.svg" alt="svg" class="w-full -scale-x-100">
      </div>
      <div class="container max-w-6xl px-6 space-y-16 mx-auto aos-init aos-animate" data-aos="fade-up" data-aos-duration="1500">
        <div class="flex flex-col items-center text-center space-y-4">
          <h1 class="text-4xl/tight font-medium">{{ $t("header.pos") }}</h1>
          <p class="text-slate-500 w-9/12">{{ $t("home.POS_Text") }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 not-prose pb-20">
          <div @click="handleOpen('shop' )" class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="flex flex-col space-y-1 pb-2 space-y-2">
              <img alt="icon" src="/amjilthome/icons/pos/pos.svg" class="relative w-12 h-12 flex-none">
              <p class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("pos.storePOS") }}</p>
            </div>
            <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400">{{ $t("pos.storePOS_text") }}</span>
          </div>
          <div @click="handleOpen('rest')" class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="flex flex-col space-y-1 pb-2 space-y-2">
              <img alt="icon" src="/amjilthome/icons/pos/pos_res.svg" class="relative w-12 h-12 flex-none">
              <p class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("pos.RestaurantPOS") }}</p>
            </div>
            <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400">{{ $t("pos.RestaurantPOS_text") }}</span>
          </div>
          <div @click="handleOpen('pos' )"  class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="flex flex-col space-y-1 pb-2 space-y-2">
              <img alt="icon" src="/amjilthome/icons/pos/barcode.svg" class="relative w-12 h-12 flex-none">
              <p class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("pos.barcode") }}</p>
            </div>
            <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400">{{ $t("pos.barcode_text") }}</span>
          </div>
          <div @click="handleOpen('search')" class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="flex flex-col space-y-1 pb-2 space-y-2">
              <img alt="icon" src="/amjilthome/icons/pos/scan_hand.svg" class="relative w-12 h-12 flex-none">
              <p class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("pos.search") }}</p>
            </div>
            <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400">{{ $t("pos.search_text") }}</span>
          </div>
          <div @click="handleOpen('butsaalt')"  class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="flex flex-col space-y-1 pb-2 space-y-2">
              <img alt="icon" src="/amjilthome/icons/pos/receipt.svg" class="relative w-12 h-12 flex-none">
              <p class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("pos.return_reciept") }}</p>
            </div>
            <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400">{{ $t("pos.return_reciept_text") }}</span>
          </div>
          <div @click="handleOpen('huleelgiingorim')"  class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="flex flex-col space-y-1 pb-2 space-y-2">
              <img alt="icon" src="/amjilthome/icons/pos/wait.svg" class="relative w-12 h-12 flex-none">
              <p class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ $t("pos.payment") }}</p>
            </div>
            <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400">{{ $t("pos.payment_text") }}</span>
          </div>
        </div>
      </div>

      <div>
        <a-image
          :style="{ display: 'none' }"
          :preview="{ visible: showImage, onVisibleChange: onVisibleChange, }"
          :src=imgSource
        />
      </div>
      <introduction-banner/>
    </section>
  </div>
</template>

<script>
import IntroductionBanner from "~/components/home/introduction-banner.vue";

export default {
  name: "pos",
  beforeCreate() {
    definePageMeta({
      layout: 'home',
    })
  },
  components:{
    IntroductionBanner,
  },
  data(){
    return{
      showImage: false,
      imgSource: ""
    }
  },
  methods:{
    onVisibleChange(v) {
      this.showImage = v
    },

    handleOpen(visibleType){
      this.showImage = true;
      if (visibleType === 'shop') {
        this.imgSource = "/amjilthome/images/store.png"
      }else if(visibleType === 'rest'){
        this.imgSource = "/amjilthome/images/restoranpos.png"
      }else if(visibleType === 'pos'){
        this.imgSource = "/amjilthome/images/haalt.png"
      }else if(visibleType === 'butsaalt'){
        this.imgSource = "/amjilthome/images/butsaalt.png"
      }else if(visibleType === 'huleelgiingorim'){
        this.imgSource = "/amjilthome/images/huleelgiingorim.png"
      }if(visibleType === 'search'){
        this.imgSource = "/amjilthome/images/haih.png"
      }
    },
  }
}
</script>

<style scoped>

</style>
