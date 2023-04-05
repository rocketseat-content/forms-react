import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

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
  const [output, setOutput] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })

  function createUser(data: CreateUserData) {
    setOutput(JSON.stringify(data))
  }

  return (
    <main className="h-screen flex flex-col gap-6 items-center justify-center">
      <form 
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-xs"
      >
        <div className="flex flex-col gap-2">
          <label 
            htmlFor="name"
            className="text-sm text-zinc-600"
          >
            Nome
          </label>
          <input 
            type="text" 
            id="name" 
            className="rounded border border-zinc-300 shadow-sm px-3 py-1 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
            {...register('name')} 
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label 
            htmlFor="email"
            className="text-sm text-zinc-600"
          >
            E-mail
          </label>
          <input 
            type="email" 
            id="email" 
            className="rounded border border-zinc-300 shadow-sm px-3 py-1 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
            {...register('email')} 
          />
          {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-violet-500 text-white rounded px-3 py-2 font-semibold text-sm hover:bg-violet-600"
        >
          Salvar
        </button>
      </form>

      <pre className="text-sm">
        {output}
      </pre>
    </main>
  )
}

