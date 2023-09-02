import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);
  const [isCompanySubmenuOpen, setCompanySubmenuOpen] = useState(false);
  const [isEmployeeSubmenuOpen, setEmployeeSubmenuOpen] = useState(false);
  const [isAttendanceSubmenuOpen, setAttendanceSubmenuOpen] = useState(false);
  const [isAttMgtSubmenuOpen, setAttMgtSubmenuOpen] = useState(false);
  const [isPayrollSubmenuOpen, setPayrollSubmenuOpen] = useState(false);
  const [isLeaveSubmenuOpen, setLeaveSubmenuOpen] = useState(false);
  const [isSalarySubmenuOpen, setSalarySubmenuOpen] = useState(false);
  const [isRegisterSubmenuOpen, setRegisterSubmenuOpen] = useState(false);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => {
    setSubMenuOpen(false);
    setCompanySubmenuOpen(false);
    setEmployeeSubmenuOpen(false);
    setAttendanceSubmenuOpen(false);
    setAttMgtSubmenuOpen(false);
    setPayrollSubmenuOpen(false);
    setLeaveSubmenuOpen(false);
    setSalarySubmenuOpen(false);
    setRegisterSubmenuOpen(false);
    setOpen((prev) => !prev);
  };

  const SubMenuMain = ({ title, isOpen = false, onClick }) => (
    <span
      className={`flex justify-between w-full items-center hover:bg-gray-300  hover:bg-opacity-25 rounded-lg cursor-pointer ${
        isOpen ? "mb-0" : ""
      }`}
      onClick={onClick}
    >
      <h1 className="font-[Inter] text-white font-semibold text-[14px] cursor-pointer py-1.5 px-2 rounded-md mt-0 whitespace-normal">
        {title}
      </h1>
      <span
        className={`text-sm ${
          isOpen ? "" : "rotate-180 ease-linear duration-200"
        }`}
        id="arrow"
      >
        <Icon
          icon="iconamoon:arrow-up-2"
          color="white"
          width="30"
          height="30"
          className=""
        />
      </span>
    </span>
  );

  const SubMenuGroup = ({ children }) => (
    <div className="text-left text-sm font-thin px-2 w-full ease-linear duration-200 whitespace-nowrap">
      {children}
    </div>
  );

  const SubMenuEntry = ({ title, onClick }) => (
    <span
      className="flex justify-between mt-1 w-full items-center hover:bg-gray-300 hover:bg-opacity-25 rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <h1 className="font-[Inter] text-white text-[14px] cursor-pointer py-0.5 px-3 items-center rounded-md mt-1 whitespace-normal">
        {title}
      </h1>
    </span>
  );

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-[250px]" : "w-[80px]"
        } bg-blue-900 overflow-x-hidden sidebar bottom-0 lg:left-0 p-0 text-center border-0 border-radius-xl ease-in-out duration-300`}
      >
        <div className="text-white-100 text-xl items-center px-2">
          <div className="p-2.5 mt-1 flex items-center">
            <img src="/apple-icon.png" alt="icon" />
            {open && (
              <h1 className="font-[Inter] font-bold text-white justify-center text-[20px] ml-3 whitespace-nowrap">
                SysTech ERP
              </h1>
            )}
          </div>
          <hr className="text-gray-600" />
          <div className="md:px-4 px-0 mt-3 hidden md:flex items-center w-full bg-gray-100 rounded-lg cursor-pointer">
            <Icon
              className="w-5 h-5 ml-1"
              icon="ic:baseline-search"
              color="#556987"
              onClick={() => setOpen(true)}
            />
            {open && (
              <input
                type="text"
                id="search"
                placeholder="Search something..."
                className="bg-gray-100 focus:outline-none w-full text-[13px] ml-1"
                onClick={() => setOpen(true)}
              />
            )}
          </div>
          <div>
            <div className="mt-1 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white">
              <Icon
                icon="ic:round-dashboard"
                color="white"
                width="24"
                height="24"
              />
              {open && (
                <div className="flex justify-between w-full items-center">
                  <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                    Dashboard
                  </span>
                </div>
              )}
            </div>
            {/* <hr className="text-gray-200 text-opacity-25" /> */}

            <div className="mt-1 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white">
              <Icon
                icon="akar-icons:person-add"
                color="white"
                width="24"
                height="24"
              />

              {open && (
                <div className="flex justify-between w-full items-center">
                  <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                    User Settings
                  </span>
                </div>
              )}
            </div>

            <div
              className="mt-1 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white whitespace-nowrap"
            >
              <Icon icon="ci:settings" color="white" width="24" height="24" />
              {open && (
                <div
                  className="flex justify-between w-full items-center"
                  onClick={() =>
                    setCompanySubmenuOpen((prevState) => !prevState)
                  }
                >
                  <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                    Company Settings
                  </span>
                  <span
                    className={`text-sm ${
                      isCompanySubmenuOpen ? "" : "rotate-180"
                    } ease-linear duration-200`}
                    id="arrow"
                  >
                    <Icon
                      icon="iconamoon:arrow-up-2"
                      color="white"
                      width="30"
                      height="30"
                      className=""
                    />
                  </span>
                </div>
              )}
            </div>
            {isCompanySubmenuOpen && (
              <SubMenuGroup>
                <SubMenuEntry
                  title="Company Configuration"
                  onClick={() => navigate("/company-configurations")}
                />
                <SubMenuEntry
                  title="Company Master"
                  onClick={() => navigate("/company-masters")}
                />
                <SubMenuEntry
                  title="Financial Year Master"
                  onClick={() => navigate("/financial-masters")}
                />
                <SubMenuEntry
                  title="Bank Master"
                  onClick={() => navigate("/bank-master")}
                />
                <SubMenuEntry
                  title="Cost Center Master"
                  onClick={() => navigate("/costcenter-master")}
                />
                <SubMenuEntry
                  title="Department Master"
                  onClick={() => navigate("/department-master")}
                />
                <SubMenuEntry
                  title="Destination Master"
                  onClick={() => navigate("/destination-master")}
                />
                <SubMenuEntry
                  title="Three Field Master"
                  onClick={() => navigate("/three-field-master")}
                />
                <SubMenuEntry
                  title="Two Field Master"
                  onClick={() => navigate("/two-field-master")}
                />
                <SubMenuEntry title="Project Master" />
              </SubMenuGroup>
            )}

            <div
              className="mt-1 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white"
            >
              <Icon
                icon="clarity:employee-group-line"
                color="white"
                width="24"
                height="24"
              />
              {open && (
                <div
                  className="flex justify-between w-full items-center"
                  onClick={() => setSubMenuOpen((prevState) => !prevState)}
                >
                  <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                    HRM
                  </span>
                  <span
                    className={`text-sm ${
                      isSubMenuOpen ? "" : "rotate-180"
                    } ease-linear duration-200`}
                    id="arrow"
                  >
                    <Icon
                      icon="iconamoon:arrow-up-2"
                      color="white"
                      width="30"
                      height="30"
                    />
                  </span>
                </div>
              )}
            </div>
            {isSubMenuOpen && (
              <div
                className="leading-7 text-left text-sm font-thin mt-2 px-2 w-full ease-in-out duration-200 whitespace-nowrap"
                id="submenu"
              >
                <SubMenuMain
                  title="Employee Settings"
                  isOpen={isEmployeeSubmenuOpen}
                  onClick={() =>
                    setEmployeeSubmenuOpen((prevState) => !prevState)
                  }
                />
                {isEmployeeSubmenuOpen && (
                  <SubMenuGroup>
                    <SubMenuEntry
                      title="Employee Master"
                      onClick={() => navigate("employee-master")}
                    />
                    <SubMenuEntry
                      title="Employee Type Master"
                      onClick={() => navigate("employee-type-master")}
                    />
                    <SubMenuEntry
                      title="Employee Grade Master"
                      onClick={() => navigate("employee-grade-master")}
                    />
                    <SubMenuEntry title="Designation Master" />
                    <SubMenuEntry title="KRA Master" />
                    <SubMenuEntry title="Job Responsibility Master" />
                    <SubMenuEntry title="Employee Band Master" />
                  </SubMenuGroup>
                )}
                <SubMenuMain
                  title="Attendance Settings"
                  isOpen={isAttendanceSubmenuOpen}
                  onClick={() =>
                    setAttendanceSubmenuOpen((prevState) => !prevState)
                  }
                />
                {isAttendanceSubmenuOpen && (
                  <SubMenuGroup>
                    <SubMenuEntry
                      title="Job Type Master"
                      onClick={() => navigate("/job-type-master")}
                    />
                    <SubMenuEntry
                      title="Shift Master"
                      onClick={() => navigate("/shift-master")}
                    />
                    <SubMenuEntry
                      title="Weekly Off Master"
                      onClick={() => navigate("/weeklyoff-master")}
                    />
                    <SubMenuEntry
                      title="Holiday Master"
                      onClick={() => navigate("/holiday-master")}
                    />
                    <SubMenuEntry
                      title="Atten. Device Master"
                      onClick={() => navigate("/attDevice-master")}
                    />
                  </SubMenuGroup>
                )}
                <SubMenuMain
                  title="Payroll Management"
                  isOpen={isPayrollSubmenuOpen}
                  onClick={() =>
                    setPayrollSubmenuOpen((prevState) => !prevState)
                  }
                />
                {isPayrollSubmenuOpen && (
                  <SubMenuGroup>
                    <SubMenuEntry
                      title="Earning Heads Master"
                      onClick={() => navigate("/earning-heads-master")}
                    />
                    <SubMenuEntry
                      title="Deduction Heads Master"
                      onClick={() => navigate("/deduction-heads-master")}
                    />
                    <SubMenuEntry title="Employee Type Earning Deduciton" />
                    <SubMenuEntry title="Professional Tax Setting" />
                    <SubMenuEntry title="Advance Request" />
                    <SubMenuEntry title="Advance Approval" />
                    <SubMenuEntry title="Advance Repayment" />
                  </SubMenuGroup>
                )}
                <SubMenuMain
                  title="Leaves Management"
                  isOpen={isLeaveSubmenuOpen}
                  onClick={() => setLeaveSubmenuOpen((prevState) => !prevState)}
                />
                {isLeaveSubmenuOpen && (
                  <SubMenuGroup>
                    <SubMenuEntry
                      title="Leave Type Master"
                      onClick={() => navigate("/leave-type-master")}
                    />
                    <SubMenuEntry
                      title="Leave Balance Upload"
                      onClick={() => navigate("/leave-balance-master")}
                    />
                    <SubMenuEntry
                      title="Leave Application"
                      onClick={() => navigate("/leave-application")}
                    />
                    <SubMenuEntry title="Leave Approvals" />
                  </SubMenuGroup>
                )}
                <SubMenuMain
                  title="Attendance Management"
                  isOpen={isAttMgtSubmenuOpen}
                  onClick={() =>
                    setAttMgtSubmenuOpen((prevState) => !prevState)
                  }
                />
                {isAttMgtSubmenuOpen && (
                  <SubMenuGroup>
                    <SubMenuEntry title="Shift roster" />
                    <SubMenuEntry title="Mnual Attendance Entry" />
                    <SubMenuEntry title="Manual Attendance Approval" />
                    <SubMenuEntry title="Out Door Duty Attendance Entry " />
                    <SubMenuEntry title="Out Door Duty Attendance Application" />
                    <SubMenuEntry title="Employee Gate Pass Entry" />
                    <SubMenuEntry title="Employee Gate Pass Approval" />
                    <SubMenuEntry title="Job Allocation" />
                    <SubMenuEntry title="Daily Atttendance Processing" />
                    <SubMenuEntry title="Attendance Import" />
                    <SubMenuEntry title="Monthly Attendance Provessing" />
                  </SubMenuGroup>
                )}
                <SubMenuMain
                  title="Salary Management"
                  isOpen={isSalarySubmenuOpen}
                  onClick={() =>
                    setSalarySubmenuOpen((prevState) => !prevState)
                  }
                />
                {isSalarySubmenuOpen && (
                  <SubMenuGroup>
                    <SubMenuEntry title="Daily Overtime Processing" />
                    <SubMenuEntry title="Monthly Overtime Processing" />
                    <SubMenuEntry title="Overtime Approvals" />
                    <SubMenuEntry title="Advance Management " />
                    <SubMenuEntry title="Earning-Deduction Imports" />
                    <SubMenuEntry title="Salary Processing" />
                    <SubMenuEntry title="Salary Corrections" />
                  </SubMenuGroup>
                )}
                <SubMenuMain
                  title="Registers"
                  isOpen={isRegisterSubmenuOpen}
                  onClick={() =>
                    setRegisterSubmenuOpen((prevState) => !prevState)
                  }
                />
                {isRegisterSubmenuOpen && (
                  <SubMenuGroup>
                    <SubMenuEntry title="Master Register" />
                  </SubMenuGroup>
                )}
              </div>
            )}

            <div
              className="mt-1 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white"
            >
              <Icon
                icon="radix-icons:calendar"
                color="white"
                width="24"
                height="24"
              />
              {open && (
                <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200 ease-in-out duration-200">
                  Allocations
                </span>
              )}
            </div>

            <div
              className="mt-1 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white"
            >
              <Icon
                icon="streamline:money-atm-card-1-credit-pay-payment-debit-card-finance-plastic-money"
                color="white"
                width="24"
                height="24"
              />
              {open && (
                <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                  Finance
                </span>
              )}
            </div>

            <div
              className="mt-1 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white"
            >
              <Icon
                icon="eos-icons:project-outlined"
                color="white"
                width="24"
                height="24"
              />
              {open && (
                <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                  Projects
                </span>
              )}
            </div>

            <div
              className="mt-1 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white"
            >
              <Icon
                icon="bx:purchase-tag-alt"
                color="white"
                width="24"
                height="24"
              />
              {open && (
                <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                  Purchase
                </span>
              )}
            </div>

            <div
              className="mt-1 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white"
            >
              <Icon
                icon="streamline:shipping-transfer-cart-package-box-fulfillment-cart-warehouse-shipping-delivery"
                color="white"
                width="24"
                height="24"
              />
              {open && (
                <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                  Store
                </span>
              )}
            </div>

            <div
              className="mt-1 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white"
            >
              <Icon icon="ep:sell" color="white" width="24" height="24" />
              {open && (
                <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                  Sales
                </span>
              )}
            </div>
          </div>
          <div
            className={`mt-5 w-full px-2.5 pb-3 flex relative ${
              open ? "ml-40" : "ml-5"
            } ease-in-out duration-200 bg-gray-200 bg-opacity-20 items-center rounded-lg cursor-pointer`}
            onClick={handleClose}
          >
            <Icon
              icon="streamline:interface-arrows-button-left-double-arrow-arrows-double-left"
              color="white"
              width="28"
              height="28"
              rotate={`${open ? "" : "2"}`}
              className="mt-4 cursor-pointer ease-in-out duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
