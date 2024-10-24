import { computed } from 'vue';
import store from '~/store/index'
const state = store.state
export const projectPermission = computed(() => state["plan"].projectPermission)
export const layoutMode = computed(() => state["app"].layout)
export const userInfo = computed(() => state["app"].userInfo)
export const navTheme = computed(() => state["app"].theme)
export const primaryColor = computed(() => state["app"].color)
export const colorWeak = computed(() => state["app"].weak)
export const grayMode = computed(() => state["app"].gray)
export const fixedHeader = computed(() => state["app"].fixedHeader)
export const fixSiderbar = computed(() => state["app"].fixSiderbar)
export const fixSidebar = computed(() => state["app"].fixSiderbar)
export const contentWidth = computed(() => state["app"].contentWidth)
export const autoHideHeader = computed(() => state["app"].autoHideHeader)
export const sidebarOpened = computed(() => state["app"].sidebar)
export const multiTab = computed(() => state["app"].multiTab)
export const device = computed(() => state["app"].device)
export const darkMode = computed(() => state["app"].darkMode)
export const lockScreen = computed(() => state["app"].lockScreen)
export const LMS_roles = computed(() => state["tatatonga"].LMS_roles)
export const companies = computed(() => state["tatatonga"].companies)
export const userExtraRoles = computed(() => state["tatatonga"].userExtraRoles)
export const userExtraRole = computed(() => state["tatatonga"].userExtraRole)
export const company = computed(() => state["tatatonga"].company)

export const isTopMenu = () => layoutMode.value === 'topmenu'
export const isSideMenu = () => !isTopMenu()
