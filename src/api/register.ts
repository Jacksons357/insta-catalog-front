export interface CredentialsProps {
  name: string
  email: string
  password: string
}

export async function register(credentials: CredentialsProps){
  const response = await  fetch(
    `${import.meta.env.VITE_API_URL}/users`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }
  )
  
  if(!response.ok){
    throw new Error('Error to registe user, check data forms')
  }
  const data = await response.json()
  return data
}