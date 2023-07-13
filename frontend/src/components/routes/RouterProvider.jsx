import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import LoginPage from "../pages/LoginPage";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import TagsPage from "../pages/TagsPage";
import TagsCreate from "../pages/TagsCreate";
import TagsEdit from "../pages/TagsEdit";
import TasksPage from "../pages/TasksPage";
import TasksCreate from "../pages/TasksCreate";
import TasksEdit from "../pages/TasksEdit";



function RouterProvider() {

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;


  useEffect(() => {
    // Retrieve the cookie data
    const token = localStorage.getItem('token');

    if (token && pathname === '/') {
      navigate('/dashboard'); 
    }

    if (!token) {
      navigate('/'); 
    }


    
  }, [navigate]);

  

  return (

    <Routes>
      <Route index element={<LoginPage/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/tags" element={<TagsPage/>}></Route>
      <Route path="/tags/create" element={<TagsCreate/>}></Route>
      <Route path="/tags/:id/edit" element={<TagsEdit/>}></Route>
      <Route path="/tasks" element={<TasksPage/>}></Route>
      <Route path="/tasks/create" element={<TasksCreate/>}></Route>
      <Route path="/tasks/:id/edit" element={<TasksEdit/>}></Route>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>


);

}

export default RouterProvider;