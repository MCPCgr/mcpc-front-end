<template>
  <div class="lg:col-span-3 col-span-12">
    <div class="card rounded-md bg-white dark:bg-slate-800 lg:h-full  shadow-base">
      <div class="card-body flex flex-col p-6">

        <div class=" border-gray-100 dark:border-gray-700">
          <ul class="list-none sidebar-nav mb-0 mt-1" id="navmenu-nav">

            <NavItem v-for="menu in menus"
                     :key="menu.index"
                     :title="menu.title"
                     :to="`/user/${userInfo.login}${menu.page === 'profile' ? '' : `/${menu.page}`}`"
                     :icon="menu.icon"
            ></NavItem>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavItem from "~/components/User/NavItem.vue";


export default {
  name: "UserNav",
  components: {NavItem},
  props:["userInfo", "menus"],
  computed:{


  }
}
</script>

<style scoped>

</style>
