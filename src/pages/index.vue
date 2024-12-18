<script lang="ts" setup>
import { useUserStore } from '@/stores/app';

const { isAuthenticated } = useUserStore()

</script>

<template>
  <h1>{{ isAuthenticated ? 'True' : 'False' }}</h1>
</template>

