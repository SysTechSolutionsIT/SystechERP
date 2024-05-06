import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const SalaryCorrectionsModal = ({ visible, onClick, ID, empID, empTypeID }) => {
  const { token } = useAuth();
  const [salaryData, setSalaryData] = useState([])  
  const [employee, setEmployee] = useState()
  const [employeeTypes, setEmployeeTypes] = useState([])
  const [departments, setDepartments] = useState([])

  
  const formik = useFormik({
    initialValues: {
      ProcessId: "",
      ProcessDate: "",
      EmployeeId: "",
      EmployeeTypeId: "",
      DeptId: "",
      AMonth: "",
      AYear: "",
      GrossSalary: "",
      PerDaySalary: "",
      Presenty: "",
      MonthlySalary: "",
      TotalEarning: "",
      TotalDeduction: "",
      NetSalary: "",
    },
    onSubmit: (values) => {
      const updatedData = {
        ProcessId: ID,
        ProcessDate: formik.values.ProcessDate,
        EmployeeId: formik.values.EmployeeId,
        EmployeeTypeId: formik.values.EmployeeTypeId,
        DeptId: formik.values.DeptId,
        AMonth: formik.values.AMonth,
        AYear: formik.values.AYear,
        GrossSalary: formik.values.GrossSalary,
        PerDaySalary: formik.values.PerDaySalary,
        Presenty: formik.values.Presenty,
        MonthlySalary: formik.values.MonthlySalary,
        TotalEarning: formik.values.TotalEarning,
        TotalDeduction: formik.values.TotalDeduction,
        NetSalary: formik.values.NetSalary,
      };
      console.log(updatedData);
      UpdateSalaryData(updatedData)
    },
  });

  const UpdateSalaryData = async(data) =>{
    try {
        const response = await axios.post('http://localhost:5500/salary-processing/FnSalaryCorrections', data,{
            params: { ProcessId: ID},
            headers: {Authorization: `Bearer ${token}`}
        })
        alert('Salary Corrected')
    } catch (error) {
      console.error('Error', error);
    }
  }

  const FetchSalaryData = async() =>{
    try {
      const response = await axios.get('http://localhost:5500/salary-processing/FnShowParticularData',
      {
        params: {
            ProcessId: ID
        },
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      const data = response.data
      setSalaryData(data)
      console.log(data)
    } catch (error) {
      console.error('Error', error);
    }
  }

  useEffect(() =>{
    const fetchEmployeeTypes = async() =>{
      try{
        const response = await axios.get("http://localhost:5500/employee-type/FnShowActiveData",
        { 
            headers: { Authorization: `Bearer ${token}`}
      })
      const data = response.data
      setEmployeeTypes(data.EmployeeType)
      console.log('Emp type', response)
      } catch (error){
        console.error('Error', error);
      }
    }
    fetchEmployeeTypes()
  },[token, visible])

  useEffect(() => {
    const fetchDept = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/departmentmaster/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response Object", response);
        const data = response.data;
        console.log(data);
        setDepartments(data);
      } catch (error) {
        console.log("Error while fetching course data: ", error.message);
      }
    };
    fetchDept();
  }, [token, visible]);

  useEffect(() =>{
    FetchSalaryData()
  },[visible, token])

  useEffect(() =>{
    const fetchEmployeeNames = async() =>{
      try{
        const response = await axios.get("http://localhost:5500/employee/personal/FnFetchEmployeeName",

        { 
            params: {EmployeeId: empID},
            headers: { Authorization: `Bearer ${token}`}
      })
      const data = response.data
      console.log('Employee Name', data)
      setEmployee(data.EmployeeName)
      console.log(response)
      } catch (error){
        console.error('Error', error);
      }
    }
    fetchEmployeeNames()
  },[token, visible])

  useEffect(() =>{
    if(salaryData){
        formik.setValues({
            ProcessDate: salaryData.ProcessDate,
            EmployeeId: salaryData.EmployeeId,
            EmployeeTypeId: salaryData.EmployeeTypeId,
            DeptId: salaryData.DeptId,
            AMonth: salaryData.AMonth,
            AYear: salaryData.AYear,
            GrossSalary: salaryData.GrossSalary,
            PerDaySalary: salaryData.PerDaySalary,
            Presenty: salaryData.Presenty,
            MonthlySalary: salaryData.MonthlySalary,
            TotalEarning: salaryData.TotalEarning,
            TotalDeduction: salaryData.TotalDeduction,
            NetSalary: salaryData.NetSalary,
        })
    }
  },[salaryData])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};


  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg max-h-[80%] overflow-y-scroll">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold">
              Salary Corrections
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
              <div>
                <p className="text-[13px] font-semibold">Process ID</p>
                <input
                  id="ID"
                  type="text"
                  placeholder="Enter Field Details"
                  value={ID}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  readOnly
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Process Date</p>
                <input
                  id="ProcessDate"
                  type="text"
                  value={formatDate(formik.values.ProcessDate)}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  readOnly
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee ID</p>
                <input
                  id="EmployeeId"
                  type="text"
                  value={formik.values.EmployeeId}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Name</p>
                <input
                  type="text"
                  value={employee}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Employee Type</p>
                <input
                    type="text"
                    value={
                    employeeTypes && // Check if employeeTypes is defined
                    employeeTypes.length > 0 && // Check if employeeTypes has elements
                    employeeTypes.find(
                        (record) => record.EmployeeTypeId === empTypeID
                    ).EmployeeType
                    }
                    className={`w-full px-4 py-2 text-[11px] focus:outline-blue-900 border-gray-300 border-2 rounded-lg `}
                    onChange={formik.handleChange}
                />
                </div>
              <div>
                <p className="text-[13px] font-semibold">Month</p>
                <input
                  id="AMonth"
                  type="text"
                  value={formik.values.AMonth}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  readOnly
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Year</p>
                <input
                  id="AYear"
                  type="text"
                  value={formik.values.AYear}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                  readOnly
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Gross Salary</p>
                <input
                  id="GrossSalary"
                  type="text"
                  value={formik.values.GrossSalary}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Per Day Salary</p>
                <input
                  id="PerDaySalary"
                  type="text"
                  value={formik.values.PerDaySalary}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Presenty</p>
                <input
                  id="Presenty"
                  type="text"
                  value={formik.values.Presenty}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Monthly Salary</p>
                <input
                  id="MonthlySalary"
                  type="text"
                  value={formik.values.MonthlySalary}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Total Earning</p>
                <input
                  id="TotalEarning"
                  type="text"
                  value={formik.values.TotalEarning}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Total Deduction</p>
                <input
                  id="TotalDeduction"
                  type="text"
                  value={formik.values.TotalDeduction}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="text-[13px] font-semibold">Net Salary</p>
                <input
                  id="NetSalary"
                  type="text"
                  value={formik.values.NetSalary}
                  className={`w-full px-4 py-2 text-[11px] focus: outline-blue-900 border-gray-300 border-2 rounded-lg `}
                  onChange={formik.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-10 justify-center">
            <button
              type="submit"
              onClick={formik.handleSubmit}
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

export default SalaryCorrectionsModal;
