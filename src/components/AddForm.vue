<script setup>

import { reactive } from 'vue';
import { useDatabaseStore } from '../stores/database';
import { message } from 'ant-design-vue';

const databaseStore = useDatabaseStore();
const formState = reactive({ url: '' });
const onFinish = async (value) => {
     console.log('todo correcto');
     const error = databaseStore.addUrl(formState.url);
     if (!error) {
          formState.url = "";
          return message.success('url agregada');
     }
     switch (error) {
          default:
               message.error('occurrio un error');
               break;
     }

}

</script>>

<template>

     <a-form :model="formState" name="addform" layout="vertical" autocomplete="off" @finish="onFinish">
          <a-form-item name="url" label="ingrese una url"
               :rules="[{ required: true, whitespace: true, message: 'ingrese una url valida', pattern: /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/m?]?.*$/, }]"></a-form-item>
          <a-input v-model:value="formState.url"></a-input>
          <a-form-item>
               <a-button type="primary" html-type="submit" :loading="formState.loadingURL"
                    :disabled="formState.loadingURL">Agregar URL </a-button>

          </a-form-item>
     </a-form>


</template>