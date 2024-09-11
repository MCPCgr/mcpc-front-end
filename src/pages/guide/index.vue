<template>
  <div class="container mx-auto max-w-6xl	px-6 pt-32 pb-60">
    <Head>
      <Title>Амжилт байгууллагын нэгдсэн систем</Title>
      <Meta name="url" content="https://amjilt.com" />
      <Meta name="type" content="news" />
      <Meta name="title" content="Амжилт байгууллагын нэгдсэн систем" />
      <Meta name="description" content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн." />
      <Meta name="image" content="https://amjilt.com/images/home-banner.png" />
      <Meta property="og:url" content="https://amjilt.com" />
      <Meta property="og:type" content="news" />
      <Meta property="og:title" content="Амжилт байгууллагын нэгдсэн систем" />
      <Meta property="og:description" content="Та уламжлалт аргаар бизнесээ удирдсаар л байна уу? Agile ERP систем гэж сонссон уу? Амжилт систем нь байгууллагын үйл ажиллагааг цогцоор нь удирдаж хянах Cloud суурьтай agile ERP систем юм. Гадаадын ямар нэг лицензгүй 100% Монгол улсад хөгжүүлэгдсэн." />
      <Meta property="og:image" content="https://amjilt.com/images/home-banner.png" />
    </Head>
    <loader v-if="loading"/>
  </div>
</template>
<script>
import {GET_USER_GUIDE_CATEGORY} from "~/graphql/home";
import Loader from "~/components/common/_loading.vue";



export default {
  beforeCreate() {
    definePageMeta({
      layout: 'home',
    })
  },
  data() {
    return {
      loading: false
    }
  },
  components:{
    // NoData,
    Loader
  },
  methods: {
    getCategory() {
      this.loading = true;
      this.$apollo.query({
        query: GET_USER_GUIDE_CATEGORY,
        fetchPolicy: 'no-cache',}
      ).then(({data}) => {
        if(data.user_guide_category.length > 0){
          this.$router.push('/guide/'+data.user_guide_category[0].user_guide[0].id);
        }
      });
    },

  },
  mounted() {
    this.getCategory();

  }
}
</script>
