import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInstructorCourses } from "../../service/operations/CourseBackendConnection";
import { getInstructorDashBoardDetails } from "../../service/operations/BackendConnection";
import InstructorChart from "./InstructorChart";
import Spinner from "./SpinnerInstructor";
import CourseSection from "./CourseSection";

const InstructorDashBoardHome = () => {
  const { token } = useSelector((store) => store.Auth);
  const { user } = useSelector((store) => store.User);
  const [courses, setCourses] = useState(null);
  const [instructorDetails, setInstructorDetails] = useState(null);
  useEffect(() => {
    (async () => {
      let instructor = await getInstructorDashBoardDetails(token);

      setInstructorDetails(instructor);
      let courses = await getInstructorCourses(token);
      setCourses(courses);
    })();
  }, []);
  return (
    <div className=" w-full h-full font-edu-sa ">
      <div className=" lg:w-[85%] md:w-[90%] w-[97%] mx-auto mt-16">
        <h1 className=" font-bold text-2xl text-pure-greys-100 ">
          Hello <span className=" text-blue-100">{user.firstName}</span> 👋
        </h1>
        <p className=" text-richblack-50 text-lg mt-3">
          Let's start something new
        </p>
        <div className=" mt-4 ">
          <div className=" flex gap-5 lg:flex-row flex-col-reverse">
            <InstructorChart courses={instructorDetails?.courseData} />

            <div className=" w-full lg:w-[25%] bg-richblack-800 p-5 rounded-md flex flex-col items-center lg:items-start gap-7">
              {!instructorDetails ? (
                <div className=" w-full h-[200px] items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  <h1 className=" font-bold text-xl md:text-4xl text-[#00FF80]">
                    Statistics
                  </h1>
                  <div>
                    <p className=" font-semibold text-yellow-25 text-xl">
                      Total Earning :{" "}
                      <span className=" text-pure-greys-100">
                        {"$ " + instructorDetails?.totalIncome ? instructorDetails?.totalIncome : "0"}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className=" font-semibold text-yellow-25 text-xl">
                      Total Students :{" "}
                      <span className=" text-pure-greys-100">
                        {instructorDetails?.totalStudent ? instructorDetails.totalStudent : 0}
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <CourseSection courses = {courses}/>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashBoardHome;
