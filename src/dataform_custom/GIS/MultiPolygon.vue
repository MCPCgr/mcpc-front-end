<template>
  <lambda-form-item :label=label :name="model.component" :meta="meta">
    <div class="relative">
      <a-popover title="Дархарга">
        <template #content>
          <div class="menu_style bg-white dark:bg-slate-900">
            <a-menu
              v-model:openKeys="openKeys"
              v-model:selectedKeys="selectedKeys"
              style="width: 100%;"
              mode="inline"
            >
              <a-sub-menu :key="`${catIndex}`" v-for="(category, catIndex) in categories">
                <template #icon>
                  <div class="flex">
                    <!--                  <img alt="" class="w-5 h-5" :src="category.icon"/>-->
                    <img alt=""
                         class="w-5 h-5 flex-none text-white transition-all duration-300 group-hover:block hidden dark:block"
                         :src="category.icon"/>
                    <img alt=""
                         class="w-5 h-5 flex-none text-white transition-all duration-300 group-hover:hidden block dark:hidden"
                         :src="category.icontwo"/>
                  </div>
                </template>
                <template #title><span class="dark:text-white">{{ category.title }}</span></template>
                <a-menu-item :key="layerIndex"
                             v-for="(layer, layerIndex) in category.layers.filter(layer=>!layer.uniqueRerender)">
                  <template #icon>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                         v-if="layer.type === 'Polygon'">
                      <path d="M14.5 7.31843V14H0.5V0.785098L14.5 7.31843Z" :fill="layer.fill" :stroke="layer.stroke"/>
                    </svg>
                    <svg width="18" height="24" viewBox="0 0 19 7" fill="none" xmlns="http://www.w3.org/2000/svg"
                         v-if="layer.type === 'Line'">
                      <path d="M1 6L10 2L18 1" :fill="layer.stroke" :stroke="layer.stroke" stroke-width="2"/>
                    </svg>
                    <img alt="" class="w-6 h-6" :src="layer.marker" v-if="layer.type === 'Point'"/>
                  </template>

                  <div @click="changeLayerVisible(catIndex, layer)"
                       class="cursor-pointer flex items-center justify-between py-3">

                    <div class="w-52 whitespace-normal" style="line-height: 20px !important;">
                      <span class="dark:text-white">{{ layer.title }}</span>
                    </div>
                    <img alt="" class="w-4 h-4"
                         :src="layer.visible ? '/ub-enginering/images/Eye.svg' : '/ub-enginering/images/Eyeclose.svg'"/>
                  </div>

                </a-menu-item>
                <a-sub-menu :key="layerIndex"
                            v-for="(layer, layerIndex) in category.layers.filter(layer=>layer.uniqueRerender && layer.uniqueRerender.uniqueValueInfos && layer.uniqueRerender.uniqueValueInfos.length >= 1)">
                  <template #icon>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                         v-if="layer.type === 'Polygon'">
                      <path d="M14.5 7.31843V14H0.5V0.785098L14.5 7.31843Z" :fill="layer.fill" :stroke="layer.stroke"/>
                    </svg>
                    <svg width="18" height="24" viewBox="0 0 19 7" fill="none" xmlns="http://www.w3.org/2000/svg"
                         v-if="layer.type === 'Line'">
                      <path d="M1 6L10 2L18 1" :fill="layer.stroke" :stroke="layer.stroke" stroke-width="2"/>
                    </svg>
                    <img alt="" class="w-6 h-6" :src="layer.marker" v-if="layer.type === 'Point'"/>
                  </template>

                  <template #title>
                    <div @click="changeLayerVisible(catIndex, layer)"
                         class="cursor-pointer flex items-center justify-between py-3 max-w-80px mr-6">

                      <div class="w-52 whitespace-normal" style="line-height: 20px !important;">
                        <span class="dark:text-white">{{ layer.title }}</span>
                      </div>
                      <img alt="" class="w-4 h-4 cursor-pointer"
                           :src="layer.visible ? '/ub-enginering/images/Eye.svg' : '/ub-enginering/images/Eyeclose.svg'"/>
                    </div>
                  </template>
                  <a-menu-item :key="`${uniqueValueInfoIndex}`"
                               v-for="(uniqueValueInfo, uniqueValueInfoIndex) in layer.uniqueRerender.uniqueValueInfos">
                    <template #icon>
                      <img alt="" class="w-6 h-6 ml-2" :src="uniqueValueInfo.symbol"/>
                    </template>
                    <div @click="changeLayerUniqueVisible(catIndex, layer, uniqueValueInfo)"
                         class="cursor-pointer flex items-center justify-between py-3">

                      <div class="w-52 whitespace-normal" style="line-height: 20px !important;">
                        <span class="dark:text-white">{{ uniqueValueInfo.label }}</span>
                      </div>
                      <img alt="" class="w-4 h-4"
                           :src="uniqueValueInfo.visible ? '/ub-enginering/images/Eye.svg' : '/ub-enginering/images/Eyeclose.svg'"/>
                    </div>
                  </a-menu-item>
                </a-sub-menu>
              </a-sub-menu>
            </a-menu>
          </div>
        </template>

        <div class="toggle-basemap" style="z-index: 1500">
          <!-- Replace the following SVG path with your desired SVG icon -->
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
               width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
               preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
               fill="#000000" stroke="none">
              <path d="M1388 3947 c-643 -292 -1165 -534 -1160 -538 7 -7 2267 -1035 2312
