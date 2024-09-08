import { z } from 'zod'

// login form
const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, { message: 'Email is required' })
    .email(),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
})
type LoginFormType = z.infer<typeof loginSchema>

export { loginSchema }
export type { LoginFormType }
