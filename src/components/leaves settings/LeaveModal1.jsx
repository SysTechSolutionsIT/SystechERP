import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth, useDetails } from "../Login";

const LeaveModal1 = ({ visible, onClick }) => {
  const [details, setDetails] = useState([]);
  const [Employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]); // to be used for to be sanctioned by
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("");
  const [LeaveTypes, setLeaveTypes] = useState("");
  const [FinancialYears, setFinancialYears] = useState([]);
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const { name } = useDetails();
  const { empid, fYear } = useDetails();
  const [managerId, setManagerId] = useState();
  const [managerName, setManagerName] = useState();

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "",
      fYear: fYear,
      LeaveApplicationDate: new Date().toISOString().split("T")[0],
      EmployeeId: "",
      EmployeeName: "",
      EmployeeType: "",
      EmployeeTypeGroup: "",
      LeaveFromDate: "",
      LeaveToDate: "",
      Remark: "",
      LeaveTypeId: "",
      TBSanctionBy: managerId,
      LeaveDays: "",
      IUFlag: "I",
    },
    onSubmit: (values, { resetForm }) => {
      if (managerId == null) {
        alert("No reporting manager found. Application not submitted.");
      } else {
        const updatedData = {
          ApprovalFlag: "MP",
          FYear: fYear,
          LeaveApplicationDate: values.LeaveApplicationDate,
          EmployeeId: empid,
          EmployeeType: values.EmployeeType,
          EmployeeTypeGroup: values.EmployeeTypeGroup,
          LeaveFromDate: values.LeaveFromDate,
          LeaveToDate: values.LeaveToDate,
          Remark: values.Remark,
          LeaveTypeId: values.LeaveTypeId,
          TBSanctionBy: managerId,
          LeaveDays: values.LeaveDays,
          IUFlag: "I",
        };
        addLeaveApplication(updatedData);
        console.log("Updated Leave data:", updatedData);
        resetForm();
        onClick();
      }
    },
  });

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/personal/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        console.log("Employees", data);
        setAllEmployees(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchAllEmployees();
  }, [token]);

  useEffect(() => {
    if (Employees.length > 0) {
      formik.setValues({
        ...formik.values,
        EmployeeType: Employees.EmployeeTypeId,
        EmployeeTypeGroup: Employees.EmployeeTypeGroupId,
      });
    }
  }, [Employees]);

  useEffect(() => {
    const fetchLeaveType = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/leave-type/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        console.log(data);
        setLeaveTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchLeaveType();
  }, [token]);

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee-type/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setEmployeeTypes(data);
        console.log(response);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployeeTypes();
  }, [token]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/personal/FnShowPerticularData",
          {
            params: { EmployeeId: empid },
            headers: { Authorization: `Bearer ${token}` },
          }
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

  useEffect(() => {
    const fetchManager = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/work/FnFetchManager",
          {
            params: { EmployeeId: empid },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log("Manager:", data);

        if (data === null) {
          // Display an alert to add a manager
          alert("Please add a manager.");
        } else {
          // Set the manager data
          setManagerId(data);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchManager();
  }, [token]);

  useEffect(() => {
    const fetchManagerName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee/personal/FnFetchEmployeeName",

          {
            params: { EmployeeId: managerId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data.EmployeeName;
        console.log("ManagerName", data);
        setManagerName(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchManagerName();
  }, [token, managerId, visible]);

  const addLeaveApplication = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/a5d3g2p6/FnAddUpdateDeleteRecord",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Leave Application Added");
    } catch (error) {
      console.error("Error", error);
    }
  };

  //Handling Searching

  const columnHeads = [
    "Leave Type Description",
    "Leave Gain",
    "Leave Taken",
    "Leave Balance",
    "Leave Applied",
    "Sanction Days",
  ];

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
      formik.values.LeaveFromDate,
      formik.values.LeaveToDate
    );

    // Update the LeaveDays field in formik values
    formik.setValues({
      ...formik.values,
      LeaveDays: newLeaveDays,
    });
  }, [formik.values.LeaveFromDate, formik.values.LeaveToDate]);

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
                <p className="text-[13px] font-semibold">
                  Leave Application Date
                </p>
                <input
                  id="LeaveApplicationDate"
                  type="date"
                  value={formik.values.LeaveApplicationDate} // Set value to current date
                  disabled={true} // Make the input field read-only
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]`}
                />
              </div>
              <div>
                <label className="text-[13px] font-semibold">
                  Financial Year
                </label>
                <div className="flex items-center">
                  <input
                    id="fYear"
                    name="fYear"
                    value={fYear}
                    required
                    disabled
                    className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  />
                </div>
              </div>
              <div>
                <label className="text-[13px] font-semibold">
                  Employee Name
                </label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <input
                      id="EmployeeName"
                      type="text"
                      value={name} // Set value to current date
                      readOnly // Make the input field read-only
                      disabled
                      className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]`}
                    />
                    {/* <input
            type="text"
            id="EmployeeName"
            name="EmployeeName"
            value={formik.values.EmployeeName}
            onChange={(e) => {
              formik.handleChange(e);
              handleInputChange(e);
            }}
            onFocus={() => setSearchTerm('')}
            className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
            placeholder={formik.values.EmployeeId ? formik.values.EmployeeName : "Search Employee Name"}
          />

          {searchTerm && (
            <div
              className="absolute z-10 bg-white w-full border border-gray-300 rounded-lg mt-1 overflow-hidden"
              style={{ maxHeight: '150px', overflowY: 'auto' }}
            >
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((entry) => (
                  <div
                    key={entry.EmployeeId}
                    onClick={() => {
                      formik.setValues({
                        ...formik.values,
                        EmployeeId: entry.EmployeeId,
                        EmployeeName: entry.EmployeeName
                      });
                      setSearchTerm('');
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 font-semibold text-[11px]"
                  >
                    {entry.EmployeeName}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">No matching results</div>
              )}
            </div>
          )} */}
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[13px] font-semibold">Leave Type</label>
                <div className="flex items-center">
                  <select
                    id="LeaveTypeId"
                    name="LeaveTypeId"
                    value={formik.values.LeaveTypeId}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  >
                    <option value="">Select a Leave Type</option>
                    {LeaveTypes.length > 0 &&
                      LeaveTypes.map((entry) => (
                        <option
                          key={entry.LeaveTypeId}
                          value={entry.LeaveTypeId}
                        >
                          {entry.LeaveType}
                        </option>
                      ))}
                  </select>
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
                  id="Remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.Remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Leave Days</p>
                <input
                  id="LeaveDays"
                  type="number"
                  placeholder="Enter Leave Days"
                  value={formik.values.LeaveDays}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                />
              </div>
              <div>
                <label className="text-[13px] font-semibold">
                  To be Sanctioned By
                </label>
                <div className="relative w-full text-[13px]">
                  <textbox
                    type="text"
                    id="TBSanctionBy"
                    name="TBSanctionBy"
                    value={managerId}
                    disabled
                  >
                    {managerName || "Enter Reporting employee"}
                  </textbox>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="Submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Submit
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

export default LeaveModal1;
