import { z } from 'zod'

const loginSchema = z.object({
	id: z
		.string({ required_error: 'ログインIDが入力されていません' })
		.trim()
		.min(1, 'ログインIDが入力されていません')
		.max(50, 'ID is too long'),
	password: z
		.string({ required_error: 'パスワードが入力されていません' })
		.trim()
		.min(1, 'パスワードが入力されていません')
		.max(20, 'Password is too long'),
	remember: z.boolean().default(true),
})
type LoginSchema = z.infer<typeof loginSchema>

export { loginSchema }

export type { LoginSchema }
