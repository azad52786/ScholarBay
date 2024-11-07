import React, { useState, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaCaretDown } from "react-icons/fa";
import { RiDashboard2Line } from "react-icons/ri";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MobileMenuSection = ({
  token,
  user,
  tags,
  showMenuSlider,
  setShowMenuSlider,
  logoutHandeler , 
}) => {
  const [accountSlider, setaccountSlider] = useState(false);
  const location = useLocation();
  const accountRef = useRef(null);
  const dashboardRef = useRef(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Function to handle the click outside the account div
  const handleClickOutside = (event) => {
    if (accountRef.current && accountRef.current.contains(event.target)) {


      if (!accountSlider) setaccountSlider(true);
      return;
    }
    if (
      accountRef.current &&
      dashboardRef.current &&
      dashboardRef.current.contains(event.target)
    ) {
      return;
    }
    if (accountRef.current) {
      setaccountSlider(false); // Hide the accountBelow div
    }
  };

  // Add event listener to detect clicks outside the account div
  useEffect(() => {
    if (accountSlider) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [accountSlider]);

  useEffect(() => {
    if (!menuRef.current) return;
    if (showMenuSlider) {
      menuRef.current.style.transition =
        "transform 0.4s ease-in , opacity 0.4s ease-in ";
      menuRef.current.style.transform = "translateX(0)";
      menuRef.current.style.opacity = "1";
    } else {
      menuRef.current.style.transition =
        "transform 0.6s ease-out, opacity 0.6s ease-out";
      menuRef.current.style.transform = "translateX(250px)";
      menuRef.current.style.opacity = "0";
    }
  }, [showMenuSlider]);
  useEffect(() => {
    setShowMenuSlider(false);
  }, [location.pathname]);

  return (
    <div
      className="absolute block lg:hidden bg-richblack-800 bg-opacity-80 top-[55px] font-edu-sa 
    right-0 opacity-0 translate-x-[250px]  rounded-lg w-[250px] h-fit px-5 py-3 z-40 backdrop-blur-sm border border-richblack-300 border-opacity-50
    "
      ref={menuRef}
    >
      <div
        className="w-full text-right pl-[90%]"
        onClick={(e) => setShowMenuSlider(false)}
      >
        <RxCross2 className="cursor-pointer w-7 h-7 aspect-square border border-richblack-5 rounded-md p-1" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 accountn relative">
      {    
        token ?  (<>
          <p>Account</p>
          <div
            className="flex gap-1 items-center cursor-pointer relative"
            onClick={() => {
              if (!accountSlider) setaccountSlider(true);
            }}
            ref={accountRef}
          >
            <img
              src={user?.image}
              alt="Profile Image"
              loading="lazy"
              className="w-8 h-8 rounded-full"
            />
             <FaCaretDown />
          </div>
          {accountSlider && (
            <div
              className=" absolute font-mono  top-[110%]  bg-richblack-700
            border border-opacity-65 border-richblack-50 rounded-md text-start"
              ref={dashboardRef}
            >
              <div
                className=" flex cursor-pointer px-3 items-center py-1  gap-2 border-b border-opacity-65
              border-richblack-50"
                onClick={(e) => {
                  setaccountSlider(false);
                  navigate("/dashboard/default");
                }}
              >
                <RiDashboard2Line /> <p>DashBoard</p>
              </div>
              <div
                className=" px-3 cursor-pointer py-1 flex items-center gap-2"
                onClick={logoutHandeler}
              >
                <IoLogOutOutline />
                <p>LogOut</p>
              </div>
            </div>
          )}
        </>) : (<>
          <Link to="/login">
              <button className=" px-4 py-2 bg-richblack-800 text-sm rounded-md border border-richblack-600">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-3 py-2 text-sm bg-richblack-800 lg:px-3 lg:py-2 rounded-md border border-richblack-500">
                Sign Up
              </button>
            </Link>
        </>)
      }
      {
        
      }
      </div>
      <div className=" mt-3 h-[2px] w-full bg-richblack-25"></div>
      <div className=" mt-2 w-full">
        <p className=" font-bold text-yellow-25 text-2xl text-center ">
          Courses
        </p>
        <div className=" mt-2 flex flex-col items-center gap1">
          {tags.length < 0 ? (
            <div>Loading...</div>
          ) : (
            tags.map((tag, index) => (
              <div
                key={tag?._id}
                className=" cursor-pointer p-2 rounded-md"
                onClick={() => {
                  navigate(
                    `/catagory/${tag?.name
                      .split(" ")
                      .join("-")
                      .toLowerCase()}?tagId=${tag?._id}`
                  );
                }}
              >
                {tag?.name}
              </div>
            ))
          )}
        </div>
      </div>

      <div className=" mt-3 h-[1px] w-full bg-richblack-25"></div>
      <div className=" mt-3 flex flex-col items-center gap-">
        <Link to={"/about"}>
          <p className=" cursor-pointer p-2 rounded-md">About</p>
        </Link>
        <Link to={"/contact"}>
          <p className=" cursor-pointer p-2 rounded-md">Contact</p>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenuSection;
