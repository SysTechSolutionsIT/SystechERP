import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const VEDept = ({ visible, onClick, edit, ID }) => {
  const { token } = useAuth();
  const [StatusCheck, setStatusCheck] = useState(true);
  const [details, setDetails] = useState([]);
  const [CostCenters, setCostCenters] = useState([]);
  const [Departments, setDepartments] = useState([])
  const [Employees, setEmployees] = useState([]);
  const [searchTermDeptHead, setSearchTermDeptHead] = useState('')
  const [searchTermDeptSubHead, setSearchTermDeptSubHead ] = useState('')


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

  const formik = useFormik({
    initialValues: {
      DepartmentId: "",
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
      IUFlag: "U",
    },
    onSubmit: (values) => {
      console.log(values);
      const updatedData = {
        DepartmentId: values.DepartmentId,
        ParentDeptId: values.ParentDeptId,
        DepartmentType: values.DepartmentType,
        DepartmentName: values.DepartmentName,
        DepartmentGroupId: values.DepartmentGroupId,
        BranchName: values.BranchName,
        CostCenterId: values.CostCenterId,
        DepartmentHeadId: values.DepartmentHeadId,
        DepartmentSubHeadId: values.DepartmentSubHeadId,
        DepartmentStdStaffStrength: values.DepartmentStdStaffStrength,
        DepartmentStdWorkerStrength: values.DepartmentStdWorkerStrength,
        Remark: values.Remark,
        IUFlag:'U'
      }
      
      axios
        .post(
          `http://localhost:5500/departmentmaster/FnAddUpdateDeleteRecord`,
          updatedData,
          {
            params: { DepartmentId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          // Handle success
          console.log("Data updated successfully", response);
          // You can also perform additional actions here, like closing the modal or updating the UI.
          window.location.reload();
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating data", error);
        });
    },
  });

  useEffect(() => {
    fetchDept();
  }, [ID]);

  const fetchDept = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/departmentmaster/FnShowParticularData`,
        {
          params: { DepartmentId: ID },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      setDetails(data);
    } catch (error) {
      console.log("Error while fetching department data: ", error.message);
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

  useEffect(() =>{
    if(details){
      formik.setValues({
        DepartmentId: details[0].DepartmentId,
        ParentDeptId: details[0].ParentDeptId,
        DepartmentType: details[0].DepartmentType,
        DepartmentName: details[0].DepartmentName,
        DepartmentGroupId: details[0].DepartmentGroupId,
        BranchName: details[0].BranchName,
        CostCenterId: details[0].CostCenterId,
        DepartmentHeadId: details[0].DepartmentHeadId,
        DepartmentSubHeadId: details[0].DepartmentSubHeadId,
        DepartmentStdStaffStrength: details[0].DepartmentStdStaffStrength,
        DepartmentStdWorkerStrength: details[0].DepartmentStdWorkerStrength,
        Remark: details[0].Remark,
      });
    }
  },[details])

  
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

  if (!visible) return null;
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="fixed overflow-y-scroll inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex items-center justify-center w-full h-full">
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
                  Department ID
                </p>
                <input
                  id="DepartmentId"
                  type="number"
                  value={formik.values?.DepartmentId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={true}
                />
              </div>
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
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Company Branch Name
                </p>
                <select
                  id="BranchName"
                  value={formik.values.BranchName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  {/* <option value={`${formik.values.BranchName}`}>
                    {formik.values.BranchName}
                  </option> */}
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
                <div className="flex items-center gap-4 mt-1 text-[11px]">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="DepartmentType" // Make sure to use the same 'name' for both radio buttons
                      value="Main"
                      checked={formik.values.DepartmentType === "Main"}
                      onChange={(e) =>
                        formik.setFieldValue("DepartmentType", e.target.value)
                      }
                      className="mr-2 h-5 w-5"
                      disabled={!edit}
                    />
                    Main
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="DepartmentType" // Make sure to use the same 'name' for both radio buttons
                      value="Sub"
                      checked={formik.values.DepartmentType === "Sub"}
                      onChange={(e) =>
                        formik.setFieldValue("DepartmentType", e.target.value)
                      }
                      className="mr-3 h-5 w-5"
                      disabled={!edit}
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
                  disabled={!edit}
                >
                  <option value="">Select Department Group</option>
                  <option value={`${formik.values.DepartmentGroupId}`}>
                    {formik.values.DepartmentGroupId}
                  </option>
                  <option value="HR">Human Resources</option>
                  <option value="IT">IT</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
              {/* <div>
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
              </div> */}
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Select Cost Center
                </p>
                <select
                  id="CostCenterId"
                  value={formik.values.CostCenterId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Cost Center</option>
                  {CostCenters.map((entry) => (
                    <option
                      key={entry.CostCenterId}
                      value={entry.CostCenterName}
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
                  disabled={!edit}
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
                  disabled={!edit}
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
                  disabled={!edit}
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

export default VEDept;
