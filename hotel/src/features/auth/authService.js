import axios from "axios";

// Proxy friendly URL
const API_URL = "/api/auth/";

// Register user
const register = async (formData) => {
  const response = await axios.post(API_URL + "register", formData);
  localStorage.setItem("user", JSON.stringify(response.data));
  localStorage.setItem("token", response.data.token);
  return response.data;
};

// Login user
const login = async (formData) => {
  const response = await axios.post(API_URL + "login", formData);
  localStorage.setItem("user", JSON.stringify(response.data));
  localStorage.setItem("token", response.data.token);
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.clear();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;