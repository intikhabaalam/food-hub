const mongoose = require("mongoose")

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    date: String,
    time: String,
    persons: Number,
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Booking", bookingSchema)