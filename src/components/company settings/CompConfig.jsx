import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useAuth } from "../Login";

export default function EMPTabs() {
  const [openTab, setOpenTab] = React.useState(1);
  const [details, setDetails] = useState([])
  const [edit, setEdit] = useState(false)
  const [detailsId, setDetailsId] = useState('')
  const {token} = useAuth()

    // //Formik for Form Submission
    const formik = useFormik({
      initialValues: {
        currency: "",
        theme: "",
        date: "",
        sessionTM: "",
        remarks: "",
        status: "",
        empID: "",
        empIdPrefix: "",
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
      onSubmit: (values) => {
        console.log(values);

        const updatedData = {
          currency: values.currency,
          theme: values.theme,
          date: values.date,
          sessionTM: values.sessionTM,
          remarks: values.remarks,
          status: values.status,
          empID: values.empID,
          cmulti: values.cmulti,
          att: values.att,
          aProcess: values.aProcess,
          atap: values.atap,
          shiftFlag: values.shiftFlag,
          jobApp: values.jobApp,
          holiday: values.holiday,
          odFlag: values.odFlag,
          otFlag: values.otFlag,
          LAFlag: values.LAFlag,
          otCalc: values.otCalc,
          esicSal: values.esicSal,
          pfSal: values.pfSal,
          gratuity: values.gratuity,
          mlwf1: values.mlwf1,
          mlwf2: values.mlwf2,
          salLock: values.salLock,
          minWages: values.minWages,
          remarks1: values.remarks1,
          salstat: values.salstat,
          email: values.email,
          smtpHost: values.smtpHost,
          sender: values.sender,
          username: values.username,
          password: values.password,
          message: values.message,
          smsUrl: values.smsUrl,
          sms: values.sms,
        }
        updateCompanyConfig(updatedData)
        updateEmpId(values.empIdPrefix)
      },
    });

  const updateCompanyConfig = async(data) =>{
    try{
      const response = axios.put(`http://localhost:5500/company-config/update/1`, data, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      alert('Company Configuration Updated')
    } catch(error){
      console.error('Error', error);
    }
  }

  useEffect(() =>{
    const getEmpIdPrefix = async () =>{
      try {
        const response = await axios.get('http://localhost:5500/employeeid/get',{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.data[0]
      console.log(data.EmpId)
      formik.setValues({
        ...formik.values,
        ['empIdPrefix']: data.EmpId
      });
      } catch (error) {
        console.error('Error', error);
      }
    }

    getEmpIdPrefix()
  }, [token])

  const updateEmpId = async (empIdprefix) =>{
    try{
      const response = axios.put(`http://localhost:5500/employeeid/update/1`, empIdprefix, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      alert('Employee ID Prefix Updated')
    } catch(error){
      console.error('Error', error);
    }
  }

  useEffect(() => {
    const fetchCompanyConfig = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/company-config/get/1`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
          setDetails(data);
          console.log(data)
      } catch (error) {
        console.log('Error in fetching Company Configurations', error);
      }
    };
  
    fetchCompanyConfig();
  }, [token]);


  useEffect(() =>{
    if(details){
      formik.setValues({
        currency: details?.currency,
        theme: details?.theme,
        date: details?.date,
        sessionTM: details?.sessionTM,
        remarks: details?.remarks,
        status: details?.status,
        empID: details?.empID,
        cmulti: details?.cmulti,
        att: details?.att,
        aProcess: details?.aProcess,
        atap: details?.atap,
        shiftFlag: details?.shiftFlag,
        jobApp: details?.jobApp,
        holiday: details?.holiday,
        odFlag: details?.odFlag,
        otFlag: details?.otFlag,
        LAFlag: details?.LAFlag,
        otCalc: details?.otCalc,
        esicSal: details?.esicSal,
        pfSal: details?.pfSal,
        gratuity: details?.gratuity,
        mlwf1: details?.mlwf1,
        mlwf2: details?.mlwf2,
        salLock: details?.salLock,
        minWages: details?.minWages,
        remarks1: details?.remarks1,
        salstat: details?.salstat,
        email: details?.email,
        smtpHost: details?.smtpHost,
        sender: details?.sender,
        username: details?.username,
        password: details?.password,
        message: details?.message,
        smsUrl: details?.smsUrl,
        sms: details?.sms,
      })
    }
  }, [details])

  console.log('Details', details)

  const [isStatusChecked, setStatusChecked] = useState(false)
  const [salStat, setSalStatChecked] = useState(false)
  const handleCheckboxChange = (fieldName, setChecked, event) => {
    //This is how to use it (event) => handleCheckboxChange('Status', setStatusChecked, event)
      const checked = event.target.checked;
      setChecked(checked);
      formik.setValues({
        ...formik.values,
        [fieldName]: checked.toString(),
      });
    };


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
                        id='currency'
                        name="currency"
                        className="text-[13px] w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                        default="Indian Rupees"
                        value={formik.values.currency}
                        onChange={formik.handleChange}
                        disabled={!edit}
                      >
                        <option value={formik.values.currency}>
                          {formik.values.currency}
                        </option>
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
                        id="theme"
                        name="theme"
                        value={formik.values.theme}
                        className="w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                        onChange={formik.handleChange}
                        disabled={!edit}
                      >
                        <option value={formik.values.theme}>{formik.values.theme}</option>
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
                        id="date"
                        type="text"
                        value={formik.values.date}
                        className={`text-[13px] w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        placeholder="dd/mm/yyyy"
                        onChange={formik.handleChange}
                        disabled={!edit}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold text-[13px]">
                        Session Timeout
                      </p>
                      <input
                        id="sessioinTM"
                        type="number"
                        name="sessionTM"
                        value={formik.values.sessionTM}
                        className={`w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                        disabled={!edit}
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
                        value={formik.values.remarks}
                        className={`text-[13px] w-full px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                        disabled={!edit}
                      />
                    </div>
                    <div className="w-1/2">
                      <p className="mb-3 capitalize font-semibold text-[13px]">
                        Status
                      </p>
                      <div className="flex items-center text-[13px]">
                        <input
                          type="checkbox"
                          id="status"
                          name="status"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={formik.values.Status}
                          onChange={(event) => handleCheckboxChange('status', setStatusChecked, event)}
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
                            checked={formik.values.empID === 'Yes'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="empID"
                            value="No"
                            className="mr-2 ml-2"
                            checked={formik.values.empID === 'No'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    {/* <div className="flex mb-6"> */}
                    <div className="w-1/2 pr-4">
                      <p className="mb-2 capitalize mt-2 font-semibold text-[13px]">
                        Enter Prefix
                      </p>
                      <input
                        id="empIdPrefix"
                        type="text"
                        value={formik.values.empIdPrefix}
                        className={`text-[13px] w-full px-4 py-1 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                        disabled={!edit}
                      />
                    </div>
                    {/* </div> */}
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
                            checked={ formik.values.cmulti === 'Yes'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="cmulti"
                            value="No"
                            className="mr-2"
                            checked={ formik.values.cmulti === 'No'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                            checked={ formik.values.att=== 'Daily'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          Daily
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="att"
                            value="monthly"
                            className="mr-2"
                            checked={ formik.values.att === 'Monthly'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                              checked={ formik.values.aProcess === 'All'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                            />
                            All
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="atProcess"
                              value="manual"
                              className="mr-2"
                              checked={ formik.values.aProcess === 'Manual'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                            />
                            Manual
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="atProcess"
                              value="excel"
                              className="mr-2"
                              checked={ formik.values.aProcess === 'Excel Import'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                            />
                            Excel Import
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="atProcess"
                              value="autoD"
                              className="mr-2"
                              checked={ formik.values.aProcess === 'Auto Download'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                            value="Yes"
                            className="mr-2 ml-2"
                            checked={formik.values.atap === 'Yes'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="atap"
                            value="No"
                            className="mr-2"
                            checked={formik.values.atap === 'No'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          No
                        </label>
                      </div>
                    </div>
                    <div className="flex space-x-8 justify-between w-1/2">
                      <div className="flex flex-col p-2 ">
                        <p className="mb-3 font-semibold text-[13px]">
                          Fix Shift Flag
                        </p>
                        <div className="flex space-x-2">
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="shiftFlag"
                              value="Yes"
                              className="mr-2 ml-2"
                              checked={formik.values.shiftFlag === 'Yes'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                            />
                            Yes
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="shiftFlag"
                              value="No"
                              className="mr-2"
                              checked={formik.values.shiftFlag === 'No'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                            value="Yes"
                            className="mr-2 ml-2"
                            checked={formik.values.jobApp === 'Yes'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="jobApp"
                            value="No"
                            className="mr-2"
                            checked={formik.values.jobApp === 'No'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                              checked={formik.values.holiday === 'Add 1 day in Presenty'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                            />
                            Add 1 day in Presenty
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="holiday"
                              value="coff"
                              className="mr-2 whitespace-nowrap"
                              checked={formik.values.holiday === 'Give C-Off'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                            value="Yes"
                            className="mr-2 ml-2"
                            checked={formik.values.odFlag === 'Yes'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="odFlag"
                            value="No"
                            className="mr-2"
                            checked={formik.values.odFlag === 'No'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                              value="Yes"
                              className="mr-2 ml-2"
                              checked={formik.values.otFlag === 'Yes'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                            />
                            Yes
                          </label>
                          <label className="flex items-center text-[13px]">
                            <input
                              type="radio"
                              name="otFlag"
                              value="No"
                              className="mr-2"
                              checked={formik.values.otFlag === 'No'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                            value="Yes"
                            className="mr-2 ml-2"
                            checked={formik.values.LAFlag === 'Yes'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="LAFlag"
                            value="No"
                            className="mr-2"
                            checked={formik.values.LAFlag === 'No'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                        value={formik.values.ALockDay}
                        onChange={formik.handleChange}
                        disabled={!edit}
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
                            checked={formik.values.otCalc === 'Daily'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          Daily
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="otCalc"
                            value="monthly"
                            className="mr-2"
                            checked={formik.values.otCalc === 'Monthly'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                        value={formik.values.esicSal}
                        className={`px-4 h-10 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg mb-6 text-[13px]`}
                        onChange={formik.handleChange}
                        disabled={!edit}
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
                        value={formik.values.pfSal}
                        className={` w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                        disabled={!edit}
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
                        value={formik.values.gratuity}
                        className={` w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                        disabled={!edit}
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
                        value={formik.values.mlwf1}
                        className="w-full  h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                        onChange={formik.handleChange}
                        disabled={!edit}
                      >
                        <option value={formik.values.mlwf1}>
                          {formik.values.mlwf1}
                        </option>
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
                        value={formik.values.mlwf2}
                        className="w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                        onChange={formik.handleChange}
                        disabled={!edit}
                      >
                        <option value={formik.values.mlwf2}>
                          {formik.values.mlwf2}
                        </option>
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
                        value={formik.values.salLock}
                        className={`w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                        disabled={!edit}
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
                        value={formik.values.minWages}
                        className={`w-full h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                        disabled={!edit}
                      />
                    </div>
                  </div>
                  <div className="flex mb-6">
                    <div className="w-1/2 pr-4">
                      <p className="mb-3 capitalize mt-1 font-semibold text-[13px]">
                        Remarks
                      </p>
                      <input
                        id="remarks1"
                        name="remarks1"
                        value={formik.values.remarks1}
                        type="text"
                        className={`w-full  h-10 text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg`}
                        onChange={formik.handleChange}
                        disabled={!edit}
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
                        checked={formik.values.salstat}
                        onChange={(event) => handleCheckboxChange('salstat', setSalStatChecked, event)}
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
                            value="Yes"
                            className="mr-2 ml-2"
                            checked={formik.values.email == 'Yes'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="email"
                            value="No"
                            className="mr-2"
                            checked={formik.values.email == 'No'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                        value={formik.values.smtpHost}
                        onChange={formik.handleChange}
                        disabled={!edit}
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
                        value={formik.values.sender}
                        onChange={formik.handleChange}
                        disabled={!edit}
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
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        disabled={!edit}
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
                      value={formik.values.password}
                        onChange={formik.handleChange}
                        disabled={!edit}
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
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    disabled={!edit}
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
                            value="Yes"
                            className="mr-2 ml-2"
                            checked={formik.values.sms == 'Yes'}
                            onChange={formik.handleChange}
                            disabled={!edit}
                          />
                          Yes
                        </label>
                        <label className="flex items-center text-[13px]">
                          <input
                            type="radio"
                            name="sms"
                            value="No"
                            className="mr-2"
                            checked={formik.values.sms == 'No'}
                            onChange={formik.handleChange}
                            disabled={!edit}
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
                        value={formik.values.smsUrl}
                        onChange={formik.handleChange}
                        disabled={!edit}
                        className={`w-full px-4 py-2 h-10 text-[13px] font-normal focus:outline-gray-300 border-2 rounded-lg mb-6`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save
            </button>
            <button
            type="button"
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
