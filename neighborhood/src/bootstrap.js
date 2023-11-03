import { createApp } from 'vue'
import App from './App.vue';
import { createHead } from '@vueuse/head'
import PrimeVue from 'primevue/config';


// dashboard has no navigation inside
const mount = (el) => {
    const app = createApp(App);
    const head = createHead()
    app.use(head).use(PrimeVue);
    app.mount(el);
    // Enable Vue Devtools
    app.config.devtools = true;


}
// if in dev or isolation -> call mount immediately 

if (process.env.NODE_ENV == 'development') {
    const devRoot = document.querySelector('#_dashboard-dev-root');

    if (devRoot) {
        mount(devRoot);
    }
}

// else: export the mount function if running through container

export { mount };