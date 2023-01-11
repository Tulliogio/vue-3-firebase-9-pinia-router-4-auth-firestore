import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";
import { useDatabaseStore } from "./stores/database";

import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Editar from "./components/Editar.vue"
import NotFound from "./components/NotFound.vue";
import Perfil from "./components/Perfil.vue";

const requireAuth = async (to, from, next) => {
     const userStore = useUserStore();
     userStore.loadingSession = true;
     const user = await userStore.currentUser();
     if (user) {
          next();
     } else {
          next("/login");
     }
     userStore.loadingSession = false;
};

const redireccion = async (to, from, next) => {
     const databaseStore = useDatabaseStore();
     const userStore = useUserStore();
     userStore.loadingSession = true;
     // console.log(to.params.pathMatch[0]);
     const name = await databaseStore.getURL(to.params.pathMatch[0]);
     if (!name) {
          next();
          userStore.loadingSession = false;
     } else {
          window.location.href = name;
          userStore.loadingSession = true;
          next();
     }
};

const routes = [
     { path: "/", component: Home, beforeEnter: requireAuth, name: "home" },
     {
          path: "/perfil",
          component: Perfil,
          beforeEnter: requireAuth,
          name: "perfil",
     },
     {
          path: "/editar/:id",
          component: Editar,
          beforeEnter: requireAuth,
          name: "editar",
     },
     { path: "/login", component: Login, name: "login" },
     { path: "/register", component: Register, name: "register" },
     {
          path: "/:pathMatch(.*)*",
          component: NotFound,
          name: "404",
          beforeEnter: redireccion,
     },
];

const router = createRouter({
     routes,
     history: createWebHistory(),
});

export default router;