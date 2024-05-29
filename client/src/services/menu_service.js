import axios from 'axios';

const API_URL = 'http://localhost:5000/api/menu';

const addMenu = async (menuData) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const response = await axios.post(`${API_URL}/add-menu`, menuData, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.status === 201;
};

const getMenu = async (date) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const response = await axios.get(`${API_URL}/get-menu/${date}`, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data.menu.options;
};

const selectOption = async (choiceData) => {  
  const user = JSON.parse(localStorage.getItem('user'));
  const response = await axios.post(`${API_URL}/select`, choiceData, {
    headers: { Authorization: `Bearer ${user.token}` },
  });
  return response.data;
};

const getAllMenuSelections = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`${API_URL}/all`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
  };

export default {
  addMenu,
  getMenu,
  selectOption,
  getAllMenuSelections
};
