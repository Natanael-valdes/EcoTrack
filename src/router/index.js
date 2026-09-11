import { createRouter, createWebHistory } from "vue-router";
import LogIn from "../components/LogIn.vue";
import Home from "../views/home.vue";
import EcoCraft from "../views/EcoCraft.vue";
import Tracky from "../views/tracky.vue";
import FormVol from "../views/formVol.vue";

const routes = [
  { path: "/", component: LogIn },
  { path: "/home", component: Home },
  { path: "/ecocraft", component: EcoCraft },
  { path: "/tracky", component: Tracky },
  { path: "/formVol", component: FormVol },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
