import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

createRoot(document.getElementById('root')).render(
<PayPalScriptProvider
  options={{
    "client-id": "AfL7hjB2ajPed_M0l7xwOVRFaPp2yg3-Bb1KhRMIQUozh3kRxlF3RCsynIoJ4jgIv870E53iC2kal19_",
    currency: "USD",
  }}
>
  <CartProvider>
    <App />
  </CartProvider>
</PayPalScriptProvider>

);
