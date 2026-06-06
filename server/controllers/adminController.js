const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const Menu = require("../models/menuModel");
const Order = require("../models/orderModel");
const bcrypt = require("bcryptjs");

const getAdminStats = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const menuItemCount = await Menu.countDocuments();

    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Total Revenue (Completed orders)
    const completedOrders = await Order.find({ status: "Completed" });
    const totalRevenue = completedOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // Order Status Breakdown
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const completedCount = await Order.countDocuments({ status: "Completed" });
    const cancelledCount = await Order.countDocuments({ status: "Cancelled" });

    // Best Selling Items (Aggregate by items in completed orders)
    const bestSellingItems = await Order.aggregate([
      { $match: { status: "Completed" } },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.name",
          quantity: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
        }
      },
      { $sort: { quantity: -1 } },
      { $limit: 5 }
    ]);

    // Monthly Revenue (Completed orders grouped by month)
    const monthlyRevenue = await Order.aggregate([
      { $match: { status: "Completed" } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Map month numbers to names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlyData = monthlyRevenue.map(item => ({
      month: monthNames[item._id - 1] || `Month ${item._id}`,
      revenue: item.revenue
    }));

    res.json({
      users: userCount,
      bookings: bookingCount,
      menuItems: menuItemCount,
      totalOrders,
      totalRevenue,
      statusBreakdown: {
        Pending: pendingOrders,
        Completed: completedCount,
        Cancelled: cancelledCount
      },
      bestSellingItems,
      monthlyRevenue: monthlyData
    });
  } catch (err) {
    next(err);
  }
};

// Admin Create User
const adminCreateUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, isAdmin } = req.body;

    if (!name || !email || !phone || !password) {
      res.status(400);
      throw new Error("Please fill all details");
    }

    const emailExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phone });

    if (emailExist || phoneExist) {
      res.status(400);
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isActive: user.isActive,
    });
  } catch (error) {
    next(error);
  }
};

// Admin Read All Users
const adminGetAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Admin Update User
const adminUpdateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;
    user.isActive = req.body.isActive !== undefined ? req.body.isActive : user.isActive;
    user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      isActive: updatedUser.isActive,
    });
  } catch (error) {
    next(error);
  }
};

// Admin Delete User
const adminDeleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    await user.deleteOne();
    res.json({ _id: req.params.id, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAdminStats, adminCreateUser, adminGetAllUsers, adminUpdateUser, adminDeleteUser };