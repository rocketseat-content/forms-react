import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createUserSchema = z.object({
  name: z.string().nonempty({
    message: 'O nome é obrigatório',
  }),
  email: z.string().nonempty({
    message: 'O e-mail é obrigatório',
  }).email({
    message: 'Formato de e-mail inválido',
  })
})

type CreateUserData = z.infer<typeof createUserSchema>

export function App() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  function createUser(data: CreateUserData) {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(createUser)}>
      <label htmlFor="name">Nome</label>
      <input type="text" id="name" {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}

      <label htmlFor="email">E-mail</label>
      <input type="email" id="email" {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}

      <button type="submit" disabled={isSubmitting}>Salvar</button>
    </form>
  )
}

