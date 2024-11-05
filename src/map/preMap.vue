<template>
  <div class="grid grid-cols-12 2xl:grid-cols-10 map-container h-screen bg-white dark:bg-slate-900">
    <div
      class="col-span-12 lg:col-span-4 xl:col-span-3 2xl:col-span-2 p-6 overflow-y-auto bg-white dark:bg-slate-900">
      <div class="menu_style bg-white dark:bg-slate-900">
        <LayerList
          :categories="categories"
          @change-layer-unique-visible="changeLayerUniqueVisible"
          @change-layer-visible="changeLayerVisible"
        ></LayerList>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-8 xl:col-span-9 2xl:col-span-8 web-map">
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
  props:["map_id"],
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
      mapID:this.map_id,
      zoom:12,
    }
  }
}
</script>

<style>

</style>
