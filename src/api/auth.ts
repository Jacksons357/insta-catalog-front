export interface CredentialsProps {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: {
    id: string
    email: string
    name: string
  }
}


export async function login(credentials: CredentialsProps): Promise<LoginResponse>{
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }
  )

  if (!response.ok) {
    throw new Error('Login failed! Check your email and password.');
  }

  const data = await response.json()
  return data
}