<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item v-if="userStore.userData" key="Home"> <router-link to="/">Home</router-link> </a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="Login"><router-link to="/login">Login</router-link></a-menu-item>
        <a-menu-item v-if="!userStore.userData" key="Register"><router-link
            to="/register">Register</router-link></a-menu-item>
        <a-menu-item v-if="userStore.userData" @click="userStore.logoutUser" key="Logout">Logout |
        </a-menu-item>
      </a-menu>

      |

    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div class="container">
        <div v-if="userStore.loadingSession">loading user...</div>
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { useUserStore } from './stores/user';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userStore = useUserStore();
const selectedKeys = ref([]);
watch(
  () => route.name,
  () => {
    selectedKeys.value = [route.name]
  });

</script>
<style>
.container {
  background-color: #fff;
  padding: 24px;
  min-height: calc(100vh - 64px);
}

.text-center {
  text-align: center;
}
</style>