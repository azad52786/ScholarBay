import React, { useRef, useState } from "react";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { FiUploadCloud } from "react-icons/fi";

const ThumbnailSection = ({ register, setValue, getValues, name, errors, previewFile, setPreviewFile }) => {
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const fileUploadHandler = (file) => {
    if (file) {
      setFile(file);

      const previewUrl = URL.createObjectURL(file);
      setPreviewFile(previewUrl);
      setValue(name, file);
    }
  };

  const cancelThumbnailHandler = () => {
    setPreviewFile(null);
    setFile(null);
    setValue(name, "");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      fileUploadHandler(droppedFile);
    }
  };

  return (
    <div className="w-full h-fit flex gap-y-1 flex-col mb-3 text-pure-greys-100 font-inter">
      <label htmlFor={name} className="text-pure-greys-25 w-fit">
        Upload Thumbnail Image <sup className="text-red">*</sup>
      </label>
      {!previewFile ? (
        <>
          <input
            id={name}
            hidden
            multiple
            type="file"
            className="h-11 rounded-md p-2 bg-richblack-600"
            accept=".png, .jpg, .jpeg"
            placeholder="Enter Course Title"
            ref={(e) => {
              register(name, { required: "This input is required." });
              fileRef.current = e;
            }}
            onChange={(e) => fileUploadHandler(e.target.files[0])}
          />
          <div
            className="w-full h-[22rem] text-[16px] mx-auto flex flex-col items-center justify-center gap-y-3 bg-richblack-600 rounded-md border-2 border-dashed border-pure-greys-300 cursor-pointer"
            onClick={() => fileRef.current.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="h-fit w-fit p-3  rounded-full text-yellow-25 border-2 border-yellow-25 bg-richblack-800">
              <FiUploadCloud className="w-[50px] h-[50px]" />
            </div>
            <div>
              Drag and drop an image, or <span className="text-yellow-25">Browse</span>
            </div>
            <div>Max 1MB each</div>
          </div>
          <ErrorMessageComponent name={name} errors={errors} />
        </>
      ) : (
        <div className="w-full max-h-fit mx-auto md:px-4 lg:px-7 pt-7 bg-richblack-600 rounded-md border-2 border-dashed border-pure-greys-300">
          <img
            className="w-[96%] md:w-[90%] mx-auto h-[60%] md:h-[85%] rounded-md"
            src={previewFile}
            width={200}
            height={200}
            alt="Thumbnail Preview"
          />
          <div className="w-full h-14 flex items-center justify-center pb-1" onClick={cancelThumbnailHandler}>
            <p className="cursor-pointer">Cancel</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailSection;
