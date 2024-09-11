<template>
  <div class="container mx-auto max-w-7xl	px-4 xl:px-12 pt-21 pb-60">
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

    <portal to="header-left">
      <div className="page-title float-left">
        <div className="float-left pt-3">
          <h1 className="text-gray-700 dark:text-gray-200 text-base m-0 ">Тусламж</h1>
          <h2 className="text-gray-400 text-xs m-0"><span>Хэрэглэгчийн дэмжлэг</span></h2>
        </div>
      </div>
    </portal>

    <!-- Subscribe -->
    <div class="max-w-6xl py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto">
      <div class="max-w-xl text-center mx-auto">
        <div class="mb-5">
          <h2 class="text-2xl font-bold md:text-3xl md:leading-tight dark:text-white">Бид танд юугаар туслах вэ?</h2>
        </div>

        <form>
          <div class="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <div class="w-full">
              <label for="hero-input" class="sr-only">Хариултуудыг хайх</label>
              <input type="text"  class="py-3 px-4 block w-full  shadow-md rounded-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="Хариултуудыг хайх">
            </div>
            <a class="w-full sm:w-auto whitespace-nowrap inline-flex justify-center items-center gap-x-3 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:focus:ring-offset-gray-800" href="#">
              Хайх
            </a>
          </div>
        </form>
      </div>
    </div>
    <h1 class="text-2xl text-black_color font-bold leading-5 pb-10 m-0">Тусламж авах аргууд</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 pb-24">

      <!-- Хүсэлт илгээх, төлбөрийн нөхцлөө сонгох -->
      <nuxt-link to="/guide" target="_blank" class="relative border-4 border-highlight_color bg-highlight_color hover:border-highlight_color_hover py-8 px-6 transition-all duration-300 cursor-pointer rounded-lg">
        <div class="text-center">
          <div class="inline-flex items-center justify-center pb-6">
            <img class="w-16 h-16" src="/amjilt-erp/images/u_guide.svg"/>
          </div>
          <h2 class="text-lg font-semibold text-black_color leading-5 pb-4 m-0">Гарын авлага, видео хичээл</h2>
          <span class="text-[15px]" style="color: #5C6584;">ERP систем ашиглан байгууллага аа яаж удирдах, хэрхэн өндөр бүтээмжтэй болох вэ</span>
        </div>

      </nuxt-link>

      <!-- Суурьлуулалт -->
      <nuxt-link to="/faq" target="_blank" class="relative border-4 border-highlight_color bg-highlight_color hover:border-highlight_color_hover py-8 px-6 transition-all duration-300 cursor-pointer rounded-lg">
        <div class="text-center">
          <div class="inline-flex items-center justify-center pb-6">
            <img class="w-16 h-16" src="/amjilt-erp/images/faq.svg"/>
          </div>
          <h2 class="text-lg font-semibold text-black_color leading-5 pb-4 m-0">Түгээмэл асуулт хариулт</h2>
          <span class="text-[15px]" style="color: #5C6584;">Ямар чиглэлээр үйл ажиллагаа явуулдаг бол ERP ашиглах боломжтой вэ ? гэх мэт...</span>
        </div>

      </nuxt-link>

      <!-- Техникийн тусламж дэмжлэг -->
      <nuxt-link to="/erp/p/f77688e4-df79-6e35-035f-b6179c1cfb11" class="relative border-4 border-highlight_color bg-highlight_color hover:border-highlight_color_hover py-8 px-6 transition-all duration-300 cursor-pointer rounded-lg">
        <div class="text-center">
          <div class="inline-flex items-center justify-center pb-6">
            <img class="w-16 h-16" src="/amjilt-erp/images/u_support.svg"/>
          </div>
          <h2 class="text-lg font-semibold text-black_color leading-5 pb-4 m-0">Хэрэглэгчийн дэмжлэг</h2>
          <span class="text-[15px]" style="color: #5C6584;">Тусламжын хүсэлт үүсгэх харах, санал хүсэлт илгэх</span>
        </div>

      </nuxt-link>
    </div>


  </div>
</template>
<script>
import { createVNode } from 'vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';


export default {
  methods:{

  }
}
</script>



<style scoped>

</style>
