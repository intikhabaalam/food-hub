import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 w-full flex-1">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            Get in Touch
          </span>
          <h1 className="text-4xl font-extrabold mt-2 tracking-tight text-dark">
            We'd Love to Hear From You ✉️
          </h1>
          <p className="text-sm text-gray-400 mt-2 font-light">
            Have questions about delivery, franchise inquiries, or feedback? Send us a message!
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Info Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#121212] to-[#251508] text-white p-8 rounded-3xl space-y-6 shadow-xl">
            <h3 className="font-extrabold text-xl">FASTBITE HQ</h3>
            
            <div className="space-y-4 text-sm font-light">
              <div className="flex items-start gap-3">
                <span className="text-lg">📍</span>
                <div>
                  <p className="font-bold text-white">Our Location</p>
                  <p className="text-gray-400 mt-0.5">Toronto Colony, Barnagar, MP, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg">📞</span>
                <div>
                  <p className="font-bold text-white">Call Us</p>
                  <a href="tel:+919827550629" className="text-primary font-bold hover:underline block mt-0.5">
                    +91 9827550629
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-lg">✉️</span>
                <div>
                  <p className="font-bold text-white">Email Address</p>
                  <p className="text-gray-400 mt-0.5">support@fastbite.com</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4">
              <p className="text-xs text-gray-400">
                🚀 Delivery support is active daily from 11:00 AM to 11:00 PM.
              </p>
            </div>
          </div>

          {/* Form Card */}
          <div className="md:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
            {submitted ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-10 space-y-3"
              >
                <span className="text-4xl">🎉</span>
                <h3 className="text-xl font-bold text-dark">Thank You for Writing!</h3>
                <p className="text-xs text-gray-400 font-light max-w-xs mx-auto">
                  Your message has been logged. Our customer service crew will reach out within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-100 text-xs focus:outline-none text-dark focus:border-primary transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-100 text-xs focus:outline-none text-dark focus:border-primary transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Message
                  </label>
                  <textarea
                    placeholder="Type your query or feedback here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-100 text-xs focus:outline-none text-dark focus:border-primary transition"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-extrabold py-3 rounded-xl shadow-md shadow-primary/10 transition hover:scale-[1.01] text-xs cursor-pointer"
                >
                  Send Message 🚀
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
