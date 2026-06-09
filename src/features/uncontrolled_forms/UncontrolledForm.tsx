import { useRef, useState, type FormEvent } from 'react'
import * as yup from 'yup'
import { schema, type FormData } from '../../utils/FormValidationSchema'
import { CountryDatalist } from '../../components/CountryList'
import { ErrorField } from '../../components/ErrorField'
import { useFormsStore } from '../../store/useFormsStore'

type ErrorFields = Partial<Record<keyof FormData, string>>

export function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const countryRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const [errors, setErrors] = useState<ErrorFields>({})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const raw = {
      name: nameRef.current?.value ?? '',
      age: ageRef.current?.value,
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
      confirmPassword: confirmRef.current?.value ?? '',
      image: imageRef.current?.files ?? undefined,
      country: countryRef.current?.value ?? '',
    }

    try {
      const data = await schema.validate(raw, { abortEarly: false })
      setErrors({})
      useFormsStore.getState().addSubmission({
        source: 'Uncontrolled Form',
        name: data.name,
        age: data.age,
        email: data.email,
        country: data.country,
        imageName: data.image[0]?.name ?? '—',
      })
      formRef.current?.reset()
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errorFields: ErrorFields = {}
        err.inner.forEach((e) => {
          if (e.path && !(e.path in errorFields)) {
            errorFields[e.path as keyof FormData] = e.message
          }
        })
        setErrors(errorFields)
      }
    }
  }

  return (
    <article>
      <header>
        <strong>Uncontrolled Form</strong>
        <small>
          — validates on submit
        </small>
      </header>

      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <label htmlFor="uc-name">Name</label>
        <input
          id="uc-name"
          type="text"
          ref={nameRef}
          aria-invalid={!!errors.name}
          placeholder="e.g. Alice"
        />
        <ErrorField message={errors.name} />

        <label htmlFor="uc-age">Age</label>
        <input
          id="uc-age"
          type="number"
          ref={ageRef}
          aria-invalid={!!errors.age}
          placeholder="e.g. 25"
        />
        <ErrorField message={errors.age} />

        <label htmlFor="uc-email">Email</label>
        <input
          id="uc-email"
          type="text"
          ref={emailRef}
          aria-invalid={!!errors.email}
          placeholder="e.g. alice@example.com"
        />
        <ErrorField message={errors.email} />

        <label htmlFor="uc-password">Password</label>
        <input
          id="uc-password"
          type="password"
          ref={passwordRef}
          aria-invalid={!!errors.password}
        />
        <ErrorField message={errors.password} />

        <label htmlFor="uc-confirm">Confirm Password</label>
        <input
          id="uc-confirm"
          type="password"
          ref={confirmRef}
          aria-invalid={!!errors.confirmPassword}
        />
        <ErrorField message={errors.confirmPassword} />

        <label htmlFor="uc-image">Profile Image (PNG / JPEG · max 5 MB)</label>
        <input
          id="uc-image"
          type="file"
          accept="image/png,image/jpeg"
          ref={imageRef}
          aria-invalid={!!errors.image}
        />
        <ErrorField message={errors.image} />

        <label htmlFor="uc-country">Country</label>
        <input
          id="uc-country"
          type="text"
          list="uc-country-list"
          ref={countryRef}
          aria-invalid={!!errors.country}
          placeholder="Start typing a country…"
        />
        <CountryDatalist id="uc-country-list" />
        <ErrorField message={errors.country} />

        <button type="submit">Submit</button>
      </form>
    </article>
  )
}