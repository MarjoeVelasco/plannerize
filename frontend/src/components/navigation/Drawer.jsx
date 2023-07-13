import React, { useEffect, useState, useContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useLocation, Link} from 'react-router-dom';
import { AuthContext } from '../routes/AuthProvider';

function Drawer() {

  const decodedToken = useContext(AuthContext);
 
  const location = useLocation();
  const navigate = useNavigate();
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    const selectedPages = ['/dashboard', '/profile','/tasks','/tasks/create','/tasks/*/edit','/tags', '/tags/create','/tags/*/edit'];
    const shouldShowNavigation = selectedPages.includes(location.pathname);
    setShowNavigation(shouldShowNavigation);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="drawer-side">
      
        <>
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu w-80 h-full text-base-content bg-slate-600 p-0 sm:text-sm xl:text-md text-gray-200 font-normal">
            <div
              className="w-full p-8"
              style={{
                backgroundImage: "url(https://source.unsplash.com/featured/300x201)",
                backgroundBlendMode: "overlay",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="avatar flex flex-col items-center justify-center">
                <div className="w-24">
                  <img src=" http://localhost:5173/src/images/unisex-profile.png" width="80px" alt="Profile" />
                </div>
                <p className="name text-white text-lg mt-5">{decodedToken?.name}</p>
              </div>
            </div>
            <li className="mt-3 ml-5 mr-5 text-gray-800 bg-gray-300 border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
              <Link to="/dashboard">Today</Link>
            </li>
            <li className="mt-3 ml-5 mr-5 text-gray-800 bg-gray-300 border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
              <Link to="/tasks">Tasks</Link>
            </li>
            <li className="mt-3 ml-5 mr-5 text-gray-800 bg-gray-300 border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
              <Link to="/tags">Tags</Link>
            </li>
            <li className="mt-3 ml-5 mr-5 text-gray-800 bg-gray-300 border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500">
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </>
    
    </div>
  );
}

export default Drawer;
