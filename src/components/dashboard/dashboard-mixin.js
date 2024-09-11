import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
import dayjs from '@lambda-platform/lambda-vue/src/utils/dayjs'
import {COMPANIES} from "~/store/mutation-types-tatatonga";
import {GET_STRUCTS_NOT_CHILD_COMPANIES} from "~/graphql/queries";
import {structCreator} from "~/utils/struct";

export default {

  data() {
    let user = ls.get(USER_INFO);
    const currentDate = dayjs();
    let companies = ls.get(COMPANIES).map(com => {
      return {...com, selected: true}
    });
    let start = currentDate.subtract(31, 'day').format('YYYY-MM-DD');
    let end = currentDate.format('YYYY-MM-DD');

    let dates = [start, end];
    return {
      companies,
      user,
      loading: true,
      barchartData: {
        "title": "",
        "data": {
          "xdata": [],
          "data": [
            {"name": "Орлого", "smooth": true, "data": [], "type": "bar"}, {
              "name": "Зарлага",
              "smooth": true,
              "data": [],
              "type": "bar"
            }]
        },
        "colors": ["#FF9B05", "#21B3FF"]
      },
      companyFilter: [{"column": "company_id", "condition": "equals", "value": `${user.company_id}`}],
      posDate: [{"column": "order_date", "condition": "greaterThanOrEqual", "value": start}, {"column": "order_date", "condition": "lessThanOrEqual", "value": end}],
      financeDate: [{"column": "fin_date", "condition": "greaterThanOrEqual", "value": start}, {"column": "fin_date", "condition": "lessThanOrEqual", "value": end}],
      saleDate: [{"column": "sales_date", "condition": "greaterThanOrEqual", "value": start}, {"column": "sales_date", "condition": "lessThanOrEqual", "value": end}],
      prod_date: [{"column": "prod_date", "condition": "greaterThanOrEqual", "value": start}, {"column": "prod_date", "condition": "lessThanOrEqual", "value": end}],
      transfer_date: [{"column": "transfer_date", "condition": "greaterThanOrEqual", "value": start}, {"column": "transfer_date", "condition": "lessThanOrEqual", "value": end}],

      salesCompanyFilter: [{"column": "sale_company_id", "condition": "equals", "value": `${user.company_id}` }],
      treasurerFilter: [{"column": "company_id", "condition": "equals", "value": `${user.company_id}`}],
      summaryByCompany: [],
      gridFilter: {"company_id": companies.map(com => com.company_id), fin_date: dates},
      selectedCompanies:[],
      structs:[],
      rawStructs:[],
    }
  },
  methods:{
    getStructData() {
      let companyIDs = this.selectedCompanies.map(com => com.company_id);
      let companyIDsJoined = companyIDs.map(element => `${element}`).join(",");
      this.$apollo
        .query({
          query: GET_STRUCTS_NOT_CHILD_COMPANIES,
          fetchPolicy: "no-cache",
          variables: {companyIDs: companyIDsJoined},
        })
        .then((res) => {

          this.rawStructs = res.data["view_struct"].map(struct=>{
            return {
              value:struct.id,
              label:struct.struct_name
            }
          })
          if(this.selectedCompanies.length === 1){

            this.structs = structCreator((res.data["view_struct"]));

          }
        });
    },

    selectCompany(selectedCompanies) {
      this.selectedCompanies = selectedCompanies;
      this.getStructData();

    },
    prepareFilterData(searchData){

      if (this.selectedCompanies.length === 1) {

        this.$emit("selectedOneCompany", this.selectedCompanies[0].company_id);
        if (searchData.struct_id) {
          this.companyFilter = [{
            "column": "company_id",
            "condition": "equals",
            "value": `${this.selectedCompanies[0].company_id}`
          }, {"column": "struct_id", "condition": "equals", "value": `${searchData.struct_id}`}]
        } else {
          this.companyFilter = [{
            "column": "company_id",
            "condition": "equals",
            "value": `${this.selectedCompanies[0].company_id}`
          }];
        }


        if (searchData.struct_id) {
          this.treasurerFilter = [
            {
            "column": "company_id",
            "condition": "equals",
            "value": `${this.selectedCompanies[0].company_id}`
          },
            {"column": "branch_id", "condition": "equals", "value": `${searchData.company_id}`}
          ]

          this.salesCompanyFilter = [{
            "column": "sale_company_id",
            "condition": "equals",
            "value": `${this.selectedCompanies[0].company_id}`
          },
            {"column": "struct_id", "condition": "equals", "value": `${searchData.company_id}`}
          ]
        } else {
          this.treasurerFilter = [{
            "column": "company_id",
            "condition": "equals",
            "value": `${this.selectedCompanies[0].company_id}`
          }];


          this.salesCompanyFilter = [{
            "column": "sale_company_id",
            "condition": "equals",
            "value": `${this.selectedCompanies[0].company_id}`
          }
          ]
        }


      } else if (this.selectedCompanies.length >= 2) {


        let companyIDsJoined = searchData.companyIDs.map(element => `'${element}'`).join(",");
        this.companyFilter = [{"column": "company_id", "condition": "whereIn", "value": companyIDsJoined}];
        this.treasurerFilter = [{"column": "company_id", "condition": "whereIn", "value": companyIDsJoined}];
        this.salesCompanyFilter = [{"column": "sale_company_id", "condition": "whereIn", "value": companyIDsJoined}];
        searchData.struct_id = null;


      }

      let start = searchData.start_date.format('YYYY-MM-DD')
      let end = searchData.end_date.format('YYYY-MM-DD')
      this.posDate = [{"column": "order_date", "condition": "greaterThanOrEqual", "value": start}, {"column": "order_date", "condition": "lessThanOrEqual", "value": end}],
      this.financeDate = [{"column": "fin_date", "condition": "greaterThanOrEqual", "value": start}, {"column": "fin_date", "condition": "lessThanOrEqual", "value": end}],
      this.saleDate = [{"column": "sales_date", "condition": "greaterThanOrEqual", "value": start}, {"column": "sales_date", "condition": "lessThanOrEqual", "value": end}],
      this.prod_date = [{"column": "prod_date", "condition": "greaterThanOrEqual", "value": start}, {"column": "prod_date", "condition": "lessThanOrEqual", "value": end}],
      this.transfer_date = [{"column": "transfer_date", "condition": "greaterThanOrEqual", "value": start}, {"column": "transfer_date", "condition": "lessThanOrEqual", "value": end}],
      this.gridFilter = {
        "company_id": this.selectedCompanies.map(com => com.company_id),
        fin_date: [start, end]
      }
      if (searchData.struct_id) {
        this.gridFilter["struct_id"] = searchData.struct_id
      }
    },
  }

}
