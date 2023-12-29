import React from "react";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAuth, useDetails } from "../Login";
import axios from "axios";

const LeaveBalance = () => {
  const [LeaveTypes, setLeaveTypes] = useState([])
  const [employeeId, setEmployeeId] = useState('')
  const [employeeTypeId, setEmployeeTypeId] = useState('')
  const [employeeType, setEmployeeType]  = useState('')
  const [employeeTypeGroup, setEmployeeTypeGroup] = useState('')
  const [employeeTypes, setEmployeeTypes] = useState([])
  const [employeeName, setEmployeeName] = useState('')
  const { fYear } = useDetails()
  const [ FinancialYears, setFinancialYears] = useState([])
  const [Employees, setEmployees] = useState([])
  const { token } = useAuth()
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const filteredEmployees = Employees.filter(
    (employee) =>
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
      Fyear: "",
      month: "",
      year: "",
      LBDate: "",
      EmpType: "",
      Remarks: "",
    },
    onSubmit: (values) => {
      console.log(values);
      // alert("Added Successfully");
    },
  });

  useEffect(() =>{
    const fetchEmployees = async () =>{
      try {
        const response = await axios.get('http://localhost:5500/employee/personal/FnShowActiveData',
        { headers: { Authorization: `Bearer ${token}`}}
        )
        const data = response.data
        console.log('Employees', data)
        setEmployees(data)
      } catch (error) {
        console.error('Error', error);
      }
    }
    fetchEmployees()
  },[token])

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

  useEffect(() =>{
    const fetchFinancialYears = async () =>{
      try {
        const response = await axios.get('http://localhost:5500/financials/FnShowActiveData',
        { headers: { Authorization: `Bearer ${token}` }}
        )
        const data = response.data
        console.log('Financial Years', data)
        setFinancialYears(data)
      } catch (error) {
        console.error('Error', error);
      }
    }
    fetchFinancialYears()
  },[token])

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  
    const addLeaveBalance = async () => {
      try {
        const leaveTypePayloads = LeaveTypes.map(({ LeaveTypeId, ShortName }) => ({
          FYear: fYear,
          EmployeeId: employeeId,
          EmployeeTypeId: employeeTypeId,
          EmployeeType: employeeType,
          EmployeeTypeGroup: employeeTypeGroup,
          LeaveTypeId: LeaveTypeId,
          LeaveTypeDesc: ShortName,
          Month: "",
          Year: "",
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
        }));
        console.log(leaveTypePayloads);
        const response = await axios.post('http://localhost:5500/leave-balance/FnAddUpdateDeleteRecord', leaveTypePayloads,
        {headers: { Authorization: `Bearer ${token}`}});
        alert('Leave Balance Uploaded')
      } catch (error) {
        console.error('Error', error);
      }
    };
    
  
    useEffect(() =>{
      const fetchLeaveType = async() =>{
        try{
          const response = await axios.get('http://localhost:5500/leave-type/FnShowActiveData',{
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          const data = response.data
          console.log(data)
          setLeaveTypes(data)
        } catch(error){
          console.error('Error', error);
        }
      }
    
      fetchLeaveType()
    }, [token])

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
                <label
                  className="text-[13px] font-semibold"
                >
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
                  {FinancialYears.length > 0 && FinancialYears.map((entry) => (
                    <option key={entry.FYearId} value={entry.ShortName}>
                      {entry.ShortName}
                    </option>
                  ))}
                </select>
                </div>
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
            <label className="text-[13px] font-semibold">Employee Name</label>
            <div className="flex items-center">
              <div className="relative w-full">
              <input
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
                    setEmployeeId(entry.EmployeeId);
                    setEmployeeTypeId(entry.EmployeeTypeId);
                    setEmployeeTypeGroup(entry.EmployeeTypeGroupId);
                    setEmployeeName(entry.EmployeeName);

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
          )}
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
            <button className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36">
              Leave Calculate
            </button>
            <button
              type="submit"
              className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save
            </button>
            <button 
            type='button'
            className="bg-blue-900 text-white text-[13px] font-semibold py-2 px-4 rounded-lg w-36"
            onClick={addLeaveBalance}>
              Generate Leaves
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
