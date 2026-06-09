import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type FormData } from '../../utils/FormValidationSchema'
import { COUNTRIES } from '../../store/CountryList'
import { ErrorField } from '../../components/ErrorField'

export function ReactHookFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('React Hook Form Data:', { ...data, image: data.image[0] })
    alert(`Submitted!\nName: ${data.name}\nEmail: ${data.email}`)
  }

  return (
    <article>
      <header>
        <strong>React Hook Form</strong>
        <small>
          — live validation, submit disabled until valid
        </small>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="rhf-name">Name</label>
        <input
          id="rhf-name"
          type="text"
          aria-invalid={!!errors.name}
          placeholder="e.g. Alice"
          {...register('name')}
        />
        <ErrorField message={errors.name?.message} />

        <label htmlFor="rhf-age">Age</label>
        <input
          id="rhf-age"
          type="number"
          aria-invalid={!!errors.age}
          placeholder="e.g. 25"
          {...register('age')}
        />
        <ErrorField message={errors.age?.message} />

        <label htmlFor="rhf-email">Email</label>
        <input
          id="rhf-email"
          type="text"
          aria-invalid={!!errors.email}
          placeholder="e.g. alice@example.com"
          {...register('email')}
        />
        <ErrorField message={errors.email?.message} />

        <label htmlFor="rhf-password">Password</label>
        <input
          id="rhf-password"
          type="password"
          aria-invalid={!!errors.password}
          {...register('password')}
        />
        <ErrorField message={errors.password?.message} />

        <label htmlFor="rhf-confirm">Confirm Password</label>
        <input
          id="rhf-confirm"
          type="password"
          aria-invalid={!!errors.confirmPassword}
          {...register('confirmPassword')}
        />
        <ErrorField message={errors.confirmPassword?.message} />

        <label htmlFor="rhf-image">Profile Image (PNG / JPEG · max 5 MB)</label>
        <input
          id="rhf-image"
          type="file"
          accept="image/png,image/jpeg"
          aria-invalid={!!errors.image}
          {...register('image')}
        />
        <ErrorField message={errors.image?.message as string | undefined} />

        <label htmlFor="rhf-country">Country</label>
        <input
          id="rhf-country"
          type="text"
          list="rhf-country-list"
          aria-invalid={!!errors.country}
          placeholder="Start typing a country…"
          {...register('country')}
        />
        <datalist id="rhf-country-list">
          {COUNTRIES.map((c) => <option key={c} value={c} />)}
        </datalist>
        <ErrorField message={errors.country?.message} />

        <button type="submit" disabled={!isValid} aria-disabled={!isValid}>
          Submit
        </button>
      </form>
    </article>
  )
}