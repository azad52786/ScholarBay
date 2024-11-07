import React, { useEffect, useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import {
  removeSubsection,
  setIndexOfSection,
  setIndexOfSubsection,
  setSectionId,
  setShowSubSectionForm,
  setSubSection,
} from "../../Store/Slices/SubSectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import ErrorMessageComponent from "../AddCourse/ErrorMessageComponent";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { createSubSection, updateSubSection } from "../../service/operations/CourseBackendConnection";
import { setCourseDetails } from "../../Store/Slices/CreateCourseSlice";
import toast from "react-hot-toast";
// import { setSubSection } from "../../Store/Slices/CreateCourseSlice";

const SubSectionForm = () => {
  const dispatch = useDispatch();
  const videoInput = useRef(null);
  const [videoFile, setvideoFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const { courseDetails } = useSelector((store) => store.CourseData);
  const { sectionId , subsectionDetails, editSubSection } = useSelector(
    (store) => store.SubSectionData
  );
  const { token } = useSelector((store) => store.Auth);
  // sectionId , title , hours , minutes , description , video
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });
  const fileSubmitHandeler = (file) => {

    setvideoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreviewFile(previewUrl);

  };
  const cancelVideoHandeler = () => {
    setPreviewFile(null);
    setvideoFile(null);
    setValue("video", null);
  };
  
  const createForm = (data) => {
    const formData = new FormData();
    formData.append("courseId", courseDetails._id);
    if(!editSubSection) formData.append("sectionId", sectionId);
    if(editSubSection) formData.append("subSectionId", subsectionDetails._id);
    formData.append("title", data.title);
    formData.append("hours", data.hours);
    formData.append("minutes", data.minutes);
    formData.append("description", data.description);
    formData.append("video", data.video);
    return formData;
  }
  const onsubmit = async (data) => {

    // sectionId , title , hours , minutes , description , video
    if (!editSubSection) {
      let formData = createForm(data);
      let response = await createSubSection(formData, token);
      dispatch(setCourseDetails(response.updatedCourse));
      dispatch(removeSubsection());
    } else {
      setPreviewFile(subsectionDetails.videoUrl);
      if (
        data.title === subsectionDetails.title &&
        subsectionDetails.hours === data.hours &&
        subsectionDetails.minutes === data.minutes &&
        subsectionDetails.description === data.description &&
        subsectionDetails.videoUrl === data.video
      ) {
        toast.error("You didn't change anything. What do you want to update?🤔");
        return ;
      }
      let formData = createForm(data);
      let response = await updateSubSection(formData, token);
      dispatch(setCourseDetails(response.updatedCourse));
      dispatch(removeSubsection());
    }
  };

  useEffect(() => {
    if (videoFile) videoInput.current = videoFile;
    setValue("video", videoFile);
  }, [videoFile]);

  useEffect(() => {
    if (editSubSection) {
      // title , hours , minutes , description , video
      setValue("title", subsectionDetails.title);
      setValue("hours", subsectionDetails.hours);
      setValue("minutes", subsectionDetails.minutes);
      setValue("description", subsectionDetails.description);
      setValue("video", subsectionDetails.videoUrl);
      setPreviewFile(subsectionDetails.videoUrl);
    }
  }, []);
  return (
    <div className=" w-screen h-full z-30 absolute top-0 left-0 flex font-inter items-center justify-center backdrop-blur-sm">
      <div className=" w-[40%] h-fit ">
        <div
          className=" flex items-center justify-between px-4 py-3 bg-richblack-600  rounded-t-md font-semibold text-lg
              text-pure-greys-200
            "
        >
          Edit Lecture{" "}
          <ImCross
            onClick={() => {
              dispatch(removeSubsection());
            }}
            className=" cursor-pointer"
          />
        </div>
        <form
          className=" px-8 py-2 bg-richblack-700 rounded-b-md"
          onSubmit={handleSubmit(onsubmit)}
        >
          <div className=" w-full h-full">
            <label htmlFor="video" className="text-pure-greys-25 w-fit">
              Lecture Video <sup className=" text-red">*</sup>
            </label>
            {!previewFile ? (
              <>
                <input
                  id="video"
                  type="file"
                  multiple
                  accept="video/mp4,video/x-m4v,video/*"
                  ref={(e) => {
                    register("video", {
                      required: "Video of SubSection is Required",
                    });
                    videoInput.current = e;
                  }}
                  hidden
                  onChange={(e) => fileSubmitHandeler(e.target.files[0])}
                />
                <div
                  className=" w-full h-[19rem] mt-2 flex gap-y-3 flex-col "
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    fileSubmitHandeler(e.dataTransfer.files[0]);
                  }}
                >
                  <div
                    className="w-full h-[22rem] text-[16px] mx-auto flex flex-col items-center justify-center gap-y-3 bg-richblack-600 rounded-md border-2 border-dashed border-pure-greys-300 cursor-pointer"
                    onClick={() => videoInput.current.click()}
                  >
                    <div className="h-fit w-fit p-3 rounded-full text-yellow-25 border-2 border-yellow-25 bg-richblack-800">
                      <FiUploadCloud className="w-[50px] h-[50px]" />
                    </div>
                    <div>
                      Drag and drop an image, or{" "}
                      <span className="text-yellow-25">Browse</span>
                    </div>
                    <div>Max 6MB each (12MB for videos)</div>
                  </div>
                  <ErrorMessageComponent name={"video"} errors={errors} />
                </div>{" "}
              </>
            ) : (
              <div className="w-full h-[19rem] mx-auto px-7 pt-7 bg-richblack-600 rounded-md border-2 border-dashed border-pure-greys-300">
                <video
                  className="w-[90%] mx-auto h-[85%] rounded-md"
                  controls
                  //   width={200}
                  //   height={200}
                >
                  <source src={previewFile} />
                </video>
                <div className="w-full h-14 flex items-center justify-center pb-1">
                  <p
                    className="cursor-pointer underline"
                    onClick={cancelVideoHandeler}
                  >
                    Cancel
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className=" w-full mt-3 h-fit flex gap-y-1 flex-col text-pure-greys-200 ">
            <label htmlFor="title" className="text-pure-greys-25 w-fit">
              Lecture Title <sup className=" text-red">*</sup>
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter your SubSection Title"
              className=" h-11 p-2 bg-richblack-600 border-b border-pure-greys-50 rounded-md"
              {...register("title", { required: "Title is Required" })}
            />
            <ErrorMessageComponent name={"title"} errors={errors} />
          </div>
          <div className=" w-full flex  justify-between">
            <div className=" w-[45%] mt-3 h-fit flex gap-y-1 flex-col text-pure-greys-200 ">
              <label htmlFor="hours" className="text-pure-greys-25 w-fit">
                Video Playback Hours <sup className=" text-red">*</sup>
              </label>
              <input
                type="number"
                id="hours"
                placeholder="Video Playback Hours"
                className=" h-11 p-2 bg-richblack-600 border-b border-pure-greys-50 rounded-md"
                {...register("hours", {
                  required: {
                    value: true,
                    message: "Time is Required",
                  },
                  max: {
                    value: 2,
                    message: "Maximun Hour is Two",
                  },
                  pattern: {
                    value: /\d+/,
                    message: "This input is number only.",
                  },
                })}
              />
              <ErrorMessageComponent name={"hours"} errors={errors} />
            </div>
            <div className=" w-[45%] mt-3 h-fit flex gap-y-1 flex-col text-pure-greys-200 ">
              <label htmlFor="minutes" className="text-pure-greys-25 w-fit">
                Video Playback Minutes <sup className=" text-red">*</sup>
              </label>
              <input
                type="text"
                id="minutes"
                placeholder="Video Playback Minutes"
                className=" h-11 p-2 bg-richblack-600 border-b border-pure-greys-50 rounded-md"
                {...register("minutes", {
                  required: {
                    value: true,
                    message: "Time is Required",
                  },
                  max: {
                    value: 59,
                    message: "Maximun Minutes is 59",
                  },
                  pattern: {
                    value: /\d+/,
                    message: "This input is number only.",
                  },
                })}
              />
              <ErrorMessageComponent name={"minutes"} errors={errors} />
            </div>
          </div>
          <div className=" w-full mt-3 h-fit flex gap-y-1 flex-col  text-pure-greys-200 ">
            <label htmlFor="description" className="text-pure-greys-25 w-fit">
              Lecture Description <sup className=" text-red">*</sup>
            </label>
            <textarea
              type="text"
              id="description"
              placeholder="Enter your SubSection description"
              className=" h-[8rem] resize-none p-2 bg-richblack-600 border-b border-pure-greys-50 rounded-md"
              {...register("description", { required: "Title is Required" })}
            />
            <ErrorMessageComponent name={"description"} errors={errors} />
          </div>
          <div className=" flex items-center justify-center gap-x-3 mt-10">
            <button
              type="button"
              className={`font-bold text-white  bg-richblack-600  flex gap-x-2 justify-center items-center
    w-fit py-3 px-6 rounded-md transition-all duration-250 hover:scale-95 cursor-pointer border-b-2 border-r-2 border-richblack-700 hover:border-black`}
              onClick={() => {
                dispatch(removeSubsection());
              }}
            >
              <FaChevronCircleLeft />
              Back
            </button>
            <button
              type="submit"
              className={`font-bold  text-black bg-[#FFD60A]  flex gap-x-2 justify-center items-center
              w-fit py-3 px-6 rounded-md transition-all duration-250 hover:scale-95 cursor-pointer border-b-2 border-r-2 border-richblack-700 hover:border-black`}
            >
              Next
              <FaChevronCircleRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSectionForm;
