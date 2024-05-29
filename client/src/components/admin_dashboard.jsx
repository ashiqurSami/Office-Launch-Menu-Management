import React, { useState, useEffect } from "react";
import menuService from "../services/menu_service";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [date, setDate] = useState("");
  const [options, setOptions] = useState([]);
  const [menus, setMenus] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  console.log(today);
  useEffect(() => {
    const fetchMenus = async () => {
      const data = await menuService.getMenu(today);
      setMenus(data || []);
    };
    fetchMenus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await menuService.addMenu({ date, options });
      toast.success("Menu added successfully");
    } catch (error) {
      toast.error("Failed to add menu");
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOptionField = () => {
    setOptions([...options, ""]);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              className="form-control"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addOptionField}
          >
            Add Option
          </button>
        </div>
        <button type="submit" className="btn btn-primary">
          Add Menu
        </button>
      </form>

      <h3>Today's Menu {today}</h3>
      <ul>
        {menus.map((menu, index) => (
          <li key={index}>{menu}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
