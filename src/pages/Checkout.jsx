import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  const validateForm = () => {
    const newErrors = {};
    if (!shipping.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!shipping.address.trim()) newErrors.address = "Address is required";
    if (!shipping.city.trim()) newErrors.city = "City is required";
    if (!shipping.state.trim()) newErrors.state = "State is required";
    if (!shipping.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    if (!shipping.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\+?\d{10,14}$/.test(shipping.phone)) newErrors.phone = "Invalid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePlaceOrder = async (paymentMethod, transactionId = null) => {
    if (!user) {
      alert("Please log in to place an order");
      navigate("/login");
      return;
    }

    if (!validateForm()) {
      alert("Please fill in all required fields correctly");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("orders").insert([
        {
          user_id: user.id,
          products: cart,
          total_amount: subtotal,
          shipping_info: shipping,
          payment_method: paymentMethod,
          transaction_id: transactionId,
          status: "pending",
          created_at: new Date(),
        },
      ]);

      if (error) throw error;

      localStorage.removeItem("cart");
      setCart([]);
      alert("Order placed successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error saving order:", err.message);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping Information */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={shipping.fullName}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${errors.fullName ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                disabled={loading}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>
            <div>
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={shipping.phone}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                disabled={loading}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div className="md:col-span-2">
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={shipping.address}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${errors.address ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                disabled={loading}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
            </div>
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shipping.city}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${errors.city ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                disabled={loading}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>
            <div>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={shipping.state}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${errors.state ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                disabled={loading}
              />
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
            <div>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal Code"
                value={shipping.postalCode}
                onChange={handleInputChange}
                className={`w-full p-3 rounded-lg border ${errors.postalCode ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors`}
                disabled={loading}
              />
              {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
            </div>
          </div>
        </div>

        {/* Order Summary and Payment */}
        <div className="lg:col-span-1 space-y-6">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">No items in cart</p>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between py-3 border-b border-gray-200 text-gray-700">
                    <span className="text-sm">{item.title} x {item.quantity}</span>
                    <span className="font-medium">£{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between mt-6 font-bold text-lg">
                  <span>Total</span>
                  <span>£{subtotal.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>

          {/* Payment Options */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Options</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">PayPal</h3>
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: subtotal.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    const details = await actions.order.capture();
                    handlePlaceOrder("paypal", details.id);
                  }}
                  disabled={loading}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}