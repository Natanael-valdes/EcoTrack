import { createRouter, createWebHistory } from "vue-router";
import LogIn from "../components/LogIn.vue";
import Home from "../views/home.vue";
import EcoCraft from "../views/EcoCraft.vue";
import Tracky from "../views/tracky.vue";
import FormVol from "../views/formVol.vue";
import EcoNews from "../views/EcoNews.vue";
import EcoMap from "../views/EcoMap.vue";
import AboutUs from "../views/AboutUs.vue";
import CreateAccount from "../components/CreateAccount.vue";
import Profile from "../views/Profile.vue";

const routes = [
  { path: "/", component: LogIn },
  { path: "/create-account", component: CreateAccount },
  { path: "/home", component: Home },
  { path: "/ecocraft", component: EcoCraft },
  { path: "/tracky", component: Tracky },
  { path: "/formVol", component: FormVol },
  { path: "/EcoNews", component: EcoNews },
  { path: "/map", component: EcoMap },
  { path: "/about", component: AboutUs },
  { path: "/profile", component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
