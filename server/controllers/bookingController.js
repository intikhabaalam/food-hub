const Booking = require("../models/bookingModel");

/* ================= USER ================= */

// Create booking (user)
const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create({
      user: req.user._id,
      ...req.body,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get own bookings (user)
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= ADMIN & USER DYNAMIC ================= */

// Get bookings (all for admin, own for user)
const getAllBookings = async (req, res, next) => {
  try {
    let bookings;
    if (req.user && req.user.isAdmin) {
      bookings = await Booking.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });
    } else {
      bookings = await Booking.find({ user: req.user._id })
        .sort({ createdAt: -1 });
    }
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update booking status (admin only)
const updateBooking = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowedStatus = ["Pending", "Confirmed", "Completed", "Cancelled"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete booking (admin or owner)
const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Security check: non-admin can only delete their own booking
    if (!req.user.isAdmin && booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this booking" });
    }

    await booking.deleteOne();
    console.log("Deleted booking:", booking);
    res.json({ _id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBooking,
  deleteBooking,
};

