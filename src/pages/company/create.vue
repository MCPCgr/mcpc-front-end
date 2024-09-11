<template>
  <div class="grid grow grid-nogutter module-page container pb-16 px-4 mx-auto">
    <Head>
      <Title>{{title}}</Title>
    </Head>
    <div class="company-create">
      <img :src="`${logoDark}`" v-if="darkMode" class="logo-light" :alt="title">
      <img :src="`${logo}`"   v-if="!darkMode" class="logo-dark" :alt="title">

      <div class="mb-6 bg-gray-200 p-4 rounded-lg">
        <p class="text-lg font-semibold mb-2">Шинэ компани үүсгэх</p>
        <p>
          Tata-Tonga ERP систем нь компаниудын санхүү, борлуулалт, бүтээгдэхүүний удирдлага, ажилчдын удирдлага гэх мэт олон үйл ажиллагааг хянах удирдах боломжийг олгож байгаа платформ юм. Компанийн нэр, хаяг, утасны дугаар, имэйл хаяг гэх мэт мэдээллүүдийг агуулсан байх ёстой. Мэдээлэл оруулсны дараа "Бүртгэх" товчлуур дээр дарж компанийн мэдээлэл хадгалах боломжтой. Таны шинэ бизнест амжилт хүсье.
        </p>
      </div>

      <div class="mb-6 bg-white dark:bg-slate-600 p-4 rounded-lg">
        <dataform
          ref="form"
          :url="base_url"
          :hideTitle="true"
          schemaID="821"
          :onSuccess="onSuccess"
          :onReady="formReady"
        >
        </dataform>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ls from "~/utils/Storage";
import { USER_INFO } from '~/store/mutation-types'
definePageMeta({
  layout: 'module',
  title: 'Байгууллага бүртгүүлэх',
})
import { LAMBDA_CONFIG } from '~/store/mutation-types'
import { MENU } from '~/store/mutation-types'
import HomeMenuRender from '~/components/Menu/HomeMenuRender.vue'
import { darkMode } from '~/store/useSiteSettings'
import {base_url} from "~/consts/const";
import { isMobile } from '~/utils/device'
import {COMPANY} from "~/store/mutation-types-tatatonga";
export default {
  name: 'index',
  components:{
    HomeMenuRender
  },
  methods:{
    onSuccess (data) {



      ls.set(COMPANY, {
        access:"owner",
        company_address:data.company_address,
        company_cover:data.company_cover,
        company_id:data.id,
        id:data.id,
        company_logo:data.company_logo,
        company_name:data.company_name,
        company_phone:data.company_phone,
        created_at:data.created_at,
        user_id:data.user_id
    });


      window.location.replace('/company');

    },
    formReady() {
      this.$nextTick(() => {

        this.$refs.form.setSchemaByModel("user_id", "value", this.UserInfo.id, false);

      });
    },
  },
  data(){
    const LambdaConfig = ls.get(LAMBDA_CONFIG);
    const menu = ls.get(MENU);
    const UserInfo = ls.get(USER_INFO);
    return {
      isMobile,
      menu,
      title: LambdaConfig.title,
      logo: LambdaConfig.logo,
      logoDark: LambdaConfig.logo_dark,
      base_url:base_url,
      darkMode,
      UserInfo
    }
  }
}
</script>
<style lang="scss">
.company-create{
  .dataform-body .two-column-form-right {
    height: 570px !important;
    width: 100%;
  }
}
</style>
