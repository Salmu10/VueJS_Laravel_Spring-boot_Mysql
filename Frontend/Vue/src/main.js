import { createApp } from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import './main.css';
import App from './App.vue';
import store from "./store";
import router from "./router";
import vSelect from 'vue-select';
import Toaster from "@meforma/vue-toaster";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SetupCalendar, DatePicker } from 'v-calendar';

import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
library.add(faSearch, faUser);

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toaster);
app.component('v-select', vSelect);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');

app.use(SetupCalendar, {})
app.component('DatePicker', DatePicker);
