<script lang="ts" setup>
definePage({
  requiresAuth: true
})
</script>

<template>
  <v-app>
    <v-main>
      <h1>dashboard</h1>
      <router-view name="dashboard" />
    </v-main>
  </v-app>
</template>