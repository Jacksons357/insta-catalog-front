<template>
  <v-app>
    <SideBarNav />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import SideBarNav from '@/components/SideBarNav.vue'
</script>
