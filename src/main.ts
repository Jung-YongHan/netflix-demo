import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import { createPinia } from "pinia";
import axios from "axios";
import ToastService from 'primevue/toastservice';

const app = createApp(App);
const pinia = createPinia();

app
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .use(pinia)
  .use(ToastService)
  .mount("#app");

app.config.globalProperties.axios = axios;
