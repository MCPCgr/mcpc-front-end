import ls from "~/utils/Storage";
import {USER_INFO} from "~/store/mutation-types";
import UserNav from "~/components/User/UserNav.vue";
import UserSubForm from "~/components/User/UserSubForm.vue";
import UserSettings from "~/components/User/UserSettings.vue";
import Cover from "~/components/User/Cover.vue";
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
    return {
      userInfo,
      loading: true,
      user: {
        id: null,
        avatar: null,
        email: null,
        phone: null,
        gender: null,
        birthday: null,
        register_number: null,
        first_name: null,
        last_name: null,
        login: null,
        cover:null,
        showPhoneEmail:false,
        findable:false,
      },

    }
  },
  methods: {
    async init() {
      if (this.userInfo && this.userInfo.login === this.$route.params.username) {
        this.user = {...this.userInfo};

        return;
      }


      try {
        this.loading = true;
        const response = await axios.post('/api/user-by-login', {
          login: this.$route.params.username,
        });
        this.user = response.data;


      } catch (error) {
        // Handle error here.
      } finally {
        this.loading = false;
      }
    },
    settingsUpdated(data){
      const newData = {
        ...this.userInfo,
        ...data
      };
      ls.set(USER_INFO, newData);
      this.user = newData;
    }
  },
  mounted() {
    this.init();
  },
  computed: {
    menus() {
      let preMenus = [

        {
          title: "Ур чадвар",
          icon: "/assets/icons/duotune/general/gen002.svg",
          page: "skills"
        },
        {
          title: "Сургалт, дамжаа, курс",
          icon: "/assets/icons/duotone/Design/Verified.svg",
          page: "courses"
        },
        {
          title: "Туршлага",
          icon: "/assets/icons/duotune/finance/fin006.svg",
          page: "experience"
        },
      ];
      if (this.userInfo && this.userInfo.login === this.$route.params.username) {
        return [ {
          title: "Хувийн мэдээлэл",
          icon: "/assets/icons/duotune/communication/com006.svg",
          page: "profile"
        },{
          title: "Боловсрол",
          icon: "/assets/icons/duotone/Home/Book-open.svg",
          page: "education"
        },...preMenus]
      }

      return   [{
        title: "Боловсрол",
        icon: "/assets/icons/duotone/Home/Book-open.svg",
        page: "profile"
      },...preMenus]
    },
    isSubForm() {
      return this.menus.filter(menu => menu.page !== "profile").map(menu => menu.page).includes(this.$route.params.page);
    },
    page() {
      let index = this.menus.findIndex(menu => menu.page === this.$route.params.page);
      if (index >= 0) {
        return this.menus[index];
      } else {
        return this.menus[0];
      }
    }
  },
}
