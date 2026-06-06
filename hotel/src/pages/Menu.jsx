import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/card";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "../features/menu/menuSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function Menu() {
  const dispatch = useDispatch();
  const { items = [], isLoading } = useSelector((state) => state.menu);

  // States for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const menuItems = Array.isArray(items) ? items : [];

  const categories = [
    "All",
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

  // Dynamic max price calculation
  const highestPriceInMenu = menuItems.reduce((max, item) => (item.price > max ? item.price : max), 1000);
  
  useEffect(() => {
    if (menuItems.length > 0) {
      setMaxPrice(highestPriceInMenu);
    }
  }, [highestPriceInMenu, menuItems.length]);

  // Filter and Sort Logic
  const filteredItems = menuItems
    .filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesPrice = item.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // default (no sorting)
    });

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Navbar />

      {/* Hero Banner Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#121212] to-[#251508] text-white text-center px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs font-bold text-primary tracking-widest uppercase">
            Fresh & Handcrafted
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Our Premium Menu 🍔
          </h1>
          <p className="text-sm text-gray-400 max-w-md mx-auto font-light">
            Every bite is loaded with freshness. Find your favorite burgers, loaded sides, combos, and shakes below.
          </p>
        </div>
      </section>

      {/* Main Content & Filters */}
      <main className="max-w-6xl mx-auto px-6 py-12 w-full flex-1">
        
        {/* Filter Controls Row */}
        <div className="bg-white rounded-3xl p-6 md:p-8 premium-shadow border border-gray-100 mb-10 space-y-6">
          <div className="grid md:grid-cols-12 gap-6 items-center">
            
            {/* Search Bar */}
            <div className="md:col-span-5 relative">
              <span className="absolute left-4 top-3.5 text-gray-400 text-lg">🔍</span>
              <input
                type="text"
                placeholder="Search burgers, wraps, pizza..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-bg-light rounded-2xl border border-orange-100 text-sm text-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-bg-light rounded-2xl border border-orange-100 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition cursor-pointer"
              >
                <option value="default">Sort by: Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Popularity (Rating)</option>
              </select>
            </div>

            {/* Price Filter Slider */}
            <div className="md:col-span-4 space-y-1.5">
              <div className="flex justify-between text-xs text-gray-500 font-semibold">
                <span>Max Price:</span>
                <span className="text-primary font-bold">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="0"
                max={highestPriceInMenu || 1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

          </div>

          {/* Category Quick Badges */}
          <div className="pt-2 border-t border-gray-50">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-bg-light text-gray-600 border border-orange-50 hover:bg-orange-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {isLoading ? (
          /* Skeleton Loader */
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 space-y-4 border border-gray-100 animate-pulse">
                <div className="h-44 bg-gray-200 rounded-2xl w-full"></div>
                <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-gray-200 rounded-lg w-1/4"></div>
                  <div className="h-10 bg-gray-200 rounded-2xl w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm"
          >
            <span className="text-5xl">🔍</span>
            <h3 className="text-xl font-bold mt-4 text-dark">No Menu Items Found</h3>
            <p className="text-gray-400 mt-2 text-sm max-w-xs mx-auto font-light">
              Try adjusting your search criteria, price range, or categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setMaxPrice(highestPriceInMenu);
                setSortBy("default");
              }}
              className="mt-6 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-2.5 rounded-full text-xs transition"
            >
              Reset Filters
            </button>
          </motion.div>
        ) : (
          /* Items Grid */
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    itemId={item._id}
                    title={item.name}
                    price={item.price}
                    img={item.image}
                    rating={item.rating}
                    badge={item.rating > 4.7 ? "Must Try" : null}
                  >
                    {item.description}
                  </Card>
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