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
  const admin=response.data.isAdmin
  if (response.data.token && response.status === 201) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return [true,admin]
  }
  return [false,admin];
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const logged=true
  return [logged,user.isAdmin];
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
