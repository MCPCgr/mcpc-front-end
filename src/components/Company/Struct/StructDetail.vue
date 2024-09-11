<template>
  <div>
    <a-menu>
      <a-menu-item>
        <h2 class="text-center" >{{ struct.struct_name }}</h2>
      </a-menu-item>
      <a-menu-item>
        Утас: {{ struct.phone }}
      </a-menu-item>
      <a-menu-item v-if="struct.struct_type === 'branch'">
        <div class="max-w-md whitespace-normal">
          Аймаг / Хот: {{ struct.aimagname }}, Сум / Дүүрэг: {{ struct.sumname }} <br>
          Хаяг: {{ struct.address }}
        </div>
      </a-menu-item>
      <a-menu-item @click="editStruct(struct.id)">
        <div class="flex">
          <inline-svg src="/assets/icons/duotone/Design/Edit.svg" class="svg-icon mr-2.5"/>
          <span>Засах</span>
        </div>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <inline-svg
            src="/assets/icons/duotune/general/gen041.svg"  class="svg-icon mr-2.5 inline-block"
          />
        </template>
        <template #title>
          <span>Нэмэх</span>
        </template>
        <a-menu-item @click="addStruct(struct.isCompany ? null : struct.id)">
          <div class="flex">
            <inline-svg src="/assets/icons/organization/branch.svg" class="svg-icon mr-2.5"/>
            <span>Салбар нэгж</span>
          </div>
        </a-menu-item>
        <a-menu-item @click="addCompany(struct.isCompany ? null : struct.id)">
          <div class="flex">
            <inline-svg src="/assets/icons/duotone/Home/Building.svg" class="svg-icon mr-2.5"/>
            <span>Хамаарал бүхий, охин компани</span>
          </div>
        </a-menu-item>
      </a-sub-menu>
<!--      <a-menu-item @click="showQR = true">-->
<!--        <div class="flex items-center">-->
<!--          <inline-svg-->
<!--            src="/assets/icons/organization/qr.svg"  class="svg-icon mr-2.5 inline-block"-->
<!--          />-->
<!--          <span>QR код</span>-->
<!--        </div>-->

<!--      </a-menu-item>-->


    </a-menu>
    <a-modal v-model:open="showQR" :title="struct.struct_name" @ok="printQR" okText="Хэвлэх" cancel-text="Болих">
      <div :id="`printArea-${struct.id}`" class="text-center printArea-qr">
        <h2 class="text-center" >{{ struct.struct_name }}</h2>

        <QRCodeVue3
          :width="400"
          :height="400"
          :value="struct.id"
          :cornersSquareOptions="{ type: 'square', color: '#227bf4' }"
          :cornersDotOptions="{ type: undefined, color: '#227bf4' }"
          fileExt="png"
          :dotsOptions="{
            type: 'square',
            color: '#e74a06',

          }"
          class="img2 "


        />
      </div>
    </a-modal>
  </div>
</template>

<script>
import StructCompany from "~/components/Company/Struct/StructCompany.vue";
import {PlusOutlined} from "@ant-design/icons-vue";
import printd from "@lambda-platform/lambda-vue/src/modules/datagrid/utils/print";

import QRCodeVue3 from "qrcode-vue3";
export default {
  name: "StructDetail",
  props:["struct", "editStruct", "addStruct", "addCompany"],
  components: {PlusOutlined, StructCompany, QRCodeVue3},
  data(){
    return {
      showQR:false
    }
  },
  methods:{
    printQR(){
      var d  = new printd();

      d.print(document.getElementById('printArea-'+this.struct.id), [`.printArea-qr {
  font-family: Arial;
  text-align: center;
}
.printArea-qr h2{
  font-family: Arial;
  text-align: center;
}
.printArea-qr img {
  margin: auto;
  display:block;
}`]);

    }
  }
}
</script>

<style scoped>

</style>
