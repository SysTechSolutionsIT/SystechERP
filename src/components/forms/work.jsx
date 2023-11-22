import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Login";
import { useParams } from "react-router-dom";
// import { useEmployeeData } from "../employee settings/EmployeeMaster";
const Work = ({ ID, name }) => {
  const [statusCheck, setStatusCheck] = useState(false);
  const [details, setDetails] = useState();
  const [workDetails, setWorkDetails] = useState();
  const [bondApplicableCheck, setBondApplicableCheck] = useState(false);
  const { token } = useAuth();
  console.log("in work profile:", ID, name);

  const formik = useFormik({
    initialValues: {
      DOJ: "",
      DOL: "",
      Contractor: "",
      ContractorStartDate: "",
      ContractorEndDate: "",
      DeptGroup: "",
      Dept: "",
      SubDept: "",
      Desg: "",
      ReportingTo: "",
      WeeklyOff: "",
      Shift: "",
      Band: "",
      Zone: "",
      Grade: "",
      CostCenter: "",
      BondApplicable: "",
      BondAttachment: "",
      CurrentJob: "",
      Remark: "",
      AcFlag: "",
      IUFlag: "I",
      CreatedBy: "",
      CreatedOn: "",
      ModifiedBy: "",
      ModifiedOn: "",
    },
    onSubmit: (values) => {
      const updatedData = {
        DOJ: values.DOJ,
        DOL: values.DOL,
        Contractor: values.Contractor,
        ContractorStartDate: values.ContractorStartDate,
        ContractorEndDate: values.ContractorEndDate,
        DeptGroup: values.DeptGroup,
        Dept: values.Dept,
        SubDept: values.SubDept,
        Desg: values.Desg,
        ReportingTo: values.ReportingTo,
        WeeklyOff: values.WeeklyOff,
        Shift: values.Shift,
        Band: values.Band,
        Zone: values.Zone,
        Grade: values.Grade,
        CostCenter: values.CostCenter,
        BondApplicable: values.BondApplicable,
        BondAttachment: values.BondAttachment,
        CurrentJob: values.CurrentJob,
        Remark: values.Remark,
        IUFlag: "I",
        CreatedBy: values.CreatedBy,
        CreatedOn: values.CreatedOn,
        ModifiedBy: values.ModifiedBy,
        ModifiedOn: values.ModifiedOn,
      };
      console.log(values);
      updateEmpWork(updatedData);
    },
  });

  const updateEmpWork = async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5500/employee/work/FnAddUpdateDeleteRecord`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` }, // Moved headers here
        }
      );
      if (response.data && response.data.success) {
        alert("Employee details updated successfully");
      } else {
        console.error(
          "Failed to update employee details. Response:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const fetchWorkDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/employee/work/FnShowPerticularData`,
          {
            params: { EmployeeId: ID },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        console.log(response);
        // Check if the data is empty, and set to a blank array if so
        const workdetails = data.length > 0 ? data : [];
        setWorkDetails(workdetails);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchWorkDetails();
  }, [ID]); // Include token in the dependency array if it is a dynamic value

  const handleCheckboxChange = (fieldName, setChecked, event) => {
    const checked = event.target.checked;
    setChecked(checked);
    formik.setValues({
      ...formik.values,
      [fieldName]: checked.toString(),
    });
  };

  useEffect(() => {
    if (details) {
      formik.setValues({
        DOJ: details.DOJ,
        DOL: details.DOL,
        Contractor: details.Contractor,
        ContractorStartDate: details.ContractorStartDate,
        ContractorEndDate: details.ContractorEndDate,
        DeptGroup: details.DeptGroup,
        Dept: details.Dept,
        SubDept: details.SubDept,
        Desg: details.Desg,
        ReportingTo: details.ReportingTo,
        WeeklyOff: details.WeeklyOff,
        Shift: details.Shift,
        Band: details.Band,
        Zone: details.Zone,
        Grade: details.Grade,
        CostCenter: details.CostCenter,
        BondApplicable: details.BondApplicable,
        BondAttachment: details.BondAttachment,
        CurrentJob: details.CurrentJob,
        Remark: details.Remark,
        CreatedBy: details.CreatedBy,
        CreatedOn: details.CreatedOn,
        ModifiedBy: details.ModifiedBy,
        ModifiedOn: details.ModifiedOn,
      });
    }
  }, [details]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-4 bg-white font-[Inter]">
        <div className="grid grid-cols-3 gap-x-4">
          <div className="py-1">
            <p className="mb-1 capitalize font-semibold text-[13px]">
              Employee ID
            </p>
            <input
              id="EmployeeId"
              type="number"
              value={ID}
              className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
              onChange={formik.handleChange}
              readOnly={true}
            />
          </div>
          <div className="py-1">
            <p className="mb-1 capitalize font-semibold text-[13px]">
              Employee Name
            </p>
            <input
              id="EmployeeName"
              type="text"
              value={name}
              className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
              onChange={formik.handleChange}
              readOnly={true}
            />
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">DOJ</p>
            <input
              id="DOJ"
              type="date"
              value={formik.values.DOJ}
              className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
              onChange={formik.handleChange}
            />
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Contract Start Date
            </p>
            <input
              id="ContractorStartDate"
              type="date"
              value={formik.values.ContractorStartDate}
              className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
              onChange={formik.handleChange}
            />
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Weekly Off
            </p>
            <select
              id="WeeklyOff"
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
              value={formik.values.WeeklyOff}
              onChange={formik.handleChange}
            >
              <option value="">Select Weekly Off</option>
              <option value="Sunday">Sunday</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Cost Center
            </p>
            <select
              id="CostCenter"
              value={formik.values.CostCenter}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value="">Select Cost Center</option>
              <option value="Cost Center 1">Cost Center 1</option>
              <option value="Cost Center 2">Cost Center 2</option>
              <option value="Cost Center 3">Cost Center 3</option>
              <option value="Cost Center 4">Cost Center 4</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Department Group
            </p>
            <select
              id="DeptGroup"
              value={formik.values.DeptGroup}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value="">Select Department Group</option>
              <option value="Example 1">Example 1</option>
              <option value="Example 2">Example 2</option>
              <option value="Example 3">Example 3</option>
              <option value="Example 4">Example 4</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Department
            </p>
            <select
              id="Dept"
              value={formik.values.Dept}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value="">Select Department</option>
              <option value="Example 1">Example 1</option>
              <option value="Example 2">Example 2</option>
              <option value="Example 3">Example 3</option>
              <option value="Example 4">Example 4</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Sub-Department
            </p>
            <select
              id="SubDept"
              value={formik.values.SubDept}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value="">Select Sub Department</option>
              <option value="Example 1">Example 1</option>
              <option value="Example 2">Example 2</option>
              <option value="Example 3">Example 3</option>
              <option value="Example 4">Example 4</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Designation
            </p>
            <select
              id="Desg"
              value={formik.values.Desg}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value="">Select Designation</option>
              <option value="Example 1">Example 1</option>
              <option value="Example 2">Example 2</option>
              <option value="Example 3">Example 3</option>
              <option value="Example 4">Example 4</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Reporting To
            </p>
            <select
              id="ReportingTo"
              value={formik.values.ReportingTo}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value="">Select Reporting To</option>
              <option value="Example 1">Example 1</option>
              <option value="Example 2">Example 2</option>
              <option value="Example 3">Example 3</option>
              <option value="Example 4">Example 4</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">Shift</p>
            <select
              id="Shift"
              value={formik.values.Shift}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value="">Select Shift</option>
              <option value="Example 1">Example 1</option>
              <option value="Example 2">Example 2</option>
              <option value="Example 3">Example 3</option>
              <option value="Example 4">Example 4</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">Band</p>
            <select
              id="Band"
              value={formik.values.Band}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value="">Select Band</option>
              <option value="Example 1">Example 1</option>
              <option value="Example 2">Example 2</option>
              <option value="Example 3">Example 3</option>
              <option value="Example 4">Example 4</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">Zone</p>
            <select
              id="Zone"
              value={formik.values.Zone}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value="">Select Zone</option>
              <option value="Example 1">Example 1</option>
              <option value="Example 2">Example 2</option>
              <option value="Example 3">Example 3</option>
              <option value="Example 4">Example 4</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">Grade</p>
            <select
              id="Grade"
              value={formik.values.Grade}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value="">Select Grade</option>
              <option value="Example 1">Example 1</option>
              <option value="Example 2">Example 2</option>
              <option value="Example 3">Example 3</option>
              <option value="Example 4">Example 4</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Contractor
            </p>
            <select
              id="Contractor"
              value={formik.values.Contractor}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value="">Select Contractor</option>
              <option value="Example 1">Example 1</option>
              <option value="Example 2">Example 2</option>
              <option value="Example 3">Example 3</option>
              <option value="Example 4">Example 4</option>
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0 capitalize font-semibold text-[13px]">DOL</p>
            <input
              id="DOL"
              type="date"
              value={formik.values.DOL}
              className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
              onChange={formik.handleChange}
            />
          </div>
          <div className="py-1">
            <p className="mb-0 capitalize font-semibold text-[13px]">
              Contract End Date
            </p>
            <input
              id="ContractorEndDate"
              type="date"
              value={formik.values.ContractorEndDate}
              className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
              onChange={formik.handleChange}
            />
          </div>
          <div className="py-1">
            <p className="capitalize font-semibold text-[13px]">
              Bond Applicable
            </p>
            <label className="capitalize font-semibold text-[13px]">
              <input
                id="BondApplicable"
                type="checkbox"
                checked={formik.values.BondApplicable}
                className={`w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg`}
                onChange={(e) =>
                  handleCheckboxChange(
                    "BondApplicable",
                    setBondApplicableCheck,
                    e
                  )
                }
              />
              Active
            </label>
          </div>
          <div className="py-1">
            <p className="capitalize font-semibold text-[13px]">Status</p>
            <label className="capitalize font-semibold text-[13px]">
              <input
                id="Status"
                type="checkbox"
                checked={formik.values.Status}
                className={`w-5 h-5 mr-2 mt-2 focus:outline-gray-300 border border-blue-900 rounded-lg`}
                onChange={(e) =>
                  handleCheckboxChange("Status", setStatusCheck, e)
                }
              />
              Active
            </label>
          </div>
          <div className="py-1">
            <p className="mb-1 capitalize font-semibold text-[13px]">Remark</p>
            <input
              id="Remark"
              type="text"
              value={formik.values.Remark}
              className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
              onChange={formik.handleChange}
            />
          </div>
        </div>

        <div className="flex mt-5 justify-center gap-4">
          <button
            type="submit"
            className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
          >
            Save Details
          </button>
        </div>
      </div>
    </form>
  );
};

export default Work;
