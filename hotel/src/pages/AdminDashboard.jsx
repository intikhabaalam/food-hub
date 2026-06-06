import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { updateOrderStatus } from "../features/order/orderSlice";

// MENU
import {
  fetchMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../features/menu/menuSlice";

// BOOKINGS
import {
  fetchBookings,
  deleteBooking,
} from "../features/booking/bookingSlice";

// ORDERS
import { fetchAllOrders } from "../features/order/orderSlice";

// STATS
import { fetchStats } from "../features/admin/adminSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { items = [] } = useSelector((state) => state.menu);
  const { bookings = [] } = useSelector((state) => state.booking);
  const { orders: allOrders = [] } = useSelector((state) => state.order);
  const { stats = {}, isLoading: statsLoading } = useSelector((state) => state.admin);

  const [activeTab, setActiveTab] = useState("analytics");
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Burgers");

  const categoriesList = [
    "Burgers",
    "Fries",
    "Fried Chicken",
    "Wraps",
    "Pizza",
    "Sandwiches",
    "Drinks",
    "Desserts",
    "Combo Meals"
  ];

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchBookings());
    dispatch(fetchAllOrders());
    dispatch(fetchStats());
  }, [dispatch]);

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
    setCategory("Burgers");
  };

  const handleSave = () => {
    if (!name || !price || !image) {
      alert("All fields required");
      return;
    }

    if (editingId) {
      dispatch(
        updateMenuItem({
          id: editingId,
          menuData: { name, price: Number(price), image, description, category },
        })
      ).then(() => dispatch(fetchStats()));
    } else {
      dispatch(
        addMenuItem({
          name,
          price: Number(price),
          image,
          description: description || "Delicious fast food item",
          category,
        })
      ).then(() => dispatch(fetchStats()));
    }
    resetForm();
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus })).then(() => {
      dispatch(fetchStats());
      dispatch(fetchAllOrders());
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // Safe Stats Destructuring
  const {
    users = 0,
    menuItems = 0,
    totalOrders = 0,
    totalRevenue = 0,
    statusBreakdown = { Pending: 0, Completed: 0, Cancelled: 0 },
    bestSellingItems = [],
    monthlyRevenue = [],
  } = stats;

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 w-full flex-1">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            Control Room
          </span>
          <h1 className="text-4xl font-extrabold mt-2 tracking-tight text-dark">
            FASTBITE Portal ⚙️
          </h1>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 bg-white p-2.5 rounded-2xl border border-gray-150 shadow-sm max-w-xl mx-auto">
          {["analytics", "menu", "orders", "bookings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                activeTab === tab
                  ? "bg-primary text-white shadow-md shadow-primary/20"
                  : "text-gray-500 hover:text-primary hover:bg-orange-50/20"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ================= ANALYTICS TAB ================= */}
        {activeTab === "analytics" && (
          <div className="space-y-10">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              {/* Stat 1 */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <span className="text-3xl">📦</span>
                <div className="mt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase">Total Orders</p>
                  <p className="text-3xl font-black text-dark mt-1">{totalOrders}</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <span className="text-3xl">💰</span>
                <div className="mt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase">Revenue</p>
                  <p className="text-3xl font-black text-primary mt-1">₹{totalRevenue}</p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <span className="text-3xl">👥</span>
                <div className="mt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase">Customers</p>
                  <p className="text-3xl font-black text-dark mt-1">{users}</p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                <span className="text-3xl">🍔</span>
                <div className="mt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase">Menu Items</p>
                  <p className="text-3xl font-black text-secondary mt-1">{menuItems}</p>
                </div>
              </div>

            </div>

            {/* Graphs Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Revenue Trend SVG Chart */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-extrabold text-dark text-base mb-6">Monthly Revenue Graph</h3>
                {monthlyRevenue.length === 0 ? (
                  <div className="h-56 flex items-center justify-center text-xs text-gray-400 italic">
                    No completed order revenue data available yet.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* SVG Bar Chart Visualization */}
                    <div className="h-44 flex items-end justify-around border-b border-gray-100 pb-2">
                      {monthlyRevenue.map((data, idx) => {
                        const maxRev = Math.max(...monthlyRevenue.map(m => m.revenue), 100);
                        const pct = Math.round((data.revenue / maxRev) * 100);
                        return (
                          <div key={idx} className="flex flex-col items-center gap-2 w-full max-w-[40px]">
                            <div className="text-[10px] font-bold text-primary">₹{data.revenue}</div>
                            <div
                              style={{ height: `${Math.max(pct * 1.2, 8)}px` }}
                              className="w-full bg-gradient-to-t from-primary to-orange-400 rounded-t-lg shadow-inner"
                            ></div>
                            <div className="text-[10px] font-bold text-gray-400">{data.month}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Status SVG breakdown */}
              <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-extrabold text-dark text-base mb-6">Order Status Summary</h3>
                <div className="space-y-4">
                  {[
                    { label: "Completed Orders", count: statusBreakdown.Completed, color: "bg-green-500" },
                    { label: "Pending Processing", count: statusBreakdown.Pending, color: "bg-yellow-500" },
                    { label: "Cancelled Orders", count: statusBreakdown.Cancelled, color: "bg-red-500" },
                  ].map((status, index) => {
                    const total = (statusBreakdown.Completed || 0) + (statusBreakdown.Pending || 0) + (statusBreakdown.Cancelled || 0);
                    const pct = total > 0 ? Math.round((status.count / total) * 100) : 0;
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-gray-500">
                          <span>{status.label} ({status.count})</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div style={{ width: `${pct}%` }} className={`h-full ${status.color}`}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Best Sellers Analytics Table */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="font-extrabold text-dark text-base mb-6">🏆 Best Selling Fast Food Items</h3>
              {bestSellingItems.length === 0 ? (
                <p className="text-gray-400 italic text-xs text-center py-4">No completed orders to rank best sellers.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-500">
                    <thead>
                      <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase">
                        <th className="pb-3">Item Name</th>
                        <th className="pb-3 text-center">Quantity Sold</th>
                        <th className="pb-3 text-right">Revenue Generated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bestSellingItems.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-50 last:border-0">
                          <td className="py-3 font-bold text-dark">{item._id}</td>
                          <td className="py-3 text-center font-bold text-secondary">{item.quantity}</td>
                          <td className="py-3 text-right font-black text-primary">₹{item.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ================= MENU CONTROL TAB ================= */}
        {activeTab === "menu" && (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-lg font-extrabold text-dark border-b border-gray-50 pb-2">
                {editingId ? "Update Food Item" : "Create Food Item"}
              </h2>

              <input
                placeholder="Food Item Name"
                className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-50 text-xs focus:outline-none text-dark"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="number"
                placeholder="Price (₹)"
                className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-50 text-xs focus:outline-none text-dark"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-50 text-xs focus:outline-none text-dark cursor-pointer"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <input
                placeholder="Image URL"
                className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-50 text-xs focus:outline-none text-dark"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <textarea
                placeholder="Brief description of the item..."
                rows="3"
                className="w-full px-4 py-2.5 bg-bg-light rounded-xl border border-orange-50 text-xs focus:outline-none text-dark"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-primary hover:bg-primary-hover text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
                >
                  {editingId ? "Update" : "Save Item"}
                </button>
                {editingId && (
                  <button
                    onClick={resetForm}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-8 space-y-4 max-h-[700px] overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-3xl border border-gray-150 shadow-sm flex items-center gap-4 hover:scale-[1.01] transition"
                >
                  <img
                    src={item.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100"}
                    alt={item.name}
                    className="w-16 h-16 rounded-2xl object-cover bg-gray-50 shadow-inner"
                  />

                  <div className="flex-1">
                    <h3 className="font-extrabold text-dark text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                    <p className="text-primary font-black text-sm mt-1">₹{item.price}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="bg-orange-50 hover:bg-orange-100 text-primary font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer"
                      onClick={() => {
                        setEditingId(item._id);
                        setName(item.name);
                        setPrice(item.price);
                        setImage(item.image);
                        setCategory(item.category || "Burgers");
                        setDescription(item.description || "");
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-1.5 rounded-xl text-xs transition cursor-pointer"
                      onClick={() => dispatch(deleteMenuItem(item._id)).then(() => dispatch(fetchStats()))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= ORDERS CONTROL TAB ================= */}
        {activeTab === "orders" && (
          <div className="space-y-5">
            {allOrders.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-3xl border border-gray-100 text-gray-400 italic">No orders received yet.</div>
            ) : (
              allOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:justify-between border-b border-gray-50 pb-4 mb-4 gap-4">
                    <div>
                      <h4 className="font-extrabold text-dark text-sm">
                        Order #{order._id?.slice(-6)}
                      </h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Customer: <span className="font-bold text-gray-600">{order.user?.name}</span> ({order.user?.email})
                      </p>
                      <p className="text-[10px] text-gray-400 mt-0.5">
                        Phone: <span className="font-bold text-gray-600">{order.phoneNumber || "N/A"}</span> | Address: <span className="font-bold text-gray-600">{order.address || "N/A"}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Status select dropdown */}
                      <select
                        value={order.status || "Pending"}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold focus:outline-none cursor-pointer ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-gray-500">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-semibold text-dark">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-50 mt-4 pt-3 flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400">Payment: {order.paymentMethod || "COD"}</span>
                    <div className="text-right">
                      <span className="text-xs text-gray-400 font-bold">Total:</span>
                      <span className="text-lg font-black text-primary ml-1.5">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= DINE-IN BOOKINGS CONTROL TAB ================= */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-3xl border border-gray-100 text-gray-400 italic">No table bookings.</div>
            ) : (
              bookings.map((b) => (
                <div
                  key={b._id}
                  className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="font-extrabold text-dark text-sm">{b.user?.name || b.name || "Guest Customer"}</h4>
                    <p className="text-[10px] text-gray-400">{b.user?.email || "No Email Provided"}</p>
                    <div className="flex gap-4 mt-2 text-xs font-semibold text-gray-500">
                      <span>📅 {b.date ? new Date(b.date).toLocaleString() : "Date N/A"}</span>
                      <span>👥 {b.persons} Guests</span>
                      <span>Status: <span className="text-yellow-600 font-bold">{b.status}</span></span>
                    </div>
                  </div>

                  <button
                    onClick={() => dispatch(deleteBooking(b._id)).then(() => dispatch(fetchStats()))}
                    className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer self-start md:self-auto"
                  >
                    Delete Reservation
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}