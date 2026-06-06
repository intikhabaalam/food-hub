const express = require("express");
const { getAdminStats, adminCreateUser, adminGetAllUsers, adminUpdateUser, adminDeleteUser } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/stats", protect, adminOnly, getAdminStats);

// User CRUD (Admin Only)
router.post("/users", protect, adminOnly, adminCreateUser);
router.get("/users", protect, adminOnly, adminGetAllUsers);
router.put("/users/:id", protect, adminOnly, adminUpdateUser);
router.delete("/users/:id", protect, adminOnly, adminDeleteUser);

module.exports = router;