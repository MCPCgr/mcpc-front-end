<template>
  <div class="top-menu flex items-center ">
    <!-- Logo on the left -->
    <div class="logo-container px-4">
      <img src="https://erp.mcpc.mn/amjilthome/logos/mcpc-gr.svg" alt="Logo"  @click="toggleFullScreen" class="h-10 w-auto cursor-pointer" />
    </div>

    <!-- Ant Design Menu component -->
    <a-menu mode="horizontal" :items="items" @select="handleMenuSelect" class="flex-1" />
  </div>

  <div class="page-content">
    <!-- Display page content -->
    <div v-if="currentPage">
      <h2>{{ currentPage.title }}</h2>
      <div v-html="currentPage.description"></div>
      <PreMap v-if="currentPage.map_id" :current_page="currentPage" class="w-full presentation-map mt-1"></PreMap>
      <div v-if="currentPage.page_images" class="image-gallery">
        <a-image
          v-for="(image, index) in parsedImages"
          :key="index"
          :src="image.thumbUrl"
          :alt="image.name"
          class="image-slide"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {getPre} from '~/graphql/presentations';
import PreMap from '~/map/preMap.vue';

const route = useRoute();
const router = useRouter();

const pages = ref([]);
const currentPage = ref(null);
const parsedImages = ref([]);
const items = ref([]);
const current = ref(null);

function toggleFullScreen() {
  const doc = document.documentElement;
  if (!document.fullscreenElement) {
    doc.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}
function getData(id) {
  getPre(id).then((res) => {
    pages.value = res.v_pages;
    if(res.v_pages[0].view_pages && res.v_pages[0].view_pages.length > 0){
      currentPage.value = res.v_pages[0].view_pages[0];
    } else {
      currentPage.value = res.v_pages[0];
    }
    current.value = currentPage.value.id;
    parseImages();
    buildMenuItems();
    console.log(res);
  });
}

function parseImages() {
  // Check if the current page has page_images and parse them
  if (currentPage.value && currentPage.value.page_images) {
    parsedImages.value = JSON.parse(currentPage.value.page_images);
  }
}

function navigateToPage(page) {

const map_id = page.map_id;

  currentPage.value = {...page, map_id:null};

  setTimeout(()=>{
    currentPage.value.map_id = map_id;
  }, 300)

  parseImages();
}

function handleMenuSelect(page) {
console.log(page)
  navigateToPage(page.item);
}

function buildMenuItems() {
  items.value = pages.value.map((page) => {
    const menuItem = {
      key: page.id,
      label: page.title,
      ...page
    };
    if (page.view_pages) {
      menuItem.children = page.view_pages.map((subPage) => ({
        key: subPage.id,
        label: subPage.title,
        ...subPage
      }));
    }
    return menuItem;
  });
}

definePageMeta({
  layout: 'presentation',
});

onMounted(() => {
  getData(route.params.id);
});
</script>

<style scoped lang="scss">
.top-menu {
  width: 100%;

  padding: 10px;
}

.page-content {
  margin-top: 20px;
  padding: 20px;
}

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  .image-slide{
    width: 50% !important;
  }
}

</style>
