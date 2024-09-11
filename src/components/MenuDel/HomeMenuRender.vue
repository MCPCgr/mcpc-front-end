<template>
  <a class="card p-4 sm:p-5 shadow-md bg-white dark:bg-slate-900 bg-white dark:bg-slate-900 "
     v-if="can(item) && !hasItems && item.link_to === 'link' && hasSubscription"
     :href="item.url"
     target="_blank"
  >
    <i v-if="item.icon" :class="item.icon"></i>
    <inline-svg class="svg-icon" v-if="item.svg" :src="item.svg"/>
    <span>{{ getTitleHome(item) }}</span>
    <p v-if="children" class="module-menus">
      <span v-for="(child, index) in children" :key="child.index"><span v-if="index >= 1">, </span>{{getTitleHome(child, true)}}</span>
    </p>
  </a>
  <NuxtLink :to="item.url" v-else-if="can(item) && !hasItems && item.link_to === 'router-link' && hasSubscription" class="card p-4 sm:p-5 shadow-md bg-white dark:bg-slate-900 bg-white dark:bg-slate-900 ">
    <i v-if="item.icon" :class="item.icon"></i>
    <inline-svg class="svg-icon" v-if="item.svg" :src="item.svg"/>
    <span>{{ getTitleHome(item) }}</span>
    <p v-if="children" class="module-menus">
      <span v-for="(child, index) in children" :key="child.index"><span v-if="index >= 1">, </span>{{getTitleHome(child, true)}}</span>
    </p>
  </NuxtLink>
  <NuxtLink :to="`/erp/p/${item.id}`" class="card p-4 sm:p-5 shadow-md bg-white dark:bg-slate-900 bg-white dark:bg-slate-900 " v-else-if="can(item) && !hasItems && item.link_to !== 'divider' && hasSubscription">
    <i v-if="item.icon" :class="item.icon"></i>
    <inline-svg class="svg-icon" v-if="item.svg" :src="item.svg"/>
    <span>{{ getTitleHome(item) }}</span>
    <p v-if="children" class="module-menus">
      <span v-for="(child, index) in children" :key="index"><span v-if="index >= 1">, </span>{{getTitleHome(child, true)}}</span>
    </p>
  </NuxtLink>
  <NuxtLink :to="path" v-else-if="item.link_to === 'noActionSubTop'">
    <span>{{ menuTitle }}</span>
  </NuxtLink>
  <div v-else-if="!hasItems && !hasSubscription"
       class="card p-4 sm:p-5 shadow-md bg-white dark:bg-slate-900 bg-white dark:bg-slate-900 inactive-module" @click="showWarning(getTitleHome(item), $router)">
    <i v-if="item.icon" :class="item.icon"></i>
    <inline-svg class="svg-icon" v-if="item.svg" :src="item.svg"/>
    <span>{{ getTitleHome(item) }}</span>
    <p v-if="children" class="module-menus">
      <span v-for="(child, index) in children" :key="child.index"><span v-if="index >= 1">, </span>{{getTitleHome(child, true)}}</span>
    </p>
  </div>
  <HomeMenuRender v-if="can(item) && hasItems" :title="getTitleHome(item)" :children="item.children" :item="findActivehild(item)" :cruds="cruds" :permissions="permissions"   />

</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '~/components/SvgIcon/index.vue'
import {

  SettingOutlined,

} from '@ant-design/icons-vue'
import { getItemPath, getTitle } from '~/utils/menu'
import {checkSubscription, showWarning} from '~/utils/subscription'

export default defineComponent({
  name: 'HomeMenuRender',
  props: ['item', 'cruds', 'permissions', 'title', 'children'],
  components: {
    SvgIcon,
    SettingOutlined,

  },
  data () {
    return {
      subscriptionMenuIDS:[
        "2d8e57d2-42db-92ca-12fc-0282fb4f777c",

        "cb0e30ba-9bcf-26d2-c330-5cb2fcb93954",
      ]
    }
  },
  computed:{
    hasItems() {
      if (this.item.link_to === "noActionSubTop") {
        return false
      }
      return this.item && this.item.children !== undefined ? this.item.children.length > 0 : false
    },
    hasSubscription(){
      return checkSubscription(this.item.id, this.subscriptionMenuIDS)
    },
    path() {
      return getItemPath(this.item, this.permissions)
    },
  },

  methods: {
    showWarning,
    getModuleItem(item){
      if(item.children)
        return item
    },
    findActivehild(item){
      let index = 0;
      while (!this.can(item.children[index])) {
        index++
      }
      return  {...item.children[index],  svg:item.svg, icon:item.icon }
    },
    getPath (item) {
      return getItemPath(item, this.permissions)
    },

    can (menu) {
      if (this.permissions[menu.id]) {
        if (this.permissions[menu.id].show) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    getTitleHome (item, isChild) {
      if(this.title && !isChild){
        return this.title
      }
      return getTitle(item, this.cruds)
    },

  },
})
</script>
<style lang="less" scoped>
.menuName {
  svg,
  span {
    vertical-align: middle;
  }

  svg {
    margin-right: 10px;
  }
}
</style>
