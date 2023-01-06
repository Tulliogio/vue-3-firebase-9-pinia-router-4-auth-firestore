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
import { message } from "ant-design-vue";

const userStore = useUserStore();
//const router = useRouter();
const email = ref("");
const password = ref("");

const onFinish = async (values) => {
     console.log("Success:", values);
     const res = await userStore.registerUser(values.email, values.password);
     if (!res) {
          return message.success("Revisa tu correo electrónico para continuar");
     }
     switch (res) {
          case "auth/email-already-in-use":
               message.error("Correo ya registrado");
               break;
          default:
               message.error('occurio un error en el servidor');
               break;
     }

};
</script>
