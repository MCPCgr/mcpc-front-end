<template>
  <li :data-link_to="data.link_to" :data-url="data.url" :data-title="data.title" :data-icon="data.icon"  :data-c="data.c" :data-r="data.r" :data-u="data.u" :data-d="data.d" class="menu-tree-item">

    <div class="clickable sortDiv">
      <div class="menu-icon">
        <div class="menu-icon-box">
          <i v-if="data.icon" :class="data.icon"></i>
          <inline-svg class="svg-icon" v-if="data.svg" :src="data.svg"/>
        </div>
      </div>

      <div class="menu-title">
        <span v-html="getTitle(data)"></span>

<!--        | <span class="link-to">-->
<!--                {{ data.link_to }}-->
<!--                <span v-if="data.link_to != 'crud'  && data.link_to != 'noAction'">-->
<!--                    | {{ data.url }}-->
<!--                </span>-->
<!--            </span>-->
      </div>

      <div class="menu-control">
        <span>&nbsp;</span>
        <span v-if="data.link_to === 'crud' && permissions[data.id]">
          <a-checkbox :disabled="!permissions[data.id].show"
                      v-if="permissions[data.id].rPossible"
                      v-model:checked="permissions[data.id].r" @change="change">Харах</a-checkbox>
                    <a-checkbox :disabled="!permissions[data.id].show" v-if="permissions[data.id].cPossible"
                                v-model:checked="permissions[data.id].c" @change="change">Нэмэх</a-checkbox>

                    <a-checkbox :disabled="!permissions[data.id].show"  v-if="permissions[data.id].uPossible"
                                v-model:checked="permissions[data.id].u" @change="change">Засах</a-checkbox>
                    <a-checkbox :disabled="!permissions[data.id].show"
                                v-if="permissions[data.id].dPossible"
                                v-model:checked="permissions[data.id].d" @change="change">Устгах</a-checkbox>
<!--                    <a-button class="btn btn-icon" size="small" @click="showUserData"-->
<!--                    >-->

<!--&lt;!&ndash;                      <span class="svg-icon" v-if="extend">&ndash;&gt;-->
<!--&lt;!&ndash;                         <inline-svg src="/assets/icons/duotone/Navigation/Angle-down.svg"/>&ndash;&gt;-->
<!--&lt;!&ndash;                      </span>&ndash;&gt;-->
<!--&lt;!&ndash;                      <span class="svg-icon" v-else>&ndash;&gt;-->
<!--&lt;!&ndash;                         <inline-svg src="/assets/icons/duotone/Navigation/Angle-right.svg"/>&ndash;&gt;-->
<!--&lt;!&ndash;                      </span>&ndash;&gt;-->
<!--                    </a-button>-->
                </span>
        <span class="ml-2 mr-1">Хандах</span><a-switch v-model:checked="permissions[data.id].show"
                  v-if="permissions[data.id]"
                  @change="changePermissionPre('show', $event, permissions[data.id])" size="small"> </a-switch>
      </div>
    </div>
    <ul class="dd-list" v-if="permissions[data.id] && data.children && data.children.length >= 1 && permissions[data.id].show" >
      <permissionItem v-for="(menu_item, index) in data.children" :key="index"

                      :menuIndex="getIndex(index)"
                      :data="menu_item"
                      :cruds="cruds"
                      :permissions="permissions"
                      @change="change"
      ></permissionItem>
    </ul>
    <div v-if="data.link_to === 'crud' && permissions[data.id] && permissions[data.id].show">

      <a-radio-group v-model:value="userCondition" button-style="solid" @change="changeUserCondition" v-if="withCompany || withStruct || withEmployee">
        <a-radio-button value="company" v-if="withCompany">Байгууллагын нийт мэдээлэл</a-radio-button>
        <a-radio-button value="struct" v-if="withStruct">Зөвхөн салбар нэгжийн мэдээлэл</a-radio-button>
        <a-radio-button value="employee" v-if="withEmployee">Зөвхөн өөрийн мэдээлэл</a-radio-button>

      </a-radio-group>

<!--      <h1>formCondition</h1>-->
<!--      {{permissions[data.id].formCondition}}-->
<!--      <h1>gridCondition</h1>-->
<!--      {{permissions[data.id].gridCondition}}-->
    </div>
  </li>
</template>

<script>

import axios from "~/plugins/core/axios"

