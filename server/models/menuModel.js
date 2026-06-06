const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String }, // optional
    category: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    availability: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
