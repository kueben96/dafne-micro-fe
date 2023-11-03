<template>
    <div>

        <h3>Instruction</h3>
        <p>This tool provides you a GNN to generate synthetic optimized neighborhood city plans. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Officiis totam cumque ullam repellat maxime. </p>
        <ol>
            <li>Select Area Either by City Name/Address or Draw a polygon</li>
            <li>Click Generate</li>
            <li>View result</li>
            <li>Download GeoDataframe</li>
        </ol>

        <div class="p-2 flex justify-content-between ">
            <div class="flex align-items-center" style="width: 100%;">
                <RadioButton v-model="selectionMode" value="city" name="selectionMode" />
                <label for="city" class="m-2">City selection</label>
                <InputText v-model="selectedCity" class="m-2" style="width: 50%;" placeholder="Selected City" />
                <RadioButton v-model="selectionMode" value="polygon" name="selectionMode" />
                <label for="city" class="m-2">Polygon selection</label>
                <Button @click="toggleGeoJSONVisibility" outlined>
                    <span>
                        <i class="pi pi-external-link mr-1"></i>
                        'Show GeoJSON'
                    </span>
                </Button>

            </div>
            <Button @click="submitSelection">Generate</Button>
        </div>
        <div id="maplibre" class="mt-2" style="height: 600px"></div>
        <!-- eslint-disable-next-line vue/no-v-model-argument -->
        <Dialog v-model:visible="showGeoJSON" header="GeoJSON Data" :style="{ width: '50rem' }">
            <pre>{{ selectedAreaGeoJSONText ??
                'Draw a polygon with the draw tool on the top right corner of the map' }}</pre>
        </Dialog>



    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import maplibre from 'maplibre-gl'
import { MapLibreSearchControl } from '@stadiamaps/maplibre-search-box'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import 'primeicons/primeicons.css';

const selectedAreaGeoJSON = ref(null);
const selectedAreaGeoJSONText = ref(null);
const selectionMode = ref("city"); // Initialize with "Select City" mode
const selectedCity = ref(null);
const showGeoJSON = ref(false);

let draw = null; // Store the draw instance
let drawnPolygonId = null;

function toggleGeoJSONVisibility() {
    showGeoJSON.value = !showGeoJSON.value;
}

onMounted(() => {

    const searchControl = new MapLibreSearchControl(
        {
            onResultSelected: (result) => {
                selectedCity.value = result.properties.label;
                console.log(result)
            },
        }
    );
    const map = new maplibre.Map({
        container: 'maplibre',
        style: "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL", // style URL
        center: [9.9937, 53.5511], // Hamburg, Germany
        zoom: 10,
    });
    draw = new MapboxDraw({
        displayControlsDefault: false,
        boxSelect: false,
        controls: {
            polygon: true,
            trash: true
        }
    });
    map.addControl(draw, 'top-right');
    map.addControl(new maplibre.NavigationControl());

    const mapboxCtrlGroup = document.querySelector('.mapboxgl-ctrl-group');
    mapboxCtrlGroup.classList.add('maplibregl-ctrl', 'maplibregl-ctrl-group');

    map.addControl(searchControl, 'top-left');

    function updateArea(e) {
        const data = draw.getAll();
        selectedAreaGeoJSON.value = data;
        selectedAreaGeoJSONText.value = JSON.stringify(data, null, 2); // Format GeoJSON for display
    }

    map.on("draw.delete", updateArea);
    map.on("draw.update", updateArea);
    map.on("draw.create", (e) => {
        // Handle the newly created polygon
        if (drawnPolygonId) {
            draw.delete(drawnPolygonId)
        }
        console.log("e.features")
        console.log(e.features)
        drawnPolygonId = e.features[0].id;
        updateArea()
    });
}

)
function submitSelection() {
    console.log("submitSelection")
    if (selectionMode.value === "city") {
        // Use selected city name for API call
        // const cityName = prompt("Select a city or district:");
        if (selectedCity.value) {
            // Send the cityName to the API for city selection
            sendCitySelection(selectedCity.value);
        }
    } else {
        // Use the drawn polygon for API call
        if (selectedAreaGeoJSON.value && selectedAreaGeoJSON.value.features.length > 0) {
            // Send the selectedAreaGeoJSON to the API for polygon selection
            sendPolygonSelection(selectedAreaGeoJSON.value);
        } else {
            alert("Please draw a polygon before submitting.");
        }
    }
}
function sendCitySelection(cityName) {
    console.log("sendCitySelection")
    console.log(cityName)
    // Implement API call to select city by name
    // Example: fetchDataFromAPI({ city: cityName });
    // console.log("Selected City:", cityName);
}

function sendPolygonSelection(polygonGeoJSON) {
    console.log("sendPolygonSelection")
    console.log(polygonGeoJSON)
    // Implement API call to select by polygon
    // Example: fetchDataFromAPI({ polygon: polygonGeoJSON });
    // console.log("Selected Polygon:", polygonGeoJSON);
}

</script>

<style lang="scss" >
.stadiamaps-search-box input {
    width: 500px;
    padding: 12px 8px;
}

.search-attribution {
    display: none;
}
</style>