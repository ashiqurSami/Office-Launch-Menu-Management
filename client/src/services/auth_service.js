import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.status === 201) {
    return true;
  }
  return false;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  const admin = response.data.isAdmin; // Ensure admin status is correctly retrieved
  if (response.data.token && response.status === 201) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return [true, admin];
  }
  return [false, admin];
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user ? user.isAdmin : false;
  const logged = !!user;
  console.log(logged, isAdmin); // Debug line to check user status
  return [logged, isAdmin];
};


export default {
  register,
  login,
  logout,
  getCurrentUser,
};
