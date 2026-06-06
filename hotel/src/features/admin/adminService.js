import axios from "axios";

const API_URL = "/api/admin/";

// Get dashboard stats
const getStats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}stats`, config);
  return response.data;
};

const adminService = {
  getStats,
};

export default adminService;