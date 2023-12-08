import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useAuth } from "../Login";

export default function AddEmployeePersonal() {
  const { token } = useAuth();
  const [employeeTypes, setEmployeeTypes] = useState([])

  const formik = useFormik({
    initialValues: {
      EmployeeName: "",
      EmployeeTypeId: "",
      EmployeeTypeGroupId: "",
      Salutation: "",
      LastName: "",
      FirstName: "",
      MiddleName: "",
      MEmployeeName: "",
      AadharCardNo: "",
      PANNo: "",
      PassportNo: "",
      PassportIssueDate: "",
      PassportExpireDate: "",
      CurrentAddress: "",
      CurrentPincode: "",
      PermanentAddress: "",
      PermanentPincode: "",
      DOB: "",
      EmailId1: "",
      EmailId2: "",
      PhoneNo: "",
      CellNo1: "",
      CellNo2: "",
      BankId1: "",
      AccountNo1: "",
      IFSCCode1: "",
      BankId2: "",
      AccountNo2: "",
      IFSCCode2: "",
      MaritalStatus: "",
      ReferenceId: "",
      DestinationId: "",
      ReligionId: "",
      CategoryId: "",
      CasteId: "",
      EmployeePhoto: "",
      Gender: "",
      BloodGroup: "",
      DrivingLicence: "",
      FinanceAccountNo: "",
      Remark: "",
      AcFlag: "Y",
      IUFlag: "I",
      CreatedBy: "",
      CreatedOn: "",
      ModifiedBy: "",
      ModifiedOn: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      addEmpPersonal();
      addEmpWork()
      addEmpSal()
      addEmpPro()
      addEmpAcademic()
      addEmpFam()
      alert("Employee Personal Details Added Successfully. Please add further details in the edit section.");
    },
  });

  formik.values.EmployeeName = `${formik.values.FirstName} ${formik.values.LastName}`;

  const addEmpPersonal = async () => {
    try {
      const personal = await axios.post(
        "http://localhost:5500/employee/personal/FnAddUpdateDeleteRecord",
        formik.values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type
          },
        }
      );
    } catch (error) {
      console.error("Error", error);
    }
  };

  const addEmpWork = async () =>{
    try {
      const work = await axios.post(
        "http://localhost:5500/employee/work/FnAddUpdateDeleteRecord",
        {
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
          IUFlag: "I",
          CreatedBy: "",
          CreatedOn: "",
          ModifiedBy: "",
          ModifiedOn: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type
          },
        }
      );
    } catch (error) {
      console.error('Error Initializing work', error);
    }
  }
  const addEmpSal = async () =>{
    try {
      const salary = await axios.post(
        "http://localhost:5500/employee/salary/FnAddUpdateDeleteRecord",
        {
            GradeId: "",
            BandId: "",
            CTC: "",
            GrossSalary: "",
            OTFlag: "",
            OTAmount: "",
            PFFlag: "",
            PFNo: "",
            PFDate: "",
            ESICFlag: "",
            ESICNo: "",
            ESICDate: "",
            UANNo: "",
            MLWFFlag: "",
            MLWFNo: "",
            GratuityApplicable: "",
            GratuityAmount: "",
            Remark: "",
            AcFlag: "Y",
            IUFlag: "I",
            CreatedBy: "",
            CreatedOn: "",
            ModifiedBy: "",
            ModifiedOn: ""         
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type
          },
        }
      );
    } catch (error) {
      console.error('Error initializing salary', error);
    }
  }
  const addEmpPro = async () =>{
    try {
      const professional = await axios.post(
        "http://localhost:5500/employee/professional/FnAddUpdateDeleteRecord",
        {
          Employer: "",
          Experience: "",
          Designation: "",
          JobResponsibility: "",
          Salary: "",
          CVFile: "",
          SalarySlipFile: "",
          AcFlag: "Y",
          IUFlag: "I",
          Remark: "",
          CreatedBy: "",
          CreatedOn: "",
          ModifiedBy: "",
          ModifiedOn: ""
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type
          },
        }
      );
    } catch (error) {
      console.error('Error initializing professional', error);
    }
  }
  const addEmpAcademic = async () =>{
    try {
      const academic = await axios.post(
        "http://localhost:5500/employee/academic/FnAddUpdateDeleteRecord",
        {
          Qualification: "",
          Institute: "",
          Specialization: "",
          GradePercent: "",
          PassingYear: "",
          Remark: "",
          AcFlag: "Y",
          IUFlag: "I",
          CreatedBy: "",
          CreatedOn: "",
          ModifiedBy: "",
          ModifiedOn: ""
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type
          },
        }
      );
    } catch (error) {
      console.error('Error initializing academic', error);
    }
  }
  const addEmpFam = async () =>{
    try {
      const family = await axios.post(
        "http://localhost:5500/employee/family/FnAddUpdateDeleteRecord",
        {
          Relation: "",
          Education: "",
          Occupation: "",
          Address: "",
          CellNo: "",
          EmailId: "",
          Nominee: "",
          Remark: "",
          AcFlag: "Y",
          IUFlag: "I",
          CreatedBy: "",
          CreatedOn: "",
          ModifiedBy: "",
          ModifiedOn: ""
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify the content type
          },
        }
      );
    } catch (error) {
      console.error('Error intializing family', error);
    }
  }

  useEffect(() =>{
    const fetchEmployeeTypes = async() =>{
      try{
        const response = await axios.get("http://localhost:5500/employee-type/FnShowActiveData",
        { headers: { Authorization: `Bearer ${token}`}
      })
      const data = response.data
      setEmployeeTypes(data)
      console.log(response)
      } catch (error){
        console.error('Error', error);
      }
    }
    fetchEmployeeTypes()
  },[token])

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-0 font-[Inter]">
        <div className="p-4 bg-white">
          <div className="grid grid-cols-3 gap-x-4">
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Employee ID
              </p>
              <input
                id="EmployeeId"
                type="text"
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                disabled={true}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Employee Type</p>
              <select
                id="EmployeeTypeId"
                name="EmployeeTypeId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.EmployeeTypeId}
                onChange={formik.handleChange}
              >
                    <option value="">Select Type</option>
                    {employeeTypes.map((entry) => (
                    <option key={entry.EmployeeTypeId} value={entry.EmployeeTypeId}>
                      {entry.EmployeeType}
                    </option>
                    ))}
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px] ">
                Employee Photo
              </p>
              <input
                id="EmployeePhoto"
                type="file"
                placeholder="Upload File"
                className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
              />
            </div>

            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Salutation</p>
              <select
                id="Salutation"
                name="Salutation"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.Salutation}
                onChange={formik.handleChange}
              >
                <option value="">Select Salutation</option>
                <option value="Sir/Madam">Sir/Madam</option>
                <option value="Dear [Mr./Ms./Dr.] [Last Name]">
                  Dear [Mr./Ms./Dr.] [Last Name]
                </option>
                <option value="[Department] [Last Name]">
                  [Department] [Last Name]
                </option>
                <option value="[Job Title] [Last Name]">
                  [Job Title] [Last Name]
                </option>
                <option value="To Whom It May Concern">
                  To Whom It May Concern
                </option>
                <option value="Greetings [Mr./Ms./Dr.] [Last Name]">
                  Greetings [Mr./Ms./Dr.] [Last Name]
                </option>
              </select>
            </div>

            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">
                Employee Type Group
              </p>
              <select
                id="EmployeeTypeGroupId"
                name="EmployeeTypeGroupId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.EmployeeTypeGroupId}
                onChange={formik.handleChange}
              >
                <option value="">Select Group Type</option>
                <option value="Worker">Worker</option>
                <option value="Staff">Staff</option>
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Date of Birth
              </p>
              <input
                id="DOB"
                type="date"
                value={formik.values.DOB}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                First Name
              </p>
              <input
                id="FirstName"
                type="text"
                value={formik.values.FirstName}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Middle Name
              </p>
              <input
                id="MiddleName"
                type="text"
                value={formik.values.MiddleName}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Last Name
              </p>
              <input
                id="LastName"
                type="text"
                value={formik.values.LastName}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Current Address
              </p>
              <input
                id="CurrentAddress"
                type="text"
                value={formik.values.CurrentAddress}
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Current Address Pincode
              </p>
              <input
                id="CurrentPincode"
                type="text"
                value={formik.values.CurrentPincode}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Permanent Address
              </p>
              <input
                id="PermanentAddress"
                type="text"
                value={formik.values.PermanentAddress}
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Permanent Address Pincode
              </p>
              <input
                id="PermanentPincode"
                type="text"
                value={formik.values.PermanentPincode}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>

            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">Phone</p>
              <input
                id="PhoneNo"
                type="text"
                value={formik.values.PhoneNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Cell 1
              </p>
              <input
                id="CellNo1"
                type="text"
                value={formik.values.CellNo1}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Cell 2
              </p>
              <input
                id="CellNo2"
                type="text"
                value={formik.values.CellNo2}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>

            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Email ID 1
              </p>
              <input
                id="EmailId1"
                type="text"
                value={formik.values.EmailId1}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Email ID 2
              </p>
              <input
                id="EmailId2"
                type="text"
                value={formik.values.EmailId2}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Bank ID 1
              </p>
              <input
                id="BankId1"
                type="text"
                value={formik.values.BankId1}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Account No 1
              </p>
              <input
                id="AccountNo1"
                type="text"
                value={formik.values.AccountNo1}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                IFSC Code 1
              </p>
              <input
                id="IFSCCode1"
                type="text"
                value={formik.values.IFSCCode1}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Bank ID 2
              </p>
              <input
                id="BankId2"
                type="text"
                value={formik.values.BankId2}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Account No 2
              </p>
              <input
                id="AccountNo2"
                type="text"
                value={formik.values.AccountNo2}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                IFSC Code 2
              </p>
              <input
                id="IFSCCode2"
                type="text"
                value={formik.values.IFSCCode2}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Category
              </p>
              <select
                id="CategoryId"
                name="CategoryId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.CategoryId}
                onChange={formik.handleChange}
              >
                <option value="">Select Category</option>
                <option value="Category 1">Category 1</option>
                <option value="Category 2">Category 2</option>
                <option value="Category 3">Category 3</option>
                <option value="Category 4">Category 4</option>
                <option value="Category 5">Category 5</option>
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Destination
              </p>
              <input
                id="DestinationId"
                type="text"
                value={formik.values.DestinationId}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Religion
              </p>
              <select
                id="ReligionId"
                name="ReligionId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.ReligionId}
                onChange={formik.handleChange}
              >
                <option value="">Select Religion</option>
                <option value="Religion 1">Religion 1</option>
                <option value="Religion 2">Religion 2</option>
                <option value="Religion 3">Religion 3</option>
                <option value="Religion 4">Religion 4</option>
                <option value="Religion 5">Religion 5</option>
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Reference</p>
              <select
                id="ReferenceId"
                name="ReferenceId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.ReferenceId}
                onChange={formik.handleChange}
              >
                <option value="">Select Reference</option>
                <option value="Professional References">
                  Professional References
                </option>
                <option value="Supervisor/Manager References">
                  Supervisor/Manager References
                </option>
                <option value="Colleague References">
                  Colleague References
                </option>
                <option value="Client/Customer References">
                  Client/Customer References
                </option>
                <option value="Subordinate References">
                  Subordinate References
                </option>
                <option value="Educational References">
                  Educational References
                </option>
                <option value="Personal References">Personal References</option>
                <option value="Character References">
                  Character References
                </option>
                <option value="Industry Experts or Mentors">
                  Industry Experts or Mentors
                </option>
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Caste</p>
              <select
                id="CasteId"
                name="CasteId"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.CasteId}
                onChange={formik.handleChange}
              >
                <option value="">Select Caste</option>
                <option value="Caste 1">Caste 1</option>
                <option value="Caste 2">Caste 2</option>
                <option value="Caste 3">Caste 3</option>
                <option value="Caste 4">Caste 4</option>
                <option value="Caste 5">Caste 5</option>
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 text-[13px] font-semibold">Blood Group</p>
              <select
                id="BloodGroup"
                name="BloodGroup"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.BloodGroup}
                onChange={formik.handleChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Gender
              </p>
              <div>
                <input
                  type="radio"
                  className="mr-2"
                  name="Gender"
                  value="Male"
                  checked={formik.values.Gender === "Male"}
                  onChange={formik.handleChange}
                />
                <label className="text-[13px]">Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  className="mr-2"
                  name="Gender"
                  value="Female"
                  checked={formik.values.Gender === "Female"}
                  style={{ marginTop: "10px" }}
                  onChange={formik.handleChange}
                />
                <label className="text-[13px]">Female</label>
              </div>
            </div>
            <div>
              <div className="py-1">
                <p className="mb-1 capitalize font-semibold text-[13px]">
                  Marital Status
                </p>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="MaritalStatus"
                    value="Married"
                    checked={formik.values.MaritalStatus === "Married"}
                    onChange={formik.handleChange}
                  />
                  <label className="text-[13px]">Married</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="mr-2"
                    name="MaritalStatus"
                    value="Unmarried"
                    checked={formik.values.MaritalStatus === "Unmarried"}
                    style={{ marginTop: "10px" }}
                    onChange={formik.handleChange}
                  />
                  <label className="text-[13px]">Unmarried</label>
                </div>
              </div>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                MEmployee Name
              </p>
              <input
                id="MEmployeeName"
                type="text"
                value={formik.values.MEmployeeName}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize mt-1 font-semibold text-[13px]">
                Aadhar Card No
              </p>
              <input
                id="AadharCardNo"
                type="text"
                value={formik.values.AadharCardNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                PAN Card No
              </p>
              <input
                id="PANNo"
                type="text"
                value={formik.values.PANNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Finance Account No
              </p>
              <input
                id="FinanceAccountNo"
                type="text"
                value={formik.values.FinanceAccountNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Passport No
              </p>
              <input
                id="PassportNo"
                type="text"
                value={formik.values.PassportNo}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Passport Issue Date
              </p>
              <input
                id="PassportIssueDate"
                type="date"
                value={formik.values.PassportIssueDate}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Passport Expiry Date
              </p>
              <input
                id="PassportExpireDate"
                type="date"
                value={formik.values.PassportExpireDate}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px]">
                Driving License Photo
              </p>
              <input
                id="DrivingLicense"
                type="file"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Remark
              </p>
              <input
                id="Remark"
                type="text"
                value={formik.values.Remark}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <button
          type="submit"
          className="px-8 py-2 bg-blue-900 text-white text-lg rounded-md"
        >
          Save details
        </button>
      </div>
    </form>
  );
}
