<template>
  <div class="print py-20">
    <div class="print-btn">
      <a-button type="primary" onclick="print()" shape="circle" size="large">
        <template #icon>
           <span class="settings-btn ant-btn-svg-icon">
              <inline-svg src="/assets/icons/duotone/Devices/Printer.svg"/>
           </span>
        </template>
      </a-button>
    </div>

    <div class="page">
      <div class="flex justify-center">
        <p class=" text-lg text-center font-semibold">Технологийн карт</p>
      </div>
      <div v-if="loading_technology_card" class="p-10">
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <div><strong>Байгууллагын нэр: </strong><span>{{company.company_name}}</span></div>
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-1">
              <div><span class="pr-2">Карт баталсан хүний овог, нэр: </span><span class="">{{ chef_data.lastname +' ' + chef_data.firstname }}</span></div>
            </div>
            <div class="space-y-1">
              <p class="text-center">Хоолны нэр: {{technology_card.title}} </p>
              <div class="table_container">
                <table>
                  <tbody>
                    <tr >
                      <td rowspan="2">
                        <p>&nbsp;</p>
                        <p>Хүнсний бүтээгдэхүүний нэр</p>
                      </td>
                      <td colspan="2">
                        <p>&nbsp;</p>
                        <p>1 хүүхдэд /гр/</p>
                      </td>
                      <td colspan="4">
                        <p>&nbsp;</p>
                        <p>Шимт бодисын хэмжээ</p>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <p>Бохир</p>
                      </td>
                      <td >
                        <p>Цэвэр</p>
                      </td>
                      <td >
                        <p>Илчлэг</p>
                      </td>
                      <td >
                        <p>Уураг</p>
                      </td>
                      <td>
                        <p>Өөх тос</p>
                      </td>
                      <td>
                        <p>Нүүрс</p>
                        <p>ус</p>
                      </td>
                    </tr>
                    <tr v-for="(item, index) in food_ingredients_table" v-if="loading_table">
                      <td class="text-left pl-[20px]">
                        <p>{{item.food_ingredient}}</p>
                      </td>
                      <td>
                        <p>{{item.approximate_weight }}</p>
                      </td>
                      <td >
                        <p>{{item.pure_weight }}</p>
                      </td>
                      <td >
                        <p>{{item.calorie}}</p>
                      </td>
                      <td >
                        <p>{{item.protein}}</p>
                      </td>
                      <td>
                        <p>{{item.fat}}</p>
                      </td>
                      <td>
                        <p>{{item.carbohydrate}}</p>
                      </td>
                    </tr>
                    <tr v-else class="h-[30px]">
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                      <td />
                    </tr>
                  </tbody>
                </table>
              </div>
<!--              <div v-else><loader/></div>-->
            </div>
            <div class="space-y-1">
              <div><span class="font-semibold pr-2">Технологи ажиллагаа: </span></div>
              <p v-html="technology_card.description"></p>
            </div>
          </div>
        </div>
      </div>
      <div v-else><loader/></div>
    </div>
  </div>
</template>

<script setup>
import {getEmployeeIdFilter, getTechnologyCard, getTechnologyCardFoodIngredients} from "~/graphql/fetch";
import {company} from "~/store/useSiteSettings";
import {ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Loader from "~/components/common/_loading.vue";
const route = useRoute();
const router = useRouter();
const id = route.params.id;
let technology_card = ref({})
let chef_data = ref({})
let food_ingredients_table = ref([])
let loading_technology_card = ref(false);
let loading_table = ref(false);

function getTechnologyCardFoodIngredientsData(){
  getTechnologyCardFoodIngredients(id).then(data=>{
    if(data.view_technology_card_food_ingredients && data.view_technology_card_food_ingredients.length){
      food_ingredients_table.value = data.view_technology_card_food_ingredients;
      loading_table.value = true;
    }
  })
}

function getTechnologyCardData(){
  getTechnologyCard(id).then(data=>{
    if(data.view_technology_card && data.view_technology_card.length){
      technology_card.value = data.view_technology_card[0];
      loading_technology_card.value = true;
      getTechnologyCardFoodIngredientsData(); //data table
      getEmployeeIdFilterData(technology_card.value.emp_id);
    }
  })
}
function getEmployeeIdFilterData(id){
  getEmployeeIdFilter(id).then(data=>{
    if(data.view_emp && data.view_emp.length){
      chef_data.value = data.view_emp[0];
    }
  })
}

onMounted(()=>{
  getTechnologyCardData();
})
definePageMeta({
  layout: 'form',
})
</script>
<style scoped>
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #8a8b8c;
  color: #000000 !important;
  font-size: 14px !important;
  font-family: Arial !important;
  border: none;
}
.print{
  background-color: #8a8b8c;
}
.page {
  width: 297mm;
  min-height: 210mm;
  height: 100%;
  padding: 12mm;
  margin: auto;
  border: none;
  border-radius: 0;
  background-color: #ffffff !important;
  display: block;
  position: relative;
  background-size: contain;
  font-size: 14px;
}
.print-btn{
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 10mm;
  right: 10mm;
  background: #3471f6;
  cursor: pointer;
  border:none !important;
  border-radius: 52px !important;
}
.print-btn:hover{
  opacity: 65%;
}
.print-btn img{
  padding: 2px;
  width: 25px;
  height: 35px;
}

@media print {
  .page {
    padding:0 15mm;
  }
  @page {
    margin: 10mm 0 20mm 0;
    width: 210mm;
    height: 297mm;
    size: A4 !important;
    padding: 0 0 0 0;
    page-break-after: always;
    display: block !important;
  }
  body {
    margin: 0;
    color: #000;
    background-color: #fff !important;
    width: 100%;
    height: 100%;
    padding: 0;
  }
  .print-btn{
    visibility: hidden;
  }
  table { page-break-after:auto;}
  tr    { page-break-inside:avoid; page-break-after:auto }
  td    { page-break-inside:avoid; page-break-after:auto }
  thead {display:table-row-group;}

}
.table_container{
  width: 100%;
}
table{
  width: 100%;
  text-align: center;
}
table, th, td {
  border: 1px solid;
}
</style>
