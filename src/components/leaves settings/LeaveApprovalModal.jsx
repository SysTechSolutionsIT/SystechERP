import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";
import LMonthlyAtt from "./LMonthlyAtt";

const LeaveApprovalModal = ({ visible, onClick, ID, ApprovalFlag }) => {
  const [details, setDetails] = useState([]);
  const [Employees, setEmployees] = useState([]);
  const [LeaveTypeData, setLeaveTypes] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [previousLeaves, setPreviousLeaves] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [leaveTypeId, setLeaveTypeId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [LeaveBalance, setLeaveBalance] = useState([]);
  const [LeavesEarned, setLeavesEarned] = useState(0);
  const [PresentyObject, setPresentyObject] = useState([]);
  let CarryForward = 0;
  let Presenty = 0;
  let Absenty = 0;
  let MaxUsedFlag = 0;

  const [Data, setData] = useState([]);
  const { token } = useAuth();

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const filteredEmployees = Employees.filter((employee) =>
    employee.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "",
      LeaveApplicationId: "",
      FYear: "",
      LeaveApplicationDate: "",
      EmployeeId: "",
      EmployeeName: "",
      EmployeeType: "",
      EmployeeTypeGroup: "",
      LeaveTypeId: "",
      LeaveFromDate: "",
      LeaveToDate: "",
      Remark: "",
      SanctionBy: "",
      SanctionFromDate: "",
      SanctionToDate: "",
      SanctionLeaveDays: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const updatedData = {
        ApprovalFlag: ApprovalFlag,
        LeaveApplicationId: ID,
        FYear: values.FYear,
        LeaveApplicationDate: values.LeaveApplicationDate,
        EmployeeId: values.EmployeeId,
        EmployeeName: values.EmployeeName,
        LeaveFromDate: values.LeaveFromDate,
        EmployeeType: values.EmployeeType,
        LeaveTypeId: values.LeaveTypeId,
        EmployeeTypeGroup: values.EmployeeTypeGroup,
        LeaveToDate: values.LeaveToDate,
        Remark: values.Remark,
        SanctionBy: values.SanctionBy,
        SanctionFromDate: values.SanctionFromDate,
        SanctionToDate: values.SanctionToDate,
        SanctionLeaveDays: values.SanctionLeaveDays,
        IUFlag: "U",
      };

      await updateApproval(updatedData);
      await updateLeaveBalance(updatedData);
      //Call presenty absenty function
      console.log("Calling presenty logic");
      if (ApprovalFlag == "A") {
        // Call AfterApproval function
        calculatePresenty(updatedData);
      }

      onClick();
    },
  });

  // Calling the LMonthlyAttendance FUnction

  const updateApproval = async (values) => {
    if (ApprovalFlag === "A") {
      console.log("Update approval function");
      console.log("LID:", values.LeaveApplicationId);
      console.log("Employee ID: ", values.EmployeeId);
      fetchLeaveEarned();
      alert("Leave Approved");
    } else if (ApprovalFlag === "R") alert("Leave Rejected");
    else console.log("None of the two");
    try {
      const response = axios.post(
        `http://localhost:5500/a5d3g2p6/FnAddUpdateDeleteRecord`,
        values,
        {
          params: { LeaveApplicationId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // FetchLeaveBalanceData()
    } catch (error) {
      console.error("Error", error);
    }
  };

  const updateLeaveBalance = async (values) => {
    try {
      const response = await axios.patch(
        "http://localhost:5500/leave-balance/FnLeaveApproved",
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response", response.data);
      alert("Leave Balance Updated");
    } catch (error) {
      console.error("Error updating Leave balance", error);
    }
  };

  //Returning Presenty Object
  const calculatePresenty = async (values) => {
    console.log("IN calculate Presenty");
    try {
      const response = await axios.post(
        "http://localhost:5500/a5d3g2p6/CalculatePresenty",
        values,
        {
          params: { LeavesEarned: LeavesEarned },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("response", response.data);
      const data = response.data;
      setPresentyObject(data);
      // alert("Leave Balance Updated");
    } catch (error) {
      console.error("Error updating Leave balance", error);
    }
  };

  //Posting the above attendance data into MLAttendance table
  useEffect(() => {
    const AddAttendances = async () => {
      if (PresentyObject) {
        try {
          const response = await axios.post(
            "http://localhost:5500/MLAttendance/FnAddUpdateDeleteRecord",
            PresentyObject,
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error("Error", error);
        }
      }
    };
    AddAttendances();
  }, [token, PresentyObject]);

  function calculateLeaveDays(leaveFromDate, leaveToDate) {
    // Convert the date strings to Date objects
    const fromDate = new Date(leaveFromDate);
    const toDate = new Date(leaveToDate);

    // Calculate the time difference in milliseconds
    const timeDiff = toDate - fromDate;

    // Calculate the number of days (milliseconds / milliseconds per day) and add 1
    const LeaveDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

    return LeaveDays;
  }

  useEffect(() => {
    // Calculate leave days whenever LeaveFromDate or LeaveToDate changes
    const newLeaveDays = calculateLeaveDays(
      formik.values.SanctionFrcomDate,
      formik.values.SanctionToDate
    );

    // Update the SanctionDays field in formik values
    formik.setValues({
      ...formik.values,
      SanctionLeaveDays: newLeaveDays,
    });
  }, [formik.values.SanctionFromDate, formik.values.SanctionToDate]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/personal/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        console.log("Employees", data);
        setEmployees(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployees();
  }, [token]);

  const fetchLeaveEarned = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/leave-balance/FnFetchLeaveEarned",
        {
          params: {
            EmployeeId: details.EmployeeId,
            FYear: details.FYear,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      console.log("Leave earned", data);

      if (data && data.length > 0) {
        setLeavesEarned(data);
      } else {
        setLeavesEarned(0);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const fetchLeaveApplication = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/a5d3g2p6/FnShowParticularData",
        {
          params: { LeaveApplicationId: ID },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      console.log(data);
      setDetails(data);
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    fetchLeaveApplication();
  }, [token, ID]);

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    if (details) {
      formik.setValues({
        ApprovalFlag: details.ApprovalFlag,
        FYear: details.FYear,
        LeaveApplicationId: details.LeaveApplicationId,
        LeaveApplicationDate: formatDate(details.LeaveApplicationDate),
        EmployeeId: details.EmployeeId,
        EmployeeType: details.EmployeeType,
        EmployeeTypeGroup: details.EmployeeTypeGroup,
        LeaveFromDate: formatDate(details.LeaveFromDate),
        LeaveToDate: formatDate(details.LeaveToDate),
        Remark: details.Remark,
        LeaveTypeId: details.LeaveTypeId,
        LeaveDays: details.LeaveDays,
        SanctionBy: details.SanctionBy,
        SanctionFromDate: formatDate(details.LeaveFromDate),
        SanctionToDate: formatDate(details.LeaveToDate),
        SanctionLeaveDays: details.SanctionLeaveDays,
      });
      setEmployeeId(details.EmployeeId);
      setLeaveTypeId(details.LeaveTypeId);
    }
    console.log("details", details);
  }, [details]);

  useEffect(() => {
    const fetchPreviousLeaves = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/a5d3g2p6/FnShowParticularEmployeeData",
          {
            params: { EmployeeId: details?.EmployeeId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Previous Leaves", data);
        setPreviousLeaves(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchPreviousLeaves();
  }, [token, visible, details]);

  useEffect(() => {
    const fetchLeaveType = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/leave-type/FnShowParticularData",
          {
            params: { LeaveTypeId: details?.LeaveTypeId },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log("Leave Type data", data);
        setLeaveTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchLeaveType();
  }, [token, ID, details]);

  const columnHeads = [
    "Leave Type",
    "Approval Flag",
    "FYear",
    "Leave Applied",
    "Sanction Days",
  ];
  // Function for when leaves are approved

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
                  value={details?.LeaveApplicationId}
                  className={`w-full px-4 py-2 font-normal bg-white focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  Leave Application Date
                </p>
                <input
                  id="LeaveApplicationDate"
                  type="date"
                  placeholder="Enter Device ID"
                  value={formik.values.LeaveApplicationDate}
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
                <p className="text-[13px] font-semibold">Employee ID</p>
                <input
                  id="EmployeeId"
                  type="text"
                  value={formik.values.EmployeeId}
                  className={`w-full px-4 py-2 font-normal bg-white focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Leave Type</p>
                <input
                  id="LeaveTypeId"
                  type="text"
                  value={LeaveTypeData?.LeaveType}
                  className={`w-full px-4 py-2 font-normal bg-white focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remarks</p>
                <input
                  id="Remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
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
                <label className="text-[13px] font-semibold">
                  Sanctioned By
                </label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="SanctionBy"
                      name="SanctionBy"
                      value={formik.values.SanctionBy}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleInputChange(e);
                      }}
                      onFocus={() => setSearchTerm("")}
                      className="w-full px-4 py-2 font-normal bg-white focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                      placeholder={
                        formik.values.EmployeeId
                          ? formik.values.EmployeeName
                          : "Search Employee Name"
                      }
                    />

                    {searchTerm && (
                      <div
                        className="absolute z-10 bg-white w-full border border-gray-300 rounded-lg mt-1 overflow-hidden"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                      >
                        {filteredEmployees.length > 0 ? (
                          filteredEmployees.map((entry, index) => (
                            <div
                              key={index}
                              onClick={() => {
                                formik.setValues({
                                  ...formik.values,
                                  SanctionBy: entry.EmployeeId,
                                  EmployeeName: entry.EmployeeName,
                                });
                                setSearchTerm("");
                              }}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-200 font-semibold text-[11px]"
                            >
                              {entry.EmployeeName}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500">
                            No matching results
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold">
                  Sanctioned From Date
                </p>
                <input
                  id="SanctionFromDate"
                  type="date"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Sanctioned To Date</p>
                <input
                  id="SanctionToDate"
                  type="date"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Leave Days</p>
                <input
                  id="SanctionLeaveDays"
                  type="number"
                  placeholder="Enter Leave Days"
                  value={formik.values.SanctionLeaveDays}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={() => {
                    const newLeaveDays = calculateLeaveDays(
                      formik.values.SanctionFromDate,
                      formik.values.SanctionToDate
                    );
                    formik.setValues({
                      ...formik.values,
                      SanctionLeaveDays: newLeaveDays,
                    });
                  }}
                />
              </div>
            </div>
            <div className="grid gap-4 justify-between mt-2 w-full">
              <div className="my-1 p-2 pr-8 border ">
                <table className="min-w-full text-center">
                  <thead className="">
                    <tr>
                      {columnHeads.map((columnName) => (
                        <th
                          key={columnName}
                          className="px-2 py-2 font-bold text-[11px] text-center border-2 bg-blue-900 text-white rounded-tl-lg rounded-tr-lg "
                        >
                          {columnName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previousLeaves.map((item) => (
                      <tr>
                        <td className="px-4 border-2 whitespace-normal bg-white rounded-lg text-left text-[11px]">
                          {item.LeaveTypeId}
                        </td>
                        <td
                          className={`px-4 border-2 whitespace-normal rounded-lg text-left text-[11px] ${
                            item.ApprovalFlag === "A"
                              ? "bg-green-600"
                              : item.ApprovalFlag === "R"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {item.ApprovalFlag}
                        </td>

                        <td className="px-4 border-2 whitespace-normal bg-white rounded-lg text-left text-[11px]">
                          {item.FYear}
                        </td>
                        <td className="px-4 border-2 whitespace-normal bg-white rounded-lg text-left text-[11px]">
                          {formatDate(item.LeaveApplicationDate)}
                        </td>
                        <td className="px-4 border-2 whitespace-normal bg-white rounded-lg text-left text-[11px]">
                          {item.SanctionLeaveDays}
                        </td>
                      </tr>
                    ))}
                  </tbody>
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
