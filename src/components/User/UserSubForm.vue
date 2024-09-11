<template>
  <div>
    <dataform
      ref="form"
      :url="$base_url"
      :hideTitle="true"
      :schemaID="schemaID" :editMode="editMode" :do_render="editMode" :onReady="editUser"
      :onSuccess="onSuccess"
    >
    </dataform>
  </div>
</template>

<script>

import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";

export default {
  name: "UserSubForm",
  props:["page", "userInfo"],
  data () {
    const currentUser = ls.get(USER_INFO);
    return {
      editMode: true,

      currentUser
    }
  },
  computed:{
    isMyData(){
      return this.currentUser && this.currentUser.login === this.$route.params.username
    },
    onSuccess(){

    },
    schemaID(){

       if(this.page === "education"){
        return  833
      } else if(this.page === "skills"){
        return  835
      } else if(this.page === "courses"){
        return  834
      } else if(this.page === "experience"){
        return  832
      }

      return 0
    },
  },
  methods: {
    editUser () {
      this.$nextTick(() => {
        if(!this.isMyData){
          this.$refs.form.viewMode = true;
        }
        this.$refs.form.editModel(this.userInfo.id);
      })

    },
  }
}
</script>

<style scoped>

</style>
