import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { departments } from "./DepartmentMaster";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";
// import { costCenters } from "./CostCenterMaster";

const DepartmentModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [CostCenters, setCostCenters] = useState([]);
  const [Departments, setDepartments] = useState([])
  const [Employees, setEmployees] = useState([]);
  const [searchTermDeptHead, setSearchTermDeptHead] = useState('')
  const [searchTermDeptSubHead, setSearchTermDeptSubHead ] = useState('')

  const formik = useFormik({
    initialValues: {
      ParentDeptId: "",
      DepartmentType: "",
      DepartmentName: "",
      DepartmentGroupId: "",
      BranchName: "",
      CostCenterId: "",
      DepartmentHeadId: "",
      DepartmentHeadName:"",
      DepartmentSubHeadId: "",
      DepartmentSubHeadName:"",
      DepartmentStdStaffStrength: "",
      DepartmentStdWorkerStrength: "",
      Remark: "",
      IUFlag: "I",
    },
    onSubmit: (values) => {
      console.log(values);
      const updatedData = {
        ParentDeptId: values.ParentDeptId,
        DepartmentType: values.DepartmentType,
        DepartmentName: values.DepartmentName,
        DepartmentGroupId: values.DepartmentGroupId,
        BranchName: values.BranchName,
        CostCenterId: values.CostCenterId,
        DepartmentHeadId: values.DepartmentHeadId,
        DepartmentHeadName: values.DepartmentHeadName,
        DepartmentSubHeadId: values.DepartmentSubHeadId,
        DepartmentSubHeadName: values.DepartmentSubHeadName,
        DepartmentStdStaffStrength: values.DepartmentStdStaffStrength,
        DepartmentStdWorkerStrength: values.DepartmentStdWorkerStrength,
        Remark: values.Remark,
        IUFlag: "I",
      }
      addDept(updatedData)
    },
  });

  const handleInputChangeHead = (event) => {
    const { value } = event.target;
    setSearchTermDeptHead(value);
  };

  const handleInputChangeSubHead = (event) => {
    const { value } = event.target;
    setSearchTermDeptSubHead(value);
  };

  const filteredEmployeesHead = Employees.filter((employee) =>
    employee.EmployeeName.toLowerCase().includes(searchTermDeptHead.toLowerCase())
  );

  const filteredEmployeesSubHead = Employees.filter((employee) =>
    employee.EmployeeName.toLowerCase().includes(searchTermDeptSubHead.toLowerCase())
  );

  const addDept = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5500/departmentmaster/FnAddUpdateDeleteRecord",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        alert("Department added successfully");
        onClick();
        window.location.reload();
        // Handle successful response
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        // Handle error response
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle network error
    }
  };

  useEffect(() =>{
    const fetchDepartments = async () =>{
      try {
        const response = await axios.get('http://localhost:5500/departmentmaster/FnShowActiveData',
        { headers: {Authorization: `Bearer ${token}`}}
      )
      const data = response.data
      setDepartments(data)
      } catch (error) {
        console.error('Error', error);
      }
    }
    fetchDepartments()
  },[token])

  useEffect(() => {
    const fetchCostCenters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/cost-center/FnShowActiveData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setCostCenters(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching cost centers", error);
      }
    };
    fetchCostCenters();
  }, [token]);

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

  const [status, setStatus] = useState(false);

  const handleStatusChange = () => {
    setStatus(!status);
  };

  const [isStatusChecked, setStatusChecked] = useState(false);
  const handleCheckboxChange = (fieldName, setChecked, event) => {
    //This is how to use it (event) => handleCheckboxChange('Status', setStatusChecked, event)
    const checked = event.target.checked;
    setChecked(checked);
    formik.setValues({
      ...formik.values,
      [fieldName]: checked.toString(),
    });
  };

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center w-full h-full">
        <div className="bg-gray-200 w-[60%] p-8 rounded-lg">
          <div className="bg-blue-900 py-2 px-4 rounded-lg flex justify-between items-center">
            <p className="text-white text-[13px] font-semibold text-center">
              Department Master
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
                <p className="capatilize font-semibold text-[13px]">
                  Department Name
                </p>
                <input
                  id="DepartmentName"
                  type="text"
                  placeholder="Enter Department Name"
                  value={formik.values.DepartmentName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px] ">
                  Company Branch Name
                </p>
                <select
                  id="BranchName"
                  value={formik.values.BranchName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Company Branch</option>
                  <option value="00001">Main</option>
                  <option value="00002">Sub</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Parent Department Name
                </p>
                <select
                  id="ParentDeptId"
                  value={formik.values.ParentDeptId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Parent Department Branch</option>
                  {Departments.map((entry) => (
                    <option 
                    key={entry.DepartmentId}
                    value={entry.DepartmentId}>
                      {entry.DepartmentName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">
                  Department Type
                </p>
                <div className=" flex items-center gap-4 mt-1 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="DepartmentType"
                      value="Main"
                      checked={formik.values.DepartmentType === "Main"}
                      onChange={formik.handleChange}
                      className="mr-2 h-5 w-5"
                    />
                    Main
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="DepartmentType"
                      value="Sub"
                      checked={formik.values.DepartmentType === "Sub"}
                      onChange={formik.handleChange}
                      className="mr-3 h-5 w-5"
                    />
                    Sub
                  </label>
                </div>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Department Group
                </p>
                <select
                  id="DepartmentGroupId"
                  value={formik.values.DepartmentGroupId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Department Group</option>
                  <option value="Services">Services</option>
                  <option value="Support">Support</option>
                  <option value="Production">Production</option>
                  <option value="Administration">Administration</option>
                  <option value="NA">NA</option>
                </select>
              </div>
              <div>
                <label className="text-[13px] font-semibold">
                  Department Head
                </label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="DepartmentHeadName"
                      name="DepartmentHeadName"
                      value={formik.values.DepartmentHeadName}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleInputChangeHead(e);
                      }}
                      onFocus={() => setSearchTermDeptHead("")}
                      className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                      placeholder={
                        formik.values.EmployeeId
                          ? formik.values.EmployeeName
                          : "Search Employee Name"
                      }
                    />

                    {searchTermDeptHead && (
                      <div
                        className="absolute z-10 bg-white w-full border border-gray-300 rounded-lg mt-1 overflow-hidden"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                      >
                        {filteredEmployeesHead.length > 0 ? (
                          filteredEmployeesHead.map((entry) => (
                            <div
                              key={entry.EmployeeId}
                              onClick={() => {
                                formik.setValues({
                                  ...formik.values,
                                  DepartmentHeadId : entry.EmployeeId,
                                  DepartmentHeadName: entry.EmployeeName
                                });
                                setSearchTermDeptHead("");
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
                <label className="text-[13px] font-semibold">
                  Department Sub-Head
                </label>
                <div className="flex items-center">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="DepartmentSubHeadName"
                      name="DepartmentSubHeadName"
                      value={formik.values.DepartmentSubHeadName}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleInputChangeSubHead(e);
                      }}
                      onFocus={() => setSearchTermDeptSubHead("")}
                      className="w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                      placeholder={
                        formik.values.EmployeeId
                          ? formik.values.EmployeeName
                          : "Search Employee Name"
                      }
                    />

                    {searchTermDeptSubHead && (
                      <div
                        className="absolute z-10 bg-white w-full border border-gray-300 rounded-lg mt-1 overflow-hidden"
                        style={{ maxHeight: "150px", overflowY: "auto" }}
                      >
                        {filteredEmployeesSubHead.length > 0 ? (
                          filteredEmployeesSubHead.map((entry) => (
                            <div
                              key={entry.EmployeeId}
                              onClick={() => {
                                formik.setValues({
                                  ...formik.values,
                                  DepartmentSubHeadId : entry.EmployeeId,
                                  DepartmentSubHeadName: entry.EmployeeName
                                });
                                setSearchTermDeptSubHead("");
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
                  Select Cost Center
                </p>
                <select
                  id="CostCenterId"
                  value={formik.values.CostCenterId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Cost Center</option>
                  {CostCenters.map((entry) => (
                    <option
                      key={entry.CostCenterId}
                      value={entry.CostCenterId}
                    >
                      {entry.CostCenterName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Standard Staff Strength
                </p>
                <input
                  id="DepartmentStdStaffStrength"
                  type="text"
                  placeholder="Enter Standard Staff Strength"
                  value={formik.values.DepartmentStdStaffStrength}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Standard Worker Strength
                </p>
                <input
                  id="DepartmentStdWorkerStrength"
                  type="text"
                  placeholder="Enter Standard worker Strength"
                  value={formik.values.DepartmentStdWorkerStrength}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Remarks</p>
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
              type="submit"
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg w-36"
            >
              Save
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

export default DepartmentModal;
