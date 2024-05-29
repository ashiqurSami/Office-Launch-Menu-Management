import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from "../services/auth_service";
import toast from 'react-hot-toast';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [status,admin]=await authService.login({ email, password });
      if (status) {
        toast.success('Login successful');
        if (admin) {
          console.log(admin);
          navigate('/admin');
        } else {
          navigate('/employee');
        }
        
      }
      else{
        toast.error('Login failed');
      }
    } catch (error) {
      console.log(error.toString());
      toast.error('Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-10 col-md-6 col-lg-4">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
          <div className="text-center">
            <span>Don't have an account? </span>
            <Link to="/">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
