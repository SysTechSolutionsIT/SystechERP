import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { useAuth } from "../Login";
import axios from "axios";

const SalProcessing = () => {
  const {token} = useAuth(
  )
  const [details, setDetails] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([])
  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "",
      LeaveApplicationId: "",
      FYear: "",
      ApplicationDate: "",
      employeeType: "",
      EmployeeName: "",
      LeaveFromDate: "",
      LeaveToDate: "",
      remarks: "",
      leaveDays: "",
      Status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      alert("Added Successfully");
    },
  });

  const [status, setStatus] = useState(false);
  const columnHeads = [
    "Process Id",
    "Process Date",
    "Employee Id",
    "Employee Name",
    "EmpType",
    "Department Name",
    "AMonth",
    "AYear",
    "Salary",
    "PerDaySalary",
    "Presenty",
    "Monthly Salary",
    "GrossSalary",
    "TotalEarning",
    "TotalDeduction",
    "NetSalary",
    "BankSalary",
    "CashSalary",
  ];

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
  const years = [2020, 2021, 2022, 2023, 2024, 2025];

  const salHead = ["Salary Head", "Earning Head", "Deduction Heads"];

  useEffect(() =>{
    const fetchEmployeeTypes = async() =>{
      try{
        const response = await axios.get("http://localhost:5500/employee-type/FnShowActiveData",
        { headers: { Authorization: `Bearer ${token}`}
      })
      const data = response.data
      setEmployeeTypes(data)
      console.log(response)
      } catch (error){
        console.error('Error', error);
      }
    }
    fetchEmployeeTypes()
  },[token])

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex h-full w-[80%] ml-4">
        <div className="bg-gray-200 p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Import Employeewise Earning & Deduction Heads
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 py-1">
          <div className="">
              <p className="font-semibold text-[13px]">Employee Type *</p>
              <select
                id="EmployeeTypeId"
                name="EmployeeTypeId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.EmployeeTypeId}
                onChange={formik.handleChange}
              >
                    <option value="">Select Type</option>
                    {employeeTypes.map((entry) => (
                    <option key={entry.EmployeeTypeId} value={entry.EmployeeTypeId}>
                      {entry.EmployeeType}
                    </option>
                    ))}
              </select>
            </div>
            <div className="">
              <p className="text-[13px] font-semibold">Process Date</p>
              <input
                id="ProcessDate"
                type="date"
                placeholder="Enter Process Date"
                value={formik.values.ProcessDate}
                className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                onChange={formik.handleChange}
              />
            </div>
          {/* <div className="grid grid-cols-3 gap-4"> */}
            <div className="">
              <label htmlFor="month" className="font-semibold text-[13px]">
                Month
              </label>
              <select
                id="month"
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
            <div className="">
              <label htmlFor="year" className="font-semibold text-[13px]">
                Year
              </label>
              <select
                id="year"
                className="w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                onChange={formik.handleChange}
                >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex mt-4 justify-start">
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg"
            >
              Salary Processing
            </button>
          </div>
          <div className="grid gap-4 justify-between mt-2 w-full">
            <div className="" style={{ maxWidth: "100%" }}>
              <table className="min-w-full text-center tableX1">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    {columnHeads.map((columnName) => (
                      <th
                        key={columnName}
                        className="px-2 py-2 font-bold text-[13px] text-center border-2 bg-blue-900 text-white "
                        style={{
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                        }}
                      >
                        {columnName
                          .replace(/([a-z])([A-Z])/g, "$1 $2")
                          .split(" ")
                          .map((word, index) => (
                            <div key={index} className="whitespace-nowrap">
                              {word}
                            </div>
                          ))}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div className="flex gap-10 justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Submit
            </button>
            <button className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36">
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SalProcessing;
