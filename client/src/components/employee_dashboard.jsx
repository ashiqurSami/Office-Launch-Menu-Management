import React, { useState, useEffect } from 'react';
import menuService from "../services/menu_service";
import toast from "react-hot-toast";
import authService from '../services/auth_service';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [menu, setMenu] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const navigate=useNavigate();  
  useEffect(() => {
    const fetchMenu = async () => {
     
      const data = await menuService.getMenu(today);
      setMenu(data || []);
    };
    fetchMenu();
  }, []);

  const handleSelect = async (e) => {
    e.preventDefault();
    try {
      await menuService.selectAndUpdateOption({ date: new Date().toISOString().split('T')[0], option: selectedOption });
      toast.success('Confirmed');
    } catch (error) {
      toast.error('Failed to select option');
    }
  };

  const handleLogout = () => {
    authService.logout();
    toast.success("Logged out");
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="card">
        <div className="card-header bg-primary text-white font-weight-bold">Today's Menu ({today})</div>
        <div className="card-body">
          <form onSubmit={handleSelect}>
            {menu.map((option, index) => (
              <div key={index} className="form-check mb-2">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="menuOption" 
                  value={option} 
                  onChange={(e) => setSelectedOption(e.target.value)} 
                  required 
                />
                <label className="form-check-label">{option}</label>
              </div>
            ))}
            <button type="submit" className="btn btn-primary w-100">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
