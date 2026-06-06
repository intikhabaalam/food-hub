const express = require('express');
const { registerUser, loginUser, privateController, getUserProfile, updateUserProfile, deleteUserAccount } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/private", protect, privateController); // protected example

// Profile CRUD
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/profile", protect, deleteUserAccount);

module.exports = router;