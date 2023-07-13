import React, { useState } from 'react';
import { registerUser } from '../../api';
import InputBox from './InputBox';
import { useNavigate } from 'react-router-dom';


function RegisterForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
  
    // Check if the password and confirm password match
    if (formData.password !== formData.confirm_password) {
      console.error('Error: Password and confirm password do not match');
      return;
    }
  
    try {
      const response = await registerUser(formData);
      console.log(response.message);
      const token = response.token;
      localStorage.setItem('token', token);

      setFormData({
        name: '',
        email: '',
        password: '',
        confirm_password: ''
      });
      // Redirect to the dashboard page
      navigate('/dashboard');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  

  return (
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <img src='src/images/plannerize-logo.png' width="50px" alt="Logo" />
          </div>
          <h2 className="mt-1 text-3xl font-bold text-gray-900">Create an account!</h2>
          <p className="mt-2 text-sm text-gray-500">Please fill up the information</p>
        </div>

        <form className="mt-1 space-y-6" onSubmit={handleRegister}>
          <input type="hidden" name="remember" value="true" />
          <div className="relative">
            <InputBox
              type="text"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />

            <InputBox
              type="text"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <InputBox
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <InputBox
              type="password"
              label="Confirm Password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex items-center justify-between"></div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500">
              Sign up
            </button>
          </div>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
            <span>Already have an account?</span>
            <a
              href="/"
              className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">
              Login
            </a>
          </p>
        </form>
      </div>

  );
}


export default RegisterForm;