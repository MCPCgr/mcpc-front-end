<template>
  <lambda-form-item :label=label :name="model.component" :meta="meta">

    <div ref="map" class="map"></div>
    <starter :started="started" @start="start"  :selectedType="selectedType"></starter>
<!--    <basemapToggle @toggleGalleryVisibility="toggleGalleryVisibility"></basemapToggle>-->
<!--    <basemapToggle @toggleGalleryVisibility="toggleGalleryVisibility"></basemapToggle>-->
<!--    <basemapGallery :bases="bases" v-show="isGalleryVisible" @setBaseLayer="setBaseLayer"></basemapGallery>-->
  </lambda-form-item>
</template>
<script>

import mixin from "./mixin_old";

import {iMap} from "~/modules/iMap/iMap";

import {toLonLat, transform} from 'ol/proj';
import {WKT} from "ol/format";
import Point from "ol/geom/Point";
import {to3D} from "~/dataform_custom/GIS/utils";
const transformToWGS84 = coord => transform(coord, 'EPSG:3857', 'EPSG:4326');

import { apply } from 'ol-mapbox-style';
export default {
  mixins:[mixin],
  props:[],
  data(){
    return {
      selectedType: 'LineString',
      is3D: false,
      iMapClient:null
    }
  },
  computed:{
    au_soum(){
      return  this.model.form['au_soum'];
    },
    au_bagh(){
      return this.model.form['au_bagh'];
    },
    au_street(){
      return this.model.form['au_street'];
    },
  },
  watch:{
    async au_soum(){
      const baghs = await  this.iMapClient.getBagh(this.model.form['au_province'], this.model.form['au_soum']);
       this.setSchemaByModel('au_bagh', 'options', baghs.names.map(n=>{
        return {value:n, label:n}
      }));
      const sum_border = await  this.iMapClient.getSoumBorder(this.model.form['au_province'], this.model.form['au_soum'])
      console.log(sum_border, 'sum_border')

    },
    async au_bagh(){
      const street = await  this.iMapClient.getStreet(this.model.form['au_province'], this.model.form['au_soum'], this.model.form['au_bagh']);
      this.setSchemaByModel('au_street', 'options', street.names.map(n=>{
        return {value:n, label:n}
      }))
      const bag_border = await  this.iMapClient.getBagBorder(this.model.form['au_province'], this.model.form['au_soum'], this.model.form['au_bagh'])
      console.log(bag_border, 'bag_border')
    },
    async au_street(){
      const bair = await  this.iMapClient.getBuildins(this.model.form['au_province'], this.model.form['au_soum'], this.model.form['au_bagh'], this.model.form['au_street']);
      this.setSchemaByModel('au_object_number', 'options', bair.t_address.map(n=>{
        return {value:n.adrs_no, label:n.adrs_no}
      }))
    }
  },
  methods:{
    onDrawEnd(event) {
      let  feature = null;
      if(event.features){
        feature = event.features.getArray()[0]
      } else {
        feature = event.feature
      }
      const geometry = feature.getGeometry().clone();

      const wktFormat = new WKT();
      if(geometry.getType() === "Point"){
        let transformedGeometry;
        // console.log(transformToWGS84(geometry.getCoordinates()));
        transformedGeometry = new Point(to3D(transformToWGS84(geometry.getCoordinates()), this.is3D));
        // console.log(wktFormat.writeGeometry(transformedGeometry))
        this.model.form[this.model.component] = wktFormat.writeGeometry(transformedGeometry);

       this.findAddress(geometry.getCoordinates(), 'point')
      } else if(geometry.getType() === "LineString"){
        geometry.transform('EPSG:3857', 'EPSG:4326');
        this.model.form[this.model.component] = wktFormat.writeGeometry(geometry);
        this.findAddress(geometry.getCoordinates(), 'line')
      }

      this.started = false;
      this.map.removeInteraction(this.draw);
    },
    async getProvinces(){
      //const provinces = await  this.iMapClient.getProvinces();
      //
      //console.log(provinces, 'provinces');
      //
      const soums = await  this.iMapClient.getSoums(this.model.form['au_province']);
      this.setSchemaByModel('au_soum', 'options', soums.names.map(n=>{
          return {value:n, label:n}
        })
      )

      const bags = await  this.iMapClient.getBagh(this.model.form['au_province'], this.model.form['au_soum']);
      this.setSchemaByModel('au_street', 'options', bags.names.map(n=>{
          return {value:n, label:n}
        })
      )

      const streets = await  this.iMapClient.getStreet(this.model.form['au_province'], this.model.form['au_soum'], this.model.form['au_bagh']);
      this.setSchemaByModel('au_object_number', 'options', streets.names.map(n=>{
          return {value:n, label:n}
        })
      )

      // const baghs = await  this.iMapClient.getBagh(provinces.names[0], soums.names[7]);
      // console.log(baghs);
      //
      // const streets = await  this.iMapClient.getStreet(provinces.names[0], soums.names[7], baghs.names[23]);
      // console.log(streets);
      //
      // const buildings = await  this.iMapClient.getBuildins(provinces.names[0], soums.names[7], baghs.names[23], streets.names[4]);
      // console.log(buildings);


    },
    async findAddress(coordinates, type){
      console.log(coordinates, 'coordinates')
      if(type === 'point'){
        const lonLat = toLonLat(coordinates); // Convert coordinate to longitude and latitude
        if(lonLat && lonLat.length == 2){
          // , this.map.getView().getZoom()
          const result = await this.iMapClient.findByXY(lonLat[0], lonLat[1])
          //console.log(result);
          if(result.t_region_data){
            this.model.form['au_soum'] = result.t_region_data.sum
            this.model.form['au_bagh'] = result.t_region_data.horoo_bag
            this.model.form['au_street'] = result.t_region_data.street
            this.model.form['au_object_number'] = result.t_region_data.number
            this.model.form['hayg'] = `${result.t_region_data.pref_city} ${result.t_region_data.sum} ${result.t_region_data.horoo_bag} ${result.t_region_data.street} ${result.t_region_data.number != null ? result.t_region_data.number : ''}`
          }
        }
      } else if(type === 'line'){
        if(coordinates[0].length === 2){
          const result = await this.iMapClient.findByXY(coordinates[0][0], coordinates[1][1])
          //console.log(result);
          if(result.t_region_data) {
            this.model.form['au_soum'] = result.t_region_data.sum
            this.model.form['au_bagh'] = result.t_region_data.horoo_bag
            this.model.form['au_street'] = result.t_region_data.street
            this.model.form['au_object_number'] = result.t_region_data.number
            let haygResult = '';
            this.model.form['hayg'] = '';
            for (let i = 0; i < coordinates.length; i++) {
              const result = await this.iMapClient.findByXY(coordinates[i][0], coordinates[i][1]);
              haygResult += `${result.t_region_data.pref_city} ${result.t_region_data.sum} ${result.t_region_data.horoo_bag} ${result.t_region_data.street != null ? result.t_region_data.street : ''} ${result.t_region_data.number != null ? result.t_region_data.number : ''}` + ',  ';  // Append each result with a space (or any delimiter)
            }
            this.model.form['hayg'] = haygResult.trim();
          }
        }
      }
    }
  },
  mounted() {
    this.model.form['au_province'] = "Улаанбаатар хот"
    this.iMapClient = new iMap();
    this.iMapClient.initialize()
      .then(() => {
         this.getProvinces();

      })
      .catch((error) => {
        console.error('Failed to initialize iMap:', error);
      });



  }
}
</script>

