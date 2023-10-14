<template>
   <Dashboard/>
  </template>

  <script>
    import Dashboard from './components/Dashboard.vue';
    import {ref, onMounted, reactive} from 'vue';  
  
  
  async function fetchPalette() {
    const palette = await import('theme/palette');
    console.log("fetchPalette function")
    console.log(palette.default)
    
    return palette.default;
  }
  
  export default {
    components: {
    Dashboard
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
  