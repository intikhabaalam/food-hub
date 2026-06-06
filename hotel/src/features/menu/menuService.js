import axios from "axios";

// Proxy friendly URL
const API_URL = "/api/menu/";

// Get all menu items
const getMenu = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create new menu item (admin only)
const createMenu = async (menuData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, menuData, config);
  return response.data;
};

// Update menu item (admin only)
const updateMenu = async (id, menuData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(`${API_URL}${id}`, menuData, config);
  return response.data;
};

// Delete menu item (admin only)
const deleteMenu = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(`${API_URL}${id}`, config);
  return response.data;
};

const menuService = {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
};

export default menuService;