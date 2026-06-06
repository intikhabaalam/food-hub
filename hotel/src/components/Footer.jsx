import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-gray-400 mt-auto border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h4 className="text-2xl font-black text-white tracking-tight">
            FAST<span className="text-primary">BITE</span>
          </h4>
          <p className="text-sm leading-relaxed">
            Hot, Fresh & Delivered Fast. Crafting premium burgers, crispy fries, and delicious meals that hit different.
          </p>
          <div className="flex gap-3 pt-2">
            <span className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition flex items-center justify-center cursor-pointer">
              𝕏
            </span>
            <span className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition flex items-center justify-center cursor-pointer">
              📸
            </span>
            <span className="w-8 h-8 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary transition flex items-center justify-center cursor-pointer">
              📘
            </span>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h5 className="font-bold text-white tracking-wide text-sm uppercase">Contact Us</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:+919827550629" className="hover:text-primary transition flex items-center gap-2">
                <span>📞</span> +91 9827550629
              </a>
            </li>
            <li>
              <span className="flex items-center gap-2">
                <span>✉️</span> support@fastbite.com
              </span>
            </li>
            <li>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition flex items-start gap-2"
              >
                <span>📍</span>
                <span>Toronto Colony, Barnagar, MP, India</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links Section */}
        <div className="space-y-4">
          <h5 className="font-bold text-white tracking-wide text-sm uppercase">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/menu" className="hover:text-primary transition">
                Explore Menu
              </Link>
            </li>
            <li>
              <Link to="/booking" className="hover:text-primary transition">
                Pre-Book Table
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-primary transition">
                Track Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Hours Section */}
        <div className="space-y-4">
          <h5 className="font-bold text-white tracking-wide text-sm uppercase">Opening Hours</h5>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Mon - Fri:</span>
              <span className="text-white font-semibold">11:00 - 23:00</span>
            </li>
            <li className="flex justify-between">
              <span>Sat - Sun:</span>
              <span className="text-white font-semibold">10:00 - 00:00</span>
            </li>
            <li className="text-xs text-primary font-medium mt-2">
              🔥 Free delivery on orders above ₹500!
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/5 text-center py-6 text-xs text-gray-500">
        © {new Date().getFullYear()} FASTBITE Delivery Inc. All rights reserved.
      </div>
    </footer>
  );
}