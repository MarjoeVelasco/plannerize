import React, { useState } from 'react';
import './styles/randomimage.css';



function RandomImage() {
  
  return (


          <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative" style={{ backgroundImage: "url(https://source.unsplash.com/featured/)" }}>
            <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
            <div className="w-full max-w-xl z-10">
              <div className="flex">
                <img src='src/images/plannerize-logo.png' width="50px"></img> <span className='sm:text-4xl xl:text-5xl font-bold leading-tight ml-5'>Plannerize</span>
              </div>
              <div className="sm:text-sm xl:text-md font-bold leading-tight mb-6">Empower your productivity!</div>
              <div className="sm:text-sm xl:text-md text-gray-200 font-normal"> Unlock the power of organization and productivity with our intuitive planner app. Stay on top of your tasks, manage your schedule, and achieve your goals effortlessly. <span className="font-bold">Plannerize</span> is here to help you streamline your daily life and bring harmony to your plans.</div>
            </div>

            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>


          
  );
}

export default RandomImage;
