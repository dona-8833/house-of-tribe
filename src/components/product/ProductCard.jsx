import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Heart, X } from "lucide-react";

export default function ProductCard({
  id = Date.now(),
  title = "Untitled Product",
  category = "General",
  image = "https://via.placeholder.com/200x200?text=No+Image",
  price = 0,
  sizes = [],
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!selectedSize && sizes.length > 0) {
      alert("Please select a size before adding to cart.");
      return;
    }

    addToCart({
      id,
      title,
      category,
      image,
      price,
      size: selectedSize || null,
      quantity: 1,
    });

    setSelectedSize("");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Hide after 3 seconds
  };

  return (
    <>
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <span className="font-medium">{title} added to cart!</span>
          </div>
        </div>
      )}

      {/* Card */}
      <div
        className="relative w-full max-w-[280px] rounded-2xl overflow-hidden cursor-pointer shadow-lg group bg-white transition-all duration-300 hover:shadow-xl"
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
        aria-label={`View details for ${title}`}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Like Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-md transition-all duration-300 hover:bg-white group-hover:opacity-100 opacity-90 md:opacity-0"
            aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-5 h-5 transition-colors duration-200 ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
              {category}
            </span>
            <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          </div>

          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>

          {/* Size Selector */}
          {sizes.length > 0 && (
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-accent transition-colors duration-200"
              aria-label="Select size"
            >
              <option value="">Select size</option>
              {sizes.map((size, idx) => (
                <option key={idx} value={size} className="text-gray-700">
                  {size}
                </option>
              ))}
            </select>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-accent text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-accent2 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={sizes.length > 0 && !selectedSize}
            aria-label={`Add ${title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-labelledby="modal-title"
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-auto max-h-[80vh] object-contain"
              loading="lazy"
            />
            <button
              className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors duration-200"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}