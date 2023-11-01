<template>
  <div style="height: 100%;">
    <Dashboard />
    <MapLibre />
  </div>
</template>
  
<script>
import Dashboard from './components/Dashboard.vue';
import MapLibre from './components/MapLibre.vue';
import { ref, onMounted } from 'vue';


async function fetchPalette() {
  const palette = await import('theme/palette');
  return palette.default;
}

async function createPaletteVariables() {
  const paletteData = await fetchPalette();
  for (const category in paletteData) {
    if (paletteData.hasOwnProperty(category)) {
      const categoryData = paletteData[category];
      for (const color in categoryData) {
        if (categoryData.hasOwnProperty(color)) {
          const variableName = `--${category}-${color}`;
          const colorValue = categoryData[color];

          document.documentElement.style.setProperty(variableName, colorValue);
        }
      }
    }
  }
}


export default {
  components: {
    Dashboard,
    Map,
    MapLibre
  },

  setup() {
    const palette = ref(null);

    onMounted(async () => {
      const data = await fetchPalette();
      createPaletteVariables();
    });

    return {
      palette
    };
  }
};
</script>

<style lang="css" >
body {
  height: 100vh;
}

#_dashboard-dev-root {
  height: 100%;
}
</style>

  