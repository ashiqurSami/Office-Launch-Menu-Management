import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Registration from "./pages/registration_page";
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/login_page";
import Admin from "./pages/admin_page";
import Employee from "./pages/Employee_page";
import authService from './services/auth_service'; // Assuming authService is imported

const App = () => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const [loggedUser, isAdmin] = await authService.getCurrentUser();
      setUser(loggedUser);
      setAdmin(isAdmin);
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/admin" element={user && admin ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/employee" element={user && !admin ? <Employee /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
