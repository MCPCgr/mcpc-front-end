<template>
    <div class="invoice-calculator">

      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2">
          <!-- Your content for the first column -->
        </div>
        <div class="w-full md:w-1/2">
          <div class="calculation">
            <table>


              <tr>
                <td>Нийт хөнгөлөлт</td>
                <td class="price">
                  {{ $currencyMNT(total_discount) }}
                </td>

              </tr>

              <tr>
                <td>Нийт НӨАТ</td>

                <td class="price">{{ $currencyMNT(total_vat) }}</td>
              </tr>
              <tr v-if="total_vat_surcharge > 0">
                <td>Нийт нэмэлт зардлын НӨАТ</td>

                <td class="price">{{ $currencyMNT(total_vat_surcharge) }}</td>
              </tr>
              <tr v-if="total_city_tax > 0">
                <td>Нийт НХАТ</td>

                <td class="price">{{ $currencyMNT(total_city_tax) }}</td>
              </tr>

              <tr>
                <td>Нийт</td>

                <td class="price">{{ $currencyMNT(pre_total_amount)}}</td>
              </tr>
              <tr v-if="total_surcharge > 0">
                <td>Нийт нэмэлт зардал</td>
                <td class="price">
                  {{ $currencyMNT(total_surcharge) }}
                </td>

              </tr>
              <tr class="total">
                <td>НИЙТ ТӨЛӨХ</td>

                <td class="price" @click="getValue">{{ $currencyMNT(total_amount) }}</td>
              </tr>

            </table>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import { notification } from 'ant-design-vue';
import mixin from '@lambda-platform/lambda-vue/src/modules/dataform/elements/_mixin';
export default {
    mixins: [mixin],
    data(){
        return {
          pre_total_amount:0,
          total_surcharge:0,
          total_discount:0,
          total_vat:0,
          total_city_tax:0,
          total_vat_surcharge:0,
          surchargeTime:null,
          subTotalTime:null,
          totalTime:null,
          editIniting:false,
        }
    },
    methods:{

        setValue(){
            if(!this.editIniting){

              this.model.form["pre_total_amount"] = this.pre_total_amount;
              this.model.form["total_vat"] = this.total_vat;
              this.model.form["total_amount"] = this.total_amount;
              this.model.form["total_surcharge"] = this.total_surcharge;
              this.model.form["total_discount"] = this.total_discount;
              this.model.form["total_city_tax"] = this.total_city_tax;
              this.model.form["total_vat_surcharge"] = this.total_vat_surcharge;

            }


        },
        calculateSurcharge(){
            this.total_surcharge = 0;
            this.total_vat_surcharge = 0;
            this.model.form["sub_order_surcharge"].forEach(row=>{
                this.total_surcharge = this.total_surcharge + row.amount*1 ;
                this.total_vat_surcharge = this.total_vat_surcharge + row.vat*1;
            });

        },
        calculateSubTotal(){
            this.pre_total_amount = 0;
            this.total_vat = 0;
            this.total_city_tax = 0;
            this.total_discount = 0;

            this.model.form["sales_purchase_orders_item"].forEach((row, index)=>{
              let city_tax = this.model.form["sales_purchase_orders_item"][index]["city_tax"] >= 0 ? this.model.form["sales_purchase_orders_item"][index]["city_tax"] : 0;
              let vat = this.model.form["sales_purchase_orders_item"][index]["vat"] >= 0 ? this.model.form["sales_purchase_orders_item"][index]["vat"] : 0;
              let total_amount = this.model.form["sales_purchase_orders_item"][index]["total_amount"] >= 0 ? this.model.form["sales_purchase_orders_item"][index]["total_amount"] : 0;
              let total_discount_value = this.model.form["sales_purchase_orders_item"][index]["discount_value"] >= 0 ? this.model.form["sales_purchase_orders_item"][index]["discount_value"] : 0;

                this.pre_total_amount = this.pre_total_amount + total_amount;
                this.total_vat = this.total_vat + vat;
                this.total_city_tax = this.total_city_tax + city_tax
                this.total_discount = this.total_discount + total_discount_value

            });

            if(this.total_city_tax > 0){

              this.setSchemaByModel("sales_purchase_orders_item", "hidden", false, "city_tax");
            } else {
              this.setSchemaByModel("sales_purchase_orders_item", "hidden", true, "city_tax");
            }


        },


    },
    watch:{

        'sub_order_surcharge': {

            handler: function (rows) {

                if (this.surchargeTime) {
                    clearTimeout(this.surchargeTime);
                }
                if(rows.length >= 1){

                    this.surchargeTime = setTimeout( () => this.calculateSurcharge(), 400);
                }
            },
            deep: true
        },
        'sales_purchase_orders_item': {

            handler: function (rows) {

                if (this.subTotalTime) {
                    clearTimeout(this.subTotalTime);
                }
                if(rows.length >= 1){

                    this.subTotalTime = setTimeout( () => this.calculateSubTotal(), 400);
                }
            },
            deep: true
        },
        total_amount(){
            if (this.totalTime) {
                clearTimeout(this.totalTime);
            }


            this.totalTime = setTimeout( () => this.setValue(), 200);

        },
      total_vat_surcharge(){
            if (this.totalTime) {
                clearTimeout(this.totalTime);
            }
            this.totalTime = setTimeout( () => this.setValue(), 200);

        },
      do_render(value, oldValue) {

            if (value && !oldValue){
                if(this.editMode){
                    this.editIniting = true;


                    this.calculateSurcharge();
                    this.calculateSubTotal();

                    setTimeout(()=>{
                        this.editIniting = false;
                    }, 500);

                } else {
                    this.editIniting = false;
                }

            }
        },

    },
    mounted() {

    },
    computed: {
        total_amount(){
            return (this.pre_total_amount + this.total_surcharge);
        },
        sub_order_surcharge() {
            return this.model.form["sub_order_surcharge"];
        },
        sales_purchase_orders_item() {
            return this.model.form["sales_purchase_orders_item"];
        },
        saved_total_amount() {
          return this.model.form["total_amount"];
        },
    }
};
</script>
<style lang="scss">

</style>
