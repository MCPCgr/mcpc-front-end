<template>
    <lambda-form-item :label=label :name="model.component" :meta="meta">



      {{ $currencyMNT(model.form[model.component]) }}

    </lambda-form-item>
</template>

<script>

import mixin from '@lambda-platform/lambda-vue/src/modules/dataform/elements/_mixin';
export default {

    mixins: [mixin],
    data() {
        return {
            calculate: false
        }
    },
    methods: {
        calculateTax() {
            if (this.vat_type === "1" || this.vat_type === 1) {
                this.model.form[this.model.component] = (this.amount/110)*10;
            } else {
                this.model.form[this.model.component] =0;
            }
        }
    },
    watch: {
        amount() {

            this.calculateTax();

        },
        vat_type() {
            this.calculateTax();
        },

    },
    computed: {
        amount() {
            return this.model.form["amount"];
        },
        vat_type() {
            return this.model.form["vat_type"];
        },
    }


};
</script>
