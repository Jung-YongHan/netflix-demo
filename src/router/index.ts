import { createWebHistory, createRouter } from "vue-router";
import MainPage from "../views/main_page/MainPage.vue";
import SigninPage from "../views/signin_page/SigninPage.vue";
import SignupPage from "../views/signup_page/SignupPage.vue";
import PopularPage from "../views/popular_page/PopularPage.vue";
import WishlistPage from "../views/wishlist_page/WishlistPage.vue";
import SearchPage from "../views/search_page/SearchPage.vue";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
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
  {
    path: "/popular",
    name: "PopularPage",
    component: PopularPage,
  },
  {
    path: "/wishlist",
    name: "WishlistPage",
    component: WishlistPage,
  },
  {
    path: "/search",
    name: "SearchPage",
    component: SearchPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
