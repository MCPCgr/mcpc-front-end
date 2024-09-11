<template>
  <div class="card drawer-wrappper ">
    <Head>
      <Title>{{ company.company_name}}</Title>
    </Head>

    <portal to="sub-top-menu" v-if="subTopMenus.length">
      <SubTopMenu :menu="subTopMenus" :collapsed="false" mode="horizontal"/>
    </portal>
    <portal to="header-left">
      <div class="page-title float-left">
        <div class="float-left pt-3">
          <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">{{ company.company_name }}</h1>
          <h2 class="text-gray-400 text-xs m-0"><span>Байгууллагын бүтэц</span></h2>
        </div>
      </div>
    </portal>
    <section class="offcanvas-template company-profile  bg-white dark:bg-slate-900 rounded-md px-3 pt-3 pb-20">

      <div class="container mx-auto flex justify-end">
        <a-radio-group v-model:value="treeOrientation" button-style="solid" class="ml-auto">
          <a-radio-button value="0">Босоо</a-radio-button>
          <a-radio-button value="1">Хөндлөн</a-radio-button>
        </a-radio-group>
      </div>
      <div class="container mx-auto flex justify-center">
        <blocks-tree :data="structs" v-if="structs" :horizontal="treeOrientation=='1'" :collapsable="true">

          <template #node="{data,context}">
            <a-dropdown :overlayStyle="{ minWidth: '250px' }">
              <a class="ant-dropdown-link text-center " @click.prevent>
                <StructCompany v-if="data.isCompany" :struct="data"></StructCompany>
                <div class="flex" v-else>
                  <inline-svg v-if="data.struct_type === 'branch'" src="/assets/icons/organization/branch.svg" class="svg-icon mr-2.5"/>
                  <span>{{ data.struct_name }}</span>
                </div>
              </a>
              <template #overlay>
                <StructCompanyDetail :struct="data" v-if="data.isCompany" :addStruct="addStruct" :editStruct="editStruct"  :addCompany="addCompany"  />
                <StructDetail v-else :struct="data" :addStruct="addStruct" :editStruct="editStruct" :addCompany="addCompany" />
              </template>


            </a-dropdown>

          </template>
        </blocks-tree>
        <!--    <div>-->
        <!--      Selected: {{selected}}-->
        <!--    </div>-->
      </div>
    </section>
    <a-modal v-model:open="showForm" title="Салбар нэгж" :footer="null">
      <dataform
        :url="base_url"
        v-if="showForm"
        ref="form"
        schemaID="727"
        :editMode="editMode"
        :hideTitle="true"
        :onSuccess="onSuccess"
        :onError="onError"
        :do_render="showForm"
        :onReady="formReady"
        :permissions="{
        c: false,
        r: true,
        u: true,
        d: false,
      }"
        :user_condition="null"
      ></dataform>
      <!--    </div>-->

      <template #footer></template>
    </a-modal>
    <a-modal v-model:open="showCompanyForm" title="Хамаарал бүхий, охин компани" :footer="null" :width="600">
      <dataform
        :url="base_url"
        v-if="showCompanyForm"
        ref="childCompanyForm"
        schemaID="865"
        :editMode="false"
        :hideTitle="true"
        :onSuccess="onSuccessChildCompanyForm"
        :onError="onError"
        :do_render="showForm"
        :onReady="formReadyChildCompanyForm"
        :permissions="{
        c: false,
        r: true,
        u: true,
        d: false,
      }"
        :user_condition="null"
      ></dataform>
      <!--    </div>-->

      <template #footer></template>
    </a-modal>
  </div>


</template>
<script>
import {base_url} from "~/consts/const"
import pageMixin from "~/mixins/page";
import {PlusOutlined} from '@ant-design/icons-vue'
import {GET_STRUCTS} from '~/graphql/queries'
import {COMPANY} from '~/store/mutation-types-tatatonga'
import ls from "~/utils/Storage";
import StructCompany from "~/components/Company/Struct/StructCompany.vue";
import StructDetail from "~/components/Company/Struct/StructDetail.vue";
import StructCompanyDetail from "~/components/Company/Struct/StructCompanyDetail.vue";
import {USER_INFO} from "~/store/mutation-types";
import {structCreator} from "~/utils/struct";
export default {
  mixins: [pageMixin],
  components: {
    PlusOutlined,
    StructCompany,
    StructDetail,
    StructCompanyDetail
  },
  data() {
    const UserInfo = ls.get(USER_INFO);
    const company = ls.get(COMPANY);
    return {
      UserInfo,
      base_url,
      company,
      structs: null,
      selectedStruct: null,
      treeOrientation: '0',
      showForm: false,
      showCompanyForm: false,
      editMode: false,
    };
  },
  watch: {
    showForm(value) {
      if (!value) {
        this.selectedStruct = null;
        this.editMode = false;
      }
    }
  },
  methods: {
    editStruct(id) {
      this.selectedStruct = id;
      this.showForm = true;
      this.editMode = true;
    },
    addStruct(id) {
      this.selectedStruct = id;
      this.showForm = true;
      this.editMode = false;
    },
    addCompany(id) {
      this.selectedStruct = id;
      this.showCompanyForm = true;
    },
    onSuccess() {
      this.getStructData();
      this.showForm = false;
      this.showCompanyForm = false;

    },
    onSuccessChildCompanyForm() {
     window.location.reload();

    },

    onError() {
    },
    formReady() {
      this.$nextTick(() => {


        this.$refs.form.setSchemaByModel("company_id", "value", this.company.company_id, false);
        this.$refs.form.setSchemaByModel("company_id", "disabled", true, false);
        if (this.selectedStruct !== null && this.editMode) {

          this.$refs.form.editModel(this.selectedStruct);
        } else {
          this.$refs.form.setSchemaByModel("parent_id", "value", this.selectedStruct, false);
        }

      });
    },
    formReadyChildCompanyForm() {
      this.$nextTick(() => {
        this.$refs.childCompanyForm.setSchemaByModel("parent_company_id", "value", this.company.company_id, false);
        this.$refs.childCompanyForm.setSchemaByModel("parent_company_id", "disabled", true, false);

        this.$refs.childCompanyForm.setSchemaByModel("user_id", "value", this.UserInfo.id, false);
        this.$refs.childCompanyForm.setSchemaByModel("parent_company_struct_id", "value", this.selectedStruct, false);

      });
    },
    toggleSelect(node, isSelected) {
      if (isSelected) {
        this.selected.push(node.id);
      } else {
        this.selected.splice(this.selected.indexOf(node.id), 1);
      }
      if (node.children && node.children.length) {
        node.children.forEach(ch => {
          this.toggleSelect(ch, isSelected);
        });
      }
    },
    getStructData() {
      this.structs = null;
      this.$apollo
        .query({
          query: GET_STRUCTS,
          fetchPolicy: "no-cache",
          variables: {company_id: this.company.company_id},
        })
        .then((res) => {

          this.structs = {
            struct_name: this.company.company_name,
            expand: true,
            isCompany: true,
            id: this.company.company_id,
            phone: this.company.company_phone,
            address: this.company.company_address,
            children: structCreator((res.data["view_struct"])),
          }

        });
    },

  },
  beforeMount() {
    this.getStructData();
  },
};
</script>
