import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/MainStore/Store";
import OpenRoute from "./component/core/Auth/OpenRoute";
import ProtectedRoute from "./component/core/Auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import InstructorRoute from "./component/core/Auth/InstructorRoute";
import StudentRoute from "./component/core/Auth/StudentRoute";
import Loading from "./catalogs/Loading";
import ErrorPage from "./component/core/Auth/ErrorPage";

// Simple imports for specific components
import ForgetPassword from "./pages/ForgetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import CatalogsHome from "./catalogs/CatalogsHome";
import DashBoard from "./pages/DashBoard";
import MyProfile from "./Dashboard/MyProfile";
import Main from "./Dashboard/settings/Main";
import Enrolled_Main from "./Dashboard/Enrolled_Cources/Enrolled_Main";
import AddCourse from "./Dashboard/AddCourse/index";
import MyCourseHome from "./Dashboard/MyCourseSection/MyCourseHome";
import CoursePage from "./pages/CoursePage";
import Cart from "./pages/Cart";
import VideoPage from "./pages/VideoPage";
import InstructorDashBoard from "./pages/InstructorDashBoard";
import PurchaseHistory from "./pages/PurchaseHistory";
import Home from "./pages/Home"
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <OpenRoute>
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          </OpenRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <OpenRoute>
            <Suspense fallback={<Loading />}>
              <Signup />
            </Suspense>
          </OpenRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
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
        path: "/category/:tagName",
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
            path: "/dashboard/default/instructorDashBoard",
            element: (
              <ProtectedRoute>
                <InstructorRoute>
                  <InstructorDashBoard />
                </InstructorRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/default/purchase-history",
            element: (
              <ProtectedRoute>
                <StudentRoute>
                  <PurchaseHistory />
                </StudentRoute>
              </ProtectedRoute>
            ),
          },
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
              <VideoPage />
            </StudentRoute>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
);

reportWebVitals();
