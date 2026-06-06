const express = require("express");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  deleteBooking,
  updateBooking,
} = require("../controllers/bookingController");

const  protect  = require("../middleware/authMiddleware")
const  adminOnly  = require("../middleware/adminMiddleware")

const router = express.Router();

/* USER */
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.delete("/:id", protect, deleteBooking);

/* ADMIN */
router.get("/", protect, getAllBookings);
router.put("/:id", protect, adminOnly, updateBooking);

module.exports = router;
