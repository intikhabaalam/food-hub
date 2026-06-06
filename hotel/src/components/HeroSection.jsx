import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center pt-24 pb-12 overflow-hidden bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#251508]">
      
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-12 gap-8 items-center">
        
        {/* Left Content (Text and CTAs) */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white max-w-xl text-center md:text-left md:col-span-7 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-widest">
              Fastest Food Delivery in Town
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-md">
            Taste That <br />
            <span className="text-gradient">Hits Different</span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light">
            Biting into perfection! Experience our premium flame-grilled burgers, loaded fries, and crazy combos crafted with fresh ingredients, served sizzling hot and delivered fast.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/menu"
              className="inline-block bg-primary hover:bg-primary-hover text-white text-center px-8 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              Explore Menu 🍔
            </Link>
            <Link
              to="/booking"
              className="inline-block bg-white/10 hover:bg-white/15 text-white text-center px-8 py-4 rounded-2xl font-bold border border-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
            >
              Pre-Book Table 🍽️
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 max-w-md mx-auto md:mx-0">
            <div>
              <p className="text-3xl font-black text-white">15m</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Avg. Delivery Time</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">4.8★</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Customer Rating</p>
            </div>
            <div>
              <p className="text-3xl font-black text-white">35+</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Fresh Items</p>
            </div>
          </div>
        </motion.div>

        {/* Right Content (Featured Promo Card) */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="md:col-span-5 flex justify-center"
        >
          <div className="relative group w-full max-w-[340px]">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-[32px] blur-xl opacity-20 group-hover:opacity-35 transition duration-500"></div>
            
            {/* The Floating Card */}
            <div className="relative bg-[#1a1a1a]/90 border border-white/10 backdrop-blur-md p-6 rounded-[32px] shadow-2xl flex flex-col space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-800">
                <img
                  src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600"
                  alt="Double Cheese Smasher"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-secondary text-dark text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  Best Seller
                </span>
              </div>

              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-extrabold text-xl text-white">Double Cheese Smasher</h4>
                  <span className="text-sm font-bold text-secondary">₹189</span>
                </div>
                <p className="text-xs text-gray-400 mt-1 font-light leading-relaxed">
                  Two smashed beef patties, double cheddar cheese, and caramelized onions.
                </p>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                  <span className="text-xs text-gray-300 font-semibold">(4.9)</span>
                </div>
                <Link
                  to="/menu"
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-md shadow-primary/10"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}