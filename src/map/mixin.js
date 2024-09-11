import {AppstoreOutlined, CalendarOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons-vue";
import axios from "~/plugins/core/axios";
import {fromLonLat, transform} from "ol/proj";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import MVT from "ol/format/MVT";
import Overlay from "ol/Overlay";
import Map from "ol/Map";
import View from "ol/View";
import {bases, convertToRGBA, template} from "./utils"
import {Feature} from "ol";
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Fill from 'ol/style/Fill';

import 'ol/ol.css';
import './map.scss';
import Draw from 'ol/interaction/Draw';
import {Vector as VectorSource} from 'ol/source';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {WKT} from 'ol/format';
import Modify from "ol/interaction/Modify";
/**
 ** TOOLS
 **/
import basemapToggle from "./components/basemapToggle.vue";
import basemapGallery from "./components/basemapGallery.vue";
import AreaSearch from "./components/AreaSearch.vue";
import Locate, {initLocate, locationLayer} from "./components/tools/locate.vue";
import CoordinateBar, {initCoordinate} from "./components/tools/coordinateBar.vue";
import Measure, {initMeasure, measureLayer, startMeasure} from "./components/tools/measure.vue";
import Scalebar, {initScaleBar} from "./components/tools/scalebar.vue";
import Starter from "./components/starter.vue";
import "./map.scss"
import 'ol/ol.css';
import {decodeHexewkbToWkt, to3D} from "~/dataform_custom/GIS/utils";
import {createXYZ} from "ol/tilegrid";
import {applyStyle} from "ol-mapbox-style";


const source = new VectorSource({wrapX: false});
const markerStyle = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    src: '/map/marker.svg',
    scale: 1,
  })
});
const lineStyle = new Style({
  stroke: new Stroke({
    color: 'blue',
    width: 3
  })
});

const highlightStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(10,226,246,0.8)',
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(8,227,248,0.7)',
  }),
})
const lineHighlightStyle = new Style({
  stroke: new Stroke({
    color: 'rgba(10,226,246,0.8)',
    width: 3,
  }),
})
// Selection
const highlightSource = new VectorSource();
const selectionLayer = new VectorLayer({

  source: highlightSource,

  style: function (feature) {
    let geometry = feature.getGeometry();

    if (geometry.getType() === 'LineString') {
      return lineHighlightStyle;
    } else {
      return highlightStyle;
    }
  },
});
window.selectionLayerID = null
window.selectionFeatureID = null
window.selectedLayer = null

const vector = new VectorLayer({
  source: source,
  style: (feature) => {
    const geometryType = feature.getGeometry().getType();
    switch (geometryType) {
      case 'Point':
        return markerStyle;
      case 'LineString':
        return lineStyle;
      case 'MultiLineString':
        return lineStyle;
      // case 'Polygon':
      //     return polygonStyle;
      // case 'MultiPolygon':
      //     return polygonStyle;
      default:
        return null;  // or return some other default style
    }
  }
});

/**
 * Create an overlay to anchor the popup to the map.
 */
