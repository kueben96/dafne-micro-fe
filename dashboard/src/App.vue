<template>
    <div>
        <Dashboard/>
        <MapContainerVue/>
        <Map msg="Welcome to Your Vue.js App"/>
        
    </div>
  </template>

  <script>
    import Dashboard from './components/Dashboard.vue';
    import Map from './components/Map.vue';
    import MapContainerVue from './components/MapContainer.vue';
    import {ref, onMounted, reactive, provide} from 'vue';

   
  async function fetchPalette() {
    const palette = await import('theme/palette');    
    return palette.default;
  }
  
  export default {
    components: {
    Dashboard,
    Map,
    MapContainerVue
    },  
    setup() {

      const palette = ref(null);

      onMounted(async () => {
        const data = await fetchPalette();
        document.documentElement.style.setProperty(
          '--primary-color',
          data.primary.main
        );
        document.documentElement.style.setProperty(
          '--secondary-color',
          data.secondary.main
        );
        document.documentElement.style.setProperty(
          '--body-color',
          data.common.white
        );
        // Update the reactive palette value
        palette.value = reactive(data);
      });
      return {
        palette
      };
    },
  };
    
  </script>

  <style src="./global-styles.scss" lang="scss">
  
  </style>
  