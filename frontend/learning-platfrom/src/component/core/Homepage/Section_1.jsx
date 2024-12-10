import React from "react";
import HighlitedText from "./HighlitedText";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "./CTAButton";
// import banner from '../../../assets/Images/banner.mp4'
import Banner from "../../../assets/updated Images/Banner.mp4";
import CodeBlocks from "./CodeBlocks";

const Section_1 = () => {
  return (
    <div className=" mb-16 w-11/12 mx-auto flex flex-col items-center justify-between text-center relative">
      <div
        className="flex flex-row justify-between items-center w-fit px-3 py-2 bg-richblack-700 text-richblack-25
     mx-auto rounded-full gap-2 transition-all duration-200 hover:scale-95 hover:bg-richblack-800 cursor-pointer border-b-2 border-richblack-400 mt-12"
      >
        <p>Become an Instructor</p>
        <FaArrowRight />
      </div>
      <div>
        <p className=" font-bold text-3xl md:text-4xl mt-7 font-edu-sa">
          Empower Your Future with
          <HighlitedText
            text={"Coding Skills"}
            color={
              "bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] "
            }
          />
        </p>
      </div>
      <div className=" max-w-[80%] mx-auto font-edu-sa md:font-bold text-richblack-300 text-lg mt-5  text-justify leading-6 md:text-center">
        With our online coding courses, you can learn at your own pace, from
        anywhere in the world, and get access to a wealth of resources,
        including hands-on projects, quizzes, and personalized feedback from
        instructors.
      </div>
      <div className=" flex flex-row gap-6 mt-12 font-edu-sa">
        <CTAButton isyellow={true} path={"/"}>
          Learn More
        </CTAButton>
        <CTAButton isyellow={false} path={"/"}>
          Book a demo
        </CTAButton>
      </div>
      <div className="shadow-[10px_-5px_50px_-5px] shadow-blue-200 max-w-[85%] mt-12">
        <video
          width={1000}
          height={550}
          muted
          autoPlay
          loop
          className="shadow-[15px_15px_rgba(255,255,255)] bg-gradient-to-r from-teal-400 via-blue-400 to-cyan-500"
        >
          <source src={Banner} type="video/mp4"></source>
        </video>
      </div>

      {/* code section 1  */}
      <div className="  w-11/12 mt-12 md:mt-24 font-edu-sa ">
        <CodeBlocks
          postion={`lg:flex-row`}
          heading={
            <div className=" text-3xl md:text-4xl text-balance  md:text-start font-semibold md:font-bold">
              Unlock your
              <HighlitedText
                text="coding potential"
                color={
                  "bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] "
                }
              ></HighlitedText>
              <br />
              with our online courses.
            </div>
          }
          paragraph="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          ctabtn1={{
            isyellow: true,
            text: `Try it Yourself`,
            path: "/",
          }}
          ctabtn2={{
            isyellow: false,
            text: "Learn More",
            path: "/",
          }}
          codetext={`<!DOCTYPE html> \n <html> \n <head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n <body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
          codecolor={`text-yellow-25`}
          bgstyle={{
            background:
              "linear-gradient(123.77deg, #8a2be2 -6.46%, orange 59.04%, #f8f8ff 124.53%)",
          }}
        />
      </div>
      <div className="  w-11/12 mt-12 md:mt-24 font-edu-sa">
        <CodeBlocks
          postion={`lg:flex-row-reverse`}
          heading={
            <div className="md:text-4xl text-3xl text-balance  md:text-start font-semibold md:font-bold">
              Start
              <HighlitedText
                text="coding in seconds"
                color={
                  "bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] "
                }
              ></HighlitedText>
              <br />
            </div>
          }
          paragraph="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          ctabtn1={{
            isyellow: true,
            text: `Continue lesson`,
            path: "/",
          }}
          ctabtn2={{
            isyellow: false,
            text: "Learn More",
            path: "/",
          }}
          codetext={`import React from 'react'\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\n      return ( \n        <div>\n              /*Code*/\n        </div>\n       )\nexport default Home`}
          codecolor={`text-white text-opacity-75`}
          bgstyle={{
            background:
              "linear-gradient(118.19deg, #1fa2ff -3.62%, #12d8fa 50.44%, #a6ffcb 104.51%)",
          }}
        />
      </div>
    </div>
  );
};

export default Section_1;
