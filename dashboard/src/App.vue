<template>
    <div>
      <Dashboard />
      <div id="app">
        <div class="cell cell-map">
          <!-- <MapContainerVue :geoJson="geoJson"></MapContainerVue>
           -->
           <Map :msg="Moin"></Map>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Dashboard from './components/Dashboard.vue';
  import './assets/customtheme.css'
  import MapContainerVue from './components/MapContainer.vue';
  import Map from './components/Map.vue';
  import Edit from './components/Edit';
  import { ref, onMounted } from 'vue';
 
  
  async function fetchPalette() {
    const palette = await import('theme/palette');
    return palette.default;
  }
  
  export default {
    components: {
      Dashboard,
      MapContainerVue,
      Map,
      Edit,
    },
  
    setup() {
      const geoJson = ref({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-27.0703125, 43.58039085560784],
              [-28.125, 23.563987128451217],
              [-10.8984375, 32.84267363195431],
              [-27.0703125, 43.58039085560784]
            ]
          ]
        }
      });
  
      console.log('geojson', geoJson.value);
  
      const palette = ref(null);
  
      onMounted(async () => {
        const data = await fetchPalette();
        document.documentElement.style.setProperty('--primary-color', data.primary.main);
        document.documentElement.style.setProperty('--secondary-color', data.secondary.main);
        document.documentElement.style.setProperty('--body-color', data.common.white);
        palette.value = { ...data };
      });
  
      return {
        palette,
        geoJson
      };
    }
  };
  </script>
  
  <style src="./assets/global-styles.scss" lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    height: 100%;
    display: grid;
    grid-template-columns: 100vh;
    grid-auto-rows: 1fr;
    grid-gap: 1rem;
    padding: 1rem;
    box-sizing: border-box;
  }
  
  .cell {
    border-radius: 4px;
    background-color: lightgrey;
  }
  
  .cell-map {
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: 3;
  }
  
  .cell-edit {
    grid-column: 2;
    grid-row: 1;
  }
  
  .cell-inspect {
    grid-column: 2;
    grid-row: 2;
  }
  </style>
  