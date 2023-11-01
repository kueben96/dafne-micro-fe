<template>
    <div>
        <div id='maplibre' style=' height: 700px ;'></div>

    </div>
</template>

<script setup>
import { onMounted } from "vue";
import maplibre from 'maplibre-gl'
import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'

onMounted(() => {
    const searchControl = new MapLibreSearchControl();
    const map = new maplibre.Map({
        container: 'maplibre',
        style: "https://tiles.stadiamaps.com/styles/alidade_smooth.json", // style URL
        center: [0, 0], // starting position [lng, lat]
        zoom: 1 // starting zoom
    })
    map.addControl(searchControl, "top-right");
})

</script>

<style lang="scss" scoped></style>