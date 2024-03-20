import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAuth, useDetails } from "../Login";
import axios from "axios";

const LeaveBalance = ({ID, name}) => {
  const [LeaveTypes, setLeaveTypes] = useState([]);
  const [LeaveBalance, setLeaveBalance] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeTypeId, setEmployeeTypeId] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [employeeTypeGroup, setEmployeeTypeGroup] = useState("");
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const { fYear } = useDetails();
  const [showTable, setShowTable] = useState(false);
  const [FinancialYears, setFinancialYears] = useState([]);
  const [Employees, setEmployees] = useState([]);
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [updatedArray, setUpdatedArray] = useState(
    LeaveBalance.map((item) => ({ ...item, IUFlag: "I" }))
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const filteredEmployees = Employees.filter((employee) =>
    employee.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const selectedEmployeeType = employeeTypes.find(
      (type) => type.EmployeeTypeId === employeeTypeId
    );

    if (selectedEmployeeType) {
      setEmployeeType(selectedEmployeeType.ShortName);
    }
  }, [employeeTypeId, employeeTypes]);

  const formik = useFormik({
    initialValues: {
      FYear: "",
      EmployeeId: "",
      EmployeeTypeId: "",
      EmployeeType: "",
      EmployeeTypeGroup: "",
      LeaveTypeId: "",
      LeaveTypeDesc: "",
      Month: "",
      Year: "",
      LeaveBalanceDate: "",
      EmployeeName: "",
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
      console.log(LeaveBalance);
    },
  });

  const fetchLeaveBalance = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5500/leave-balance/FnShowParticularEmployeeData",
        {
          params: {
            EmployeeId: ID,
            FYear: formik.values.FYear,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = response.data;
      setLeaveBalance(data);
      setShowTable(true);
      console.log(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleOpeningBalanceChange = (index, newValue) => {
    const updatedValues = [...LeaveBalance];
    updatedValues[index].OpeningBalance = newValue;
    setLeaveBalance(updatedValues);
  };

  const handleSanctionLeaveDaysChange = (index, newValue) => {
    const updatedValues = [...LeaveBalance];
    updatedValues[index].SanctionLeaveDays = newValue;
    setLeaveBalance(updatedValues);
  };

  const handleLeaveBalanceChange = (index, newValue) => {
    const updatedValues = [...LeaveBalance];
    updatedValues[index].LeaveBalance = newValue;
    setLeaveBalance(updatedValues);
    console.log("Leave balance updated");
  };

  const calculateLeaveBalance = (openingBalance, sanctionLeaveDays) => {
    const openingBalanceValue = parseFloat(openingBalance) || 0;
    const sanctionLeaveDaysValue = parseFloat(sanctionLeaveDays) || 0;
    const leaveBalance = openingBalanceValue - sanctionLeaveDaysValue;
    return leaveBalance;
  };

  const updateLeaveBalance = async () => {
    try {
      console.log("Leave balance in funciton", LeaveBalance);
      const response = await axios.patch(
        "http://localhost:5500/leave-balance/FnUpdateRecords",
        LeaveBalance,
        {
          params: {
            EmployeeId: employeeId,
            FYear: formik.values.FYear,
          },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Leave Balance Updated");
    } catch (error) {
      console.error("Error", error);
    }
  };

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
    const fetchFinancialYears = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/financials/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        console.log("Financial Years", data);
        setFinancialYears(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchFinancialYears();
  }, [token]);

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];

  const addLeaveBalance = async () => {
    try {
      const currentYear = new Date().getFullYear();
      const leaveTypePayloads = LeaveTypes.map(
        ({ LeaveTypeId, ShortName }) => ({
          FYear: fYear,
          EmployeeId: ID,
          EmployeeTypeId: employeeTypeId,
          EmployeeType: employeeType,
          EmployeeTypeGroup: employeeTypeGroup,
          LeaveTypeId: LeaveTypeId,
          LeaveTypeDesc: ShortName,
          Month: new Date().getMonth() + 1,
          Year: currentYear,
          LeaveBalanceDate: formattedDate,
          EmployeeName: employeeName,
          OpeningBalance: 0,
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
        })
      );
      console.log(leaveTypePayloads);
      const confirmAdd = window.confirm(
        "Are you sure you want to generate leaves for this New Employee?"
      );
      if (!confirmAdd) return;
      const response = await axios.post(
        "http://localhost:5500/leave-balance/FnAddUpdateDeleteRecord",
        leaveTypePayloads,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Leave Balance Generated");
    } catch (error) {
      console.error("Error", error);
    }
  };

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
    "Employee ID",
    "Employee Name",
    "Leave Type",
    "Opening Balance",
    "Leaves Taken",
    "Leave Balance",
    "Leaves Earned 1",
    "Leaves Earned 2",
    "Leaves Earned 3",
    "Leaves Earned 4",
    "Leaves Earned 5",
    "Leaves Earned 6",
    "Leaves Earned 7",
    "Leaves Earned 8",
    "Leaves Earned 9",
    "Leaves Earned 10",
    "Leaves Earned 11",
    "Leaves Earned 12",
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex justify-center items-center h-full">
        <div className="bg-gray-200 w-[90%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Leave Update Balance
            </p>
            <button
              type="button"
              className="bg-white border-2 border-white text-blue-900 text-[13px] font-semibold py-1 px-4 rounded-lg hover:bg-blue-900 hover:text-white hover:ease-in-out"
              onClick={addLeaveBalance}
            >
              Generate Leaves
            </button>
          </div>

          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[13px] font-semibold">
                  Financial Year
                </label>
                <div className="flex items-center">
                  <select
                    id="FYear"
                    name="FYear"
                    value={formik.values.FYear}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                  >
                    <option value="">Select a Financial Year</option>
                    {FinancialYears.length > 0 &&
                      FinancialYears.map((entry) => (
                        <option key={entry.FYearId} value={entry.ShortName}>
                          {entry.ShortName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {/* <div>
                <label
                  htmlFor="month"
                  className="mb-1 font-semibold text-[13px]"
                >
                  Month
                </label>
                <select
                  id="Month"
                  className="w-full text-[13px] px-4 py-2 font-normal focus:outline-gray-300 border-2 rounded-lg"
                  onChange={formik.handleChange}
                >
                  {months.map((month, index) => (
                    <option key={index} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div> */}
              <div>
                <label className="text-[13px] font-semibold">
                  Employee ID
                </label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="EmployeeId"
                      name="EmployeeId"
                      className={`w-full bg-white px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                      value={ID}
                      disabled='true'
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-[13px] font-semibold">
                  Employee Name
                </label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="EmployeeName"
                      name="EmployeeName"
                      className={`w-full bg-white px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                      value={name}
                      disabled='true'
                    />
                  </div>
                </div>
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
            <button
              type="button"
              onClick={fetchLeaveBalance}
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Leave Calculate
            </button>
            <button
              type="button"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
              onClick={updateLeaveBalance}
            >
              Save
            </button>
          </div>
          {showTable && (
            <div className="grid gap-2 justify-between mt-2">
              <div className="my-1 rounded-2xl p-2 pr-8">
                <table className="min-w-full text-center whitespace-normal z-0">
                  <thead>
                    <tr>
                      {columns.map((columnName) => (
                        <th
                          key={columnName}
                          className={`px-1 text-[13px] whitespace-normal font-bold text-white bg-blue-900 rounded-lt-lg rounded-rt-lg border-2 border-white`}
                        >
                          {columnName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {LeaveBalance.length > 0 &&
                      LeaveBalance.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {ID}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {name}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveTypeDesc}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            <input
                              type="number"
                              className="whitespace-normal w-[40px]"
                              value={item.OpeningBalance}
                              onChange={(e) => {
                                handleOpeningBalanceChange(
                                  index,
                                  e.target.value
                                );
                                handleLeaveBalanceChange(index, e.target.value);
                              }}
                            />
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            <input
                              type="number"
                              className="whitespace-normal w-[40px]"
                              value={item.SanctionLeaveDays}
                              onChange={(e) => {
                                handleSanctionLeaveDaysChange(
                                  index,
                                  e.target.value
                                );
                                handleLeaveBalanceChange(index, e.target.value);
                              }}
                            />
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            <input
                              type="number"
                              className="whitespace-normal w-[40px]"
                              value={calculateLeaveBalance(
                                item.OpeningBalance,
                                item.SanctionLeaveDays
                              )}
                              onChange={(e) =>
                                handleLeaveBalanceChange(index, e.target.value)
                              }
                            />
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned1}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned2}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned3}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned4}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned5}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned6}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned7}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned8}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned9}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned10}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned11}
                          </td>
                          <td className="px-4 border-2 whitespace-normal bg-white text-left text-[11px]">
                            {item.LeaveEarned12}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default LeaveBalance;
