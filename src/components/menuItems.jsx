import {
  AiFillDashboard,
  AiFillSetting,
  AiFillUserAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import { IoIosCalendar, IoIosCart, IoMdCash } from "react-icons/io";
import { BiBell, BiPurchaseTag, BiExit } from "react-icons/bi";
import { GiHangingSign } from "react-icons/gi";
import { FaFly } from "react-icons/fa";

export const menuItems = [
  {
    label: "Dashboard",
    icon: <AiFillDashboard />,
    path: "/",
  },
  {
    label: "Company Settings",
    icon: <AiFillSetting />,
    subMenu: [
      { label: "Company Configuration", path: "/r3fz7k5b" },
      { label: "Company Master", path: "/y5ts9c4z" },
      { label: "Financial Year Master", path: "/q8wn1g6k" },
      { label: "Bank Master", path: "/i2p8s6xq" },
      { label: "Cost Center Master", path: "/e9u0b7h3" },
      { label: "Department Master", path: "/m4c8n2p1" },
      { label: "Destination Master", path: "/o7l5m1d9" },
      { label: "Three Field Master", path: "/f2q1r9z3" },
      { label: "Two Field Master", path: "/a6o0w3x5" },
      { label: "Project Master", path: "/project-master" },
    ],
  },
  {
    label: "HRM",
    icon: <FaFly />,
    subMenu: [
      {
        label: "Employee Settings",
        // onClick: () => setEmployeeSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Employee Master", path: "/h7b8n1y4" },
          { label: "Employee Type Master", path: "/t5p7e1i2" },
          { label: "Employee Grade Master", path: "/u4y8i2x7" },
          { label: "Designation Master", path: "/d9e7x2a1" },
          { label: "KRA Master", path: "/b3i7w1y8" },
          {
            label: "Job Responsibility Master",
            path: "/z6r4u2e9",
          },
          { label: "Employee Band Master", path: "/employee-band-master" },
        ],
      },
      {
        label: "Attendance Settings",
        // onClick: () => setAttendanceSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Job Type Master", path: "/c7v2m8n5" },
          { label: "Shift Master", path: "/k8g2d4j9" },
          { label: "Weekly Off Master", path: "/x5r1c9j0" },
          { label: "Holiday Master", path: "/s3f9n7v2" },
          { label: "Atten. Device Master", path: "/p2l4o8n9" },
        ],
      },
      {
        label: "Payroll Management",
        // onClick: () => setPayrollSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Earning Heads Master", path: "/i9u6l3b7" },
          {
            label: "Deduction Heads Master",
            path: "/w2z8a6s3",
          },
          {
            label: "Employee Type Earning Deduction",
            path: "/y9n2m4o7",
          },
          {
            label: "Professional Tax Setting",
            path: "/h7x4p8o3",
          },
          { label: "Advance Request", path: "/a0bdhs87t" },
          { label: "Advance Approval", path: "/p7c9h3g2" },
          { label: "Advance Repayment", path: "/q0f8x6m3" },
        ],
      },
      {
        label: "Leaves Management",
        // onClick: () => setPayrollSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Leave Type Master", path: "/q1d9y3z6" },
          {
            label: "Leave Balance Upload",
            path: "/g9f3c2v1",
          },
          {
            label: "Leave Application",
            path: "/b8m4n9r1",
          },
        ],
      },
      {
        label: "Attendance Management",
        // onClick: () => setPayrollSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Shift roster", path: "/q1d9y3z6" },
          { label: "Manual Attendance Entry", path: "/q1d9y3z6" },
          { label: "Manual Attendance Approval", path: "/q1d9y3z6" },
          { label: "Outdoor Duty Attendance Entry", path: "/q1d9y3z6" },
          { label: "Outdoor Duty Attendance Application", path: "/q1d9y3z6" },
          { label: "Employee Gate Pass Entry", path: "/q1d9y3z6" },
          { label: "Employee Gate Pass Approval", path: "/q1d9y3z6" },
          { label: "Job Allocation", path: "/q1d9y3z6" },
          { label: "Daily Attendance Processing", path: "/q1d9y3z6" },
          { label: "Attendance Import", path: "/q1d9y3z6" },
          { label: "Monthly Attendance Master", path: "/q1d9y3z6" },
        ],
      },
      {
        label: "Salary Management",
        // onClick: () => setPayrollSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Daily Overtime Processing", path: "/q1d9y3z6" },
          { label: "Monthly Overtime Processing", path: "/q1d9y3z6" },
          { label: "Overtime Approvals", path: "/q1d9y3z6" },
          { label: "Advance Management", path: "/q1d9y3z6" },
          { label: "Earning-Deducation Imports", path: "/l6t3z9d1" },
          { label: "Salary Processing", path: "/o5v2w1t8" },
          { label: "Salary Corrections", path: "/q1d9y3z6" },
        ],
      },
      {
        label: "Master Management",
        // onClick: () => setPayrollSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Master Register", path: "/q1d9y3z6" },
        ],
      },
    ],
  },
  {
    label: "Allocations",
    icon: <IoIosCalendar />,
  },
  {
    label: "Finance",
    icon: <IoMdCash />,
  },
  {
    label: "Projects",
    icon: <BiBell />,
  },
  {
    label: "Purchase",
    icon: <BiPurchaseTag />,
  },
  {
    label: "Store",
    icon: <IoIosCart />,
  },
  {
    label: "Sales",
    icon: <IoMdCash />,
  },
  {
    label: "Register New",
    icon: <GiHangingSign />,
  },
  {
    label: "Sign Out",
    icon: <BiExit />,
  },
];
