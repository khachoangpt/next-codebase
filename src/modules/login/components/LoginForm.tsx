'use client'

import { Button, Container, Form, FormField, FormInput } from '@/components'

import useLoginController from '../controllers/use-login.controller'

const LoginForm = () => {
  const { loginForm, control, loadingLogin, handleSubmit, onSubmit } =
    useLoginController()

  return (
    <Container>
      <Form {...loginForm}>
        <Container className="space-y-5">
          <FormField
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <FormInput
                label="Email"
                required
                value={value}
                onChange={onChange}
              />
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <FormInput
                label="Password"
                type="password"
                required
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Button loading={loadingLogin} onClick={handleSubmit(onSubmit)}>
            Login
          </Button>
        </Container>
      </Form>
    </Container>
  )
}

export default LoginForm
