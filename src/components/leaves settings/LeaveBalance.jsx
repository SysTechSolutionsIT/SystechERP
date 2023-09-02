import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { Icon } from "@iconify/react";

const LeaveBalance = () => {
  const formik = useFormik({
    initialValues: {
      LBID: "",
      Fyear: "",
      month: "",
      year: "",
      LBDate: "",
      EmpType: "",
      Remarks: "",
      Status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      alert("Added Successfully");
    },
  });

  const [status, setStatus] = useState(false);

  const handleStatusChange = () => {
    setStatus(!status);
  };

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
  const columns = [
    "Approve Flag",
    "Leave Application Id",
    "FYear",
    "Application Date",
    "Employee Id",
    "Employee Name",
    "Leave From Date",
    "Leave To Date",
    "Leave Type",
    "Leave Days",
    "Sanction By",
    "Sanction From Date",
    "Sanction To Date",
    "Sanction Leave Days",
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center items-center h-full">
        <div className="bg-gray-200 w-[90%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Leave Update Balance
            </p>
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="capatilize font-semibold text-[13px] ">
                  Leave Balance ID
                </p>
                <input
                  id="LBID"
                  type="number"
                  placeholder="Enter Leave Balance ID"
                  value={formik.values.LBID}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Financial Year
                </p>
                <input
                  id="Fyear"
                  type="text"
                  placeholder="Enter Financial Year"
                  value={formik.values.Fyear}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="month"
                  className="mb-1 font-semibold text-[13px]"
                >
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
              <div>
                <label
                  htmlFor="year"
                  className="mb-1 font-semibold text-[13px]"
                >
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

              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Leave Balance Date
                </p>
                <input
                  type="date"
                  id="LBDate"
                  placeholder="Enter Financial Year"
                  value={formik.values.Fyear}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Status</p>
                <div className="flex items-center">
                  <input
                    id="status"
                    type="checkbox"
                    checked={formik.values.Status}
                    value={formik.values.Status}
                    className={` relative w-4 h-4 mr-2 peer shrink-0 appearance-none checked:bg-blue-800 border-2 border-blue-900 rounded-sm`}
                    onChange={handleStatusChange}
                  />
                  <Icon
                    className="absolute w-4 h-4 hidden peer-checked:block"
                    icon="gg:check"
                    color="white"
                  />
                  <label for="status" className="text-[11px] font-semibold">
                    Active
                  </label>
                </div>
              </div>
              <div className="py-1">
                <p className="mb-1 font-semibold text-[13px]">Employee Type</p>
                <select
                  id="EmpType"
                  name="EmpType"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                  value={formik.values.EmpType}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Type</option>
                  <option value="Contract Staff">Contract Staff</option>
                  <option value="Trainee Staff">Trainee Staff</option>
                  <option value="Trainee Worker">Trainee Worker</option>
                  <option value="Worker">Worker</option>
                  <option value="Company Staff">Company Staff</option>
                </select>
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.Remarks}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36">
              Leave Calculate
            </button>
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
          <div className="grid gap-2 justify-between mt-2">
            <div className="my-1 rounded-2xl  p-2 pr-8 ">
              <table className="min-w-full text-center whitespace-normal z-0">
                <thead className="border-b-2">
                  <tr className="">
                    <th className="px-1 font-bold text-black border-2 border-gray-400 text-[13px] whitespace-normal">
                      Add
                    </th>
                    {columns.map((columnName) => (
                      <th
                        key={columnName}
                        className={`px-1 text-[13px] font-bold text-black border-2 border-gray-400`}
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
        </div>
      </div>
    </form>
  );
};

export default LeaveBalance;
