import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
// import axios from "axios";

const GatePassModal = ({ visible, onClick }) => {
  const [statusCheck, setStatus] = useState(false);
  const [ApprCheck, setAppr] = useState(false);
  const indianFullNames = [
    "Rajesh Kumar",
    "Priya Singh",
    "Amit Patel",
    "Neha Sharma",
    "Suresh Verma",
    "Pooja Gupta",
    "Manoj Tiwari",
    "Anita Yadav",
    "Sanjay Jain",
    "Meera Mehta",
    "Vikram Singh",
    "Divya Kapoor",
    "Rahul Choudhary",
    "Kavita Reddy",
    "Amitabh Sharma",
    "Shreya Malhotra",
    "Arun Khanna",
    "Shivani Desai",
    "Vivek Mishra",
    "Nisha Joshi",
  ];
  const formik = useFormik({
    initialValues: {
      ApprovalFlag: ApprCheck,
      GatepassDate: "",
      FYear: "",
      EmployeeId: "",
      EmployeeName: "",
      EmployeeType: "",
      InTime: "",
      OutTime: "",
      GatepassType: "",
      Purpose: "",
      RejectReason: "",
      Remarks: "",
      SanctionBy: "",
      Status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const status = statusCheck === true;
      const Approve = ApprCheck === true;

      //   try {
      //     const formData = {
      //       cName: values.cName,
      //       cRemarks: values.cRemarks,
      //       status: status, // StatusCheck was already part of formik.values
      //     };

      //     const response = await axios.post(
      //       "http://localhost:5500/financials/add-record",
      //       formData // Send the extracted form data
      //     );

      //     if (response.status === 200) {
      //       const data = response.data;
      //       console.log(data);
      //       alert("Financial record added successfully");
      //       // Handle successful response
      //       onClick();
      //     } else {
      //       console.error(`HTTP error! Status: ${response.status}`);
      //       // Handle error response
      //     }
      //   } catch (error) {
      //     console.error("Error:", error.message);
      //     alert(error.message);
      //     // Handle network error
      //   }
    },
  });

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[50%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[15px] font-semibold text-center">
              Add Gate Pass Entry
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
          <div className="py-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  GatePassId
                </p>
                <input
                  id="GatePassId"
                  type="text"
                  placeholder="Enter Gate Pass ID"
                  value={formik.values.GatePassId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  GatePass Date
                </p>
                <input
                  id="GatePassDate"
                  type="date"
                  placeholder="Enter Gate Pass ID"
                  value={formik.values.GatePassDate}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  disabled={true}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Financial Year
                </p>
                <input
                  id="FYear"
                  type="number"
                  placeholder="Enter Gate Pass ID"
                  value={formik.values.FYear}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                />
              </div>
              <div>
                <p className="font-semibold text-[13px]">Employee Name</p>
                <select
                  id="EmployeeName"
                  value={formik.values.EmployeeName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]`}
                  onChange={formik.handleChange}
                >
                  {indianFullNames.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="font-semibold text-[13px]">Employee Type</p>
                <select
                  id="EmployeeType"
                  value={formik.values.EmployeeType}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px]`}
                  onChange={formik.handleChange}
                >
                  <option value="contract staff">Contract Staff</option>
                  <option value="trainee worker">Trainee Worker</option>
                  <option value="trainer staff">Trainer Staff</option>
                  <option value="worker">Worker</option>
                  <option value="company staff">Company Staff</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  Out Time
                </p>
                <input
                  id="OutTime"
                  type="time"
                  placeholder="Enter Gate Pass ID"
                  value={formik.values.OutTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">In Time</p>
                <input
                  id="InTime"
                  type="time"
                  placeholder="Enter Gate Pass ID"
                  value={formik.values.InTime}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                />
              </div>
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
                      checked={formik.values.empID === "Yes"}
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
                      checked={formik.values.empID === "No"}
                      onChange={formik.handleChange}
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="flex flex-col p-2 space-x-2">
                <p className="mb-3 font-semibold text-[13px]">Gate Pass Type</p>
                <div className="flex">
                  <label className="flex items-center text-[13px]">
                    <input
                      type="radio"
                      name="GatepassType"
                      value="Personal"
                      className="mr-2"
                      onChange={formik.handleChange}
                    />
                    Personal
                  </label>
                  <label className="flex items-center text-[13px]">
                    <input
                      type="radio"
                      name="GatepassType"
                      value="Official"
                      className="mr-2 ml-2"
                      onChange={formik.handleChange}
                    />
                    Official
                  </label>
                </div>
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Purpose</p>
                <input
                  id="Purpose"
                  type="text"
                  placeholder="Enter Purpose"
                  value={formik.values.Purpose}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">
                  RejectReason
                </p>
                <input
                  id="RejectReason"
                  type="text"
                  placeholder="Enter Rejection Reason"
                  value={formik.values.RejectReason}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                />
              </div>
              <div>
                <p className="capatilize font-semibold  text-[13px]">Remark</p>
                <input
                  id="Remarks"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.Remarks}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold  text-[13px]">Status</p>
                <label className="capitalize font-semibold  text-[11px]">
                  <input
                    id="Status"
                    type="checkbox"
                    checked={statusCheck}
                    value={formik.values.Status}
                    className={`w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={(event) => setStatus(!statusCheck)}
                  />
                  Active
                </label>
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
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
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

export default GatePassModal;
