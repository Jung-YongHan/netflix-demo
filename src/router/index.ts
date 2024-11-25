import { createWebHistory, createRouter } from "vue-router";
import MainPage from "../views/main_page/MainPage.vue";
import SigninPage from "../views/signin_page/SigninPage.vue";
import SignupPage from "../views/signup_page/SignupPage.vue";

const routes = [
    {
        path: "/",
        name: "MainPage",
        component: MainPage
    },
    {
        path: "/signin",
        name: "SigninPage",
        component: SigninPage,
    },
    {
        path: "/signup",
        name: "SignupPage",
        component: SignupPage,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;