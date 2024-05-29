import React, { useState, useEffect } from "react";
import menuService from "../services/menu_service";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [date, setDate] = useState("");
  const [options, setOptions] = useState([]);
  const [menus, setMenus] = useState([]);
  const [selections, setSelections] = useState([]);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
  const [isSelectionsCollapsed, setIsSelectionsCollapsed] = useState(true);
  const [filterDate, setFilterDate] = useState("");

  useEffect(() => {
    const fetchMenus = async () => {
      const today = new Date().toISOString().split("T")[0];
      const data = await menuService.getMenu(today);
      setMenus(data || []);
    };
    fetchMenus();

    const fetchSelections = async () => {
      const response = await menuService.getAllMenuSelections();
      setSelections(response);
    };
    fetchSelections();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await menuService.addMenu({ date, options });
      if (data) {
        toast.success("Menu added successfully");
      } else {
        toast.error("Failed to add menu");
      }
      setDate("");
      setOptions([]);
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

  const handleLogout = () => {
    // Logout logic here
    toast.success("Logged out");
  };

  const filteredSelections = selections.filter(menu => {
    if (!filterDate) return true;
    const menuDate = new Date(menu.date).toISOString().split("T")[0];
    return menuDate === filterDate;
  });

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-header bg-primary text-white font-weight-bold">
          Add New Menu
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control mb-2"
                  placeholder={`Option ${index + 1}`}
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
            <button type="submit" className="btn btn-primary w-100">
              Add Menu
            </button>
          </form>
        </div>
      </div>

      <div className="card mb-4">
        <div
          className="card-header bg-info text-white font-weight-bold d-flex justify-content-between align-items-center"
          onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
          style={{ cursor: "pointer" }}
        >
          Today's Menu
          <span>{isMenuCollapsed ? "+" : "-"}</span>
        </div>
        {!isMenuCollapsed && (
          <div className="card-body">
            <ul className="list-group">
              {menus.map((menu, index) => (
                <li key={index} className="list-group-item">
                  {menu}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="card mb-4">
        <div
          className="card-header bg-success text-white font-weight-bold d-flex justify-content-between align-items-center"
          onClick={() => setIsSelectionsCollapsed(!isSelectionsCollapsed)}
          style={{ cursor: "pointer" }}
        >
          All Menu Selections
          <span>{isSelectionsCollapsed ? "+" : "-"}</span>
        </div>
        {!isSelectionsCollapsed && (
          <div className="card-body">
            <div className="form-group mb-3">
              <label>Filter by Date</label>
              <input
                type="date"
                className="form-control"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Employee Name</th>
                  <th>Employee Email</th>
                  <th>Selected Option</th>
                </tr>
              </thead>
              <tbody>
                {filteredSelections.map(
                  (menu, index) =>
                    menu.choices &&
                    menu.choices.map((choice, idx) => (
                      <tr key={`${index}-${idx}`}>
                        <td>{new Date(menu.date).toLocaleDateString()}</td>
                        <td>{choice.userId && choice.userId.name}</td>
                        <td>{choice.userId && choice.userId.email}</td>
                        <td>{choice.option}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
