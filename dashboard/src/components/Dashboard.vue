<template>
  <div>
    <h1 :style="{ color: 'var(--primary-color)' }">Dashboard</h1>
    <Button  label="Click" />
  </div>

</template>

<script>
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import Button from 'primevue/button';
import {ref, watch, computed,onBeforeMount, inject} from 'vue';  



export default {
  props: {
    emoji: {
      type: String,
      default: '💩',
    },
  },
  components: {
    Button,
  },

  setup(props) {

    const counter = ref(0)
    const increment = () => {
      counter.value++
    }

    watch(counter, current => {
      if(current ===5) console.log("counter is 5")
    })

    const arrayOfEmojis = computed(() => 
      Array.from(new Array(counter.value), ()=> props.emoji).join(' ')
    );    
    return {
   counter, increment, arrayOfEmojis
    };
  },

  data() {
    return {
      tasksCheckbox: [],
      dropdownCity: null,
      events: null,
    };
  },

};

</script>


