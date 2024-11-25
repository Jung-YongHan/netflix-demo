import { createApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

app.use(router).mount("#app");
