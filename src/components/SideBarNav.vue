<script lang="ts" setup>

const items = [
  {
    icon: 'mdi-view-dashboard',
    title: 'Dashboard',
    value: 'dashboard',
    href: '/dashboard'
  },
  {
    icon: 'mdi-plus-box',
    title: 'Criar catálogo',
    value: 'registerproduct',
    href: '/register'
  }
]
//
</script>

<template>
  <VNavigationDrawer
    expand-on-hover
    rail
  >
    <VList>
      <VListItem
        prepend-avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdhevYP9zvmSw3PjPnxPO3YbRcEICUfjTZTw&s"
        subtitle="jackson o gato"
        title="80ção"
      />
    </VList>
  
    <VDivider />
  
    <VList
      v-for="item in items"
      :key="item.title"
      density="compact"
      nav
    >
      <VListItem
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.value"
        :href="item.href"
      />
    </VList>
  
    <template #append>
      <VList
        density="compact"
        nav
      >
        <VListItem
          prepend-icon="mdi-logout"
          title="Logout"
          value="logout"
        />
      </VList>
    </template>
  </VNavigationDrawer>
</template>