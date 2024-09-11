<template>
  <div class="profiel-wrap px-[35px] pb-10 md:pt-[164px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
    <div class="absolute left-0 top-0 md:h-[250px] h-[150px] overflow-hidden w-full z-[-1] rounded-t-lg flex items-center justify-center">
      <img alt="image" class="h-full w-auto md:h-auto md:w-full object-cover" v-if="company.company_cover"
           :src="`${$base_url}${company.company_cover}`">
      <img alt="image" class="h-full w-auto md:h-auto md:w-full object-cover" v-else
           :src="`/amjilt-erp/images/cover.png`">
    </div>
    <div class="profile-box flex-none md:text-start text-center">
      <div class="md:flex items-end md:space-x-6 rtl:space-x-reverse">
        <div class="flex-none">
          <div class="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
            <img class="w-full h-full object-cover rounded-full" v-if="company.company_logo"
                 :src="`${$base_url}${company.company_logo}`"/>
            <img class="w-full h-full object-cover rounded-full" v-else :src="`${logo}`"/>

<!--            <button-->
<!--              v-if="userCompany && userCompany.id === company.id"-->
<!--              @click="edit"-->
<!--              class="router-link-active router-link-exact-active absolute right-2 h-10 w-10 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"-->
<!--              aria-current="page">-->
<!--&lt;!&ndash;              <span>&ndash;&gt;-->
<!--&lt;!&ndash;                <svg xmlns="http://www.w3.org/2000/svg"&ndash;&gt;-->
<!--&lt;!&ndash;                                             xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"&ndash;&gt;-->
<!--&lt;!&ndash;                                             width="1em" height="1em" preserveAspectRatio="xMidYMid meet"&ndash;&gt;-->
<!--&lt;!&ndash;                                             viewBox="0 0 24 24" class="iconify iconify&#45;&#45;heroicons"><path fill="none"&ndash;&gt;-->
<!--&lt;!&ndash;                                                                                                          stroke="currentColor"&ndash;&gt;-->
<!--&lt;!&ndash;                                                                                                          stroke-linecap="round"&ndash;&gt;-->
<!--&lt;!&ndash;                                                                                                          stroke-linejoin="round"&ndash;&gt;-->
<!--&lt;!&ndash;                                                                                                          stroke-width="1.5"&ndash;&gt;-->
<!--&lt;!&ndash;                                                                                                          d="m16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"></path>&ndash;&gt;-->
<!--&lt;!&ndash;                </svg>&ndash;&gt;-->
<!--&lt;!&ndash;              </span>&ndash;&gt;-->
<!--              <menu-outlined :style="{color: '#000000'}" />-->
<!--            </button>-->
          </div>
        </div>
        <div class="flex-1">
          <div class="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]"> {{ company.company_name }}</div>
          <div class="text-sm font-light text-slate-600 dark:text-slate-400">
            <nuxt-link :to="`/company/${company.company_domain}`">{{ company.company_domain }}</nuxt-link>

            <br> И-мэйл: {{ company.company_mail }}
          </div>
        </div>
      </div>
    </div>
    <div class="profile-info-500 ">
      <!--        <div class="flex-1">-->
      <!--                    <div class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"> {{ userInfo.email }}</div>-->
      <!--                    <div class="text-sm text-slate-600 font-light dark:text-slate-300"> И-мэйл</div>-->
      <!--        </div>-->
<!--      <div class="flex-1">-->
<!--        <div class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1 text-right">-->
<!--          {{ company.company_phone }}-->
<!--        </div>-->
<!--        <div class="text-sm text-slate-600 font-light dark:text-slate-300 text-right"> Утас</div>-->
<!--      </div>-->
      <div class="flex-1">
        <button @click="showQR = true" class="flex justify-end w-full">
          <div class="pb-4">
            <inline-svg
              src="/assets/icons/organization/qr.svg"  class="svg-icon"
            />

          </div>

        </button>
        <div v-if="userCompany && userCompany.id === company.id" @click="edit"
             class="bg-slate-100 text-slate-600 rounded-full shadow-sm flex items-center justify-center py-2 px-4 cursor-pointer">
          <span class="pr-2">Мэдээлэл засах</span><edit-outlined />
        </div>

        <div class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1 text-right" v-if="company.id !== userCompany.id">
          <button :class="`partner-btn  flex p-2 rounded-md items-center justify-center ${partnerType === 'approved' ? 'approved' : ''}`" @click="createInvite">

            <span >
              <inline-svg src="/amjilt-erp/images/tatatonga.svg" />
            </span>
           <span class="ml-2 font-light">{{partnerStatus}}</span>
          </button>



        </div>

      </div>
    </div>

    <a-modal v-model:open="showInvite" title="Харилцагчийн хүсэлт илгээх" :footer="null" force-render>
      <dataform
