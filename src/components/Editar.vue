<template>
     <div>
          <h1>Editar</h1>
          <p v-if="databaseStore.loadingDoc">Loading doc...</p>
          <form @submit.prevent="handleSubmit" v-else>
               <input type="text" placeholder="url" v-model.trimp="url" />
               <button type="submit" :disabled="databaseStore.loadingDoc">
                    Editar
               </button>
          </form>
     </div>
</template>
 
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";

const route = useRoute();
const databaseStore = useDatabaseStore();
const url = ref("");

onMounted(async () => {
     url.value = await databaseStore.leerUrl(route.params.id);
});

const handleSubmit = async () => {
     await databaseStore.updateUrl(route.params.id, url.value);
};
</script>