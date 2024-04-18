import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { departments } from "./DepartmentMaster";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";
import TwoFieldsModal from "./TwoFieldsModal";
// import { costCenters } from "./CostCenterMaster";
import BranchModal from "./AddBranch";

const DepartmentModal = ({ visible, onClick }) => {
  const { token } = useAuth();
  const [CostCenters, setCostCenters] = useState([]);
  const [Departments, setDepartments] = useState([]);
  const [Employees, setEmployees] = useState([]);
  const [DepartmentGroup, setDepartmentGroup] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); //Add Modal
  const [MMId, setMMId] = useState();
  const [BranchModalOpen, setBranchModalOpen] = useState(false); //Add Modal

  const formik = useFormik({
    initialValues: {
      ParentDeptId: "",
      DepartmentType: "",
      DepartmentName: "",
      DepartmentGroupId: "",
      BranchName: "",
      CostCenterId: "",
      DepartmentHeadId: "",
      DepartmentHeadName: "",
      DepartmentSubHeadId: "",
      DepartmentSubHeadName: "",
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
      };
      addDept(updatedData);
    },
  });

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
        // window.location.reload();
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

  useEffect(() => {
    const fetchDepartmentGroup = async () => {
      const DGID = 5;
      try {
        const response = await axios.get(
          "http://localhost:5500/two-field/FnShowCategoricalData",
          {
            params: { MasterNameId: DGID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setDepartmentGroup(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchDepartmentGroup();
  }, [token, isModalOpen]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/departmentmaster/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setDepartments(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchDepartments();
  }, [token]);

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

  useEffect(() => {
    const fetchBranchMaster = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/l3r2o5v7/FnShowActiveData"
        );
        const data = response.data;
        setBranches(data);
        console.log("Branches", branches);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchBranchMaster();
  }, [token]);

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
                  Branch Name
                </p>
                <div className="flex items-center">
                  {branches.length > 0 ? (
                    <select
                      type="dropdown"
                      id="branch"
                      required
                      onChange={formik.values.BranchId}
                      className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400 text-[13px]"
                    >
                      <option value="">Select a branch</option>
                      {branches.map((company) => (
                        <option key={company.BranchId} value={company.BranchId}>
                          {company.BranchName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="flex-1 px-4 py-2 font-normal text-gray-500">
                      No available entries
                    </p>
                  )}
                  <Icon
                    icon="flat-color-icons:plus"
                    width="24"
                    height="24"
                    className="ml-1 cursor-pointer"
                    onClick={() => {
                      setBranchModalOpen(true);
                    }}
                  />
                </div>
              </div>
              <BranchModal
                visible={BranchModalOpen}
                onClick={() => setBranchModalOpen(false)}
              />

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
                    <option key={entry.DepartmentId} value={entry.DepartmentId}>
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
              <div className="flex flex-col">
                <p className="capatilize font-semibold text-[13px] mb-1">
                  Department Group
                </p>
                <div className="flex items-center">
                  {DepartmentGroup.length > 0 ? (
                    <select
                      id="DepartmentGroupId"
                      name="DepartmentGroupId"
                      value={formik.values.DepartmentGroupId}
                      className="flex-1 px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px]"
                      onChange={formik.handleChange}
                    >
                      <option value="">Select Department Group</option>
                      {DepartmentGroup.map((entry) => (
                        <option key={entry.FieldId} value={entry.FieldId}>
                          {entry.FieldDetails}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="flex-1 px-4 py-2 font-normal text-gray-500">
                      No available entries
                    </p>
                  )}
                  <Icon
                    icon="flat-color-icons:plus"
                    width="24"
                    height="24"
                    className="ml-1 cursor-pointer"
                    onClick={() => {
                      setModalOpen(true);
                      setMMId(5);
                    }}
                  />
                </div>
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
                    <option key={entry.EmployeeId} value={entry.EmployeeId}>
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
                    <option key={entry.EmployeeId} value={entry.EmployeeId}>
                      {entry.EmployeeName}
                    </option>
                  ))}
                </select>
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
                    <option key={entry.CostCenterId} value={entry.CostCenterId}>
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
              onClick={formik.handleSubmit}
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
        <TwoFieldsModal
              visible={isModalOpen}
              onClick={() => setModalOpen(false)}
              MasterID={MMId}
            />
      </div>
    </form>
  );
};

export default DepartmentModal;
