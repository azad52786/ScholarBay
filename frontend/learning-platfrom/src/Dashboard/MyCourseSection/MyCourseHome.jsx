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
import { setCourseDetails, setEditCourseDetails } from "../../Store/Slices/CreateCourseSlice";
import { useNavigate } from "react-router-dom";


const MyCourseHome = () => {
  const courses = useUserCourse();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editCourseHandeler = (course) => {
      dispatch(setEditCourseDetails(true));
      dispatch(setCourseDetails(course));
      navigate('/dashboard/default/add-course');
  }
  console.log(courses);
  return (
    <div className="w-full h-full flex  gap-5 mt-6 ">
      <div className=" w-[85%] ml-5">
        <TopBarSection />
        <div className=" w-full">
          <CourseHeadingSection />
          <div
            className=" w-full h-fit border rounded-b-md border-pure-greys-600 
            text-[14px] text-pure-greys-200 font-inter px-4 "
          >
            {courses.map((course, index) => {
              return (
                <div className=" w-full flex max-h-[180px]" key={course?._id}>
                  <div className=" w-[70%] p-2 flex gap-3 font-inter">
                    <div className=" w-[30%] rounded-md max-h-[170px] ">
                      <img
                        src={course?.thumbnail}
                        className=" h-full w-full rounded-md"
                        alt="Thumbnail"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex w-[70%] flex-col gap-y-3 p-1">
                      <h2 className=" text-pure-greys-5 font-semibold  text-xl">
                        {course.courseName}
                      </h2>
                      <div className="text-pretty">
                        {course?.courseDescription.slice(0, 120) + "..."}
                      </div>
                      <div className=" flex gap-2 font-medium text-[12px] text-pure-greys-5">
                        <p>Created :</p>
                        <p className=" inline-block">
                          {course?.createdData?.month}{" "}
                        </p>
                        <p className=" inline-block">
                          {course?.createdData?.date}
                          <span>,</span>
                        </p>
                        <p className=" ml-[-3px]">
                          {course?.createdData?.year}
                          <span> |</span>
                        </p>
                        <div className=" flex gap-x-1">
                          <p>
                            {course?.createdData?.hour < 10
                              ? "0" + course?.createdData?.hour
                              : course?.createdData?.hour}
                            <span> :</span>
                          </p>
                          <p>
                            {course?.createdData?.minute < 10
                              ? "0" + course?.createdData?.minute
                              : course?.createdData?.minute}
                          </p>
                        </div>
                      </div>
                      <div className={`bg-richblack-700 rounded-3xl flex items-center py-1 px-6  justify-around w-fit
                       gap-x-2 ${course?.status === "Drafted" ? " text-pink-200" : " text-yellow-50"}`}>
                        <div>
                          {course?.status === "Drafted" ? (
                            <FaClock />
                          ) : (
                            <IoCheckmarkCircleSharp />
                          )}
                        </div>
                        <div>{course?.status}</div>
                      </div>
                    </div>
                  </div>

                  <div className=" w-[30%] flex items-center justify-around gap-x-16">
                    <div className=" flex items-center justify-center"><FaRupeeSign/>{course?.price}</div>
                  <div className=" flex items-center justify-center gap-x-3 text-pure-greys-400">
                    <MdOutlineEdit className=" h-[30px] w-[30px] cursor-pointer "
                      onClick={() => editCourseHandeler(course)}
                    />
                    <MdDeleteSweep className=" h-[30px] w-[30px] cursor-pointer"
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
