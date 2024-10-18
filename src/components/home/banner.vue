<template>
  <Head>
    <Title>Home</Title>
  </Head>
  <section>
    <div class="bg-slate-50 w-screen h-screen flex items-center justify-center dark:bg-slate-900 lg:py-20">
      <div class="relative">
        <div class="h-full w-full flex items-center justify-center bg-highlight_color">
          <div class="container px-6">
            <div class="grid md:grid-cols-12 grid-row-2 gap-2">

              <div class="col-span-12 lg:col-span-5 dark:bg-slate-800 h-full">
                <div class="flex flex-col justify-between h-full space-y-6">
                  <div class="space-y-6 px-8 py-6">
                    <img src="/amjilthome/logos/mcpc-gr.svg" alt="logo">
                  </div>
                </div>
              </div>

              <div class="col-span-12 lg:col-span-7 flex items-center">
                <div class="max-w-6xl  mx-auto space-y-10 flex flex-col justify-between h-full border border-white shadow-xl rounded-xl bg-white">
                  <div class="space-y-2 max-w-2xl mx-auto md:pr-20">

                    <Auth
                      class="p-8"
                      @on-login="onLogin"
                      :authType="authType"
                      @changeAuthType="changeAuthType"
                    />

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>

import { mapGetters } from "vuex";
import { userInfo } from "~/store/useSiteSettings";
import Auth from "~/components/common/auth.vue";


definePageMeta({
  layout: 'login',
})
export default {
  name: "login",
  components: { Auth },
  computed: {
    ...mapGetters([
      "languages",
      "language",
      // ...
    ]),
    getCurrentLanguage() {
      return this.$store.state.language;
    },
  },
  data() {
    return {
      userInfo,
      RegisterModal: false,
      authModal: false,
      roleSelect: true,
      authType: "login",
    };
  },
  methods: {
    login(event) {
      event.preventDefault();
      this.authModal = true;
    },
    onLogin() {
      this.authModal = false;
      this.roleSelect = true;

      this.$router.replace("/select-role");
    },
    changeAuthType() {
      if (this.authType === "login") {
        this.authType = "register";
      } else {
        this.authType = "login";
      }
    },
  },
};


</script>

<style scoped></style>












