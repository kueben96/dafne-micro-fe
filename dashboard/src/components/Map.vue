<template>
    <div :id="mapParams.getId()">
    </div>
  </template>
  
  <script>
  import 'ol/ol.css';
  import MapParams from '../types/MapParams';
  import MapTools from '../tools/MapTools';
  
  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    data() {
      return {
        mapParams: new MapParams(10, [1.21, 48.12], 60, 'map','http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'),
        mapTools : new MapTools(),
      }
    },
    created() {},
    mounted() {
      this.map = this.mapTools.initMap(this.mapParams);
    },
  }
  </script>
  
  <style scoped>
  #map {
    height: 100vh;
    width: 100%;
  }
  </style>
  