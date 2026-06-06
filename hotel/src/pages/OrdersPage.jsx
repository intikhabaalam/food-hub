import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchMyOrders } from "../features/order/orderSlice";
import { Link } from "react-router-dom";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { myOrders = [], loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, user]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700 border-green-150";
      case "Cancelled":
        return "bg-red-50 text-red-700 border-red-150";
      default:
        return "bg-yellow-50 text-yellow-700 border-yellow-150";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20 w-full flex-1">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            Order Status
          </span>
          <h1 className="text-4xl font-extrabold mt-2 tracking-tight text-dark">
            My Orders 📦
          </h1>
        </div>

        {!user ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 max-w-md mx-auto shadow-sm">
            <p className="text-dark font-bold">Please login to track your fast food orders</p>
            <Link
              to="/login"
              className="inline-block mt-6 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
            >
              Login Now
            </Link>
          </div>
        ) : loading ? (
          <div className="text-center py-20">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : myOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 max-w-md mx-auto shadow-sm">
            <span className="text-5xl">🛍️</span>
            <h3 className="text-xl font-bold mt-4 text-dark font-extrabold">No Orders Yet</h3>
            <p className="text-gray-400 mt-2 text-xs font-light">
              You haven't ordered any delicious burgers or sides yet.
            </p>
            <Link
              to="/menu"
              className="inline-block mt-6 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-2.5 rounded-xl text-xs transition"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence>
              {myOrders.map((order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 premium-shadow space-y-5"
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-50 pb-4 gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Order ID: #{order._id?.slice(-8).toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-400 font-semibold block mt-0.5">
                        Placed on {formatDate(order.createdAt)}
                      </span>
                    </div>

                    <span
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border self-start sm:self-auto uppercase tracking-wide ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="space-y-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm text-gray-500">
                        <span>
                          <span className="font-extrabold text-dark text-xs">{item.name}</span>
                          <span className="text-[10px] font-bold text-gray-400 ml-2">x {item.quantity}</span>
                        </span>
                        <span className="font-bold text-dark">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping & Payment Info */}
                  <div className="border-t border-gray-50 pt-4 grid sm:grid-cols-2 gap-4 text-[10px] font-medium text-gray-400">
                    <div>
                      <p className="font-bold text-gray-500 uppercase tracking-wider">Delivery Details</p>
                      <p className="mt-1 text-gray-600 leading-relaxed font-light">{order.address}</p>
                      <p className="mt-0.5 text-gray-600 font-semibold">📞 {order.phoneNumber}</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-500 uppercase tracking-wider">Payment Method</p>
                      <p className="mt-1 text-gray-600 font-bold">{order.paymentMethod || "Cash on Delivery"}</p>
                    </div>
                  </div>

                  {/* Grand Total Row */}
                  <div className="border-t border-gray-50 pt-4 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Grand Total</span>
                    <span className="text-2xl font-black text-primary">₹{order.totalAmount}</span>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}