import axios from "axios";

// Proxy friendly URL
const API_URL = "/api/orders/";

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// ---------------- CREATE ORDER ----------------
const createOrder = async (orderData) => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

// ---------------- MY ORDERS (USER) ----------------
const getMyOrders = async () => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(`${API_URL}my`, config);
  return response.data;
};

// ---------------- ALL ORDERS (ADMIN) ----------------
const getAllOrders = async () => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// ---------------- UPDATE ORDER STATUS (ADMIN) ----------------
const updateOrderStatus = async (id, statusData) => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(`${API_URL}${id}`, statusData, config);
  return response.data;
};

// ---------------- DELETE ORDER (ADMIN) ----------------
const deleteOrder = async (id) => {
  const token = getToken();
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(`${API_URL}${id}`, config);
  return response.data;
};

const orderService = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};

export default orderService;