<!--<template>-->
<!--  <div class="bg-slate-50 dark:bg-slate-900 lg:py-20 pt-20">-->
<!--    <div class="relative">-->
<!--      <div-->
<!--        class="h-full w-full flex items-center justify-center bg-highlight_color"-->
<!--      >-->
<!--&lt;!&ndash;        <div class="container mx-auto px-6">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="grid md:grid-cols-12 grid-cols-1 gap-2">&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="col-span-12 lg:col-span-7 flex items-center"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <div&ndash;&gt;-->
<!--&lt;!&ndash;                class="max-w-6xl mx-auto space-y-10 flex flex-col xl:justify-between h-full"&ndash;&gt;-->
<!--&lt;!&ndash;              >&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="space-y-2 max-w-2xl mx-auto md:pr-20">&ndash;&gt;-->
<!--&lt;!&ndash;                  <div&ndash;&gt;-->
<!--&lt;!&ndash;                    class="text-4xl/tight xl:text-5xl/tight space-y-2 font-medium"&ndash;&gt;-->
<!--&lt;!&ndash;                  >&ndash;&gt;-->
<!--&lt;!&ndash;                    <p class="text-primary_color dark:text-slate-100">&ndash;&gt;-->
<!--&lt;!&ndash;                      {{ $t("home.solveHasSolution") }}&ndash;&gt;-->
<!--&lt;!&ndash;                    </p>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div class="xl:text-lg dark:text-gray-400">&ndash;&gt;-->
<!--&lt;!&ndash;                    {{ $t("home.introductionText") }}&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div&ndash;&gt;-->
<!--&lt;!&ndash;                    class="flex items-center space-x-4 pt-4"&ndash;&gt;-->
<!--&lt;!&ndash;                    v-if="userInfo && userInfo.id"&ndash;&gt;-->
<!--&lt;!&ndash;                  >&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;                    <a href="https://lms.amjilt.com/auth/login" target="_blank" class="w-full group">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;                      <div class="border border-regal-purple bg-regal-purple group-hover:shadow-5xl transition-all duration-300 text-white text-sm py-2 px-4 rounded-full text-center">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;                        {{ $t("home.signInSchool") }}&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;                      </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;&lt;!&ndash;                      <div class="button-login">&ndash;&gt;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;&lt;!&ndash;                        <a-button type="primary" class="w-full">{{ $t("home.signInSchool") }}</a-button>&ndash;&gt;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;&lt;!&ndash;                      </div>&ndash;&gt;&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    &lt;!&ndash;                    </a>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    <nuxt-link to="/select-role" class="w-full group">&ndash;&gt;-->
<!--&lt;!&ndash;                      <div&ndash;&gt;-->
<!--&lt;!&ndash;                        class="border border-regal-purple bg-white transition-all duration-300 group-hover:shadow-5xl text-regal-purple text-sm py-2 px-4 rounded-full text-center"&ndash;&gt;-->
<!--&lt;!&ndash;                      >&ndash;&gt;-->
<!--&lt;!&ndash;                        Системд хандах&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      &lt;!&ndash;                      <div class="button-signup">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                      &lt;!&ndash;                        <a-button type="primary" class="w-full">Системд хандах</a-button>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                      &lt;!&ndash;                      </div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;                    </nuxt-link>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div v-else class="flex items-center space-x-4 pt-4">&ndash;&gt;-->
<!--&lt;!&ndash;                    <a&ndash;&gt;-->
<!--&lt;!&ndash;                      href="https://amjilt.com/register"&ndash;&gt;-->
<!--&lt;!&ndash;                      target="_blank"&ndash;&gt;-->
<!--&lt;!&ndash;                      class="w-full group"&ndash;&gt;-->
<!--&lt;!&ndash;                    >&ndash;&gt;-->
<!--&lt;!&ndash;                      <div&ndash;&gt;-->
<!--&lt;!&ndash;                        class="border border-regal-purple bg-white transition-all duration-300 group-hover:shadow-5xl text-regal-purple text-sm py-2 px-4 rounded-full text-center"&ndash;&gt;-->
<!--&lt;!&ndash;                      >&ndash;&gt;-->
<!--&lt;!&ndash;                        {{ $t("home.signUp") }}&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    </a>&ndash;&gt;-->
<!--&lt;!&ndash;                    <a href="#" @click="login" class="w-full group">&ndash;&gt;-->
<!--&lt;!&ndash;                      <div&ndash;&gt;-->
<!--&lt;!&ndash;                        class="border border-regal-purple bg-regal-purple group-hover:shadow-5xl transition-all duration-300 text-white text-sm py-2 px-4 rounded-full text-center"&ndash;&gt;-->
<!--&lt;!&ndash;                      >&ndash;&gt;-->
<!--&lt;!&ndash;                        {{ $t("home.signIn") }}&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    </a>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <img alt="" class="object-contain" src="/amjilthome/bigImage/zuzu3.png"/>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;            <div&ndash;&gt;-->
<!--&lt;!&ndash;              class="col-span-12 lg:col-span-5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-lg h-full"&ndash;&gt;-->
<!--&lt;!&ndash;            >&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="flex flex-col justify-between h-full space-y-6">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="space-y-6 px-8 py-6">&ndash;&gt;-->
<!--&lt;!&ndash;                  <div class="">{{ $t("home.featuredProgram") }}</div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div class="group">&ndash;&gt;-->
<!--&lt;!&ndash;                    <nuxt-link&ndash;&gt;-->
<!--&lt;!&ndash;                      to="/learn"&ndash;&gt;-->
<!--&lt;!&ndash;                      class="flex items-start space-x-4 cursor-pointer"&ndash;&gt;-->
<!--&lt;!&ndash;                    >&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="flex flex-none mt-0.5">&ndash;&gt;-->
<!--&lt;!&ndash;                        <img&ndash;&gt;-->
<!--&lt;!&ndash;                          alt=""&ndash;&gt;-->
<!--&lt;!&ndash;                          class="w-8 flex-none transition-all duration-300 hidden dark:block"&ndash;&gt;-->
<!--&lt;!&ndash;                          src="/amjilthome/icons/white/erp_w.svg"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                        <img&ndash;&gt;-->
<!--&lt;!&ndash;                          alt=""&ndash;&gt;-->
<!--&lt;!&ndash;                          class="w-8 flex-none transition-all duration-300 block dark:hidden"&ndash;&gt;-->
<!--&lt;!&ndash;                          src="/amjilthome/icons/pink/erp.svg"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="flex space-x-4 font-medium dark:font-normal">&ndash;&gt;-->
<!--&lt;!&ndash;                        <div>&ndash;&gt;-->
<!--&lt;!&ndash;                          <span&ndash;&gt;-->
<!--&lt;!&ndash;                            class="text-2xl font-medium group-hover:text-regal-purple dark:font-normal text-slate-900 dark:text-slate-50 dark:group-hover:text-slate-300 dark:text-white"&ndash;&gt;-->
<!--&lt;!&ndash;                          >Amjilt Learn</span&ndash;&gt;-->
<!--&lt;!&ndash;                          >&ndash;&gt;-->
<!--&lt;!&ndash;                          <p&ndash;&gt;-->
<!--&lt;!&ndash;                            class="font-light leading-4 text-sm group-hover:text-regal-purple dark:text-slate-400 dark:group-hover:text-slate-200 text-slate-600"&ndash;&gt;-->
<!--&lt;!&ndash;                          >&ndash;&gt;-->
<!--&lt;!&ndash;                            {{ $t("home.Learn_Text") }}&ndash;&gt;-->
<!--&lt;!&ndash;                          </p>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="group-hover:animate-arrow-forwarding mt-1">&ndash;&gt;-->
<!--&lt;!&ndash;                          <span class=""&ndash;&gt;-->
<!--&lt;!&ndash;                          ><font-awesome-icon&ndash;&gt;-->
<!--&lt;!&ndash;                            class="text-sm text-slate-500 group-hover:text-regal-purple dark:group-hover:text-white dark:text-white"&ndash;&gt;-->
<!--&lt;!&ndash;                            icon="fa-solid fa-angle-right"&ndash;&gt;-->
<!--&lt;!&ndash;                          /></span>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    </nuxt-link>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div class="group">&ndash;&gt;-->
<!--&lt;!&ndash;                    <nuxt-link&ndash;&gt;-->
<!--&lt;!&ndash;                      to="/pos"&ndash;&gt;-->
<!--&lt;!&ndash;                      class="flex items-start space-x-4 cursor-pointer"&ndash;&gt;-->
<!--&lt;!&ndash;                    >&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="flex flex-none mt-0.5">&ndash;&gt;-->
<!--&lt;!&ndash;                        <img&ndash;&gt;-->
<!--&lt;!&ndash;                          alt=""&ndash;&gt;-->
<!--&lt;!&ndash;                          class="w-8 flex-none transition-all duration-300 hidden dark:block"&ndash;&gt;-->
<!--&lt;!&ndash;                          src="/amjilthome/icons/white/pos_w.svg"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                        <img&ndash;&gt;-->
<!--&lt;!&ndash;                          alt=""&ndash;&gt;-->
<!--&lt;!&ndash;                          class="w-8 flex-none transition-all duration-300 block dark:hidden"&ndash;&gt;-->
<!--&lt;!&ndash;                          src="/amjilthome/icons/pink/pos.svg"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->

