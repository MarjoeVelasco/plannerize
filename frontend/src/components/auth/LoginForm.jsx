import React, { useState, useEffect } from 'react';
import InputBox from './InputBox';
import { loginUser } from '../../api';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';



function LoginForm() {

  const navigate = useNavigate();
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleSignUp = () => {
    setShowRegisterForm(true);    
    }



  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(formData); 
      const token = response.token;
      localStorage.setItem('token', token);
      //const {token} = response.data;
     // const decodedToken = jwt_decode(token);
     // console.log(decodedToken);
    

      // Redirect to the protected page or dashboard
      navigate('/dashboard');
      

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8 md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
    {showRegisterForm ? (
        <RegisterForm />
      ) : (
    
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <img src='src/images/plannerize-logo.png' width="50px"></img> 
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Welcome Back!
        </h2>
        <p className="mt-2 text-sm text-gray-500">Please sign in to your account</p>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <input type="hidden" name="remember" value="true"/>
          <div className="relative">
        
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
          </div>


        <div className="flex items-center justify-between">
          
        </div>
        <div>
          <button type="submit"
            className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600 hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500">
            Sign in
          </button>
        </div>
        <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
          <span>Don't have an account?</span>
          <button
              className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
              onClick={handleSignUp}
            >
              Sign up
            </button>
        </p>
      </form>
    </div>
  )}
  </div>
  );
}

export default LoginForm;