const overlay = new Overlay({

  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

const transformToWGS84 = coord => transform(coord, 'EPSG:3857', 'EPSG:4326');


const vectorTileLayerSource = new VectorTileSource({
  format: new MVT(),
  url: 'https://imap.mn/06826032-4372-11ec-81d3-0242ac130003/{z}/{x}/{y}.pbf',
  tileGrid: createXYZ({maxZoom: 19}),
  tilePixelRatio: 16
});


export default {
  name: "index",
  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    basemapToggle,
    basemapGallery,
    Locate,
    CoordinateBar,
    Measure,
    Scalebar,
    Starter,
    AreaSearch,

  },

  data() {
    let baseKey = "iMap"
    const savedBaseMapKey = localStorage.getItem('selectedBaseMapKey');
    if (savedBaseMapKey) {
      baseKey = savedBaseMapKey
    }
    return {
      mapID: "d24da578-a7c4-4d1e-8125-d2b0cd8f5ff7",
      categories: [],
      map: null,
      pointLayer: null,
      layerVisible: true,
      openKeys: ['0', '0-0', '1', '1-0'],
      selectedKeys: [],
      searchValue: "",
      checkMapInterval: null,
      zoom: 13,
      bases: bases,
      baseKey,
      base: new TileLayer({
        source: bases[baseKey],
      }),
      iMapBase: new VectorTileLayer({
        source: vectorTileLayerSource,
        style: 'https://imap.mn/06826032-4372-11ec-81d3-0242ac130003/style.json'
      }),
      isGalleryVisible: false,
      ready: false,

      registerForm: false,
      draw: null,
      modify: null,

      is3D: false,
      selectedType: 'Point',
      vectorSource: source,
      started: false,
      clickedCoordinate: {}

    };
  },
  methods: {
    setBaseLayer(key) {
      localStorage.setItem('selectedBaseMapKey', key);
      this.baseKey = key;
      this.base.setSource(bases[key]);
      if (this.baseKey === 'iMap') {
        this.base.setVisible(false);
        this.iMapBase.setVisible(true);
      } else {
        this.base.setVisible(true);
        this.iMapBase.setVisible(true);
      }


    },
    toggleGalleryVisibility() {
      this.isGalleryVisible = !this.isGalleryVisible;
    },
    onSearch() {

    },
    changeLayerVisible(catIndex, layerID) {


      let layerIndex = this.categories[catIndex].layers.findIndex(l => l.id === layerID);

      if (layerIndex >= 0) {

        this.categories[catIndex].layers[layerIndex].is_visible = !this.categories[catIndex].layers[layerIndex].is_visible;
        this.categories[catIndex].layers[layerIndex].layer.setVisible(this.categories[catIndex].layers[layerIndex].is_visible);
      }
    },
    changeLayerUniqueVisible(catIndex, layer, uniqueValueInfo) {
      let layerIndex = this.categories[catIndex].layers.findIndex(l => l.url === layer.url);
      if (layerIndex >= 0) {
        let uniqueIndex = this.categories[catIndex].layers[layerIndex].legends.findIndex(u => u.unique_value === uniqueValueInfo.unique_value)
        if (uniqueIndex >= 0) {

          this.categories[catIndex].layers[layerIndex].legends[uniqueIndex].unique_visible = !this.categories[catIndex].layers[layerIndex].legends[uniqueIndex].unique_visible;
          this.categories[catIndex].layers[layerIndex].layer.changed();
        }
      }
    },
    showInfo(event, content) {

      let index = 0;

        this.map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
          if (index === 0 && layer) {


            if (layer.values_.id !== "highlight" && layer.values_.id !== "measure" && layer.values_.id !== "LocateLayer" && feature.getType && layer.values_.layerID) {
              this.clearSelection()
              const properties = feature.getProperties();
              const coordinate = event.coordinate;

              if (layer.values_.popup) {
                content.innerHTML = `<p>${layer.get("layerTitle")}</p><p>${template(layer.values_.popup.template, properties)}</p>`;
              } else {
                content.innerHTML = `<p>${layer.get("layerTitle")}</p><p>Нэр: ${properties.name ? properties.name : properties.id}</p>`;
              }


              overlay.setPosition(coordinate);

              const featureType = feature.getType();

              if (featureType === "Polygon" || featureType === "LineString") {


                window.selectedLayer = layer;
                window.selectionLayerID = layer.values_.layerID;
                window.selectionFeatureID = feature.getId();

                // features.get
                //
                // const originalGeometry = feature.getGeometry();
                // const newHighlightFeature = new Feature({
                //   geometry: new (originalGeometry.constructor)(originalGeometry.getCoordinates())
                // });
                // highlightSource.addFeature(features[0]);



                // highlightSource.addFeature(feature);
                // layer.changed();

              } else {
                //    this.clearSelection()
              }
            } else if (layer.values_.id === "LocateLayer") {
              const coordinate = event.coordinate;
              var ll = transform(coordinate, 'EPSG:3857', 'EPSG:4326');
              // Update the container with the new coordinates, rounded to a reasonable number of decimal places
              let locationTxt = 'DD ' + ll[1].toFixed(5) + ',  ' + ll[0].toFixed(5);
              content.innerHTML = `<p>Таны байршил</p><code>${locationTxt}</code>`;
              overlay.setPosition(coordinate);


            } else {
              this.clearSelection();
            }
          }
          index++;
        })





    },
    clearSelection() {

      window.selectionLayerID = null;
      window.selectionFeatureID = null;

      if(window.selectedLayer){
        window.selectedLayer.changed();

        window.selectedLayer = null;
      }

      overlay.setPosition(undefined);
    },
    renderLayers() {
      this.categories.forEach((cat, catIndex) => {
        cat.layers.forEach((layer, layerIndex) => {
          if (layer.geometry_type === "Point" || layer.geometry_type === "Polygon" || layer.geometry_type === "LineString") {
            if (layer.legends && layer.legends.length > 0) {

              let fill_color = null
              if (layer.geometry_type === "Polygon") {
                fill_color = convertToRGBA(layer.legends[0].fill_color, 0.5)
              }


              this.categories[catIndex].layers[layerIndex].layer = new VectorTileLayer({
                declutter: true,

                source: new VectorTileSource({
                  format: new MVT(),
                  url: `https://ub-engineering.gov.mn/maps/mapserver/${layer.id}/{z}/{x}/{y}.pbf`
                }),
                style: (feature, resolution) => {
                  let geometry = feature.getGeometry();


                  if (geometry.getType() === 'Point') {
                    let iconSrc = layer.legends[0].marker;

                    if (layer.unique_value_field && layer.legends.length > 1) {

                      let value = feature.get(layer.unique_value_field);
                      if (value) {
                        let index = layer.legends.findIndex(u => u.unique_value.toString() === value.toString());

                        if (index >= 0) {
                          if (this.categories[catIndex].layers[layerIndex].legends[index].unique_visible) {
                            if (index >= 0) {
                              iconSrc = layer.legends[index].marker;
                            }
                            // if (feature.get('tp_number') % 2 === 0) {
                            //   iconSrc = '/ub-enginering/images/zurchil.svg';
                            // }
                          } else {
                            return null;
                          }
                        }
                      }

                    }
                    return new Style({
                      image: new Icon({
                        src: `https://ub-engineering.gov.mn${iconSrc}`,
                        scale: 25 / Math.max(25, 25),
                        anchor: [0.5, 1],
                        anchorXUnits: 'fraction', // 'fraction' or 'pixels'
                        anchorYUnits: 'fraction' // 'fraction' or 'pixels'
                      })
                    });
                  } else if (geometry.getType() === 'Polygon') {
                    if(window.selectionLayerID === layer.id && window.selectionFeatureID === feature.getId()) {

                      return highlightStyle
                    } else {
                      return new Style({
                        fill: new Fill({
                          color: fill_color
                        }),
                        stroke: new Stroke({
                          color: layer.legends[0].stroke_color,  // The color of the stroke. Can be in RGB, RGBA, hex format etc.
                          width: 1  // The width of the stroke.
                        }),
                        text: layer.label && layer.label.color ? new Text({
                          font: layer.label.font,
                          fill: new Fill({
                            color: layer.label.color // Text color
                          }),
                          text: feature.get(layer.label.field)  // Assuming the attribute containing the label is 'name'
                        }) : undefined
                      });
                    }

                  } else if (geometry.getType() === 'LineString') {
                    if(window.selectionLayerID === layer.id && window.selectionFeatureID === feature.getId()) {

                      return lineHighlightStyle
                    } else {
                      return new Style({

                        stroke: new Stroke({
                          color: layer.legends[0].fill_color,  // The color of the stroke. Can be in RGB, RGBA, hex format etc.
                          width: 2  // The width of the stroke.
                        })
                      });
                    }
                  }
                }
              });
              this.categories[catIndex].layers[layerIndex].layer.set('layerID', layer.id);
              this.categories[catIndex].layers[layerIndex].layer.set('popup', {
                template: layer.popup_template
              });
              this.categories[catIndex].layers[layerIndex].layer.set('layerTitle', layer.layer_title);
              this.categories[catIndex].layers[layerIndex].layer.setVisible(layer.is_visible);

              this.map.addLayer(this.categories[catIndex].layers[layerIndex].layer);
            }
          }
        })
      })

    },
    mapInit() {
      /**
       * Elements that make up the popup.
       */
      const container = document.getElementById('popup');
      const content = document.getElementById('popup-content');
      const closer = document.getElementById('popup-closer');


     overlay.setElement(container)
      /**
       * Add a click handler to hide the popup.
       * @return {boolean} Don't follow the href.
       */
      closer.onclick = () => {
        overlay.setPosition(undefined);
        closer.blur();
        this.clearSelection();
        return false;
      };


      this.map = new Map({
        target: document.getElementById("map"),
        layers: [],
        view: new View({
          center: fromLonLat([106.91736415028574, 47.91876971846709]),
          zoom: this.zoom,
          maxZoom: 19,
        }),
        overlays: [overlay],
      });

      applyStyle(this.iMapBase, 'https://imap.mn/06826032-4372-11ec-81d3-0242ac130003/style.json').then(() => {

        if (this.baseKey === "iMap") {
          this.base.setVisible(false);
          this.iMapBase.setVisible(true)
        } else {
          this.iMapBase.setVisible(false);
          this.base.setVisible(true);
        }
        this.map.addLayer(this.iMapBase);
        this.map.addLayer(this.base);
        this.map.addLayer(vector);

        this.renderLayers();



        this.map.addLayer(locationLayer);
        initMeasure(this.map);
        initScaleBar(this.map);
        initCoordinate(this.map);
        this.map.addLayer(measureLayer);
        initLocate(this.map, overlay, content);
        this.map.addLayer(selectionLayer)
        this.ready = true;
      })
      this.map.once('rendercomplete', () => {

        this.map.on('singleclick', (e) => this.showInfo(e, content));



      });
      /**
       ** TOOLS
       **/

    },
    checkMapExists() {
      const mapElement = document.getElementById("map");
      if (mapElement) {
        clearInterval(this.checkMapInterval);
        this.mapInit()
      }
    },
    startMeasure(type) {
      startMeasure(this.map, type);
    },

    start() {
      this.addInteraction(this.selectedType);
    },


    addInteraction(typeValue) {
      if (this.draw) {
        this.map.removeInteraction(this.draw);
        this.map.removeInteraction(this.modify);
      }
      if (typeValue !== 'None') {
        this.draw = new Draw({
          source: this.vectorSource,
          type: typeValue === 'MultiLine' ? 'MultiLineString' : typeValue
        });
        this.draw.on('drawstart', this.clear);  // Add this line
        this.draw.on('drawend', this.onDrawEndLocation);
        this.map.addInteraction(this.draw);
        this.started = true;

        this.modify = new Modify({source: this.vectorSource});
        this.modify.on('modifyend', this.onDrawEndLocation);
        this.map.addInteraction(this.modify);

        // this.map.on('click', this.handleMapClick);
      }
    },

    clear() {
      this.vectorSource.clear();
    },

    onDrawEndLocation(eventDraw) {
      let feature = null;
      if (eventDraw.features) {
        feature = eventDraw.features.getArray()[0]
      } else {
        feature = eventDraw.feature
      }
      const geometryDraw = feature.getGeometry().clone();

      const wktFormat = new WKT();
      if (geometryDraw.getType() === "Point") {
        let transformedGeometry;
        transformedGeometry = new Point(to3D(transformToWGS84(geometryDraw.getCoordinates()), this.is3D));
        // this.model.form[this.model.component] = wktFormat.writeGeometry(transformedGeometry);
      } else {
        geometryDraw.transform('EPSG:3857', 'EPSG:4326');
        // this.model.form[this.model.component] = wktFormat.writeGeometry(geometryDraw);
      }

      this.started = false;
      this.map.removeInteraction(this.draw);
      this.handleMapClick(wktFormat.writeGeometry(geometryDraw))
    },


    setElementForm() {
      if (this.editMode) {
        const wktFormat = new WKT();

        const geometryXY = wktFormat.readGeometry(decodeHexewkbToWkt(this.itemValue));
        const feature = new Feature({
          geometry: geometryXY.transform('EPSG:4326', 'EPSG:3857')
        });

        this.vectorSource.addFeature(feature);

        this.modify = new Modify({source: this.vectorSource});
        this.modify.on('modifyend', this.onDrawEndLocation);
        this.map.addInteraction(this.modify);

        if (geometryXY.getType() === 'Point') {
          const center = geometryXY.getCoordinates();
          this.map.getView().setCenter(center);
        } else {
          const extent = this.vectorSource.getExtent();
          this.map.getView().fit(extent, {
            size: this.map.getSize(),
            padding: [21, 21, 21, 21]
          });
        }
      }

    },

    handleMapClick(event) {
      console.log('------------');
      console.log(event.coordinate);
      this.clickedCoordinate = event.coordinate;
      this.registerForm = true;
    },
    fetchMapLayers() {

      axios.get(`/mapserver/api/map/${this.mapID}`)
        .then(response => {
          this.categories = response.data.categories;
          this.mapInit();
        })
        .catch(error => {
          this.error = error.response ? error.response.data.message : 'An unknown error occurred';
        });
    }
  },
  mounted() {
    //  this.checkMapInterval = setInterval(this.checkMapExists, 100);
    this.fetchMapLayers();

    // this.map.on('click', this.handleMapClick);
  },
  watch: {
    selectedType(newValue) {
      this.addInteraction(newValue);
    },


    itemValue(value, oldValue) {
      if (value && !oldValue) {
        this.setElementForm();
      }
    },
  }
}

