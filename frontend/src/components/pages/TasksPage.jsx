import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '../navigation/drawer';
import TasksContent from '../content/TasksContent';



function TasksPage() {  

  return (
  <div className="">
    <div className="drawer lg:drawer-open bg-zinc-100">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex m-10 card card-side bg-white shadow-xl">
          
          <label htmlFor="my-drawer-2" className="btn btn-square lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </label>
          
          <div className='p-10 w-full'>
            <TasksContent/>
          </div>

        </div>

        <Drawer></Drawer>

    </div>
  </div>
  );
}

export default TasksPage;