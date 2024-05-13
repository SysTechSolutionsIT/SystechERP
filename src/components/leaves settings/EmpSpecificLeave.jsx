import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth, useDetails } from "../Login";

const AddEmpLeave = ({ visible, onClick, ID, name }) => {
  const { token } = useAuth();
  const { fYear } = useDetails();
  const [LeaveBalance, setLeaveBalance] = useState([]);
  const [LeaveTypes, setLeaveTypes] = useState([]);
  const [employeeType, setEmployeeType] = useState("");
  const [employeeTypeGroup, setEmployeeTypeGroup] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [employeeTypeId, setEmployeeTypeId] = useState("");

  const formik = useFormik({
    initialValues: {
      FYear: fYear,
      EmployeeId: ID,
      EmployeeTypeId: "",
      EmployeeType: "",
      EmployeeTypeGroup: "",
      LeaveTypeId: "",
      LeaveTypeDesc: "",
      Month: "",
      Year: "",
      LeaveBalanceDate: "",
      EmployeeName: name,
      OpeningBalance: "",
      LeaveEarned1: "",
      LeaveEarned2: "",
      LeaveEarned3: "",
      LeaveEarned4: "",
      LeaveEarned5: "",
      LeaveEarned6: "",
      LeaveEarned7: "",
      LeaveEarned8: "",
      LeaveEarned9: "",
      LeaveEarned10: "",
      LeaveEarned11: "",
      LeaveEarned12: "",
      SanctionLeaveDays: "",
      LeaveBalance: "",
      Remark: "",
    },
    onSubmit: (values) => {
      console.log("Updation Object: ", values);
    },
  });

  // Adding new record for the employee
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const addLeaveBalance = async () => {
    // console.log("UPdation object:", formik.values);
    try {
      const currentYear = new Date().getFullYear();
      const updationObject = {
        FYear: fYear,
        EmployeeId: ID,
        EmployeeTypeId: employeeTypeId,
        EmployeeType: employeeType,
        EmployeeTypeGroup: employeeTypeGroup,
        LeaveTypeId: formik.values.LeaveTypeId,
        LeaveTypeDesc: formik.values.ShortName,
        Month: new Date().getMonth() + 1,
        Year: currentYear,
        LeaveBalanceDate: formattedDate,
        EmployeeName: name,
        OpeningBalance: formik.values.DefaultBalance,
        LeaveEarned1: 0,
        LeaveEarned2: 0,
        LeaveEarned3: 0,
        LeaveEarned4: 0,
        LeaveEarned5: 0,
        LeaveEarned6: 0,
        LeaveEarned7: 0,
        LeaveEarned8: 0,
        LeaveEarned9: 0,
        LeaveEarned10: 0,
        LeaveEarned11: 0,
        LeaveEarned12: 0,
        SanctionLeaveDays: 0,
        LeaveBalance: 0,
        Remark: "",
        IUFlag: "I",
      };
      console.log("Object to be updated:", updationObject);
      const confirmAdd = window.confirm(
        "Are you sure you want to generate leaves for this New Employee?"
      );
      if (!confirmAdd) return;
      const response = await axios.post(
        "http://localhost:5500/leave-balance/FnAddNewRecordEmp",
        updationObject,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Leave Balance Generated");
    } catch (error) {
      console.error("Error", error);
    }
  };

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
    const selectedEmployeeType = employeeTypes.find(
      (type) => type.EmployeeTypeId === employeeTypeId
    );

    if (selectedEmployeeType) {
      setEmployeeType(selectedEmployeeType.ShortName);
    }
  }, [employeeTypeId, employeeTypes]);

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
        console.log("Leave Type Data", data);
        setLeaveTypes(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchLeaveType();
  }, [token]);
  const handleLeaveTypeChange = (selectedLeaveType) => {
    // Find the selected leave type object
    const selectedType = LeaveTypes.find(
      (type) => type.LeaveTypeId === selectedLeaveType
    );
    if (selectedType) {
      // Update form values based on the selected leave type
      formik.setValues({
        ...formik.values,
        LeaveTypeId: selectedType.LeaveTypeId,
        ShortName: selectedType.ShortName,
        DefaultBalance: selectedType.DefaultBalance,
        MaxPerMonth: selectedType.MaxPerMonth,
        PaidFlag: selectedType.PaidFlag,
        CarryForwardFlag: selectedType.CarryForwardFlag,
        Remark: selectedType.Remark,
      });
    }
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%]  p-8 rounded-lg max-h-[90%]">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Leave Type Master
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
                <label className="text-[13px] font-semibold">
                  Financial Year
                </label>
                <input
                  id="FYear"
                  name="FYear"
                  value={fYear}
                  onChange={formik.handleChange}
                  className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                />
              </div>
              <div>
                <label className="text-[13px] font-semibold">Employee ID</label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="EmployeeId"
                      name="EmployeeId"
                      className={`w-full bg-white px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                      value={ID}
                      disabled="true"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[13px] font-semibold">
                  Employee Name
                </label>
                {/* <div className="flex items-center"> */}
                <div className="relative w-full">
                  <input
                    type="text"
                    id="EmployeeName"
                    name="EmployeeName"
                    className={`w-full bg-white px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                    value={name}
                    disabled="true"
                  />
                </div>
                {/* </div> */}
              </div>
              <div className="relative w-full">
                <p className="text-[13px] font-semibold">Leave Type Name</p>
                <select
                  id="LeaveTypeId"
                  value={formik.values.LeaveTypeId}
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleLeaveTypeChange(e.target.value);
                  }}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]`}
                >
                  <option value="">Select Leave Type</option>
                  {LeaveTypes.map((type) => (
                    <option key={type.LeaveType} value={type.LeaveTypeId}>
                      {type.LeaveType}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[13px] font-semibold">Short Name</p>
                <input
                  id="ShortName"
                  type="text"
                  value={formik.values.ShortName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]`}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Default Balance</p>
                <input
                  id="DefaultBalance"
                  type="number"
                  value={formik.values.DefaultBalance}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]`}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Max Per Month</p>
                <input
                  id="MaxPerMonth"
                  type="number"
                  value={formik.values.MaxPerMonth}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]`}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Paid Flag
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="PaidFlag"
                      value="P"
                      checked={formik.values.PaidFlag === "P"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Paid
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="PaidFlag"
                      value="U"
                      checked={formik.values.PaidFlag === "U"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Unpaid
                  </label>
                </div>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Carry Forward Flag
                </p>
                <div className="space-y-2 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="CarryForwardFlag"
                      value="Y"
                      checked={formik.values.CarryForwardFlag === "Y"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="CarryForwardFlag"
                      value="N"
                      checked={formik.values.CarryForwardFlag === "N"}
                      onChange={formik.handleChange}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
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
            </div>
          </div>

          <div className="flex gap-10 justify-center">
            <button
              type="button"
              onClick={() => {
                addLeaveBalance();
              }}
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

export default AddEmpLeave;
