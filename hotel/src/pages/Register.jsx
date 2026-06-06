import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, phone, password }));
  };

  useEffect(() => {
    if (isSuccess && user) {
      navigate(user.isAdmin ? "/admin" : "/");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Navbar />

      <main className="max-w-md w-full mx-auto px-6 pt-32 pb-20 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 premium-shadow space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-dark">Join FastBite!</h2>
            <p className="text-xs text-gray-400 font-light">
              Create a free account to order premium burgers & get lightning fast delivery.
            </p>
          </div>

          {isError && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 text-center">
              ⚠️ {message || "Registration failed"}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-50 text-xs focus:outline-none text-dark focus:border-primary transition"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@email.com"
                className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-50 text-xs focus:outline-none text-dark focus:border-primary transition"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Phone Number (10 Digits)
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-50 text-xs focus:outline-none text-dark focus:border-primary transition"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-50 text-xs focus:outline-none text-dark focus:border-primary transition"
                required
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-extrabold py-3.5 rounded-xl shadow-md shadow-primary/10 transition hover:scale-[1.01] text-xs cursor-pointer disabled:opacity-50 mt-2"
            >
              {isLoading ? "Creating account..." : "Register Account"}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline">
              Log In
            </Link>
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
