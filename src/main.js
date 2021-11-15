import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';

import App from './App.vue';
import './registerServiceWorker.js';
import router from './router/index.js';
import store from './store/index.js';

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
