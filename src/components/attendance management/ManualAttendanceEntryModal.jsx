import { useFormik } from "formik";
import React from "react";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useAuth } from "../Login";
import axios from "axios";

const ManualAttendanceEntryModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [Details, setDetails] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [selectedEmployeeType, setSelectedEmployeeType] = useState(null);
  const [Shifts, setShift] = useState([]);
  const [Jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "P",
      AttendanceDate: "",
      FYear: "",
      EmployeeTypeId: "",
      EmployeeId: "",
      EmployeeTypeGroup: "",
      ShiftId: "",
      InTime: "",
      OutTime: "",
      JobTypeId: "",
      SanctionBy: "",
      AcFlag: "Y",
      IUFlag: "I",
      Remark: "",
      CreatedOn: new Date(),
    },
    onSubmit: (values) => {
      const updatedData = {
        ApprovalFlag: "P",
        FYear: formik.values.FYear,
        EmployeeId: formik.values.EmployeeId,
        EmployeeTypeId: formik.values.EmployeeId,
        EmployeeTypeGroup: formik.values.EmployeeTypeGroup,
        ShiftId: formik.values.ShiftId,
        InTime: formik.values.InTime,
        OutTime: formik.values.OutTime,
        JobTypeId: formik.values.JobTypeId,
        SanctionBy: formik.values.SanctionBy,
        ACFlag: "Y",
        IUFlag: "I",
        Remark: formik.values.Remark,
        CreatedOn: new Date(),
      };
      console.log(updatedData);
      addAttendance(updatedData);
    },
  });
  // Posting data
  const addAttendance = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/manual-attendance/FnAddUpdateDeleteRecord",
        data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
      alert("Data Added Successfully");
      onClick();
      window.location.reload();
    } catch (error) {
      console.error("Error", error);
    }
  };
  //Fetching employee names and IDs
  const fetchPersonalData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/personal/FnShowActiveData`,
        {
          headers: { Authorization: `Bearer ${token}` }, // Moved headers here
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      setDetails(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  // Get
  useEffect(() => {
    fetchPersonalData();
  }, [token]);

  //Setting Employee Details
  const handleEmployeeChange = (event) => {
    setSelectedEmployeeId(event.target.value);
  };

  // getting Employee Types
  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee-type/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setEmployeeTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchEmployeeTypes();
  }, [token]);

  // Shifts
  useEffect(() => {
    const fetchShift = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/shift-master/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setShift(data);
        console.log(response);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchShift();
  }, [token]);

  //Job types
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/job-type/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setJobs(data);
        console.log(response);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchJobs();
  }, [token]);

  // Setting Employee Type Group
  useEffect(() => {
    const fetchEmployeeTypeGroup = async () => {
      try {
        if (formik.values.EmployeeTypeId) {
          const response = await axios.get(
            "http://localhost:5500/employee-type/FnShowParticularData",
            {
              params: { EmployeeTypeId: formik.values.EmployeeTypeId }, // Pass EmployeeTypeId as a parameter
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = response.data;
          console.log("Employee type group data:", data);
          if (data && data.length > 0) {
            console.log("employee type group:", data.EmployeeTypeGroup);
            formik.setFieldValue("EmployeeTypeGroup", data.EmployeeTypeGroup);
          }
        } else {
          formik.setFieldValue("EmployeeTypeGroup", ""); // Reset the value when no Employee Type is selected
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchEmployeeTypeGroup();
  }, [formik.values.EmployeeTypeId, token]);
  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Manual Attendance Entry
            </p>
            <Icon
              icon="maki:cross"
              color="white"
              className="cursor-pointer"
              onClick={onClick}
            />
          </div>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col p-2 space-x-2">
                <p className="mb-3 font-semibold text-[13px]">
                  Manual Attendance Entry
                </p>
                <div className="flex">
                  <label className="flex items-center text-[13px]">
                    <input
                      type="radio"
                      name="AttendanceFlag"
                      value="M"
                      className="mr-2"
                      checked={formik.values.AttendanceFlag === "M"}
                      onChange={formik.handleChange}
                    />
                    Manual Attendance
                  </label>
                  <label className="flex items-center text-[13px]">
                    <input
                      type="radio"
                      name="AttendanceFlag"
                      value="O"
                      className="mr-2 ml-2"
                      checked={formik.values.AttendanceFlag === "O"}
                      onChange={formik.handleChange}
                    />
                    OutDoor Duty
                  </label>
                </div>
              </div>
              <div>
                <p className="text-[13px] font-semibold">Attendance Date</p>
                <input
                  id="AttendanceDate"
                  type="date"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.AttendanceDate}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">FYear</p>
                <input
                  id="FYear"
                  type="number"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.FYear}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Name</p>
                <select
                  id="EmployeeId"
                  name="EmployeeId"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.EmployeeId}
                  onChange={formik.handleChange}
                >
                  <option value="" disabled>
                    Select an employee
                  </option>
                  {Details.length > 0 &&
                    Details.map((employee) => (
                      <option
                        key={employee.EmployeeId}
                        value={employee.EmployeeId}
                      >
                        {employee.EmployeeName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="py-1">
                <p className="font-semibold text-[13px]">Employee Type</p>
                <select
                  id="EmployeeTypeId"
                  name="EmployeeTypeId"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.EmployeeTypeId}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Type</option>
                  {employeeTypes.map((entry) => (
                    <option
                      key={entry.EmployeeTypeId}
                      value={entry.EmployeeTypeId}
                    >
                      {entry.EmployeeType}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-1 font-semibold text-[13px]">Shift</p>
                <select
                  id="ShiftId"
                  name="ShiftId"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.ShiftId}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Shift</option>
                  {Shifts.map((entry) => (
                    <option key={entry.ShiftId} value={entry.ShiftId}>
                      {entry.ShiftName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-1 font-semibold text-[13px]">Job Type</p>
                <select
                  id="JobTypeId"
                  name="JobTypeId"
                  className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                  value={formik.values.JobTypeId}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Job Type</option>
                  {Jobs.map((entry) => (
                    <option key={entry.JobTypeId} value={entry.JobTypeId}>
                      {entry.JobTypeName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[13px] font-semibold">In Time</p>
                <input
                  id="InTime"
                  type="datetime-local" // Change the input type to handle date and time
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.InTime}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Out Time</p>
                <input
                  id="OutTime"
                  type="datetime-local" // Change the input type to handle date and time
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.OutTime}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Sanction By</p>
                <input
                  id="SanctionBy"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.SanctionBy}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Remark</p>
                <input
                  id="Remark"
                  type="text"
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  value={formik.values.Remark}
                  onChange={formik.handleChange}
                />
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

export default ManualAttendanceEntryModal;
