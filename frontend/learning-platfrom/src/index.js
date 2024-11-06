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


const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const CatalogsHome = lazy(() => import("./catalogs/CatalogsHome"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const MyProfile = lazy(() => import("./Dashboard/MyProfile"));
const Main = lazy(() => import("./Dashboard/settings/Main"));
const Enrolled_Main = lazy(() => import("./Dashboard/Enrolled_Cources/Enrolled_Main"));
const AddCourse = lazy(() => import("./Dashboard/AddCourse/index"));
const MyCourseHome = lazy(() => import("./Dashboard/MyCourseSection/MyCourseHome"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const Cart = lazy(() => import("./pages/Cart"));
const VideoPage = lazy(() => import("./pages/VideoPage"));
const InstructorDashBoard = lazy(() => import("./pages/InstructorDashBoard"));
const PurchaseHistory = lazy(() => import("./pages/PurchaseHistory"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
            <Suspense fallback={<Loading />}>
              <ForgetPassword />
            </Suspense>
          </OpenRoute>
        ),
      },
      {
        path: "/UpdatePassword/:tokenId",
        element: (
          <OpenRoute>
            <Suspense fallback={<Loading />}>
              <UpdatePassword />
            </Suspense>
          </OpenRoute>
        ),
      },
      {
        path: "/verify-email",
        element: (
          <OpenRoute>
            <Suspense fallback={<Loading />}>
              <VerifyEmail />
            </Suspense>
          </OpenRoute>
        ),
      },
      {
        path: "/catagory/:tagName",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <CatalogsHome />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/default",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <DashBoard />
            </Suspense>
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/dashboard/default",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <MyProfile />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/default/setting",
            element: (
              <ProtectedRoute>
                <Suspense fallback={<Loading />}>
                  <Main />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/default/enrolled-courses",
            element: (
              <ProtectedRoute>
                <StudentRoute>
                  <Suspense fallback={<Loading />}>
                    <Enrolled_Main />
                  </Suspense>
                </StudentRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/default/add-course",
            element: (
              <ProtectedRoute>
                <InstructorRoute>
                  <Suspense fallback={<Loading />}>
                    <AddCourse />
                  </Suspense>
                </InstructorRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/default/my-courses",
            element: (
              <ProtectedRoute>
                <InstructorRoute>
                  <Suspense fallback={<Loading />}>
                    <MyCourseHome />
                  </Suspense>
                </InstructorRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/default/instructorDashBoard",
            element: (
              <ProtectedRoute>
                <InstructorRoute>
                  <Suspense fallback={<Loading />}>
                    <InstructorDashBoard />
                  </Suspense>
                </InstructorRoute>
              </ProtectedRoute>
            ),
          },
          {
            path: "/dashboard/default/purchase-history",
            element: (
              <ProtectedRoute>
                <StudentRoute>
                  <Suspense fallback={<Loading />}>
                    <PurchaseHistory />
                  </Suspense>
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
            <Suspense fallback={<Loading />}>
              <CoursePage />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<Loading />}>
              <Cart />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-course/:courseId/section/:sectionId/sub-section/:subSectionId",
        element: (
          <ProtectedRoute>
            <StudentRoute>
              <Suspense fallback={<Loading />}>
                <VideoPage />
              </Suspense>
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
