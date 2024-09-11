<template>
  <a-popover :title="$t('process.statusHistory')" trigger="click">
    <template #content>
      <div class="max-h-96 overflow-y-auto">
        <StatusHistory :id="params.data['id']" :small-signature="true"/>
      </div>
    </template>

    <div class="h-full relative cursor-pointer flex justify-between items-center w-full">
      <div>{{ getStatusLabel(params.value ) }}</div>


      <div>
        <inline-svg
          class="w-5 h-5 svg-icon-white"
          src="/assets/icons/duotone/Code/Info-circle.svg"
        />
      </div>
    </div>

  </a-popover>

</template>
<script>
import {getStatusBgColor} from "~/modules/workflow/flow/status"
import StatusHistory from "~/modules/process/StatusHistory.vue";
export default {
  components: {StatusHistory},
  mounted() {
    const classList = getStatusBgColor(this.params.data["status_type"]).split(" ");
    classList.forEach(cl => {
      this.params.eGridCell.classList.add(cl);
    })
  },
  methods:{
    getStatusLabel(key) {
      if (this.$te("process." + key + "_grid")) {
        return this.$t("process." + key + "_grid");
      } else {
        return key;
      }
    }
  }

};
</script>
<style>

.ag-cell-range-selected-1:not(.ag-cell-focus),.ag-root:not(.ag-context-menu-open) .ag-body-viewport:not(.ag-has-focus) .ag-cell-range-selected-1:not(.ag-cell-inline-editing) {
  background-color: var(--ag-background-color);
  border-color: #e5e7eb;
  color: #0a0f1c
}

.ag-cell-range-selected-1:not(.ag-cell-focus) .svg-icon-white [fill]:not([fill=none]):not([fill=white]),.ag-root:not(.ag-context-menu-open) .ag-body-viewport:not(.ag-has-focus) .ag-cell-range-selected-1:not(.ag-cell-inline-editing) .svg-icon-white [fill]:not([fill=none]):not([fill=white]) {
  fill: #000
}

</style>
