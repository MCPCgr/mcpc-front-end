<template>
  <div class="card drawer-wrappper attendance">
    <Head>
      <Title>Ирц</Title>
    </Head>
    <portal to="sub-top-menu" v-if="subTopMenus.length">
      <SubTopMenu :menu="subTopMenus" :collapsed="false" mode="horizontal"/>
    </portal>
    <portal to="header-left">
      <div class="page-title float-left">
        <div class="float-left pt-3">
          <h1 class="text-gray-700 dark:text-gray-200 text-base m-0 ">Ирц</h1>
          <h2 class="text-gray-400 text-xs m-0"><span>Цаг бүртгэл</span></h2>
        </div>
      </div>
    </portal>
    <section class="offcanvas-template company-profile bg-white dark:bg-slate-900 rounded-md px-3 pt-20 pb-20 w-full flex flex-col items-center justify-center space-y-6">

      <a-form
        :model="attendanceLog"
        ref="formRef"
        :rules="rules"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        class="w-[500px] space-y-6"
      >
        <a-form-item label="Салбар нэгж"   class="data-form-item" name="struct_id" has-feedback :validate-status="!loading_structs ? 'validating': ''">
          <a-tree-select v-model:value="attendanceLog.struct_id"
                         show-search
                         style="width: 100%"
                         allow-clear
                         tree-default-expand-all
                         :tree-data="structs"
                          @change="getEmps"
          >
          </a-tree-select>
        </a-form-item>

        <a-form-item label="Ажилтан"  class="data-form-item" name="employee_id"  has-feedback :validate-status="loading_employee ? 'validating': ''">
          <a-select v-model:value="attendanceLog.employee_id" class="w-full"  @change="getShift(attendanceLog.employee_id)">
            <a-select-option :value="emp.id +' '+ emp.ajliin_tsag_id" v-for="emp in employees" :key="emp.index">{{emp.firstname }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Ээлж"  class="data-form-item" name="shift_id" has-feedback :validate-status="loading_shift ? 'validating': ''">
          <a-select v-model:value="attendanceLog.shift_id" style="width: 100%"          >
            <a-select-option :value="shift.id" v-for="shift in shifts" :key="shift.index">{{ shift.shift_title}} </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="Ирсэн цаг"  class="data-form-item" name="in_datetime">
          <a-date-picker
            show-time v-model:value="attendanceLog.in_datetime"
            :locale="locale"
            value-format="YYYY-MM-DDTHH:mm:ss[Z]"/>
        </a-form-item>
        <a-form-item label="Явсан цаг"  class="data-form-item" name="out_datetime">
          <a-date-picker
            show-time v-model:value="attendanceLog.out_datetime"
            :locale="locale"
            value-format="YYYY-MM-DDTHH:mm:ss[Z]"/>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit" :loading="is_loading" @click="registerAttendance">Бүртгэх</a-button>
        </a-form-item>
      </a-form>
      <div id="msg">
           <span v-if="isSuccess" class="success text-green-400">{{ successMsg }}</span>
            <span v-if="isError" class="error text-red-400">{{ errorMsg }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import pageMixin from "~/mixins/page";
import {
  GET_EMPLOYEE_BY_STRUCT_WiIH_SHIFT,
  GET_EMPLOYEE,
  GET_STRUCTS_NOT_CHILD_COMPANY, GET_SHIFT
} from "~/graphql/queries";
import ls from "~/utils/Storage";
import {COMPANY} from "~/store/mutation-types-tatatonga";
import {USER_INFO} from "~/store/mutation-types";
import mn_MN from "@lambda-platform/lambda-vue/src/antlocale/date_mn_MN";
import { message } from 'ant-design-vue';
import {structCreator} from "~/utils/struct";
export default {
  mixins: [pageMixin],

  data() {
    const company = ls.get(COMPANY);
    const user = ls.get(USER_INFO);
    return {
      user,
      company,
      structs: [],
      company_id: company.company_id,
      employee_id: null,
      loading_structs: false,
      loading_employee: false,
      loading_shift: false,
      attendanceLog:{
        company_id: company.company_id,
        struct_id:null,
        employee_id:null,
        shift_id:null,
        in_datetime:null,
        out_datetime:null,
      },
      // user_id:user.id,
      emps:[],
      selected_employee: "",
      employees:[],
      shifts:[],
      is_loading: false,
      rules: {
        struct_id: [
          { required: true, message: 'Салбар нэгжээ сонгоно уу!', trigger: 'blur'},
        ],
        employee_id: [
          { required: true, message: 'Ажилтнаа сонгоно уу!', trigger: 'blur'},
        ],
        shift_id: [
          { required: true, message: 'Ээлж ээ сонгоно уу!', trigger: 'blur'},
        ],
        in_datetime: [
          { required: true, message: 'Ирсэн цаг сонгоно уу!', trigger: 'blur'},
        ],
        out_datetime: [
          { required: true, message: 'Явсан цаг сонгоно уу!', trigger: 'blur'},
        ],

      },
      errorMsg: '',
      successMsg: '',
      isSuccess: false,
      isError: false,
      locale:mn_MN
    };
  },
  mounted() {
    this.getStructData();
    this.setNow();
  },

  methods: {
    setNow(){
      // axios.get("https://mcpc.mn/lambda/krud/now").then(({data})=>{
      //   this.attendanceLog.register_datetime = data.today;
      // });
    },
    getShift(value){
      let shift_id = '11111111-1111-1111-1111-111111111111';
      this.loading_shift = true;
        if(value === null || value === undefined)
          { value = ''; }
        else{
          const varaba = value.split(" ");
          this.employee_id = varaba[0];
          if (varaba[1] === 'undefined'){
            // console.log("undefined");
          } else {
            this.attendanceLog.shift_id = varaba[1];
            shift_id = varaba[1];
            this.$apollo.query( {
              query:GET_SHIFT,
              client: "attendanceClient",
              fetchPolicy: "no-cache",
              variables: {
                id: shift_id,
                company_id: this.company_id
              }
            }).then((res) => {
              this.shifts = res.data.shift;
              this.loading_shift = false;

            }).catch(e=>{ console.log(e) });
          }
        }
        console.log("this.attendanceLog BEFORE >>> ", this.attendanceLog)
    },

    getEmps(struct_id){
      if (struct_id === undefined){ struct_id = ''; }
      this.loading_employee = true;
      this.$apollo.query({
          query: GET_EMPLOYEE_BY_STRUCT_WiIH_SHIFT,
          fetchPolicy: "no-cache",
          variables: {company_id: this.company.company_id, struct_id: struct_id},
        }).then((res) => {
          this.employees = res.data["view_emp"];
          // console.log(this.employees)
          this.loading_employee = false;
          this.attendanceLog.employee_id = null;
          this.attendanceLog.shift_id = null;
          this.shifts = [];
        });
    },

    getStructData() {
      this.$apollo
        .query({
          query: GET_STRUCTS_NOT_CHILD_COMPANY,
          fetchPolicy: "no-cache",
          variables: {company_id: this.company.company_id},
        })
        .then((res) => {
          this.structs = structCreator((res.data["view_struct"]))
          this.loading_structs = true;
        });
    },
    registerAttendance () {
        this.attendanceLog.employee_id = this.employee_id;
        console.log("this.attendanceLog AFTER >>> ", this.attendanceLog)
        axios.post("https://attendance.mcpc.mn/api/attendance/manually", this.attendanceLog).then((response)=>{
          if (response.data.status === "success") {
            this.attendanceLog = {
                company_id: this.company.company_id,
                struct_id: null,
                employee_id: null,
                shift_id: null,
                in_datetime: null,
                out_datetime: null
            };
            message.success('Цаг бүртгэлээ!');
          }
        });
    }
  },
};
</script>
<style scoped></style>
