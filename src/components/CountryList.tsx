import { memo } from 'react'
import { COUNTRIES } from '../store/CountryList'

export const CountryDatalist = memo(function CountryDatalist({ id }: { id: string }) {
  return (
    <datalist id={id}>
      {COUNTRIES.map((c) => <option key={c} value={c} />)}
    </datalist>
  )
})