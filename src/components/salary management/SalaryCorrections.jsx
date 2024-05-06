import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { useAuth, useDetails } from "../Login";
import axios from "axios";
import SalaryCorrectionsModal from "./SalaryCorrectionsModal";
import VEDept from "../company settings/ViewDept";

const SalaryCorrections = () => {
  const {token} = useAuth()
  const [details, setDetails] = useState([]);
  const {fYear} = useDetails()
  const [salaryData, setSalaryData] = useState([])
  const [employeeTypes, setEmployeeTypes] = useState([])
  const [employees, setEmployees] = useState([])
  const [departments, setDepartments] = useState([])
  const [VEDept, setVeDept] = useState(false)
  const [Did, setDid] = useState()
  const [empid, setEmpId] = useState()
  const [empTypeId, setEmpTypeId] = useState()
  
  const formik = useFormik({
    initialValues: {
      ApprovalFlag: "",
      LeaveApplicationId: "",
      FYear: "",
      ApplicationDate: "",
      employeeType: "",
      EmployeeName: "",
      LeaveFromDate: "",
      LeaveToDate: "",
      remarks: "",
      leaveDays: "",
      Status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      alert("Added Successfully");
    },
  });

  const [status, setStatus] = useState(false);
  const columnHeads = [
    "Actions",
    "Process Id",
    "Process Date",
    "Employee Id",
    "Employee Name",
    "Employee Type",
    "Department Name",
    "AMonth",
    "AYear",
    "Gross Salary",
    "PerDaySalary",
    "Salaried Days",
    "Monthly Salary",
    "TotalEarning",
    "TotalDeduction",
    "NetSalary",
  ];

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [displayMonth, setDisplayMonth] = useState('')
  const [displayYear, setDisplayYear] = useState('')

  const handleDisplayMonthChange = (e) =>{
    setDisplayMonth(e.target.value)
  }

  const handleDisplayYearChange = (e) =>{
    setDisplayYear(e.target.value)
  }

  // Function to handle month selection
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Function to handle year selection
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
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

  const salHead = ["Salary Head", "Earning Head", "Deduction Heads"];

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
    const fetchEmployeeNames = async() =>{
      try{
        const response = await axios.get("http://localhost:5500/employee/personal/FnEmployeeNamesAndIds",
        { headers: { Authorization: `Bearer ${token}`}
      })
      const data = response.data
      setEmployees(data)
      console.log(response)
      } catch (error){
        console.error('Error', error);
      }
    }
    fetchEmployeeNames()
  },[token, displayMonth, displayYear])

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
  }, [token, displayMonth, displayYear]);

    const FetchSalaryData = async() =>{
      try {
        const response = await axios.get('http://localhost:5500/salary-processing/month-wise-salary',
        {
          params: {
            AMonth: displayMonth,
            AYear: displayYear
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


  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() =>{
    FetchSalaryData()
  },[token, displayMonth, displayYear])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex h-full w-[75%%] ml-4">
        <div className=" bg-gray-200 p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Salary Mangement / Salary Corrections
            </p>
          </div>
          <div>
          <div className="flex mt-4 justify-start">
            <div className="mr-4">
              <label htmlFor="month" className="text-gray-700">
                Month:
              </label>
              <select
                name="month"
                value={displayMonth}
                onChange={handleDisplayMonthChange}
                className="block w-[120px] mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value=''>Select Month</option>
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="year" className="text-gray-700">
                Year:
              </label>
              <select
                name="year"
                value={displayYear}
                onChange={handleDisplayYearChange}
                className="block w-[120px] mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value=''>Select Year</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 justify-between mt-2 w-full">
            <div className="">
              <table className="min-w-full text-center tableX1">
                <thead className="bg-gray-700 whitespace-nowrap text-white">
                  <tr className="bg-white">
                    {columnHeads.map((columnName) => (
                      <th
                        key={columnName}
                        className="px-2 py-2 font-bold text-[13px] text-center border-2 bg-blue-900 text-white "
                        // style={{
                        //   borderTopLeftRadius: "10px",
                        //   borderTopRightRadius: "10px",
                        // }}
                      >
                        {columnName
                          .replace(/([a-z])([A-Z])/g, "$1 $2")
                          .split(" ")
                          .map((word, index) => (
                            <div key={index} className="whitespace-nowrap">
                              {word}
                            </div>
                          ))}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {salaryData.map((item) =>(
                  <tr className="bg-white">
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                  <Icon
                          icon="mdi:edit"
                          color="#556987"
                          width="20"
                          height="20"
                          className="cursor-pointer"
                           onClick={() => {
                           setVeDept(true); // Open VEModal
                           setDid(item.ProcessId); // Pass ID to VEModal
                           setEmpId(item.EmployeeId)
                           setEmpTypeId(item.EmployeeTypeId)
                           }}
                        />
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                  {item.ProcessId}
                  </td>
                  <td className="px-4 border-2 whitespace-nowrap text-left text-[11px]">
                  {formatDate(item.ProcessDate)}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {item.EmployeeId}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {employees.find((record) => record.EmployeeId === item.EmployeeId).EmployeeName}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {employeeTypes.find((record) => record.EmployeeTypeId === item.EmployeeTypeId).EmployeeType}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {departments.find((record) => record.DepartmentId === item.DeptId).DepartmentName}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {item.AMonth}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {item.AYear}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {item.GrossSalary}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {item.PerDaySalary}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {item.Presenty}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {item.MonthlySalary}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {item.TotalEarning}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {item.TotalDeduction}
                  </td>
                  <td className="px-4 border-2 whitespace-normal text-left text-[11px]">
                    {item.NetSalary}
                  </td>
                </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <SalaryCorrectionsModal
      visible={VEDept}
      onClick={() => setVeDept(false)}
      ID = {Did}
      empID = {empid}
      empTypeId = {empTypeId}
      />
      </div>
    </form>
  );
};

export default SalaryCorrections;
