<template>
  <section class="rounded-md pt-20 pb-12 xl:bg-contain bg-top bg-no-repeat bg-white dark:bg-slate-800 relative"  v-if="company.company_word && company.company_vision">

    <div class="container"><div class="max-full mx-auto mb-12 text-center">
      <h2 class="my-2 text-3xl md:text-4xl font-bold font-heading z-1">{{
          company.company_word
        }}</h2>
      <p class="text-blueGray-400 leading-loose z-1">{{
          company.company_vision
        }}</p></div></div>

    <!--    <img src="/amjilt-erp/images/intersect.svg" class="z-0 h-full w-full absolute left-0 top-0 right-0 object-fill">-->
  </section>
  <div class="card rounded-md bg-white dark:bg-slate-800">

    <section class="pb-16 pt-16">
      <div class="container px-2">
        <div class="max-w-2xl lg:max-w-3xl mx-auto">
          <div class="mb-12 text-center">
            <h2 class="text-3xl lg:text-4xl font-heading wow animate__animated animate__fadeIn animated" data-wow-delay=".1s">Холбогдох мэдээлэл</h2>
            <p class="text-blueGray-400 wow animate__animated animate__fadeIn animated" data-wow-delay=".5s">Бид таныг сонсохдоо баяртай байх болно</p>
          </div>
          <div class="flex flex-wrap -mx-3 text-center">
            <div class="w-1/2 lg:w-1/3 px-3 mb-12 wow animate__animated animate__fadeIn animated" data-wow-delay=".1s">
            <span class="svg-icon mb-6 h-8 w-8 mx-auto block">
              <inline-svg class="h-8 w-8" src="/assets/icons/duotone/Interface/Phone.svg" />
            </span>
              <div class="leading-relaxed">
                <span class="text-sm text-blueGray-400">Утас</span>
                <p> {{ company.company_phone }} <br>{{ company.company_phone_two }}</p>

              </div>
            </div>
            <div class="w-1/2 lg:w-1/3 px-3 mb-12 wow animate__animated animate__fadeIn animated" data-wow-delay=".3s">
            <span class="svg-icon mb-6 h-8 w-8 mx-auto block">
              <inline-svg class="h-8 w-8" src="/assets/icons/duotone/Communication/Mail.svg" />
            </span>
              <div class="leading-relaxed">
                <span class="text-sm text-blueGray-400">И-мэйл</span>
                <p>{{ company.company_mail }}</p>
                <p></p>
              </div>
            </div>
            <div class="w-1/2 lg:w-1/3 px-3 mb-12 wow animate__animated animate__fadeIn animated" data-wow-delay=".3s">
            <span class="svg-icon mb-6 h-8 w-8 mx-auto block">
              <inline-svg class="h-8 w-8" src="/assets/icons/duotone/Home/Home.svg" />
            </span>
              <div class="leading-relaxed">
                <span class="text-sm text-blueGray-400">Цахим хуудас</span>
                <p><a href="{{ company.company_web}}">{{ company.company_web }}</a></p>
                <p></p>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap text-center">
            <div class="w-full mb-12 wow animate__animated animate__fadeIn animated" data-wow-delay=".5s">
              <div class="">
                <div class="flex justify-center">
                  <div class="flex justify-center w-full">
                    <span class="svg-icon mb-6 h-8 w-8 block">
                    <inline-svg class="h-8 w-8" src="/assets/icons/duotone/Home/Building.svg" />
                  </span>
                  </div>
                </div>
                <div class="">
                  <div class="text-sm text-blueGray-400 text-center pb-1">Хаяг</div>
                  <p class="text-center">{{ company.company_address }}</p>
                </div>
              </div>
            </div>
          </div>


          <div class="w-full" style="height: 400px; margin: 0 auto" v-if="geo_location !== null">
            <l-map class="border rounded" :zoom="zoom" :center="geo_location" :draggable="false" :useGlobalLeaflet="false">
              <l-tile-layer :url="baseMapUrl" :attribution="attribution" :subdomains="subdomains" :max-zoom="maxZoom" layer-type="base"></l-tile-layer>
              <l-marker :lat-lng="geo_location"

                        @mouseover="hover = true"
                        @mouseout="hover = false">
                <l-icon icon-url="/amjilt-erp/icon/map-marker.png" :iconSize="[32, 32]" :iconAnchor="[16, 16]" ></l-icon>
                <l-popup v-if="hover" >
                  <p>{{ company.company_address }}</p>
                </l-popup>
              </l-marker>

            </l-map>
            <a href="#" class="mx-2" v-for="baseMap in baseMaps" :key="baseMap.index" @click.prevent="changeBaseMap(baseMap.url, baseMap.subdomains, baseMap.maxZoom)">{{baseMap.title}}</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { LMap, LTileLayer, LMarker, LIcon, LTooltip, LPopup } from '@vue-leaflet/vue-leaflet';

import "leaflet/dist/leaflet.css";
export default {
  name: "About",
  props: ["company"],

  data(){
    return {
      baseMapUrl: 'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      baseMaps:[{
        title: 'Google Гудамж',
        url:'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],

      },{
        title:"Google Сансрын",
        url:"https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      }],
      attribution: '',
      zoom: 13,
      hover:false,
    }
  },
  computed:{
    geo_location(){
      if (this.company.geo_location) {
        if (this.company.geo_location !== null){
          return JSON.parse(this.company.geo_location);
        }
      }

      return null
    }
  },
  methods:{
    changeBaseMap(url, subdomains, maxZoom){
      this.baseMapUrl = url;
      this.subdomains = subdomains;
      this.maxZoom = maxZoom;

    }
  },
  components: {
    'l-map': LMap,
    'l-tile-layer': LTileLayer,
    'l-marker': LMarker,
    'l-icon': LIcon,
    'l-tooltip': LTooltip,
    'l-popup':LPopup,
  },

}
</script>

<style >
.leaflet-control-attribution{
  display: none !important;
}

</style>
