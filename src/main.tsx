import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Links from './Links.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Links />
  </StrictMode>,
)
