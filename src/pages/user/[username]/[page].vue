<template>
  <div class="space-y-5 profile-page">
    <Cover :userInfo="user" />
    <portal to="header-left">
      <div class="page-title ">
        <div class="float-left pt-3">
          <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">{{ user.first_name }}</h1>
          <h2 class="text-gray-400 text-xs m-0"><span>Хэрэглэгч</span></h2>
        </div>
      </div>
    </portal>
    <div class="grid grid-cols-12 gap-6">
      <UserNav :userInfo="user" :menus="menus" />
      <div class="lg:col-span-9 col-span-12">
        <div class="card rounded-md bg-white dark:bg-slate-800 lg:h-full  shadow-base">
          <div class="card-body flex flex-col p-6">
            <header class="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5  -mx-6 px-6">
              <div class="flex-1">
                <div class="card-title text-slate-900 dark:text-white flex ">
                  <span class="svg-icon mr-2.5">
                       <inline-svg :src="page.icon" />
                  </span>
                  <span>{{ page.title }}</span>
                </div>
              </div>
            </header>
            <div class="card-text h-full">
              <UserSubForm :page="$route.params.page" v-if="isSubForm" :userInfo="user" ></UserSubForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userMixin from "~/components/User/userMixin";

export default {
  mixins:[userMixin]
}
</script>

<style scoped>

</style>
