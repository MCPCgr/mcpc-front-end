<template>
  <div class="user-search">
    <a-form
      :model="companySearch"
      autocomplete="off"
      @finish="onSearch"
      v-show="partner.id === null || partner.id === ''"
    >
      <div class="ant-col ant-form-item-label"><label for="form_item_user_id" class="" title="Байгууллага хайх">Байгууллага
        хайх<!----></label></div>
      <div>
        <a-input-search v-model:value="companySearch.value"
                        placeholder="Байгууллагын нэр, регистрийн дугаар хайх " enter-button
                        :loading="loading" @search="onSearch">
          <template #prefix>
            <span class="svg-icon">
              <inline-svg src="/assets/icons/duotone/Home/Building.svg"/>
            </span>
          </template>
          <template #suffix>
            <a-tooltip
              title="Байгууллагын нэр, регистрийн дугаар хайх боломжтой">
              <info-circle-outlined style="color: var(--ant-primary-color)"/>
            </a-tooltip>
          </template>
        </a-input-search>
      </div>
    </a-form>
    <a-modal
      v-model:open="showCompanyModal"
      title="Байгууллага"
      okText="Урих"
      cancel-text="Болих"
      @ok="registerCompany"
    >
      <div>

        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="flex items-center justify-center h-32 bg-gray-200 overflow-hidden">
            <img :src="$base_url+TMPpartner.company_logo" v-if="TMPpartner.company_logo" alt="User Avatar" class="w-auto h-24 rounded-full">
            <div class="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center" v-else>
              <BuildOutlined style="color:white; font-size: 28px;" class=""/>
            </div>

          </div>
          <div class="p-6">
            <div class="text-gray-800 font-bold text-xl"></div>
            <div class="text-gray-600 text-sm mt-2">
              <div>Байгууллагын нэр: {{ TMPpartner.company_name }}</div>

              <div>РД: {{ TMPpartner.company_register }}</div>

            </div>
          </div>
        </div>
      </div>
    </a-modal>
    <div class="mx-auto" v-if="partner.id !== null && partner.id !== ''">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden flex">
        <nuxt-link :to="`/company/${partner.company_domain}`"
                   class="flex items-center justify-center h-36 bg-gray-200 overflow-hidden p-3">
          <img :src="$base_url+partner.company_logo" v-if="partner.company_logo" alt="User Avatar" class="w-auto h-24 rounded-full">
          <div class="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center" v-else>
            <BuildOutlined style="color:white; font-size: 28px;" class=""/>
          </div>
        </nuxt-link>
        <div class="p-3">
          <div class="text-gray-800 font-bold text-lg"></div>
          <div class="text-gray-600 text-sm mt-2">
            <div>Байгууллагын нэр: {{ partner.company_name }}</div>

            <div>РД: {{ partner.company_register }}</div>

          </div>



        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '@lambda-platform/lambda-vue/src/modules/dataform/elements/_mixin';
import {COMPANY} from '~/store/mutation-types-tatatonga';
import axios from 'axios'
import ls from "~/utils/Storage";
import {InfoCircleOutlined, BuildOutlined, EditOutlined} from "@ant-design/icons-vue";
import {notification} from 'ant-design-vue';


export default {
  mixins: [mixin],
  components: {
    InfoCircleOutlined, BuildOutlined, EditOutlined
  },
  data() {
    const company = ls.get(COMPANY);
    return {
      company: company,
      companySearch: {
        value: null,
        company_id: company.company_id
      },
      showCompanyModal: false,
      loading: false,
      partner: {
        id: null,
        company_logo: null,
        company_name: null,
        company_register: null,
        company_domain:null

      },
      TMPpartner: {
        id: null,
        company_logo: null,
        company_name: null,
        company_register: null,
        company_domain:null
      }
    }
  },
  mounted() {

    this.init()
  },
  watch: {
    itemValue(value, oldValue) {
      if ((oldValue && !value) || (value && !oldValue)) {
        if (value) {
          this.init()
        } else {
          this.setNull();
        }
      }
    }
  },
  methods: {
    setNull() {
      this.model.form["invited_company_id"] = null;
      this.partner = {
        id: null,
        company_logo: null,
        company_name: null,
        company_register: null,
        company_domain:null
      };
      this.TMPpartner = {
        id: null,
        company_logo: null,
        company_name: null,
        company_register: null,
        company_domain:null
      }
    },
    init() {
      if (this.model.form[this.model.component]) {
        axios.post('/api/company-data', {
          id: this.model.form[this.model.component]
        }).then(response => {
          this.partner = {...response.data, company_register:this.maskRegisterNumber(response.data.company_register)};

        })
          .catch((e) => {
            this.setNull();
          });
      }
    },
    maskRegisterNumber(register) {
      var registerStr = register.toString();
      var length = registerStr.length;

      // Check if the register number has at least 3 digits
      if (length < 3) {
        return "Invalid register number";
      }

      // Extract the first and last digits
      var firstDigit = registerStr[0];
      var lastDigit = registerStr[length - 1];

      // Create the masked string
      var maskedStr = firstDigit + "*".repeat(length - 2) + lastDigit;
      return maskedStr;
    },
    fillEmpData(){
      this.model.form["invited_company_id"] = this.partner.id;
    },
    registerCompany() {
      if (this.TMPpartner.id) {
        this.showCompanyModal = false;
        if(this.TMPpartner.id != null && this.TMPpartner.id !== ""){
          this.partner = {...this.TMPpartner}
        }

        this.fillEmpData();

        if(this.TMPpartner.id != null && this.TMPpartner.id !== "") {
          this.TMPpartner = {
            id:null,
            avatar:null,
            email:null,
            gender:null,
            birthday:null,
            register_number:null,
            first_name:null,
            last_name:null,
            login:null,
          };
        }
      }

    },
    onSearch() {

      if (this.companySearch.value !== null && this.companySearch.value !== "") {
        if (!this.loading) {
          this.loading = true;

          axios.post('/api/company-find', this.companySearch)
            .then(response => {
              this.TMPpartner = {...response.data.company, company_register:response.data.register,};
              this.showCompanyModal = true;
            })
            .catch((e) => {
              this.setNull();
              if (e.response.data) {
                if (e.response.data.message === "already") {
                  notification.warning({
                    message: 'Байгууллага',
                    description:
                      'Байгууллагттай харилцагч болсон байна. Дахин бүртгэх боломжгүй',
                  });
                  return
                }
              }
              notification.warning({
                message: 'Байгууллага олдсонгүй',
                description:
                  'Байгууллагын мэдээлэл олдсонгүй',
              });

            })
            .finally(() => {
              this.loading = false;

            });


        }
      } else {
        this.loading = false;
        notification.warning({
          message: 'Байгууллага олдсонгүй',
          description:
            'Хайх утга оруулаагүй байна',
        });
      }
    },
  }


}
</script>

<style scoped>

</style>
