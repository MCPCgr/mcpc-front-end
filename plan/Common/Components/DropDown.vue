<template>
  <div class="relative inline-block dropdown-options">
    <a-dropdown>
     <span class="btn btn-icon" @click.prevent><span class="svg-icon">
       <inline-svg src="/assets/icons/duotune/general/gen052.svg" />
     </span></span>

      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;" @click="editEvent">Засах</a>
          </a-menu-item>
          <a-menu-item>
            <a-popconfirm
              title="Устгах уу?"
              ok-text="Тийм"
              cancel-text="Үгүй"
              @confirm="deleteEvent"
              @click.stop
              placement="bottom"
            >
              <a href="javascript:;">Устгах</a>
            </a-popconfirm>

          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script>
import {DeleteOutlined} from "@ant-design/icons-vue";

export default {
  name: "DropDown",
  emits:["deleteEvent", "editEvent"],
  components: {DeleteOutlined},
  methods:{
    deleteEvent(){
      this.$emit("deleteEvent", null)
    },
    editEvent(){
      this.$emit("editEvent", null)
    }
  }
}
</script>

<style scoped>

</style>
