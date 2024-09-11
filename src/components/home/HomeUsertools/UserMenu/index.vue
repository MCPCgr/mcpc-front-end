<template>
  <NoticePopover :userID="userID" :isMobile="isMobile"/>
  <DarkLightMode class="action" v-if="!isMobile"/>
  <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <div class="avatar" style="margin: 0">

              <img :src="base_url+avatar" alt="avatar" v-if="avatar">
              <span class="svg-icon-white" v-else>
                      <inline-svg
                        src="/assets/icons/duotune/communication/com006.svg"
                      />
                </span>&nbsp;
          </div>
        </span>
    <template #overlay>
      <a-menu class="user-dropdown-menu-wrapper">
        <div class="flex items-center space-x-3 mr-2 pt-4 border-b pb-3 min-w-[180px]">
          <div class="avatarMenu flex  items-center align-center">
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
          <router-link
            class="link link-icon "
            to="/erp/profile"

          >
                <span class="svg-icon">

                      <inline-svg
                        src="/assets/icons/duotune/communication/com006.svg"
                      />
                </span>&nbsp;&nbsp;
            <span>{{ $t('appAdmin.profile') }}</span>
          </router-link>
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
            href="https://amijlt.com/guide"
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
          <Logout/>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NoticePopover from '~/components/NoticePopover/index.vue'
import SearchBar from '~/components/SearchBar/index.vue'
import DarkLightMode from '~/components/tools/DarkLightMode.vue'
// import SelectLang from '~/components/SelectLang/index.vue'
import { USER_INFO } from '~/store/mutation-types'

import {
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons-vue'

import { useStore } from 'vuex'

import ls from '~/utils/Storage'

import { isMobile } from '~/utils/device'
import { layoutMode } from '~/store/useSiteSettings'

import Logout from '~/components/tools/Logout.vue'
import { base_url } from '~/consts/const'
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
    UserOutlined
  },
  setup (props) {

    const UserInfo = ls.get(USER_INFO);

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
      base_url,
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
