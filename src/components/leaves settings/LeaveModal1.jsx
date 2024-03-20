import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const LeaveModal1 = ({ visible, onClick }) => {
  const [details, setDetails] = useState([]);
  const [Employees, setEmployees] = useState([])
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("");
  const [LeaveTypes, setLeaveTypes] = useState('')
  const [ FinancialYears, setFinancialYears] = useState([])
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


  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "P",
      FYear: "",
      LeaveApplicationDate: new Date().toISOString().split('T')[0],
      EmployeeId: "",
      EmployeeName:"",
      EmployeeType:"",
      EmployeeTypeGroup:"",
      LeaveFromDate: "",
      LeaveToDate: "",
      Remark: "",
      LeaveTypeId:"",
      LeaveDays: "",
      IUFlag:"I"
    },
    onSubmit: (values) => {
      const updatedData ={
        ApprovalFlag: "P",
        FYear: values.FYear,
        LeaveApplicationDate: values.LeaveApplicationDate,
        EmployeeId: values.EmployeeId,
        EmployeeType: values.EmployeeType,
        EmployeeTypeGroup: values.EmployeeTypeGroup,
        LeaveFromDate: values.LeaveFromDate,
        LeaveToDate: values.LeaveToDate,
        Remark: values.Remark,
        LeaveTypeId: values.LeaveTypeId,
        LeaveDays: values.LeaveDays,
        IUFlag:"I"
      }
      addLeaveApplication()
    },
  });

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


  const addLeaveApplication = async () =>{
    try{
      const response = await axios.post('http://localhost:5500/leave-application/FnAddUpdateDeleteRecord', formik.values, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      alert('Leave Application Added')
    } catch (error){
      console.error('Error', error);
    }
  }


  const [isStatusChecked, setStatusChecked] = useState(false)

  const handleCheckboxChange = (fieldName, setChecked, event) => {
    //This is how to use it (event) => handleCheckboxChange('Status', setStatusChecked, event)
      const checked = event.target.checked;
      setChecked(checked);
      formik.setValues({
        ...formik.values,
        [fieldName]: checked.toString(),
      });
    };

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
              <p className="text-[13px] font-semibold">Leave Application Date</p>
              <input
                id="LeaveApplicationDate"
                type="date"
                value={formik.values.LeaveApplicationDate} // Set value to current date
                readOnly // Make the input field read-only
                className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]`}
              />
            </div>
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
              <div className="py-0">
              <p className="font-semibold text-[13px]">
                Employee Type Group
              </p>
              <select
                id="EmployeeTypeGroup"
                name="EmployeeTypeGroup"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.EmployeeTypeGroup}
                onChange={formik.handleChange}
              >
                <option value={formik.values.EmployeeTypeGroup}>
                  {formik.values.EmployeeTypeGroup}
                </option>
                <option value="">Select Group Type</option>
                <option value="Worker">Worker</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div className="">
            <p className="font-semibold text-[13px]">Employee Type</p>
            <select
              id="EmployeeType"
              name="EmployeeType"
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
              value={selectedEmployeeType}
              onChange={(e) => {
                const selectedType = e.target.value;
                setSelectedEmployeeType(selectedType);
                const selectedEmployee = employeeTypes.find(
                  (entry) => entry.EmployeeTypeId === selectedType
                );
                formik.setValues({
                  ...formik.values,
                  EmployeeType: selectedEmployee ? selectedEmployee.ShortName : "",
                });
              }}
            >
              <option value="">Select Type</option>
              {employeeTypes.map((entry) => (
                <option key={entry.EmployeeTypeId} value={entry.EmployeeTypeId}>
                  {entry.EmployeeType}
                </option>
              ))}
            </select>
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
                <label
                  className="text-[13px] font-semibold"
                >
                  Leave Type
                </label>
                <div className="flex items-center">
                <select
                  id="LeaveTypeId"
                  name="LeaveTypeId"
                  value={formik.values.LeaveTypeId}
                  onChange={formik.handleChange}
                  className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                >
                  <option value="">Select a Leave Type</option>
                  {LeaveTypes.length > 0 && LeaveTypes.map((entry) => (
                    <option key={entry.LeaveTypeId} value={entry.LeaveTypeId}>
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

export default LeaveModal1;
