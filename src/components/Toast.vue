<template>
  <v-snackbar
    :timeout="2000"
  >
    <template #activator="{ props }">
      <v-btn
        class="ma-2"
        v-bind="props"
      >
        open
      </v-btn>
    </template>

    Lorem ipsum dolor sit amet consectetur.
  </v-snackbar>

  <v-snackbar
    :timeout="2000"
    color="blue-grey"
    rounded="pill"
  >
    <template #activator="{ props }">
      <v-btn
        class="ma-2"
        color="blue-grey"
        rounded="pill"
        v-bind="props"
      >
        open
      </v-btn>
    </template>

    Snackbar with <strong>rounded="pill"</strong>.
  </v-snackbar>
</template>