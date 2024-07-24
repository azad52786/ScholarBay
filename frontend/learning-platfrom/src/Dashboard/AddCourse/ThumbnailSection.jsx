import React, { useEffect, useRef, useState } from "react";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { FiUploadCloud } from "react-icons/fi";


const ThumbnailSection = ({ register, setValue, getValues, name, errors }) => {
  const [file, setFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const fileRef = useRef(null);
  const fileUploadHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewFile(previewUrl);
      setValue(name, selectedFile);
      // console.log("File selected:", selectedFile);
      // console.log("Preview URL:", previewUrl);
      // console.log(fileRef.current)
    }
  };
  
  const cancelThumbnailHandeler = () => {
    setPreviewFile(null);
    setFile(null);
    setValue(name , "");
  }

  return (
    <div className="w-full h-fit flex gap-y-1 flex-col mb-3 text-pure-greys-100 font-inter">
      <label
        htmlFor = {name}
        className="text-pure-greys-25"
      >
        Upload Thumbnail Image <sup className="text-red">*</sup>
      </label>
      {!previewFile ? (
        <>
          <input
            id={name}
            hidden
            type="file"
            className="h-11 rounded-md p-2 bg-richblack-600"
            accept=".png, .jpg, .jpeg"
            placeholder="Enter Course Title"
            // {...register(name , {required : "This input is required."})}
            ref={(e) => {
              // console.log(e);
              register(name, { required: "This input is required." });
              fileRef.current = e;
            }}
            onChange={(e) => fileUploadHandler(e)}
          />
          <div className=" w-full h-[22rem] text-[16px] mx-auto flex flex-col items-center justify-center gap-y-3 bg-richblack-600
                rounded-md border-2 border-dashed border-pure-greys-300 cursor-pointer"
                  onClick={() => fileRef.current.click()}
                >
                <div className=" h-fit w-fit p-3 rounded-full text-yellow-25 border-2 border-yellow-25 bg-richblack-800">
                  <FiUploadCloud className=" w-[50px] h-[50px]"/>
                </div>
                <div className="">Drag and drop an image, or <span className=" text-yellow-25">Browse</span>  </div>
                <div>Max 6MB each (12MB for videos)</div>
          </div>

          <ErrorMessageComponent name={name} errors={errors} />
        </>
      ) : (
        <div className=" w-full h-[22rem] mx-auto px-7 pt-7 bg-richblack-600 rounded-md border-2 border-dashed border-pure-greys-300">
          <img
            className=" w-[90%] mx-auto h-[85%] rounded-md"
            src={previewFile}
            width={200}
            height={200}
            alt="Thumbnail Preview"
          />
          <div className=" w-full h-14 flex items-center justify-center pb-1"
            onClick={cancelThumbnailHandeler}
          >
            <p className=" cursor-pointer">Cancel</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailSection;
