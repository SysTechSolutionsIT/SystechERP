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
      EmployeeId: "",
      DOJ: "",
      DOL: "",
      ContractorId: "",
      DeptGroupId: "",
      DeptId: "",
      SubDeptId: "",
      DesgId: "",
      ReportingTo: "",
      WeeklyOff: "",
      ShiftId: "",
      BandId: "",
      ZoneId: "",
      GradeId: "",
      CostCenterId: "",
      BondApplicable: null,
      BondAttachment: "",
      CurrentJob: "",
      Remark: "",
      AcFlag: 'Y',
      IUFlag: "U",
      CreatedBy: "",
      CreatedOn: "",
      ModifiedBy: "",
      ModifiedOn: "",
    },
    onSubmit: (values) => {
      const updatedData = {
        EmployeeId: values.EmployeeId,
        DOJ: values.DOJ,
        DOL: values.DOL,
        ContractorId: values.ContractorId,
        ContractorStartDate: values.ContractorStartDate,
        ContractorEndDate: values.ContractorEndDate,
        DeptGroupId: values.DeptGroupId,
        DeptId: values.DeptId,
        SubDeptId: values.SubDeptId,
        DesgId: values.DesgId,
        ReportingTo: values.ReportingTo,
        WeeklyOff: values.WeeklyOff,
        ShiftId: values.ShiftId,
        BandId: values.BandId,
        ZoneId: values.ZoneId,
        GradeId: values.GradeId,
        CostCenterId: values.CostCenterId,
        BondApplicable: values.BondApplicable,
        BondAttachment: values.BondAttachment,
        CurrentJob: values.CurrentJob,
        Remark: values.Remark,
        CreatedBy: values.CreatedBy,
        CreatedOn: values.CreatedOn,
        ModifiedBy: values.ModifiedBy,
        ModifiedOn: values.ModifiedOn,
        IUFlag: 'U',
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
          params: { EmployeeId: ID },
          headers: { Authorization: `Bearer ${token}` }, // Moved headers here
        }
      );
      if (response.data) {
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
        // Add a check for ID before making the API call
        if (ID) {
          const response = await axios.get(
            `http://localhost:5500/employee/work/FnShowParticularData`,
            {
              params: { EmployeeId: ID },
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = response.data;
          console.log('Work details data', response);
          setDetails(data)
        }
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchWorkDetails();
  }, [ID, token]);

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
        EmployeeId: details.EmployeeId,
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
              id="CostCenterId"
              value={formik.values.CostCenterId}
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
              id="DeptGroupId"
              value={formik.values.DeptGroupId}
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
              id="DeptId"
              value={formik.values.DeptId}
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
              id="SubDeptId"
              value={formik.values.SubDeptId}
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
              id="DesgId"
              value={formik.values.DesgId}
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
              id="ShiftId"
              value={formik.values.ShiftId}
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
              id="BandId"
              value={formik.values.BandId}
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
              id="ZoneId"
              value={formik.values.ZoneId}
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
              id="GradeId"
              value={formik.values.GradeId}
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
              id="ContractorId"
              value={formik.values.ContractorId}
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
