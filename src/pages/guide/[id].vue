<template>
  <div>
    <Head>
      <Title>Амжилт байгууллагын нэгдсэн систем</Title>
      <Meta name="url" content="https://amjilt.com"/>
      <Meta name="type" content="news"/>
      <Meta name="title" content="Амжилт байгууллагын нэгдсэн систем"/>
      <Meta name="description"
            content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн."/>
      <Meta name="image" content="https://amjilt.com/images/home-banner.png"/>
      <Meta property="og:url" content="https://amjilt.com"/>
      <Meta property="og:type" content="news"/>
      <Meta property="og:title" content="Амжилт байгууллагын нэгдсэн систем"/>
      <Meta property="og:description"
            content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн."/>
      <Meta property="og:image" content="https://amjilt.com/images/home-banner.png"/>
    </Head>

    <section class="bg-gray-100 dark:bg-slate-900 xl:py-20 py-14 flex justify-center">
      <div class="absolute top-0 inset-x-0 hidden sm:block">
        <img src="/amjilthome/images/white-wave.svg" alt="svg" class="w-full -scale-x-100">
      </div>
      <div class="container px-6 space-y-16">
        <!--sticky-->
        <div class="flex flex-col items-start text-left">
          <h1 class="text-4xl/tight font-medium mt-3 mb-4">Гарын авлага, видео хичээл</h1>
<!--          <p class="text-slate-500 w-9/12">Тусламж авах аргууд</p>-->
        </div>

        <div id="topnav-guide" class="z-10 lg:hidden">
          <nav class="flex items-center">
            <div class="left-2 top-4 menu-active flex items-center" style="z-index: 999;">
              <a-drawer style="width: 92% !important; padding-bottom: 10px !important;" title="Гарын авлага цэс" placement="left" :open="open" @close="onClose">
                <div>
                  <div class="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-1 pl-0.5">
                    <nav class="text-base lg:text-sm w-64 pr-8 xl:w-72 xl:pr-16 guide-nav">
                      <ul role="list" class="space-y-9" v-for="(catItem, index) in catData" :key="index">
                        <li style="padding-bottom: 15px;">
                          <div class="font-display font-semibold text-slate-900 dark:text-white">{{ catItem.category }}</div>
                          <ul role="list" class="sub-nav my-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:my-4 lg:space-y-4 lg:border-slate-200">
                            <li v-if="catData[index].user_guide != null" v-for="(subGuideItem, subindex) in catItem.user_guide" :key="subindex" class="relative">
                              <a @click="selectedManual(subGuideItem, catItem.id, {index, subindex})"
                                 :class="(selected_id === subGuideItem.id ? 'bg-gray-200 ' : ' ') + 'cursor-pointer block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300 before:router-link-active'">
                                {{ subGuideItem.title }}
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </a-drawer>

              <!-- MOBILE -->
              <div class="mt-[-80px] ml-[20px]">
                <button
                  class=" flex h-8 w-8 items-center justify-center"
                  aria-label="Toggle Navigation" id="headlessui-popover-button-:r0:" type="button" aria-expanded="false"
                  @click="showDrawer"
                >
                  <svg aria-hidden="true" class="h-3.5 w-3.5 overflow-visible stroke-slate-700" fill="none" stroke-width="2" stroke-linecap="round">
                    <path d="M0 1H14M0 7H14M0 13H14" class="origin-center transition"></path>
                    <path d="M2 2L12 12M12 2L2 12" class="origin-center transition scale-90 opacity-0"></path>
                  </svg>
                  <span class="ml-[15px] text-2xl/tight font-medium">Цэс</span>
                </button>
              </div>
            </div>
          </nav>
        </div>

        <div class="relative mx-auto flex max-w-screen-2xl justify-center">
          <div class="hidden lg:relative lg:block lg:flex-none">
            <div class="absolute inset-y-0 right-0 w-[50vw] dark:hidden"></div>
            <div class="absolute top-16 bottom-0 right-0 hidden h-12 w-px bg-gradient-to-t from-slate-800 dark:block"></div>
            <div class="absolute top-28 bottom-0 right-0 hidden w-px bg-slate-800 dark:block"></div>
            <div class="sticky top-[4.5rem] -ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto overflow-x-hidden py-1 pl-0.5">
              <nav class="text-base lg:text-sm w-64 pr-8 xl:w-72 xl:pr-16 guide-nav">
                <ul role="list" class="space-y-9" v-for="(catItem, index) in catData" :key="index">
                  <li>
                    <div :class="(selected_cat_id === catItem.id ? 'bg-gray-200 ' : ' ') + 'p-[10px] rounded-lg font-display font-semibold text-slate-900 dark:text-white'">{{ catItem.category }}</div>
                    <ul role="list" class="sub-nav my-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-800 lg:my-4 lg:space-y-4 lg:border-slate-200">
                      <li v-if="catData[index].user_guide != null" v-for="(subGuideItem, subindex) in catItem.user_guide" :key="subindex" class="relative">
                        <a @click="selectedManual(subGuideItem, catItem.id, {index, subindex})"
                                   :class="(selected_id === subGuideItem.id ? 'bg-gray-200 ' : ' ') + 'cursor-pointer block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300 before:router-link-active'">
                          {{ subGuideItem.title }}
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div class=" flex-auto px-4 py-3 lg:py-3 lg:max-w-none lg:pl-16 text-black_color">
            <article>
              <div class="space-y-5 lambda-document block prose prose-slate max-w-none dark:prose-invert dark:text-slate-400 prose-headings:scroll-mt-28 scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem] prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800">
                <div class="w-full space-y-6">
                  <span class="text-2xl font-bold">{{ guide.title }}</span>
                </div>
                <div class="w-full" ><span v-html="guide.description"/></div>
                <iframe :src="base_url + guide.file" width="100%" height="700px" />
              </div>
            </article>

            <dl class="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">
              <div class="space-y-1" v-if="prev">
                <dt class="text-sm font-semibold text-black_color dark:text-slate-400">Өмнөх</dt>
                <dd>
                  <a  @click="prevBtn" class="space-x-2 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
                    <font-awesome-icon class="text-sm" icon="fa-solid fa-arrow-left" />
                    <span>{ prev.title }}</span>
                  </a>
                </dd>
              </div>
              <div class="ml-auto text-right space-y-1 " v-if="next">
                <dt class="text-sm font-semibold text-black_color dark:text-slate-400">Дараах</dt>
                <dd>
                  <a  @click="nextBtn" class="space-x-2 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
                    <span>{{ next.title }}</span>
                    <font-awesome-icon class="text-sm" icon="fa-solid fa-arrow-right" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div class="hidden xl:sticky xl:top-[4.5rem] xl:-mr-6 xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6"></div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import {GET_USER_GUIDE_CATEGORY} from "~/graphql/home";
