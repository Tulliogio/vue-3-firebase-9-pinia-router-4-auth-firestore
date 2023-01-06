import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Editar from "./components/Editar.vue"

const requireAuth = async (to, from, next) => {
     const userStore = useUserStore();
     userStore.loadingSession = true;
     const user = await userStore.currentUser();
     if (user) {
          next();
     } else {
          next('/login');
     }
     userStore.loadingSession = false;
}

const routes = [
     { path: "/editar/:id", component: Editar, beforeEnter: requireAuth, name: 'Editar' },
     { path: '/', component: Home, beforeEnter: requireAuth, name: 'Home' },
     { path: '/Login', component: Login, name: 'Login' },
     { path: '/Register', component: Register, name: 'Register' },

]
const history = createWebHistory();

const router = createRouter({
     history,
     routes,
});

export default router;