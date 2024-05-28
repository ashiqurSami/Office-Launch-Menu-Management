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
  const response = await axios.get(`${API_URL}/login`, userData);
  console.log(response);
  
  if (response.data.token && response.status === 201) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return true
  }
  return false;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
