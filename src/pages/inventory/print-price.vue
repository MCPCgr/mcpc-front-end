<template>
  <div class="inventoryPrintPrice">
    <a-button type="primary" @click="printPage" shape="circle" size="large">
      <template #icon>
      <span class="settings-btn ant-btn-svg-icon">
        <inline-svg src="/assets/icons/duotone/Devices/Printer.svg"/>
      </span>
      </template>
    </a-button>
    <portal to="header-left">
      <div class="page-title float-left">
        <div class="float-left pt-3">
          <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">Барааны үнэ хэвлэх</h1>
          <h2 class="text-gray-400 text-xs m-0"><span>Бараа, ажил үйлчилгээ</span></h2>
        </div>
      </div>
    </portal>
    <categoryWithProduct @subCategorySelected="subCategorySelected" :company_id="company.company_id"/>
    <div id="inventory-print">
      <div class="page" v-for="page in pages">
        <div class="grid grid-cols-3 w-full gap-4">
          <div class="p-1 border border-black w-full " v-for="inventory in page">
            <div class="p-2 border w-full border-2 border-black text-sm w-full h-full">
              <div class="space-y-3">
                <span class="font-bold text-lg leading-5">{{inventory.inventory_name}} {{inventory.qty_per_unit}} {{inventory.measure_unit}} {{ inventory.package_type }}</span>
                <div class="w-full space-y-2">
                  <div class="font-medium">
                    <!--                <span>Цэвэр сүү </span>-->
                    <span>{{inventory.measure_unit}}</span>
                  </div>

                  <div class="font-bold flex flex-col items-end">
                    <span class="font-bold text-2xl">{{ getMoney(inventory.price) }}</span>
                    <div class="space-x-2">
                      <span>{{inventory.whole_sale_qty}}-с дээш </span>
                      <span>{{ getMoney(inventory.whole_sale_price) }}</span>
                    </div>
                  </div>
                  <div class="flex space-x-6 items-center justify-between">
                    <v-barcode width="1" height="25" :value="inventory.code" fill="translate" font="8" />
                    <div class="flex h-10 w-10">
                      <img alt="" class="w-full h-full" src="/amjilt-erp/images/tatatonga.svg">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {GET_INVENTORY_PRICE, GET_INVENTORY_PRICE_BY_COMPANY} from "~/graphql/queries"
import ls from "~/utils/Storage";
import {COMPANY} from "~/store/mutation-types-tatatonga";
import { VBarcode } from "vbarcode";
import categoryWithProduct from "~/components/PrintInventory/categoryWithProduct.vue";
import printd from "@lambda-platform/lambda-vue/src/modules/datagrid/utils/print";
import {getMoney} from "~/utils/number";

export default {
  name: "print-price",
  components:{
    VBarcode,
    categoryWithProduct
  },
  mounted() {
    this.getInventoryPrice();
  },
  data(){
    const company = ls.get(COMPANY);
    return{
      inventoryData:[],
      pages:[],
      company,
      subCategoryID:null
    }
  },
  methods:{
    printPage(){
      var d  = new printd();

      d.print(document.getElementById('inventory-print'), [`
*, ::before, ::after {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia: ;
}
::before, ::after {
    --tw-content: '';
}
*, ::before, ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
}
*, *::before, *::after {
    box-sizing: border-box;
}
*, ::before, ::after {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia: ;
}
::before, ::after {
    --tw-content: '';
}
*, ::before, ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb;
}
::backdrop {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia: ;
}
::selection {
    color: #fff;
    background: var(--ant-primary-color);
}
        .page {
    width: 210mm;
    height: 297mm;
    padding: 15mm;
    margin: 5mm auto;
    border: 0;
    border-radius: 0px;
    background: white;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    display: flex;
    position: relative;
    background-size: contain;
    font-size: 12px;

    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }
  .border-black {
    --tw-border-opacity: 1;
    border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.w-10 {
    width: 2.5rem;
}
.h-full {
    height: 100%;
}
.flex {
    display: flex;
}

.ant-layout, .ant-layout * {
    box-sizing: border-box;
}
.w-full {
    width: 100%;
}
.gap-4 {
    gap: 1rem;
}
.grid {
    display: grid;
}
.grid-cols-3 {
     grid-template-columns: repeat(3, 1fr);
}
.text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.p-1 {
    padding: 0.25rem;
}
.p-2 {
    padding: 0.5rem;
}
.border-black {
    --tw-border-opacity: 1;
    border-color: rgb(0 0 0);
}
.border-2 {
    border-width: 2px;
}

.border {
    border-width: 1px;
}
.w-full {
    width: 100%;
}

.ant-layout, .ant-layout * {
    box-sizing: border-box;
}
.leading-5 {
    line-height: 1.25rem;
}
.font-bold {
    font-weight: 700;
}
.space-y-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-y-reverse: 0;
    margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
    margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}

.ant-layout, .ant-layout * {
    box-sizing: border-box;
}

.leading-5 {
    line-height: 1.25rem;
}
.font-bold {
    font-weight: 700;
}
      `]);
    },
    getMoney,
    subCategorySelected(subCategoryID){
      console.log(subCategoryID);
      console.log(subCategoryID);
      console.log(subCategoryID);
        this.subCategoryID = subCategoryID;
        this.getInventoryPrice()
    },
    getInventoryPrice(){

      if(this.subCategoryID){
        // console.log(company.company_id, 'company')
        this.$apollo.query({
          client: "inventoryClient",
          query: GET_INVENTORY_PRICE,
          fetchPolicy: "no-cache",
          variables: {company_id: this.company.company_id.toString(), subCategoryID:this.subCategoryID},
        }).then((res) => {


          const array = [...res.data.view_inventory];
          const chunkSize = 12;

          const pages = [];
          for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            pages.push(chunk);
          }
          this.pages = pages;

        });
      } else {
        // console.log(company.company_id, 'company')
        this.$apollo.query({
          client: "inventoryClient",
          query: GET_INVENTORY_PRICE_BY_COMPANY,
          fetchPolicy: "no-cache",
          variables: {company_id: this.company.company_id.toString()},
        }).then((res) => {


          const array = [...res.data.view_inventory];
          const chunkSize = 12;

          const pages = [];
          for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            pages.push(chunk);
          }
          this.pages = pages;

        });
      }

    }
  }
}
</script>

<style scoped>

</style>
