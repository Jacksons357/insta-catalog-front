import { login } from "@/api/auth"
import { register } from "@/api/register"
import router from "@/router"
import { useUserStore } from "@/stores/app"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { POSITION, useToast } from "vue-toastification"


export function useUser(){
  const userStore = useUserStore()
  const queryClient = useQueryClient()
  const toast = useToast()

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      userStore.setToken(data.accessToken)
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

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })

      router.push('/sign-in')

      toast.success('Usuário cadastrado com sucesso!', {
        position: POSITION.BOTTOM_RIGHT
      })
    },
    onError: (error) => {
      console.error(error)
      toast.error('Erro ao se cadastrar, tente novamente!', {
        position: POSITION.BOTTOM_RIGHT
      })
    }
  })

  return {
    login: loginMutation.mutate,
    isError: loginMutation.isError,
    error: loginMutation.error,
    register: registerMutation.mutate
  }
}