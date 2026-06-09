import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@picocss/pico';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
