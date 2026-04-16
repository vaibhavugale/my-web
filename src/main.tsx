import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import clarity from '@microsoft/clarity'
import './index.css'
import App from './App.tsx'

// TODO: Replace 'YOUR_PROJECT_ID' with your real Microsoft Clarity Project ID
clarity.init('wci0l3750r');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
