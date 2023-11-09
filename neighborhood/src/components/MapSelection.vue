<template>
    <div>

        <h3>Instruction</h3>
        <p>This tool provides you a GNN to generate synthetic optimized neighborhood city plans. This tool uses a Graph
            Neural Network to learn which buildings are next to other buildings in a city. This GNN can then use that model
            to try to guess which function a building serves based on the buildings around it. </p>
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
                <div class="maplibregl-ctrl stadiamaps-search-box">
                    <InputText v-model="selectedCity" class="m-2 input-container" placeholder="Selected City" disabled />
                </div>

                <RadioButton v-model="selectionMode" value="polygon" name="selectionMode" />
                <label for="city" class="m-2">Polygon selection</label>
                <Button size="small" style="color: var(--primary-dark);" @click="toggleGeoJSONVisibility" outlined>
                    <span>
                        <i class="pi pi-external-link mr-1"></i>
                        Show GeoJSON
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
import { useEventDispatcher } from '../useEventDispatcher'

const selectedAreaGeoJSON = ref(null);
const selectedAreaGeoJSONText = ref(null);
const selectionMode = ref("city"); // Initialize with "Select City" mode
const selectedCity = ref(null);
const showGeoJSON = ref(false);

let draw = null; // Store the draw instance
let drawnPolygonId = null;

const { dispatchEvent } = useEventDispatcher();


function toggleGeoJSONVisibility() {
    showGeoJSON.value = !showGeoJSON.value;
}
onMounted(() => {

    const searchControl = new MapLibreSearchControl(
        {
            onResultSelected: (result) => {
                selectedCity.value = result.properties.label;
                console.log(result.properties)
            },
        }
    );

    const map = new maplibre.Map({
        container: 'maplibre',
        style: "https://api.maptiler.com/maps/streets/style.json?key=2nJoak6XHLcKyvexO0HX", // style URL
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

    map.addControl(searchControl, 'top-left');
    map.addControl(draw, 'top-right');
    map.addControl(new maplibre.NavigationControl());

    // Add maplibre classes to style draw controls
    const mapboxCtrlGroup = document.querySelector('.mapboxgl-ctrl-group');
    mapboxCtrlGroup.classList.add('maplibregl-ctrl', 'maplibregl-ctrl-group');

    function updateArea(e) {
        const data = draw.getAll();
        selectedAreaGeoJSON.value = data;
        selectedAreaGeoJSONText.value = JSON.stringify(data, null, 2);
    }
    // DRAW EVENTS
    map.on("draw.delete", updateArea);
    map.on("draw.update", updateArea);
    map.on("draw.create", (e) => {
        if (drawnPolygonId) {
            draw.delete(drawnPolygonId)
        }
        drawnPolygonId = e.features[0].id;
        updateArea()
    });
}
)

async function submitSelection() {
    let response = null;
    if (selectionMode.value === "city") {
        if (selectedCity.value) {
            // Send the cityName to the API for city selection
            response = await sendCitySelection(selectedCity.value);
        }
        else {
            dispatchEvent('warning', 'Input missing', 'Please select a city or district by searching for it in the search bar of the map');
        }
    } else {
        // Use the drawn polygon for API call
        if (selectedAreaGeoJSON.value && selectedAreaGeoJSON.value.features.length > 0) {
            // Send the selectedAreaGeoJSON to the API for polygon selection
            response = await sendPolygonSelection(selectedAreaGeoJSON.value);
            console.log("respomse", response)
        } else {
            dispatchEvent('warning', 'Input missing', 'Please draw a polygon before submitting. You can find the drawing tool on the top right corner of the map.');
        }
    }
    if (response) {
        dispatchEvent('success', `Job ${response.job_id} created`, 'Your neighborhood is being generated. You will get notified when the generation is completed');
    }

}
async function sendCitySelection(cityName) {
    const payload = {
        type: "city",
        cityName: "Berlin, Deutschland",
    };

    try {
        const response = await fetch('http://localhost:8086/api/neighborhood/with-city', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            dispatchEvent('error', 'Error occured', 'Generation failed: ' + response.statusText)
            return null;
        }
    } catch (error) {
        dispatchEvent('error', 'Error occured', 'Generation failed: ' + error.message)
        return null;
    }
}

async function sendPolygonSelection(polygonGeoJSON) {
    console.log("sendPolygonSelection")
    const polygonMockPattern =
        [
            [9.958279176372912, 53.62466555546399],
            [10.166297117947494, 53.63842201380942],
            [10.167070418845242, 53.574645997285614],
            [10.085873824550191, 53.58153293746449],
            [9.958279176372912, 53.62466555546399]

        ]
    const payload = {
        type: "polygon",
        coordinates: polygonMockPattern,
    };
    try {
        const response = await fetch('http://localhost:8086/api/neighborhood/with-coordinates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            // body: JSON.stringify({ polygonGeoJSON }), // Replace with your payload
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error('Error in sendPolygonSelection:', response);
            window.dispatchEvent(new CustomEvent('neighborhood', {
                detail:
                {
                    header: "Error occured " + response.status,
                    type: "error",
                    message: "Generation failed: " + response.statusText
                }
            }));
            return null;
        }
    } catch (error) {
        console.log("error in polygonselection", error)
        window.dispatchEvent(new CustomEvent('neighborhood', {
            detail:
            {
                header: "Error occured",
                type: "error",
                message: "Generation failed: " + error.message
            }
        }));
        return null;
    }

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

.results-list {
    background-color: white;
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 0 0 4px 4px;
    max-width: 500px;
}

.result {
    display: flex;
    flex-direction: row;

}

.result .result-extra {
    margin-left: 3px;
    color: var(--gray-light);
}

.mapbox-gl-draw_ctrl-draw-btn {
    color: var(--primary-dark);
}
</style>