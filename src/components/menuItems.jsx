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
      { label: "Company Configuration", path: "/company-configurations" },
      { label: "Company Master", path: "/company-masters" },
      { label: "Financial Year Master", path: "/financial-masters" },
      { label: "Bank Master", path: "/bank-master" },
      { label: "Cost Center Master", path: "/costcenter-master" },
      { label: "Department Master", path: "/department-master" },
      { label: "Destination Master", path: "/destination-master" },
      { label: "Three Field Master", path: "/three-field-master" },
      { label: "Two Field Master", path: "/two-field-master" },
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
          { label: "Employee Master", path: "/employee-master" },
          { label: "Employee Type Master", path: "/employee-type-master" },
          { label: "Employee Grade Master", path: "/employee-grade-master" },
          { label: "Designation Master", path: "/designation-master" },
          { label: "KRA Master", path: "/kra-master" },
          {
            label: "Job Responsibility Master",
            path: "/jobs-responsibility-master",
          },
          { label: "Employee Band Master", path: "/employee-band-master" },
        ],
      },
      {
        label: "Attendance Settings",
        // onClick: () => setAttendanceSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Job Type Master", path: "/job-type-master" },
          { label: "Shift Master", path: "/shift-master" },
          { label: "Weekly Off Master", path: "/weeklyoff-master" },
          { label: "Holiday Master", path: "/holiday-master" },
          { label: "Atten. Device Master", path: "/attDevice-master" },
        ],
      },
      {
        label: "Payroll Management",
        // onClick: () => setPayrollSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Earning Heads Master", path: "/earning-heads-master" },
          {
            label: "Deduction Heads Master",
            path: "/deduction-heads-master",
          },
          {
            label: "Employee Type Earning Deduction",
            path: "/employee-type-earning-deduction",
          },
          {
            label: "Professional Tax Setting",
            path: "/professional-tax-master",
          },
          { label: "Advance Request", path: "/advance-request" },
          { label: "Advance Approval", path: "/advance-approval" },
          { label: "Advance Repayment", path: "/advance-repayment" },
        ],
      },
      {
        label: "Leaves Management",
        // onClick: () => setPayrollSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Leave Type Master", path: "/leave-type-master" },
          {
            label: "Leave Balance Upload",
            path: "/leave-balance-master",
          },
          {
            label: "Leave Application",
            path: "/leave-approval",
          },
        ],
      },
      {
        label: "Attendance Management",
        // onClick: () => setPayrollSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Shift roster", path: "/leave-type-master" },
          { label: "Manual Attendance Entry", path: "/leave-type-master" },
          { label: "Manual Attendance Approval", path: "/leave-type-master" },
          { label: "Outdoor Duty Attendance Entry", path: "/leave-type-master" },
          { label: "Outdoor Duty Attendance Application", path: "/leave-type-master" },
          { label: "Employee Gate Pass Entry", path: "/leave-type-master" },
          { label: "Employee Gate Pass Approval", path: "/leave-type-master" },
          { label: "Job Allocation", path: "/leave-type-master" },
          { label: "Daily Attendance Processing", path: "/leave-type-master" },
          { label: "Attendance Import", path: "/leave-type-master" },
          { label: "Monthly Attendance Master", path: "/leave-type-master" },
        ],
      },
      {
        label: "Salary Management",
        // onClick: () => setPayrollSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Daily Overtime Processing", path: "/leave-type-master" },
          { label: "Monthly Overtime Processing", path: "/leave-type-master" },
          { label: "Overtime Approvals", path: "/leave-type-master" },
          { label: "Advance Management", path: "/leave-type-master" },
          { label: "Earning-Deducation Imports", path: "/ED-imports" },
          { label: "Salary Processing", path: "/salary-processing" },
          { label: "Salary Corrections", path: "/leave-type-master" },
        ],
      },
      {
        label: "Master Management",
        // onClick: () => setPayrollSubmenuOpen((prevState) => !prevState),
        subMenu: [
          { label: "Master Register", path: "/leave-type-master" },
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
