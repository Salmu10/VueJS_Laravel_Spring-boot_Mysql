import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import App from './App.vue';
import vSelect from 'vue-select';

import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(router);
app.use(store);
app.component('v-select', vSelect)
app.mount('#app');
