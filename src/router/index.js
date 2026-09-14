import { createRouter, createWebHistory } from "vue-router";
import LogIn from "../components/LogIn.vue";
import Home from "../views/home.vue";
import EcoCraft from "../views/EcoCraft.vue";
import Tracky from "../views/tracky.vue";
import FormVol from "../views/formVol.vue";
import EcoNews from "../views/EcoNews.vue";
import EcoMap from "../views/EcoMap.vue";
import AboutUs from "../views/AboutUs.vue";

const routes = [
  { path: "/", component: LogIn },
  { path: "/home", component: Home },
  { path: "/ecocraft", component: EcoCraft },
  { path: "/tracky", component: Tracky },
  { path: "/formVol", component: FormVol },
  { path: "/EcoNews", component: EcoNews },
  { path: "/map", component: EcoMap },
  { path: "/about", component: AboutUs },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
