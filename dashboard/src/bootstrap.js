import { createApp } from 'vue'
import App from './App.vue'


// dashboard has no navigation inside
const mount = (el) => {
    const app = createApp(App);
    // this mount function is a vue-based function
    app.mount(el);


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