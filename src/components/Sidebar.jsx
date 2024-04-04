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
  const [filteredMenuItems, setFilteredMenuItems] = useState([]);
  const { rights } = useDetails();
  // console.log('Access rights in sidebar', rights)

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
    { 927: "Dashboard" },
    { 135: "User Settings" },
    { 864: "Company Settings" },
    { 549: "Company Configuration" },
    { 703: "Company Master" },
    { 986: "Branch Master" },
    { 872: "Financial Year Master" },
    { 287: "Bank Master" },
    { 610: "Cost Center Master" },
    { 954: "Department Master" },
    { 736: "Three Field Master" },
    { 624: "Two Field Master" },
    { 777: "User Roles" },
    { 368: "HRM" },
    { 431: "Employee Settings" },
    { 217: "Employee Master" },
    { 820: "Employee Type Master" },
    { 598: "Employee Grade Master" },
    { 143: "Designation Master" },
    { 502: "KRA Master" },
    { 395: "Job Responsibility Master" },
    { 786: "Employee Band Master" },
    { 619: "Attendance Settings" },
    { 875: "Job Type Master" },
    { 752: "Shift Master" },
    { 201: "Weekly Off Master" },
    { 409: "Holiday Master" },
    { 148: "Attendance Device Master" },
    { 924: "Payroll Management" },
    { 269: "Earning Heads Master" },
    { 370: "Deduction Heads Master" },
    { 548: "Employee Type Earning Master" },
    { 753: "Employee Type Deduction Master" },
    { 654: "Professional Tax Setting" },
    { 531: "Advance Request" },
    { 317: "Advance Approval" },
    { 497: "Advance Repayment" },
    { 803: "Leaves Management" },
    { 460: "Leave Type Master" },
    { 706: "Leave Balance Upload" },
    { 153: "Leave Application" },
    { 418: "Leave Approvals" },
    { 849: "Attendance Management" },
    { 273: "Shift Roster" },
    { 159: "Manual Attendance Entry" },
    { 523: "Manual Attendance Approval" },
    { 926: "Out Door Duty Attendance Entry" },
    { 832: "Out Door Duty Attendance Approval" },
    { 871: "Employee Gate Pass Entry" },
    { 619: "Employee Gate Pass Approval" },
    { 625: "Job Allocation" },
    { 758: "Daily Attendance Processing" },
    { 690: "Attendance Import" },
    { 907: "Monthly Attendance Processing" },
  ];

  const menuLinks = [
    { title: "Company Configuration", path: "/company-configurations" },
    { title: "Company Master", path: "/company-masters" },
    { title: "Financial Year Master", path: "/financial-masters" },
    { title: "Bank Master", path: "/bank-master" },
    { title: "Cost Center Master", path: "/costcenter-master" },
    { title: "Department Master", path: "/department-master" },
    { title: "Three Field Master", path: "/three-field-master" },
    { title: "Two Field Master", path: "/two-field-master" },
    { title: "User Roles", path: "/user-role-settings" },
    { title: "Employee Master", path: "/employee-master" },
    { title: "Employee Type Master", path: "/employee-type-master" },
    { title: "Employee Grade Master", path: "/employee-grade-master" },
    { title: "Designation Master", path: "/designation-master" },
    { title: "KRA Master", path: "/kra-master" },
    { title: "Job Responsibility Master", path: "/jobs-responsibility-master" },
    { title: "Employee Band Master", path: "/employee-band-master" },
    { title: "Job Type Master", path: "/job-type-master" },
    { title: "Shift Master", path: "/shift-master" },
    { title: "Weekly Off Master", path: "/weeklyoff-master" },
    { title: "Holiday Master", path: "/holiday-master" },
    { title: "Attendance Device Master", path: "/attDevice-master" },
    { title: "Earning Heads Master", path: "/earning-heads-master" },
    { title: "Deduction Heads Master", path: "/deduction-heads-master" },
    { title: "Employee Type Earning Master", path: "/employee-type-earning" },
    {
      title: "Employee Type Deduction Master",
      path: "/employee-type-deduction",
    },
    { title: "Professional Tax Setting", path: "/professional-tax-master" },
    { title: "Advance Request", path: "/advance-request" },
    { title: "Advance Approval", path: "/advance-approval" },
    { title: "Advance Repayment", path: "/advance-repayment" },
    { title: "Leave Type Master", path: "/leave-type-master" },
    { title: "Leave Application", path: "/leave-application" },
    { title: "Leave Approvals", path: "/leave-approval" },
    { title: "Shift Roster", path: "/shift-roster" },
    { title: "Manual Attendance Entry", path: "/manual-attendance-entry" },
    {
      title: "Manual Attendance Approval",
      path: "/manual-attendance-approval",
    },
    {
      title: "Out Door Duty Attendance Entry",
      path: "/outdoor-attendance-entry",
    },
    {
      title: "Out Door Duty Attendance Approval",
      path: "/outdoor-attendance-approval",
    },
    {
      title: "Employee Gate Pass Entry",
      path: "/attendance-master/empGatePassEntry",
    },
    { title: "Employee Gate Pass Approval", path: "/gatepass-approval" },
    {
      title: "Daily Attendance Processing",
      path: "/daily-attendance-processing",
    },
    { title: "Attendance Import", path: "/attendance-import" },
    {
      title: "Monthly Attendance Processing",
      path: "/monthly-attendance-processing",
    },
    { title: "Daily Overtime Processing", path: "/daily-overtime-processing" },
    {
      title: "Monthly Overtime Processing",
      path: "/monthly-overtime-processing",
    },
    { title: "Overtime Approvals", path: "/overtime-approvals" },
    { title: "Advance Management", path: "/advance-management" },
    { title: "Earning-Deduction Imports", path: "/ED-imports" },
    { title: "Salary Processing", path: "/salary-processing" },
    { title: "Salary Corrections", path: "/salary-corrections" },
    { title: "Branch Master", path: "/branch-master" },
  ];

  useEffect(() => {
    // Filter menu items based on access rights
    const filteredItems = menuItems.filter((item) => {
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

  const [filteredData, setFilteredData] = useState([]);

  const searchSubmenuLabels = (menu, searchQuery, rights) => {
    const filteredData = [];

    for (const menuItem of menu) {
      for (const itemId in menuItem) {
        const label = menuItem[itemId];
        // Check if the item's ID is in the rights array
        if (rights.length > 0 && rights.includes(Number(itemId))) {
          if (label.toLowerCase().includes(searchQuery)) {
            filteredData.push({ label, id: itemId });
          }
        }
      }
    }

    return filteredData;
  };

  const handleSearchChange = (word) => {
    console.log("Search Query:", word);

    const query = word.toLowerCase();

    if (query.trim() === "") {
      // If the search query is empty, clear the results
      setFilteredData([]);
    } else {
      // Search for matching submenu labels
      const filteredData = [];

      menuItems.forEach((menuItem) => {
        // Search within top-level menu items
        const submenuData = searchSubmenuLabels([menuItem], query, rights);
        filteredData.push(...submenuData);
      });

      setFilteredData(filteredData);
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className={`${
          open ? "w-[250px]" : "w-[80px]"
        } bg-blue-900 overflow-x-hidden sidebar bottom-0 lg:left-0 p-0 text-center border-0 border-radius-xl ease-in-out duration-300 overflow-y-auto w-fit scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-blue-900`}
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
              <>
                <input
                  type="text"
                  id="search"
                  placeholder="Search something..."
                  className="bg-gray-100 focus:outline-none w-full text-[13px] ml-1"
                  onChange={(e) => {
                    handleSearchChange(e.target.value);
                  }}
                />
                {/* <Icon icon="entypo:circle-with-cross" width="24" height="24"  style={{color: '#e63333'}} /> */}
              </>
            )}
          </div>
          {filteredData.length > 0 ? (
            filteredData.map((menuItem, index) => {
              const menuItemLink = menuLinks.find(
                (link) => link.title === menuItem.label
              );

              return (
                <div
                  key={index}
                  className="mt-1 flex items-center rounded-md px-4 duration-300 cursor-pointer hover-bg-gray-300 hover-bg-opacity-25 text-white"
                  onClick={() => menuItemLink && navigate(menuItemLink.path)} // Navigate to the corresponding path if menuItemLink exists
                >
                  {open && (
                    <div className="flex justify-between w-full items-center">
                      <span className="font-[Inter] font-thin text-[15px] ml-4 text-white-200">
                        {menuItem.label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
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
              {rights.includes(549) ||
              rights.includes(703) ||
              rights.includes(872) ||
              rights.includes(287) ||
              rights.includes(610) ||
              rights.includes(954) ||
              rights.includes(736) ||
              rights.includes(624) ||
              rights.includes(777) ? (
                <div
                  className="mt-1 flex items-center rounded-md px-4 duration-300
                  cursor-pointer hover:bg-gray-300 hover:bg-opacity-25 text-white whitespace-nowrap"
                >
                  <Icon
                    icon="ci:settings"
                    color="white"
                    width="24"
                    height="24"
                  />
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
                  {rights.includes(986) && (
                    <SubMenuEntry
                      title="Branch Master"
                      onClick={() => navigate("/branch-master")}
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
                  {(rights.includes(217) ||
                    rights.includes(820) ||
                    rights.includes(598) ||
                    rights.includes(143) ||
                    rights.includes(502) ||
                    rights.includes(395) ||
                    rights.includes(786)) && (
                    <SubMenuMain
                      title="Employee Settings"
                      isOpen={isEmployeeSubmenuOpen}
                      onClick={() =>
                        setEmployeeSubmenuOpen((prevState) => !prevState)
                      }
                    />
                  )}
                  {isEmployeeSubmenuOpen && (
                    <SubMenuGroup>
                      {rights.includes(217) && (
                        <SubMenuEntry
                          title="Employee Master"
                          onClick={() => navigate("/employee-master")}
                        />
                      )}
                      {rights.includes(820) && (
                        <SubMenuEntry
                          title="Employee Type Master"
                          onClick={() => navigate("/employee-type-master")}
                        />
                      )}
                      {rights.includes(598) && (
                        <SubMenuEntry
                          title="Employee Grade Master"
                          onClick={() => navigate("/employee-grade-master")}
                        />
                      )}
                      {rights.includes(143) && (
                        <SubMenuEntry
                          title="Designation Master"
                          onClick={() => navigate("/designation-master")}
                        />
                      )}
                      {rights.includes(502) && (
                        <SubMenuEntry
                          title="KRA Master"
                          onClick={() => navigate("/kra-master")}
                        />
                      )}
                      {rights.includes(395) && (
                        <SubMenuEntry
                          title="Job Responsibility Master"
                          onClick={() =>
                            navigate("/jobs-responsibility-master")
                          }
                        />
                      )}
                      {rights.includes(786) && (
                        <SubMenuEntry title="Employee Band Master" />
                      )}
                    </SubMenuGroup>
                  )}
                  {(rights.includes(875) ||
                    rights.includes(752) ||
                    rights.includes(201) ||
                    rights.includes(409) ||
                    rights.includes(148)) && (
                    <SubMenuMain
                      title="Attendance Settings"
                      isOpen={isAttendanceSubmenuOpen}
                      onClick={() =>
                        setAttendanceSubmenuOpen((prevState) => !prevState)
                      }
                    />
                  )}
                  {isAttendanceSubmenuOpen && (
                    <SubMenuGroup>
                      {rights.includes(875) && (
                        <SubMenuEntry
                          title="Job Type Master"
                          onClick={() => navigate("/job-type-master")}
                        />
                      )}
                      {rights.includes(752) && (
                        <SubMenuEntry
                          title="Shift Master"
                          onClick={() => navigate("/shift-master")}
                        />
                      )}
                      {rights.includes(201) && (
                        <SubMenuEntry
                          title="Weekly Off Master"
                          onClick={() => navigate("/weeklyoff-master")}
                        />
                      )}
                      {rights.includes(409) && (
                        <SubMenuEntry
                          title="Holiday Master"
                          onClick={() => navigate("/holiday-master")}
                        />
                      )}
                      {rights.includes(148) && (
                        <SubMenuEntry
                          title="Atten. Device Master"
                          onClick={() => navigate("/attDevice-master")}
                        />
                      )}
                    </SubMenuGroup>
                  )}
                  {(rights.includes(269) ||
                    rights.includes(370) ||
                    rights.includes(548) ||
                    rights.includes(753) ||
                    rights.includes(654) ||
                    rights.includes(531) ||
                    rights.includes(317) ||
                    rights.includes(497)) && (
                    <SubMenuMain
                      title="Payroll Management"
                      isOpen={isPayrollSubmenuOpen}
                      onClick={() =>
                        setPayrollSubmenuOpen((prevState) => !prevState)
                      }
                    />
                  )}
                  {isPayrollSubmenuOpen && (
                    <SubMenuGroup>
                      {rights.includes(269) && (
                        <SubMenuEntry
                          title="Earning Heads Master"
                          onClick={() => navigate("/earning-heads-master")}
                        />
                      )}
                      {rights.includes(370) && (
                        <SubMenuEntry
                          title="Deduction Heads Master"
                          onClick={() => navigate("/deduction-heads-master")}
                        />
                      )}
                      {rights.includes(548) && (
                        <SubMenuEntry
                          title="Employee Type Earning Master"
                          onClick={() => navigate("/employee-type-earning")}
                        />
                      )}
                      {rights.includes(753) && (
                        <SubMenuEntry
                          title="Employee Type Deduction Master"
                          onClick={() => navigate("/employee-type-deduction")}
                        />
                      )}
                      {rights.includes(654) && (
                        <SubMenuEntry
                          title="Professional Tax Setting"
                          onClick={() => navigate("/professional-tax-master")}
                        />
                      )}
                      {rights.includes(531) && (
                        <SubMenuEntry
                          title="Advance Request"
                          onClick={() => navigate("/advance-request")}
                        />
                      )}
                      {rights.includes(317) && (
                        <SubMenuEntry
                          title="Advance Approval"
                          onClick={() => navigate("/advance-approval")}
                        />
                      )}
                      {rights.includes(497) && (
                        <SubMenuEntry
                          title="Advance Repayment"
                          onClick={() => navigate("/advance-repayment")}
                        />
                      )}
                    </SubMenuGroup>
                  )}

                  {(rights.includes(460) ||
                    rights.includes(153) ||
                    rights.includes(418)) && (
                    <SubMenuMain
                      title="Leaves Management"
                      isOpen={isLeaveSubmenuOpen}
                      onClick={() =>
                        setLeaveSubmenuOpen((prevState) => !prevState)
                      }
                    />
                  )}
                  {isLeaveSubmenuOpen && (
                    <SubMenuGroup>
                      {rights.includes(460) && (
                        <SubMenuEntry
                          title="Leave Type Master"
                          onClick={() => navigate("/leave-type-master")}
                        />
                      )}
                      {/* {rights.includes(706) && (
                              <SubMenuEntry
                                  title="Leave Balance Upload"
                                  onClick={() => navigate("/leave-balance-master")}
                              />
                          )} */}
                      {rights.includes(153) && (
                        <SubMenuEntry
                          title="Leave Application"
                          onClick={() => navigate("/leave-application")}
                        />
                      )}
                      {rights.includes(418) && (
                        <SubMenuEntry
                          title="Leave Approvals"
                          onClick={() => navigate("/leave-approval")}
                        />
                      )}
                    </SubMenuGroup>
                  )}

                  {(rights.includes(273) ||
                    rights.includes(159) ||
                    rights.includes(523) ||
                    rights.includes(926) ||
                    rights.includes(832) ||
                    rights.includes(871) ||
                    rights.includes(619) ||
                    rights.includes(625) ||
                    rights.includes(758) ||
                    rights.includes(690) ||
                    rights.includes(907)) && (
                    <SubMenuMain
                      title="Attendance Management"
                      isOpen={isAttMgtSubmenuOpen}
                      onClick={() =>
                        setAttMgtSubmenuOpen((prevState) => !prevState)
                      }
                    />
                  )}
                  {isAttMgtSubmenuOpen && (
                    <SubMenuGroup>
                      {rights.includes(273) && (
                        <SubMenuEntry
                          title="Shift Roster"
                          onClick={() => navigate("/shift-roster")}
                        />
                      )}
                      {rights.includes(159) && (
                        <SubMenuEntry
                          title="Manual Attendance Entry"
                          onClick={() => navigate("/manual-attendance-entry")}
                        />
                      )}
                      {rights.includes(523) && (
                        <SubMenuEntry
                          title="Manual Attendance Approval"
                          onClick={() =>
                            navigate("/manual-attendance-approval")
                          }
                        />
                      )}
                      {rights.includes(926) && (
                        <SubMenuEntry
                          title="Out Door Duty Attendance Entry"
                          onClick={() => navigate("/outdoor-attendance-entry")}
                        />
                      )}
                      {rights.includes(832) && (
                        <SubMenuEntry
                          title="Out Door Duty Attendance Approval"
                          onClick={() =>
                            navigate("/outdoor-attendance-approval")
                          }
                        />
                      )}
                      {rights.includes(871) && (
                        <SubMenuEntry
                          title="Employee Gate Pass Entry"
                          onClick={() =>
                            navigate("/attendance-master/empGatePassEntry")
                          }
                        />
                      )}
                      {rights.includes(619) && (
                        <SubMenuEntry
                          title="Employee Gate Pass Approval"
                          onClick={() => navigate("/gatepass-approval")}
                        />
                      )}
                      {rights.includes(625) && (
                        <SubMenuEntry title="Job Allocation" />
                      )}
                      {rights.includes(758) && (
                        <SubMenuEntry
                          title="Daily Attendance Processing"
                          onClick={() =>
                            navigate("/daily-attendance-processing")
                          }
                        />
                      )}
                      {rights.includes(690) && (
                        <SubMenuEntry title="Attendance Import" />
                      )}
                      {rights.includes(907) && (
                        <SubMenuEntry
                          title="Monthly Attendance 
                          Processing"
                          onClick={() =>
                            navigate("/monthly-attendance-processing")
                          }
                        />
                      )}
                    </SubMenuGroup>
                  )}

                  {(rights.includes(879) ||
                    rights.includes(182) ||
                    rights.includes(305) ||
                    rights.includes(724) ||
                    rights.includes(407) ||
                    rights.includes(603) ||
                    rights.includes(141)) && (
                    <SubMenuMain
                      title="Salary Management"
                      isOpen={isSalarySubmenuOpen}
                      onClick={() =>
                        setSalarySubmenuOpen((prevState) => !prevState)
                      }
                    />
                  )}
                  {isSalarySubmenuOpen && (
                    <SubMenuGroup>
                      {rights.includes(879) && (
                        <SubMenuEntry title="Daily Overtime Processing" />
                      )}
                      {rights.includes(182) && (
                        <SubMenuEntry title="Monthly Overtime Processing" />
                      )}
                      {rights.includes(305) && (
                        <SubMenuEntry title="Overtime Approvals" />
                      )}
                      {rights.includes(724) && (
                        <SubMenuEntry title="Advance Management " />
                      )}
                      {rights.includes(407) && (
                        <SubMenuEntry
                          title="Earning-Deduction Imports"
                          onClick={() => navigate("/ED-imports")}
                        />
                      )}
                      {rights.includes(603) && (
                        <SubMenuEntry
                          title="Salary Processing"
                          onClick={() => navigate("/salary-processing")}
                        />
                      )}
                      {rights.includes(141) && (
                        <SubMenuEntry title="Salary Corrections" />
                      )}
                    </SubMenuGroup>
                  )}

                  {/* <SubMenuMain
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
                  )} */}
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