<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="flex space-x-4 font-medium dark:font-normal">&ndash;&gt;-->
<!--&lt;!&ndash;                        <div>&ndash;&gt;-->
<!--&lt;!&ndash;                          <span&ndash;&gt;-->
<!--&lt;!&ndash;                            class="text-2xl font-medium group-hover:text-regal-purple dark:font-normal text-slate-900 dark:text-slate-50 dark:group-hover:text-slate-300 dark:text-white"&ndash;&gt;-->
<!--&lt;!&ndash;                          >Amjilt POS</span&ndash;&gt;-->
<!--&lt;!&ndash;                          >&ndash;&gt;-->
<!--&lt;!&ndash;                          <p&ndash;&gt;-->
<!--&lt;!&ndash;                            class="font-light leading-4 text-sm group-hover:text-regal-purple dark:text-slate-400 dark:group-hover:text-slate-200 text-slate-600"&ndash;&gt;-->
<!--&lt;!&ndash;                          >&ndash;&gt;-->
<!--&lt;!&ndash;                            {{ $t("home.Pos_Text") }}&ndash;&gt;-->
<!--&lt;!&ndash;                          </p>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="group-hover:animate-arrow-forwarding mt-1">&ndash;&gt;-->
<!--&lt;!&ndash;                          <span class=""&ndash;&gt;-->
<!--&lt;!&ndash;                          ><font-awesome-icon&ndash;&gt;-->
<!--&lt;!&ndash;                            class="text-sm text-slate-500 group-hover:text-regal-purple dark:group-hover:text-white dark:text-white"&ndash;&gt;-->
<!--&lt;!&ndash;                            icon="fa-solid fa-angle-right"&ndash;&gt;-->
<!--&lt;!&ndash;                          /></span>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    </nuxt-link>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div class="group">&ndash;&gt;-->
<!--&lt;!&ndash;                    <nuxt-link&ndash;&gt;-->
<!--&lt;!&ndash;                      to="/booking"&ndash;&gt;-->
<!--&lt;!&ndash;                      class="flex items-start space-x-4 cursor-pointer"&ndash;&gt;-->
<!--&lt;!&ndash;                    >&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="flex flex-none mt-0.5">&ndash;&gt;-->
<!--&lt;!&ndash;                        <img&ndash;&gt;-->
<!--&lt;!&ndash;                          alt=""&ndash;&gt;-->
<!--&lt;!&ndash;                          class="w-8 flex-none transition-all duration-300 hidden dark:block"&ndash;&gt;-->
<!--&lt;!&ndash;                          src="/amjilthome/icons/white/sis_w.svg"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                        <img&ndash;&gt;-->
<!--&lt;!&ndash;                          alt=""&ndash;&gt;-->
<!--&lt;!&ndash;                          class="w-8 flex-none transition-all duration-300 block dark:hidden"&ndash;&gt;-->
<!--&lt;!&ndash;                          src="/amjilthome/icons/pink/sis.svg"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="flex space-x-4 font-medium dark:font-normal">&ndash;&gt;-->
<!--&lt;!&ndash;                        <div>&ndash;&gt;-->
<!--&lt;!&ndash;                          <span&ndash;&gt;-->
<!--&lt;!&ndash;                            class="text-2xl font-medium group-hover:text-regal-purple dark:font-normal text-slate-900 dark:text-slate-50 dark:group-hover:text-slate-300 dark:text-white"&ndash;&gt;-->
<!--&lt;!&ndash;                          >Amjilt Booking</span&ndash;&gt;-->
<!--&lt;!&ndash;                          >&ndash;&gt;-->
<!--&lt;!&ndash;                          <p&ndash;&gt;-->
<!--&lt;!&ndash;                            class="font-light leading-4 text-sm group-hover:text-regal-purple dark:text-slate-400 dark:group-hover:text-slate-200 text-slate-600"&ndash;&gt;-->
<!--&lt;!&ndash;                          >&ndash;&gt;-->
<!--&lt;!&ndash;                            {{ $t("home.Booking_Text") }}&ndash;&gt;-->
<!--&lt;!&ndash;                          </p>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="group-hover:animate-arrow-forwarding mt-1">&ndash;&gt;-->
<!--&lt;!&ndash;                          <span class=""&ndash;&gt;-->
<!--&lt;!&ndash;                          ><font-awesome-icon&ndash;&gt;-->
<!--&lt;!&ndash;                            class="text-sm text-slate-500 group-hover:text-regal-purple dark:group-hover:text-white dark:text-white"&ndash;&gt;-->
<!--&lt;!&ndash;                            icon="fa-solid fa-angle-right"&ndash;&gt;-->
<!--&lt;!&ndash;                          /></span>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    </nuxt-link>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                  <div class="group">&ndash;&gt;-->
<!--&lt;!&ndash;                    <nuxt-link&ndash;&gt;-->
<!--&lt;!&ndash;                      to="/work"&ndash;&gt;-->
<!--&lt;!&ndash;                      class="flex items-start space-x-4 cursor-pointer"&ndash;&gt;-->
<!--&lt;!&ndash;                    >&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="flex flex-none mt-0.5">&ndash;&gt;-->
<!--&lt;!&ndash;                        <img&ndash;&gt;-->
<!--&lt;!&ndash;                          alt=""&ndash;&gt;-->
<!--&lt;!&ndash;                          class="w-8 flex-none transition-all duration-300 hidden dark:block"&ndash;&gt;-->
<!--&lt;!&ndash;                          src="/amjilthome/icons/white/lms_w.svg"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                        <img&ndash;&gt;-->
<!--&lt;!&ndash;                          alt=""&ndash;&gt;-->
<!--&lt;!&ndash;                          class="w-8 flex-none transition-all duration-300 block dark:hidden"&ndash;&gt;-->
<!--&lt;!&ndash;                          src="/amjilthome/icons/pink/lms.svg"&ndash;&gt;-->
<!--&lt;!&ndash;                        />&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      <div class="flex space-x-4 font-medium dark:font-normal">&ndash;&gt;-->
<!--&lt;!&ndash;                        <div>&ndash;&gt;-->
<!--&lt;!&ndash;                          <span&ndash;&gt;-->
<!--&lt;!&ndash;                            class="text-2xl font-medium group-hover:text-regal-purple dark:font-normal text-slate-900 dark:text-slate-50 dark:group-hover:text-slate-300 dark:text-white"&ndash;&gt;-->
<!--&lt;!&ndash;                          >Amjilt WORk</span&ndash;&gt;-->
<!--&lt;!&ndash;                          >&ndash;&gt;-->
<!--&lt;!&ndash;                          <p&ndash;&gt;-->
<!--&lt;!&ndash;                            class="font-light leading-4 text-sm group-hover:text-regal-purple dark:text-slate-400 dark:group-hover:text-slate-200 text-slate-600"&ndash;&gt;-->
<!--&lt;!&ndash;                          >&ndash;&gt;-->
<!--&lt;!&ndash;                            {{ $t("home.WORk_Text") }}&ndash;&gt;-->
<!--&lt;!&ndash;                          </p>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                        <div class="group-hover:animate-arrow-forwarding mt-1">&ndash;&gt;-->
<!--&lt;!&ndash;                          <span class=""&ndash;&gt;-->
<!--&lt;!&ndash;                          ><font-awesome-icon&ndash;&gt;-->
<!--&lt;!&ndash;                            class="text-sm text-slate-500 group-hover:text-regal-purple dark:group-hover:text-white dark:text-white"&ndash;&gt;-->
<!--&lt;!&ndash;                            icon="fa-solid fa-angle-right"&ndash;&gt;-->
<!--&lt;!&ndash;                          /></span>&ndash;&gt;-->
<!--&lt;!&ndash;                        </div>&ndash;&gt;-->
<!--&lt;!&ndash;                      </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    </nuxt-link>&ndash;&gt;-->
<!--&lt;!&ndash;                  </div>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->