-1052 22 -8 183 63 1185 518 638 290 1164 530 1168 534 6 6 -2258 1044 -2323
1065 -8 3 -540 -234 -1182 -527z"/>
              <path d="M443 2667 c-122 -56 -222 -104 -222 -107 0 -8 2322 -1060 2339 -1060
17 -1 2339 1052 2340 1060 0 11 -460 212 -473 207 -8 -3 -431 -195 -940 -426
l-926 -421 -935 425 c-514 234 -941 425 -948 424 -7 -1 -113 -47 -235 -102z"/>
              <path d="M453 1817 c-122 -56 -224 -105 -227 -108 -3 -3 521 -245 1165 -537
l1170 -532 1170 532 c643 292 1166 535 1162 539 -4 4 -109 53 -232 108 l-223
101 -939 -426 -938 -427 -938 427 c-516 234 -940 426 -943 425 -3 0 -105 -46
-227 -102z"/>
            </g>
          </svg>
        </div>
      </a-popover>
      <div ref="map" class="map"></div>
      <starter :started="started" @start="start" :selectedType="selectedType"></starter>
<!--      <basemapToggle @toggleGalleryVisibility="toggleGalleryVisibility"></basemapToggle>-->
<!--      <basemapGallery :bases="bases" v-show="isGalleryVisible" @setBaseLayer="setBaseLayer"></basemapGallery>-->
    </div>
  </lambda-form-item>
</template>

<script>

