<template>
    <div ref="mapRoot" class="map-container"></div>
  </template>
  
  <script>
  import 'ol/ol.css'; // Import OpenLayers stylesheet
  import Map from 'ol/Map';
  import View from 'ol/View';
  import TileLayer from 'ol/layer/Tile';
  import OSM from 'ol/source/OSM';
  
  export default {
    name: 'MapContainer',
    mounted() {
      new Map({
        target: this.$refs.mapRoot,
        layers: [
          new TileLayer({
            source: new OSM() // Use OpenStreetMap as a background layer
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 2
        })
      });
    }
  };
  </script>
  <style>
  .map-container {
    height: 400px; /* Set your desired height here */
  }
</style>