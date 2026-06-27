import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BackButton from './components/BackButton.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import FloatingParticles from './components/FloatingParticles.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FloatingParticles />
    <CustomCursor />
    <BackButton />
    <App />
  </StrictMode>,
)
