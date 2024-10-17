import { ACCOUNT_TYPE } from "../utils/constants";
import { VscAccount, VscDashboard , VscVm , VscAdd , VscMortarBoard , VscHistory} from "react-icons/vsc";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/default",
    icon: VscAccount,
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/default/instructorDashBoard",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: VscDashboard,
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/default/my-courses",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: VscVm,
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/default/add-course",
    type: ACCOUNT_TYPE.INSTRUCTOR,
    icon: VscAdd,
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/default/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: VscMortarBoard,
  },
  {
    id: 6,
    name: "Purchase History",
    path: "/dashboard/default/purchase-history",
    type: ACCOUNT_TYPE.STUDENT,
    icon: VscHistory,
  },
];
