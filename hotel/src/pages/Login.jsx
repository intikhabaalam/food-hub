import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../features/auth/authSlice";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "";

  const { user, isSuccess, isLoading, isError, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user && isSuccess) {
      if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate(user.isAdmin ? "/admin" : "/");
      }
      dispatch(reset());
    }
    // Clean up stale error state when component unmounts
    return () => {
      dispatch(reset());
    };
  }, [user, isSuccess, navigate, redirect, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Navbar />

      <main className="max-w-md w-full mx-auto px-6 pt-36 pb-20 flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-8 rounded-3xl border border-gray-100 premium-shadow space-y-6"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-dark">Welcome Back!</h2>
            <p className="text-xs text-gray-400 font-light">
              Log in to your FASTBITE account to order food & track delivery.
            </p>
          </div>

          {isError && (
            <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 text-center">
              ⚠️ {message || "Failed to log in"}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
              {isLoading ? "Signing in..." : "Log In"}
            </button>
          </form>

          <p className="text-xs text-center text-gray-400 font-medium">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-bold hover:underline">
              Sign Up Free
            </Link>
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
