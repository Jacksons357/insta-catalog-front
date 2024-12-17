import { login } from "@/api/auth"
import { useMutation, useQueryClient } from "@tanstack/vue-query"

export function useUser(){
  const token = ref<string | null>(localStorage.getItem('token') || null)
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      token.value = data.accessToken
      localStorage.setItem('token', data.accessToken)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error(error)
    },
  })

  const isAuthenticated = computed(() => !!token.value)

  return {
    token,
    login: loginMutation.mutate,
    isAuthenticated,
    isError: loginMutation.isError,
    error: loginMutation.error,
  }
}