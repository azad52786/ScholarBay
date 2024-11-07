import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Spinner from "./SpinnerInstructor";

ChartJS.register(ArcElement, Tooltip, Legend);
const InstructorChart = ({ courses }) => {

  const [currChart, setCurrentChart] = useState("students");
  // color generation
  const generateChartColor = (numberOfColor) => {
    const colors = [];
    for (let i = 0; i < numberOfColor; i++) {
      colors.push(
        `rgb(${Math.floor(Math.random() * 256)} , ${Math.floor(
          Math.random() * 256
        )} , ${Math.floor(Math.random() * 256)} )`
      );
    }
    return colors;
  };

  // Create dataset for students

  let chartDataForStudent = []
  if(courses){
    chartDataForStudent = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentEnrolled),
        backgroundColor: generateChartColor(courses.length),
        borderColor: "#222222",
        borderWidth: 1,
      },
    ],
  };
  }
 

  // create Income chart Data
  let incomeChart = [];
  if(courses){
    incomeChart = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => {
          return course.Price * course.totalStudentEnrolled;
        }),
        backgroundColor: generateChartColor(courses.length),
        borderColor: "#222222",
        borderWidth: 1,
      },
    ],
  };
  }
 

  // create Options
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "#c4c4c4",
          font: {
            size: 12,
            family: "cursive",
          },
        },
      },
    },
    layout: {
      padding: {
        left: 5,
        top: 20,
        bottom: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className="bg-richblack-800 p-5 rounded-md w-full lg:w-[70%] h-[400px]">
      <div className=" flex items-center justify-between">
        <h1 className=" md:font-bold font-semibold text-xl md:text-2xl text-pure-greys-100">
          Visualize
        </h1>
        <div className=" flex items-center justify-center  gap-3">
          {" "}
          <div
            className={`px-4 py-2 rounded-md cursor-pointer text-sm ${
              currChart === "revenue" ? "bg-richblack-900" : ""
            }`}
            onClick={() => {
              if (currChart != "revenue") {
                setCurrentChart("revenue");
              }
            }}
          >
            Revenue
          </div>
          <div
            className={`px-4 py-2 rounded-md cursor-pointer text-sm ${
              currChart === "students" ? "bg-richblack-900" : ""
            }`}
            onClick={() => {
              if (currChart != "students") {
                setCurrentChart("students");
              }
            }}
          >
            students
          </div>
        </div>
      </div>
      {
        !courses ? (<div className=" w-full h-full flex items-center justify-center"><Spinner/></div>) : <Pie
        data={currChart === "revenue" ? incomeChart : chartDataForStudent}
        options={options}
      />
      }
      
    </div>
  );
};

export default InstructorChart;
