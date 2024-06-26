import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
// import { departments } from "./DepartmentMaster";
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
  const [DepartmentGroup, setDepartmentGroup] = useState([])


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
      DepartmentSubHeadId: "",
      DepartmentStdStaffStrength: "",
      DepartmentStdWorkerStrength: "",
      Remark: "",
      Status: "",
      AcFlag: "Y",
      IUFlag: "U",
      CreatedBy: "",
      CreatedOn: "",
      ModifiedBy: "",
      ModifiedOn: "",
    },
    onSubmit: (values) => {
      console.log(values);

      axios
        .post(
          `http://localhost:5500/departmentmaster/FnAddUpdateDeleteRecord`,
          values,
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
    const fetchDepartmentGroup = async () =>{
      const DGID = 5
      try {
        const response = await axios.get('http://localhost:5500/two-field/FnShowCategoricalData',
        {
          params: { MasterNameId: DGID },
          headers: { Authorization: `Bearer ${token}` },
        }) 
        const data = response.data
        setDepartmentGroup(data)
      } catch (error) {
        console.error('Error', error);
      }
    }
    fetchDepartmentGroup()
  },[token])

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
      formik.setValues({
        DepartmentId: data[0].DepartmentId,
        ParentDeptId: data[0].ParentDeptId,
        DepartmentType: data[0].DepartmentType,
        DepartmentName: data[0].DepartmentName,
        DepartmentGroupId: data[0].DepartmentGroupId,
        BranchName: data[0].BranchName,
        CostCenterId: data[0].CostCenterId,
        DepartmentHeadId: data[0].DepartmentHeadId,
        DepartmentSubHeadId: data[0].DepartmentSubHeadId,
        DepartmentStdStaffStrength: data[0].DepartmentStdStaffStrength,
        DepartmentStdWorkerStrength: data[0].DepartmentStdWorkerStrength,
        Remark: data[0].Remark,
        AcFlag: data[0].AcFlag,
        CreatedBy: data[0].CreatedBy,
        CreatedOn: data[0].CreatedOn,
        ModifiedBy: data[0].ModifiedBy,
        ModifiedOn: data[0].ModifiedOn,
      });
    } catch (error) {
      console.log("Error while fetching department data: ", error.message);
    }
  };

  console.log("ID:", ID);
  console.log("Details array", details);

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
                  placeholder="Enter Department ID"
                  value={formik.values.DepartmentId}
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
                >
                  <option value="">Select Department Group</option>
                  {DepartmentGroup.map((entry) => (
                    <option key={entry.FieldId} value={entry.FieldId}>
                      {entry.FieldDetails}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[13px] font-semibold">
                  Department Head
                </label>
                <select
                  id="DepartmentHeadId"
                  value={formik.values.DepartmentHeadId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Department Head</option>
                  {Employees.map((entry) => (
                    <option
                      key={entry.EmployeeId}
                      value={entry.EmployeeId}
                    >
                      {entry.EmployeeName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[13px] font-semibold">
                  Department Sub-Head
                </label>
                <select
                  id="DepartmentSubHeadId"
                  value={formik.values.DepartmentSubHeadId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Department Head</option>
                  {Employees.map((entry) => (
                    <option
                      key={entry.EmployeeId}
                      value={entry.EmployeeId}
                    >
                      {entry.EmployeeName}
                    </option>
                  ))}
                </select>
              </div>
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

export default VEDept;
