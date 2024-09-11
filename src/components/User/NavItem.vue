<template>
  <li class="navbar-item account-menu ">
    <nuxt-link :to="to" class="navbar-link text-slate-600 flex items-center py-2 rounded  link-icon user-nav-item">
                      <span class="mr-2  mb-0">
                        <span class="svg-icon ">
                            <inline-svg
                              :src="icon"
                            />
                        </span>
                      </span>
      <span class="mb-0 ">{{ title }}</span>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: "NavItem",
  props: ["icon", "title", "to"]
}
</script>

<style scoped>

</style>
