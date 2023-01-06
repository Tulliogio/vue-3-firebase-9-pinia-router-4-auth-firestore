<template>
     <div>
          <h1>Editar id: route.params</h1>
          <a-form :model="formState" @finish="onFinish" name="basicAdd" layout="vertical" autocomplete="off">
               <a-form-item label="Ingrese URL" name="url" :rules="[
                    {
                         required: true,
                         whitespace: true,
                         pattern: regExpUrl,
                         message: 'Ingresa una URL válida',
                    },
               ]">
                    <a-input v-model:value="formState.url"></a-input>
               </a-form-item>
               <a-form-item>
                    <a-space>
                         <a-button type="primary" html-type="submit" :loading="databaseStore.loadingURL">
                              Editar
                         </a-button>
                         <a-button danger @click="router.push('/')">
                              Volver
                         </a-button>
                    </a-space>
               </a-form-item>
          </a-form>
     </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDatabaseStore } from "../stores/database";
import { message } from "ant-design-vue";

const databaseStore = useDatabaseStore();

const formState = reactive({
     url: "",
});

const route = useRoute();
const router = useRouter();

const onFinish = async () => {
     const res = await databaseStore.updateUrl(route.params.id, formState.url);
     formState.url = "";
     if (!res) {
          return message.success("URL modificada con éxito");
     }
     message.error(res);
};

onMounted(async () => {
     formState.url = await databaseStore.leerUrl(route.params.id);
});
</script>