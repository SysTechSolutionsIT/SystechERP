import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import "./leave.css";

const LeaveApprovalModal = ({ visible, onClick }) => {
  const [details, setDetails] = useState([]);
  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "",
      LeaveApplicationId: "",
      FYear: "",
      ApplicationDate: "",
      EmployeeId: "",
      EmployeeName: "",
      LeaveFromDate: "",
      LeaveToDate: "",
      remarks: "",
      sanctionBy: "",
      sanctionFrom: "",
      sanctionTo: "",
      Status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      alert("Added Successfully");
      onClick();
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

  const handleStatusChange = () => {
    setStatus(!status);
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%]">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Leave Application
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
              width="24"
              height="24"
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-[13px] font-semibold">Transaction ID</p>
                <input
                  id="LeaveApplicationId"
                  type="text"
                  placeholder="Enter Leave Application ID"
                  value={formik.values.LeaveApplicationId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  Leave Application Date
                </p>
                <input
                  id="ApplicationDate"
                  type="date"
                  placeholder="Enter Device ID"
                  value={formik.values.ApplicationDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Financial Year</p>
                <input
                  id="FYear"
                  type="text"
                  placeholder="Enter Financial Year"
                  value={formik.values.FYear}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="employeeName"
                  className="text-[13px] font-semibold"
                >
                  Employee Name
                </label>
                <div className="flex items-center">
                  <select
                    id="employeeName"
                    name="employeeName"
                    value={formik.values.employeeName}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  >
                    <option value="">Select an Employee</option>
                    <option value="John">John</option>
                    <option value="Jane">Jane</option>
                    <option value="Smith">Smith</option>
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
              <div>
                <p className="text-[13px] font-semibold">Leave From Date</p>
                <input
                  id="LeaveFromDate"
                  type="date"
                  placeholder="Enter Leave From Date"
                  value={formik.values.LeaveFromDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Leave To Date</p>
                <input
                  id="LeaveToDate"
                  type="date"
                  placeholder="Enter Leave To Date"
                  value={formik.values.LeaveToDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="employeeName"
                  className="text-[13px] font-semibold"
                >
                  Sanctioned By
                </label>
                <div className="flex items-center">
                  <select
                    id="sanctionBy"
                    name="sanctionBy"
                    value={formik.values.sanctionBy}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  >
                    <option value="">Select an Employee</option>
                    <option value="John">John</option>
                    <option value="Jane">Jane</option>
                    <option value="Smith">Smith</option>
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
              <div>
                <p className="text-[13px] font-semibold">
                  Sanctioned From Date
                </p>
                <input
                  id="sanctionFrom"
                  type="date"
                  placeholder="Enter sanction From Date"
                  value={formik.values.sanctionFrom}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Sanctioned To Date</p>
                <input
                  id="sanctionTo"
                  type="date"
                  placeholder="Enter Leave To Date"
                  value={formik.values.sanctionTo}
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
                    checked={status}
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
            </div>
            <div className="flex mt-4 justify-start">
              <button
                type="submit"
                className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg"
              >
                Show
              </button>
            </div>
            <div className="grid gap-4 justify-between mt-2 w-full">
              <div className="my-1 p-2 pr-8 ">
                <table className="min-w-full text-center tableX1">
                  <thead className="bg-gray-700 text-white ">
                    <tr>
                      {columnHeads.map((columnName) => (
                        <th
                          key={columnName}
                          className="px-2 py-2 font-bold text-[13px] text-center border-2  rounded headers "
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

          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save
            </button>
            <button
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
              onClick={onClick}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LeaveApprovalModal;
