import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessageComponent from "../AddCourse/ErrorMessageComponent";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { resetAlltheState, setStep } from "../../Store/Slices/CreateCourseSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { modechange } from "../../service/operations/CourseBackendConnection";

const PublishHome = () => {
  const { register, getValues, formState: { errors }, handleSubmit } = useForm();
  const { courseDetails } = useSelector(store => store.CourseData);
  const { token } = useSelector(store => store.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    if(data.publish === true){
        if(courseDetails.status === "Private") ChangeModeHandler("Public");
        else  ChangeModeHandler("Private") 
    }else{
        toast.error("Please Mark the Check box");
    }
  };

  const ChangeModeHandler = async (mode) => {
  
    const formData = new FormData();
    formData.append('mode', mode);
    formData.append('courseId', courseDetails._id);
    await modechange(formData, token , navigate);
  };

  return (
    <div className="h-full mt-6 relative">
      <form
        className="bg-richblack-800 w-[93%] mr-3 mx-auto h-fit rounded-md border border-pure-greys-600 p-6 pr-12 text-pure-greys-25 font-inter flex flex-col gap-y-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-2xl font-semibold text-pure-greys-50">
          Publish Settings
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="publish"
            {...register("publish", {
              required: {
                value: true,
                message: "Please press the CheckBox",
              },
            })}
            onChange={() => console.log(getValues("publish"))}
            className="bg-black h-[20px] w-[20px] mr-3 border-2 border-pure-greys-400 cursor-pointer"
          />
          <label
            htmlFor="publish"
            className="text-pure-greys-400 text-lg cursor-pointer"
          >
            Make this Course {courseDetails.status === "Private" ? "Public" : "Private"}
          </label>
        </div>
        {errors.publish && (
          <ErrorMessageComponent errors={errors} name="publish" />
        )}

        <div className="flex items-center justify-between">
          <button
            type="button"
            className="md:py-3 py-1 px-4 gap-x-2 bg-richblack-700 
            border-b-2 border-pure-greys-400 rounded-md flex
            items-center justify-center hover:translate-y-[-7px] 
            duration-150"
            onClick={() => dispatch(setStep(2))}
          >
            <FaChevronLeft />
            Back
          </button>

          {courseDetails.status === "Private" ? (
            <div className="flex gap-x-3">
              <button
                type="submit"
                className="md:py-3 py-1 px-4 gap-x-2 bg-yellow-25
                text-pure-greys-600 border-b-2
                border-pure-greys-400 rounded-md 
                hover:translate-y-[-7px] duration-150"
                // onClick={() => ChangeModeHandler("Public")}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex gap-x-3">
              <button
                type="submit"
                className="py-3 px-4 gap-x-2 bg-yellow-25 text-pure-greys-600 border-b-2 border-pure-greys-400 rounded-md hover:translate-y-[-7px] duration-150"
                // onClick={() => ChangeModeHandler("Private")}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </form>
      <div className="w-full flex items-center justify-center mt-6">
        {courseDetails.status === "Private" ? (
          <button
            type="button"
            className="py-3 px-4 gap-x-2 bg-richblack-700 border-b-2 border-pure-greys-400 rounded-md hover:translate-y-[-7px] duration-150"
            onClick={() => {
              toast.success("Your course is successfully saved in private mode");
              navigate("/dashboard/default/my-courses");
            }}
          >
            Save in Private Mode
          </button>
        ) : (
          <button
            type="button"
            className="py-3 px-4 gap-x-2 bg-richblack-700 border-b-2 border-pure-greys-400 rounded-md hover:translate-y-[-7px] duration-150"
            onClick={() => {
              toast.success("Your course is successfully saved in public mode");
              navigate("/dashboard/default/my-courses");
            }}
          >
            Save in Public Mode
          </button>
        )}
      </div>
    </div>
  );
};

export default PublishHome;