import mixin from "./mixin_old";
export default {
  mixins:[mixin],
  data(){
    return {
      selectedType: 'MultiPolygon',
      is3D: false,
      zoom:16,
      openKeys: ['0', '0-0', '1', '1-0'],
      selectedKeys: [],
      categories: [
        {
          id: 1,
          title: "ХОТ БАЙГУУЛАЛТ ХӨГЖЛИЙН ГАЗАР",
          icon: "/ub-enginering/icon/zasag-white.svg",
          icontwo: "/ub-enginering/icon/zasag.svg",
          layers: [
            {
              id: 1,
              title: "Баригдсан барилга",
              type: "Polygon",
              fill: "rgba(232,74,6,0.1)",
              stroke: "#E84A06",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/hbhg_built_building/{z}/{x}/{y}.pbf',
              visible: true,
              layer: null,
              popup: {
                template: `Гудамж: <b>{bldng_street_name}</b><br>`
              }
            },
            {
              id: 1,
              title: "Төлөвлөгдсөн инженерийн шугам сүлжээ ",
              type: "Polygon",
              fill: "rgba(130,6,232,0.1)",
              stroke: "#8206e8",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/hbhg_engineering/{z}/{x}/{y}.pbf',
              visible: true,
              layer: null,
              popup: {
                template: `Гудамж: <b>{bldng_street_name}</b><br>`
              }
            },
            {
              id: 1,
              title: "Хэсэгчилсэн ерөнхий төлөвлөгөөний хил",
              type: "Polygon",
              fill: "rgba(6,145,232,0.1)",
              stroke: "#017cc9",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/hbhg_het_hil/{z}/{x}/{y}.pbf',
              visible: true,
              layer: null,
              popup: {
                template: `Гудамж: <b>{ogc_fid}</b><br>`
              }
            },
            {
              id: 1,
              title: "Хэсэгчилсэн Ерөнхий төлөвлөгөөний төмөр зам",
              type: "Polygon",
              fill: "rgba(6,145,232,0.1)",
              stroke: "#017cc9",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/hbhg_het_tumur_zam/{z}/{x}/{y}.pbf',
              visible: true,
              layer: null,
              popup: {
                template: `Гудамж: <b>{ogc_fid}</b><br>`
              }
            },
            {
              id: 1,
              title: "Хэсэгчилсэн ерөнхий төлөвлөгөөний авто зам",
              type: "Polygon",
              fill: "rgba(6,145,232,0.1)",
              stroke: "#017cc9",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/hbhg_het_zam/{z}/{x}/{y}.pbf',
              visible: true,
              layer: null,
              popup: {
                template: `Гудамж: <b>{ogc_fid}</b><br>`
              }
            },
            {
              id: 1,
              title: "Төлөвлөгдсөн барилга",
              type: "Polygon",
              fill: "rgba(232,194,6,0.1)",
              stroke: "#e5b802",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/hbhg_plan_building/{z}/{x}/{y}.pbf',
              visible: true,
              layer: null,
              popup: {
                template: `Гудамж: <b>{ogc_fid}</b><br>`
              }
            },
            {
              id: 1,
              title: "Төлөвлөгдсөн авто зам",
              type: "Polygon",
              fill: "rgba(232,179,6,0.1)",
              stroke: "#e1c405",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/hbhg_plan_road/{z}/{x}/{y}.pbf',
              visible: true,
              layer: null,
              popup: {
                template: `Гудамж: <b>{ogc_fid}</b><br>`
              }
            },
            {
              id: 2,
              title: "Хороо хил",
              type: "Polygon",
              fill: "rgba(26,156,178,0.1)",
              stroke: "#1a9cb2",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/ub_horoo/{z}/{x}/{y}.pbf',
              visible: false,
              layer: null,
              popup: {
                template: `
                Нэр: <b>{name}</b><br>
                Талбай: <b>{area_m2}</b><br>
                Дүүрэг: <b>{name_desc}</b>`
              }
            },
          ]
        },
        {
          id: 2,
          title: "УЛААНБААТАР ДУЛААНЫ СҮЛЖЭЭ",
          icon: "/ub-enginering/icon/zasag-white.svg",
          icontwo: "/ub-enginering/icon/zasag.svg",
          layers: [
            {
              id: 21,
              title: "УБДС ТӨХК-тэй гэрээтэй хэрэглэгчийн шугам ",
              type: "Line",
              fill: "rgba(232,74,6,0.1)",
              stroke: "#E84A06",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/ubds_dist_main/{z}/{x}/{y}.pbf',
              visible: true,
              layer: null,
              popup: {
                template: `Гудамж: <b>{objectid}</b><br>`
              }
            },
            {
              id: 22,
              title: "Төв шугамын худаг",
              type: "Line",
              fill: "rgba(232,6,25,0.1)",
              stroke: "#e8060e",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/ubds_node/{z}/{x}/{y}.pbf',
              visible: false,
              layer: null,
              popup: {
                template: `Гудамж: <b>{pipe_name}</b><br>`
              }
            },
            {
              id: 23,
              title: "Төв шугам",
              type: "Line",
              fill: "rgba(232,6,32,0.1)",
              stroke: "#c9011f",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/ubds_supply_main/{z}/{x}/{y}.pbf',
              visible: true,
              layer: null,
              popup: {
                template: `Гудамж: <b>{objectid_1}</b><br>`
              }
            },

          ]
        },
        {
          id: 3,
          title: "УЛААНБААТАР ЦАХИЛГААН ТҮГЭЭХ",
          icon: "/ub-enginering/icon/zasag-white.svg",
          icontwo: "/ub-enginering/icon/zasag.svg",
          layers: [
            {
              id: 21,
              title: "Өндөр хүчдпийн агаарын шугамын дамжуулагч",
              type: "Line",
              fill: "rgba(217,174,1,0.1)",
              stroke: "#7203d9",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/ubtst_high_voltage_air/{z}/{x}/{y}.pbf',
              visible: true,
              layer: null,
              popup: {
                template: `Гудамж: <b>{objectid}</b><br>`
              }
            },
            {
              id: 21,
              title: "Өндөр хүчдлийн кабель шугамын дамжуулагч ",
              type: "Line",
              fill: "rgba(217,174,1,0.1)",
              stroke: "#8303d9",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/ubtst_high_voltage_cable/{z}/{x}/{y}.pbf',
              visible: false,
              layer: null,
              popup: {
                template: `Гудамж: <b>{objectid}</b><br>`
              }
            },
            {
              id: 21,
              title: "Нам талын агаарын шугамын дамжуулагч",
              type: "Line",
              fill: "rgba(217,174,1,0.1)",
              stroke: "#8303d9",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/ubtst_low_voltage_air/{z}/{x}/{y}.pbf',
              visible: false,
              layer: null,
              popup: {
                template: `Гудамж: <b>{objectid}</b><br>`
              }
            },
            {
              id: 21,
              title: "Нам талын кабель шугамын дамжуулагч",
              type: "Line",
              fill: "rgba(217,174,1,0.1)",
              stroke: "#9203d9",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/ubtst_low_voltage_cable/{z}/{x}/{y}.pbf',
              visible: false,
              layer: null,
              popup: {
                template: `Гудамж: <b>{objectid}</b><br>`
              }
            },
            {
              id: 21,
              title: "Эх үүсгүүрийн станц",
              type: "Point",
              marker:"/ub-enginering/images/gis-lift-normal.svg",
              url: 'https://mapserver.ub-engineering.gov.mn/maps/mapserver/ubtst_main/{z}/{x}/{y}.pbf',
              visible: true,
              layer: null,
              popup: {
                template: `Гудамж: <b>{objectid}</b><br>`
              }
            },

          ]
        },

      ],
    }
  }

}
</script>

