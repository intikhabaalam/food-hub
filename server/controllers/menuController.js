const Menu = require("../models/menuModel");

// Get all menu items
const getMenu = async (req, res, next) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    next(err);
  }
};

// Create new menu item (admin only)
const createMenu = async (req, res, next) => {
  try {
    const menu = await Menu.create(req.body);
    res.status(201).json(menu);
  } catch (err) {
    next(err);
  }
};

// Update menu item (admin only)
const updateMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menu) {
      res.status(404);
      throw new Error("Menu item not found");
    }
    res.json(menu);
  } catch (err) {
    next(err);
  }
};
// Delete menu item (admin only)
const deleteMenu = async (req, res, next) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) {
      res.status(404);
      throw new Error("Menu item not found");
    }
    res.json({ _id: menu._id, msg: "Menu Deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMenu, createMenu, updateMenu, deleteMenu };
