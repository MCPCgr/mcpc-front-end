<template>
  <div class="grid grid-cols-12 2xl:grid-cols-10 map-container h-screen bg-white dark:bg-slate-900">
    <!--    <div-->
    <!--      class="col-span-12 lg:col-span-4 xl:col-span-3 2xl:col-span-2 p-6 overflow-y-auto bg-white dark:bg-slate-900">-->
    <!--      <div class="menu_style bg-white dark:bg-slate-900">-->

    <!--      </div>-->
    <!--    </div>-->
    <div class="col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12 web-map">
      <LayerList
        :categories="categories"
        @change-layer-unique-visible="changeLayerUniqueVisible"
        @change-layer-visible="changeLayerVisible"
        class="layer-list"
      ></LayerList>
      <div id="map">
      </div>

      <div id="popup" class="ol-popup text-[13px]">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
      </div>
      <basemapToggle @toggleGalleryVisibility="toggleGalleryVisibility"></basemapToggle>
      <basemapGallery :bases="bases" v-show="isGalleryVisible" @setBaseLayer="setBaseLayer"></basemapGallery>
      <Scalebar/>
      <Measure @startMeasure="startMeasure"/>
      <CoordinateBar/>
      <Locate/>
      <a-modal width="70%" v-model:open="showElements" title="Харилцагчийн хүсэлт илгээх" :footer="null" force-render>

        <h3 v-html="element.element_title"></h3>
        <div v-html="element.element_description"></div>
        <div v-if="element.element_images" >
          <a-image
            v-for="(image, index) in element.element_images"
            :key="index"
            :src="image.thumbUrl"
            :alt="image.name"
            class="image-slide"

          />
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import Locate from "~/map/components/tools/locate.vue";
import CoordinateBar from "~/map/components/tools/coordinateBar.vue";
import Scalebar from "~/map/components/tools/scalebar.vue";
import Measure from "~/map/components/tools/measure.vue";
import basemapGallery from "~/map/components/basemapGallery.vue";
import basemapToggle from "~/map/components/basemapToggle.vue";
import LayerList from "~/components/Map/LayerList.vue";
import mapMixin from "~/map/mixin";

export default {
  props: ["current_page"],
  mixins: [mapMixin],
  components: {
    Scalebar,
    LayerList,
    Measure,
    CoordinateBar,
    Locate,
    basemapToggle,
    basemapGallery,
  },
  data() {
    return {
      mapID: this.current_page.map_id,
      zoom: 8,
      pageElement: this.current_page,
      showElements: false,
      element: {
        "id": "",
        "element_title": "",
        "element_images": [],
        "element_description": "",
        "layer_id": "1fc6ec13-4e16-4594-9a87-d19075d77340",
        "object_id": "1"
      }
    }
  },
  methods: {
    showElementDetail(element) {
     this.element = {...element, element_images: element.element_images ? JSON.parse(element.element_images) : []};
      this.showElements = true;
    }
  }
}
</script>

<style>

</style>
