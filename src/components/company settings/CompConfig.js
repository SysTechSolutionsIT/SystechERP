import React, { useState } from "react";
import { useFormik } from "formik";

export default function EMPTabs() {
  const [openTab, setOpenTab] = React.useState(1);

  //For SMS Settings
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, setTextInput] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleTextChange = (event) => {
    setTextInput(event.target.value);
  };
  //For Payroll Settings
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  //For General
  const [isActive, setIsActive] = useState(false);

  const handleCheckboxChange = () => {
    setIsActive(!isActive);
  };

  //Currencies - Tab 1
  const currencies = [
    { abbreviation: "INR", name: "Indian Rupees" },
    { abbreviation: "USD", name: "United States Dollar" },
    { abbreviation: "EUR", name: "Euro" },
    { abbreviation: "JPY", name: "Japanese Yen" },
    { abbreviation: "GBP", name: "British Pound Sterling" },
    { abbreviation: "AUD", name: "Australian Dollar" },
    { abbreviation: "CAD", name: "Canadian Dollar" },
    { abbreviation: "CHF", name: "Swiss Franc" },
    { abbreviation: "CNY", name: "Chinese Yuan" },
  ];

  //Formik for Form Submission
  const formik = useFormik({
    initialValues: {
      currency: "INR",
      theme: "",
      date: "",
      sessionTM: 0,
      remarks: "",
      status: "inactive",

      empID: "",
      cmulti: "",

      att: "",
      aProcess: "",
      atap: "",
      shiftFlag: "",
      jobApp: "",
      holiday: "",
      odFlag: "",
      otFlag: "",
      LAFlag: "",

      otCalc: "",
      esicSal: "",
      pfSal: "",
      gratuity: "",
      mlwf1: "",
      mlwf2: "",
      salLock: "",
      minWages: "",
      remarks1: "",
      salstat: "",

      email: "",
      smtpHost: "",
      sender: "",
      username: "",
      password: "",

      message: "",

      smsUrl: "",
      sms: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      // Your other submission logic

      // Reset the form to its initial state
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-4">
        <div className="bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg">
          Company Configurations
        </div>
      </div>
      <div className="flex font-[Inter] justify-center">
        <div className="ml-0">
          <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
            <li className="-mb-px mr-2 ml-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 font-bold " +
                  (openTab === 1
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
              >
                GENERAL
              </p>
            </li>
            <li className="-mb-px mr-2 ml-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 font-semibold  rounded-lg " +
                  (openTab === 2
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
              >
                COMPANY
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 font-semibold  rounded-lg " +
                  (openTab === 3
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
              >
                ATTENDANCE
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 font-semibold  rounded-lg " +
                  (openTab === 4
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
              >
                PAYROLL
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 font-semibold  rounded-lg " +
                  (openTab === 5
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(5);
                }}
              >
                EMAIL SETTINGS
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 font-semibold  rounded-lg " +
                  (openTab === 6
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(6);
                }}
              >
                EMAIL FORMAT
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 font-semibold  rounded-lg " +
                  (openTab === 7
                    ? "text-s font-bold uppercase text-white bg-blue-900 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(7);
                }}
              >
                SMS FORMAT
              </p>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
            <div className="px-4 py-5 flex-auto overflow-y-auto max-h-[500px]">
              <div className="tab-content tab-space">
                {/*General */}
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <div className="flex gap-7 ">
                    <div className="flex flex-col py-2 w-1/2">
                      <label
                        htmlFor="currency"
                        className="mb-1 font-semibold text-[13px]"
                      >
                        Currency
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        className="text-[13px] w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                        default="Indian Rupees"
                        value={formik.values.currency}
                        onChange={formik.handleChange}
                      >
                        {currencies.map((currency, index) => (
                          <option key={index} value={currency.abbreviation}>
                            {currency.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col py-2 w-1/2">
                      <label
                        htmlFor="dropdown2"
                        className="mb-1 font-semibold text-[13px]"
                      >
                        Themes
                      </label>
                      <select
                        id="Theme"
                        name="theme"
                        className="w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                        onChange={formik.handleChange}
                      >
                        {months.map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="w-1/2 pr-4">
                      <p className="mb-3 capitalize mt-1 font-semibold text-[13px]">
                        Date Format
                      </p>
                      <input
                        id="DateF"
                        type="text"
                        name="date"
                        className={`text-[13px] w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        placeholder="dd/mm/yyyy"
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold text-[13px]">
                        Session Timeout
                      </p>
                      <input
                        id="SessTM"
                        type="number"
                        name="sessionTM"
                        className={`w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="w-1/2 pr-4">
                      <p className="mb-3 capitalize mt-1 font-semibold text-[13px]">
                        Remarks
                      </p>
                      <input
                        id="remarks"
                        name="remarks"
                        type="text"
                        className={`text-[13px] w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold text-[13px]">
                        Status
                      </p>
                      <div className="flex items-center text-[13px]">
                        <input
                          type="checkbox"
                          id="activeCheckbox"
                          name="status"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={isActive}
                          onChange={formik.handleChange}
                        />
                        <label
                          htmlFor="activeCheckbox"
                          className="ml-2 text-gray-700 text-[13px]"
                        >
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Company Tab*/}
                <div className={openTab === 2 ? "block" : "hidden"}>
                  <div className="flex justify-between">
                    <div className="flex flex-col p-2 space-x-2">
                      <p className="mb-3 font-semibold text-[13px]">
                        Employee ID Prefix
                      </p>
                      <div className="flex">
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="empID"
                            value="Yes"
                            className="mr-2"
                            onChange={formik.handleChange}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="empID"
                            value="No"
                            className="mr-2 ml-2"
                            onChange={formik.handleChange}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col p-2">
                      <p className="mb-3 font-semibold text-[13px]">
                        Company Multibranch
                      </p>
                      <div className="flex space-x-2">
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="cmulti"
                            value="Yes"
                            className="mr-2 ml-2"
                            onChange={formik.handleChange}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="cmulti"
                            value="No"
                            className="mr-2"
                            onChange={formik.handleChange}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attendance Tab */}
                <div className={openTab === 3 ? "block" : "hidden"}>
                  <div className="flex justify-between">
                    <div className="flex flex-col p-2 w-1/2">
                      <p className="mb-3 font-semibold text-[13px]">
                        Attendance Flag
                      </p>
                      <div className="flex space-x-2">
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="att"
                            value="daily"
                            className="mr-2 ml-2"
                            onChange={formik.handleChange}
                          />
                          Daily
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="att"
                            value="monthly"
                            className="mr-2"
                            onChange={formik.handleChange}
                          />
                          Monthly
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-between w-1/2">
                      <div className="flex flex-col p-2">
                        <p className="mb-3 font-semibold text-[13px]">
                          Attendance Process
                        </p>
                        <div className="flex space-x-2">
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="atProcess"
                              value="all"
                              className="mr-2 ml-2"
                              onChange={formik.handleChange}
                            />
                            All
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="atProcess"
                              value="manual"
                              className="mr-2"
                              onChange={formik.handleChange}
                            />
                            Manual
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="atProcess"
                              value="excel"
                              className="mr-2"
                              onChange={formik.handleChange}
                            />
                            Excel Import
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="atProcess"
                              value="autoD"
                              className="mr-2"
                              onChange={formik.handleChange}
                            />
                            Auto Download
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-8 justify-between">
                    <div className="flex flex-col p-2 w-1/2">
                      <p className="mb-3 font-semibold text-[13px]">
                        Attendance Approval Flag
                      </p>
                      <div className="flex space-x-2">
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="atap"
                            value="yes"
                            className="mr-2 ml-2"
                            onChange={formik.handleChange}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="atap"
                            value="no"
                            className="mr-2"
                            onChange={formik.handleChange}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div className="flex space-x-8 justify-between w-1/2">
                      <div className="flex flex-col p-2 ">
                        <p className="mb-3 font-semibold text-[13px]">
                          Fix Shift Flag{" "}
                        </p>
                        <div className="flex space-x-2">
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="shiftFlag"
                              value="yes"
                              className="mr-2 ml-2"
                              onChange={formik.handleChange}
                            />
                            Yes
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="shiftFlag"
                              value="no"
                              className="mr-2"
                              onChange={formik.handleChange}
                            />
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-8 justify-between">
                    <div className="flex flex-col p-2 w-1/2">
                      <p className="mb-3 font-semibold text-[13px]">
                        Job Approval
                      </p>
                      <div className="flex space-x-2">
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="jobApp"
                            value="yes"
                            className="mr-2 ml-2"
                            onChange={formik.handleChange}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="jobApp"
                            value="no"
                            className="mr-2"
                            onChange={formik.handleChange}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div className="flex space-x-8 justify-between w-1/2">
                      <div className="flex flex-col p-2 ">
                        <p className="mb-3 font-semibold text-[13px]">
                          Paid Holiday Logic{" "}
                        </p>
                        <div className="flex space-x-2">
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="holiday"
                              value="Add1"
                              className="mr-2 ml-2 whitespace-nowrap"
                              onChange={formik.handleChange}
                            />
                            Add 1 day in Presenty
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="holiday"
                              value="coff"
                              className="mr-2 whitespace-nowrap"
                              onChange={formik.handleChange}
                            />
                            Give C-Off
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-8 justify-between">
                    <div className="flex flex-col p-2 w-1/2">
                      <p className="mb-3 font-semibold text-[13px]">
                        OD Approval Flag
                      </p>
                      <div className="flex space-x-2">
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="odFlag"
                            value="yes"
                            className="mr-2 ml-2"
                            onChange={formik.handleChange}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="odFlag"
                            value="no"
                            className="mr-2"
                            onChange={formik.handleChange}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div className="flex space-x-8 justify-between w-1/2">
                      <div className="flex flex-col p-2">
                        <p className="mb-3 font-semibold text-[13px]">
                          OT Approval Flag{" "}
                        </p>
                        <div className="flex space-x-2">
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="otFlag"
                              value="yes"
                              className="mr-2 ml-2"
                              onChange={formik.handleChange}
                            />
                            Yes
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="otFlag"
                              value="no"
                              className="mr-2"
                              onChange={formik.handleChange}
                            />
                            No
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-8 justify-between">
                    <div className="flex flex-col p-2 w-1/2">
                      <p className="mb-3 font-semibold text-[13px]">
                        Leave Approval Flag
                      </p>
                      <div className="flex space-x-2">
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="LAFlag"
                            value="yes"
                            className="mr-2 ml-2"
                            onChange={formik.handleChange}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="LAFlag"
                            value="no"
                            className="mr-2"
                            onChange={formik.handleChange}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col p-2 w-1/2">
                      <p className="mb-3 font-semibold mr-4 text-[13px]">
                        Attendance Lock day
                      </p>
                      <input
                        id="AlockDay"
                        name="ALockDay"
                        type="text"
                        className={`px-4 h-10 text-[13px] py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Payroll Tab */}
                <div className={openTab === 4 ? "block" : "hidden"}>
                  <div className="flex p-2">
                    <div className="flex flex-col p-2  w-1/2 pr-4">
                      <p className="mb-3 font-semibold text-[13px]">
                        OT Calculation Flag
                      </p>
                      <div className="flex space-x-2">
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="otCalc"
                            value="daily"
                            className="mr-2 ml-2"
                            onChange={formik.handleChange}
                          />
                          Daily
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="otCalc"
                            value="monthly"
                            className="mr-2"
                            onChange={formik.handleChange}
                          />
                          Monthly
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col p-2 w-1/2 pr-4">
                      <p className="mb-3 font-semibold mr-4 text-[13px]">
                        ESIC Salary Limit
                      </p>
                      <input
                        name="esicSal"
                        type="text"
                        className={`px-4 h-10 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6 text-[13px]`}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="w-1/2 pr-4">
                      <p className="mb-3 capitalize mt-1 font-semibold text-[13px]">
                        PF Salary Limit
                      </p>
                      <input
                        id="PFSalaryLimit"
                        name="pfSal"
                        type="text"
                        className={` w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold text-[13px]">
                        Gratuity Years Limit
                      </p>
                      <input
                        id="gratuity"
                        name="gratuity"
                        type="text"
                        className={` w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-6 mb-4">
                    <div className="flex flex-col p-2 w-1/2">
                      <label
                        htmlFor="dropdown1"
                        className="mb-1 font-semibold text-[13px]"
                      >
                        MLWF Month 1
                      </label>
                      <select
                        id="mlwf1"
                        name="mlwf1"
                        className="w-full  h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                        onChange={formik.handleChange}
                      >
                        {months.map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col p-2 w-1/2">
                      <label
                        htmlFor="dropdown2"
                        className="mb-1 font-semibold text-[13px]"
                      >
                        MLWF Month 2
                      </label>
                      <select
                        id="mlwf2"
                        className="w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                        onChange={formik.handleChange}
                      >
                        {months.map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="w-1/2 pr-4">
                      <p className="mb-3 capitalize mt-1 font-semibold text-[13px]">
                        Salary Lock Day
                      </p>
                      <input
                        id="SLockday"
                        name="salLock"
                        type="text"
                        className={`w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold text-[13px]">
                        Salary Minimum Wages
                      </p>
                      <input
                        id="MinWages"
                        name="minWages"
                        type="text"
                        className={`w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="w-1/2 pr-4">
                      <p className="mb-3 capitalize mt-1 font-semibold text-[13px]">
                        Remarks
                      </p>
                      <input
                        id="remarks"
                        name="remarks1"
                        type="text"
                        className={`w-full  h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold text-[13px]">
                        Status
                      </p>
                      <input
                        type="checkbox"
                        id="activeCheckbox"
                        name="salstat"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={isActive}
                        onChange={formik.handleChange}
                      />
                      <label
                        htmlFor="activeCheckbox"
                        className="ml-2 text-gray-700 text-[13px]"
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </div>

                {/* Email Setting Tab */}
                <div className={openTab === 5 ? "block" : "hidden"}>
                  <div className="flex p-2">
                    <div className="flex flex-col p-2  w-1/2 pr-4">
                      <p className="mb-3 font-semibold text-[13px]">
                        Email Service
                      </p>
                      <div className="flex space-x-2">
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="email"
                            value="yes"
                            className="mr-2 ml-2"
                            onChange={formik.handleChange}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="email"
                            value="no"
                            className="mr-2"
                            onChange={formik.handleChange}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col p-2 w-1/2 pr-4">
                      <p className="mb-3 font-semibold mr-4 text-[13px]">
                        SMTP Host
                      </p>
                      <input
                        id="smtpHost"
                        name="smtpHost"
                        type="text"
                        onChange={formik.handleChange}
                        className={`px-4 py-2 h-10 text-[13px] font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                      />
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="w-1/2 pr-4">
                      <p className="mb-3 capitalize mt-1 font-semibold text-[13px]">
                        From Email ID
                      </p>
                      <input
                        id="sender"
                        name="sender"
                        type="text"
                        onChange={formik.handleChange}
                        className={`w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold text-[13px]">
                        MUserName
                      </p>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        className={`w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <p className="mb-3 capitalize font-semibold text-[13px]">
                      MPassword
                    </p>
                    <input
                      id="password"
                      name="password"
                      type="text"
                      onChange={formik.handleChange}
                      className={`w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                    />
                  </div>
                </div>

                {/* Training Profile Tab */}
                <div className={openTab === 6 ? "block" : "hidden"}>
                  <label
                    for="message"
                    className="block mb-2 text-m font-medium text-gray-900 dark:text-white"
                  >
                    Welcome Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="block p-2.5 w-full text-[13px] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Write your Welcome Message here..."
                  />
                </div>

                {/* Asset Profile Tab */}
                <div className={openTab === 7 ? "block" : "hidden"}>
                  <div className="flex justify-between">
                    <div className="flex flex-col w-1/2">
                      <p className="mb-3 font-semibold text-[13px]">
                        SMS Service
                      </p>
                      <div className="flex space-x-2">
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="sms"
                            value="yes"
                            className="mr-2 ml-2"
                            onChange={formik.handleChange}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="sms"
                            value="no"
                            className="mr-2"
                            onChange={formik.handleChange}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col w-1/2">
                      <p className="mb-3 font-semibold text-[13px]">SMS URL</p>
                      <input
                        id="smsUrl"
                        type="text"
                        className={`w-full px-4 py-2 h-10 text-[13px] font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
