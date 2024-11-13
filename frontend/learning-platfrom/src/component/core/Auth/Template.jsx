import { useDispatch, useSelector } from "react-redux";
import frameImg from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { GoPin } from "react-icons/go";
import { login } from "../../../service/operations/BackendConnection";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../../common/ButtonSpinner";
import { useState } from "react";

function Template({ title, description1, description2, image, formType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [demoLogin, setDemoLogin] = useState(null);
  const { loader } = useSelector((store) => store.Auth);
  const demoUserLogin = async (email) => {
    dispatch(login({ email, password: "1" }, navigate));
  };
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
        <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {title}
          </h1>
          <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
            <span className="text-richblack-100">{description1}</span>{" "}
            <span className="font-edu-sa font-bold italic text-blue-100">
              {description2}
            </span>
          </p>
          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
        <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
          <img
            src={frameImg}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />
          <img
            src={image}
            alt="Students"
            width={558}
            height={504}
            loading="lazy"
            className="absolute -top-4 right-4 z-10"
          />
          <div
            className=" z-30 left-8 lg:left-[-100px] absolute top-[10rem] md:top-24 min-h-24 bg-richblack-500 bg-opacity-90
             rotate-[20deg] p-4 pb-12 rounded-md"
          >
            <div className=" w-full mb-3 ml-[-10px]">
              <GoPin className=" w-10 h-10 text-[#8585ff] " />
            </div>
            <div className=" font-bold md:text-3xl text-2xl font-edu-sa">
              Demo View
            </div>
            <button
              className=" block w-full bg-yellow-25 px-2 py-3 mt-2
               rounded-md font-mono text-richblack-600"
              onClick={() => {
                if (loader) return;
                setDemoLogin("student")
                demoUserLogin("student@gmail.com");
              }}
            >
              {loader && demoLogin != "student" ? (
                "Log In Demo Student Account"
              ) : loader ?  (
              <div className=" h-full w-full flex items-center justify-center">
                <ButtonSpinner /></div>
              ) : "Log In Demo Student Account"}
            </button>
            <button
              className=" w-full bg-yellow-25 px-2 py-3
               rounded-md font-mono text-richblack-600 mt-3"
              onClick={() => {
                if (loader) return;
                setDemoLogin("teacher")
                demoUserLogin("teacher@gmail.com");
              }}
            >
              {loader && demoLogin != "teacher" ? (
                "Log In Demo Teacher Account"
              ) : loader ?  (
              <div className=" h-full w-full flex items-center justify-center">
                <ButtonSpinner /></div>
              ) : "Log In Demo Teacher Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;
