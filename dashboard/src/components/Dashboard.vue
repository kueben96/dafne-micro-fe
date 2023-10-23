<template>
  <div class="dashboard-container">
    <Button @click="submitRequest" label="Start Generation" />
    <div class="input-container">
      <InputText id="city" v-model="neighborhoodRequestBody.city" placeholder="City" aria-describedby="city-help" />
      <InputText id="lat" v-model="neighborhoodRequestBody.lat" placeholder="Latitude" aria-describedby="lat-help"
        type="number" />
      <InputText id="lon" v-model="neighborhoodRequestBody.lon" placeholder="Longitude" aria-describedby="lon-help"
        type="number" />
    </div>
  </div>
</template>


<script>
import '../assets/customtheme.css';
import 'primevue/resources/primevue.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { ref, defineProps, defineEmits, emit } from 'vue';

export default {

  components: {
    Button,
    InputText
  },

  setup(_, { emit }) {
    const neighborhoodRequestBody = ref({
      city: 'hannover',
      lat: 52,
      lon: 10
    });

    const submitRequest = async () => {
      try {
        const response = await makeApiPostRequest(neighborhoodRequestBody.value);
        console.log('response', response.job_id);
        emit('jobCreated', {
          jobId: response.job_id,
          status: response.status
        });

      }
      catch (error) {
        console.log('api request', error);
      }
    }

    const makeApiPostRequest = async (requestBody) => {
      try {
        const response = await fetch('http://localhost:8086/api/neighborhood', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });



        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        return await response.json();

      } catch (error) {
        console.log('api request', error);
      }

    }

    return {
      neighborhoodRequestBody,
      submitRequest
    }
  }

}

</script>


<style scoped>
.dashboard-container {
  padding: 16px;
  /* Add 16px padding to the entire content */
}

.input-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

/* Adjust the width as needed */
.input-container .p-inputtext {
  width: 48%;
  /* Each input field takes up 48% of the container width */
  margin-right: 2%;
  /* Add a small gap between the input fields */
}
</style>
