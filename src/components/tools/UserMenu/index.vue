<template>
  <SearchBar class="action" v-if="!isMobile"/>
  <NoticePopover :userID="userID" :isMobile="isMobile"/>
  <DarkLightMode class="action" v-if="!isMobile"/>

  <div class="header-notice action" v-if="!isMobile">
    <nuxt-link to="/system-support" class="header-notice cursor-pointer">
      <span class="btn btn-icon ">
              <span class="svg-icon">

                      <inline-svg
                          src="/assets/icons/duotune/general/gen046.svg"
                      />
              </span>
    </span>
    </nuxt-link>
  </div>

  <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <div class="avatar">
<!--              <inline-svg-->
            <!--                src="/assets/icons/duotone/Interface/User.svg"-->
            <!--              />-->
              <img :src="base_url+avatar" alt="avatar" v-if="avatar">
            <span class="svg-icon-white" v-else>

                      <inline-svg
                          src="/assets/icons/duotune/communication/com006.svg"
                      />
                </span>&nbsp;

          </div>
          <!--          <span class="nickname text-gray-700 dark:text-gray-200" v-if="!isMobile && layoutMode !== 'topmenu'">&nbsp;&nbsp;{{-->
          <!--              nickname-->
          <!--            }}</span>-->
        </span>
    <template #overlay>
      <a-menu class="user-dropdown-menu-wrapper">
        <div class="flex items-center space-x-3 mr-2 pt-4 border-b pb-3 px-3 min-w-[180px]">
          <div class="avatarMenu flex  items-center align-center ">
            <img :src="base_url+avatar" alt="avatar" v-if="avatar" class="rounded-full w-8 h-8 ml-3 ">
            <div class="avatar ml-4" v-else>
              <span class="svg-icon-white rounded-full w-8 h-8 " ><inline-svg src="/assets/icons/duotune/communication/com006.svg"/></span>
            </div>

          </div>
          <div class="flex flex-col align-center">
            <span class="leading-4 dark:text-white">{{nickname}}</span>
            <!--            <span class="text-xs font-light"></span>-->
          </div>
        </div>
        <a-menu-item key="1"
        >
          <nuxt-link
              class="link link-icon "
              :to="`/user/${username}`"

          >
                <span class="svg-icon">

                      <inline-svg
                          src="/assets/icons/duotune/communication/com006.svg"
                      />
                </span>&nbsp;&nbsp;
            <span>{{ $t('appAdmin.profile') }}</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item key="2"
        >
          <router-link
              class="link link-icon "
              to="/erp/change-password"

          >
                <span class="svg-icon">

                      <inline-svg
                          src="/assets/icons/duotone/Home/Key.svg"
                      />
                </span>&nbsp;&nbsp;
            <span>{{ $t('appAdmin.changePassword') }}</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3"
        >
          <a
              class="link link-icon "
              href="/guide"
              target="_blank"
          >
                <span class="svg-icon">

                      <inline-svg
                          src="/assets/icons/duotone/Home/Book.svg"
                      />
                </span>&nbsp;&nbsp;
            <span>{{ $t('appAdmin.manual') }}</span>
          </a>
        </a-menu-item>
        <a-menu-item key="4" @click="showSystemSetting">
          <a class="link link-icon ">
                 <span class="svg-icon ">
                      <inline-svg
                          src="/assets/icons/duotune/general/gen019.svg"
                      />
                  </span>&nbsp;&nbsp;
            <span>{{ $t('userMenu.systemConfig') }}</span>
          </a>
        </a-menu-item>
        <a-menu-item key="5" @click="onLockScreen">
          <a class="link link-icon ">
                 <span class="svg-icon ">
                      <inline-svg
                          src="/assets/icons/duotone/Interface/Lock.svg"
                      />
                  </span>&nbsp;&nbsp;
            <span>{{ $t('userMenu.lockScreen') }}</span>
          </a>
        </a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="6">
          <nuxt-link
              class="link link-icon "
              :to="`/user/billing`"

          >
                <span class="svg-icon">

                      <inline-svg
                          src="/assets/icons/duotone/Shopping/Money.svg"
                      />
                </span>&nbsp;&nbsp;
            <span>Төлбөр тооцоо</span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-divider/>
        <a-menu-item key="7">
          <Logout/>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <companySwitch v-if="company && company.company_id != null"/>
  <!--  <SelectLang :class="theme" class="action"/>-->
  <span class="action" v-if="!isMobile">
         <span class="link link-icon " @click="showSystemSetting">
            <span class="svg-icon ">
                      <inline-svg
                          src="/assets/icons/duotune/general/gen019.svg"
                      />
            </span>
          </span>
  </span>
  <div class="fixed bottom-0 right-2" v-if="isMobile">
    <a-button type="primary" shape="circle" @click="showSystemSetting" size="large">
      <template #icon>
          <span class="settings-btn">
            <inline-svg
                src="/assets/icons/duotune/general/gen019.svg"
            />
          </span>
      </template>
    </a-button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import NoticePopover from '~/components/NoticePopover/index.vue'
import SearchBar from '~/components/SearchBar/index.vue'
import DarkLightMode from '~/components/tools/DarkLightMode.vue'
import companySwitch from './companySwitch.vue'
// import SelectLang from '~/components/SelectLang/index.vue'
import {USER_INFO} from '~/store/mutation-types'

import {COMPANY} from '~/store/mutation-types-tatatonga'
import {
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons-vue'

import {useStore} from 'vuex'

import ls from '~/utils/Storage'

import {isMobile} from '~/utils/device'
import {layoutMode} from '~/store/useSiteSettings'

import Logout from '~/components/tools/Logout.vue'
import {base_url} from '~/consts/const'

export default defineComponent({
  name: 'UserMenu',
  props: ['theme'],
  components: {
    NoticePopover,
    SearchBar,
    DarkLightMode,
    QuestionCircleOutlined,
    SettingOutlined,
    LogoutOutlined,
    // SelectLang,
    LockOutlined,
    layoutMode,
    Logout,
    UserOutlined,
    companySwitch
  },
  setup(props) {

    const UserInfo = ls.get(USER_INFO);
    const company = ls.get(COMPANY);

    const store = useStore()

    const showSystemSetting = () => {
      store.commit('SET_SETTING_DRAWER', true)
    }

    const onLockScreen = () => {
      store.commit('SET_LOCK_SCREEN', true)
    }


    return {
      avatar: UserInfo ? UserInfo.avatar : null,
      userID: UserInfo ? UserInfo.id : 0,
      nickname: UserInfo ? UserInfo.first_name : '',
      username: UserInfo ? UserInfo.login : '',
      base_url,
      company,
      showSystemSetting,
      onLockScreen,
      isMobile,
      layoutMode
    }
  }
})
</script>
<style lang="less">
.user-dropdown-menu-wrapper {
  .ant-dropdown-menu-item {
    width: 100% !important;
  }
}
</style>
