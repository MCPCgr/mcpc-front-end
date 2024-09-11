<template>
  <lambda-form-item :label=label :name="model.component" :meta="meta">
    <a-spin
      :tip="stove_id === null || mine_id === null || checkpointIDS.length === 0 ? 'Уурхай, Уурын зуух, Шалган өнгөрөх цэг сонгоно уу' : 'Түр хүлээнэ үү...'"
      :spinning="stove_id === null || mine_id === null || checkpointIDS.length === 0 ? true : loading"
      :wrapperClassName="stove_id === null || mine_id === null || checkpointIDS.length === 0 ? 'map-info' : ''">
      <div class="relative">
        <div ref="map" class="map map-route"></div>
        <starter :started="started" @start="start" :selectedType="selectedType"></starter>
        <basemapToggle @toggleGalleryVisibility="toggleGalleryVisibility"></basemapToggle>
        <basemapGallery :bases="bases" v-show="isGalleryVisible" @setBaseLayer="setBaseLayer"></basemapGallery>
      </div>
    </a-spin>
  </lambda-form-item>
</template>

<script>

import mixin from "./mixin_old";
import LineString from 'ol/geom/LineString';
import axios from "~/plugins/core/axios";
import {Vector as VectorSource} from "ol/source";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import {Vector as VectorLayer} from "ol/layer";
import {WKT} from "ol/format";
import {decodeHexewkbToWkt} from "~/dataform_custom/GIS/utils";
import {Feature} from "ol";
import Modify from "ol/interaction/Modify";

const source = new VectorSource({wrapX: false});
const markerStyle = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    src: '/map/checkpoint.svg',
    scale: 1,
  })
});
const markerSteam = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    src: '/map/Steam.svg',
    scale: 1,
  })
});

const markerMining = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    src: '/map/mining.svg',
    scale: 1,
  })
});

const vector = new VectorLayer({
  source: source,
  style: (feature) => {
    if (feature.values_.type === "checkpoint") {
      return markerStyle
    } else if (feature.values_.type === "mining") {
      return markerMining
    } else if (feature.values_.type === "steam") {
      return markerSteam
    }


  }
});
export default {
  mixins: [mixin],
  data() {
    return {
      selectedType: 'LineString',
      is3D: false,
      loading: false,
      checkpoints: [],

    }
  },
  computed: {
    stove_id() {
      return this.model.form["stove_id"]
    },
    mine_id() {
      return this.model.form["mine_id"]
    },
    checkpointIDS() {
      if (this.model.form["sub_checkpoint"] && this.model.form["sub_checkpoint"].length) {
        return [...new Set(this.model.form["sub_checkpoint"].map(c => c.checkpoint_id).filter(id => id !== null))];
      } else {
        return [];
      }
    },

  },
  methods: {
    isHexadecimal(str) {
      const hexRegex = /^[0-9a-fA-F]+$/;
      return hexRegex.test(str);
    },
    removeByType(type) {
      const featuresToRemove = [];
      source.forEachFeature((feature) => {
        if (feature.get('type') === type) {
          featuresToRemove.push(feature);
        }
      });

      featuresToRemove.forEach((feature) => {
        source.removeFeature(feature);
      });
    },
    getExistingPointCount(){

      if(this.itemValue !== null){
        const format = new WKT();

        const lineString = this.isHexadecimal(this.itemValue) ? format.readGeometry(decodeHexewkbToWkt(this.itemValue)) : format.readGeometry(this.itemValue);
        const coordinates = lineString.getCoordinates();


        return coordinates.length
      } else {
        return 0
      }

    },
    extentToSource() {
      if (this.ready) {
        const features = source.getFeatures();

        if (features.length >= 2) {
          const extent = vector.getSource().getExtent();

          this.map.getView().fit(extent, {padding: [100, 100, 100, 100], constrainResolution: false});




          let start = null;
          let end = null;
          let checkpoints = [];
          let coordinates = [];




          features.forEach(feature => {
            if (feature.values_.type === "checkpoint") {
              checkpoints.push(feature.getGeometry().getCoordinates())
            } else if (feature.values_.type === "mining") {
              start = feature.getGeometry().getCoordinates();
            } else if (feature.values_.type === "steam") {
              end = feature.getGeometry().getCoordinates();
            }

          });

          if ((this.itemValue === null && checkpoints.length >= 1 && start !== null && end !== null) || (checkpoints.length + 2) > this.getExistingPointCount()) {

            this.clear();
            coordinates = [start, ...checkpoints, end]
            let lineString = new LineString(coordinates);

            const feature = new Feature({
              geometry: lineString
            });

            this.vectorSource.addFeature(feature);


            this.modify = new Modify({source: this.vectorSource});
            this.modify.on('modifyend', this.onDrawEnd);
            this.map.addInteraction(this.modify);
            const geometry = feature.getGeometry().clone();

            const wktFormat = new WKT();
            geometry.transform('EPSG:3857', 'EPSG:4326');

            this.model.form[this.model.component] = wktFormat.writeGeometry(geometry);
          }


        } else if (features.length == 1) {
          const center = features[0].getGeometry().getCoordinates();
          this.map.getView().setCenter(center);
        }
      }
    },
    getCheckpoints() {
      this.loading = true;
      axios.post("/gis/api/checkpoints", this.checkpointIDS).then(({data}) => {
        this.checkpoints = data;
        const wktFormat = new WKT();

        this.removeByType("checkpoint")


        this.checkpoints.forEach(checkpoint => {


          const geometry = wktFormat.readGeometry(decodeHexewkbToWkt(checkpoint.geom));

          const feature = new Feature({
            geometry: geometry.transform('EPSG:4326', 'EPSG:3857'),
            type: "checkpoint"
          });

          source.addFeature(feature);
        })


        this.extentToSource();


        this.loading = false;
      })

    },
    getMining() {
      axios.get("/gis/api/coal-mining/" + this.mine_id).then(({data}) => {

        this.removeByType("mining")
        const wktFormat = new WKT();
        const geometry = wktFormat.readGeometry(decodeHexewkbToWkt(data.geom));

        const feature = new Feature({
          geometry: geometry.transform('EPSG:4326', 'EPSG:3857'),
          type: "mining"
        });

        source.addFeature(feature);

        this.extentToSource();
        this.loading = false;
      })
    },
    getSteam() {
      axios.get("/gis/api/steam-manfactoring/" + this.stove_id).then(({data}) => {

        this.removeByType("steam")

        const wktFormat = new WKT();
        const geometry = wktFormat.readGeometry(decodeHexewkbToWkt(data.geom));

        const feature = new Feature({
          geometry: geometry.transform('EPSG:4326', 'EPSG:3857'),
          type: "steam"
        });

        source.addFeature(feature);
        this.extentToSource();
        this.loading = false;
      })
    },
  },
  watch: {
    checkpointIDS: {
      handler(value) {

        if (value && value.length && this.ready) {

          this.getCheckpoints();
        } else {
          this.checkpoints = [];
        }

      },
      deep: true
    },
    ready(value) {
      if (value && this.map) {
        this.map.addLayer(vector);
      }
    },
    mine_id(value) {
      if (value && this.ready) {

        this.getMining();
      }
    },
    stove_id(value) {
      if (value && this.ready) {
        this.getSteam();
      }
    },
    do_render(value) {
      if (!value) {
        source.clear();

      }
    }

  },
  mounted() {

  }

}
</script>
<style lang="scss">
.map-info {
  .ant-spin-dot {
    visibility: hidden;
  }
}
</style>
