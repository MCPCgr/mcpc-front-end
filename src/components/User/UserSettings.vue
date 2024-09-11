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

export default {
  name: "UserSubForm",
  props:["userInfo"],
  data () {

    return {
      editMode: true,

    }
  },
  computed:{
    schemaID(){


      return 842
    },
  },
  methods: {
    onSuccess (data) {
        this.$emit("settingsUpdated", data)
    },
    editUser () {
      this.$nextTick(() => {
        this.$refs.form.editModel(this.userInfo.id);
      })

    },
  }
}
</script>

<style scoped>

</style>
