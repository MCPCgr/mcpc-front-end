<template>
  <div class="krud-canvas">
    <common :parent="parent" :title="title" :addAction="openSide" :permissions="permissions"
            @showSalaryGenerate="showSalaryGenerate"
            :canGenerateSalary="canGenerateSalary"
    ></common>
    <portal to="header-right">
      <Krudtools :search="search"
                 :refresh="refresh"
                 :exportExcel="exportExcel"
                 :exportLoading="exportLoading"
                 :print="print"
                 :save="save"
                 :isPrint="isPrint"
                 :isExcel="isExcel"
                 :isExcelUpload="isExcelUpload"
                 :excelUploadCustomUrl="excelUploadCustomUrl"
                 :excelUploadMethod="excelUploadMethod"
                 :isRefresh="isRefresh"
                 :isSave="isSave"
                 :isSearch="false"
      />
    </portal>
    <section class="offcanvas-template">
      <div class="crud-page">
        <div class="crud-page-body">
          <div id="drawer-container">
            <div :class="openSlidePanel ? 'dg-flex open-drawer' : 'dg-flex'">
              <datagrid v-if="permissions ? permissions.r : false" ref="grid"
                        :url="url"
                        :schemaID="grid"
                        :paginate="50"
                        :fnClone="clone"
                        :fnEdit="edit"
                        :fnQuickEdit="quickEdit"
                        :fnView="view"
                        :actions="$props.actions"
                        :dblClick="$props.dbClickAction"
                        :onRowSelect="$props.onRowSelect"
                        :permissions="permissions"
                        :page_id="page_id"
                        :custom_condition="$props.custom_condition? $props.custom_condition :null"
                        :user_condition="user_condition ? user_condition.gridCondition : null"
                        :changeKrudTool="changeKrudTool"
              >
              </datagrid>
            </div>
          </div>
        </div>
      </div>
    </section>
    <a-drawer
      v-model:open="openSlidePanel"
      class="canvas-drawer"
      :maskClosable="false"
      :forceRender="true"
      :title="title"
      :width="form_width"
      placement="right"
      @close="hideSide"
    >
      <div :class="withCrudLog && editMode ? 'with-crud-log' : 'crud-form'">
        <dataform
          ref="form"
          :hideTitle="true"
          :schemaID="form"
          :title="title"
          :url="url"
          :editMode="editMode"
          :onSuccess="onSuccess"
          :onReady="onReady"
          :do_render="openSlidePanel"
          :permissions="permissions"
          :page_id="page_id"
          :user_condition="user_condition ? user_condition.formCondition : null"
          :onError="onError"
          :close="hideSide"
        >
        </dataform>
        <crud-log v-if="withCrudLog && editMode" :form="form" :rowId="rowId" :grid="grid"/>
      </div>
    </a-drawer>

    <a-modal
      v-model:open="showGenerateSalaryForm"
      class="create"
      :maskClosable="false"
      title="Цалин үүсгэх"
      :forceRender="false"
      :footer="null"
    >
      <dataform
        ref="form-salary-generate"
        :hideTitle="true"
        :schemaID="838"
        title="Цалин үүсгэх"
        :url="url"
        :editMode="false"
        :onSuccess="SalaryGenerateSuccess"
        :onReady="SalaryGenerateReady"
        :do_render="showGenerateSalaryForm"
        :permissions="{c:true}"
        :user_condition="showGenerateUserCondition.formCondition"
        :onError="SalaryGenerateError"
      >
      </dataform>
    </a-modal>

  </div>
</template>
<script>

import common from '../components/common'
import Krudtools from '../components/krudtools'
import mixins from './mixin'
import { GET_EMPLOYEE_BY_STRUCT, GET_STRUCTS_NOT_CHILD_COMPANY} from "~/graphql/queries";
import ls from "~/utils/Storage";
import {COMPANY} from "~/store/mutation-types-tatatonga";
import {USER_INFO} from "~/store/mutation-types";

export default {
  inheritAttrs: false,
  name: 'Canvas',
  mixins: [mixins],
  data() {

    return {
      openSlidePanel: false,
      exportLoading: false,
      showGenerateSalaryForm: false,
      showAttendanceModal: false,

    }
  },
  components: {
    common,
    Krudtools
  },
  computed:{
    showGenerateUserCondition(){
      return {"formCondition":[{"form_field":"company_id","user_field":"company_id"}],"gridCondition":[{"grid_field":"company_id","user_field":"company_id"}]}
    }
  },

  methods: {
    hideSide() {
      this.openSlidePanel = false;
      this.editMode = false;

    },
    openSide() {
      this.openSlidePanel = true;
    },
    templateEdit() {
      this.openSide()
    },
    templateOnSuccess() {
      this.hideSide()
    },
    showSalaryGenerate() {
      this.showGenerateSalaryForm = true;
    },
    // Salary generate
    SalaryGenerateReady(formOption) {

    },
    SalaryGenerateSuccess(){
      this.showGenerateSalaryForm = false;
      window.location.reload();
    },
    SalaryGenerateError(){

    },

  },
}
</script>
