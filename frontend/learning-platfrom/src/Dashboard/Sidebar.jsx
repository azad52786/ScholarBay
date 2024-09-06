import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import { sidebarLinks } from "../data/dashboard-links";
import { IoLogOutOutline } from "react-icons/io5";
import LogoutModal from './LogoutModal';
import { IoIosSettings } from "react-icons/io";



const Sidebar = () => {
    const [logoutModal , setLogoutModal] = useState(false); 
    const location = useLocation();
    const { user } = useSelector((store) => store.User);
    console.log(location.pathname);
    const matchRoute = (route) => {
        return matchPath({path : route} , location.pathname);
    }
    const logoutModalHandler = () => {
      setLogoutModal(!logoutModal);
    }
  return (
  <>
    <div className='lg:visible hidden relative w-[230px] min-h-screen bg-richblack-700 lg:flex flex-col items-center justify-start gap-y-3'>
    {
      sidebarLinks.map((ele , index) => {
        if(ele.type && user.accountType !== ele.type) return null;
        const IconComponet = ele.icon;
        return (
          <NavLink to={ele.path} className="w-full" key={index}>
            <div key={ele.id} className = {`${matchRoute(ele.path) ? " bg-yellow-700 border-l-4 border-l-yellow-25" : " bg-opacity-0"} flex gap-2 w-full
               pl-10 p-3 cursor-pointer text-sm font-inter text-pure-greys-200
            `}>
             <IconComponet className=' w-[1.12rem] h-[1.12rem]' />
              <p>{ele.name}</p>
            </div>
          </NavLink>
        )
      })
    }
      <div className=' w-[80%] h-[1px] bg-richblack-200 mx-auto mb-2'></div>
      
      <NavLink to={"/dashboard/default/setting"} className="w-full">
        <div key={"Setting"} className = {`${matchRoute("/dashboard/default/setting") ? " bg-yellow-700 border-l-4 border-l-yellow-25" : " bg-opacity-0"} flex gap-2 w-full
            pl-10 p-3 cursor-pointer text-sm font-inter text-pure-greys-200 `}>
             <IoIosSettings className=' w-[1.12rem] h-[1.12rem]' />
              <p>Settings</p>
        </div>
      </NavLink>
      
      
      <div className = {`${matchRoute("/dashboard/logout") ? " bg-yellow-700 border-l-4 border-l-yellow-25" : " bg-opacity-0"} flex gap-2 w-full
          pl-10 p-3 cursor-pointer text-sm font-inter text-pure-greys-200 `}
            onClick={logoutModalHandler}
          >
           <IoLogOutOutline className='  w-[1.12rem] h-[1.12rem]' />
            <p>Log Out</p>
      </div>
      {
        logoutModal && 
        <LogoutModal setLogoutModal={setLogoutModal} logoutModalHandler={logoutModalHandler} />
      }
     
    </div>
    

     <div className=' lg:hidden z-10 visible fixed  bottom-0 left-0 right-0 w-full h-12 bg-richblack-900 p-2 flex items-center 
     justify-between border-t border-pure-greys-400 overflow-y-hidden'>
     {
      sidebarLinks.map((ele , index) => {
        if(ele.type && user.accountType !== ele.type) return null;
        const IconComponet = ele.icon;
        return (
          <NavLink to={ele.path} className="w-full" key={index}>
            <div key={ele.id} className = {`${matchRoute(ele.path) ? " bg-yellow-700 border-l-4 border-l-yellow-25" : " bg-opacity-0"} flex gap-2 w-full
                p-3 cursor-pointer text-sm font-inter text-pure-greys-200 items-center justify-center
            `}>
             <IconComponet className=' w-[1.12rem] h-[1.12rem] sm:w-8 sm:h-8' />
              <p className=' hidden md:block'>{ele.name}</p>
            </div>
          </NavLink>
          
        )
      })  
    }
    <NavLink to={"/dashboard/default/setting"} className="w-full">
        <div key={"Setting"} className = {`${matchRoute("/dashboard/default/setting") ? " bg-yellow-700 border-l-4 border-l-yellow-25" : " bg-opacity-0"} flex gap-2 w-full
            p-3 cursor-pointer text-sm font-inter text-pure-greys-200 items-center justify-center `}>
             <IoIosSettings className=' w-[1.12rem] h-[1.12rem] sm:w-8 sm:h-8' />
              <p className='hidden md:block'>Settings</p>
        </div>
      </NavLink>
    </div>
</>
  )
}

export default Sidebar;
