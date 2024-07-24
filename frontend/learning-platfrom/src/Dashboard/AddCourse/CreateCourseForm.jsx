import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { FaRupeeSign } from "react-icons/fa6";
import { COURSE_API } from "../../service/Api";
import Apiconnection from "../../service/Apiconnection";
import toast from "react-hot-toast";
import { BiSolidAddToQueue } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import ThumbnailSection from "./ThumbnailSection";

const CreateCourseForm = () => {
  const { editCourseDetails, courseDetails } = useSelector(
    (store) => store.CourseData
  );
  const [tags, setTags] = useState([]);
  const [catagoryArray, setCatagoryArray] = useState([]);
  const [instructionsArray, setInstructionsArray] = useState([]);
  const [instruction , setInstruction] = useState("");
  const [currCategory , setCurrCategory] = useState("")
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  async function fetchAllTags() {
    try {
      const result = await Apiconnection("get", COURSE_API.GET_ALL_TAGS);
      setTags(result.data.tags);
      console.log(tags);
    } catch (e) {
      toast.error("Error occur while fetching tags");
      console.log(e);
    }
  }

  function addElementHandeler(name, copyarray, setArray) {
    let newValue ;
    if(name === "instructions") newValue = instruction;
    else if(name === "category") newValue = currCategory;
    console.log(newValue);
    if (!newValue || newValue.length === 0) return;
    
    if(name === "instructions") {
        setInstructionsArray([...copyarray , newValue]);
        setValue("instructions" , [...copyarray , newValue])
        setInstruction("");
    }
    if(name === "category") {
        setCatagoryArray([...copyarray , newValue])
        setValue("category" , [...copyarray , newValue])
        console.log("value Iid : " + getValues("category"))
        setCurrCategory("")
    }
  }
  function removeElementHandeler(index, copyarray, setCopyArray) {
    let newArray = [...copyarray];
    newArray.splice(index, 1);
    setCopyArray(newArray);
  }
  useEffect(() => {
    register("category" , {required : "This Field is Required"})
    register("instructions" , {required : "This Field is Required"})
    fetchAllTags();
  }, []);
  // course,
  //   courseDescription,
  //   whatYouWillLearn,
  //   price,
  //   tag,
  //   category,
  //   instructions,
  //   benefitOfCourse

    const onSubmit = (data) => {
        console.log("hii")
            console.log(data)
        }
  return (
    <div className=" h-full w-full mt-6">
      <form
        className=" bg-richblack-800 w-[93%] mr-3 mx-auto h-fit rounded-md border border-pure-greys-600
            p-6 pr-12 text-pure-greys-25 font-inter"
            onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" w-full h-fit flex gap-y-1 flex-col mb-3 text-pure-greys-100 ">
          <label htmlFor="course" className="text-pure-greys-25">
            Course Title <sup className=" text-red">*</sup>
          </label>
          <input
            id="course"
            className=" h-11 p-2 bg-richblack-600 border-b border-pure-greys-50 rounded-md"
            placeholder="Enter Course Title"
            {...register("course", {
              required: {
                value: true,
                message: "This input is required.",
              },
            })}
          />
          <ErrorMessageComponent errors={errors} name="course" />
        </div>
        <div className=" w-full h-fit flex gap-y-1 mb-3 flex-col text-pure-greys-100 ">
          <label htmlFor="courseDescription" className="text-pure-greys-25">
            Course Description <sup className=" text-red mb-1">*</sup>
          </label>
          <textarea
            id="courseDescription"
            className=" h-[8rem] p-2 bg-richblack-600 resize-none border-b border-pure-greys-50 rounded-md"
            placeholder="Enter Course Description"
            {...register("courseDescription", {
              required: {
                value: true,
                message: "This input is required.",
              },
            })}
          />
          <ErrorMessageComponent errors={errors} name="courseDescription" />
        </div>
        <div className=" w-full h-fit flex gap-y-1 mb-3 flex-col relative text-pure-greys-100 ">
          <label htmlFor="price" className="text-pure-greys-25">
            Price <sup className=" text-red mb-1">*</sup>
          </label>
          <div className=" relative w-full h-full">
            <FaRupeeSign className=" absolute w-9 aspect-square top-[27%]" />
            <input
              id="price"
              type="number"
              className=" h-11 w-full border-b border-pure-greys-50 rounded-md pl-8 p-2 bg-richblack-600 resize-none"
              placeholder="Enter Course Price"
              {...register("price", {
                required: {
                  value: true,
                  message: "This input is required.",
                },
                pattern: {
                  value: /\d+/,
                  message: "This input is number only.",
                },
                min: {
                  value: 1,
                  message: "Price Should be Greater then Zero",
                },
              })}
            />
          </div>
          <ErrorMessageComponent errors={errors} name="price" />
        </div>
        <div className=" w-full h-fit flex gap-y-1 flex-col mb-3 ">
          <label htmlFor="tag" className="text-pure-greys-25">
            Choose your Tag <sup className=" text-red">*</sup>
          </label>
          <select
            id="tag"
            className=" h-11 border-b border-pure-greys-50 rounded-md p-2 bg-richblack-600 text-pure-greys-100 "
            placeholder="Enter Course Tag of the Course"
            {...register("tag", {
              required: {
                value: true,
                message: "This input is required.",
              },
            })}
          >
            <option disabled>Choose your Option</option>
            {tags.map((tag, index) => (
              <option value={tag.name} key={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
          <ErrorMessageComponent errors={errors} name="tag" />
        </div>
        <div className=" w-full h-fit flex gap-y-1 flex-col mb-3 text-pure-greys-100 ">
          <label htmlFor="category" className="text-pure-greys-25">
            Catagorys <sup className=" text-red">*</sup>
          </label>
          <div className="flex flex-wrap gap-4">
            {catagoryArray.map((catagory, index) => (
              <div
                key={index}
                className=" flex  w-fit h-fit p-1 px-2 bg-yellow-200 text-pure-greys-600 rounded-3xl gap-1 items-center"
              >
                <div className="">{catagory}</div>
                <RxCross2
                  className=" cursor-pointer"
                  onClick={() => {
                    removeElementHandeler(
                      index,
                      catagoryArray,
                      setCatagoryArray
                    );
                    
                  }}
                />
              </div>
            ))}
          </div>
          <div className=" relative w-full h-full">
            <input
              id="category"
              className=" h-11 w-full border-b border-pure-greys-50 rounded-md pr-8 p-2 bg-richblack-600 resize-none"
              placeholder="Enter Course Category"
              value={currCategory}
              onChange={(e)=>setCurrCategory(e.target.value)}
              
            />
            <div className=" w-[30px] h-full absolute top-[25%] right-2 cursor-pointer">
              <BiSolidAddToQueue
                className=" w-full h-[27px] aspect-square 
                              text-yellow-25"
                onClick={() => {
                  addElementHandeler(
                    "category",
                    catagoryArray,
                    setCatagoryArray
                  );
                }}
              />
            </div>
          </div>
          <ErrorMessageComponent errors={errors} name="category" />
        </div>
        <ThumbnailSection
          register={register}
          name={"thumbnailImage"}
          getValues={getValues}
          setValue={setValue}
          errors={errors}
        />
        <div className=" w-full h-fit flex gap-y-1 mb-3 flex-col text-pure-greys-100 ">
          <label htmlFor="benefitOfCourse" className="text-pure-greys-25">
            Benefits of the course <sup className=" text-red mb-1">*</sup>
          </label>
          <textarea
            id="benefitOfCourse"
            className=" h-[8rem] border-b border-pure-greys-50 rounded-md p-2 bg-richblack-600 resize-none"
            placeholder="Enter Benefits of the course"
            {...register("benefitOfCourse", {
              required: {
                value: true,
                message: "This input is required.",
              },
            })}
          />
          <ErrorMessageComponent errors={errors} name="benefitOfCourse" />
        </div>
        <div className=" w-full h-fit flex gap-y-1 flex-col mb-3 text-pure-greys-100">
          <label htmlFor="instructions" className="text-pure-greys-25">
            Instructions <sup className=" text-red">*</sup>
          </label>

          <div className=" relative w-full h-full">
            <input
              id="instructions"
              className=" h-fit w-full pr-10 p-2 bg-richblack-600 resize-none border-b border-pure-greys-50 rounded-md  "
              placeholder="Enter Course Category"
              value={instruction}
              onChange={(e) => {
                console.log(e.target.value)
                setInstruction(e.target.value)
            }}
            />
            <div className=" w-[30px] h-fit absolute top-[15%] right-2 ">
              <BiSolidAddToQueue
                className="  w-full h-[100%] aspect-square 
                                  text-yellow-25 cursor-pointer"
                onClick={() => {
                  addElementHandeler(
                    "instructions",
                    instructionsArray,
                    setInstructionsArray 
                  );
                  setValue("instructions" , instructionsArray)
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-2 ">
            {instructionsArray.map((instruction, index) => (
              <div
                key={index}
                className=" flex break-words  max-w-full h-fit p-1 px-2 bg-richblack-700 gap-1 items-center border-b border-pure-greys-50 rounded-md  "
              >
                <p className="break-words w-[95%]">{instruction}</p>
                <RxCross2
                  className=" cursor-pointer"
                  onClick={() => {
                    removeElementHandeler(
                      index,
                      instructionsArray,
                      setInstructionsArray
                    );
                  }}
                />
              </div>
            ))}
          </div>

          <ErrorMessageComponent errors={errors} name="category" />
        </div>
        {/* <input type="submit" className={`font-bold  text-black bg-[#FFD60A]
    w-fit py-3 px-6 rounded-md transition-all duration-250 hover:scale-95 cursor-pointer border-b-2 border-r-2 border-richblack-700 hover:border-black`}/> */}
    <input type="submit" className=" cursor-pointer"/>
      </form>
    </div>
  );
};

export default CreateCourseForm;
