import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  applyCoupon,
  clearCart
} from "../features/cart/cartSlice";

export default function Cart() {
  const { cartItems = [], appliedCoupon, discountPercentage } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    if (!couponInput) {
      setCouponError("Please enter a coupon code");
      return;
    }

    try {
      // Redux slice throws error on invalid coupon
      dispatch(applyCoupon(couponInput));
      setCouponSuccess(`Coupon ${couponInput.toUpperCase()} applied successfully!`);
      setCouponInput("");
    } catch (err) {
      setCouponError("Invalid coupon code! Try FAST20 or WELCOME10.");
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 40;
  const discount = Math.round((subtotal * discountPercentage) / 100);
  const grandTotal = subtotal + gst + deliveryFee - discount;

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 w-full flex-1">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight text-dark">
          Shopping Cart 🛒
        </h1>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-gray-100 premium-shadow max-w-lg mx-auto"
          >
            <span className="text-6xl">🍔</span>
            <h2 className="text-2xl font-bold mt-6 text-dark">Your Cart is Empty</h2>
            <p className="text-gray-400 mt-2 text-sm font-light">
              Add delicious fast food items from our menu to get started!
            </p>
            <Link
              to="/menu"
              className="inline-block mt-8 bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-primary/10 transition"
            >
              Browse Menu
            </Link>
          </motion.div>
        ) : (
          /* Active Cart Layout */
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Items Column */}
            <div className="lg:col-span-8 space-y-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.menuItem}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex flex-col sm:flex-row items-center gap-5 p-5 bg-white rounded-3xl border border-gray-50 shadow-sm"
                  >
                    {/* Item Image */}
                    <img
                      src={item.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100"}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover shadow-inner bg-gray-50"
                    />

                    {/* Item Title & Price */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-extrabold text-dark text-lg">{item.name}</h3>
                      <p className="text-primary font-black mt-1">₹{item.price}</p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-3 bg-bg-light px-3 py-2 rounded-2xl border border-orange-50">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.menuItem))}
                        className="w-7 h-7 rounded-xl bg-white hover:bg-orange-100 flex items-center justify-center font-bold text-dark shadow-sm transition cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-black text-sm text-dark w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.menuItem))}
                        className="w-7 h-7 rounded-xl bg-white hover:bg-orange-100 flex items-center justify-center font-bold text-dark shadow-sm transition cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="flex items-center gap-6">
                      <span className="font-black text-dark text-lg w-20 text-right">
                        ₹{item.price * item.quantity}
                      </span>
                      
                      <button
                        onClick={() => dispatch(removeFromCart(item.menuItem))}
                        className="text-gray-400 hover:text-red-500 transition cursor-pointer p-1.5 hover:bg-red-50 rounded-xl"
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Clear Cart Trigger */}
              <div className="flex justify-end">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-xs font-bold text-gray-400 hover:text-red-500 transition cursor-pointer"
                >
                  Clear All Cart Items
                </button>
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Promo Form */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
                <h4 className="font-extrabold text-sm text-dark">Have a Promo Code?</h4>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="FAST20, WELCOME10..."
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 bg-bg-light rounded-xl border border-orange-50 text-xs focus:outline-none text-dark"
                  />
                  <button
                    type="submit"
                    className="bg-dark hover:bg-dark/95 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {couponError && <p className="text-[10px] font-bold text-red-500">{couponError}</p>}
                {couponSuccess && <p className="text-[10px] font-bold text-green-500">{couponSuccess}</p>}
                {appliedCoupon && (
                  <div className="flex justify-between items-center bg-green-50/50 border border-green-100 p-2.5 rounded-xl mt-2">
                    <span className="text-[10px] font-bold text-green-700">Code {appliedCoupon} applied! ({discountPercentage}% Off)</span>
                    <button
                      onClick={() => dispatch(applyCoupon(""))}
                      className="text-xs text-red-500 font-bold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Order breakdown card */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 premium-shadow space-y-5">
                <h3 className="font-extrabold text-lg text-dark pb-3 border-b border-gray-100">
                  Order Summary
                </h3>

                <div className="space-y-3 text-sm text-gray-500">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-dark font-bold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span className="text-dark font-bold">₹{gst}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="text-dark font-bold">
                      {deliveryFee === 0 ? (
                        <span className="text-green-500 font-bold">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 bg-green-50/40 p-2 rounded-xl">
                      <span>Discount ({discountPercentage}%)</span>
                      <span className="font-bold">-₹{discount}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="font-extrabold text-dark">Grand Total</span>
                  <span className="text-3xl font-black text-primary">₹{grandTotal}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary-hover text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-primary/10 transition hover:scale-[1.01] text-sm tracking-wide cursor-pointer"
                >
                  Proceed to Checkout
                </button>

                {subtotal < 500 && (
                  <p className="text-[10px] text-gray-400 text-center font-medium">
                    💡 Add ₹{500 - subtotal} more for free delivery!
                  </p>
                )}
              </div>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
