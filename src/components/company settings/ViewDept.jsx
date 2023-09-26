import { useFormik } from "formik";
import React from "react";
import { useState, useEffect } from "react";
// import { departments } from "./DepartmentMaster";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useAuth } from "../Login";

const VEDept = ({ visible, onClick, edit, ID }) => {
  const {token} = useAuth()
  const [StatusCheck, setStatusCheck] = useState(true);
  const [details, setDetails] = useState([]);
  const [parentDept, setParentDept] = useState(details?.parentDept)

  const formik = useFormik({
    initialValues: {
      deptName: "",
      companyBranchName: "",
      parentDept: "",
      deptType: "",
      deptGroup: "",
      deptHead: "",
      deptSubHead: "",
      costCenter: "",
      standardStaffStrength: "",
      standardWorkerStrength: "",
      remark: "",
      status: "",
    },
    onSubmit: (values) => {
      console.log(values);
      updateDept()
    },
  });

  const updateDept = async () =>{
    try{
      const response = axios.patch(`http://localhost:5500/departmentmaster/update-dept/${ID}`, formik.values, 
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Patch successful')
      alert('Data Updated')
    } catch(error){
      console.log('Error in patch', error)
    }
  }

  
  useEffect(() => {
    fetchDept()
  }, [ID]);

    const fetchDept = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/departmentmaster/get/${ID}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        // console.log("Response Object", response);
        const data = response.data;
        // console.log(data);
        setDetails(data);
      } catch (error) {
        console.log("Error while fetching department data: ", error.message);
      }
    }

console.log('Details array', details)

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
                  id="deptID"
                  type="number"
                  placeholder="Enter Department ID"
                  value={details?.id}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Department Name
                </p>
                <input
                  id="deptName"
                  type="text"
                  placeholder="Enter Department Name"
                  value={details?.deptName}
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
                  id="companyBranchName"
                  value={details?.companyBranchName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Company Branch</option>
                  <option value={`${details?.companyBranchName}`}>{details?.companyBranchName}</option>
                  <option value="Main Office">Main Office</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Parent Department Name
                </p>
                <select
                  id="parentDept"
                  value={details?.parentDept}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Parent Department Branch</option>
                  <option value={`${details?.parentDept}`}>{details?.parentDept}</option>
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
                  <option value="Human Resource Department">
                    Human Resource Department
                  </option>
                  <option value="Finance Department">Finance Department</option>
                </select>
              </div>
              <div>
              <p className="capitalize font-semibold text-[13px]">Department Type</p>
              <div className="flex items-center gap-4 mt-1 text-[11px]">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deptType" // Make sure to use the same 'name' for both radio buttons
                    value="Main"
                    checked={details?.deptType === "Main"}
                    onChange={(e) => formik.setFieldValue('deptType', e.target.value)}
                    className="mr-2 h-5 w-5"
                    disabled={!edit}
                  />
                  Main
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="deptType" // Make sure to use the same 'name' for both radio buttons
                    value="Sub"
                    checked={details?.deptType === "Sub"}
                    onChange={(e) => formik.setFieldValue('deptType', e.target.value)}
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
                  id="deptGroup"
                  value={details?.deptGroup}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Department Group</option>
                  <option value={`${details?.deptGroup}`}>{details?.deptGroup}</option>
                  <option value="HR">Human Resources</option>
                  <option value="IT">IT</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Department Head
                </p>
                <select
                  id="deptHead"
                  value={details?.deptHead}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Department Head</option>
                  <option value={`${details?.deptHead}`}>{details?.deptHead}</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Alice Johnson">Alice Johnson</option>
                  <option value="Michael Clark">Michael Clark</option>
                  <option value="Alex Turner">Alex Turner</option>
                  <option value="William Brown">William Brown</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Department Sub Head
                </p>
                <select
                  id="deptSubHead"
                  value={details?.deptSubHead}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Department Sub Head</option>
                  <option value={`${details?.deptSubHead}`}>{details?.deptSubHead}</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Bob Brown">Bob Brown</option>
                  <option value="Emily White">Emily White</option>
                  <option value="Olivia Green">Olivia Green</option>
                  <option value="Sophia Martinez">Sophia Martinez</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Select Cost Center
                </p>
                <select
                  id="costCenter"
                  value={details?.costCenter}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                >
                  <option value="">Select Cost Center</option>
                  <option value={`${details?.costCenter}`}>{details?.costCenter}</option>
                  <option value="Floor 1">Floor 1</option>
                  <option value="Floor 2">Floor 2</option>
                  <option value="Floor 3">Floor 3</option>
                  <option value="Floor 4">Floor 4</option>
                  <option value="Floor 5">Floor 5</option>
                  <option value="Floor 6">Floor 6</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Standard Staff Strength
                </p>
                <input
                  id="standardStaffStrength"
                  type="text"
                  placeholder="Enter Standard Staff Strength"
                  value={details?.standardStaffStrength}
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
                  id="standardWorkerStrength"
                  type="text"
                  placeholder="Enter Standard worker Strength"
                  value={details?.standardWorkerStrength}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Remarks</p>
                <input
                  id="remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={details?.remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                  disabled={!edit}
                />
              </div>
              <div>
                <p className="capitalize font-semibold text-[13px]">Status</p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={StatusCheck}
                    value={details?.status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={formik.handleChange}
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

export default VEDept;
