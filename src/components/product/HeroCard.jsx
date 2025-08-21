import { useState } from "react";
import { Heart } from "lucide-react";

export default function HeroCard({ title, category, image }) {
  const [isOpen, setIsOpen] = useState(false); // Renamed for clarity
  const [isLiked, setIsLiked] = useState(false); // Renamed for clarity

  return (
    <>
      {/* Card */}
      <div
        className="relative w-full sm:w-64 rounded-xl overflow-hidden cursor-pointer shadow-lg group hover:shadow-xl transition-shadow duration-300"
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)} // Accessibility: keyboard support
        aria-label={`View details for ${title}`}
      >
        {/* Image */}
        <div className="relative w-full h-64 sm:h-72 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy" // Performance: lazy load images
          />
          {/* Image overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30" />
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md opacity-80 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          aria-label={isLiked ? `Remove ${title} from wishlist` : `Add ${title} to wishlist`}
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Content */}
        <div className="p-4 bg-white flex flex-col items-start space-y-2">
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full px-2 py-1 uppercase">
            {category}
          </span>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Full view of ${title}`}
        >
          <div className="relative max-w-4xl w-full">
            <img
              src={image}
              alt={title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close image modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}