import {base_url} from "../../consts/const";


export default {
  beforeCreate() {
    definePageMeta({
      layout: 'home',
    })
  },
  components: {
  },
  data() {
    return {
      placement: "left",
      open: false,
      showmobileMenu: false,
      base_url: base_url,
      catData: [],
      guideData: {},
      cat_index: [],
      guide: {
        id: null,
        category_id: null,
        description: null,
        title: null,
        youtube_link: null,
      },
      selected_id: "",
      selected_cat_id: "",
      selected_indexs: { cat: 0, sub_cat: 0 },
      next: true,
      prev: false,
      urlPre: null,
    }
  },
  computed: {
  },
  methods: {
    showDrawer () {
      this.open = true;
    },
    onClose(){
      this.open = false;
    },


    prevBtn(){
      console.log("prevBtn")
    },
    nextBtn(){
      // this.selected_indexs
      this.selectedManual(this.catData[this.selected_indexs.cat].user_guide[this.selected_indexs.sub_index]);
      console.log("nextBtn");
    },
    selectedManual(item, item_cat, indexs){
      this.selected_id = item.id;
      this.selected_cat_id = item_cat;
      this.guide = {
          id: item.id,
          description: item.description,
          title: item.title,
          file: item.file,
      };
      this.selected_indexs =  { cat: indexs.index, sub_cat: indexs.sub_index }
      console.log("indexs >>> ", indexs)
    },
    getCategory() {
      this.$apollo.query({
          query: GET_USER_GUIDE_CATEGORY,
          fetchPolicy: 'no-cache',
        }
      ).then(({data}) => {
        if (data.user_guide_category.length > 0) {
          this.catData = data.user_guide_category;
          this.selectedManual(this.catData[0].user_guide[0]);
        }
      });
    },
    embedUrl(urlPre) {
      if (urlPre !== null) {
        let youtubevideo = '';
        let tvr = urlPre != null ? urlPre.split('?v=') : [];
        if (tvr[1]){
          let shorted = tvr[1];
          youtubevideo = shorted.substring(0, 11);
        }
        return "https://www.youtube.com/embed/" + youtubevideo;
      }
    },
  },
  mounted() {
    this.getCategory();
  }
}
</script>
<style scoped></style>
