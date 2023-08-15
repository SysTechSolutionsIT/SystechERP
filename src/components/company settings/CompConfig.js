import React, { useState } from "react";
import Academic from "../forms/academic";
import Family from "../forms/family";
import Personal from "../forms/personal";
import Professional from "../forms/professional";

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

  return (
    <>
      <div className="p-8">
        <div className="bg-blue-900 text-white font-semibold text-lg py-4 px-8 w-full rounded-lg">
          Company Configurations
        </div>
      </div>
      <div className="flex font-[Inter]">
        <div className="ml-24">
          <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row">
            <li className="-mb-px mr-2 ml-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 " +
                  (openTab === 1
                    ? "text-s font-bold uppercase text-blue-900 bg-gray-100 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
              >
                General
              </p>
            </li>
            <li className="-mb-px mr-2 ml-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 rounded-lg " +
                  (openTab === 2
                    ? "text-s font-bold uppercase text-blue-900 bg-gray-100 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
              >
                Company
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 rounded-lg " +
                  (openTab === 3
                    ? "text-s font-bold uppercase text-blue-900 bg-gray-100 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
              >
                Attendance
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 rounded-lg " +
                  (openTab === 4
                    ? "text-s font-bold uppercase text-blue-900 bg-gray-100 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
              >
                Payroll
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 rounded-lg " +
                  (openTab === 5
                    ? "text-s font-bold uppercase text-blue-900 bg-gray-100 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(5);
                }}
              >
                Email Settings
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 rounded-lg " +
                  (openTab === 6
                    ? "text-s font-bold uppercase text-blue-900 bg-gray-100 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(6);
                }}
              >
                Email Format
              </p>
            </li>
            <li className="-mb-px mr-2 cursor-pointer">
              <p
                className={
                  "inline-block p-4 rounded-lg " +
                  (openTab === 7
                    ? "text-s font-bold uppercase text-blue-900 bg-gray-100 rounded-lg active"
                    : "hover:bg-gray-200 hover:text-blue-900 hover:font-bold hover:rounded-lg")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(7);
                }}
              >
                SMS Format
              </p>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {/*General */}
                <div className={openTab === 1 ? "block" : "hidden"}>
                  <div className="flex ">
                    <div className="flex flex-col p-2 w-1/2">
                      <label htmlFor="currency" className="mb-1 font-semibold">
                        Currency
                      </label>
                      <select
                        id="currency"
                        className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                      >
                        {months.map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col p-2 w-1/2">
                      <label htmlFor="dropdown2" className="mb-1 font-semibold">
                        Themes
                      </label>
                      <select
                        id="Theme"
                        className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
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
                      <p className="mb-3 capitalize mt-1 font-semibold">
                        Date Format
                      </p>
                      <input
                        id="DateF"
                        type="text"
                        className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold">
                        Session Timeout
                      </p>
                      <input
                        id="SessTM"
                        type="number"
                        className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="w-1/2 pr-4">
                      <p className="mb-3 capitalize mt-1 font-semibold">
                        Remarks
                      </p>
                      <input
                        id="remarks"
                        type="text"
                        className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold">Status</p>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="activeCheckbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={isActive}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          htmlFor="activeCheckbox"
                          className="ml-2 text-gray-700"
                        >
                          Active
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Company Tab*/}
                <div className={openTab === 2 ? "block" : "hidden"}>
                  <div className="flex space-x-8 justify-around">
                    <div className="flex flex-col p-2">
                      <p className="mb-3 font-semibold">Employee ID Prefex</p>
                      <label>
                        <input type="radio" name="sms" value="Yes" />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="sms"
                          value="No"
                          style={{ marginTop: "10px" }}
                        />
                        No
                      </label>
                    </div>
                    <div className="flex space-x-8 justify-around">
                      <div className="flex flex-col p-2">
                        <p className="mb-3 font-semibold">
                          Company Multibranch
                        </p>
                        <label>
                          <input type="radio" name="sms" value="Yes" />
                          Yes
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="sms"
                            value="No"
                            style={{ marginTop: "10px" }}
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attendance Tab */}
                <div className={openTab === 3 ? "block" : "hidden"}>
                  <p>
                    Vivamus vel elit ac elit congue eleifend. Quisque nec ligula
                    et tortor tincidunt volutpat. Nunc et tristique purus. Fusce
                    non lorem et odio tristique sodales.
                  </p>
                </div>

                {/* Payroll Tab */}
                <div className={openTab === 4 ? "block" : "hidden"}>
                  <div className="flex p-2">
                    <div className="flex flex-col p-2  w-1/2 pr-4">
                      <p className="mb-3 font-semibold">OT Calculation Flag</p>
                      <label>
                        <input type="radio" name="otCalc" value="Daily" />
                        Daily
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="otCalc"
                          value="Monthly"
                          style={{ marginTop: "10px" }}
                        />
                        Monthly
                      </label>
                    </div>
                    <div className="flex flex-col p-2 w-1/2 pr-4">
                      <p className="mb-3 font-semibold mr-4">
                        ESIC Salary Limit
                      </p>
                      <input
                        id="smsUrl"
                        type="text"
                        className={`px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                      />
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="w-1/2 pr-4">
                      <p className="mb-3 capitalize mt-1 font-semibold">
                        PF Salary Limit
                      </p>
                      <input
                        id="PFSalaryLimit"
                        type="text"
                        className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold">
                        Gratuity Years Limit
                      </p>
                      <input
                        id="gratuity"
                        type="text"
                        className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-6">
                    <div className="flex flex-col p-2 w-1/2">
                      <label htmlFor="dropdown1" className="mb-1 font-semibold">
                        MLWF Month 1
                      </label>
                      <select
                        id="mlwf1"
                        className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                      >
                        {months.map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col p-2 w-1/2">
                      <label htmlFor="dropdown2" className="mb-1 font-semibold">
                        MLWF Month 2
                      </label>
                      <select
                        id="mlwf2"
                        className="w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
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
                      <p className="mb-3 capitalize mt-1 font-semibold">
                        Salary Lock Day
                      </p>
                      <input
                        id="SLockday"
                        type="text"
                        className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold">
                        Salary Minimum Wages
                      </p>
                      <input
                        id="MinWages"
                        type="text"
                        className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="w-1/2 pr-4">
                      <p className="mb-3 capitalize mt-1 font-semibold">
                        Remarks
                      </p>
                      <input
                        id="remarks"
                        type="text"
                        className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold">Status</p>
                      <input
                        type="checkbox"
                        id="activeCheckbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={isActive}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        htmlFor="activeCheckbox"
                        className="ml-2 text-gray-700"
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
                      <p className="mb-3 font-semibold">Email Service</p>
                      <label>
                        <input type="radio" name="sms" value="Yes" />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="sms"
                          value="No"
                          style={{ marginTop: "10px" }}
                        />
                        No
                      </label>
                    </div>
                    <div className="flex flex-col p-2 w-1/2 pr-4">
                      <p className="mb-3 font-semibold mr-4">SMTP Host</p>
                      <input
                        id="smsUrl"
                        type="text"
                        className={`px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                      />
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="w-1/2 pr-4">
                      <p className="mb-3 capitalize mt-1 font-semibold">
                        From Email ID
                      </p>
                      <input
                        id="sender"
                        type="text"
                        className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold">MUserName</p>
                      <input
                        id="username"
                        type="text"
                        className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                      />
                    </div>
                  </div>
                  <div className="w-1/2">
                    <p className="mb-3 capitalize font-semibold">MPassword</p>
                    <input
                      id="password"
                      type="text"
                      className={`w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
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
                    rows="4"
                    className="block p-2.5 w-full text-m text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Write your Welcome Message here..."
                  />
                </div>

                {/* Asset Profile Tab */}
                <div className={openTab === 7 ? "block" : "hidden"}>
                  <div className="flex space-x-8 justify-around">
                    <div className="flex flex-col p-2">
                      <p className="mb-3 font-semibold">SMS Service</p>
                      <label>
                        <input type="radio" name="sms" value="Yes" />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="sms"
                          value="No"
                          style={{ marginTop: "10px" }}
                        />
                        No
                      </label>
                    </div>
                    <div className="flex flex-col p-2">
                      <p className="mb-3 font-semibold mr-4">SMS URL</p>
                      <input
                        id="smsUrl"
                        type="text"
                        className={`px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
