import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BackButton from './components/BackButton.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BackButton />
    <App />
  </StrictMode>,
)
