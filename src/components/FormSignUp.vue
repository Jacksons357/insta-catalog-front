<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useField, useForm } from 'vee-validate'
import router from '@/router'
import { useUserStore } from '@/stores/app'
import { useUser } from '@/composables/useUser'

const { isAuthenticated } = useUserStore()
const { register } = useUser()

if (isAuthenticated) {
  router.push('/dashboard')
}

const form = ref(true)
const loading = ref(false)

const required = (v: string) => {
  return !!v || 'Campo obrigatório!'
}

const showPassword = ref(false)

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, { message: 'Deve informar o nome de usuário '}),
    email: z.string({
      required_error: 'E-mail é obrigatório!',
      invalid_type_error: 'Formato de e-mail inválido'
    }).email({
    }).min(1, { message: 'E-mail deve ser informado!'}),
    password: z.string().min(6, { message: 'Deve informar a senha de no minimo 6 caracteres '})
  })
)

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: formSchema
})

const name = useField('name')
const email = useField('email')
const password = useField('password')

const onSubmit = handleSubmit(async (values) => {
  if (!form.value) return
  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 2500))
    setTimeout(() => (loading.value = false), 2000)

    await register({
      name: values.name,
      email: values.email,
      password: values.password,
    })
  } catch(error){
    console.error(error)
  } finally {
    loading.value = false
  }

  resetForm()
})
</script>

<template>
  <VCard
    prepend-icon="mdi-account"
    class="mx-auto"
    width="400"
    title="Cadastro"
  >
    <VContainer>
      <VForm @submit.prevent="onSubmit">
        <VTextField
          v-model="name.value.value"
          :error-messages="errors.name"
          :rules="[required]"
          color="primary"
          label="Nome"
          variant="outlined"
        />

        <VTextField
          v-model="email.value.value"
          :error-messages="errors.email"
          :rules="[required]"
          color="primary"
          label="Email"
          variant="outlined"
          type="email"
        />
    
        <VTextField
          v-model="password.value.value"
          :error-messages="errors.password"
          :rules="[required]"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          color="primary"
          label="Senha"
          variant="outlined"
          @click:append-inner="showPassword = !showPassword"
        />
  
        <VBtn 
          type="submit" 
          color="primary" 
          class="mx-auto bg-submit"
          :loading="loading"
          :disabled="!form"
        >
          Cadastrar
        </VBtn>
      </VForm>
    </VContainer>

    <VDivider />

    <VCardActions>
      <v-spacer />

      <span class="text-caption">Já é cadastrado?</span>
      <VBtn
        color="primary"
        variant="tonal"
        href="/sign-in"
      >
        LOGIN
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<style lang="scss">
  .bg-submit{
    width: 100%
  }
</style>