import * as yup from 'yup'
import { COUNTRIES } from '../store/CountryList'

const COUNTRIES_SET = new Set(COUNTRIES)

function isValidEmail(value: string | undefined): boolean {
  if (!value) return false
  const atIndex = value.indexOf('@')
  if (atIndex <= 0) return false
  if (value.indexOf('@', atIndex + 1) !== -1) return false
  const domain = value.slice(atIndex + 1)
  return domain.includes('.') && !domain.startsWith('.') && !domain.endsWith('.')
}

export const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .test(
      'first-letter-uppercase',
      'First letter must be uppercase',
      (value) =>
        !!value &&
        value[0] === value[0].toUpperCase() &&
        value[0] !== value[0].toLowerCase(),
    ),

  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .min(0, 'Age cannot be negative'),

  email: yup
    .string()
    .required('Email is required')
    .test('valid-email', 'Enter a valid email (e.g. user@example.com)', isValidEmail),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  image: yup
    .mixed<FileList>()
    .required('Image is required')
    .test('file-present', 'Image is required', (v) => v instanceof FileList && v.length > 0)
    .test('file-size', 'File must be smaller than 5 MB', (v) => {
      if (!(v instanceof FileList) || v.length === 0) return true
      return v[0].size <= 5 * 1024 * 1024
    })
    .test('file-type', 'Only PNG and JPEG files are allowed', (v) => {
      if (!(v instanceof FileList) || v.length === 0) return true
      return ['image/png', 'image/jpeg', 'image/jpg'].includes(v[0].type)
    }),

  country: yup
    .string()
    .required('Country is required')
    .test('valid-country', 'Select a valid country from the list', (v) =>
      !!v && COUNTRIES_SET.has(v as typeof COUNTRIES[number]),
    ),
})

export type FormData = yup.InferType<typeof schema>