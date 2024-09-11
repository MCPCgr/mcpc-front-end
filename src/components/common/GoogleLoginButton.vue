<script>
import {decodeCredential, useCodeClient} from "vue3-google-signin";
import axios from "axios";
import ls from "~/utils/Storage";
import {ACCESS_TOKEN, USER_INFO} from "~/store/mutation-types";
import {setToken} from "~/plugins/core/axios";

export default {
  data() {
    return {
      isReady: false,
      login: null
    };
  },

  mounted() {
    const { isReady, login } = useCodeClient({
      onSuccess: this.handleOnSuccess,
      onError: this.handleOnError,
      // other options
    });
    this.isReady = isReady;
    this.login = login;
  },

  methods: {
    async handleOnSuccess(resp) {
      //let user = decodeCredential(resp.credential)


      console.log(resp, 'user')
      // axios.post("https://api.amjilt.com/main/api/auth/google/login", user).then((response) => {
      //   if (response.status === 200) {
      //     ls.set(USER_INFO, response.data.user_info)
      //     this.$store.commit(USER_INFO, response.data.user_info)
      //
      //     ls.set(ACCESS_TOKEN, response.data.user_token)
      //     this.setCookie(response.data.user_token);
      //     setToken(response.data.user_token)
      //   }
      // })
    },

    handleOnError(errorResponse) {
      console.log("Error: ", errorResponse);
    },

    loginWithGoogle() {
      if (this.isReady && this.login) {
        this.login();
      }
    },
  }
}
</script>

<template>
  <button :disabled="!isReady" @click="loginWithGoogle">Login with Google</button>
</template>
