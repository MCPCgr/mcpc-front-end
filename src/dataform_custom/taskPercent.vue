<template>
  <lambda-form-item :label=label :name="model.component" :meta="meta">
    <div class="flex">
      <a-input-number
        v-model:value="model.form[model.component]"
        :max="100"
        :min="0"
        :formatter="value => {
  const [integer, fractional] = `${value}`.split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${formattedInteger}${fractional ? '.'+fractional.slice(0, 3) : ''}`;
}"
        :parser="value => value.replace(/\$\s?|(,*)/g, '')"
        :placeholder="placeholder"
        :disabled="disabled"
      />
      <a-button @click="model.form[model.component] = 100" type="link">
        <template #icon>
                        <span class="svg-icon" style="vertical-align: top">
                            <inline-svg
                              src="/assets/icons/duotune/general/gen043.svg"
                            />
                        </span>
        </template>
        <span class="ml-2">Дууссан</span>
      </a-button>
    </div>

  </lambda-form-item>
</template>
<script>
import mixin from '@lambda-platform/lambda-vue/src/modules/dataform/elements/_mixin';

export default {
  mixins: [mixin],

};
</script>
