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
    </Head>

    <section
      class="bg-gray-100 dark:bg-slate-900 xl:py-20 py-14 flex justify-center"
    >
      <div class="absolute top-0 inset-x-0 hidden sm:block">
        <img
          src="/amjilthome/images/white-wave.svg"
          alt="svg"
          class="w-full -scale-x-100"
        />
      </div>

      <div class="container max-w-6xl px-6 space-y-16 mx-auto">
        <div class="flex flex-col items-center text-center">
          <h1 class="text-4xl/tight font-medium mt-3 mb-4">
            {{ $t("header.faq_") }}
          </h1>
          <p class="text-slate-500 w-9/12 text-wrap">
            {{ $t("common.waysHelp") }}
          </p>
        </div>

        <loader v-if="loading" />
        <div v-else>
          <a-space direction="vertical" v-if="filteredModulesData !== null">
            <div
              v-for="(item, index) in filteredModulesData"
              :key="index"
              collapsible="header"
              :bordered="false"
              style="border-radius: 10px; background: #ffffff"
              class="mb-4 w-full"
            >
              <span class="text-xl font-semibold text-slate-800 px-6 p-5 flex">
                {{ index + 1 }}. {{ item.question }}
              </span>
              <div class="px-6 pb-2">
                <p class="text-base text-slate-500 break-all  " v-html="item.answer" />
              </div>
            </div>
          </a-space>
          <no-data text="Түгээмэл асуулт хариулт байхгүй байна." v-else />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { GET_FAQ } from "~/graphql/home";
import NoData from "~/components/common/noData.vue";
import Loader from "~/components/common/_loading.vue";
import { mapGetters } from "vuex";
export default {
  name: "faq",
  beforeCreate() {
    definePageMeta({
      layout: "home",
    });
  },
  components: {
    NoData,
    Loader,
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
    filteredModulesData() {
      return this.faqData.filter((obj) => obj.locale === this.$i18n.locale);
    },
  },
  data() {
    return {
      activeKey: 0,
      faqData: [],
      loading: false,
      customStyle:
        "background: #fffff; border-radius: 8px; margin-bottom: 16px; border: 1px solid #C3C9DB; overflow: hidden",
    };
  },
  methods: {
    getFaqData() {
      this.loading = true;
      this.$apollo
        .query({ query: GET_FAQ, fetchPolicy: "no-cache" })
        .then(({ data }) => {
          if (data.faq) {
            if (data.faq.length > 0) {
              this.faqData = data.faq;
            }
          }
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getFaqData();
  },
};
</script>

<style scoped>
.ant-space {
  width: 100%;
}
</style>
