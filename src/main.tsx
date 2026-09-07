import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import '@fontsource/anton/latin-400.css'
import '@fontsource/space-mono/latin-400.css'
import '@fontsource/space-mono/latin-700.css'
import './styles/base.css'
import './styles/sections.css'

import App from './App'

// Signals that the bundle executed. Every pre-animation state is scoped to
// `.js`, so if this never runs, nothing on the page is hidden.
document.documentElement.classList.add('js')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
