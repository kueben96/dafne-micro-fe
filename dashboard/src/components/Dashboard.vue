<template>
  <div>
    <h1>Dashboard</h1>
    <Button label="Click" />
    <div class="flex flex-column gap-2">
    <label for="username">Username</label>
    <InputText id="username" v-model="value" aria-describedby="username-help" />
    <small id="username-help">Enter your username to reset your password.</small>
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
    InputText
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


