<template>
  <lambda-form-item :label=label :name="model.component" :meta="meta">
    <a-input-number v-model:value="model.form[model.component]"
                    :placeholder="'Хуримтлагдсан элэгдэл'"
                    :disabled="true"
                    :formatter="formatNumber">
    </a-input-number>
  </lambda-form-item>
</template>

<script setup>
import moment from 'moment'

const props = defineProps({
  model: Object,
  label: String,
  meta: Object,
  do_render: Boolean,
  editMode: Boolean,
  is_show: Boolean,
  relation_data: Function,
  showInformationModal: Boolean,
  url: String,
  setSchemaByModel: Function,
  getSchemaByModel: Function,
  validateWithSubForm: Function,
  validateDataForm: Function,
  isBuilder: Boolean,
});

watch(() => [
  props.model.form['fixed_assets_check'],
  props.model.form['calculate_depreciation_check'],
  props.model.form['initial_cost'],
  props.model.form['cost_stay'],
  props.model.form['date_deprecation'],
  props.model.form['estimated_lifetime'],
  props.model.form['buyed_date']
], ([isFixedAsset, isDepreciatable, initialCost, remainingCost, estimatedDate, lifetime, boughtDate]) => {

  if (isFixedAsset === 1 && isDepreciatable === 1 && initialCost && remainingCost && estimatedDate && lifetime && boughtDate) {
    calculation(initialCost, remainingCost, estimatedDate, lifetime, boughtDate);
    // console.log("Values:", initialCost, remainingCost, estimatedDate, lifetime, boughtDate);
  }
});

function calculation(initialCost, remainingCost, estimatedDate, lifetime, boughtDate) {
  let depByDay = ((initialCost - remainingCost) / lifetime) / 365;

  let elapsedTime = moment(estimatedDate).diff(moment(boughtDate), 'days');

  let accDepreciation = depByDay * elapsedTime
  props.setSchemaByModel('accumlated_deprecation', 'value', accDepreciation)
}

function formatNumber(value) {
  // Add commas for thousands separator and format with two decimal points
  return value ? parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
}

</script>

<style scoped>

</style>
