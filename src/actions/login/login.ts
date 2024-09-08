'use server'

import { AuthService } from '@/client/api'

import { query } from '../query'

type Params = {
  email: string
  password: string
}

export const login = async ({ email, password }: Params) => {
  const response = await query({
    queryFn: () => AuthService.login({ requestBody: { email, password } }),
  })

  return response
}
