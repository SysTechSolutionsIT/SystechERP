import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { menuItems } from "./menuItems";
import { components } from "./Components";
import { useDetails } from "./Login";

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
  const [filteredData, setFilteredData] = useState([]);
  const { rights } = useDetails()
  console.log('Access rights in sidebar', rights) 

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

  const menuItems = [
    { "927": "Dashboard" },
    { "135": "User Settings" },
    { "864": "Company Settings" },
    { "549": "Company Configuration" },
    { "703": "Company Master" },
    { "872": "Financial Year Master" },
    { "287": "Bank Master" },
    { "610": "Cost Center Master" },
    { "954": "Department Master" },
    { "736": "Three Field Master" },
    { "624": "Two Field Master" },
    { "368": "HRM" },
    { "431": "Employee Settings" },
    { "217": "Employee Master" },
    { "820": "Employee Type Master" },
    { "598": "Employee Grade Master" },
    { "143": "Designation Master" },
    { "502": "KRA Master" },
    { "395": "Job Responsibility Master" },
    { "786": "Employee Band Master" },
    { "619": "Attendance Settings" },
    { "875": "Job Type Master" },
    { "752": "Shift Master" },
    { "201": "Weekly Off Master" },
    { "409": "Holiday Master" },
    { "148": "Attendance Device Master" },
    { "924": "Payroll Management" },
    { "269": "Earning Heads Master" },
    { "370": "Deduction Heads Master" },
    { "548": "Employee Type Earning Master" },
    { "753": "Employee Type Deduction Master" },
    { "654": "Professional Tax Setting" },
    { "531": "Advance Request" },
    { "317": "Advance Approval" },
    { "497": "Advance Repayment" },
    { "803": "Leaves Management" },
    { "460": "Leave Type Master" },
    { "706": "Leave Balance Upload" },
    { "153": "Leave Application" },
    { "418": "Leave Approvals" },
    { "849": "Attendance Management" },
    { "273": "Shift Roster" },
    { "159": "Manual Attendance Entry" },
    { "523": "Manual Attendance Approval" },
    { "926": "Out Door Duty Attendance Entry" },
    { "832": "Out Door Duty Attendance Approval" },
    { "871": "Employee Gate Pass Entry" },
    { "619": "Employee Gate Pass Approval" },
    { "625": "Job Allocation" },
    { "758": "Daily Attendance Processing" },
    { "690": "Attendance Import" },
    { "907": "Monthly Attendance Processing" }
  ];

  const [filteredMenuItems, setFilteredMenuItems] = useState([]);

  useEffect(() => {
    // Filter menu items based on access rights
    const filteredItems = menuItems.filter(item => {
      const itemId = Object.keys(item)[0];
      return rights.includes(parseInt(itemId));
    });
    setFilteredMenuItems(filteredItems);
  }, [rights]);

  const handleLogOut = () => {
    navigate("/");
  };

  // const handleNewUser = () => {
  //   navigate("registration");
  // };

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

  const searchSubmenuLabels = (menu, searchQuery) => {
    const filteredData = [];

    if (menu.subMenu) {
      menu.subMenu.forEach((subMenuItem) => {
        if (subMenuItem.label.toLowerCase().includes(searchQuery)) {
          filteredData.push({
            label: subMenuItem.label,
            path: subMenuItem.path,
          });
        }

        // Recursively search within sub-submenus
        filteredData.push(...searchSubmenuLabels(subMenuItem, searchQuery));
      });
    }

    return filteredData;
  };

  const handleSearchChange = (word) => {
    const query = word.toLowerCase();

    if (query.trim() === "") {
      // If the search query is empty, clear the results
      setFilteredData([]);
    } else {
      // Search for matching submenu labels
      const filteredData = [];

      menuItems.forEach((menuItem) => {
        if (menuItem.subMenu) {
          // Search within top-level submenus
          const submenuData = searchSubmenuLabels(menuItem, query);
          filteredData.push(...submenuData);
        }
      });

      setFilteredData(filteredData);
    }
  };

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-[250px]" : "w-[80px]"
        } bg-blue-900 overflow-x-hidden sidebar bottom-0 lg:left-0 p-0 text-center border-0 border-radius-xl ease-in-out duration-300`}
      >
        <div className="text-white-100 text-xl items-center px-2">
          <div className="p-2.5 mt-1 flex items-center">
            <img
              className="w-[40px] h-[40px]"
              src="/systechlogo.png"
              alt="icon"
            />
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
                onChange={(e) => {
                  handleSearchChange(e.target.value);
                }}
              />
            )}
          </div>
          {filteredData.length > 0 ? (
            filteredData.map((menuItem, index) => (
              <div
                key={index}
                className="mt-1 flex items-center rounded-md px-4 duration-300 cursor-pointer hover-bg-gray-300 hover-bg-opacity-25 text-white"
                onClick={() => navigate(menuItem.path)}
              >
                {open && (
                  <div className="flex justify-between w-full items-center">
                    <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                      {menuItem.label}
                    </span>
                  </div>
                )}
              </div>
            ))
          ) : (
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

              {/* <div className="mt-1 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white">
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
              </div> */}
                {rights.includes(549) || rights.includes(703) || rights.includes(864) || rights.includes(287) || rights.includes(610) || rights.includes(954) || rights.includes(736) || rights.includes(624) ? (
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
                ) : null}
                {isCompanySubmenuOpen && (
                  <SubMenuGroup>
                    {rights.includes(549) && (
                      <SubMenuEntry
                        title="Company Configuration"
                        onClick={() => navigate("/company-configurations")}
                      />
                    )}
                    {rights.includes(703) && (
                      <SubMenuEntry
                        title="Company Master"
                        onClick={() => navigate("/company-masters")}
                      />
                    )}
                    {rights.includes(864) && (
                      <SubMenuEntry
                        title="Financial Year Master"
                        onClick={() => navigate("/financial-masters")}
                      />
                    )}
                    {rights.includes(287) && (
                      <SubMenuEntry
                        title="Bank Master"
                        onClick={() => navigate("/bank-master")}
                      />
                    )}
                    {rights.includes(610) && (
                      <SubMenuEntry
                        title="Cost Center Master"
                        onClick={() => navigate("/costcenter-master")}
                      />
                    )}
                    {rights.includes(954) && (
                      <SubMenuEntry
                        title="Department Master"
                        onClick={() => navigate("/department-master")}
                      />
                    )}
                    {/* <SubMenuEntry
                      title="Destination Master"
                      onClick={() => navigate("/destination-master")}
                    /> */}
                    {rights.includes(736) && (
                      <SubMenuEntry
                        title="Three Field Master"
                        onClick={() => navigate("/three-field-master")}
                      />
                    )}
                    {rights.includes(624) && (
                      <SubMenuEntry
                        title="Two Field Master"
                        onClick={() => navigate("/two-field-master")}
                      />
                    )}
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
                        onClick={() => navigate("/employee-master")}
                      />
                      <SubMenuEntry
                        title="Employee Type Master"
                        onClick={() => navigate("/employee-type-master")}
                      />
                      <SubMenuEntry
                        title="Employee Grade Master"
                        onClick={() => navigate("/employee-grade-master")}
                      />
                      <SubMenuEntry
                        title="Designation Master"
                        onClick={() => navigate("/designation-master")}
                      />
                      <SubMenuEntry
                        title="KRA Master"
                        onClick={() => navigate("/kra-master")}
                      />
                      <SubMenuEntry
                        title="Job Responsibility Master"
                        onClick={() => navigate("/jobs-responsibility-master")}
                      />
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
                      <SubMenuEntry
                        title="Employee Type Earning Master"
                        onClick={() => navigate("/employee-type-earning")}
                      />
                      <SubMenuEntry
                        title="Employee Type Deduction Master"
                        onClick={() => navigate("/employee-type-deduction")}
                      />
                      <SubMenuEntry
                        title="Professional Tax Setting"
                        onClick={() => navigate("/professional-tax-master")}
                      />
                      <SubMenuEntry
                        title="Advance Request"
                        onClick={() => navigate("/advance-request")}
                      />
                      <SubMenuEntry
                        title="Advance Approval"
                        onClick={() => navigate("/advance-approval")}
                      />
                      <SubMenuEntry
                        title="Advance Repayment"
                        onClick={() => navigate("/advance-repayment")}
                      />
                    </SubMenuGroup>
                  )}
                  <SubMenuMain
                    title="Leaves Management"
                    isOpen={isLeaveSubmenuOpen}
                    onClick={() =>
                      setLeaveSubmenuOpen((prevState) => !prevState)
                    }
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
                      <SubMenuEntry
                        title="Leave Approvals"
                        onClick={() => navigate("/leave-approval")}
                      />
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
                      <SubMenuEntry
                        title="Shift roster"
                        onClick={() => navigate("/shift-roster")}
                      />
                      <SubMenuEntry
                        title="Manual Attendance Entry"
                        onClick={() => navigate("/manual-attendance-entry")}
                      />
                      <SubMenuEntry
                        title="Manual Attendance Approval"
                        onClick={() => navigate("/manual-attendance-approval")}
                      />
                      <SubMenuEntry
                        title="Out Door Duty Attendance Entry"
                        onClick={() => navigate("/outdoor-attendance-entry")}
                      />
                      <SubMenuEntry
                        title="Out Door Duty Attendance Approval"
                        onClick={() => navigate("/outdoor-attendance-approval")}
                      />
                      <SubMenuEntry
                        title="Employee Gate Pass Entry"
                        onClick={() =>
                          navigate("/attendance-master/empGatePassEntry")
                        }
                      />
                      <SubMenuEntry
                        title="Employee Gate Pass Approval"
                        onClick={() => navigate("/gatepass-approval")}
                      />
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
                      <SubMenuEntry
                        title="Earning-Deduction Imports"
                        onClick={() => navigate("/ED-imports")}
                      />
                      <SubMenuEntry
                        title="Salary Processing"
                        onClick={() => navigate("/salary-processing")}
                      />
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
          )}
          {/* <div
            className="mt-1 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white"
            onClick={handleNewUser}
          >
            <Icon
              icon="grommet-icons:user-new"
              color="white"
              width="22"
              height="22"
            />
            {open && (
              <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                Register New
              </span>
            )}
          </div> */}
          <div
            className="mt-1 flex items-center rounded-md px-4 duration-300
            cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white"
            onClick={handleLogOut}
          >
            <Icon
              icon="clarity:sign-out-line"
              color="white"
              width="24"
              height="24"
            />
            {open && (
              <span className="font-[Inter] font-semibold text-[15px] ml-4 text-white-200">
                Sign Out
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
  );
};

export default Sidebar;
