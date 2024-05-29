import React, { useState, useEffect } from 'react';
import menuService from "../services/menu_service";

const EmployeeDashboard = () => {
  const [menu, setMenu] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      const today = new Date().toISOString().split('T')[0];
      const data = await menuService.getMenu(today);
      setMenu(data || []);
    };
    fetchMenu();
  }, []);

  const handleSelect = async (e) => {
    e.preventDefault();
    try {
      await menuService.selectAndUpdateOption({ date: new Date().toISOString().split('T')[0], option: selectedOption });
      alert('Option selected successfully');
    } catch (error) {
      alert('Failed to select option');
    }
  };

  return (
    <div>
      <h2>Employee Dashboard</h2>
      <form onSubmit={handleSelect}>
        {menu.map((option, index) => (
          <div key={index} className="form-check">
            <input className="form-check-input" type="radio" name="menuOption" value={option} onChange={(e) => setSelectedOption(e.target.value)} required />
            <label className="form-check-label">{option}</label>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Confirm</button>
      </form>
    </div>
  );
};

export default EmployeeDashboard;
