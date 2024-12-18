// Utilities
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function clearToken() {
    token.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    isAuthenticated,
    setToken,
    clearToken,
  }
})
