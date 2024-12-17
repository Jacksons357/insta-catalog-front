<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useField, useForm } from 'vee-validate'
import { useUser } from '@/composables/useUser';
import router from '@/router';

const formSchema = toTypedSchema(
  z.object({
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Email is not valid'
    }).email().min(1, { message: 'Deve informar o email'}),
    password: z.string().min(6, { message: 'Deve informar a senha de no minimo 6 caracteres '})
  })
)
const form = ref(true)
const loading = ref(false)

const required = (v: string) => {
  return !!v || 'Campo obrigatório!'
}

const showPassword = ref(false)

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: formSchema
})

const email = useField('email')
const password = useField('password')

const { login } = useUser()

const onSubmit = handleSubmit(async (values) => {
  if (!form.value) return
  loading.value = true

  try {
    await login({
      email: values.email,
      password: values.password
    })
  } catch(error){
    console.error(error)
  } finally {
    loading.value = false
  }

  setTimeout(() => (loading.value = false), 2000)

  resetForm()
  console.log('chegou aqui')

  router.push('/dashboard')
})
</script>

<template>
  <VCard
    prepend-icon="mdi-account"
    class="mx-auto"
    width="400"
    title="Login"
  >
    <VContainer>
      <VForm @submit.prevent="onSubmit">
        <VTextField
          v-model="email.value.value"
          :error-messages="errors.email"
          :rules="[required]"
          color="primary"
          label="Email"
          variant="outlined"
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
          Entrar
        </VBtn>
      </VForm>
    </VContainer>

    <VDivider />

    <VCardActions>
      <v-spacer />

      <span class="text-caption">Ainda não tem cadastro?</span>
      <VBtn
        color="primary"
        variant="tonal"
        href="/sign-up"
      >
        cadastrar
      </VBtn>
    </VCardActions>
  </VCard>
</template>

<style lang="scss">
  .bg-submit{
    width: 100%
  }
</style>