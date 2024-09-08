import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { login } from '@/actions'
import { type LoginFormType, loginSchema } from '@/constants'
import { useRouter } from '@/i18n'
import { useLoginStore } from '@/store/login.store'

const useLoginController = () => {
  const defaultValues: LoginFormType = {
    email: '',
    password: '',
  }
  const loginForm = useForm({
    defaultValues,
    resolver: zodResolver(loginSchema),
  })
  const { control, handleSubmit } = loginForm
  const { push } = useRouter()
  const loadingLogin = useLoginStore().loadingLogin
  const setLoadingLogin = useLoginStore().setLoadingLogin

  const onSubmit: SubmitHandler<LoginFormType> = async (data) => {
    setLoadingLogin(true)
    const { error } = await login(data)

    if (error) {
      setLoadingLogin(false)
      toast.error(
        error?.body?.message ?? 'Server error, please try again later!',
      )
      return
    }

    setLoadingLogin(false)
    push('/')
  }

  return {
    control,
    loginForm,
    loadingLogin,
    onSubmit,
    handleSubmit,
  }
}

export default useLoginController