v-if="showInvite"
        ref="form"
        schemaID="861"
        :editMode="false"
        :hideTitle="true"
        :onSuccess="onSuccess"
        :onError="onError"
        :do_render="showInvite"
        :onReady="formReady"
        :permissions="{
        c: true,
        r: false,
        u: false,
        d: false,
      }"
        :user_condition="null"
      ></dataform>
      <!--    </div>-->

      <template #footer> </template>
    </a-modal>
    <a-modal v-model:open="showQR" :title="company.company_name" @ok="printQR" okText="Хэвлэх" cancel-text="Болих">
      <div :id="`printArea-${company.id}`" class="text-center printArea-qr">
        <h2 class="text-base font-bold text-center uppercase" >{{ company.company_name }}</h2>
        <div class="text-base font-light dark:text-slate-400 text-center pb-4" >QR -ийг уншуулж ирцийн бүртгэл хийх цамхгийн хүсэлт илгээнэ үү</div>

        <QRCodeVue3
          :width="400"
          :height="400"
          :value="company.id"
          :cornersSquareOptions="{ type: 'square', color: '#227bf4' }"
          :cornersDotOptions="{ type: undefined, color: '#227bf4' }"
          fileExt="png"
          :dotsOptions="{
            type: 'square',
            color: '#e74a06',

          }"
          class="img2 "


        />
      </div>
    </a-modal>
  </div>
</template>

<script>
import { MenuOutlined, EditOutlined } from '@ant-design/icons-vue';
import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
import axios from "axios";
import { notification } from 'ant-design-vue';
import printd from "@lambda-platform/lambda-vue/src/modules/datagrid/utils/print";

import QRCodeVue3 from "qrcode-vue3";
export default {
  name: "Cover",
  props:["company", "userCompany"],
  components:{
    QRCodeVue3,
    MenuOutlined,
    EditOutlined,
  },
  data(){
    const userInfo = ls.get(USER_INFO);
    return {
      userInfo,
      logo: "/amjilt-erp/images/logo.svg",
      logoDark: "/amjilt-erp/images/logo.svg",
      showInvite:false,
      loading:true,
      partnerType:"no",
      showQR:false
    }
  },
  computed:{
    partnerStatus(){

      if(this.partnerType === "pending"){
        return "Хүсэлт хүлээгдэж байна"
      } else if(this.partnerType === "approved"){
        return "Хамрагч байгууллага"
      } else if(this.partnerType === "reject"){
        return "Хүсэлт Буцаасан"
      }
      return "Харилцагч болох"
    }
  },
  mounted() {
    this.init();

    // /
  },
  methods:{
    async init(){
      if(this.company.id !== this.userCompany.id){
        try {
          this.loading = true;
          const response = await axios.post('/api/partner-invite', {
            "company_id": this.userCompany.id,
            "partner_id":this.company.id
          });

          if(response.data["invite_status"]){
            this.partnerType = response.data["invite_status"];
          } else {
            this.partnerType = "no"
          }

        } catch (error) {
          // Handle error here.
          this.partnerType = "no"
        } finally {
          this.loading = false;
        }
      }
    },
    createInvite(){

      if(this.partnerType === "no"){
            this.showInvite=true;
      }else if(this.partnerType === "pending"){


        notification["warning"]({
          message: 'Хүсэлт хүлээгдэж байна',
          description:
            'Таны хүсэлтэд хариу өгөөгүй байна. ',
        });
      } else if(this.partnerType === "approved"){

        notification["success"]({
          message: 'Хамрагч байгууллага',
          description:
            'Хамрагч байгууллага ',
        });

      } else if(this.partnerType === "reject"){
        notification["error"]({
          message: 'Хүсэлт Буцаасан',
          description:
            'Таны хүсэлтыг хүлээж аваагүй байна. ',
        });

      }
    },
    edit(){
      this.$emit("edit")
    },
    onSuccess(){
      this.showInvite = false;
    },
    onError(){

    },
    formReady(){
      this.$nextTick(() => {
        this.$refs.form.setSchemaByModel("invited_company_id", "value", this.company.id, false);
        this.$refs.form.setSchemaByModel("invited_company_id", "disabled", true, false);
        this.$refs.form.setSchemaByModel("sent_copany_id", "value", this.userCompany.id, false);
        this.$refs.form.setSchemaByModel("sent_user_id", "value", this.userInfo.id, false);
        this.$refs.form.setSchemaByModel("sent_copany_id", "disabled", true, false);
      });
    },
    printQR(){
      var d  = new printd();

      d.print(document.getElementById('printArea-'+this.company.id), [`.printArea-qr {
  font-family: Arial;
  text-align: center;
}
.printArea-qr h2{
  font-family: Arial;
  text-align: center;
}
.printArea-qr img {
  margin: auto;
  display:block;
}`]);

    }
  }
}
</script>

<style scoped>

</style>
