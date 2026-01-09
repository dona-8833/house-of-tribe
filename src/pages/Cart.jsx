import { useCart } from "../context/CartContext";
import CartItem from "../components/layout/CartItem";
import Layout from "../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();
  const { cart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
            Your Cart
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart
                className="mx-auto h-16 w-16 text-gray-400"
                aria-hidden="true"
              />
              <p className="mt-4 text-base md:text-lg text-gray-600">
                Your cart is empty.
              </p>
              <a
                href="/search"
                className="mt-6 inline-flex items-center px-4 py-2 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Shop now"
              >
                Shop Now
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Left side - Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, i) => (
                  <CartItem key={`${item.id}-${item.size}-${i}`} item={item} />
                ))}
              </div>

              {/* Right side - Order Summary */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-fit">
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="flex justify-between text-gray-600 text-base mb-2">
                  <span>Subtotal</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-base mb-4">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <button
                  className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onClick={() => navigate("/checkout")}
                  aria-label="Proceed to checkout"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}