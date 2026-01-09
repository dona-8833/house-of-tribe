// components/CartItem.jsx
import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {
  const { incrementQty, decrementQty, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 mb-4">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-lg"
      />

      {/* Info */}
      <div className="flex flex-col flex-1 px-4">
        <h3 className="font-semibold text-gray-800">{item.title}</h3>
        <p className="text-gray-500 text-sm">Size: {item.size}</p>
        <p className="font-bold text-accent2">£{item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => decrementQty(item.id, item.size)}
          className="px-2 py-1 bg-gray-200 rounded-lg"
        >
          -
        </button>
        <span className="px-2">{item.quantity}</span>
        <button
          onClick={() => incrementQty(item.id, item.size)}
          className="px-2 py-1 bg-gray-200 rounded-lg"
        >
          +
        </button>
      </div>

      {/* Remove */}
      <button
        onClick={() => removeFromCart(item.id, item.size)}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </div>
  );
}
