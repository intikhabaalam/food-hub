const express = require('express');
const cors = require('cors');
require('dotenv').config();
const colors = require('colors');
const path = require('path');
const connectDB = require('./config/dbConfig');
const errorHandler = require('./middleware/errorHandler');

// ---------------- PORT ----------------
const PORT = process.env.PORT || 5000;
const app = express();

// ---------------- Connect DB ----------------
connectDB();

// ---------------- Middleware ----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- Routes ----------------
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/booking", require("./routes/bookingRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// ---------------- Production Serve React ----------------
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "hotel/dist")));

  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "hotel", "dist", "index.html"));
  });

} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// ---------------- Error Handler ----------------
app.use(errorHandler);

// ---------------- Start Server ----------------
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT PORT: ${PORT}`.bgBlue.white);
});