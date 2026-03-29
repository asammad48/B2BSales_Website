import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './styles/tokens.css';
import './styles/global.css';
import { ThemeProvider } from './theme/ThemeProvider';
import { AuthProvider } from './state/AuthContext';
import { LanguageProvider } from './state/LanguageContext';
import { CartProvider } from './state/CartContext';
import { ShopProvider } from './state/ShopContext';
import { ToastProvider } from './components/common/ToastProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              <ShopProvider>
                <CartProvider>
                  <App />
                </CartProvider>
              </ShopProvider>
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
