import { useRef, type FormEvent } from 'react'

interface FormData {
  name: string
  age: string
  email: string
  gender: string
  terms: boolean
}

export function UncontrolledForm() {
  const nameRef = useRef<HTMLInputElement>(null)
  const ageRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const genderRef = useRef<HTMLSelectElement>(null)
  const termsRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const data: FormData = {
      name: nameRef.current?.value ?? '',
      age: ageRef.current?.value ?? '',
      email: emailRef.current?.value ?? '',
      gender: genderRef.current?.value ?? '',
      terms: termsRef.current?.checked ?? false,
    }

    console.log('Uncontrolled Form Data:', data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="uncontrolled-name">Name</label>
        <input id="uncontrolled-name" type="text" ref={nameRef} />
      </div>

      <div>
        <label htmlFor="uncontrolled-age">Age</label>
        <input id="uncontrolled-age" type="number" ref={ageRef} />
      </div>

      <div>
        <label htmlFor="uncontrolled-email">Email</label>
        <input id="uncontrolled-email" type="email" ref={emailRef} />
      </div>

      <div>
        <label htmlFor="uncontrolled-gender">Gender</label>
        <select id="uncontrolled-gender" ref={genderRef}>
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div>
        <label htmlFor="uncontrolled-terms">I agree to the Terms & Conditions</label>
        <input id="uncontrolled-terms" type="checkbox" ref={termsRef} />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
