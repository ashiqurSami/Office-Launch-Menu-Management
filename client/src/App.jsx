import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./pages/registration_page";
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/login_page";
import Admin from "./pages/admin_page";
import Employee from "./pages/Employee_page";

const App = () => {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin' element={<Admin></Admin>} />
        <Route path='/employee' element={<Employee></Employee>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
