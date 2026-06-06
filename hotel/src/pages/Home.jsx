import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import Card from "../components/card";
import { Link } from "react-router-dom";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Popular Burgers Promo Items
  const popularBurgers = [
    {
      id: "popular-1",
      name: "Classic Single Burger",
      price: 129,
      rating: 4.6,
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
      description: "Flame-grilled single beef patty with fresh lettuce, tomatoes, onions, pickles, and our signature burger sauce."
    },
    {
      id: "popular-2",
      name: "Double Cheese Smasher",
      price: 189,
      rating: 4.9,
      img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600",
      description: "Two smashed beef patties, double cheddar cheese, caramelized onions, mustard, and sweet relish on toasted brioche.",
      badge: "Best Seller"
    },
    {
      id: "popular-3",
      name: "Crispy Zinger Burger",
      price: 169,
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600",
      description: "Crispy fried spicy chicken breast, iceberg lettuce, and creamy mayonnaise on a toasted soft bun."
    }
  ];

  // Best Sellers
  const bestSellers = [
    {
      id: "best-1",
      name: "Loaded Cheese & Jalapeno Fries",
      price: 149,
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600",
      description: "Crispy fries smothered in hot cheddar cheese sauce, topped with chopped pickled jalapenos and green onions.",
      category: "Fries"
    },
    {
      id: "best-2",
      name: "Fried Chicken Bucket (4pc)",
      price: 299,
      rating: 4.6,
      img: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600",
      description: "Four pieces of fresh, never-frozen bone-in chicken, double-breaded in our original secret recipe spices.",
      category: "Fried Chicken",
      badge: "Must Try"
    },
    {
      id: "best-3",
      name: "Double Pepperoni Feast Pizza",
      price: 299,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600",
      description: "Extra loaded pepperoni slices with a double portion of bubbling mozzarella cheese and oregano herbs.",
      category: "Pizza"
    }
  ];

  // Combos
  const combos = [
    {
      id: "combo-1",
      name: "Burger, Fries & Drink Combo",
      price: 249,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1610614819513-58e34989848b?w=600",
      description: "Classic Single Burger served with a side of Golden Salted Fries and a chilled can of Coca-Cola.",
      badge: "Save 20%"
    },
    {
      id: "combo-2",
      name: "Twin Burger Buddies Combo",
      price: 399,
      rating: 4.9,
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600",
      description: "Two Zinger Burgers, two portions of Peri-Peri Fries, and two chilled cans of soft drinks.",
      badge: "Popular Combo"
    }
  ];

  // Customer Reviews
  const reviews = [
    {
      name: "Aarav Sharma",
      review: "The Double Cheese Smasher is out of this world! Melt-in-the-mouth patties and delivered in under 15 minutes. FASTBITE is my new go-to!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100"
    },
    {
      name: "Sneha Patel",
      review: "Absolutely love their loaded fries and peri peri spice mix. Packaging is clean, and the food arrives steaming hot every time.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    },
    {
      name: "Rahul Verma",
      review: "Clean user interface, fast ordering process, and the table pre-booking is super convenient for family dine-ins. Highly recommended!",
      rating: 4.8,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <Navbar />
      <HeroSection />

      {/* 2. Popular Burgers Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-14">
          <span className="text-sm font-bold text-primary tracking-widest uppercase bg-primary/10 px-4 py-1.5 rounded-full">
            Customer Favorites
          </span>
          <h2 className="text-4xl font-extrabold mt-3 tracking-tight text-dark">
            Popular Burgers 🍔
          </h2>
          <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
            Try our legendary flame-grilled and crispy chicken burgers made to perfection.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {popularBurgers.map((burger) => (
            <motion.div key={burger.id} variants={itemVariants}>
              <Card
                itemId={burger.id}
                title={burger.name}
                price={burger.price}
                img={burger.img}
                rating={burger.rating}
                badge={burger.badge}
              >
                {burger.description}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Best Sellers Section */}
      <section className="py-20 bg-white px-6 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-14">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <span className="text-sm font-bold text-accent tracking-widest uppercase bg-accent/10 px-4 py-1.5 rounded-full">
                Sizzling Sellers
              </span>
              <h2 className="text-4xl font-extrabold mt-3 tracking-tight text-dark">
                Our Best Sellers 🔥
              </h2>
            </div>
            <Link
              to="/menu"
              className="bg-dark hover:bg-dark/95 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all hover:scale-[1.02]"
            >
              View Full Menu
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {bestSellers.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <Card
                  itemId={item.id}
                  title={item.name}
                  price={item.price}
                  img={item.img}
                  rating={item.rating}
                  badge={item.badge}
                >
                  {item.description}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Combo Meals Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-14">
          <span className="text-sm font-bold text-primary tracking-widest uppercase bg-primary/10 px-4 py-1.5 rounded-full">
            Bundle & Save
          </span>
          <h2 className="text-4xl font-extrabold mt-3 tracking-tight text-dark">
            Combo Meals 🥤🍟🍔
          </h2>
          <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
            Grab our delicious budget combos and share the happiness with friends & family.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8"
        >
          {combos.map((combo) => (
            <motion.div key={combo.id} variants={itemVariants}>
              <Card
                itemId={combo.id}
                title={combo.name}
                price={combo.price}
                img={combo.img}
                rating={combo.rating}
                badge={combo.badge}
              >
                {combo.description}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="py-20 bg-white px-6 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-primary tracking-widest uppercase bg-primary/10 px-4 py-1.5 rounded-full">
              Our Promise
            </span>
            <h2 className="text-4xl font-extrabold mt-3 tracking-tight text-dark">
              Why FastBite Hits Different?
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Box 1 */}
            <div className="text-center p-8 rounded-3xl bg-[#FFF8F0]/80 border border-orange-100 flex flex-col items-center">
              <span className="text-4xl mb-4">🚀</span>
              <h4 className="font-extrabold text-lg text-dark">Super Fast Delivery</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Hot and fresh meals delivered straight to your doorstep in under 20 minutes guaranteed!
              </p>
            </div>
            {/* Box 2 */}
            <div className="text-center p-8 rounded-3xl bg-[#FFF8F0]/80 border border-orange-100 flex flex-col items-center">
              <span className="text-4xl mb-4">🥩</span>
              <h4 className="font-extrabold text-lg text-dark">100% Sizzling Fresh</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Every burger and wrap is cooked fresh to order with premium, high-quality local ingredients.
              </p>
            </div>
            {/* Box 3 */}
            <div className="text-center p-8 rounded-3xl bg-[#FFF8F0]/80 border border-orange-100 flex flex-col items-center">
              <span className="text-4xl mb-4">📱</span>
              <h4 className="font-extrabold text-lg text-dark">Easy Fast Ordering</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Seamless login, quick add to cart, and customizable delivery options inside a premium app.
              </p>
            </div>
            {/* Box 4 */}
            <div className="text-center p-8 rounded-3xl bg-[#FFF8F0]/80 border border-orange-100 flex flex-col items-center">
              <span className="text-4xl mb-4">🧼</span>
              <h4 className="font-extrabold text-lg text-dark">Hygienic Kitchens</h4>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                Top-tier cleanliness, temperature checks, and double sealed bags for zero contamination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <span className="text-sm font-bold text-accent tracking-widest uppercase bg-accent/10 px-4 py-1.5 rounded-full">
            Testimonials
          </span>
          <h2 className="text-4xl font-extrabold mt-3 tracking-tight text-dark">
            What Our Foodies Say ⭐
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover shadow-inner"
                />
                <div>
                  <h4 className="font-bold text-dark text-sm">{rev.name}</h4>
                  <div className="text-yellow-400 text-xs">⭐ {rev.rating}</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic leading-relaxed">
                "{rev.review}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. App Download Section */}
      <section className="py-12 px-6 w-full">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#121212] to-[#251508] rounded-[40px] p-8 md:p-14 overflow-hidden relative flex flex-col md:flex-row items-center justify-between shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[80px]"></div>
          
          <div className="max-w-md text-center md:text-left space-y-4">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">
              FastBite Mobile App
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              Order Your Favorite Meals on the Go!
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              Get customized offers, track orders in real-time, and pre-book tables with our slick mobile app. Available now for free!
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <span className="bg-white/10 hover:bg-white/15 text-white font-bold px-5 py-3 rounded-2xl text-xs border border-white/10 flex items-center gap-2 cursor-pointer transition">
                <span>🤖</span> Google Play
              </span>
              <span className="bg-white/10 hover:bg-white/15 text-white font-bold px-5 py-3 rounded-2xl text-xs border border-white/10 flex items-center gap-2 cursor-pointer transition">
                <span>🍎</span> App Store
              </span>
            </div>
          </div>

          <div className="mt-8 md:mt-0 flex justify-center w-full max-w-[260px]">
            <div className="bg-white/5 border border-white/15 p-4 rounded-[32px] w-full shadow-inner flex flex-col items-center">
              <div className="bg-[#121212] rounded-[24px] overflow-hidden aspect-[9/16] w-full border-4 border-gray-800 relative flex flex-col items-center justify-center p-3 text-center">
                <span className="text-xs font-bold text-gradient tracking-widest mb-1">FASTBITE</span>
                <span className="text-[10px] text-gray-400 mb-4">Hot. Fresh. Delivered.</span>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-4 animate-bounce">🍔</div>
                <div className="h-2 w-20 bg-white/20 rounded-full mb-1"></div>
                <div className="h-2 w-16 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
