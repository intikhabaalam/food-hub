const express = require("express");
const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu
} = require("../controllers/menuController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

// Public route
router.get("/", getMenu);

// Admin routes
router.post("/", protect, adminOnly, createMenu);
router.put("/:id", protect, adminOnly, updateMenu);
router.delete("/:id", protect, adminOnly, deleteMenu);

module.exports = router;
