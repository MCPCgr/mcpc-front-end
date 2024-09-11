<template>
  <div>
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
    <section class="flex flex-col bg-gray-100 dark:bg-slate-900 xl:pt-20 pt-14 justify-center">
      <div class="absolute top-0 inset-x-0 hidden sm:block">
        <img src="/amjilthome/images/white-wave.svg" alt="svg" class="w-full -scale-x-100">
      </div>
      <div class="container max-w-6xl px-6 space-y-16 mx-auto aos-init aos-animate pb-20" data-aos="fade-up" data-aos-duration="1500">
        <div class="flex flex-col items-center text-center space-y-4">
          <h1 class="text-4xl/tight font-medium">LMS, SIS</h1>
          <p class="text-slate-500 w-9/12">{{ $t("home.LMS_Text") }}, {{ $t("home.SIS_Text") }}</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 not-prose" >
          <div class="relative flex flex-col items-start p-6 space-y-2 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="relative bg-slate-100 p-3 rounded-full w-12 h-12 flex-none">
              <svg fill="#103067" viewBox="0 0 36 36" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" opacity="0.3" d="M5.33317 13.3333H10.6665V22.6666H13.3332V13.3333H18.6665V22.6666H21.3332V13.3333H26.6665V22.6666C28.1393 22.6666 29.3332 23.8605 29.3332 25.3333V26.6666C29.3332 28.1393 28.1393 29.3333 26.6665 29.3333H5.33317C3.86041 29.3333 2.6665 28.1393 2.6665 26.6666V25.3333C2.6665 23.8605 3.86041 22.6666 5.33317 22.6666V13.3333Z"></path>
                <path xmlns="http://www.w3.org/2000/svg" d="M2.6665 9.8054C2.6665 8.71499 3.33037 7.73443 4.3428 7.32947L15.0095 3.0628C15.6452 2.80849 16.3545 2.80849 16.9902 3.0628L27.6569 7.32947C28.6693 7.73443 29.3332 8.71499 29.3332 9.8054V10.6666C29.3332 12.1394 28.1393 13.3333 26.6665 13.3333H5.33317C3.86041 13.3333 2.6665 12.1394 2.6665 10.6666V9.8054Z"></path>
              </svg>
            </div>
            <p class="relative text-slate-800 dark:text-slate-400">{{ $t("sislms.ebs") }}</p>
          </div>
          <div class="relative flex flex-col items-start p-6 space-y-2 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="relative bg-slate-100 p-3 rounded-full w-12 h-12 flex-none">
              <svg fill="#103067" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" opacity="0.25" fill-rule="evenodd" clip-rule="evenodd" d="M11 4.25769C11 3.07501 9.9663 2.13515 8.84397 2.50814C4.86766 3.82961 2 7.57987 2 11.9999C2 13.6101 2.38057 15.1314 3.05667 16.4788C3.58731 17.5363 4.98303 17.6028 5.81966 16.7662L5.91302 16.6728C6.60358 15.9823 6.65613 14.9011 6.3341 13.9791C6.11766 13.3594 6 12.6934 6 11.9999C6 9.62064 7.38488 7.56483 9.39252 6.59458C10.2721 6.16952 11 5.36732 11 4.39046V4.25769ZM16.4787 20.9434C17.5362 20.4127 17.6027 19.017 16.7661 18.1804L16.6727 18.087C15.9822 17.3964 14.901 17.3439 13.979 17.6659C13.3594 17.8823 12.6934 17.9999 12 17.9999C11.3066 17.9999 10.6406 17.8823 10.021 17.6659C9.09899 17.3439 8.01784 17.3964 7.3273 18.087L7.23392 18.1804C6.39728 19.017 6.4638 20.4127 7.52133 20.9434C8.86866 21.6194 10.3899 21.9999 12 21.9999C13.6101 21.9999 15.1313 21.6194 16.4787 20.9434Z"></path>
                <path xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" d="M13 4.39046C13 5.36732 13.7279 6.16952 14.6075 6.59458C16.6151 7.56483 18 9.62064 18 11.9999C18 12.6934 17.8823 13.3594 17.6659 13.9791C17.3439 14.9011 17.3964 15.9823 18.087 16.6728L18.1803 16.7662C19.017 17.6028 20.4127 17.5363 20.9433 16.4788C21.6194 15.1314 22 13.6101 22 11.9999C22 7.57987 19.1323 3.82961 15.156 2.50814C14.0337 2.13515 13 3.07501 13 4.25769V4.39046Z"></path>
              </svg>
            </div>
            <p class="relative text-slate-800 dark:text-slate-400">{{ $t("sislms.dataMonitoring") }}</p>
          </div>
          <div class="relative flex flex-col items-start p-6 space-y-2 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="relative bg-slate-100 p-3 rounded-full w-12 h-12 flex-none">
              <svg version="1.1" viewBox="0 0 24 24" height="24px" width="24px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch -->
                <title xmlns="http://www.w3.org/2000/svg">Stockholm-icons / Navigation / Route</title>
                <desc xmlns="http://www.w3.org/2000/svg">Created with Sketch.</desc>
                <defs xmlns="http://www.w3.org/2000/svg"></defs>
                <g xmlns="http://www.w3.org/2000/svg" id="Stockholm-icons-/-Navigation-/-Route" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <polygon id="Shape" points="0 0 24 0 24 24 0 24"></polygon>
                  <path d="M8,7 C7.44771525,7 7,6.55228475 7,6 C7,5.44771525 7.44771525,5 8,5 L16,5 C18.209139,5 20,6.790861 20,9 C20,11.209139 18.209139,13 16,13 L8,13 C6.8954305,13 6,13.8954305 6,15 C6,16.1045695 6.8954305,17 8,17 L17,17 C17.5522847,17 18,17.4477153 18,18 C18,18.5522847 17.5522847,19 17,19 L8,19 C5.790861,19 4,17.209139 4,15 C4,12.790861 5.790861,11 8,11 L16,11 C17.1045695,11 18,10.1045695 18,9 C18,7.8954305 17.1045695,7 16,7 L8,7 Z" id="Path-110" fill="#103067" fill-rule="nonzero" opacity="0.5"></path>
                  <path d="M9.79289322,3.79289322 C10.1834175,3.40236893 10.8165825,3.40236893 11.2071068,3.79289322 C11.5976311,4.18341751 11.5976311,4.81658249 11.2071068,5.20710678 L8.20710678,8.20710678 C7.81658249,8.59763107 7.18341751,8.59763107 6.79289322,8.20710678 L3.79289322,5.20710678 C3.40236893,4.81658249 3.40236893,4.18341751 3.79289322,3.79289322 C4.18341751,3.40236893 4.81658249,3.40236893 5.20710678,3.79289322 L7.5,6.08578644 L9.79289322,3.79289322 Z" id="Path-104" fill="#103067" fill-rule="nonzero" transform="translate(7.500000, 6.000000) rotate(-270.000000) translate(-7.500000, -6.000000) "></path>
                  <path d="M18.7928932,15.7928932 C19.1834175,15.4023689 19.8165825,15.4023689 20.2071068,15.7928932 C20.5976311,16.1834175 20.5976311,16.8165825 20.2071068,17.2071068 L17.2071068,20.2071068 C16.8165825,20.5976311 16.1834175,20.5976311 15.7928932,20.2071068 L12.7928932,17.2071068 C12.4023689,16.8165825 12.4023689,16.1834175 12.7928932,15.7928932 C13.1834175,15.4023689 13.8165825,15.4023689 14.2071068,15.7928932 L16.5,18.0857864 L18.7928932,15.7928932 Z" id="Path-104-Copy" fill="#103067" fill-rule="nonzero" transform="translate(16.500000, 18.000000) scale(1, -1) rotate(270.000000) translate(-16.500000, -18.000000) "></path>
                </g>
              </svg>
            </div>
            <p class="relative text-slate-800 dark:text-slate-400">{{ $t("sislms.training") }}</p>
          </div>
          <div class="relative flex flex-col items-start p-6 space-y-2 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="relative bg-slate-100 p-3 rounded-full w-12 h-12 flex-none">
              <svg version="1.1" viewBox="0 0 24 24" height="24px" width="24px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" d="M3,3 L21,3 C21.5522847,3 22,3.44771525 22,4 L22,11 C22,11.5522847 21.5522847,12 21,12 L3,12 C2.44771525,12 2,11.5522847 2,11 L2,4 C2,3.44771525 2.44771525,3 3,3 Z M5,8 C4.44771525,8 4,8.44771525 4,9 C4,9.55228475 4.44771525,10 5,10 L19,10 C19.5522847,10 20,9.55228475 20,9 C20,8.44771525 19.5522847,8 19,8 L5,8 Z" id="Combined-Shape" fill="#103067"></path>
                <path xmlns="http://www.w3.org/2000/svg" d="M17.2914283,14.2943612 L18.7085717,15.7056388 C17.6611931,16.7573706 17.6647221,18.4590358 18.7164539,19.5064144 C18.8065164,19.5961041 18.902828,19.6792918 19.0046636,19.755351 L19.5984004,20.1988028 L18.4015996,21.8011972 L17.8078628,21.3577454 C17.6302443,21.2250852 17.4622605,21.0799918 17.3051762,20.9235577 C15.4707777,19.096752 15.4646226,16.1287596 17.2914283,14.2943612 Z M11.2914283,15.2943612 L12.7085717,16.7056388 C11.6611931,17.7573706 11.6647221,19.4590358 12.7164539,20.5064144 C12.8065164,20.5961041 12.902828,20.6792918 13.0046636,20.755351 L13.5984004,21.1988028 L12.4015996,22.8011972 L11.8078628,22.3577454 C11.6302443,22.2250852 11.4622605,22.0799918 11.3051762,21.9235577 C9.47077775,20.096752 9.4646226,17.1287596 11.2914283,15.2943612 Z M5.29142832,14.2943612 L6.70857168,15.7056388 C5.66119311,16.7573706 5.66472209,18.4590358 6.71645389,19.5064144 C6.80651638,19.5961041 6.90282804,19.6792918 7.00466363,19.755351 L7.59840039,20.1988028 L6.40159961,21.8011972 L5.80786284,21.3577454 C5.63024431,21.2250852 5.46226047,21.0799918 5.30517622,20.9235577 C3.47077775,19.096752 3.4646226,16.1287596 5.29142832,14.2943612 Z" id="Combined-Shape" fill="#103067" fill-rule="nonzero" opacity="0.3"></path>
              </svg>
            </div>
            <p class="relative text-slate-800 dark:text-slate-400">{{ $t("sislms.report") }}</p>
          </div>
          <div class="relative flex flex-col items-start p-6 space-y-2 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="relative bg-slate-100 p-3 rounded-full w-12 h-12 flex-none">
              <svg version="1.1" viewBox="0 0 24 24" height="24px" width="24px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                <path xmlns="http://www.w3.org/2000/svg" d="M2.76702366,20 C2.59202225,20 2.4200849,19.9540749 2.2683913,19.8668136 C1.78966338,19.5914265 1.62482304,18.9800956 1.90021009,18.5013676 L11.1332403,2.45083309 C11.221302,2.29774818 11.3483346,2.17071522 11.5014193,2.08265312 C11.9801465,1.80726488 12.5914779,1.97210369 12.8668662,2.45083092 L22.0999499,18.5013655 C22.187212,18.6530596 22.2331375,18.8249977 22.2331375,19 C22.2331375,19.5522847 21.7854223,20 21.2331375,20 L2.76702366,20 Z M11,18 L15,12 L12.9444444,12 L12.9444444,8 L9,14 L11,14 L11,18 Z" id="Combined-Shape"  fill="#103067"></path>
              </svg>
            </div>
            <p class="relative text-slate-800 dark:text-slate-400">{{ $t("sislms.trackKeyword") }}</p>
          </div>
          <div class="relative flex flex-col items-start p-6 space-y-2 overflow-hidden hover:shadow-lg transition-all duration-700 rounded-xl dark:border-slate-800 dark:bg-slate-800 bg-white group">
            <span class="dark:block hidden absolute w-full h-full bg-white dark:bg-slate-800 inset-0 dark:group-hover:bg-regal-purple group-hover:bg-slate-50 group-hover:bg-opacity-30 transition-all duration-700"></span>
            <div class="relative bg-slate-100 p-3 rounded-full w-12 h-12 flex-none">
              <svg version="1.1" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg">
                <rect xmlns="http://www.w3.org/2000/svg" id="Combined-Shape" fill="#103067" x="2" y="7" width="17" height="10" rx="2"></rect>
                <path xmlns="http://www.w3.org/2000/svg" d="M20,10 L21,10 C21.5522847,10 22,10.4477153 22,11 L22,13 C22,13.5522847 21.5522847,14 21,14 L20,14 L20,10 Z" id="Rectangle" fill="#103067" opacity="0.3"></path>
              </svg>
            </div>
            <p class="relative text-slate-800 dark:text-slate-400">{{ $t("sislms.programChoice") }}</p>
          </div>
        </div>
      </div>
      <introduction-banner/>
    </section>
  </div>
</template>

<script>
import IntroductionBanner from "~/components/home/introduction-banner.vue";

export default {
  name: "sis-and-lms",
  beforeCreate() {
    definePageMeta({
      layout: 'home',
    })
  },
  components:{
    IntroductionBanner,
  }
}
</script>

<style scoped>

</style>
