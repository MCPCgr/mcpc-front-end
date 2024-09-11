<template>
  <div class="grid grid-cols-12 gap-6" >

    <div class="lg:col-span-12 col-span-12">
      <div class="card rounded-md bg-white dark:bg-slate-800 lg:h-full  shadow-base">
        <div class="card-body flex flex-col p-6">
          <header class="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5  -mx-6 px-6"
          >
            <div class="flex-1">
              <div class="card-title text-slate-900 dark:text-white flex ">
                  <span class="svg-icon mr-2.5">
                            <inline-svg
                              src="/assets/icons/duotone/Home/Building.svg"
                            />
                        </span> <span>Байгууллагын мэдээлэл</span>
              </div><!---->
            </div><!----></header><!---->
          <div class="card-text h-full">
            <dataform
              ref="form"
              :url="$base_url"
              :hideTitle="true"
              schemaID="757" :editMode="editMode" :do_render="editMode" :onReady="onReady"
              :onSuccess="onSuccess"
            >
            </dataform>
          </div>
        </div>
      </div><!----></div>
  </div>
</template>

<script>
import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";

export default {
  name: "EditForm",
  props:["company"],
  methods:{
    onSuccess(data){
      this.$emit("onSuccess", data)
    },
    onReady () {
      this.$nextTick(() => {

        this.$refs.form.editModel(this.company.id);
      })

    },
  },
  data(){
    return {
      editMode: true,
    }
  }
}
</script>

<style scoped>

</style>
