<template>
  <div>
    <Head>
      <Title>Амжилт байгууллагын нэгдсэн систем</Title>
      <Meta name="url" content="https://amjilt.com" />
      <Meta name="type" content="news" />
      <Meta name="title" content="Амжилт байгууллагын нэгдсэн систем" />
      <Meta name="description" content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн." />
      <Meta name="image" content="https://amjilt.com/images/home-banner.jpg" />
      <Meta property="twitter:url" content="https://amjilt.com" />
      <Meta property="twitter:type" content="news" />
      <Meta property="twitter:title" content="Амжилт байгууллагын нэгдсэн систем" />
      <Meta property="twitter:description" content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн." />
      <Meta property="twitter:image" content="https://amjilt.com/images/home-banner.jpg" />
    </Head>
    <section class=" flex-col bg-gray-100 dark:bg-slate-900 xl:pt-20 pt-14 flex justify-center">
      <div class="absolute top-0 inset-x-0 hidden sm:block">
        <img src="/amjilthome/images/white-wave.svg" alt="svg" class="w-full -scale-x-100">
      </div>
      <div class="container max-w-6xl px-6 space-y-16 mx-auto pb-20">
        <div class="text-center">
          <h1 class="text-4xl/tight font-medium mt-3 mb-4">{{ $t("common.paymentTitle") }}</h1>
          <p class="text-slate-500">{{ $t("common.payment_text") }}</p>
        </div>

        <loader v-if="loading" />
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 not-prose" >
          <div v-for="(item, index) in systemModulesData" :key="index" @click="systemModulesOpen(item.id, item.module_ss, true)" v-show="item.locales === getCurrentLanguage" class="relative flex flex-col items-start p-6 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group cursor-pointer">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="flex flex-col pb-2 space-y-2">
              <div class="relative bg-slate-100 p-3 rounded-full w-12 h-12 flex-none">
                <img alt="icon" :src="$IMAGE_URL + item.module_icon" class="">
              </div>
              <p class="relative text-lg leading-6 font-medium dark:font-normal text-slate-800 dark:text-white">{{ item.module_name }}</p>
            </div>
            <span class="relative text-xs md:text-sm text-slate-600 dark:text-slate-400" v-html="item.module_description"></span>
          </div>
        </div>
      </div>
      <div style="display: none">
        <a-image-preview-group :preview="{visible, onVisibleChange: systemModulesOpen,}">
          <a-image v-for="(image, index ) in images" :key="index" :src="image.response === null ? '/images/default-img.svg' : $IMAGE_URL + image.response"/>
        </a-image-preview-group>
      </div>

      <introduction-banner/>
    </section>

  </div>
</template>

<script>
import {GET_SYSTEM_MODULES} from "~/graphql/home";
import NoData from "~/components/common/noData.vue";
import Loader from "~/components/common/_loading.vue";
import IntroductionBanner from "~/components/home/introduction-banner.vue";
import {mapGetters} from "vuex";
export default {
  name: "system-modules",
  beforeCreate() {
    definePageMeta({
      layout: 'home',
    })
  },
  computed: {
    ...mapGetters([
      'languages',
      'language',
      // ...
    ]),
    getCurrentLanguage() {
      return this.$i18n.locale;
    },
    // filteredModulesData () {
    //   return this.systemModulesData.filter(obj => obj.locales === this.$i18n.locale)
    // },
  },
  components:{
    NoData,
    Loader,
    IntroductionBanner
  },
  data() {
    return {
      systemModulesData: [],
      loading: false,
      images: [],

      visible: false
    }
  },
  methods:{
    getFaqData() {
      this.loading = true;
      this.$apollo.query({query: GET_SYSTEM_MODULES, fetchPolicy: 'no-cache',}
      ).then(({data}) => {
        if(data.system_modules){
          if(data.system_modules.length > 0){
            this.systemModulesData = data.system_modules;
          }
          this.loading = false;
        }
        this.loading = false;
      });
    },

    systemModulesOpen(value, image, open) {
      this.images = JSON.parse(image);
      this.visible = open
    },
  },
  mounted() {
    this.getFaqData();
  }
}
</script>

<style scoped>

</style>
