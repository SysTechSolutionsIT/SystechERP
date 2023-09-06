import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";

const SalProcessing = () => {
  const [details, setDetails] = useState([]);
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
    "Leave Type Description",
    "Leave Gain",
    "Leave Taken",
    "Leave Balance",
    "Leave Applied",
    "Sanction Days",
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center items-center h-full">
        <div className="bg-gray-200 w-[90%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Import Employeewise Earning & Deduction Heads
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label
                htmlFor="employeeName"
                className="text-[13px] font-semibold"
              >
                Employee Type
              </label>
              <div className="flex items-center">
                <select
                  id="employeeType"
                  name="employeeType"
                  value={formik.values.employeeType}
                  onChange={formik.handleChange}
                  className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                >
                  <option value="">Select an Employee</option>
                  <option value="Worker">Worker</option>
                  <option value="Jane">Staff</option>
                </select>
                <button
                  type="button"
                  // onClick={addEmployee}
                  className="ml-2 px-3 py-1 text-[11px] bg-blue-500 text-white rounded-md"
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-span-1">
              <p className="text-[13px] font-semibold">Process Id</p>
              <input
                id="ProcessID"
                type="date"
                placeholder="Enter Process ID"
                value={formik.values.ProcessID}
                className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-span-1">
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
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <label htmlFor="month" className="mb-1 font-semibold text-[13px]">
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
            <div className="col-span-1">
              <label htmlFor="year" className="mb-1 font-semibold text-[13px]">
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
            <div className="my-1 p-2 pr-8">
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
                        {columnName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save
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
