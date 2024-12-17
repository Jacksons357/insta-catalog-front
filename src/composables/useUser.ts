import { login } from "@/api/auth"
import router from "@/router"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { POSITION, useToast } from "vue-toastification"

const toast = useToast()

export function useUser(){
  const token = ref<string | null>(localStorage.getItem('token') || null)
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      token.value = data.accessToken
      localStorage.setItem('token', data.accessToken)
      queryClient.invalidateQueries({ queryKey: ['user'] })

      router.push('/dashboard')

      toast.success('Você está logado!', {
        position: POSITION.BOTTOM_RIGHT
      })
    },
    onError: (error) => {
      console.error(error)
      toast.error('Dados inválidos!', {
        position: POSITION.BOTTOM_RIGHT
      })
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