<template>
     <div>
          <h1>Register</h1>
          <form @submit.prevent="handleSubmit">
               <input type="email" placeholder="email" v-model.trim="email" />
               <input type="password" placeholder="password" v-model.trim="password" />
               <button type="submit" :disabled="userStore.loadingUser">
                    Crear cuenta
               </button>
          </form>
     </div>
</template>



<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
//import { useRouter } from 'vue-router';
import { async } from "@firebase/util";

const userStore = useUserStore();
//const router = useRouter();
const email = ref("");
const password = ref("");

const handleSubmit = async () => {
     if (!email.value || password.value.length < 6) {
          return alert("ingresa los campos");
     }

     await userStore.registerUser(email.value, password.value);
     // router.push('/')
};
</script>
