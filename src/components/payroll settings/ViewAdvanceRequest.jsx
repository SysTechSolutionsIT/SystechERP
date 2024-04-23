import React from "react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import axios from "axios";
import { useDetails } from "../Login";
import { useAuth } from "../Login";

const ViewAdvanceRequest = ({ visible, onClick, edit, ID}) => {
    const { token } = useAuth();
    const { name, empid } = useDetails()
    const [Employees, setEmployees] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [details, setDetails] = useState([])
  
    const formik = useFormik({
      initialValues: {
        AdvanceDate: new Date().toISOString().split('T')[0],
        EmployeeId: empid,
        EmployeeName: name,
        AdvanceType: "",
        AdvanceStatus: "",
        ApprovalFlag: "P",
        ProjectId: "",
        Amount: "",
        MEmployee:"",
        MEmployeeName: "",
        Installment: "",
        AMonth: "",
        AYear: "",
        Purpose: "",
        IUFlag: "U",
        Remark: "",
      },
      onSubmit: (values, {resetForm}) => {
        const updatedData = {
          AdvanceId: values.AdvanceId,
          AdvanceDate: values.AdvanceDate,
          EmployeeId: empid,
          EmployeeName: name,
          AdvanceType: values.AdvanceType,
          AdvanceStatus: values.AdvanceStatus,
          ProjectId: values.ProjectId,
          Amount: values.Amount,
          MEmployee:values.MEmployee,
          Installment: values.Installment,
          AMonth: values.AMonth,
          AYear: values.AYear,
          Purpose: values.Purpose,
          IUFlag: "U",
          Remark: values.Remark,
        }
        console.log(updatedData)
        updateAdvanceRequest(updatedData);
        resetForm()
        onClick()
      },
    });
  
    const updateAdvanceRequest = async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5500/a0bdhs87t/FnAddUpdateDeleteRecord",
          values,
          {
            params: { AdvancdId: ID},
            headers: {Authorization: `Bearer ${token}`},
          }
        );
          alert("Advance Request Updated");
      } catch (error) {
        console.log("Error: ", error.message);
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
        const fetchAdvanceRequest = async () =>{
            try {
                const response = await axios.get('http://localhost:5500/a0bdhs87t/FnShowParticularData',
                {
                    params: { AdvanceId: ID },
                    headers: { Authorization: `Bearer ${token}` } 
                })
                
                const data = response.data
                setDetails(data)
            } catch (error) {
                console.error('Error', error);
            }
        }
        fetchAdvanceRequest()
     },[token, visible])
     
     useEffect(() =>{
      if (details){
        formik.setValues({
          AdvanceId: details.AdvanceId,
          AdvanceDate: details.AdvanceDate,
          EmployeeId: details.EmployeeId,
          EmployeeName: details.EmployeeName,
          AdvanceType: details.AdvanceType,
          AdvanceStatus: details.AdvanceStatus,
          ApprovalFlag: details.ApprovalFlag,
          ProjectId: details.ProjectId,
          Amount: details.Amount,
          MEmployee:details.MEmployee,
          Installment: details.Installment,
          AMonth: details.AMonth,
          AYear: details.AYear,
          Purpose: details.Purpose,
          Remark: details.Remark,
        })
      }
     },[details])
     
    const handleInputChange = (event) => {
      const { value } = event.target;
      setSearchTerm(value);
    };
  
    const filteredEmployees = Employees.filter((employee) =>
      employee.EmployeeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    if (!visible) return null;
    return (
      <form onSubmit={formik.handleSubmit}>
        <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
          <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
            <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
              <p className="text-white text-[15px] font-semibold text-center">
                Advance Request
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
              <div className="grid grid-cols-2 gap-4">
              <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Advance ID
                  </p>
                  <input
                    id="AdvanceId"
                    type="text"
                    value={formik.values.AdvanceId}
                    readOnly
                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                    />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Advance Date
                  </p>
                  <input
                    id="AdvanceDate"
                    type="date"
                    value={formik.values.AdvanceDate}
                    readOnly
                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Employee Id
                  </p>
                  <input
                    id="EmployeeId"
                    type="text"
                    value={empid}
                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Employee Name
                  </p>
                  <input
                    id="EmployeeName"
                    type="text"
                    value={name}
                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capitalize font-semibold text-[13px]">
                    Advance Type
                  </p>
                  <div>
                    <input
                      type="radio"
                      className="mr-2"
                      name="AdvanceType"
                      value="Official"
                      onChange={formik.handleChange}
                      checked={formik.values.AdvanceType === "Official"}
                    />
                    <label className="text-[13px]">Official</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      className="mr-2"
                      name="AdvanceType"
                      value="Personal"
                      style={{ marginTop: "10px" }}
                      onChange={formik.handleChange}
                      checked={formik.values.AdvanceType === "Personal"}
                    />
                    <label className="text-[13px]">Personal</label>
                  </div>
                </div>
                <div>
                  <p className="capitalize font-semibold text-[13px]">
                    Advance Status
                  </p>
                  <select
                    id="AdvanceStatus"
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    value={formik.values.AdvanceStatus}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Means of Advance Repayment</option>
                    <option value="Repayment">Repayment</option>
                    <option value="Partial Repayment">Partial Repayment</option>
                    <option value="Salary Deduction">Salary Deduction</option>
                  </select>
                </div>
                <div>
                  <p className="capitalize font-semibold text-[13px]">Project</p>
                  <select
                    id="ProjectId"
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    value={formik.values.ProjectId}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Project</option>
                    <option value="1">Project 1</option>
                    <option value="2">Project 2</option>
                    <option value="3">Project 3</option>
                  </select>
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">Amount</p>
                  <input
                    id="Amount"
                    type="number"
                    value={formik.values.Amount}
                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">
                    Installment
                  </p>
                  <input
                    id="Installment"
                    type="number"
                    value={formik.values.Installment}
                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <label className="text-[13px] font-semibold">
                    Supervisor/Manager
                  </label>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="MEmployeeName"
                        name="MEmployeeName"
                        value={formik.values.MEmployeeName}
                        onChange={(e) => {
                          formik.handleChange(e);
                          handleInputChange(e);
                        }}
                        onFocus={() => setSearchTerm("")}
                        className="w-full px-4 py-2 font-normal bg-white focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                        placeholder='Search for Managing Employee'
                      />
  
                      {searchTerm && (
                        <div
                          className="absolute z-10 bg-white w-full border border-gray-300 rounded-lg mt-1 overflow-hidden"
                          style={{ maxHeight: "150px", overflowY: "auto" }}
                        >
                          {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((entry) => (
                              <div
                                key={entry.EmployeeId}
                                onClick={() => {
                                  formik.setValues({
                                    ...formik.values,
                                    MEmployeeName: entry.EmployeeName,
                                    MEmployee: entry.EmployeeId,
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
                  <p className="capitalize font-semibold text-[13px]">
                    Advance Starting Month
                  </p>
                  <select
                    id="AMonth"
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    value={formik.values.AMonth}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Advance Starting Month</option>
                    <option value="January">January</option>
                    <option value="Febuary">Febuary</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>
                <div>
                  <p className="capitalize font-semibold text-[13px]">
                    Advance Starting Year
                  </p>
                  <select
                    id="AYear"
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    value={formik.values.AYear}
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Advance Starting Year</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">Purpose</p>
                  <input
                    id="Purpose"
                    type="text"
                    value={formik.values.Purpose}
                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <p className="capatilize font-semibold  text-[13px]">Remark</p>
                  <input
                    id="Remark"
                    type="text"
                    value={formik.values.Remark}
                    className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                    onChange={formik.handleChange}
                  />
                </div>
                {/* <div>
                  <p className="capitalize font-semibold  text-[13px]">Status</p>
                  <label className="capitalize font-semibold  text-[11px]">
                    <input
                      id="status"
                      type="checkbox"
                      checked={isStatusChecked}
                      value={formik.values.Status}
                      className={`w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border-2 rounded-lg`}
                      onChange={(event) => handleCheckboxChange('Status', setStatusChecked, event)}
                    />
                    Active
                  </label>
                </div> */}
              </div>
            </div>
            <div className="flex gap-10 justify-center">
              <button
                type="submit"
                className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
              >
                Submit
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

export default ViewAdvanceRequest