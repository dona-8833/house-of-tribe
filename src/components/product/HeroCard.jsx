import { useState } from "react";
import { Heart } from "lucide-react"; // optional icon library

export default function HeroCard({ title, category, image }) {
  const [open, setOpen] = useState(false); // modal for full-size image
  const [liked, setLiked] = useState(false); // wishlist toggle


  return (
    <>
      {/* Card */}
      <div
        className="relative w-full sm:w-60 rounded-2xl overflow-hidden cursor-pointer shadow-2xl group"
        onClick={() => setOpen(true)}
      >
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-64 sm:h-72 object-cover filter brightness-75 transition-transform duration-500 group-hover:scale-105 group-hover:brightness-90"
        />

        {/* Love Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-3 right-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity text-red-500 bg-white rounded-full p-2 shadow-md"
        >
          <Heart className={`w-5 h-5 ${liked ? "fill-red-500" : ""}`} />
        </button>

        {/* Content */}
        <div className="px-3 py-2 text-black bg-white flex flex-col items-start space-y-2 justify-between">
          <p className="text-accent2 font-medium border rounded-md p-0.5 text-[10px] ">
            {category}
          </p>
          <h3 className="text-sm md:text-xl font-bold">{title}</h3>



        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <img src={image} alt={title} className="max-w-full max-h-full" />
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
