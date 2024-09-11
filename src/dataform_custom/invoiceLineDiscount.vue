<template>
  <lambda-form-item :label=label :name="model.component" :meta="meta">
       <div class="flex">
         <a-input-number


           v-model:value="model.form[model.component]"
         ></a-input-number>
         <a-button @click="changeDiscountType" size="small" shape="circle">{{discount_type}}</a-button>
       </div>
  </lambda-form-item>
</template>

<script>
import mixin from '@lambda-platform/lambda-vue/src/modules/dataform/elements/_mixin';

import { notification } from 'ant-design-vue';
export default {
    mixins: [mixin],
    data(){
        return {

        }
    },
    methods:{
        changeDiscountType(){
            if(this.discount_type === "₮"){
              this.model.form["discount_type"] = "%"
            } else {
              this.model.form["discount_type"] = "₮"
            }
            this.checkDiscount();

        },
        checkDiscount(checkQty){
            if(this.model.form["qty"] > 0 || !checkQty){
                if(this.discount_type === "₮"){





                    let subTotal = (this.model.form["unit_price"]*this.model.form["qty"]) - (this.discount > 0 ? this.discount*1 : 0);

                    if(subTotal < 0){
                       notification.error({
                            message: 'Буруу мэдээлэл',
                            description:'Хөнгөлөлт үнийн дүнгээс илүү байх боломжгүй'
                        });
                        this.discount = 0;




                      this.model.form["total_amount"] = (this.model.form["unit_price"]*this.model.form["qty"]);
                      this.model.form["discount"] = 0;
                      this.model.form["discount_type"] = this.discount_type;
                      this.model.form["discount_value"] = 0;

                    } else {



                      this.model.form["total_amount"] = subTotal;
                      this.model.form["discount"] = this.discount;
                      this.model.form["discount_type"] = this.discount_type;
                      this.model.form["discount_value"] = this.discount;

                    }


                } else {
                    if(this.discount > 100){
                       notification.error({
                            message: 'Буруу мэдээлэл',
                            description:'Хөнгөлөлтийн хувь 100%-с илүү байх боломжгүй'
                        });



                      this.model.form["total_amount"] = (this.model.form["unit_price"]*this.model.form["qty"]);
                      this.model.form["discount"] = 0;
                      this.model.form["discount_type"] = this.discount_type;
                      this.model.form["discount_value"] = 0;

                    } else {
                        let discount = ((this.model.form["unit_price"]*this.model.form["qty"])/100)*this.discount;


                      this.model.form["total_amount"] = (this.model.form["unit_price"]*this.model.form["qty"]) - discount;
                      this.model.form["discount"] = this.discount;
                      this.model.form["discount_type"] = this.discount_type;
                      this.model.form["discount_value"] = discount;
                    }


                }


            } else {
                if(this.discount_type !== "₮" && this.discount_type !== "%"){

                  this.model.form["discount"] = 0;
                  this.model.form["discount_type"] = "₮";
                } else {
                   notification.error({
                        message: 'Буруу мэдээлэл',
                        description:'Тоо хэмжээ хоосон тул хөнгөлөлт бодох боложмгүй'
                    });

                  this.model.form["discount"] = 0;
                }

            }
        }
    },
    watch: {
        discount() {
            this.checkDiscount(true);
        },
        total_amount(value) {

          if (this.vat_type === "1") {
            if (this.has_city_tax) {

              this.model.form["vat"] = (value/111)*10;
              this.model.form["city_tax"] = (value / 111);

            } else {

              this.model.form["vat"] = (value/110)*10;
              this.model.form["city_tax"] = 0;

            }
          } else {
            this.model.form["vat"] = 0;
            if(this.has_city_tax){
              this.model.form["city_tax"] = (value / 101);
            } else {
              this.model.form["city_tax"] = 0;
            }
          }


        },
        qty(value) {
            if(value > 0){
                this.checkDiscount(false);
            } else {
                this.model.form["total_amount"] = 0;
                this.model.form["discount"] = 0;
                this.model.form["vat"] = 0;
                this.model.form["city_tax"] = 0;

            }
        },
    },
    computed: {

        qty() {
            return this.model.form["qty"];
        },
        total_amount() {
            return this.model.form["total_amount"];
        },
        discount() {
          return this.model.form[this.model.component];

        },
        discount_type() {
            return this.model.form["discount_type"];
        },

        vat_type() {
            return this.model.form["vat_type"];
        },
        has_city_tax() {
            return this.model.form["has_city_tax"];
        },


    }


};
</script>
