import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, type FormData } from '../../utils/FormValidationSchema'
import { CountryDatalist } from '../../components/CountryList'
import { ErrorField } from '../../components/ErrorField'
import { useFormsStore } from '../../store/useFormsStore'

export function ReactHookFormComponent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    useFormsStore.getState().addSubmission({
      source: 'React Hook Form',
      name: data.name,
      age: data.age,
      email: data.email,
      country: data.country,
      imageName: data.image[0]?.name ?? '—',
    })
    reset()
  }

  return (
    <article>
      <header>
        <strong>React Hook Form</strong>
        <small>
          — validates on submit, submit disabled after failed attempt until fixed
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
        <CountryDatalist id="rhf-country-list" />
        <ErrorField message={errors.country?.message} />

        <button type="submit" disabled={isSubmitted && !isValid} aria-disabled={isSubmitted && !isValid}>
          Submit
        </button>
      </form>
    </article>
  )
}