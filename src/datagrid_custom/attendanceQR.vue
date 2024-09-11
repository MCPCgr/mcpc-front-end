<template>
  <button @click="showQR = true" class="flex justify-center items-center w-full h-full">
    <inline-svg src="/assets/icons/organization/qr.svg" class="svg-icon"/>
  </button>

  <a-modal v-model:open="showQR" @ok="printQR" okText="Хэвлэх" cancel-text="Болих">
    <div :id="`printArea-${params.value}`" class="text-center printArea-qr">
      <div class="text-base font-light dark:text-slate-400 text-center pb-4">QR кодыг уншуулж ирцээ бүртгүүлнэ үү</div>
      <QRCodeVue3
        :width="400"
        :height="400"
        :value="params.value"
        :cornersSquareOptions="{ type: 'square', color: '#227bf4' }"
        :cornersDotOptions="{ type: undefined, color: '#227bf4' }"
        fileExt="png"
        :dotsOptions="{
            type: 'square',
            color: '#e74a06',
          }"
        class="img"
      />
    </div>
  </a-modal>
</template>

<script>
import QRCodeVue3 from "qrcode-vue3";
import Printd from "@lambda-platform/lambda-vue/src/modules/datagrid/utils/print";

export default {
  components: {
    QRCodeVue3,
  },
  data() {
    return {
      showQR: false
    }
  },
  methods: {
    printQR() {
      let d = new Printd();

      d.print(document.getElementById('printArea-' + this.params.value), [`.printArea-qr {
        font-family: Arial;
        text-align: center;
      }
      .printArea-qr img {
        margin: auto;
        display: block;
      }`]);
    }
  }
};
</script>

<style>

</style>
