<template>
  <div class="category-tree bg-white mb-4 p-4 rounded-md overflow-x-auto category-page">

    <a-tabs v-model:activeKey="categoryID" @change="selectCategory" >
      <a-tab-pane  v-for="category in categories" :key="category.id" :tab="category.category_name" >

       <div class="bg-white">
         <div class="flex">
           <div class="flex-grow">
             <a-radio-group v-model:value="subCategoryID" button-style="solid" @change="selectSubCategory" >
               <a-radio-button v-for="subCategory in category.children" :key="subCategory.id" :value="subCategory.id">
                 {{ subCategory.sub_category_name }}</a-radio-button>

             </a-radio-group>
           </div>
<!--           <div>-->
<!--             <a-select-->
<!--               ref="select"-->
<!--               v-model:value="subSubCategoryID"-->
<!--               style="width:120px"-->
<!--               placeholder="Нэр төрөл"-->

<!--             >-->
<!--               <a-select-option v-for="subSubCategory in selectedSubCategory.children" :key="subSubCategory.id" :value="subSubCategory.id">-->
<!--                 {{ subSubCategory.sub_sub_category_name }}-->
<!--               </a-select-option>-->
<!--             </a-select>-->
<!--           </div>-->
         </div>
       </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
import {GET_CATEGORIES} from "~/graphql/queries";
import ls from "~/utils/Storage";


export default {
  components: {},
  props:["company_id"],
  emits:["subCategorySelected"],
  data(){
    return {
      categories:[],
      categoryID:null,
      subCategoryID:null,
      selectedSubCategory:{
        id:null,
        sub_category_name:null,
        children:[]
      },
      subSubCategoryID:null,
    }
  },
  computed:{

  },
  methods:{
    selectCategory(id){
      const index = this.categories.findIndex(cat=>cat.id === id);
      if(index >= 0){
        if(this.categories[index].children.length >= 1){
          this.subCategoryID = this.categories[index].children[0].id;
          this.$emit("subCategorySelected", this.subCategoryID);
          this.selectedSubCategory = this.categories[index].children[0];
          this.subSubCategoryID = null
        }
      }
    },
    selectSubCategory(e){

      const index = this.categories.findIndex(cat=>cat.id === this.categoryID);
      if(index >= 0){
        if(this.categories[index].children.length >= 1){
          const sindex = this.categories[index].children.findIndex(scat=>scat.id === this.subCategoryID);

          if(sindex >= 0){
            this.$emit("subCategorySelected", this.subCategoryID);
            this.selectedSubCategory = this.categories[index].children[sindex];
            this.subSubCategoryID = null
          }

        }
      }
    },
    getCategoriesData(){
      this.$apollo.query({
        client: "inventoryClient",
        query: GET_CATEGORIES,
        variables: {company_id: this.company_id},
      }).then((res) => {
          this.categories = this.createCategoryNestedData(res.data);

          if(this.categories.length >= 1){
            this.categoryID = this.categories[0].id;

            if(this.categories[0].children.length >= 1){
              //this.subCategoryID = this.categories[0].children[0].id;
              // this.$emit("subCategorySelected", this.subCategoryID);
             // this.selectedSubCategory = this.categories[0].children[0];
            }

          }

      });
    },
    createCategoryNestedData(data) {
      const categoryMap = new Map();
      const subCategoryMap = new Map();

      // First, create a map for the categories
      data.lut_inventory_category.forEach((category) => {
        categoryMap.set(category.id, {
          ...category,
          children: [],
        });
      });

      // Then, create a map for the sub-categories
      data.lut_inventory_category_sub.forEach((subCategory) => {
        if (!subCategoryMap.has(subCategory.inventory_category_id)) {
          subCategoryMap.set(subCategory.inventory_category_id, []);
        }
        subCategoryMap.get(subCategory.inventory_category_id).push({
          ...subCategory,
          children: [],
        });
      });

      // Finally, create the nested structure
      data.lut_inventory_category_sub_sub.forEach((subSubCategory) => {
        const categoryId = subSubCategory.inventory_cateogory_id;
        const subCategoryId = subSubCategory.inventory_sub_cateogory_id;

        if (subCategoryMap.has(categoryId)) {
          const subCategory = subCategoryMap.get(categoryId).find((sc) => sc.id === subCategoryId);
          if (subCategory) {
            subCategory.children.push({
              ...subSubCategory,
            });
          }
        }
      });

      const nestedData = [];

      // Populate the nestedData array with the categories and their sub-categories
      categoryMap.forEach((category) => {
        const categoryWithSubCategories = { ...category, children: subCategoryMap.get(category.id) || [] };
        nestedData.push(categoryWithSubCategories);
      });

      return nestedData;
    }
  },
  mounted() {
    this.getCategoriesData();
  }
}
</script>

<style scoped>

</style>
