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
  import MapContainerVue from './components/MapContainer.vue';
  import Map from './components/Map.vue';
  import Edit from './components/Edit';
  import { ref, onMounted } from 'vue';
 
  
  async function fetchPalette() {
    const palette = await import('theme/palette');
    return palette.default;
  }

  async function createPaletteVariables() {
  const paletteData = await fetchPalette();

  for (const category in paletteData) {
    console.log('category', category);  
    if (paletteData.hasOwnProperty(category)) {
      const categoryData = paletteData[category];
      for (const color in categoryData) {
        if (categoryData.hasOwnProperty(color)) {
          const variableName = `--${category}-${color}`;
          const colorValue = categoryData[color];
          console.log('variableName', variableName);
          document.documentElement.style.setProperty(variableName, colorValue);
        }
      }
    }
  }
}

  
  export default {
    components: {
      Dashboard,
      MapContainerVue,
      Map,
      Edit,
    },
  
    setup() {
  

      const palette = ref(null);
  
      onMounted(async () => {
        const data = await fetchPalette();
        createPaletteVariables();
        // console.log('data', data);
        // document.documentElement.style.setProperty('--primary-color', data.primary.main);
        // document.documentElement.style.setProperty('--secondary-color', data.secondary.main);
        // document.documentElement.style.setProperty('--body-color', data.common.white);
        // palette.value = { ...data };
      });
  
      return {
        palette
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
  