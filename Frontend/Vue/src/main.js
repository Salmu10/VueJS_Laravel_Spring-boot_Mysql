import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import App from './App.vue';
import store from "./store";
import router from "./router";
import vSelect from 'vue-select';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// import './assets';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch);

const app = createApp(App);
app.use(router);
app.use(store);
app.component('v-select', vSelect);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
