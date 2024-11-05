import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Provider } from "react-redux";
import store from "./Store/MainStore/Store";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OpenRoute from "./component/core/Auth/OpenRoute";
import ForgetPassword from "./pages/ForgetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./pages/VerifyEmail";
import DashBoard from "./pages/DashBoard";
import MyProfile from "./Dashboard/MyProfile";
import ProtectedRoute from "./component/core/Auth/ProtectedRoute";
import Main from "./Dashboard/settings/Main";
import Enrolled_Main from "./Dashboard/Enrolled_Cources/Enrolled_Main";
import AddCourse from "./Dashboard/AddCourse/index.js";
import MyCourseHome from "./Dashboard/MyCourseSection/MyCourseHome.jsx";
import CatalogsHome from "./catalogs/CatalogsHome.jsx";
import CoursePageHome from "./component/CoursePage Component/CoursePageHome.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import Cart from "./pages/Cart.jsx";
import VideoPage from "./pages/VideoPage.jsx";
import InstructorRoute from "./component/core/Auth/InstructorRoute.jsx";
import StudentRoute from "./component/core/Auth/StudentRoute.jsx";
import InstructorDashBoard from "./pages/InstructorDashBoard.jsx";
import PurchaseHistory from "./pages/PurchaseHistory.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <OpenRoute>
            <Login />
          </OpenRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <OpenRoute>
            <Signup />
          </OpenRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/forget-password",
        element: (
          <OpenRoute>
            <ForgetPassword />
          </OpenRoute>
        ),
      },
      {
        path: "/UpdatePassword/:tokenId",
        element: (
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        ),
      },
      {
        path: "/verify-email",
        element: (
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        ),
      },
      {
        path: "/catagory/:tagName",
        element: (
          <ProtectedRoute>
            <CatalogsHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/default",
        element: (
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/dashboard/default",
            element: (
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/default/setting",
            element: (
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/default/enrolled-courses",
            element: (
              <ProtectedRoute>
                <StudentRoute>
                  <Enrolled_Main />
                </StudentRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/default/add-course",
            element: (
              <ProtectedRoute>
                <InstructorRoute>
                  <AddCourse />
                </InstructorRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/default/my-courses",
            element: (
              <ProtectedRoute>
                <InstructorRoute>
                  <MyCourseHome />
                </InstructorRoute>
              </ProtectedRoute>
            ),
          }, 
          {
            path : "/dashboard/default/instructorDashBoard" , 
            element : (<ProtectedRoute>
              <InstructorRoute>
                <InstructorDashBoard/>
              </InstructorRoute>
            </ProtectedRoute>)
          } , {
            path : "/dashboard/default/purchase-history" , 
            element : (<ProtectedRoute>
              <StudentRoute>
                <PurchaseHistory/>
              </StudentRoute>
            </ProtectedRoute>) 
          }
        ],
      },
      {
        path: "/course/:courseId",
        element: (
          <ProtectedRoute>
            <CoursePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-course/:courseId/section/:sectionId/sub-section/:subSectionId",
        element: (
          <ProtectedRoute>
          <StudentRoute>
            <VideoPage /></StudentRoute>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
