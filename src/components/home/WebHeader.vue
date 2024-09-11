<template>
  <header
    class="py-3 lg:fixed lg:inset-x-0 bg-white z-20 dark:bg-slate-900 shadow-4xl dark:border-slate-700 dark:border-b"
  >
    <div class="container mx-auto px-6">
      <nav class="relative z-50 flex justify-between">
        <div class="flex items-center md:gap-x-10">
          <nuxt-link aria-label="Home" to="/" class="">
            <div
              class="mx-auto h-10 2xl:w-36 w-32 dark:bg-logo-dark bg-center">
              <img src="/amjilthome/logos/mcpc-gr.svg" alt="logo">
            </div>
          </nuxt-link>


        </div>
      </nav>
    </div>
  </header>
  <div style="padding-top: 62px" class="hidden lg:block"></div>
</template>
<script>
import ThemeSwitcher from "~/components/common/ThemeSwitcher";
import { mapGetters } from "vuex";
import { userInfo } from "~/store/useSiteSettings";
import HomeUsertools from "./HomeUsertools/UserMenu/index.vue";
import DarkLightMode from "~/components/tools/DarkLightMode.vue";
export default {
  computed: {
    ...mapGetters([
      "languages",
      "language",
      // ...
    ]),
    getCurrentLanguage() {
      return this.$i18n.locale;
    },
  },
  components: {
    DarkLightMode,

    ThemeSwitcher,
    HomeUsertools,
  },
  data() {
    return {
      mobileMenu: false,
      RegisterModal: false,
      authModal: false,
      authType: "login",
      userInfo: userInfo,
    };
  },
  methods: {
    changeAppLocale(locale) {
      localStorage.setItem("lang", locale);
      this.$i18n.locale = locale;
    },
    mobileRegister() {
      this.mobileMenu = false;
      this.$router.push("/register");
    },
  },
};
</script>
