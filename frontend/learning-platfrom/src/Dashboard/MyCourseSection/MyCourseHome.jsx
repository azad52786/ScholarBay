import React, { useEffect } from "react";
import TopBarSection from "./TopBarSection";
import CourseHeadingSection from "./CourseHeadingSection";
import useUserCourse from "../../Hook/useUserCourse";
import { FaClock } from "react-icons/fa";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setCourseDetails,
  setEditCourseDetails,
} from "../../Store/Slices/CreateCourseSlice";
import { useNavigate } from "react-router-dom";

const MyCourseHome = () => {
  const courses = useUserCourse();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editCourseHandeler = (course) => {
    dispatch(setEditCourseDetails(true));
    dispatch(setCourseDetails(course));
    navigate("/dashboard/default/add-course");
  };
  useEffect(() => {
    dispatch(setCourseDetails(null));
  }, []);
  return (
    <div className="w-full font-edu-sa h-full flex my-6  ">
      <div className=" w-[95%] mx-auto md:w-[85%] ">
        <TopBarSection />
        <div className=" w-full">
          <CourseHeadingSection />
          <div
            className=" w-full h-fit border rounded-b-md border-pure-greys-600 
            text-[14px] text-pure-greys-200 font-edu-sa px-4 "
          >
            {courses.map((course, index) => {
              return (
                <div className=" w-full flex py-2 border-b" key={course?._id}>
                  <div className=" w-[70%] md:w-[70%] p-1 pl-0 flex flex-col md:flex-row md:gap-3 font-edu-sa">
                    <div className="w-[30%] rounded-md max-h-[170px] ">
                      <img
                        src={course?.thumbnail}
                        className=" w-full h-[80px] md:h-full rounded-md border border-pure-greys-400"
                        alt="Thumbnail"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex w-fit md:w-[70%] flex-col gap-y-1 md:gap-y-2">
                      <h2 className=" text-pure-greys-5 font-semibold text-sm md:text-xl">
                        {course.courseName}
                      </h2>
                      <div className=" hidden md:block text-pretty">
                        {course?.courseDescription.slice(0, 120) + "..."}
                      </div>
                      <div className=" flex gap-0 md:gap-2  font-medium text-[12px] text-pure-greys-5">
                        <p className=" mr-1">Created :</p>
                        <p className=" inline-block">
                          {course?.createdData?.month}{" "}
                        </p>
                        <p className="mr-2 inline-block">
                          {course?.createdData?.date}
                          <span className=" "> ,</span>
                        </p>
                        <p className=" ml-[-3px]">
                          {course?.createdData?.year}
                          <span  className=" mr-1"> | </span>
                        </p>
                        <div className=" flex gap-x-1">
                          <p>
                            {course?.createdData?.hour < 10
                              ? "0" + course?.createdData?.hour
                              : course?.createdData?.hour}
                            <span> : </span>
                          </p>
                          <p>
                            {course?.createdData?.minute < 10
                              ? "0" + course?.createdData?.minute
                              : course?.createdData?.minute}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`bg-richblack-700 rounded-3xl flex 
                      items-center py-1 md:px-6 px-3  justify-around w-fit text-xs md:text-base
                       gap-x-2 ${
                         course?.status === "Private"
                           ? " text-[#63e765]"
                           : " text-yellow-50"
                       }`}
                      >
                        <div>
                          {course?.status === "Private" ? (
                            <FaClock />
                          ) : (
                            <IoCheckmarkCircleSharp />
                          )}
                        </div>
                        <div>{course?.status}</div>
                      </div>
                    </div>
                  </div>

                  <div className=" w-fit md:w-[30%] flex items-center justify-center md:justify-around gap-x-4 md:gap-x-16">
                    <div className=" flex items-center justify-center text-xs md:text-base">
                      <FaRupeeSign />
                      {course?.price}
                    </div>
                    <div className=" flex items-center justify-center gap-x-3 text-pure-greys-400">
                      <MdOutlineEdit
                        className=" hover:bg-richblack-500 hover:bg-opacity-50 transition-all duration-150 text-[#e1f623f9] p-1 rounded-md h-[30px] w-[30px] cursor-pointer "
                        onClick={() => editCourseHandeler(course)}
                      />
                      <MdDeleteSweep
                        className=" hover:bg-richblack-500 hover:bg-opacity-50 transition-all duration-150 text-[#23c8f6f9] p-1 rounded-md h-[30px] w-[30px] cursor-pointer"
                        // delete course functionality pending
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourseHome;
