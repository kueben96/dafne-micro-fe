<template>
    <div>
        <div id='maplibre' style=' height: 600px'></div>

    </div>
</template>

<script setup>
import { onMounted } from "vue";
import maplibre from 'maplibre-gl'
import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'
import { useHead } from '@vueuse/head'

useHead({
    script: {
        src: 'https://unpkg.com/maplibre-gl@3.5.2/dist/maplibre-gl.js',
        type: 'text/javascript',
    },
    link: {
        rel: 'stylesheet',
        // href: 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.css',
        href: 'https://unpkg.com/maplibre-gl@3.5.2/dist/maplibre-gl.css',
    },
})

onMounted(() => {

    const searchControl = new MapLibreSearchControl();
    const map = new maplibre.Map({
        container: 'maplibre',
        style: "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL", // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 2, // starting zoom
    })
    map.addControl(searchControl, 'top-left');
})

</script>

<style lang="scss" scoped></style>