export default {
  name: "permissionItem",
  props: ["data", "menuIndex", "cruds", "permissions"],
  components: {},
  data() {
    return {
      loading: true,
      extend: false,
      formUser: null,
      gridUser: null,
      formField: null,
      gridField: null,
      user_fields: window.init.user_fields ? window.init.user_fields : [],
      grid_fields: [],
      grid_fields_full: [],
      form_fields: [],
      gridCondition: [],
      formCondition: [],
      withCompany:false,
      withStruct:false,
      withEmployee:false,
      userCondition:""

    }
  },
  methods: {

    changeFilter(query) {
      this.permissions[this.data.id].gridEditConditionSQL = query;
    },

    changeFilterJS(query) {
      this.permissions[this.data.id].gridEditConditionJS = query;
    },

    changeDeleteFilter(query) {
      this.permissions[this.data.id].gridDeleteConditionSQL = query;
    },

    changeDeleteFilterJS(query) {
      this.permissions[this.data.id].gridDeleteConditionJS = query;
    },


    addFrom() {
      if (this.formUser && this.formField) {
        this.formCondition.push({
          user_field: this.formUser,
          form_field: this.formField,
        });
        this.formField = null;
        this.formUser = null;
        this.updateValue();
      } else {
        this.$Message.error('Харгалзах багнуудыг сонгоно уу');
      }
    },
    deleteFrom(index) {


      this.formCondition.splice(index, 1);
      this.updateValue();
    },
    deleteGrid(index) {

      this.gridCondition.splice(index, 1);
      this.updateValue();
    },
    addGrid() {
      if (this.gridUser && this.gridField) {
        this.gridCondition.push({
          user_field: this.gridUser,
          grid_field: this.gridField,
        });
        this.gridField = null;
        this.gridUser = null;
        this.updateValue();
      } else {
        this.$Message.error('Харгалзах багнуудыг сонгоно уу');
      }
    },
    updateValue() {
      this.permissions[this.data.id].formCondition = this.formCondition;
      this.permissions[this.data.id].gridCondition = this.gridCondition;

    },
    getMicroserviceUrl(projects_id){
      if(window.init.microserviceSettings){
        if(window.init.microserviceSettings.length >= 1){
          let si = window.init.microserviceSettings.findIndex(set=>set.project_id == projects_id);
          if(si >= 0){
            if (window.microservice_dev) {
              return window.init.microserviceSettings[si].dev_url;
            } else {
              return window.init.microserviceSettings[si].production_url;
            }
          }
        }
      }
      return "";
    },
    changeUserCondition(e){

      this.loading = true;
      const crudIndex = this.cruds.findIndex(crud => crud.id === this.data.url);
      if (crudIndex >= 0) {


        // const microserviceUrl = this.getMicroserviceUrl(this.cruds[crudIndex].projects_id);
        const microserviceUrl = "https://console-dev.tatatonga.com";

        axios.get(microserviceUrl + '/lambda/puzzle/get-krud-fields-micro/' + this.data.url).then(res => {
          this.loading = false;

          if (res.status) {
            if (this.user_fields.length === 0) {
              this.user_fields = res.data.user_fields;
            }

            this.grid_fields = res.data.grid_fields;
            this.form_fields = res.data.form_fields;


            if(e.target.value === "struct"){
              this.setStructCondition();

              this.formCondition = this.formCondition.filter(condition=>condition.user_field === "company_id" || condition.user_field === "struct_id");
              this.gridCondition = this.gridCondition.filter(condition=>condition.user_field === "company_id" || condition.user_field === "struct_id");

            } else if(e.target.value === "employee"){
              this.setEmployeeCondition();
              this.formCondition = this.formCondition.filter(condition=>condition.user_field === "company_id" || condition.user_field === "emp_id" || condition.user_field === "struct_id");
              this.gridCondition = this.gridCondition.filter(condition=>condition.user_field === "company_id" || condition.user_field === "emp_id");

            } else if(e.target.value === "company"){
              this.setCompanyCondition();
              this.formCondition = this.formCondition.filter(condition=>condition.user_field === "company_id");
              this.gridCondition = this.gridCondition.filter(condition=>condition.user_field === "company_id");
            }

            this.updateValue();

          }
        })
      }

    },
    setEmployeeCondition(){

      const empUserFieldIndex = this.user_fields && this.user_fields.length ? this.user_fields.findIndex(field=> field === "emp_id") : -1;
      const employeeConditionFormIndex = this.formCondition.findIndex(formCondition=>formCondition.user_field === "emp_id");
      const employeeConditionGridIndex = this.gridCondition.findIndex(gridCondition=>gridCondition.user_field === "emp_id");


      if(employeeConditionFormIndex >= 0){
        this.userCondition = "employee";
        this.withEmployee = true;
      } else {
        this.form_fields.forEach(form_field => {

          if(form_field === "employee_id" && empUserFieldIndex >= 0 || form_field === "emp_id" && empUserFieldIndex >= 0|| form_field === "user_id" && empUserFieldIndex >= 0) {
            this.formCondition.push({
              user_field: "emp_id",
              form_field: form_field
            });
            this.userCondition = "employee";
            this.withEmployee = true;
          }
        });
      }

      if(employeeConditionGridIndex >= 0){
        this.userCondition = "employee";
        this.withEmployee = true;
      } else {
        this.grid_fields.forEach(grid_field => {
          if(grid_field === "employee_id" && empUserFieldIndex >= 0 || grid_field === "emp_id" && empUserFieldIndex >= 0 || grid_field === "user_id" && empUserFieldIndex >= 0) {

            this.gridCondition.push({
              user_field: "emp_id",
              grid_field: grid_field,
            });
            this.userCondition = "employee";
            this.withEmployee = true;

          }

        });
      }

      this.formCondition = this.formCondition.filter(condition=>condition.user_field === "company_id" || condition.user_field === "emp_id" || condition.user_field === "struct_id");
      this.gridCondition = this.gridCondition.filter(condition=>condition.user_field === "company_id" || condition.user_field === "emp_id");


    },
    setStructCondition(){
      const structUserFieldIndex = this.user_fields && this.user_fields.length ? this.user_fields.findIndex(field=> field === "struct_id") : -1;

      const structConditionFormIndex = this.formCondition.findIndex(formCondition=>formCondition.user_field === "struct_id");
      const structConditionGridIndex = this.gridCondition.findIndex(gridCondition=>gridCondition.user_field === "struct_id");

      if(structConditionFormIndex >= 0){
        this.userCondition = "struct";
        this.withStruct = true;
      } else {
        this.form_fields.forEach(form_field => {

          if(form_field === "struct_id" && structUserFieldIndex >= 0) {
            this.formCondition.push({
              user_field: "struct_id",
              form_field: form_field
            });
            this.userCondition = "struct";
            this.withStruct = true;
          }

        });
      }


      if(structConditionGridIndex >= 0){
        this.userCondition = "struct";
        this.withStruct = true;
      } else {
        this.grid_fields.forEach(grid_field => {

          if(grid_field === "struct_id" && structUserFieldIndex >= 0) {

            this.gridCondition.push({
              user_field: "struct_id",
              grid_field: grid_field,
            });

            this.userCondition = "struct";
            this.withStruct = true;

          }
        });
      }

      this.updateValue();

    },
    setCompanyCondition(){
      const companyUserFieldIndex = this.user_fields && this.user_fields.length ? this.user_fields.findIndex(field=> field === "company_id") : -1;

      const companyConditionFormIndex = this.formCondition.findIndex(formCondition=>formCondition.user_field === "company_id");
      const companyConditionGridIndex = this.gridCondition.findIndex(gridCondition=>gridCondition.user_field === "company_id");

      if(companyConditionFormIndex >= 0){
        this.userCondition = "company";
        this.withCompany = true;


      } else {
        this.form_fields.forEach(form_field => {

          if(form_field === "company_id" && companyUserFieldIndex >= 0 || form_field === "purchase_company_id" && companyUserFieldIndex >= 0 || form_field === "sale_company_id" && companyUserFieldIndex >= 0) {
            this.formCondition.push({
              user_field: "company_id",
              form_field: form_field
            });
            this.userCondition = "company";
            this.withCompany = true;
          }

        });
      }


      if(companyConditionGridIndex >= 0){
        this.userCondition = "company";
        this.withCompany = true;
        if(this.gridCondition[companyConditionGridIndex].rid_field){
          this.gridCondition[companyConditionGridIndex]["grid_field"] = this.gridCondition[companyConditionGridIndex].rid_field;
        }
      } else {
        this.grid_fields.forEach(grid_field => {

          if(grid_field === "company_id" && companyUserFieldIndex >= 0 || grid_field === "purchase_company_id" && companyUserFieldIndex >= 0 || grid_field === "sale_company_id" && companyUserFieldIndex >= 0) {

            this.gridCondition.push({
              user_field: "company_id",
              grid_field: grid_field,
            });

            this.userCondition = "company";
            this.withCompany = true;

          }
        });
      }

      this.updateValue();

    },
    showUserData() {
      if(this.data.link_to === 'crud'){
        this.extend = true;
        this.loading = true;


        const crudIndex = this.cruds.findIndex(crud => crud.id === this.data.url);
        if (crudIndex >= 0){


          // const microserviceUrl = this.getMicroserviceUrl(this.cruds[crudIndex].projects_id);
          const microserviceUrl = "https://console-dev.tatatonga.com";

          axios.get(microserviceUrl+ '/lambda/puzzle/get-krud-fields-micro/' + this.data.url).then(res => {
            this.loading = false;

            if (res.status) {
              if (this.user_fields.length === 0) {
                this.user_fields = res.data.user_fields;
              }

              this.grid_fields = res.data.grid_fields;
              this.form_fields = res.data.form_fields;



              if (res.data.grid_fields_full) {
                this.grid_fields_full = res.data.grid_fields_full;
              }

              this.setSavePermission();

            }
          }).catch(res => {
            this.loading = false;
            this.$Message.error('Уучлаарай алдаа гарлаа');
          })
        }


      } else {
        this.extend = false;
      }

    },
    getIndex(index) {
      let pre_myIndex = [index];

      let myIndex = this.menuIndex.concat(pre_myIndex);

      return myIndex;
    },

    getTitle(item) {

      if (item.link_to == 'crud') {
        let crudIndex = this.cruds.findIndex(crud => crud.id == item.url);
        if (crudIndex >= 0)
          return this.cruds[crudIndex].title
        else
          return ''
      } else
        return item.title;
    },
    changePermissionPre(type, value, permissions) {

      if (value === true) {
        if(permissions.cPossible){
          permissions.c = true;
        }
        if(permissions.rPossible){
          permissions.r = true;
        }
        if(permissions.uPossible){
          permissions.u = true;
        }
        if(permissions.uPossible){
          permissions.d = true;
        }
        this.showUserData();
      } else {
        permissions.c = false;
        permissions.r = false;
        permissions.u = false;
        permissions.d = false;

        this.extend = false;
      }
      permissions.gridEditConditionSQL = "";
      permissions.gridDeleteConditionSQL = "";
      permissions.gridDeleteConditionJS = "";
      permissions.gridEditConditionJS = "";



      this.$emit('changePermission', type, this.data.id, value);
      this.change()
    },
    changePermission(type, menu_item_id, value) {
      this.$emit('changePermission', type, menu_item_id, value);
      this.change()
    },
    change(){
      this.$emit("change", true)
    },
    setSavePermission(){
      if (this.permissions[this.data.id].formCondition) {

        this.formCondition = this.permissions[this.data.id].formCondition;
      }

      if (this.permissions[this.data.id].gridCondition) {
        this.gridCondition = this.permissions[this.data.id].gridCondition;
      }


      const companyConditionFormIndex = this.formCondition.findIndex(formCondition=>formCondition.user_field === "company_id");
      const companyConditionGridIndex = this.gridCondition.findIndex(gridCondition=>gridCondition.user_field === "company_id");
      const structConditionFormIndex = this.formCondition.findIndex(formCondition=>formCondition.user_field === "struct_id");
      const structConditionGridIndex = this.gridCondition.findIndex(gridCondition=>gridCondition.user_field === "struct_id");
      const employeeConditionFormIndex = this.formCondition.findIndex(formCondition=>formCondition.user_field === "emp_id");
      const employeeConditionGridIndex = this.gridCondition.findIndex(gridCondition=>gridCondition.user_field === "emp_id");

      if(companyConditionFormIndex >= 0 && companyConditionGridIndex >= 0){
        this.userCondition = "company";
        this.withCompany = true;
      } else {

        this.setCompanyCondition();
      }
      if(structConditionFormIndex >= 0 && structConditionGridIndex >= 0){
        this.userCondition = "struct";
        this.withStruct = true;
      } else {
        this.setStructCondition();
      }

      if(employeeConditionFormIndex >= 0 && employeeConditionGridIndex >= 0){
        this.userCondition = "employee";
        this.withEmployee = true;
      } else {
        this.setEmployeeCondition();
      }
    }
  },
  mounted() {

    this.setSavePermission();
  },
  computed: {
    lang() {
      const labels = ['please_wait', 'list_grid', 'custom_column', 'value_column'];
      return labels.reduce((obj, key, i) => {
        obj[key] = this.$t('puzzle.' + labels[i]);
        return obj;
      }, {});
    },

  }
};
</script>
