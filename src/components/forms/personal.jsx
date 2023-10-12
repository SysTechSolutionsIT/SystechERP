import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useAuth } from "../Login";

export default function Personal({ ID }) {
  const { token } = useAuth();
  const { details, setDetails } = useState([]);

  const formik = useFormik({
    initialValues: {
      // EmployeeID: "",
      EmpType: "",
      EmpTypeGroup: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      Salutation: "",
      AadharCardNo: "",
      PANNo: "",
      PassportNo: "",
      PassportIssueDate: "",
      PassportExpireDate: "",
      CurrentAddress: "",
      CurrentPinCode: "",
      PermanentAddress: "",
      PermanentPinCode: "",
      DOB: "",
      PhoneNo: "",
      CellNo1: "",
      CellNo2: "",
      EmailID1: "",
      EmailID2: "",
      BankId1: "",
      AccountNo1: "",
      IFSCCode1: "",
      BankId2: "",
      AccountNo2: "",
      IFSCCode2: "",
      AcFlag: "",
      Category: "",
      Destination: "",
      Caste: "",
      MaritalStatus: "",
      Reference: "",
      EmployeePhoto: "",
      MEmployeeName: "",
      Religion: "",
      Gender: "",
      BloodGroup: "",
      DrivingLicense: "",
      FinanceAccountNo: "",
      Remark: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      addEmpPersonal(values);
    },
  });
  
  // Patch
  const addEmpPersonal = async (values) => {
    try {
      const response = await axios.patch(
        `http://localhost:5500/employee/personal/update/${ID}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
      }
      alert("Employee Personal Details added successfully");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Get
  useEffect(() => {
    fetchPersonalData();
    console.log(details)
  }, [ID]);
  console.log(ID);

  const fetchPersonalData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5500/employee/personal/get/${ID}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response Object", response);
      const data = response.data;
      setDetails(data);
      console.log(data);
    } catch (error) {
      console.log("Error while fetching course data: ", error.message);
    }
  };

  useEffect(() => {
    if (details) {
      formik.setValues({
        EmpType: details?.EmpType,
        EmpTypeGroup: details?.EmpTypeGroup,
        FirstName: details?.FirstName,
        MiddleName: details?.MiddleName,
        LastName: details?.LastName,
        Salutation: details?.Salutation,
        AadharCardNo: details?.AadharCardNo,
        PANNo: details?.PANNo,
        PassportNo: details?.PassportNo,
        PassportIssueDate: details?.PassportIssueDate,
        PassportExpireDate: details?.PassportExpireDate,
        CurrentAddress: details?.CurrentAddress,
        CurrentPinCode: details?.CurrentPinCode,
        PermanentAddress: details?.PermanentAddress,
        PermanentPinCode: details?.PermanentPinCode,
        DOB: details?.DOB,
        PhoneNo: details?.PhoneNo,
        CellNo1: details?.CellNo1,
        CellNo2: details?.CellNo2,
        EmailID1: details?.EmailID1,
        EmailID2: details?.EmailID2,
        BankId1: details?.BankId1,
        AccountNo1: details?.AccountNo1,
        IFSCCode1: details?.IFSCCode1,
        BankId2: details?.BankId2,
        AccountNo2: details?.AccountNo2,
        IFSCCode2: details?.IFSCCode2,
        AcFlag: details?.AcFlag,
        Category: details?.Category,
        Destination: details?.Destination,
        Caste: details?.Caste,
        MaritalStatus: details?.MaritalStatus,
        Reference: details?.Reference,
        EmployeePhoto: details?.EmployeePhoto,
        MEmployeeName: details?.MEmployeeName,
        Religion: details?.Religion,
        Gender: details?.Gender,
        BloodGroup: details?.BloodGroup,
        DrivingLicense: details?.DrivingLicense,
        FinanceAccountNo: details?.FinanceAccountNo,
        Remark: details?.Remark,
      });
    }
  }, [details]);

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
                id="EmployeeID"
                type="text"
                value={ID}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg `}
                disabled={true}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 font-semibold text-[13px]">Employee Type</p>
              <select
                id="EmpType"
                name="EmpType"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.EmpType}
                onChange={formik.handleChange}
              >
                <option value={formik.values.EmpType}>{formik.values.EmpType}</option>
                <option value="">Select Type</option>
                <option value="Permenant">Permenant</option>
                <option value="Probation">Probation</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize font-semibold text-[13px] ">
                Employee Photo
              </p>
              <input
                id="logo"
                type="file"
                placeholder="Upload File"
                value={formik.values.EmployeePhoto}
                className={`w-full px-4 py-2 font-normal focus:outline-blue-900 border border-gray-300 rounded-lg text-[11px] `}
                onChange={formik.handleChange}
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
                <option value={formik.values.Salutation}>{formik.values.Salutation}</option>
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
                id="EmpTypeGroup"
                name="EmpTypeGroup"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.EmpTypeGroup}
                onChange={formik.handleChange}
              >
                <option value={formik.values.EmpTypeGroup}>{formik.values.EmpTypeGroup}</option>
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
                type="text"
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
                id="CurrentPinCode"
                type="text"
                value={formik.values.CurrentPinCode}
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
                id="PermanentPinCode"
                type="text"
                value={formik.values.PermanentPinCode}
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
                id="EmailID1"
                type="text"
                value={formik.values.EmailID1}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Email ID 2
              </p>
              <input
                id="EmailID2"
                type="text"
                value={formik.values.EmailID2}
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
                id="Category"
                name="Category"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.Category}
                onChange={formik.handleChange}
              >
                <option value={formik.values.Category}>{formik.values.Category}</option>
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
                id="Destination"
                type="text"
                value={formik.values.Destination}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Religion
              </p>
              <select
                id="Religion"
                name="Religion"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.Religion}
                onChange={formik.handleChange}
              >
                <option value={formik.values.Destination}>{formik.values.Destination}</option>
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
                id="Reference"
                name="Reference"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.Reference}
                onChange={formik.handleChange}
              >
                <option value={formik.values.Reference}>{formik.values.Reference}</option>
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
                id="Caste"
                name="Caste"
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg "
                value={formik.values.Caste}
                onChange={formik.handleChange}
              >
                <option value={formik.values.Caste}>{formik.values.Caste}</option>
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
                <option  value={formik.values.BloodGroup}>{formik.values.BloodGroup}</option>
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
                  checked={formik.values.Gender === 'Male'}
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
                  checked={formik.values.Gender === 'Female'}
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
                    checked={formik.values.MaritalStatus === 'Married'}
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
                    checked={formik.values.MaritalStatus === 'Unmarried'}
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
                type="text"
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
                type="text"
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
                type="text"
                value={formik.values.DrivingLicense}
                className="w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg"
              />
            </div>
            <div className="py-1">
              <p className="mb-1 capitalize  font-semibold text-[13px]">
                Account Flag
              </p>
              <input
                id="AcFlag"
                type="text"
                value={formik.values.AcFlag}
                className={`w-full px-4 py-2 font-normal text-[13px] border-gray-300 focus:outline-blue-900 border-2 rounded-lg`}
                onChange={formik.handleChange}
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
          Save Details
        </button>
      </div>
    </form>
  );
}
