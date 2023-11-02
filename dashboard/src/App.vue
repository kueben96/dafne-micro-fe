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
import { useHead } from '@vueuse/head'


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
    useHead({
      script: [
        {
          src: 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.js',
          type: 'text/javascript',
        },
        {
          src: "https://unpkg.com/terra-draw@0.0.1-alpha.47/dist/terra-draw.umd.js",
          type: 'text/javascript',
        },
        {
          src: "https://api.tiles.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js",
          type: 'text/javascript',
        },
        {
          src: "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.0/mapbox-gl-draw.js",
          type: 'text/javascript',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.0/mapbox-gl-draw.css',
          type: 'text/css',
        },
      ],
    });

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

<style lang="scss" >
@import "assets/global-styles.scss";


body {
  height: 100vh;
}

#_dashboard-dev-root {
  height: 100%;
}
</style>

  