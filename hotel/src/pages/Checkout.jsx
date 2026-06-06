import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { createOrder } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems = [], appliedCoupon, discountPercentage } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.order);

  // Form Fields
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // UPI Card Info states
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const [formError, setFormError] = useState("");

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const discount = Math.round((subtotal * discountPercentage) / 100);
  const grandTotal = subtotal + gst + deliveryFee - discount;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!address) {
      setFormError("Delivery address is required");
      return;
    }
    if (!phone || phone.length < 10) {
      setFormError("Please enter a valid 10-digit phone number");
      return;
    }

    if (paymentMethod === "UPI" && !upiId.includes("@")) {
      setFormError("Please enter a valid UPI ID (e.g. name@okaxis)");
      return;
    }

    if (paymentMethod === "Card") {
      if (cardNumber.replace(/\s/g, "").length < 16) {
        setFormError("Card number must be 16 digits");
        return;
      }
      if (!cardExpiry || !cardExpiry.includes("/")) {
        setFormError("Expiry must be in MM/YY format");
        return;
      }
      if (cardCvv.length < 3) {
        setFormError("CVV must be 3 digits");
        return;
      }
      if (!cardName) {
        setFormError("Cardholder name is required");
        return;
      }
    }

    // Prepare API Order Data
    const orderData = {
      items: cartItems.map((item) => ({
        menuItem: item.menuItem,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: grandTotal,
      address,
      phoneNumber: phone,
      paymentMethod,
    };

    try {
      const result = await dispatch(createOrder(orderData)).unwrap();
      if (result) {
        dispatch(clearCart());
        navigate("/orders");
      }
    } catch (error) {
      setFormError(error || "Failed to place order. Try again.");
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = value.replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) {
      setCardExpiry(value);
    } else {
      setCardExpiry(`${value.slice(0, 2)}/${value.slice(2, 4)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 w-full flex-1">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight text-dark">
          Secure Checkout 🔒
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl max-w-md mx-auto border border-gray-100">
            <h2 className="text-xl font-bold text-dark">No Items to Checkout</h2>
            <Link to="/menu" className="mt-4 inline-block bg-primary text-white px-6 py-2.5 rounded-xl font-bold">
              Go to Menu
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            
            {/* Form Column */}
            <form onSubmit={handleSubmitOrder} className="lg:col-span-8 space-y-6">
              
              {/* Shipping Address & Phone */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-5">
                <h3 className="text-lg font-extrabold text-dark border-b border-gray-50 pb-3 flex items-center gap-2">
                  <span>📍</span> Delivery Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                      Full Delivery Address
                    </label>
                    <textarea
                      placeholder="Street address, apartment, city, state, pincode..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows="3"
                      className="w-full px-4 py-3 bg-bg-light rounded-2xl border border-orange-100 text-sm focus:outline-none text-dark focus:border-primary transition"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                      Contact Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      className="w-full px-4 py-3 bg-bg-light rounded-2xl border border-orange-100 text-sm focus:outline-none text-dark focus:border-primary transition"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-lg font-extrabold text-dark border-b border-gray-50 pb-3 flex items-center gap-2">
                  <span>💳</span> Payment Options
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  {/* Option COD */}
                  <label
                    className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-2 cursor-pointer transition ${
                      paymentMethod === "Cash on Delivery"
                        ? "border-primary bg-orange-50/25"
                        : "border-orange-50 hover:bg-orange-50/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Cash on Delivery"
                      checked={paymentMethod === "Cash on Delivery"}
                      onChange={() => setPaymentMethod("Cash on Delivery")}
                      className="sr-only"
                    />
                    <span className="text-2xl">💵</span>
                    <span className="text-sm font-bold text-dark">Cash on Delivery</span>
                  </label>

                  {/* Option UPI */}
                  <label
                    className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-2 cursor-pointer transition ${
                      paymentMethod === "UPI"
                        ? "border-primary bg-orange-50/25"
                        : "border-orange-50 hover:bg-orange-50/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="UPI"
                      checked={paymentMethod === "UPI"}
                      onChange={() => setPaymentMethod("UPI")}
                      className="sr-only"
                    />
                    <span className="text-2xl">📱</span>
                    <span className="text-sm font-bold text-dark">Instant UPI</span>
                  </label>

                  {/* Option Card */}
                  <label
                    className={`p-5 rounded-2xl border-2 flex flex-col items-center gap-2 cursor-pointer transition ${
                      paymentMethod === "Card"
                        ? "border-primary bg-orange-50/25"
                        : "border-orange-50 hover:bg-orange-50/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="Card"
                      checked={paymentMethod === "Card"}
                      onChange={() => setPaymentMethod("Card")}
                      className="sr-only"
                    />
                    <span className="text-2xl">💳</span>
                    <span className="text-sm font-bold text-dark">Credit/Debit Card</span>
                  </label>
                </div>

                {/* Interactive UPI Panel */}
                <AnimatePresence>
                  {paymentMethod === "UPI" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden space-y-4 pt-4 border-t border-gray-50"
                    >
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                          Enter UPI ID
                        </label>
                        <input
                          type="text"
                          placeholder="username@bank"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full px-4 py-3 bg-bg-light rounded-2xl border border-orange-100 text-sm focus:outline-none text-dark focus:border-primary transition"
                        />
                        <p className="text-[10px] text-gray-400 mt-2 font-medium">
                          💡 You will receive a verification request in your UPI App.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Interactive Card Panel */}
                <AnimatePresence>
                  {paymentMethod === "Card" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden space-y-6 pt-4 border-t border-gray-50 grid md:grid-cols-12 gap-6 items-center"
                    >
                      {/* Virtual Card Preview */}
                      <div className="md:col-span-5 flex justify-center">
                        <div className="w-64 h-36 bg-gradient-to-br from-primary to-accent text-white p-4 rounded-2xl shadow-lg relative flex flex-col justify-between font-mono">
                          <div className="flex justify-between items-start">
                            <span className="text-lg font-bold italic tracking-wide">FASTBITE</span>
                            <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Debit</span>
                          </div>
                          
                          <div className="text-sm font-semibold tracking-widest py-2">
                            {cardNumber || "•••• •••• •••• ••••"}
                          </div>

                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-[7px] text-gray-200 uppercase font-sans">Cardholder</p>
                              <p className="text-[10px] font-bold tracking-wide uppercase truncate w-32">
                                {cardName || "NAME HERE"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-[7px] text-gray-200 uppercase font-sans">Expiry</p>
                              <p className="text-[10px] font-bold">{cardExpiry || "MM/YY"}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Input Form */}
                      <div className="md:col-span-7 space-y-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Card Number"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-100 text-xs focus:outline-none text-dark focus:border-primary transition font-mono"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Cardholder Name"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-100 text-xs focus:outline-none text-dark focus:border-primary transition"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={handleExpiryChange}
                            className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-100 text-xs focus:outline-none text-dark focus:border-primary transition font-mono"
                          />
                          <input
                            type="password"
                            placeholder="CVV"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                            className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-100 text-xs focus:outline-none text-dark focus:border-primary transition font-mono"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </form>

            {/* Receipt Summary Column */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-gray-100 premium-shadow space-y-6">
              <h3 className="font-extrabold text-lg text-dark pb-3 border-b border-gray-100">
                Summary
              </h3>

              <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span className="text-dark font-extrabold text-xs">{item.name}</span>
                      <span className="text-gray-400 text-[10px] font-medium">{item.quantity} x ₹{item.price}</span>
                    </div>
                    <span className="text-dark font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-50 pt-4 space-y-2.5 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-dark font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="text-dark font-semibold">₹{gst}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-dark font-semibold">
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 bg-green-50/20 p-2 rounded-xl">
                    <span>Discount ({discountPercentage}%)</span>
                    <span className="font-bold">-₹{discount}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="font-extrabold text-dark text-sm">Grand Total</span>
                <span className="text-2xl font-black text-primary">₹{grandTotal}</span>
              </div>

              {formError && (
                <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100">
                  ⚠️ {formError}
                </div>
              )}

              <button
                onClick={handleSubmitOrder}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-hover text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-primary/10 transition hover:scale-[1.01] text-sm tracking-wide disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Processing Order..." : "Place Order 🚀"}
              </button>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
