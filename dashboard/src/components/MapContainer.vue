<template>
    <div ref="mapRoot" class="map-container"></div>
  </template>
  
  <script>
  import 'ol/ol.css';
  import Map from 'ol/Map';
  import View from 'ol/View';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';
  import Search from 'ol-ext/control/SearchNominatim';
  import VectorLayer from 'ol/layer/Vector';
  import VectorSource from 'ol/source/Vector';
  import GeoJSON from 'ol/format/GeoJSON';
  import { onMounted, ref, watchEffect } from 'vue';
  
  export default {
    name: 'MapContainer',
    props: {
      geoJson: Object,
    },
    setup(props, context) {

      console.log('props', props.geoJson);
      
      const mapRoot = ref(null);
      const vectorLayer = new VectorLayer({
        source: new VectorSource(),
      });
  
      const olMap = new Map({
        target: mapRoot.value,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
  
      olMap.addControl(new Search());
  
      const updateSource = (geojson) => {
        const view = olMap.getView();
        const source = vectorLayer.getSource();
  
        const features = new GeoJSON({
          featureProjection: 'EPSG:3857',
        }).readFeatures(geojson);
  
        source.clear();
        source.addFeatures(features);
  
        view.fit(source.getExtent());
      };
  
      watchEffect(() => {
        updateSource(props.geoJson);
      });

     onMounted(
        () => {
        console.log(props.geoJson)
        },
     )
  
      return {
        mapRoot,
      };
    },
  };
  </script>
  
  <style>
  .map-container {
    height: 400px; /* Set your desired height here */
  }
  </style>
  