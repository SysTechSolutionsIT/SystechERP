import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { departments } from "./DepartmentMaster";
import { Icon } from "@iconify/react";

const DepartmentModal = ({ visible, onClick }) => {
  const formik = useFormik({
    initialValues: {
      deptID: "",
      deptName: "",
      companyBranchName: "",
      parentDept: "" | "NA",
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
      departments.push(values);
      alert("Added Successfully");
    },
  });

  const [status, setStatus] = useState(false);

  const handleStatusChange = () => {
    setStatus(!status);
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
                  id="deptID"
                  type="number"
                  placeholder="Enter Department ID"
                  value={formik.values.deptID}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
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
                  value={formik.values.deptName}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px] ">
                  Company Branch Name
                </p>
                <select
                  id="companyBranchName"
                  value={formik.values.companyBranchName}
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
                  id="parentDept"
                  value={formik.values.parentDept}
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
                      id="deptType"
                      value="Main"
                      checked={formik.values.deptType === "Main"}
                      onChange={formik.handleChange}
                      className="mr-2 h-5 w-5"
                    />
                    Main
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      id="deptType"
                      value="Sub"
                      checked={formik.values.deptType === "Sub"}
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
                  id="deptGroup"
                  value={formik.values.deptGroup}
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
                <select
                  id="deptHead"
                  value={formik.values.deptHead}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Department Head</option>
                  <option value="Head 1">Head 1</option>
                  <option value="Head 2">Head 2</option>
                  <option value="Head 3">Head 3</option>
                  <option value="Head 4">Head 4</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[11px] text-[11px]">
                  Department Sub Head
                </p>
                <select
                  id="deptSubHead"
                  value={formik.values.deptSubHead}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Department Sub Head</option>
                  <option value="Sub Head 1">Sub Head 1</option>
                  <option value="Sub Head 2">Sub Head 2</option>
                  <option value="Sub Head 3">Sub Head 3</option>
                  <option value="Sub Head 4">Sub Head 4</option>
                </select>
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">
                  Select Cost Center
                </p>
                <select
                  id="costCenter"
                  value={formik.values.costCenter}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Cost Center</option>
                  <option value="Cost Center 1">Cost Center 1</option>
                  <option value="Cost Center 2">Cost Center 2</option>
                  <option value="Cost Center 3">Cost Center 3</option>
                  <option value="Cost Center 4">Cost Center 4</option>
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
                  value={formik.values.standardStaffStrength}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
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
                  value={formik.values.standardWorkerStrength}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px]">Remarks</p>
                <input
                  id="remark"
                  type="text"
                  placeholder="Enter Remarks"
                  value={formik.values.remark}
                  className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border-gray-300 border rounded-lg text-[11px] `}
                  onChange={formik.handleChange}
                />
              </div>
              <div>
                <p className="capatilize font-semibold text-[13px] ">Status</p>
                <label className="capitalize font-semibold text-[11px]">
                  <input
                    id="status"
                    type="checkbox"
                    checked={status}
                    value={formik.values.status}
                    className={`w-5 h-5 mr-2 mt-5 focus:outline-gray-300 border-2 rounded-lg`}
                    onChange={handleStatusChange}
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
