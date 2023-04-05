import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Form } from './components/Form'

const createUserSchema = z.object({
  name: z.string().nonempty({
    message: 'O nome é obrigatório',
  }).transform(name => {
    return name
      .trim()
      .split(' ')
      .map(word => word[0].toLocaleUpperCase().concat(word.substring(1)))
      .join(' ')
  }),
  email: z.string().nonempty({
    message: 'O e-mail é obrigatório',
  }).email({
    message: 'Formato de e-mail inválido',
  }).toLowerCase(),
  password: z.string().nonempty({
    message: 'A senha é obrigatória',
  }).min(6, {
    message: 'A senha precisa ter no mínimo 6 caracteres',
  })
})

type CreateUserData = z.infer<typeof createUserSchema>

export function App() {
  const [output, setOutput] = useState('')

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  function createUser(data: CreateUserData) {
    setOutput(JSON.stringify(data))
  }

  const { 
    handleSubmit, 
    formState: { isSubmitting }, 
    watch 
  } = createUserForm;

  const userPassword = watch('password')
  const isPasswordStrong = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})').test(userPassword)

  return (
    <main className="h-screen flex flex-col gap-6 items-center justify-center">
      <FormProvider {...createUserForm}>
        <form 
          onSubmit={handleSubmit(createUser)}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <Form.Field>
            <Form.Label htmlFor="name">
              Nome
            </Form.Label>
            <Form.Input type="name" name="name" />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="email">
              E-mail
            </Form.Label>
            <Form.Input type="email" name="email" />
            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="password">
              Senha

              {isPasswordStrong 
                ? <span className="text-xs text-emerald-600">Senha forte</span>
                : <span className="text-xs text-red-500">Senha fraca</span>}
            </Form.Label>
            <Form.Input type="password" name="password" />
            <Form.ErrorMessage field="password" />
          </Form.Field>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-violet-500 text-white rounded px-3 py-2 font-semibold text-sm hover:bg-violet-600"
          >
            Salvar
          </button>
        </form>
      </FormProvider>

      <pre className="text-sm">
        {output}
      </pre>
    </main>
  )
}

