<template>
  <div>
    <Head>
      <Title>Амжилт байгууллагын нэгдсэн систем</Title>
      <Meta name="url" content="https://amjilt.com" />
      <Meta name="type" content="news" />
      <Meta name="title" content="Амжилт байгууллагын нэгдсэн систем" />
      <Meta
        name="description"
        content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн."
      />
      <Meta name="image" content="https://amjilt.com/images/home-banner.png" />
      <Meta property="og:url" content="https://amjilt.com" />
      <Meta property="og:type" content="news" />
      <Meta property="og:title" content="Амжилт байгууллагын нэгдсэн систем" />
      <Meta
        property="og:description"
        content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн."
      />
      <Meta
        property="og:image"
        content="https://amjilt.com/images/home-banner.png"
      />
      <Meta name="url" content="https://amjilt.com" />
      <Meta name="type" content="news" />
      <Meta name="title" content="Амжилт байгууллагын нэгдсэн систем" />
      <Meta
        name="description"
        content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн."
      />
      <Meta name="image" content="https://amjilt.com/images/home-banner.png" />
      <Meta property="twitter:url" content="https://amjilt.com" />
      <Meta property="twitter:type" content="news" />
      <Meta
        property="twitter:title"
        content="Амжилт байгууллагын нэгдсэн систем"
      />
      <Meta
        property="og:description"
        content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн."
      />
      <Meta
        property="og:image"
        content="https://amjilt.com/images/home-banner.png"
      />
    </Head>
    <section class="flex flex-col bg-gray-100 dark:bg-slate-900 xl:pt-20 pt-14 justify-center">
      <div class="absolute top-0 inset-x-0 hidden sm:block">
        <img
          src="/amjilthome/images/white-wave.svg"
          alt="svg"
          class="w-full -scale-x-100"
        />
      </div>
      <div class="container max-w-4xl px-4 space-y-5 mx-auto">

        <div class="w-full flex justify-between not-prose" v-for="(item, index) in IntroData">
          <div class="w-full space-y-6 md:p-6 p-4 overflow-hidden hover:shadow-lg rounded-xl duration-700 dark:border-slate-800 dark:bg-slate-800 bg-white group not-prose">
            <div class="md:col-span-2 lg:col-span-2 space-y-2">
              <h1 class="text-center lg:text-2xl text-xl font-medium">{{ $t(item.title)}}</h1>
              <p class="text-slate-600 dark:text-slate-400 lg:text-base text-sm">{{ $t(item.text)}}</p>
            </div>
            <div class="flex md:flex-row flex-col w-full md:space-y-0 space-y-3 md:space-x-4 space-x-0">
              <img :src="item.img" alt="Error" class="rounded-2xl lg:w-72 w-full  dark:border-slate-800 dark:bg-slate-800 bg-white"/>
              <div class="relative w-full text-base md:flex-col leading-6 text-slate-800 dark:text-white">
                <div class="text-start space-y-2">
                  <p class="text-slate-600 dark:text-slate-400 relative text-base space-x-2 flex items-center" v-for="(sub) in item.courseAction">
                    <img src="/amjilt-erp/images/modules/check.svg" alt="Error" class="inline lg:w-6 lg:h-6 w-5 h-5"/>
                    <span class="lg:text-base text-sm">{{ $t(sub.text) }}</span>
                  </p>
                </div>
                <div class="dark:text-slate-400 lg:text-sm text-xs absolute right-0 bottom-0 border lg:w-7 lg:h-7 w-6 h-6 flex flex-none items-center justify-center rounded-full bg-purple-600 text-white">
                  {{index + 1}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center  mt-5">
        <div class="flex flex-row gap-2">
          <SocialShare
            v-for="network in ['facebook', 'twitter', 'linkedin', 'telegram']"
            :key="network"
            :network="network"
            :styled="true"
            :label="false"
            class="p-4 rounded-xl gap-4 bg-purple-700 text-white"
          />
        </div>
      </div>
      <div class="flex justify-center lg:ml-52 md:ml-30 sm:ml-0">
        <FacebookComments
          url="https://www.facebook.com/amjiltcom"
          :numPosts="15"
          :width="600"
          class="sm:w-full md:w-2/3 lg:w-3/3"
        />
      </div>

      <div class="w-full flex justify-center mb-10">
        <div class="iframe-container">
          <iframe
            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Famjiltcom&width=750&layout&action&size&share=true&height=35&appId"
            style="border: none; overflow: hidden; margin-top: 20px;"
            class="lg:w-[750px] w-[300px]"
            scrolling="no"
            frameborder="0"
            allowfullscreen="true"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </div>
      <div style="display: none">
        <a-image-preview-group
          :preview="{ visible, onVisibleChange: systemModulesOpen }"
        >
          <a-image
            v-for="(image, index) in images"
            :key="index"
            :src="
              image.response === null
                ? '/images/default-img.svg'
                : $IMAGE_URL + image.response
            "
          />
        </a-image-preview-group>
      </div>

      <introduction-banner />
    </section>
  </div>
</template>

<script>
import { GET_SYSTEM_MODULES } from "~/graphql/home";
import NoData from "~/components/common/noData.vue";
import Loader from "~/components/common/_loading.vue";
import IntroductionBanner from "~/components/home/introduction-banner.vue";
import { mapGetters } from "vuex";
import FacebookComments from "/components/FacebookComments.vue";
export default {
  plugins: [{ src: "~/plugins/nuxt-social-share", ssr: false }],
  name: "system-modules",
  beforeCreate() {
    definePageMeta({
      layout: "home",
    });
  },
  computed: {
    ...mapGetters([
      "languages",
      "language",
      // ...
    ]),
    getCurrentLanguage() {
      return this.$i18n.locale;
    },
    // filteredModulesData () {
    //   return this.systemModulesData.filter(obj => obj.locales === this.$i18n.locale)
    // },
  },
  components: {
    NoData,
    Loader,
    IntroductionBanner,
    FacebookComments,
  },
  data() {
    return {
      systemModulesData: [],
      loading: false,
      images: [],
      visible: false,

      IntroData: [
        {
          title: "Introduction.financeDashboardTitle",
          text: 'Introduction.financeDashboardSubtitle',
          img: '/amjilt-erp/images/modules/sanhuuhynaltiinsambar.jpg',
          courseAction: [
            {text: 'Introduction.financeDashboardText_1'},
            {text: 'Introduction.financeDashboardText_2'},
            {text: 'Introduction.financeDashboardText_3'},
            {text: 'Introduction.financeDashboardText_4'},
            {text: 'Introduction.financeDashboardText_5'},
            {text: 'Introduction.financeDashboardText_6'},
            {text: 'Introduction.financeDashboardText_7'},
            {text: 'Introduction.financeDashboardText_8'},
            {text: 'Introduction.financeDashboardText_9'},
          ] ,
        },
        {
          title: "Introduction.materialTitle",
          text: 'Introduction.materialSubtitle',
          img: '/amjilt-erp/images/modules/baraa sambar.jpg',
          courseAction: [
            {text: 'Introduction.materialText_1'},
            {text: 'Introduction.materialText_2'},
            {text: 'Introduction.materialText_3'},
            {text: 'Introduction.materialText_4'},
            {text: 'Introduction.materialText_5'},
            {text: 'Introduction.materialText_6'},
            {text: 'Introduction.materialText_7'},
            {text: 'Introduction.materialText_8'},
            {text: 'Introduction.materialText_9'},
          ] ,
        },
        {
          title: "Introduction.organizationTitle",
          text: 'Introduction.organizationSubtitle',
          img: '/amjilt-erp/images/modules/baiguullaga1.jpg',
          courseAction: [
            {text: 'Introduction.organizationText_1'},
            {text: 'Introduction.organizationText_2'},
            {text: 'Introduction.organizationText_3'},
            {text: 'Introduction.organizationText_4'},
            {text: 'Introduction.organizationText_5'},
            {text: 'Introduction.organizationText_6'},
            {text: 'Introduction.organizationText_7'},
            {text: 'Introduction.organizationText_8'},
            {text: 'Introduction.organizationText_9'},
          ] ,
        },
        {
          title: "Introduction.subsidiaryTitle",
          text: 'Introduction.subsidiarySubtitle',
          img: '/amjilt-erp/images/modules/ohin company.jpg',
          courseAction: [
            {text: 'Introduction.subsidiaryText_1'},
            {text: 'Introduction.subsidiaryText_2'},
            {text: 'Introduction.organizationText_3'},
            {text: 'Introduction.organizationText_4'},
            {text: 'Introduction.organizationText_5'},
            {text: 'Introduction.organizationText_6'},
            {text: 'Introduction.organizationText_7'},
            {text: 'Introduction.organizationText_8'},
            {text: 'Introduction.organizationText_9'},
          ] ,
        },
        {
          title: "Introduction.sectorTitle",
          text: 'Introduction.sectorSubtitle',
          img: '/amjilt-erp/images/modules/salbar negj.jpg',
          courseAction: [
            {text: 'Introduction.sectorText_1'},
            {text: 'Introduction.sectorText_2'},
            {text: 'Introduction.sectorText_3'},
            {text: 'Introduction.sectorText_4'},
            {text: 'Introduction.sectorText_5'},
            {text: 'Introduction.sectorText_6'},
            {text: 'Introduction.sectorText_10'},
            {text: 'Introduction.sectorText_11'},
            {text: 'Introduction.sectorText_9'},
          ] ,
        },
        {
          title: "Introduction.recourcesJobTitle",
          text: 'Introduction.recourcesJobSubtitle',
          img: '/amjilt-erp/images/modules/hr ajiltan burtgel.jpg',
          courseAction: [
            {text: 'Introduction.recourcesJobText_1'},
            {text: 'Introduction.recourcesJobText_2'},
            {text: 'Introduction.recourcesJobText_3'},
            {text: 'Introduction.recourcesJobText_4'},
            {text: 'Introduction.recourcesJobText_5'},
            {text: 'Introduction.recourcesJobText_6'},
            {text: 'Introduction.recourcesJobText_7'},
            {text: 'Introduction.recourcesJobText_8'},
            {text: 'Introduction.recourcesJobText_9'},
            {text: 'Introduction.recourcesJobText_10'},
          ] ,
        },
        {
          title: "Introduction.recourcesHumanTitle",
          text: 'Introduction.recourcesHumanSubitle',
          img: '/amjilt-erp/images/modules/hr ajliin bair.jpg',
          courseAction: [
            {text: 'Introduction.recourcesHumanText_1'},
            {text: 'Introduction.recourcesHumanText_2'},
            {text: 'Introduction.recourcesHumanText_3'},
            {text: 'Introduction.recourcesHumanText_4'},
            {text: 'Introduction.recourcesHumanText_5'},
            {text: 'Introduction.recourcesHumanText_6'},
            {text: 'Introduction.recourcesHumanText_7'},
            {text: 'Introduction.recourcesHumanText_8'},
            {text: 'Introduction.recourcesHumanText_9'},
            {text: 'Introduction.recourcesHumanText_10'},
          ] ,
        },
        {
          title: "Introduction.resourcesTitle",
          text: 'Introduction.recourcesSubtitle',
          img: '/amjilt-erp/images/modules/hr.jpg',
          courseAction: [
            {text: 'Introduction.recourcesText_1'},
            {text: 'Introduction.recourcesText_2'},
            {text: 'Introduction.recourcesText_3'},
            {text: 'Introduction.recourcesText_4'},
            {text: 'Introduction.recourcesText_5'},
            {text: 'Introduction.recourcesText_6'},
            {text: 'Introduction.recourcesText_7'},
            {text: 'Introduction.recourcesText_8'},
            {text: 'Introduction.recourcesText_9'},
            {text: 'Introduction.recourcesText_10'},
          ] ,
        },
        {
          title: "Introduction.timeRegistrationTitle",
          text: 'Introduction.timeRegistrationSubtitle',
          img: '/amjilt-erp/images/modules/tsag burtgel.png',
          courseAction: [
            {text: 'Introduction.timeRegistrationText_1'},
            {text: 'Introduction.timeRegistrationText_2'},
            {text: 'Introduction.timeRegistrationText_3'},
            {text: 'Introduction.timeRegistrationText_4'},
            {text: 'Introduction.timeRegistrationText_5'},
            {text: 'Introduction.timeRegistrationText_6'},
            {text: 'Introduction.timeRegistrationText_7'},
            {text: 'Introduction.timeRegistrationText_8'},
            {text: 'Introduction.timeRegistrationText_9'},
          ] ,
        },
        {
          title: "Introduction.timekeepingTitle",
          text: 'Introduction.timekeepingSubtitle',
          img: '/amjilt-erp/images/modules/tsag burtgeliin tsamhag.jpg',
          courseAction: [
            {text: 'Introduction.timekeepingText_1'},
            {text: 'Introduction.timekeepingText_2'},
            {text: 'Introduction.timekeepingText_3'},
            {text: 'Introduction.timekeepingText_4'},
            {text: 'Introduction.timekeepingText_5'},
            {text: 'Introduction.timekeepingText_6'},
            {text: 'Introduction.timekeepingText_7'},
            {text: 'Introduction.timekeepingText_8'},
          ] ,
        },
        {
          title: "Introduction.financeTitle",
          text: 'Introduction.financeSubtitle',
          img: '/amjilt-erp/images/modules/sanhuu.jpg',
          courseAction: [
            {text: 'Introduction.financeText_1'},
            {text: 'Introduction.financeText_2'},
            {text: 'Introduction.financeText_3'},
            {text: 'Introduction.financeText_4'},
            {text: 'Introduction.financeText_5'},
            {text: 'Introduction.financeText_6'},
            {text: 'Introduction.financeText_7'},
            {text: 'Introduction.financeText_8'},
            {text: 'Introduction.financeText_9'},
          ] ,
        },
        {
          title: "Introduction.salaryTitle",
          text: 'Introduction.salarySubtitle',
          img: '/amjilt-erp/images/modules/tsalin.jpg',
          courseAction: [
            {text: 'Introduction.salaryText_1'},
            {text: 'Introduction.salaryText_2'},
            {text: 'Introduction.salaryText_3'},
            {text: 'Introduction.salaryText_4'},
            {text: 'Introduction.salaryText_5'},
            {text: 'Introduction.salaryText_6'},
            {text: 'Introduction.salaryText_7'},
            {text: 'Introduction.salaryText_8'},
            {text: 'Introduction.salaryText_9'},
          ] ,
        },
        {
          title: "Introduction.servicesTitle",
          text: 'Introduction.servicesSubtitle',
          img: '/amjilt-erp/images/modules/baraa ajil.jpg',
          courseAction: [
            {text: 'Introduction.servicesText_1'},
            {text: 'Introduction.servicesText_2'},
            {text: 'Introduction.servicesText_3'},
            {text: 'Introduction.servicesText_4'},
            {text: 'Introduction.servicesText_5'},
            {text: 'Introduction.servicesText_6'},
            {text: 'Introduction.servicesText_7'},
            {text: 'Introduction.servicesText_8'},
            {text: 'Introduction.servicesText_9'},
          ] ,
        },
        {
          title: "Introduction.purchaseTitle",
          text: 'Introduction.purchaseSubtitle',
          img: '/amjilt-erp/images/modules/hudaldn awalt.jpg',
          courseAction: [
            {text: 'Introduction.purchaseText_1'},
            {text: 'Introduction.purchaseText_2'},
            {text: 'Introduction.purchaseText_3'},
            {text: 'Introduction.purchaseText_4'},
            {text: 'Introduction.purchaseText_5'},
            {text: 'Introduction.purchaseText_6'},
            {text: 'Introduction.purchaseText_7'},
            {text: 'Introduction.purchaseText_8'},
            {text: 'Introduction.purchaseText_9'},
          ] ,
        },
        {
          title: "Introduction.salesTitle",
          text: 'Introduction.salesSubtitle',
          img: '/amjilt-erp/images/modules/borluulalt.jpg',
          courseAction: [
            {text: 'Introduction.salesText_1'},
            {text: 'Introduction.salesText_2'},
            {text: 'Introduction.salesText_3'},
            {text: 'Introduction.salesText_4'},
            {text: 'Introduction.salesText_5'},
            {text: 'Introduction.salesText_6'},
            {text: 'Introduction.salesText_7'},
            {text: 'Introduction.salesText_8'},
            {text: 'Introduction.salesText_9'},
          ] ,
        },
        {
          title: "Introduction.suppliesTitle",
          text: 'Introduction.suppliesSubtitle',
          img: '/amjilt-erp/images/modules/hangamj.jpg',
          courseAction: [
            {text: 'Introduction.suppliesText_1'},
            {text: 'Introduction.suppliesText_2'},
            {text: 'Introduction.suppliesText_3'},
            {text: 'Introduction.suppliesText_4'},
            {text: 'Introduction.suppliesText_5'},
            {text: 'Introduction.suppliesText_6'},
            {text: 'Introduction.suppliesText_7'},
            {text: 'Introduction.suppliesText_8'},
            {text: 'Introduction.suppliesText_9'},
          ] ,
        },
        {
          title: "Introduction.internalMovementTitle",
          text: 'Introduction.internalMovementSubtitle',
          img: '/amjilt-erp/images/modules/dotood.jpg',
          courseAction: [
            {text: 'Introduction.internalMovementText_1'},
            {text: 'Introduction.internalMovementText_2'},
            {text: 'Introduction.internalMovementText_3'},
            {text: 'Introduction.internalMovementText_4'},
            {text: 'Introduction.internalMovementText_5'},
            {text: 'Introduction.internalMovementText_6'},
            {text: 'Introduction.internalMovementText_7'},
            {text: 'Introduction.internalMovementText_8'},
            {text: 'Introduction.internalMovementText_9'},
          ] ,
        },
        {
          title: "Introduction.interlocutorTitle",
          text: 'Introduction.interlocutorSubtitle',
          img: '/amjilt-erp/images/modules/hariltsagch.jpg',
          courseAction: [
            {text: 'Introduction.interlocutorText_1'},
            {text: 'Introduction.interlocutorText_2'},
            {text: 'Introduction.interlocutorText_3'},
            {text: 'Introduction.interlocutorText_4'},
            {text: 'Introduction.interlocutorText_5'},
            {text: 'Introduction.interlocutorText_6'},
            {text: 'Introduction.interlocutorText_7'},
            {text: 'Introduction.interlocutorText_8'},
            {text: 'Introduction.interlocutorText_9'},
          ] ,
        },
        {
          title: "Introduction.posSytemTitle",
          text: 'Introduction.posSytemSubtitle',
          img: '/amjilt-erp/images/modules/pos system.jpg',
          courseAction: [
            {text: 'Introduction.posSytemText_1'},
            {text: 'Introduction.posSytemText_2'},
            {text: 'Introduction.posSytemText_3'},
            {text: 'Introduction.posSytemText_4'},
            {text: 'Introduction.posSytemText_5'},
            {text: 'Introduction.posSytemText_6'},
            {text: 'Introduction.posSytemText_7'},
            {text: 'Introduction.posSytemText_8'},
            {text: 'Introduction.posSytemText_9'},
          ] ,
        },
        {
          title: "Introduction.posSalesTitle",
          text: 'Introduction.posSalesSubtitle',
          img: '/amjilt-erp/images/modules/pos borluulalt.jpg',
          courseAction: [
            {text: 'Introduction.posSalesText_1'},
            {text: 'Introduction.posSalesText_2'},
            {text: 'Introduction.posSalesText_3'},
            {text: 'Introduction.posSalesText_4'},
            {text: 'Introduction.posSalesText_5'},
            {text: 'Introduction.posSalesText_6'},
            {text: 'Introduction.posSalesText_7'},
            {text: 'Introduction.posSalesText_8'},
            {text: 'Introduction.posSalesText_9'},
          ] ,
        },
        {
          title: "Introduction.TreasurerTitle",
          text: 'Introduction.TreasurerSubtitle',
          img: '/amjilt-erp/images/modules/nyraw.jpg',
          courseAction: [
            {text: 'Introduction.TreasurerText_1'},
            {text: 'Introduction.TreasurerText_2'},
            {text: 'Introduction.TreasurerText_3'},
            {text: 'Introduction.TreasurerText_4'},
            {text: 'Introduction.TreasurerText_5'},
            {text: 'Introduction.TreasurerText_6'},
            {text: 'Introduction.TreasurerText_7'},
            {text: 'Introduction.TreasurerText_8'},
            {text: 'Introduction.TreasurerText_9'},
          ] ,
        },
        {
          title: "Introduction.planningTitle",
          text: 'Introduction.planningSubtitle',
          img: '/amjilt-erp/images/modules/ajil tuluvlult.jpg',
          courseAction: [
            {text: 'Introduction.planningText_1'},
            {text: 'Introduction.planningText_2'},
            {text: 'Introduction.planningText_3'},
            {text: 'Introduction.planningText_4'},
            {text: 'Introduction.planningText_5'},
            {text: 'Introduction.planningText_6'},
            {text: 'Introduction.planningText_7'},
            {text: 'Introduction.planningText_8'},
            {text: 'Introduction.planningText_9'},
          ] ,
        },
        {
          title: "Introduction.planningProjectTitle",
          text: 'Introduction.planningProjectSubtitle',
          img: '/amjilt-erp/images/modules/ajil-tuluvlult-tusul.jpg',
          courseAction: [
            {text: 'Introduction.planningProjectText_1'},
            {text: 'Introduction.planningProjectText_2'},
            {text: 'Introduction.planningProjectText_3'},
            {text: 'Introduction.planningProjectText_4'},
            {text: 'Introduction.planningProjectText_5'},
            {text: 'Introduction.planningProjectText_6'},
            {text: 'Introduction.planningProjectText_7'},
            {text: 'Introduction.planningProjectText_8'},
            {text: 'Introduction.planningProjectText_9'},
          ] ,
        },
        {
          title: "Introduction.reportTitle",
          text: 'Introduction.reportSubtitle',
          img: '/amjilt-erp/images/modules/guitsetgel.jpg',
          courseAction: [
            {text: 'Introduction.reportText_1'},
            {text: 'Introduction.reportText_2'},
            {text: 'Introduction.reportText_3'},
            {text: 'Introduction.reportText_4'},
            {text: 'Introduction.reportText_5'},
            {text: 'Introduction.reportText_6'},
            {text: 'Introduction.reportText_7'},
            {text: 'Introduction.reportText_8'},
            {text: 'Introduction.reportText_9'},
          ] ,
        },
      ],
    };
  },
  methods: {
    share() {
      `Share on ${network}`;
    },
    getFaqData() {
      this.loading = true;
      this.$apollo
        .query({ query: GET_SYSTEM_MODULES, fetchPolicy: "no-cache" })
        .then(({ data }) => {
          if (data.system_modules) {
            if (data.system_modules.length > 0) {
              this.systemModulesData = data.system_modules;
            }
            this.loading = false;
          }
          this.loading = false;
        });
    },

    systemModulesOpen(value, image, open) {
      this.images = JSON.parse(image);
      this.visible = open;
    },

    loadFacebookSDK() {
      const id = "facebook-jssdk";
      if (document.getElementById(id)) return;

      const js = document.createElement("script");
      const fjs = document.getElementsByTagName("script")[0];

      js.id = id;
      js.src = "https://connect.facebook.net/mn_MN/sdk.js#xfbml=1&version=v19.0&appId=912095810649755";

      fjs.parentNode.insertBefore(js, fjs);
    },
  },
  modules: ["vue-social-sharing/nuxt"],
  mounted() {
    this.getFaqData();
    this.loadFacebookSDK();
  },
};
() => {
  var js,
    fjs = $("script")[0];
  var id = "facebook-jssdk";
  if ($("#" + id).length) return;
  js = $("<script>").attr({
    id: id,
    src: "https://connect.facebook.net/mn_MN/sdk.js#xfbml=1&version=v19.0&appId=912095810649755",
  });
  $(fjs).before(js);
};
</script>

<style></style>
