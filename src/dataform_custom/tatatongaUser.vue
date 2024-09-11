<template>
  <div class="user-search">
    <a-form
      :model="userSearch"
      autocomplete="off"
      @finish="onSearch"
      v-show="user.id === null || user.id === ''"
    >
      <div class="ant-col ant-form-item-label"><label for="form_item_user_id" class="" title="Хэрэглэгч хайх">Хэрэглэгч
        хайх<!----></label></div>
      <div>
        <a-input-search v-model:value="userSearch.value"
                        placeholder="Хэрэглэгч хайх гар утас, регистрийн дугаар, и-мэйлээр хайх" enter-button
                        :loading="loading" @search="onSearch">
          <template #prefix>
            <span class="svg-icon">
              <inline-svg src="/assets/icons/duotune/communication/com006.svg"/>
            </span>
          </template>
          <template #suffix>
            <a-tooltip
              title="Хэрэглэгчийн сангаас хаалтад илрэх боломжтой хэрэглэгчийн гар утас, регистрийн дугаар, и-мэйлээр хайж байгууллагад ажилтаар бүртгэх боломжтой">
              <info-circle-outlined style="color: var(--ant-primary-color)"/>
            </a-tooltip>
          </template>
        </a-input-search>
      </div>
    </a-form>
    <a-modal
      v-model:open="showUserModal"
      title="Хэрэглэгч"
      okText="Бүртгэх"
      cancel-text="Болих"
      @ok="registerUser"
    >
      <div>

        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="flex items-center justify-center h-32 bg-gray-200 overflow-hidden">
            <img :src="$base_url+TMPuser.avatar" v-if="TMPuser.avatar" alt="User Avatar" class="w-auto h-24 rounded-full">
            <div class="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center" v-else>
              <UserOutlined style="color:white; font-size: 28px;" class=""/>
            </div>

          </div>
          <div class="p-6">
            <div class="text-gray-800 font-bold text-xl">{{ TMPuser.last_name }} овогтой {{ TMPuser.first_name }}</div>
            <div class="text-gray-600 text-sm mt-2">
              <div>И-Мэйл: {{ TMPuser.email }}</div>
              <div>Утас: {{ TMPuser.phone }}</div>
              <div>РД: {{ TMPuser.register_number }}</div>
              <div>Төрсөн өдөр: {{ $date(TMPuser.birthday) }}</div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
    <div class="mx-auto" v-if="user.id !== null && user.id !== ''">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden flex">
        <nuxt-link :to="`/user/${user.login}`"
                   class="flex items-center justify-center h-36 bg-gray-200 overflow-hidden p-3">
          <img :src="$base_url+user.avatar" v-if="user.avatar" alt="User Avatar" class="w-auto h-24 rounded-full">
          <div class="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center" v-else>
            <UserOutlined style="color:white; font-size: 28px;" class=""/>
          </div>
        </nuxt-link>
        <div class="p-3">
          <div class="text-gray-800 font-bold text-lg">{{ user.last_name }} овогтой {{ user.first_name }}</div>
          <div class="text-gray-600 text-sm mt-2">
            <div>И-Мэйл: {{ user.email }}</div>
            <div>Утас: {{ user.phone }}</div>
            <div>РД: {{ user.register_number }}</div>
            <div>Төрсөн өдөр: {{ $date(user.birthday) }}</div>
          </div>

          <a-dropdown>
            <div class="absolute right-4 top-4">
              <a-button type="primary" shape="circle" class="" @click.prevent>
                <template #icon>
                  <EditOutlined/>
                </template>
              </a-button>
            </div>

            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="setNull">Холболт салгах</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="fillEmpData">Мэдээлэл хэрэглэгчээс авах</a>
                </a-menu-item>
                <a-menu-item>
                  <nuxt-link :to="`/user/${user.login}`">Хэрэглэгчийн хуудас харах</nuxt-link>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>

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
import {InfoCircleOutlined, UserOutlined, EditOutlined} from "@ant-design/icons-vue";
import {notification} from 'ant-design-vue';

export default {
  mixins: [mixin],
  components: {
    InfoCircleOutlined, UserOutlined, EditOutlined
  },
  data() {
    const company = ls.get(COMPANY);
    return {
      company: company,
      userSearch: {
        value: null,
        company_id: company.company_id
      },
      showUserModal: false,
      loading: false,
      user: {
        id: null,
        avatar: null,
        email: null,
        phone: null,
        gender: null,
        birthday: null,
        register_number: null,
        first_name: null,
        last_name: null,
        login: null,
      },
      TMPuser: {
        id: null,
        avatar: null,
        email: null,
        phone: null,
        gender: null,
        birthday: null,
        register_number: null,
        first_name: null,
        last_name: null,
        login: null,
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
      this.model.form["user_id"] = null;
      this.user = {
        id: null,
        avatar: null,
        email: null,
        phone: null,
        gender: null,
        birthday: null,
        register_number: null,
        first_name: null,
        last_name: null,
        login: null,
      };
      this.TMPuser = {
        id: null,
        avatar: null,
        email: null,
        phone: null,
        gender: null,
        birthday: null,
        register_number: null,
        first_name: null,
        last_name: null,
        login: null,
      }
    },
    init() {
      if (this.model.form[this.model.component]) {
        axios.post('/api/user-data', {
          user_id: this.model.form[this.model.component]
        }).then(response => {
          this.user = response.data;

        })
          .catch((e) => {
            this.setNull();
          });
      }
    },
    fillEmpData(){
      this.model.form["mail"] = this.user.email;
      this.model.form["lastname"] = this.user.last_name;
      this.model.form["firstname"] = this.user.first_name;
      this.model.form["gender"] = this.user.gender;
      this.model.form["birthday"] = this.user.birthday ? this.user.birthday : null;
      this.model.form["phone_one"] = this.user.phone;
      this.model.form["register"] = this.user.register_number;
      this.model.form["user_id"] = this.user.id;
    },
    registerUser() {
      if (this.TMPuser.id) {
        this.showUserModal = false;
        if(this.TMPuser.id != null && this.TMPuser.id !== ""){
          this.user = {...this.TMPuser}
        }

        this.fillEmpData();

        if(this.TMPuser.id != null && this.TMPuser.id !== "") {
          this.TMPuser = {
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

      if (this.userSearch.value !== null && this.userSearch.value !== "") {
        if (!this.loading) {
          this.loading = true;

          axios.post('/api/user-find', this.userSearch)
            .then(response => {
              this.TMPuser = response.data;
              this.showUserModal = true;
            })
            .catch((e) => {
              this.setNull();
              if (e.response.data) {
                if (e.response.data.message === "already") {
                  notification.warning({
                    message: 'Хэрэглэгч',
                    description:
                      'Хэрэглэгчийг та өөрийн байгууллагт ажилд авсан байна. Дахин бүртгэх боломжгүй',
                  });
                  return
                }
              }
              notification.warning({
                message: 'Хэрэглэгч олдсонгүй',
                description:
                  'Хэрэглэгчийн мэдээлэл олдсонгүй',
              });

            })
            .finally(() => {
              this.loading = false;

            });


        }
      } else {
        this.loading = false;
        notification.warning({
          message: 'Хэрэглэгч олдсонгүй',
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
