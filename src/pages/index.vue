<script lang="ts" setup>
import { useUser } from '@/composables/useUser';

const { isAuthenticated } = useUser()

</script>

<template>
  <h1>{{ isAuthenticated ? 'True' : 'False' }}</h1>
</template>

