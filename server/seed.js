const mongoose = require("mongoose");
require("dotenv").config();
const Menu = require("./models/menuModel");
const colors = require("colors");

const seedData = [
  // Burgers
  {
    name: "Classic Single Burger",
    description: "Flame-grilled single beef patty with fresh lettuce, tomatoes, onions, pickles, and our signature burger sauce on a toasted sesame seed bun.",
    price: 129,
    category: "Burgers",
    rating: 4.6,
    availability: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
  },
  {
    name: "Double Cheese Smasher",
    description: "Two smashed beef patties, double cheddar cheese, caramelized onions, mustard, and sweet relish on a toasted brioche bun.",
    price: 189,
    category: "Burgers",
    rating: 4.9,
    availability: true,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600"
  },
  {
    name: "Crispy Zinger Burger",
    description: "Crispy fried spicy chicken breast, iceberg lettuce, and creamy mayonnaise on a toasted soft bun.",
    price: 169,
    category: "Burgers",
    rating: 4.7,
    availability: true,
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600"
  },
  {
    name: "Smoked BBQ Bacon Burger",
    description: "Juicy flame-grilled patty, crispy hickory-smoked bacon, melted Swiss cheese, crispy onion rings, and smoky BBQ sauce.",
    price: 219,
    category: "Burgers",
    rating: 4.8,
    availability: true,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600"
  },
  {
    name: "Spicy Jalapeno Crunch",
    description: "Spicy seasoned chicken breast, pickled jalapenos, pepper jack cheese, and hot peri-peri sauce on a toasted bun.",
    price: 159,
    category: "Burgers",
    rating: 4.5,
    availability: true,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600"
  },
  {
    name: "Ultimate Mushroom Swiss",
    description: "Juicy beef patty topped with sautéed wild mushrooms, melted Swiss cheese, garlic aioli, and baby spinach.",
    price: 199,
    category: "Burgers",
    rating: 4.4,
    availability: true,
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=600"
  },
  
  // Fries
  {
    name: "Golden Salted Fries",
    description: "Classic skin-on potatoes, cut thin, fried golden brown and lightly tossed in premium sea salt.",
    price: 89,
    category: "Fries",
    rating: 4.3,
    availability: true,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600"
  },
  {
    name: "Loaded Cheese & Jalapeno Fries",
    description: "Crispy fries smothered in hot cheddar cheese sauce, topped with chopped pickled jalapenos and green onions.",
    price: 149,
    category: "Fries",
    rating: 4.7,
    availability: true,
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600"
  },
  {
    name: "Peri-Peri Crispy Fries",
    description: "Crispy golden french fries tossed in our signature hot and tangy peri-peri spice blend.",
    price: 109,
    category: "Fries",
    rating: 4.5,
    availability: true,
    image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?w=600"
  },
  {
    name: "Truffle Parmesan Fries",
    description: "Crispy fries drizzled with aromatic white truffle oil, grated parmesan cheese, and freshly chopped parsley.",
    price: 169,
    category: "Fries",
    rating: 4.8,
    availability: true,
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=600"
  },

  // Fried Chicken
  {
    name: "Fried Chicken Bucket (4pc)",
    description: "Four pieces of fresh, never-frozen bone-in chicken, double-breaded in our original secret recipe spices and pressure fried.",
    price: 299,
    category: "Fried Chicken",
    rating: 4.6,
    availability: true,
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600"
  },
  {
    name: "Fried Chicken Bucket (8pc)",
    description: "Eight pieces of golden, crispy original recipe fried chicken. Perfect for sharing!",
    price: 549,
    category: "Fried Chicken",
    rating: 4.8,
    availability: true,
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600"
  },
  {
    name: "Hot & Spicy Chicken Wings (6pc)",
    description: "Six crispy fried chicken wings tossed in our signature hot buffalo sauce, served with celery sticks and ranch dressing.",
    price: 189,
    category: "Fried Chicken",
    rating: 4.7,
    availability: true,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600"
  },
  {
    name: "Golden Chicken Nuggets (9pc)",
    description: "Nine bite-sized pieces of tender chicken breast meat, lightly battered and fried to golden perfection, served with sweet mustard sauce.",
    price: 149,
    category: "Fried Chicken",
    rating: 4.5,
    availability: true,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600"
  },

  // Wraps
  {
    name: "Classic Chicken Shawarma Wrap",
    description: "Slow-roasted shaved chicken wrap loaded with pickles, french fries, and creamy garlic toum paste rolled in fresh pita bread.",
    price: 129,
    category: "Wraps",
    rating: 4.6,
    availability: true,
    image: "https://images.unsplash.com/photo-1662116765994-4e4cfdfcb72a?w=600"
  },
  {
    name: "Spicy Paneer Shawarma Wrap",
    description: "Chargrilled spiced paneer cubes wrapped in pita bread with fresh cabbage slaw, onions, and spicy tahini sauce.",
    price: 119,
    category: "Wraps",
    rating: 4.4,
    availability: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600"
  },
  {
    name: "Crispy Falcon Chicken Wrap",
    description: "Crispy chicken tenders, cheddar cheese, chopped tomatoes, shredded lettuce, and chipotle ranch wrapped in a toasted flour tortilla.",
    price: 149,
    category: "Wraps",
    rating: 4.7,
    availability: true,
    image: "https://images.unsplash.com/photo-1626700051175-6518c4793f4f?w=600"
  },

  // Pizza
  {
    name: "Margherita Classic Pizza",
    description: "Freshly rolled thin-crust dough topped with rich tomato sauce, fresh mozzarella cheese, sliced tomatoes, extra virgin olive oil, and fresh basil.",
    price: 199,
    category: "Pizza",
    rating: 4.5,
    availability: true,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
  },
  {
    name: "Double Pepperoni Feast Pizza",
    description: "Extra loaded pepperoni slices with a double portion of bubbling mozzarella cheese and oregano herbs on a hand-stretched crust.",
    price: 299,
    category: "Pizza",
    rating: 4.8,
    availability: true,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600"
  },
  {
    name: "Veggie Paradise Pizza",
    description: "Loaded with sliced bell peppers, red onions, mushrooms, black olives, sweet corn, and premium mozzarella cheese.",
    price: 249,
    category: "Pizza",
    rating: 4.4,
    availability: true,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600"
  },

  // Sandwiches
  {
    name: "BBQ Grilled Chicken Sandwich",
    description: "Tender grilled chicken breast, glazed in sweet BBQ sauce, served with melted Swiss cheese and honey mustard on thick oat bread.",
    price: 139,
    category: "Sandwiches",
    rating: 4.5,
    availability: true,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600"
  },
  {
    name: "Ultimate Club Sandwich",
    description: "Double-decker toast containing sliced chicken breast, crispy bacon, fried egg, lettuce, tomato, and creamy mayonnaise.",
    price: 159,
    category: "Sandwiches",
    rating: 4.6,
    availability: true,
    image: "https://images.unsplash.com/photo-1567234669013-216f4cf48212?w=600"
  },
  {
    name: "Triple Cheese Grilled Toast",
    description: "A premium melt of Cheddar, Swiss, and Mozzarella cheese on sourdough bread, grilled golden brown with garlic butter.",
    price: 119,
    category: "Sandwiches",
    rating: 4.3,
    availability: true,
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600"
  },

  // Drinks
  {
    name: "Coca-Cola Original (Can)",
    description: "330ml chilled can of classic carbonated soft drink.",
    price: 59,
    category: "Drinks",
    rating: 4.7,
    availability: true,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600"
  },
  {
    name: "Sprite Lemon-Lime (Can)",
    description: "330ml chilled can of refreshing lemon-lime flavored soft drink.",
    price: 59,
    category: "Drinks",
    rating: 4.6,
    availability: true,
    image: "https://images.unsplash.com/photo-1625772290748-39163df403ef?w=600"
  },
  {
    name: "Fanta Orange (Can)",
    description: "330ml chilled can of sweet orange-flavored carbonated beverage.",
    price: 59,
    category: "Drinks",
    rating: 4.4,
    availability: true,
    image: "https://images.unsplash.com/photo-1624514205421-2e6ca6f9a0c0?w=600"
  },
  {
    name: "Creamy Oreo Milkshake",
    description: "Rich vanilla ice cream blended with crushed Oreo cookies, milk, and sweet whipped cream topped with chocolate drizzle.",
    price: 149,
    category: "Drinks",
    rating: 4.8,
    availability: true,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600"
  },
  {
    name: "Royal Strawberry Milkshake",
    description: "Rich ice cream blended with fresh strawberries and milk, topped with a cherry and strawberry sauce.",
    price: 139,
    category: "Drinks",
    rating: 4.7,
    availability: true,
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600"
  },
  {
    name: "Classic Cold Brew Coffee",
    description: "Slow-steeped organic coffee beans served over ice, with a splash of milk and sweet cane syrup.",
    price: 129,
    category: "Drinks",
    rating: 4.5,
    availability: true,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600"
  },

  // Desserts
  {
    name: "Hot Flipped Chocolate Brownie",
    description: "Warm, fudgy chocolate brownie loaded with walnuts and chocolate chips, served with hot chocolate fudge sauce.",
    price: 99,
    category: "Desserts",
    rating: 4.8,
    availability: true,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600"
  },
  {
    name: "Soft Baked Choco Chip Cookie",
    description: "Giant, chewy gourmet cookie fresh out of the oven, loaded with semi-sweet Belgian chocolate chips.",
    price: 69,
    category: "Desserts",
    rating: 4.6,
    availability: true,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600"
  },
  {
    name: "Premium Vanilla Ice Cream Cup",
    description: "Two scoops of rich French vanilla bean ice cream topped with sprinkles and chocolate syrup.",
    price: 79,
    category: "Desserts",
    rating: 4.4,
    availability: true,
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600"
  },

  // Combo Meals
  {
    name: "Burger, Fries & Drink Combo",
    description: "Classic Single Burger served with a side of Golden Salted Fries and a chilled can of Coca-Cola.",
    price: 249,
    category: "Combo Meals",
    rating: 4.8,
    availability: true,
    image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?w=600"
  },
  {
    name: "Twin Burger Buddies Combo",
    description: "Two Zinger Burgers, two portions of Peri-Peri Fries, and two chilled cans of soft drinks. Best for sharing!",
    price: 399,
    category: "Combo Meals",
    rating: 4.9,
    availability: true,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600"
  },
  {
    name: "Mega Family Feast Combo",
    description: "Double Cheese Smasher, Crispy Zinger Burger, 4pc Fried Chicken, 1 portion of Loaded Fries, and a 1.25L Coca-Cola bottle.",
    price: 799,
    category: "Combo Meals",
    rating: 4.9,
    availability: true,
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600"
  }
];

const seedDatabase = async () => {
  try {
    console.log("Connecting to Database...".yellow);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to Database successfully!".green.bold);

    console.log("Clearing existing menu items...".yellow);
    await Menu.deleteMany({});
    console.log("Menu items cleared!".green);

    console.log(`Seeding ${seedData.length} premium fast-food items...`.yellow);
    await Menu.insertMany(seedData);
    console.log("Seeding completed successfully!".green.bold);
    process.exit(0);
  } catch (error) {
    console.error(`Database seeding failed: ${error.message}`.red.bold);
    process.exit(1);
  }
};

seedDatabase();
