import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { TenantProvider } from './context/TenantContext'

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Router>
        <AuthProvider>
          <TenantProvider>
            <CartProvider>
              <FavoritesProvider>
                <App />
              </FavoritesProvider>
            </CartProvider>
          </TenantProvider>
        </AuthProvider>
      </Router>
    </StrictMode>
  )
}
