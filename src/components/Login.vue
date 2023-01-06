<template>
     <h1 class="text-center">Login</h1>
     <a-row>

          <a-col :xs="{ span: 24 }" :sm="{ span: 18, offset: 3 }" :lg="{ span: 12, offset: 6 }">
               <a-form :model="formState" name="basic" layout="vertical" autocomplete="off" @finish="onFinish"
                    @finishFailed="onFinishFailed">
                    <a-form-item name="email" label="ingresa tu correo"
                         :rules="[{ required: true, whitespace: true, type: 'email', message: 'ingresa tu correo' }]">
                         <a-input v-model:value="formState.email" />

                    </a-form-item>

                    <a-form-item label="Password" name="password" :rules="[{
                         required: true,
                         min: 6,
                         message:
                              'Por favor escriba una contraseña de 6 carácteres',
                    }]">
                         <a-input-password v-model:value="formState.password" />
                    </a-form-item>
                    <a-form-item has-feedback label="Confirm" name="checkPass" :rules="{ validator: validateRePass }">
                         <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
                    </a-form-item>
                    <a-form-item>
                         <a-button type="primary" html-type="submit" :loading="userStore.loadingUser"
                              :disabled="userStore.loadingUser">Submit</a-button>
                    </a-form-item>

               </a-form>
          </a-col>




     </a-row>


</template>



<script setup>

import { useUserStore } from "../stores/user";
import { async } from "@firebase/util";
import { reactive } from "vue";
import { message } from "ant-design-vue";
import 'ant-design-vue/es/message/style/css';


const userStore = useUserStore();
const formState = reactive({
     username: 'tullio17@gmail.com',
     password: '123123',
     remember: true,
});

const onFinish = async (values) => {
     console.log("Success:", values);
     const res = await userStore.loginUser(formState.email, formState.password);
     if (!res) {
          return message.success('bienvenidos a la super App');
     }
     switch (res) {
          case "auth-user-not-found":
               message.error("no esiste el correo registrado");
               break;
          case 'auth/wrong-password':
               message.error("error de contraseña");
               break;
          default:
               message.error("occurrio un error en el servidor");
               break;

     }
};

const onFinishFailed = (errorInfo) => {
     console.log("Failed:", errorInfo);
};
const validateRePass = async (_rule, value) => {
     if (value === "") {
          return Promise.reject("Por favor repita contraseña");
     }
     if (value !== formState.password) {
          return Promise.reject("No coinciden las contraseñas");
     }
     Promise.resolve();
};
</script>
