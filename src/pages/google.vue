<template>
  <div>
    <div>
<!--      <button @click="handleGoogleLogin">Login with Google</button>-->
<!--      <CommonGoogleLoginButton />-->
      <GoogleSignInButton @success="onSuccess" @error="onError" />

      <div v-if="isLoading">Loading...</div>
      <div v-else v-if="userInfo">
        <p>Welcome, {{ userInfo }}</p>
        <!-- Display other user information as needed -->
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { decodeCredential } from "vue3-google-signin"
  import ls from '~/utils/Storage'
  import { USER_INFO, ACCESS_TOKEN } from '~/store/mutation-types'
  import { setToken } from '~/plugins/core/axios'
  import {userInfo} from "~/store/useSiteSettings";

  export default {
    data() {
      return {
        isLoading: false,
        user: {},
        userInfo
      }
    },
    methods: {
      setCookie(token){
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + (72000 * 60 * 60 * 1000)); // 72 hours from now
        const expires = `expires=${expiration.toUTCString()}`;

        document.cookie = `token=${token}; Secure; Domain=.amjilt.com; Path=/; SameSite=Strict; ${expires}`;
        document.cookie = `amjilt_token=${token}; Secure; Domain=.amjilt.com; Path=/; SameSite=Strict; ${expires}`;

      },
      onSuccess(resp) {
        let user = decodeCredential(resp.credential)

        // prod https://mcpc.mn/api/auth/google/login
        // dev http://127.0.0.1:8003/api/auth/google/login
        axios.post("https://mcpc.mn/api/auth/google/login", user).then((response) => {
          if (response.status === 200) {
            // ls.set(USER_INFO, response.data.user_info)
            this.$store.commit(USER_INFO, response.data.user_info)

            ls.set(ACCESS_TOKEN, response.data.user_token)
            this.setCookie(response.data.user_token);
            setToken(response.data.user_token)
          }
        })
      },
      onError(resp) {
        console.log(resp)
      },
    },
    beforeCreate() {
      definePageMeta({
        layout: 'home',
      })
    },
  }
</script>



<style scoped>

</style>
