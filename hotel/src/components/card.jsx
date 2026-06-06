import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function Card({ title, price, img, badge, children, itemId, rating }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        menuItem: itemId,
        name: title,
        price: Number(price),
        image: img,
        quantity: 1,
      })
    );
    
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden premium-shadow premium-shadow-hover border border-gray-100 flex flex-col h-full"
    >
      {/* Image & Badge */}
      <div className="relative overflow-hidden group h-48 bg-gray-100">
        {img && (
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {badge && (
          <span className="absolute top-4 left-4 text-xs font-bold bg-primary text-white px-3 py-1.5 rounded-full shadow-sm">
            {badge}
          </span>
        )}

        {rating && (
          <span className="absolute top-4 right-4 text-xs font-bold bg-white/95 text-dark px-2.5 py-1.5 rounded-full shadow-sm flex items-center gap-1">
            ⭐ {Number(rating).toFixed(1)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1">
          {children}
        </p>

        {/* Action Row */}
        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium">Price</span>
            <span className="text-2xl font-black text-primary">₹{price}</span>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className={`px-5 py-2.5 rounded-2xl font-bold text-sm transition-all shadow-sm cursor-pointer ${
              added
                ? "bg-green-500 text-white shadow-green-100"
                : "bg-primary hover:bg-primary-hover text-white shadow-orange-100 hover:shadow-lg"
            }`}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}