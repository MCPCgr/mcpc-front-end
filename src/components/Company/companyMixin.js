import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
import UserNav from "~/components/User/UserNav.vue";
import UserSubForm from "~/components/User/UserSubForm.vue";
import UserSettings from "~/components/User/UserSettings.vue";
import Cover from "~/components/User/Cover.vue";

import {COMPANY} from "~/store/mutation-types-tatatonga";
import axios from "axios";

export default {
  name: "profile",
  components: {
    UserNav,
    UserSubForm,
    UserSettings,
    Cover
  },
  data() {
    const userInfo = ls.get(USER_INFO);
    const userCompany = ls.get(COMPANY);
    return {
      userInfo,
      userCompany,
      logo: "/amjilt-erp/images/logo.svg",
      logoDark: "/amjilt-erp/images/logo.svg",
      editMode: true,
      loading: false,
      showEditForm:false,
      company: {
        "company_about": null,
        "company_address": "",
        "company_cover": "",
        "company_domain": "",
        "company_logo": "",
        "company_mail": "",
        "company_name": "",
        "company_phone": null,
        "company_phone_two": null,
        "company_purpose": null,
        "company_register": null,
        "company_valuable": null,
        "company_vision": null,
        "company_web": null,
        "company_word": null,
        "created_at": null,
        "deleted_at": null,
        "id": null,
        "updated_at": null,
        "user_id": null
      }

    }
  },
  methods: {
    edit(){
      this.showEditForm = !this.showEditForm;
    },
    async init() {
      if (this.$route.path === "/company") {
        this.company = {...this.userCompany};

        return;
      }
      try {
        this.loading = true;
        const response = await axios.post('/api/company-by-domain', {
          company_domain: this.$route.params.comapy_domain ? this.$route.params.comapy_domain : this.userCompany.comapy_domain,
        });
        this.company = response.data;


      } catch (error) {
        // Handle error here.
      } finally {
        this.loading = false;
      }
    },
    settingsUpdated(data){

    },
    onSuccess (data) {

      let company_cover =null;
      let company_logo =null;
      if(data.company_cover){
        company_cover = data.company_cover
      }
      if(data.company_logo){
        company_logo = data.company_logo;

      }

      ls.set(COMPANY, {
        ...this.company,
        company_cover,
        company_logo,
      })
      this.company.company_logo = company_logo;
      this.company.company_cover = company_cover;

    },

  },
  mounted() {
    this.init();
  },
  computed: {
    menus() {

    },
    isSubForm() {

    },
    page() {

    },
  },
}
