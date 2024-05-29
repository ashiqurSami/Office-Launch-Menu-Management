import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth_service';
import toast from 'react-hot-toast';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const data= await authService.register({ name, email, password });
      if (data) {
        toast.success('Registration successful');
        navigate('/login');
      }
      else{
        toast.error('Registration failed');
      }
        setEmail('');
        setName('');
        setPassword('');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="col-10 col-md-6 col-lg-4">
      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
          <div className="text-center">
            <span>Already have an account? </span>
            <Link to="/login">Login</Link>
          </div>
      </form>
    </div>
  </div>
  );
};

export default RegistrationForm;
