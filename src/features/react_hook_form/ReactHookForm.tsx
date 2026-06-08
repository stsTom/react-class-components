import { useForm, type SubmitHandler } from 'react-hook-form'

interface FormData {
  name: string
  age: string
  email: string
  gender: string
  terms: boolean
}

export function ReactHookFormComponent() {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('React Hook Form Data:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="rhf-name">Name</label>
        <input id="rhf-name" type="text" {...register('name', { required: true })} />
      </div>

      <div>
        <label htmlFor="rhf-age">Age</label>
        <input id="rhf-age" type="number" {...register('age', { required: true })} />
      </div>

      <div>
        <label htmlFor="rhf-email">Email</label>
        <input id="rhf-email" type="email" {...register('email', { required: true })} />
      </div>

      <div>
        <label htmlFor="rhf-gender">Gender</label>
        <select id="rhf-gender" {...register('gender', { required: true })}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <input id="rhf-terms" type="checkbox" {...register('terms', { required: true })} />
        <label htmlFor="rhf-terms">I agree to the Terms & Conditions</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
