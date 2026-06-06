import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import {
  addBooking,
  fetchBookings,
  deleteBooking,
} from "../features/booking/bookingSlice";

export default function Booking() {
  const dispatch = useDispatch();
  const { bookings = [], isLoading } = useSelector((state) => state.booking);
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(fetchBookings());
    }
  }, [dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addBooking({
        name,
        date,
        time: date,
        persons: Number(guests),
      })
    ).then(() => {
      setSuccessMsg("Table reservation request submitted!");
      dispatch(fetchBookings());
      setTimeout(() => setSuccessMsg(""), 3000);
    });

    setName("");
    setGuests(1);
    setDate("");
  };

  const handleCancelBooking = (id) => {
    dispatch(deleteBooking(id)).then(() => {
      dispatch(fetchBookings());
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 w-full flex-1">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            Dine-in Experience
          </span>
          <h1 className="text-4xl font-extrabold mt-2 tracking-tight text-dark">
            Pre-Book a Table 🍽️
          </h1>
          <p className="text-sm text-gray-400 mt-2 font-light">
            Skip the queues! Pre-book your table at our outlet, select your slots, and enjoy fresh, hot food served immediately.
          </p>
        </div>

        {!user ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 max-w-md mx-auto shadow-sm">
            <p className="text-dark font-bold">Please login to book a table and track your reservations</p>
            <a
              href="/login"
              className="inline-block mt-6 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
            >
              Login Now
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-12 gap-8 items-start">
            
            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4"
            >
              <h3 className="font-extrabold text-dark text-base border-b border-gray-50 pb-2">
                New Reservation
              </h3>

              {successMsg && (
                <div className="p-3 bg-green-50 text-green-700 text-xs font-bold rounded-xl border border-green-100">
                  ✓ {successMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Reservation name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-100 text-xs focus:outline-none text-dark focus:border-primary transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    placeholder="Number of guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-100 text-xs focus:outline-none text-dark focus:border-primary transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5">
                    Date & Time Slot
                  </label>
                  <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-100 text-xs focus:outline-none text-dark focus:border-primary transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-extrabold py-3 rounded-xl shadow-md shadow-primary/10 transition hover:scale-[1.01] text-xs cursor-pointer"
                >
                  Book Table Now
                </button>
              </form>
            </motion.div>

            {/* List Column */}
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-extrabold text-dark text-base pl-2">
                My Reservations ({bookings.length})
              </h3>

              {isLoading ? (
                <div className="text-center py-6 text-xs text-gray-400">Loading bookings...</div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-3xl border border-gray-100 text-gray-400 italic text-xs">
                  You have no table reservations.
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {bookings.map((b, index) => (
                      <motion.div
                        key={b._id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex justify-between items-center"
                      >
                        <div className="space-y-1">
                          <p className="text-xs text-gray-400 font-bold">
                            RESERVATION #{b._id?.slice(-6).toUpperCase()}
                          </p>
                          <h4 className="font-extrabold text-dark text-sm">{b.name || user.name}</h4>
                          <div className="text-xs text-gray-500 font-medium">
                            <p>📅 {b.date ? new Date(b.date).toLocaleString() : "Date N/A"}</p>
                            <p>👥 {b.persons} Persons</p>
                          </div>
                          <span className="inline-block mt-2 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-yellow-50 text-yellow-700 border border-yellow-100">
                            {b.status || "Pending Approval"}
                          </span>
                        </div>

                        <button
                          onClick={() => handleCancelBooking(b._id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}