<!--&lt;!&ndash;              </div>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->

<!--      <Auth-->
<!--        class="py-6"-->
<!--        @on-login="onLogin"-->
<!--        :authType="authType"-->
<!--        @changeAuthType="changeAuthType"-->
<!--      />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { mapGetters } from "vuex";-->
<!--import { userInfo } from "~/store/useSiteSettings";-->
<!--import Auth from "~/components/common/auth.vue";-->
<!--import { USER_INFO } from "~/store/mutation-types";-->

<!--export default {-->
<!--  name: "Top",-->
<!--  components: { Auth },-->
<!--  computed: {-->
<!--    ...mapGetters([-->
<!--      "languages",-->
<!--      "language",-->
<!--      // ...-->
<!--    ]),-->
<!--    getCurrentLanguage() {-->
<!--      return this.$store.state.language;-->
<!--    },-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      userInfo,-->
<!--      RegisterModal: false,-->
<!--      authModal: false,-->
<!--      roleSelect: true,-->
<!--      authType: "login",-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    login(event) {-->
<!--      event.preventDefault();-->
<!--      this.authModal = true;-->
<!--    },-->
<!--    onLogin() {-->
<!--      this.authModal = false;-->
<!--      this.roleSelect = true;-->

<!--      this.$router.replace("/select-role");-->
<!--    },-->
<!--    changeAuthType() {-->
<!--      if (this.authType === "login") {-->
<!--        this.authType = "register";-->
<!--      } else {-->
<!--        this.authType = "login";-->
<!--      }-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped></style>-->
