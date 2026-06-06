import axios from "axios";

// Proxy friendly URL
const API_URL = "/api/booking/";

// Get all bookings
const getBookings = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Add new booking
const addBooking = async (bookingData, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, bookingData, config);
  return response.data;
};

// Delete booking
const deleteBooking = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(`${API_URL}${id}`, config);
  return response.data;
};

const bookingService = {
  getBookings,
  addBooking,
  deleteBooking,
};

export default bookingService;