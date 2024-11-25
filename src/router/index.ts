import { createWebHistory, createRouter } from "vue-router";
import App from "../App.vue";

const routes = [
    {
        path: "/경로",
        component: App,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;