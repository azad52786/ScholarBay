import React from "react";
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

const TopBarSection = () => {
  return (
    <div className=" w-full h-[120px] flex items-center justify-between">
      <div className="text-3xl font-bold font-inter text-pure-greys-50">
        My Course
      </div>
      <Link
        to={"/dashboard/default/add-course"}
        className=" flex items-center gap-x-2 px-5 py-3
      bg-yellow-25 rounded-md cursor-pointer"
      >
        <FaCirclePlus className=" text-richblack-800 " />
        <button className=" font-inter text-[14px] font-bold text-richblack-800">
          New
        </button>
      </Link>
    </div>
  );
};

export default TopBarSection;
