import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

createRoot(document.getElementById('root')).render(
<PayPalScriptProvider
  options={{
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
  }}
>
  <CartProvider>
    <App />
  </CartProvider>
</PayPalScriptProvider>

);
