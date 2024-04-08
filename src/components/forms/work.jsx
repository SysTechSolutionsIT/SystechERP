import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Login";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import AddWeek  from '../attendance settings/AddWeek'
import CostCenterModal from '../company settings/CostCenterModal'
import TwoFieldsModal from "../company settings/TwoFieldsModal";
import DepartmentModal from '../company settings/DepartmentModal'
import DesignationModal from '../employee settings/DesignationModal'
import AddShift from '../attendance settings/AddShift'
// import { useEmployeeData } from "../employee settings/EmployeeMaster";
const Work = ({ ID, name }) => {
  const [statusCheck, setStatusCheck] = useState(false);
  const [details, setDetails] = useState();
  const [workDetails, setWorkDetails] = useState();
  const [bondApplicableCheck, setBondApplicableCheck] = useState(false);
  const [istwoFieldModal, settwoFieldModal] = useState(false)
  const [MMId, setMMId] = useState();

  const { token } = useAuth();
  console.log("in work profile:", ID);

  const formik = useFormik({
    initialValues: {
      EmployeeId: ID,
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
      BondApplicable: "",
      BondAttachment: "",
      CurrentJob: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "U",
      CreatedBy: "",
      CreatedOn: "",
      ModifiedBy: "",
      ModifiedOn: "",
    },
    onSubmit: (values) => {
      const updatedData = {
        EmployeeId: ID,
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
        IUFlag: "U",
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
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Work Details Updated");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const fetchWorkDetails = async () => {
      try {
        if (ID) {
          const response = await axios.get(
            `http://localhost:5500/employee/work/FnShowParticularData`,
            {
              params: { EmployeeId: ID },
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = response.data;
          console.log("Work details data", response);
          setDetails(data);
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
      [fieldName]: checked ? "Y" : "N",
    });
  };

  useEffect(() => {
    if (details) {
      formik.setValues({
        EmployeeId: details.EmployeeId,
        DOJ: details.DOJ,
        DOL: details.DOL,
        ContractorId: details.ContractorId,
        ContractorStartDate: details.ContractorStartDate,
        ContractorEndDate: details.ContractorEndDate,
        DeptGroupId: details.DeptGroupId,
        DeptId: details.DeptId,
        SubDeptId: details.SubDeptId,
        DesgId: details.DesgId,
        ReportingTo: details.ReportingTo,
        WeeklyOff: details.WeeklyOff,
        ShiftId: details.ShiftId,
        BandId: details.BandId,
        ZoneId: details.ZoneId,
        GradeId: details.GradeId,
        CostCenterId: details.CostCenterId,
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

  const [WeeklyOff, setWeeklyOff] = useState([]);
  const [isWeeklyOffModalOpen, setWeeklyOffModal] = useState(false)
  useEffect(() => {
    const fetchWeeklyOff = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/weekly-off/FnShowActiveData",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setWeeklyOff(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchWeeklyOff();
  }, [token, isWeeklyOffModalOpen]);

  const [CostCenters, setCostCenters] = useState([]);
  const [isCostCenterModalOpen, setIsCostCenterModalOpen] = useState(false)
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
        console.log('cost centers in work' ,data);
      } catch (error) {
        console.error("Error fetching cost centers", error);
      }
    };
    fetchCostCenters();
  }, [token, isCostCenterModalOpen]);

  const [DepartmentGroup, setDepartmentGroup] = useState([]);
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
  }, [token, istwoFieldModal]);

  const [Departments, setDepartments] = useState([]);
  const [isDepartmentModalOpen, setDepartmentModalOpen] = useState(false)
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

  const [Designations, setDesignations] = useState([]);
  const [isDesignationModalOpen, setDesignationModalOpen] = useState(false)
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/designation-master/FnShowActiveData",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = response.data;
        setDesignations(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchDesignations();
  }, [token, isDesignationModalOpen]);

  const [Employees, setEmployees] = useState([]);
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

  const [Shifts, setShifts] = useState([]);
  const [isShiftModalOpen, setShiftModalOpen] = useState(false)
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/shift-master/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setShifts(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchShifts();
  }, [token]);

  const [Grades, setGrades] = useState([]);
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5500/employee-grade/FnShowActiveData",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data;
        setGrades(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchGrades();
  }, [token]);

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
              type="String"
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
            <div className="flex items-center">
                {WeeklyOff.length > 0 ? (
                  <select
                    id="WeeklyOff"
                    name="WeeklyOff"
                    value={formik.values.WeeklyOff}
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Weekly Off</option>
                    {WeeklyOff.map((entry) => (
                      <option key={entry.WeeklyOffId} value={entry.WeeklyOffId}>
                        {entry.WeeklyOffName}
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
                    setWeeklyOffModal(true);
                    // setMMId(8);
                  }}
                />
              </div>
              </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Cost Center
            </p>
            <div className="flex items-center">
                {CostCenters.length > 0 ? (
                  <select
                    id="CostCenterId"
                    name="CostCenterId"
                    value={formik.values.CostCenterId}
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Cost Center</option>
                    {CostCenters.map((entry) => (
                      <option key={entry.CostCenterId} value={entry.CostCenterId}>
                        {entry.CostCenterName}
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
                    setIsCostCenterModalOpen(true);
                  }}
                />
              </div>
              </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Department Group
            </p>
            <div className="flex items-center">
                {DepartmentGroup.length > 0 ? (
                  <select
                    id="DeptGroupId"
                    name="DeptGroupId"
                    value={formik.values.DeptGroupId}
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
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
                    settwoFieldModal(true);
                    setMMId(5)
                  }}
                />
              </div>
              </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Department
            </p>
            <div className="flex items-center">
                {Departments.length > 0 ? (
                  <select
                    id="DeptId"
                    name="DeptId"
                    value={formik.values.DeptId}
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Department</option>
                    {Departments.map((entry) => (
                      entry.DepartmentType === 'Main' && (
                        <option key={entry.DepartmentId} value={entry.DepartmentId}>
                        {entry.DepartmentName}
                      </option>
                      )
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
                    setDepartmentModalOpen(true);
                  }}
                />
              </div>
              </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Sub-Department
            </p>
            <div className="flex items-center">
            {Departments.length > 0 ? (
                  <select
                    id="SubDeptId"
                    name="SubDeptId"
                    value={formik.values.SubDeptId}
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Department</option>
                    {Departments.map((entry) => (
                      entry.DepartmentType === 'Sub' && (
                        <option key={entry.DepartmentId} value={entry.DepartmentId}>
                        {entry.DepartmentName}
                      </option>
                      )
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
                    setDepartmentModalOpen(true);
                  }}
                />
              </div>
              </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">
              Designation
            </p>
            <div className="flex items-center">
            {Designations.length > 0 ? (
                  <select
                    id="DesgId"
                    name="DesgId"
                    value={formik.values.DesgId}
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Designation</option>
                    {Designations.map((entry) => (
                        <option key={entry.DesignationId} value={entry.DesignationId}>
                        {entry.DesignationName}
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
                    setDesignationModalOpen(true);
                  }}
                />
              </div>
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
              {Employees.map((entry) => (
                <option key={entry.EmployeeId} value={entry.EmployeeId}>
                  {entry.EmployeeName}
                </option>
              ))}
            </select>
          </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">Shift</p>
            <div className="flex items-center">
            {Shifts.length > 0 ? (
                  <select
                    id="ShiftId"
                    name="ShiftId"
                    value={formik.values.ShiftId}
                    className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                    onChange={formik.handleChange}
                  >
                    <option value="">Select Shift</option>
                    {Shifts.map((entry) => (
                        <option key={entry.ShiftId} value={entry.ShiftId}>
                        {entry.ShiftName}
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
                    setShiftModalOpen(true);
                  }}
                />
              </div>
              </div>
          <div className="py-1">
            <p className="mb-0.5 capitalize font-semibold text-[13px]">Band</p>
            <select
              id="BandId"
              value={formik.values.BandId}
              className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              onChange={formik.handleChange}
            >
              <option value={formik.values.BandId}>
                {formik.values.BandId}
              </option>
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
              <option value={formik.values.ZoneId}>
                {formik.values.ZoneId}
              </option>
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
              {Grades.map((entry) => (
                <option
                  key={entry.EmployeeGradeId}
                  value={entry.EmployeeGradeId}
                >
                  {entry.EmployeeGradeName}
                </option>
              ))}
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
              <option value={formik.values.ContractorId}>
                {formik.values.ContractorId}
              </option>
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
        <AddWeek visible={isWeeklyOffModalOpen} onClick={() => setWeeklyOffModal(false)}/>
        <CostCenterModal visible={isCostCenterModalOpen} onClick={() => setIsCostCenterModalOpen(false)}/>
        <DepartmentModal visible={isDepartmentModalOpen} onClick={() =>setDepartmentModalOpen(false)}/>
        <DesignationModal visible={isDesignationModalOpen} onClick={() => setDesignationModalOpen(false)}/>
        <AddShift visible={isShiftModalOpen} onClick={() => setShiftModalOpen(false)} />
        <TwoFieldsModal
              visible={istwoFieldModal}
              onClick={() => settwoFieldModal(false)}
              MasterID={MMId}
            />
        <div className="flex mt-5 justify-center gap-4">
          <button
            type="button"
            onClick={formik.handleSubmit}
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
