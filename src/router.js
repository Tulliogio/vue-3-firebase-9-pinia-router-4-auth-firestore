import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";

import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";


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
     { path: '/', component: Home, beforeEnter: requireAuth },
     { path: '/Login', component: Login },
     { path: '/Register', component: Register },

]
const history = createWebHistory();

const router = createRouter({
     history,
     routes,
});

export default router;