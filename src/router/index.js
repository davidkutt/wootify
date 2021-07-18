import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import FilteredProducts from "@/views/FilteredProducts";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/filtered/:filter",
    name: "FilteredProducts",
    component: FilteredProducts
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
