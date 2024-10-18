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

import {mapGetters} from "vuex";
import {userInfo} from "~/store/useSiteSettings";
import Auth from "~/components/common/auth.vue";


definePageMeta({
  layout: 'login',
})
export default {
  name: "login",
  components: {Auth},
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
