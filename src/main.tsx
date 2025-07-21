import { validateEnv } from '@/config/env'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Validate environment variables before starting the app
try {
  validateEnv()
} catch (error) {
  console.error('Failed to validate environment variables:', error)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
