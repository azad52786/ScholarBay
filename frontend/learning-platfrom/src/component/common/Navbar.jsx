import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import logo1 from '../../assets/Images/logo1.jpg';
import { NavbarLinks } from "../../data/navbar-links.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdOutlineSearch } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TiShoppingCart } from "react-icons/ti";
import { FaChevronDown } from "react-icons/fa";
import Apiconnection from "../../service/Apiconnection.js";
import { COURSE_API, PROFILE_API } from "../../service/Api.js";
import { logout } from "../../service/operations/BackendConnection.js";
import { CgMenuRightAlt } from "react-icons/cg";
import MobileMenuSection from "./MobileMenuSection.jsx";
import { IoLogOutOutline } from "react-icons/io5";
import { RiDashboard2Line } from "react-icons/ri";

const Navbar = () => {
  const { token } = useSelector((state) => state.Auth);
  const { totalItems } = useSelector((state) => state.Cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  console.log(user);
  const [tags, setTags] = useState([]);
  const [showMenuSlider, setShowMenuSlider] = useState(true);
  const getUserDetails = async () => {
    try {
      const res = await Apiconnection("GET", PROFILE_API.GET_USER_DATA);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchTagsLink = async () => {
    try {
      const result = await Apiconnection("get", COURSE_API.GET_ALL_TAGS);

      console.log(result.data.tags);
      setTags(result.data.tags);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTagsLink();
    console.log(tags);
  }, []);

  const logoutHandeler = () => {
    dispatch(logout(navigate));
  };
  return (
    <div className="w-screen h-14 relative bg-richblack-900 border-b border-richblack-600">
      <div className="w-10/12 relative min-h-full mx-auto flex flex-row items-center justify-between">
        <div className=" flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          
          <img
          src={logo1}
          style={{
            boxShadow : "0px 0px 10px blue"
          }}
          className=" h-10 w-10  rounded-full "
          alt="logo"
        />
        {/* <div className=" w-1 ml-[-5px] mr-2 h-10 bg-blue-200 rounded-l rounded-full"></div> */}
          <h1 className=""
            style={{
          font : 'italic 1.2rem "Fira Sans", serif' , 
          color : "white" , 
          fontSize : "1.5rem" , 
          textShadow : "0px 0px 20px blue"
        }}
          >
          SholarBay 
          </h1>
        </div>
      
        <nav className=" gap-10  text-richblack-300 hidden lg:flex">
          {NavbarLinks.map((element, index) =>
            element.title === "Catalog" ? (
              <div
                className="relative flex flex-row gap-2 items-center cursor-pointer hover:text-richblack-50 group"
                key={index}
              >
                <div>{element.title}</div>
                <FaChevronDown className=" pt-1" />
                <div
                  className="absolute left-0 top-[90%] translate-x-[-26%] font-inter z-[-2] opacity-0 transition
                             group-hover:opacity-100 group-hover:z-30 duration-700"
                >
                  <div className="  h-6 w-6 rounded-md rotate-45 bg-richblack-5 mx-auto z-0"></div>
                  <div
                    className=" w-[300px] min-h-12 bg-richblack-5 rounded-md mt-[-15px] 
                                     text-black flex flex-col items-center justify-around p-3 relative z-10 gap-y-1
                                "
                  >
                    {tags.length <= 0 ? (
                      <div>Loading....</div>
                    ) : (
                      tags.map((tag, index) => (
                        <NavLink
                          to={`/catagory/${tag.name
                            .split(" ")
                            .join("-")
                            .toLowerCase()}?tagId=${tag._id}`}
                          key={index}
                          // className=''>
                          className={({ isActive }) =>
                            isActive
                              ? "w-full rounded-md bg-richblack-300 py-3  flex items-center justify-center"
                              : "w-full rounded-md hover:bg-richblack-50  py-3  flex items-center justify-center"
                          }
                        >
                          <div>{tag.name}</div>
                        </NavLink>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                to={element.path}
                key={element.title}
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-25 cursor-pointer"
                    : "hover:text-richblack-50 cursor-pointer"
                }
              >
                {element.title}
              </NavLink>
            )
          )}
        </nav>
        {!token && (
          <div className=" hidden  lg:flex flex-row md:gap-2 gap-2 lg:gap-3 font-inter text-richblack-100">
            <Link to="/login">
              <button className=" px-2 py-1 bg-richblack-800 lg:px-3 lg:py-2 rounded-md border border-richblack-600">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-2 py-1 bg-richblack-800 lg:px-3 lg:py-2 rounded-md border border-richblack-500">
                Sign Up
              </button>
            </Link>
          </div>
        )}
        {token && (
          <div className="flex flex-row gap-4 items-center text-richblack-5 relative">
            <MdOutlineSearch className=" hidden lg:block h-10 w-8  cursor-pointer" />
            {
            
            <div
              className=" hidden lg:block relative ml-20 lg:ml-0 cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <div className="  text-sm absolute right-[-6px] text-richblack-700 font-edu-sa rounded-full w-5 h-5 top-[-6px] text-center bg-[#4be667]">
                {totalItems}
              </div>
              <TiShoppingCart className=" h-10 w-8" />
            </div>
            }
            <div className="relative hidden w-fit lg:flex items-center gap-4 h-fit cursor-pointer z-50 group">
              <img
                src={user?.image}
                alt="profile"
                loading="lazy"
                className="w-8 h-8 rounded-full cursor-pointer"
              />
              <div
                className=" absolute top-[103%] right-[-150%]
                             bg-richblack-800 cursor-pointer text-richblack-50 flex-col rounded-md 
                              font-inter hidden group-hover:flex border border-opacity-65 border-richblack-50"
              >
                <Link to={"/dashboard/default"}>
                  <div className="flex cursor-pointer px-3 items-center py-1  gap-2 border-b border-opacity-65
              border-richblack-50"><RiDashboard2Line /> <p>DashBoard</p></div>
                </Link>
                <div onClick={logoutHandeler} className="flex cursor-pointer px-3 items-center py-1 gap-2"> <IoLogOutOutline />
                <p>LogOut</p></div>
              </div>
            </div>
          </div>
        )}
       
            <div
              className=" flex gap-3 justify-center items-center lg:hidden "
              
            >
             <div
              className=" lg:hidden relative ml-20 lg:ml-0 cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <div className="  text-sm absolute right-[-6px] text-richblack-700 font-edu-sa font-bold rounded-full w-5 h-5 top-[-6px] text-center bg-[#4be667]">
                {totalItems}
              </div>
              <TiShoppingCart className=" h-10 w-8" />
            </div> 
              <CgMenuRightAlt className=" w-8 h-8 cursor-pointer" 
              onClick={() => setShowMenuSlider((pre) => !pre)}/>
            </div>
      </div>
      
      <>
      
      {
        <MobileMenuSection
          token={token}
          logoutHandeler={logoutHandeler}
          showMenuSlider={showMenuSlider}
          setShowMenuSlider={setShowMenuSlider}
          user={user}
          tags={tags}
        />

      }</>
    </div>
  );
};

export default Navbar;
