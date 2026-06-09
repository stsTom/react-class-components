import { memo } from 'react'

interface CountryDatalistProps {
  id: string
  countries: readonly string[]
}

export const CountryDatalist = memo(function CountryDatalist({ id, countries }: CountryDatalistProps) {
  return (
    <datalist id={id}>
      {countries.map((c) => <option key={c} value={c} />)}
    </datalist>
  )
})