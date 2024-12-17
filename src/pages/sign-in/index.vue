<script lang="ts" setup>
import { useUser } from '@/composables/useUser';
import router from '@/router';

const { isAuthenticated } = useUser()

if (isAuthenticated.value){
  router.push('/dashboard')
}

</script>

<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
      class="pa-0"
    >
      <div class="h-screen d-flex justify-center align-center bg-image">
        <h1>Login</h1>
      </div>
    </v-col>
    <v-col
      cols="12"
      sm="6"
      class="pa-0"
    >
      <div class="h-screen d-flex align-center bg-form">
        <FormSignIn />
      </div>
    </v-col>
  </v-row>
</template>

<style lang="scss">
  .bg-image{
    background-color: #fafafa
  }

  h1 {
    color: black;
  }

  .bg-form{
    background-color: dodgerblue;
  }
</style>