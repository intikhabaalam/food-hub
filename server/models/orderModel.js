const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Menu",
        },
        name: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending", // Pending | Completed | Cancelled
    },
    address: {
      type: String,
      required: true,
      default: "Dine-In",
    },
    phoneNumber: {
      type: String,
      required: true,
      default: "0000000000",
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Cash on Delivery", // Cash on Delivery | UPI | Card
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
