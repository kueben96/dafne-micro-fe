<template>
    <div>
        <div id='maplibre' style=' height: 600px'></div>
        <div>
            <h2>Selected GeoJSON:</h2>
            <textarea v-model="selectedAreaGeoJSONText" rows="30" cols="50" readonly></textarea>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import maplibre from 'maplibre-gl'
import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useHead } from '@vueuse/head'


useHead({
    script: {
        src: 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.js',
        type: 'text/javascript',
    },
    script: {
        src: "https://unpkg.com/terra-draw@0.0.1-alpha.47/dist/terra-draw.umd.js",
        type: 'text/javascript',
    },
    link: {
        rel: 'stylesheet',
        href: 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.css',
    },
})
const selectedAreaGeoJSON = ref(null);
const selectedAreaGeoJSONText = ref("");
onMounted(() => {

    const searchControl = new MapLibreSearchControl();
    const map = new maplibre.Map({
        container: 'maplibre',
        style: "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL", // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 2, // starting zoom
    })
    const draw = new MapboxDraw({
        displayControlsDefault: false,
        boxSelect: false,
        controls: {
            polygon: true,
            trash: true
        }
    });
    map.addControl(draw, 'bottom-left');
    map.addControl(new maplibre.NavigationControl());

    const mapboxCtrlGroup = document.querySelector('.mapboxgl-ctrl-group');
    mapboxCtrlGroup.classList.add('maplibregl-ctrl', 'maplibregl-ctrl-group');

    map.addControl(searchControl, 'top-left');

    map.on("draw.create", updateArea);
    map.on("draw.delete", updateArea);
    map.on("draw.update", updateArea);

    function updateArea(e) {
        const data = draw.getAll();


        selectedAreaGeoJSON.value = data;
        selectedAreaGeoJSONText.value = JSON.stringify(data, null, 2); // Format GeoJSON for display
        console.log(selectedAreaGeoJSON.value)
    }

})

</script>

<style lang="scss" >
input {
    width: 500px;
    padding: 12px 8px;
    margin: 8px 0;
}


input:focus {
    outline: none !important;
    border: var(--primary-main) 1px solid;
    box-shadow: 0 0 10px #719ECE;

}
</style>