import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
// Global styles first so page/component CSS can override them
import './styles/global.css'
import { router } from './router.tsx'
import { canReveal } from './hooks/useScrollReveal.ts'

// Lets CSS hide [data-reveal] content until it scrolls in (see useScrollReveal)
if (canReveal()) document.documentElement.classList.add('js-reveal')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
