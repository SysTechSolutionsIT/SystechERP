import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { departments } from "./DepartmentMaster";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";
// import { costCenters } from "./CostCenterMaster";

const DepartmentModal = ({ visible, onClick }) => {
  const {token} = useAuth()
  const [CostCenters, setCostCenters] = useState([])
  const formik = useFormik({
    initialValues: {
      DepartmentId: "",
        DepartmentId: "",
        ParentDeptId: "",
        DepartmentType: "",
        DepartmentName: "",
        DepartmentGroupId: "",
        CostCenterId: "",
        DepartmentHeadId: "",
        DepartmentSubHeadId: "",
        DepartmentStdStaffStrength: "",
        DepartmentStdWorkerStrength: "",
        Remark: "",
        Status:"",
        AcFlag: "Y",
        IUFlag :"I",
        CreatedBy: "",
        CreatedOn: "",
        ModifiedBy: "",
        ModifiedOn: "",
  },
    onSubmit: (values) => {
      console.log(values);
      addDept()
    },
  });

  const addDept = async () =>{
    try{
      const response = await axios.post("http://localhost:5500/departmentmaster/FnAddUpdateDeleteRecord", formik.values,
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        alert('Department added successfully')
        // Handle successful response
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        // Handle error response
      }
    }catch (error) {
      console.error('Error:', error.message);
      // Handle network error
    }
  }

  useEffect(() =>{
    const fetchCostCenters = async () =>{
      try {
        const response = await axios.get('http://localhost:5500/cost-center/', {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        const data = response.data.records
        setCostCenters(data)
        console.log(data)
      } catch (error) {
        console.error('Error fetching cost centers', error);
      }
    }
    fetchCostCenters()
  }, [token])

  const [status, setStatus] = useState(false);

  const handleStatusChange = () => {
    setStatus(!status);
  };

  
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
                <p className="capatilize font-semibold text-[13px] ">
                  Department ID
                </p>
                <input
                  id="DepartmentId"
                  type="number"
                  placeholder="Enter Department ID"
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
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px] ">
                  Company Branch Name
                </p>
                <select
                  id="CompanyBranchName"
                  value={formik.values.CompanyBranchName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Company Branch</option>
                  <option value="Main Branch">Main Branch</option>
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
                  <option value="Payroll Department">Payroll Department</option>
                  <option value="Times Keeping Department">
                    Times Keeping Department
                  </option>
                  <option value="Costing Department">Costing Department</option>
                  <option value="Accounts Department">
                    Accounts Department
                  </option>
                  <option value="Dispatch Department">
                    Dispatch Department
                  </option>
                  <option value="Packaging Department">
                    Packaging Department
                  </option>
                  <option value="Procurement Department">
                    Procurement Department
                  </option>
                  <option value="Designing Department">
                    Designing Department
                  </option>
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
                <p className="capatilize font-semibold text-[13px]">
                  Department Head
                </p>
                <input
                  id="DepartmentHeadId"
                  type="text"
                  placeholder="Enter Department Head"
                  value={formik.values.DepartmentHeadId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[11px]">
                  Department Sub Head
                </p>
                <input
                  id="DepartmentSubHeadId"
                  type="text"
                  placeholder="Enter Department Sub-Head"
                  value={formik.values.DepartmentSubHeadId}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
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
                    <option key={entry.id} value={entry.cName}>
                      {entry.cName}
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
              <div>
                <p className="capatilize font-semibold text-[13px] ">Status</p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="Status"
                    type="checkbox"
                    checked={formik.values.Status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={(event) => handleCheckboxChange('Status', setStatusChecked, event)}
                  />
                  Active
                </label>
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
