import { useForm } from 'react-hook-form'

export function App() {
  const { register, handleSubmit } = useForm()

  function createUser(data: any) {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(createUser)}>
      <label htmlFor="name">Nome</label>
      <input type="text" id="name" {...register('name')} />

      <label htmlFor="email">E-mail</label>
      <input type="email" id="email" {...register('email')} />

      <button type="submit">Salvar</button>
    </form>
  )
}

