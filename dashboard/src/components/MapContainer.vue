<template>
    <div>
        <p>Map Container</p>
        <div ref="map"
            style="width: 100%; height: 100%">
        </div>
    </div>
</template>

<script>

    import View from 'ol/View';
    import Map from 'ol/Map'
    import TileLayer from 'ol/layer/Tile'
    import OSM from 'ol/source/OSM'
    import 'ol/ol.css';
    import {ref, onMounted, reactive, provide} from 'vue';
   
export default {
    name: 'MapContainer',
    components: {},
    setup(){
        const map = ref(null)
        onMounted( () =>{
            new Map({
                target: map.value,
                layers: [
                  new TileLayer({
                    source: new OSM()
                  })
                ],
                view: new View({
                  center: [0, 0],
                  zoom: 0
                })
              });
        })
    }
}
</script>